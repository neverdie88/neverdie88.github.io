/* Direct score input, selected-note editing, grouped selection and playback. */
globalThis.ScoreComposer={
  mount({getDraft,getSelection,select,mutate}) {
    const $=id=>document.getElementById('vp-editor-'+id),svg=$('canvas');
    let tool='select',type='quarter',lane={staff:'1',voice:'1'},geometry,gesture,playing=null,previousPart=-1;
    let selectedGroups=new Set(),anchor=null,inputAccidental='key';
    const key=ref=>`${ref.measure}:${ref.index}`;
    const ref=value=>{const [measure,index]=value.split(':').map(Number);return {measure,index};};
    const hints={select:'Tap a note to select it. Drag it up or down to change pitch.',note:'Choose a length, then tap a beat to add a note.',rest:'Tap a beat to write a rest, or tap a note to turn it into a rest.',chord:'Tap above or below a note at the same beat to add a chord tone.',erase:'Tap a note to erase it. A single note becomes a rest; chord tones can be erased separately.',multi:'Tap notes or chords to toggle them, or drag a box. Shift-click selects a range.'};
    function selected(){
      const d=getDraft(),s=getSelection();
      return {d,s,g:d?.inspect(s.part,s.measure).groups[s.index]};
    }
    const playback=ScorePlayback.create({
      onStep(event){playing=event;select({measure:event.measure,index:event.index,tone:event.tone});reveal(event.measure);},
      onStop(){playing=null;$('play').textContent='▶ Play preview';$('play-status').textContent='';if(getDraft())draw();}
    });
    function clearSelection(refresh=false){selectedGroups.clear();anchor=null;select({index:-1,tone:0},false);if(refresh)draw();}
    function setTool(value){
      playback.stop();cancel();
      if(value==='multi'){
        const {s,g}=selected();if(g)selectedGroups.add(key(s));select({index:-1,tone:0},false);
      }else if(['note','rest','chord','erase'].includes(value)||tool==='multi'){
        const hadSelection=!!selected().g;clearSelection();
        if(hadSelection&&['note','chord'].includes(value))inputAccidental='key';
      }
      tool=value;draw();
    }
    function updateTools(){
      const {g}=selected(),multi=tool==='multi';
      for(const button of $('actions').querySelectorAll('[data-composer-tool]'))button.setAttribute('aria-pressed',String(button.dataset.composerTool===tool));
      for(const button of $('palette').children){button.setAttribute('aria-pressed',String(button.dataset.length===type));button.disabled=multi||!!g&&!g.rhythmEditable;}
      $('input-dots').disabled=multi||!!g&&!g.rhythmEditable;
      $('accidental').disabled=multi||!!g?.rest;
      const count=selectedGroups.size||(!multi&&g?1:0);
      $('delete-selected').disabled=$('clear-selection').disabled=!count;
      $('selection-status').textContent=count?`${count} ${count===1?'group':'groups'} selected`:'';
      svg.dataset.tool=tool;
      $('hint').textContent=g&&!multi&&['select','note'].includes(tool)?'Change length, dots or accidental to edit the selection. Choose Note to add more.':hints[tool];
    }
    function changeLength(value,dots){
      const {d,s,g}=selected();type=value;
      if(g&&tool!=='multi')mutate(()=>d.length(s.part,s.measure,s.index,value,dots));
      else {if(!['rest','chord','multi'].includes(tool))tool='note';updateTools();}
    }
    for(const [value,label] of Object.entries({whole:'Whole',half:'Half',quarter:'Quarter',eighth:'Quaver','16th':'16th','32nd':'32nd'})) {
      const button=document.createElement('button');button.type='button';button.className='btn';button.dataset.length=value;button.title=value==='eighth'?'Quaver (eighth note)':label+' note';button.setAttribute('aria-label',button.title);
      const hollow=value==='whole'||value==='half',flags=['eighth','16th','32nd'].indexOf(value)+1;
      const shape=`<ellipse cx="9" cy="24" rx="6" ry="4" transform="rotate(-20 9 24)" fill="${hollow?'none':'currentColor'}" stroke="currentColor" stroke-width="1.6"/>`+(value==='whole'?'':'<path d="M14 24V3" fill="none" stroke="currentColor" stroke-width="1.6"/>')+Array.from({length:Math.max(0,flags)},(_,i)=>`<path d="M14 ${3+i*4}q12 5 5 12" fill="none" stroke="currentColor" stroke-width="1.6"/>`).join('');
      button.innerHTML=`<svg viewBox="0 0 28 34" aria-hidden="true">${shape}</svg><span>${label}</span>`;
      button.addEventListener('click',()=>changeLength(value,Number($('input-dots').value)));$('palette').append(button);
    }
    $('input-dots').addEventListener('change',()=>changeLength(type,Number($('input-dots').value)));
    $('accidental').addEventListener('change',()=>{
      inputAccidental=$('accidental').value;
      const {d,s,g}=selected();if(!g||g.rest||tool==='multi')return;
      const note=g.notes[s.tone]||g.notes[0],choice=$('accidental').value,fifths=d.context(s.part,s.measure,g.staff).fifths;
      const alter=choice==='key'?((fifths<0?'BEADGCF':'FCGDAEB').slice(0,Math.abs(fifths)).includes(note.step)?Math.sign(fifths):0):Number(choice);
      mutate(()=>d.pitch(s.part,s.measure,s.index,s.tone,{...note,alter}));
    });
    $('actions').querySelectorAll('[data-composer-tool]').forEach(button=>button.addEventListener('click',()=>setTool(button.dataset.composerTool)));
    function draw(){
      const {d:draft,s:selection,g:group}=selected();if(!draft)return;
      const snapshot=draft.inspect(selection.part,selection.measure),lanes=draft.lanes(selection.part);
      if(previousPart!==selection.part){selectedGroups.clear();anchor=null;lane=group?{staff:group.staff,voice:group.voice}:lanes[0];previousPart=selection.part;}
      if(group&&!(group.staff===lane.staff&&group.voice===lane.voice)){selectedGroups.clear();lane={staff:group.staff,voice:group.voice};}
      if(!lanes.some(l=>l.staff===lane.staff&&l.voice===lane.voice))lanes.push(lane);
      $('part-picker').hidden=snapshot.parts.length<2;$('lane-picker').hidden=lanes.length<2;
      $('lane').replaceChildren(...lanes.map((l,i)=>{const o=document.createElement('option');o.value=i;o.textContent=`Staff ${l.staff} · voice ${l.voice}`;return o;}));
      $('lane').value=String(lanes.findIndex(l=>l.staff===lane.staff&&l.voice===lane.voice));
      const count=snapshot.parts[selection.part].measures.length,entries=[];
      for(let m=0;m<count;m++){const s=draft.inspect(selection.part,m);entries.push({measure:m,number:s.parts[selection.part].measures[m],ctx:draft.context(selection.part,m,lane.staff),groups:s.groups});}
      const zoom=Number($('zoom').value),width=($('canvas-scroll').clientWidth||800)/zoom;
      geometry=ComposerStaff.layout(entries,{...lane,width});
      ComposerStaff.draw(svg,geometry,{P:ViolinPitch,glyphs:ViolinMusicGlyphs,measure:selection.measure,selected:tool==='multi'?-1:selection.index,tone:selection.tone,playing,selectedGroups});
      svg.style.width=geometry.width*zoom+'px';svg.style.height=geometry.height*zoom+'px';
      $('previous').disabled=selection.measure===0;$('next').disabled=selection.measure===count-1;
      if(group&&tool!=='multi'){
        type=group.type==='measure'?(Object.keys(ScoreEditorModel.TYPES).find(t=>ScoreEditorModel.TYPES[t]===group.duration)||'whole'):group.type;
        $('input-dots').value=String(group.dots);
        if(!group.rest)$('accidental').value=String((group.notes[selection.tone]||group.notes[0]).alter);
      }else $('accidental').value=inputAccidental;
      updateTools();
    }
    function reveal(measure){
      const bar=geometry?.bars.find(b=>b.measure===measure);if(!bar)return;
      const pane=$('canvas-scroll'),scale=Number($('zoom').value),left=bar.left*scale,top=bar.top*scale,bottom=(bar.top+bar.height)*scale;
      if(left<pane.scrollLeft||left>pane.scrollLeft+pane.clientWidth-60)pane.scrollLeft=Math.max(0,left-12);
      if(top<pane.scrollTop||bottom>pane.scrollTop+pane.clientHeight)pane.scrollTop=top;
    }
    function point(event){const p=svg.createSVGPoint();p.x=event.clientX;p.y=event.clientY;return p.matrixTransform(svg.getScreenCTM().inverse());}
    // Selecting the last inserted note updates its controls, but must not turn
    // key-aware input into that note's explicit sharp or natural.
    function locate(p){return ComposerStaff.target(geometry,p.x,p.y,Math.min(.25,(ScoreEditorModel.TYPES[type]||1)/2**Number($('input-dots').value)),inputAccidental);}
    function erase(note){
      const {d,s}=selected(),g=d.inspect(s.part,note.measure).groups[note.index];
      mutate(()=>{if(g.notes.length>1&&!g.rest)d.removeTone(s.part,note.measure,note.index,note.tone);else if(g.rest)d.remove(s.part,note.measure,note.index);else d.rest(s.part,note.measure,note.index,true);});
    }
    function deleteSelected(){
      const {d,s,g}=selected(),refs=selectedGroups.size?[...selectedGroups].map(ref):g?[{measure:s.measure,index:s.index}]:[];
      if(!refs.length)return;
      mutate(()=>{d.removeMany(s.part,refs);clearSelection();});
    }
    $('delete-selected').addEventListener('click',deleteSelected);
    $('clear-selection').addEventListener('click',()=>clearSelection(true));
    function selectGroup(note,event){
      const item={measure:note.measure,index:note.index},id=key(item);
      if(event.shiftKey&&anchor){
        const all=geometry.bars.flatMap(b=>b.groups.map(g=>({measure:b.measure,index:g.index}))),a=all.findIndex(n=>key(n)===key(anchor)),b=all.findIndex(n=>key(n)===id);
        if(a>=0&&b>=0){if(!event.ctrlKey&&!event.metaKey)selectedGroups.clear();for(const n of all.slice(Math.min(a,b),Math.max(a,b)+1))selectedGroups.add(key(n));}
      }else {if(selectedGroups.has(id))selectedGroups.delete(id);else selectedGroups.add(id);anchor=item;}
      select({measure:item.measure,index:-1,tone:0});
    }
    function ghost(p){
      svg.querySelector('[data-composer-ghost]')?.remove();const target=locate(p);if(!target)return;
      const g=document.createElementNS(svg.namespaceURI,'g');g.dataset.composerGhost='true';g.setAttribute('pointer-events','none');
      const bar=gesture?.hit?.bar||target.bar,pitch=ComposerStaff.pitchAt(p.y,bar,geometry,gesture?.hit?$('accidental').value:inputAccidental);
      const x=gesture?.hit&&!gesture.hit.rest?gesture.hit.x:target.x,y=bar.bottom-ComposerStaff.stepOf(pitch,bar.ctx.clef)*geometry.halfGap;
      const ellipse=document.createElementNS(svg.namespaceURI,'ellipse');for(const [k,v] of Object.entries({cx:x,cy:y,rx:10,ry:6,fill:'#1479dd',opacity:.55}))ellipse.setAttribute(k,v);g.append(ellipse);svg.append(g);
      $('hint').textContent=`${pitch.step}${pitch.alter>0?'♯':pitch.alter<0?'♭':''}${pitch.octave} · measure ${bar.number}, beat ${+(target.beat+1).toFixed(3)}`;
    }
    function box(p){
      svg.querySelector('[data-composer-box]')?.remove();const start=gesture.start,rect=document.createElementNS(svg.namespaceURI,'rect');
      for(const [k,v] of Object.entries({'data-composer-box':'true',x:Math.min(start.x,p.x),y:Math.min(start.y,p.y),width:Math.abs(p.x-start.x),height:Math.abs(p.y-start.y),fill:'#1479dd22',stroke:'#1479dd','stroke-dasharray':'5 3','pointer-events':'none'}))rect.setAttribute(k,v);
      svg.append(rect);
    }
    svg.addEventListener('pointerdown',event=>{
      if(event.button!==0||!getDraft())return;playback.stop();const p=point(event),hit=ComposerStaff.hit(geometry,p.x,p.y),target=locate(p);
      const multi=tool==='multi'||event.shiftKey||event.ctrlKey||event.metaKey;
      if(!target&&!multi)return;
      const current=selected();
      gesture={id:event.pointerId,start:p,hit,target,moved:false,multi,add:event.shiftKey||event.ctrlKey||event.metaKey,base:multi&&tool!=='multi'&&current.g?{measure:current.s.measure,index:current.s.index}:null};
      svg.setPointerCapture?.(event.pointerId);
      if(!multi){selectedGroups.clear();if(hit&&tool!=='chord'&&(!hit.rest||!['note','rest'].includes(tool)))select({measure:hit.measure,index:hit.index,tone:hit.tone});else if(tool==='select')select({measure:target.measure,index:-1,tone:0});}
      svg.focus({preventScroll:true});
    });
    svg.addEventListener('pointermove',event=>{
      if(!geometry)return;const p=point(event);
      if(gesture){
        if(gesture.id!==event.pointerId)return;
        gesture.moved ||= Math.hypot(p.x-gesture.start.x,p.y-gesture.start.y)>4;
        if(gesture.multi&&gesture.moved)box(p);
        else if(gesture.hit&&!gesture.hit.rest&&['select','note'].includes(tool))ghost(p);
      }else if(tool==='note'||tool==='chord')ghost(p);
    });
    function cancel(){gesture=null;svg.querySelector('[data-composer-ghost]')?.remove();svg.querySelector('[data-composer-box]')?.remove();updateTools();}
    svg.addEventListener('pointercancel',cancel);svg.addEventListener('pointerleave',()=>{if(!gesture)cancel();});
    svg.addEventListener('pointerup',event=>{
      if(!gesture||gesture.id!==event.pointerId)return;
      const action=gesture,p=point(event),target=locate(p),{d,s}=selected();cancel();
      if(action.multi){
        if(action.base){selectedGroups.add(key(action.base));anchor=action.base;}
        tool='multi';
        if(action.moved){if(!action.add)selectedGroups.clear();for(const n of ComposerStaff.groupsInRect(geometry,action.start,p))selectedGroups.add(key(n));select({index:-1,tone:0});}
        else if(action.hit)selectGroup(action.hit,event);else clearSelection(true);
        updateTools();return;
      }
      if(!target)return;
      if(action.moved){
        if(action.hit&&!action.hit.rest&&['select','note'].includes(tool)) {
          if(!['treble','bass'].includes(action.hit.bar.ctx.clef)){$('hint').textContent='Pitch editing supports treble and bass clefs.';return;}
          const value=ComposerStaff.pitchAt(p.y,action.hit.bar,geometry,$('accidental').value);
          mutate(()=>d.pitch(s.part,action.hit.measure,action.hit.index,action.hit.tone,value));
        }
        return;
      }
      if(tool==='erase'){if(action.hit)erase(action.hit);return;}
      if(tool==='select')return;
      if(tool==='chord'){
        if(!['treble','bass'].includes(target.bar.ctx.clef)){$('hint').textContent='Pitch editing supports treble and bass clefs.';return;}
        const column=geometry.hits.filter(n=>n.measure===target.measure&&!n.rest&&Math.abs(n.column-p.x)<28).sort((a,b)=>Math.abs(a.column-p.x)-Math.abs(b.column-p.x))[0];
        if(!column){$('hint').textContent='Tap above or below an existing note to build a chord.';return;}
        const g=d.inspect(s.part,column.measure).groups[column.index];
        if(g.notes.some(n=>n.step===target.pitch.step&&n.alter===target.pitch.alter&&n.octave===target.pitch.octave)){select({measure:column.measure,index:column.index,tone:0});return;}
        mutate(()=>{d.addTone(s.part,column.measure,column.index,target.pitch);select({measure:column.measure,index:column.index,tone:g.notes.length},false);});return;
      }
      if(action.hit&&!action.hit.rest){if(tool==='rest')mutate(()=>d.rest(s.part,action.hit.measure,action.hit.index,true));return;}
      if(!['treble','bass'].includes(target.bar.ctx.clef)){$('hint').textContent='Pitch editing supports treble and bass clefs.';return;}
      const input={type,dots:Number($('input-dots').value),pitch:tool==='rest'?null:target.pitch,...lane};
      mutate(()=>{const index=d.place(s.part,target.measure,target.beat,input);select({measure:target.measure,index,tone:0},false);});
    });
    svg.addEventListener('keydown',event=>{
      if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='a'){
        event.preventDefault();tool='multi';selectedGroups=new Set(geometry.hits.map(key));select({index:-1,tone:0});return;
      }
      if(event.key==='Escape'){event.preventDefault();clearSelection(true);return;}
      if(event.ctrlKey||event.metaKey||event.altKey)return;
      if(['Delete','Backspace'].includes(event.key)){event.preventDefault();deleteSelected();return;}
      const {d,s,g}=selected();if(!g||tool==='multi')return;
      if(['ArrowUp','ArrowDown'].includes(event.key)&&!g.rest){event.preventDefault();const bar=geometry.bars.find(b=>b.measure===s.measure);if(!['treble','bass'].includes(bar.ctx.clef)){$('hint').textContent='Pitch editing supports treble and bass clefs.';return;}const note=g.notes[s.tone]||g.notes[0],step=ComposerStaff.stepOf(note,bar.ctx.clef)+(event.key==='ArrowUp'?1:-1);mutate(()=>d.pitch(s.part,s.measure,s.index,s.tone,ComposerStaff.pitchAt(bar.bottom-step*geometry.halfGap,bar,geometry,$('accidental').value)));}
    });
    svg.addEventListener('click',event=>{
      if(event.detail!==0)return;const item=event.target.closest('[data-composer-note]');if(!item)return;
      const [measure,index,tone]=item.dataset.composerNote.split(':').map(Number);
      if(tool==='multi'){selectGroup({measure,index},event);return;}
      selectedGroups.clear();select({measure,index,tone});if(tool==='erase')erase({measure,index,tone});
    });
    $('lane').addEventListener('change',()=>{const index=Number($('lane').value);playback.stop();const {d,s}=selected(),lanes=d.lanes(s.part);if(!lanes.some(l=>l.staff===lane.staff&&l.voice===lane.voice))lanes.push(lane);lane=lanes[index]||lane;clearSelection();select({index:-1,tone:0});});
    $('zoom').addEventListener('change',()=>{draw();reveal(getSelection().measure);});
    $('tempo').addEventListener('change',()=>playback.stop());
    for(const [id,delta]of [['previous',-1],['next',1]])$(id).addEventListener('click',()=>{playback.stop();const s=getSelection();clearSelection();select({measure:s.measure+delta,index:-1,tone:0});reveal(s.measure+delta);});
    $('play').addEventListener('click',async()=>{
      if(playback.active){playback.stop();return;}
      const {d,s}=selected();
      try{
        const score=d.playback(s.part,lane.staff,lane.voice);if(!score.events.length)throw new Error('Add a note to hear a preview.');
        clearSelection();tool='select';$('error').hidden=true;
        const ready=playback.start(score,Number($('tempo').value));
        if(playback.active){$('play').textContent='■ Stop preview';$('play-status').textContent='Starting preview…';}
        await ready;if(playback.active)$('play-status').textContent='Playing this staff and voice';
      }
      catch(error){$('error').textContent=error.message;$('error').hidden=false;}
    });
    if(typeof ResizeObserver!=='undefined')new ResizeObserver(()=>{if(getDraft()&&$('dialog').open&&!gesture)draw();}).observe($('canvas-scroll'));
    return {render:draw,reveal,clearSelection,currentLane:()=>previousPart===getSelection().part?lane:getDraft()?.lanes(getSelection().part)[0],stop:()=>playback.stop(),close:()=>playback.close(),reset(){playback.stop();previousPart=-1;playing=null;tool='select';type='quarter';gesture=null;selectedGroups.clear();anchor=null;inputAccidental='key';$('input-dots').value='0';$('accidental').value='key';$('canvas-scroll').scrollLeft=$('canvas-scroll').scrollTop=0;updateTools();}};
  }
};
