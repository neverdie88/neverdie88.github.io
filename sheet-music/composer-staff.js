/* Editable staff geometry shared by pointer input, drawing and tests. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.ComposerStaff=api;})(globalThis,function(){
  const letters='CDEFGAB', naturals=[0,2,4,5,7,9,11];
  const stepOf=(note,clef)=>7*(note.octave-4)+letters.indexOf(note.step)-2+(clef==='bass'?12:0);
  const stemDown=steps=>Math.max(...steps)-4>=4-Math.min(...steps);
  const headHalf=9,stemInset=.8,headShift=2*(headHalf-stemInset);
  function accidentalColumns(group,ctx){
    const columns=[],marks=new Map();if(group.rest)return marks;
    const key=(ctx.fifths<0?'BEADGCF':'FCGDAEB').slice(0,Math.abs(ctx.fifths));
    const notes=group.notes.map((note,tone)=>({note,tone,step:stepOf(note,ctx.clef)})).filter(n=>n.note.alter||n.note.cancelAccidental||key.includes(n.note.step)).sort((a,b)=>b.step-a.step);
    for(const n of notes){
      let column=columns.findIndex(steps=>steps.every(step=>Math.abs(step-n.step)>=6));
      if(column<0){column=columns.length;columns.push([]);}columns[column].push(n.step);marks.set(n.tone,column);
    }
    return marks;
  }
  function pitchAt(y,bar,layout,accidental='key') {
    const step=Math.round(((bar.bottom??layout.bottom)-y)/layout.halfGap),diatonic=step+2-(bar.ctx.clef==='bass'?12:0)+28;
    const letter=letters[(diatonic%7+7)%7],octave=Math.floor(diatonic/7),fifths=bar.ctx.fifths;
    const inKey=(fifths<0?'BEADGCF':'FCGDAEB').slice(0,Math.abs(fifths)).includes(letter);
    const alter=accidental==='key'?(inKey?Math.sign(fifths):0):Number(accidental);
    const midi=naturals[letters.indexOf(letter)]+12*(octave+1)+alter;
    return {step:letter,octave,alter,midi};
  }
  function layout(entries,{staff='1',voice='1',width=Infinity}={}) {
    const halfGap=11,limit=Number.isFinite(width)?Math.max(280,width):Infinity;
    const rows=[],bars=[],hits=[],stems=[];let row=[],used=0;
    for(const entry of entries){
      const alterations=new Map();
      const groups=entry.groups.filter(g=>g.staff===staff&&g.voice===voice).map(group=>({...group,notes:group.notes.map(note=>{
        const id=note.step+note.octave,cancelAccidental=!note.alter&&!!alterations.get(id);
        if(!group.rest)alterations.set(id,note.alter);
        return {...note,cancelAccidental};
      })}));
      const meter=entry.ctx.beats.split('+').reduce((a,b)=>a+Number(b),0)*4/Number(entry.ctx.beatType);
      const columns=Math.max(0,...groups.flatMap(g=>[...accidentalColumns(g,entry.ctx).values()].map(c=>c+1)));
      const beats=Math.max(meter,...groups.map(g=>g.beat+g.duration),1),header=110+Math.abs(entry.ctx.fifths)*13+(columns?32+(columns-1)*28:0);
      const minimum=Math.max(28,groups.length*(24+columns*20)/beats),natural=Math.max(64,groups.length*(42+columns*20)/beats);
      const beatWidth=Math.max(minimum,Math.min(natural,(limit-40-header-28)/beats));
      const barWidth=header+beats*beatWidth+28;
      if(row.length&&(used+barWidth>limit-40||row.length===4)){rows.push({bars:row});row=[];used=0;}
      row.push({...entry,groups,meter,beats,header,beatWidth,barWidth});used+=barWidth;
    }
    if(row.length)rows.push({bars:row});
    let top=0,maxWidth=0;
    for(const [rowIndex,row] of rows.entries()){
      const ranges=row.bars.flatMap(bar=>bar.groups.filter(g=>!g.rest).map(g=>{
        const steps=g.notes.map(n=>stepOf(n,bar.ctx.clef)),stemmed=!['whole','breve'].includes(g.type),down=stemDown(steps);
        return {top:Math.max(...steps)+(stemmed&&!down?7:0),low:Math.min(...steps)-(stemmed&&down?7:0)};
      }));
      const high=Math.max(13,...ranges.map(r=>r.top)),low=Math.min(-5,...ranges.map(r=>r.low));
      row.top=top;row.bottom=top+32+(high+1)*halfGap;row.height=row.bottom-top-(low-3)*halfGap;
      let left=20;
      for(const bar of row.bars){
        Object.assign(bar,{left,start:left+bar.header,end:left+bar.barWidth,top,bottom:row.bottom,height:row.height,row:rowIndex});bars.push(bar);
        for(const group of bar.groups){
          const x=bar.start+group.beat*bar.beatWidth;
          const ordered=group.notes.map((note,tone)=>({note,tone,step:stepOf(note,bar.ctx.clef)})).sort((a,b)=>a.step-b.step);
          const down=!group.rest&&stemDown(ordered.map(n=>n.step));
          if(down)ordered.reverse();
          let last=-Infinity,displaced=false;const groupHits=[],marks=accidentalColumns(group,bar.ctx);
          for(const {note,tone,step} of group.rest?[{note:null,tone:0,step:4}]:ordered){
            displaced=Math.abs(step-last)===1?!displaced:false;last=step;
            const hit={measure:bar.measure,index:group.index,tone,note,rest:group.rest,x:x+(displaced?(down?-headShift:headShift):0),column:x,y:bar.bottom-step*halfGap,step,group,bar};hits.push(hit);groupHits.push(hit);
          }
          const markLeft=Math.min(...groupHits.map(n=>n.x))-29;
          for(const n of groupHits)if(marks.has(n.tone))n.accidentalX=markLeft-marks.get(n.tone)*28;
          if(!group.rest&&!['whole','breve'].includes(group.type)){
            const steps=ordered.map(n=>n.step),topY=bar.bottom-Math.max(...steps)*halfGap,lowY=bar.bottom-Math.min(...steps)*halfGap;
            stems.push({measure:bar.measure,index:group.index,group,down,x:x+(down?-1:1)*(headHalf-stemInset),start:down?topY+2:lowY-2,end:down?lowY+7*halfGap:topY-7*halfGap});
          }
        }
        left=bar.end;
      }
      maxWidth=Math.max(maxWidth,left+20);top+=row.height+20;
    }
    return {width:Math.max(maxWidth,Number.isFinite(limit)?limit:0),height:Math.max(0,top-20),bottom:rows[0]?.bottom||0,halfGap,bars,hits,stems,rows};
  }
  function target(layout,x,y,unit=.25,accidental='key') {
    const bar=layout.bars.find(b=>x>=b.start-18&&x<b.end&&y>=b.top&&y<b.top+b.height);
    if(!bar)return null;
    let beat=Math.max(0,Math.round((x-bar.start)/bar.beatWidth/unit)*unit);
    const nearbyRest=bar.groups.filter(g=>g.rest&&Math.abs(bar.start+g.beat*bar.beatWidth-x)<10).sort((a,b)=>Math.abs(bar.start+a.beat*bar.beatWidth-x)-Math.abs(bar.start+b.beat*bar.beatWidth-x))[0];
    if(nearbyRest)beat=nearbyRest.beat;
    return {bar,measure:bar.measure,beat,pitch:pitchAt(y,bar,layout,accidental),x:bar.start+beat*bar.beatWidth};
  }
  function hit(layout,x,y) {
    return layout.hits.map(n=>({...n,distance:Math.hypot((n.x-x)*1.2,n.y-y)})).filter(n=>n.distance<=25).sort((a,b)=>a.distance-b.distance)[0];
  }
  function groupsInRect(layout,a,b){
    const left=Math.min(a.x,b.x),right=Math.max(a.x,b.x),top=Math.min(a.y,b.y),bottom=Math.max(a.y,b.y);
    const groups=new Map();
    for(const n of layout.hits)if(n.x+9>=left&&n.x-9<=right&&n.y+8>=top&&n.y-8<=bottom)groups.set(`${n.measure}:${n.index}`,{measure:n.measure,index:n.index});
    return [...groups.values()];
  }
  function draw(svg,geometry,{P,glyphs,measure,selected,tone=0,playing=null,selectedGroups=new Set()}={}) {
    const doc=svg.ownerDocument,make=(tag,attrs={},value='')=>{const e=doc.createElementNS('http://www.w3.org/2000/svg',tag);for(const [k,v]of Object.entries(attrs))e.setAttribute(k,String(v));if(value)e.textContent=value;return e;};
    const add=(parent,tag,attrs,value)=>parent.appendChild(make(tag,attrs,value));
    const {halfGap,bars,hits,stems}=geometry;
    svg.setAttribute('viewBox',`0 0 ${geometry.width} ${geometry.height}`);svg.replaceChildren();
    const glyph=(parent,key,x,baseline,size=22)=>add(parent,'path',{d:glyphs[key].path,transform:`translate(${x} ${baseline}) scale(${size/glyphs.staffSpace} ${-size/glyphs.staffSpace})`,fill:'currentColor'});
    for(const bar of bars) {
      const y=step=>bar.bottom-step*halfGap;
      const layer=add(svg,'g',{'data-composer-measure':bar.measure,'data-composer-row':bar.row});
      if(bar.measure===measure)add(layer,'rect',{x:bar.left+1,y:bar.top+25,width:bar.end-bar.left-2,height:bar.height-45,fill:'#f1f7ff',rx:8});
      add(layer,'text',{x:bar.left+12,y:bar.top+20,fill:'#596575','font-size':13},`Measure ${bar.number}`);
      for(let step=0;step<=8;step+=2)add(layer,'line',{x1:bar.left,x2:bar.end,y1:y(step),y2:y(step),stroke:'#475569','stroke-width':1});
      const clef=P.CLEFS[bar.ctx.clef];
      if(clef)glyph(layer,clef.glyph,bar.left+8,y(clef.anchorStep));
      else add(layer,'text',{x:bar.left+8,y:y(4),'font-size':12},'Original clef');
      if(clef)P.keySignature(bar.ctx.fifths,bar.ctx.clef).forEach((mark,i)=>glyph(layer,mark.glyph,bar.left+65+i*13,y(mark.step),17));
      const timeX=bar.left+82+Math.abs(bar.ctx.fifths)*13;
      add(layer,'text',{x:timeX,y:y(5.1),'font-size':22,'text-anchor':'middle','font-family':'serif'},bar.ctx.beats);
      add(layer,'text',{x:timeX,y:y(1.1),'font-size':22,'text-anchor':'middle','font-family':'serif'},bar.ctx.beatType);
      for(let b=0;b<bar.meter;b++) {
        const x=bar.start+b*bar.beatWidth;
        add(layer,'line',{x1:x,x2:x,y1:y(11),y2:y(-3),stroke:'#d4dce7','stroke-dasharray':'3 5'});
        add(layer,'text',{x,y:bar.top+bar.height-14,'font-size':11,fill:'#64748b','text-anchor':'middle'},String(b+1));
      }
      add(layer,'line',{x1:bar.end,x2:bar.end,y1:y(8),y2:y(0),stroke:'#334155','stroke-width':1.5});
    }
    for(const n of hits){
      const chosen=selectedGroups.has(`${n.measure}:${n.index}`)||(n.measure===measure&&n.index===selected&&n.tone===tone),active=playing?.measure===n.measure&&playing.index===n.index;
      if(chosen||active)add(svg,'circle',{cx:n.x,cy:n.y,r:chosen?19:17,fill:active?'#b3e8c8':'#cce1ff',stroke:chosen?'#1464cc':'none','stroke-width':1.5,'pointer-events':'none'});
    }
    for(const stem of stems){
      const chosen=selectedGroups.has(`${stem.measure}:${stem.index}`)||(stem.measure===measure&&stem.index===selected),color=chosen?'#1464cc':'#18212e';
      const g=add(svg,'g',{'data-composer-stem':`${stem.measure}:${stem.index}`,color,'pointer-events':'none'});
      add(g,'line',{x1:stem.x,x2:stem.x,y1:stem.start,y2:stem.end,stroke:'currentColor','stroke-width':1.6});
      const count=['eighth','16th','32nd','64th','128th'].indexOf(stem.group.type)+1;
      for(let f=0;f<count;f++)add(g,'path',{d:`M${stem.x},${stem.end+(stem.down?-1:1)*f*7}q16,${stem.down?-11:11} 2,${stem.down?-24:24}`,fill:'none',stroke:'currentColor','stroke-width':2.5});
    }
    for(const n of hits) {
      const y=step=>n.bar.bottom-step*halfGap;
      const chosen=selectedGroups.has(`${n.measure}:${n.index}`)||(n.measure===measure&&n.index===selected&&n.tone===tone);
      const g=add(svg,'g',{'data-composer-note':`${n.measure}:${n.index}:${n.tone}`,'data-x':n.x,'data-y':n.y,tabindex:'-1',role:'button','aria-pressed':String(chosen),'aria-label':n.rest?`Rest, measure ${n.bar.number}, beat ${n.group.beat+1}`:`${n.note.step}${n.note.alter>0?' sharp':n.note.alter<0?' flat':''}${n.note.octave}, measure ${n.bar.number}, beat ${n.group.beat+1}`,style:'touch-action:none',color:chosen?'#1464cc':'#18212e'});
      add(g,'circle',{cx:n.x,cy:n.y,r:19,fill:'transparent'});
      if(n.rest) {
        if(['whole','half','measure'].includes(n.group.type))add(g,'rect',{x:n.x-8,y:n.group.type==='half'?y(4)-6:y(6),width:16,height:6,fill:'currentColor'});
        else if(n.group.type==='quarter')add(g,'path',{d:`M${n.x-3},${n.y-17}l8,10 -9,10 7,8q-13,-7 -6,7q-14,-7 -3,-13l-5,-7 8,-9z`,fill:'currentColor'});
        else {const count=Math.max(1,['eighth','16th','32nd','64th','128th'].indexOf(n.group.type)+1);add(g,'line',{x1:n.x+5,x2:n.x-3,y1:n.y-14,y2:n.y+19,stroke:'currentColor','stroke-width':2});for(let f=0;f<count;f++)add(g,'circle',{cx:n.x-2-f*2,cy:n.y-10+f*8,r:4,fill:'currentColor'});}
      } else {
        for(let s=-2;s>=n.step;s-=2)add(g,'line',{x1:n.x-14,x2:n.x+14,y1:y(s),y2:y(s),stroke:'currentColor','stroke-width':1.5});
        for(let s=10;s<=n.step;s+=2)add(g,'line',{x1:n.x-14,x2:n.x+14,y1:y(s),y2:y(s),stroke:'currentColor','stroke-width':1.5});
        const alter=n.note.alter;
        if(n.accidentalX!==undefined){const key=alter>0?'accidentalSharp':alter<0?'accidentalFlat':'accidentalNatural';glyph(g,key,n.accidentalX,n.y,16);if(Math.abs(alter)===2)glyph(g,key,n.accidentalX-10,n.y,16);}
        if(['whole','half'].includes(n.group.type))add(g,'ellipse',{cx:n.x,cy:n.y,rx:9,ry:5,transform:`rotate(-20 ${n.x} ${n.y})`,fill:'white',stroke:'currentColor','stroke-width':2});
        else glyph(g,'noteheadBlack',n.x-glyphs.noteheadBlack.width*15/glyphs.staffSpace/2,n.y,15);
      }
      for(let d=0;d<n.group.dots;d++)add(g,'circle',{cx:n.x+15+d*6,cy:n.y-(n.step%2===0?5:0),r:2,fill:'currentColor'});
    }
    return geometry;
  }
  return {layout,target,hit,pitchAt,stepOf,groupsInRect,draw};
});
