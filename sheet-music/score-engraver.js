/* Shared OSMD engraving and a coordinate adapter for direct score editing. */
(function(root){
  const NS='http://www.w3.org/2000/svg';
  let library;
  function loadLibrary(){
    if(root.opensheetmusicdisplay)return Promise.resolve();
    if(!library)library=new Promise((resolve,reject)=>{
      const script=document.createElement('script');script.src='./lib/opensheetmusicdisplay.min.js';
      script.onload=resolve;
      script.onerror=()=>{script.remove();library=null;reject(new Error('The score display could not load. Check your connection and try again.'));};
      document.head.append(script);
    });
    return library;
  }
  const options={backend:'svg',autoResize:false,drawingParameters:'default',drawTitle:false,
    drawComposer:false,drawPartNames:false,drawPartAbbreviations:false,autoBeam:true,
    followCursor:false,autoGenerateMultipleRestMeasuresFromRestMeasures:false,newPageFromXML:false,newSystemFromXML:true,stretchLastSystemLine:true,
    cursorsOptions:[{type:0,color:'#43b581',alpha:.35,follow:false}]};
  function create(host){
    const renderer=new root.opensheetmusicdisplay.OpenSheetMusicDisplay(host,{...options});
    if(renderer.EngravingRules){
      renderer.EngravingRules.RenderMultipleRestMeasures=false;
    }
    renderer.setLogLevel('error');return renderer;
  }
  function add(parent,tag,attrs){
    const el=parent.ownerDocument.createElementNS(NS,tag);
    for(const [key,value]of Object.entries(attrs))el.setAttribute(key,value);
    parent.append(el);return el;
  }
  const xAt=(bar,beat)=>ComposerStaff.xAt(bar,beat);
  function geometry(renderer,draft,part,width){
    const bars=[],hits=[],rows=new Map(),instrument=renderer.Sheet.Instruments[part];
    for(const [measure,staffs]of renderer.GraphicSheet.MeasureList.entries()){
      const snapshot=draft.inspect(part,measure);
      for(const graphical of staffs){
        if(!graphical||graphical.ParentStaff.ParentInstrument!==instrument)continue;
        const staff=String(graphical.ParentStaff.Id),contexts=draft.contexts(part,measure,staff),ctx=contexts[0].ctx,v=graphical.getVFStave();
        const bottom=v.getYForLine(4),halfGap=(bottom-v.getYForLine(0))/8;
        const groups=snapshot.groups.filter(g=>g.staff===staff),meter=ctx.beats.split('+').reduce((a,b)=>a+Number(b),0)*4/Number(ctx.beatType);
        const beats=Math.max(meter,...groups.map(g=>g.beat+g.duration));
        if(!rows.has(graphical.ParentMusicSystem))rows.set(graphical.ParentMusicSystem,rows.size);
        const bar={measure,number:snapshot.parts[part].measures[measure],staff,ctx,contexts,groups,meter,beats,halfGap,
          row:rows.get(graphical.ParentMusicSystem),left:v.getX(),end:v.getX()+v.getWidth(),bottom,
          top:v.getYForLine(0)-30,height:100,points:[],start:v.getNoteStartX()+12};
        const matched=new Map();
        for(const entry of graphical.staffEntries)for(const voice of entry.graphicalVoiceEntries)for(const note of voice.notes){
          const source=note.sourceNote,beat=entry.relInMeasureTimestamp.RealValue*4;
          const voiceId=String(source.ParentVoiceEntry.ParentVoice.VoiceId);
          const candidates=groups.filter(g=>g.voice===voiceId&&Math.abs(g.beat-beat)<1e-6&&g.rest===source.isRest());
          // Match the source voice entry rather than sorted VexFlow chord order.
          const siblings=source.ParentVoiceEntry.Notes.filter(n=>n.ParentStaff.Id===graphical.ParentStaff.Id);
          let group=matched.get(source.ParentVoiceEntry);
          if(!group){group=candidates.find(g=>!Array.from(matched.values()).includes(g));if(group)matched.set(source.ParentVoiceEntry,group);}
          if(!group||!note.vfnote)continue;
          const vf=note.vfnote[0],index=note.vfnote[1],head=vf.note_heads?.[index];
          const tone=group.rest?0:Math.max(0,siblings.indexOf(source));
          const x=(head?.getAbsoluteX()??vf.getNoteHeadBeginX())+(vf.getNoteHeadEndX()-vf.getNoteHeadBeginX())/2;
          const y=head?.getY()??vf.getYs()[index];
          const id=`${measure}:${group.index}:${tone}`;
          const element=note.getNoteheadSVGs()[index];
          element?.setAttribute('data-engraved-note',id);
          const noteContext=ComposerStaff.contextAt(bar,beat);
          const hit={measure,index:group.index,tone,staff,voice:group.voice,bar,group,ctx:noteContext,rest:group.rest,note:group.notes[tone],
            step:group.rest?4:ComposerStaff.stepOf(group.notes[tone],noteContext.clef),x,y,column:(vf.getNoteHeadBeginX()+vf.getNoteHeadEndX())/2};
          hits.push(hit);
          if(!(group.rest&&group.duration>=meter)&&!bar.points.some(p=>Math.abs(p.beat-beat)<1e-6))bar.points.push({beat,x:hit.column});
        }
        bar.points.sort((a,b)=>a.beat-b.beat);
        if(!bar.points.length||bar.points[0].beat>0)bar.points.unshift({beat:0,x:bar.start});
        bar.start=bar.points[0].x;
        bar.points.push({beat:beats,x:Math.max(bar.points.at(-1).x+12,bar.end-12)});
        bar.beatWidth=(bar.points.at(-1).x-bar.start)/beats;
        const notes=hits.filter(h=>h.bar===bar);
        bar.top=Math.min(bar.top,...notes.map(n=>n.y-20));
        bar.height=Math.max(bottom+30,...notes.map(n=>n.y+20))-bar.top;
        bars.push(bar);
      }
    }
    const pages=[...renderer.container.querySelectorAll('svg')];
    const height=Math.max(180,...pages.map(p=>Number(p.getAttribute('height'))));
    return {width,height,bars,hits,stems:[],halfGap:bars[0]?.halfGap||5};
  }
  function createEditor(svg,{onReady,onError}){
    let current=null,pending=null,draining=false,epoch=0,desiredKey=null;
    const pane=svg.parentElement;
    function decorate(state){
      if(!current)return;
      svg.querySelector('[data-editor-overlay]')?.remove();
      const overlay=add(svg,'g',{'data-editor-overlay':'true'});
      const layers=new Map(current.geometry.bars.map(bar=>[bar,add(overlay,'g',{
        'data-composer-measure':bar.measure,'data-composer-row':bar.row,'data-composer-staff':bar.staff,
        'data-bottom':bar.bottom,'data-half-gap':bar.halfGap,'data-beat-points':JSON.stringify(bar.points),
        role:'group','aria-label':`Measure ${bar.number}, staff ${bar.staff}`})]));
      for(const hit of current.geometry.hits){
        const id=`${hit.measure}:${hit.index}:${hit.tone}`;
        const chosen=state.selectedGroups.has(`${hit.measure}:${hit.index}`)||(hit.measure===state.measure&&hit.index===state.selected&&hit.tone===state.tone);
        const playing=state.playing?.measure===hit.measure&&state.playing.index===hit.index;
        const head=svg.querySelector(`[data-engraved-note="${id}"]`);
        if(head)for(const path of head.querySelectorAll('path'))path.setAttribute('fill',playing?'#15803d':chosen?'#2563eb':'#000000');
        const label=hit.rest?'Rest':`${hit.note.step}${hit.note.alter>0?' sharp':hit.note.alter<0?' flat':''}${hit.note.octave}`;
        const target=add(layers.get(hit.bar),'g',{'data-composer-note':id,'data-x':hit.x,'data-y':hit.y,'data-staff':hit.staff,
          role:'button',tabindex:'-1','aria-pressed':String(chosen),'aria-label':`${label}, measure ${hit.bar.number}, beat ${hit.group.beat+1}`,style:'touch-action:none'});
        if(chosen||playing)add(target,'rect',{x:hit.x-9,y:hit.y-8,width:18,height:16,rx:3,fill:playing?'#15803d':'#2563eb',opacity:.12,'pointer-events':'none'});
        add(target,'circle',{cx:hit.x,cy:hit.y,r:10,fill:'transparent'});
      }
      if(state.cursor){
        const bar=current.geometry.bars.find(b=>b.measure===state.cursor.measure&&b.staff===state.staff);
        if(bar){const x=xAt(bar,state.cursor.beat);add(overlay,'line',{'data-input-cursor':'true',x1:x,x2:x,y1:bar.bottom-8*bar.halfGap-14,y2:bar.bottom+14,stroke:'#2563eb','stroke-width':1.5,'pointer-events':'none'});}
      }
    }
    async function drain(){
      if(draining)return;draining=true;
      while(pending){
        const request=pending;pending=null;
        if(current?.key===request.key){decorate(request.state);continue;}
        const token=epoch,stage=document.createElement('div'),host=document.createElement('div');
        stage.style.cssText=`position:fixed;left:-100000px;top:0;visibility:hidden;width:${request.width}px`;
        stage.append(host);document.body.append(stage);let renderer;
        try{
          await loadLibrary();if(token!==epoch)continue;
          renderer=create(host);await renderer.load(new DOMParser().parseFromString(request.xml,'application/xml'));if(token!==epoch)continue;
          renderer.Sheet.Instruments.forEach((instrument,index)=>{instrument.Visible=index===request.part;});
          renderer.render();
          if(token!==epoch||desiredKey!==request.key)continue;
          // container is kept private by OSMD; retain our own host for SVG extraction.
          const size=geometry({Sheet:renderer.Sheet,GraphicSheet:renderer.GraphicSheet,container:host},request.draft,request.part,request.width);
          const source=host.querySelector('svg');if(!source)throw new Error('No editable notation was rendered.');
          svg.replaceChildren(...[...source.childNodes].map(n=>n.cloneNode(true)));
          // Main score and editor can coexist. Do not duplicate OSMD's SVG ids.
          svg.querySelectorAll('[id]').forEach(n=>n.removeAttribute('id'));
          svg.setAttribute('viewBox',`0 0 ${size.width} ${size.height}`);
          svg.style.width=size.width*request.zoom+'px';svg.style.height=size.height*request.zoom+'px';
          current={key:request.key,geometry:size};svg.dataset.engraver='osmd';
          pane.removeAttribute('aria-busy');
          const latest=pending?.key===request.key?pending:request;pending=null;
          decorate(latest.state);onReady(size);
        }catch(error){if(token===epoch&&desiredKey===request.key){current=null;svg.replaceChildren();pane.removeAttribute('aria-busy');onError(error);}}
        finally{renderer?.clear();stage.remove();}
      }
      draining=false;
    }
    return {
      draw(draft,part,width,zoom,state){
        const xml=draft.xml(),key=JSON.stringify([xml,part,width,zoom]);
        desiredKey=key;
        if(current?.key===key){pending=null;pane.removeAttribute('aria-busy');decorate(state);return;}
        pending={draft,part,width,zoom,state,xml,key};pane.setAttribute('aria-busy','true');drain();
      },
      get busy(){return pane.getAttribute('aria-busy')==='true';},
      async ready(){while(draining||pending)await new Promise(resolve=>setTimeout(resolve,0));},
      reset(){epoch++;pending=null;current=null;desiredKey=null;svg.replaceChildren();pane.removeAttribute('aria-busy');},
      close(){this.reset();}
    };
  }
  root.ScoreEngraver={loadLibrary,create,options,createEditor,xAt};
})(globalThis);
