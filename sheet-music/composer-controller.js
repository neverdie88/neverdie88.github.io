/* Direct score input, selected-note editing, grouped selection and playback. */
globalThis.ScoreComposer={
  mount({getDraft,getSelection,select,mutate}) {
    const $=id=>document.getElementById('vp-editor-'+id),svg=$('canvas');
    let tool='select',type='quarter',lane={staff:'1',voice:'1'},geometry,gesture,playing=new Set(),previousPart=-1;
    let selectedNotes=new Set(),anchor=null,inputAccidental='key',inputDots=0,accidental='key';
    let keyboardEntry=false,inputCursor=null,lastMidi=60;
    const durationKeys={'1':'64th','2':'32nd','3':'16th','4':'eighth','5':'quarter','6':'half','7':'whole'};
    const noteMidi=note=>({C:0,D:2,E:4,F:5,G:7,A:9,B:11}[note.step]+Number(note.alter)+12*(note.octave+1));
    const key=ref=>`${ref.measure}:${ref.index}`;
    const noteKey=note=>`${key(note)}:${note.tone||0}`;
    const ref=value=>{const [measure,index,tone=0]=value.split(':').map(Number);return {measure,index,tone};};
    const isClefTool=()=>tool==='clef-treble'||tool==='clef-bass';
    const hints={select:'Drag from blank space to select notes; tap blank space to clear. Use Set start / Set end, then click a measure to choose the playback range.',note:'Choose a length, then tap a beat to add a note.',rest:'Tap a beat to write a rest, or tap a note to turn it into a rest.',chord:'Tap above or below a note at the same beat to add a chord tone.',erase:'Tap a note, accidental or clef change to erase it. Drag a rectangle to erase notes together. Undo restores each edit.',
      'clef-treble':'G clef: tap a note or rest to insert before it, or tap the beginning of a measure.',
      'clef-bass':'F clef: tap a note or rest to insert before it, or tap the beginning of a measure.'};
    function selected(){
      const d=getDraft(),s=getSelection();
      return {d,s,g:d?.inspect(s.part,s.measure).groups[s.index]};
    }
    function propertySelection(){
      const current=selected();
      if(keyboardEntry||selectedNotes.size>1)return {...current,g:null};
      if(!selectedNotes.size)return current;
      const s={...current.s,...ref([...selectedNotes][0])};
      return {d:current.d,s,g:current.d?.inspect(s.part,s.measure).groups[s.index]};
    }
    const playback=ScorePlayback.create({
      onLoading(count,total){$('play-status').textContent=total?`Loading grand piano… ${Math.round(count/total*100)}%`:'Playing the selection or score';},
      onNotes(events){
        playing=new Set(events.map(noteKey));draw();
        const event=events.at(-1);if(event)reveal(event.measure,getDraft()?.inspect(getSelection().part,event.measure).groups[event.index]?.staff);
      },
      onStop(){playing.clear();$('play').textContent='▶ Play';$('play-status').textContent='';if(getDraft())draw();}
    });
    const playbackRange=ScorePlayback.mountRange({start:$('play-start'),end:$('play-end'),all:$('play-all'),status:$('play-range-status'),
      onArm(){playback.stop();tool='select';clearSelection(true);},onChange(){playback.stop();clearSelection(true);}});
    let engravingError=false;
    const engraving=ScoreEngraver.createEditor(svg,{
      onReady(value){geometry=value;if(engravingError){$('error').hidden=true;engravingError=false;}reveal(getSelection().measure);},
      onError(error){geometry=null;engravingError=true;$('error').textContent='The editing score could not be drawn. '+error.message;$('error').hidden=false;}
    });
    function clearSelection(refresh=false){cancel();selectedNotes.clear();anchor=null;keyboardEntry=false;inputCursor=null;select({index:-1,tone:0},false);if(refresh)draw();}
    function setTool(value){
      playbackRange.cancel(false);
      keyboardEntry=false;inputCursor=null;
      playback.stop();cancel();
      if(['note','rest','chord','erase','clef-treble','clef-bass'].includes(value)){
        const hadSelection=!!selected().g;clearSelection();
        if(hadSelection&&['note','chord'].includes(value))inputAccidental='key';
      }
      tool=value;draw();
    }
    function updateTools(){
      const {g}=selected(),multi=selectedNotes.size>0,property=propertySelection().g;
      for(const button of $('actions').querySelectorAll('[data-composer-tool]'))button.setAttribute('aria-pressed',String(button.dataset.composerTool===tool));
      for(const button of $('palette').querySelectorAll('[data-length]')){button.setAttribute('aria-pressed',String(!isClefTool()&&button.dataset.length===type));button.disabled=selectedNotes.size>1||!!property&&!property.rhythmEditable;}
      // Opening this row must not move the staff between pointerdown and pointerup.
      if(!gesture)$('note-properties').hidden=!property;
      for(const button of $('note-properties').querySelectorAll('[data-dots]')){
        button.disabled=!property?.rhythmEditable;
        button.setAttribute('aria-pressed',String(Number(button.dataset.dots)===inputDots));
      }
      for(const button of $('note-properties').querySelectorAll('[data-accidental]')){
        button.disabled=!property||property.rest;
        button.setAttribute('aria-pressed',String(!property?.rest&&button.dataset.accidental===accidental));
      }
      const count=selectedNotes.size||(!multi&&g&&!g.rest?1:0);
      $('delete-selected').disabled=$('clear-selection').disabled=!count&&!g;
      $('selection-status').textContent=count?`${count} ${count===1?'note':'notes'} selected`:g?.rest?'Rest selected':'';
      svg.dataset.tool=tool;
      if(!playback.active)$('play').textContent=count||g?'▶ Play selection':playbackRange.snapshot().custom?'▶ Play range':'▶ Play';
      $('hint').textContent=g&&!multi&&['select','note'].includes(tool)?'Use ↑ / ↓ to move the selection, or change length, dots or accidental. Transpose moves the whole score.':hints[tool];
    }
    function shiftPitch(steps){
      const {d,s,g}=selected(),refs=selectedNotes.size?[...selectedNotes].map(ref):g&&!g.rest?[{measure:s.measure,index:s.index,tone:s.tone}]:[];
      if(!refs.length)return;
      if(mutate(()=>d.shiftPitch(s.part,refs,steps))&&g&&!g.rest){
        const note=d.inspect(s.part,s.measure).groups[s.index]?.notes[s.tone];if(note)lastMidi=noteMidi(note);
      }
    }
    function changeLength(value,dots){
      const {d,s,g}=propertySelection();type=value;inputDots=dots;
      if(g)mutate(()=>d.length(s.part,s.measure,s.index,value,dots));
      else {if(!['rest','chord','erase'].includes(tool)&&!selectedNotes.size)tool='note';updateTools();}
    }
    for(const [value,label] of Object.entries({whole:'Whole',half:'Half',quarter:'Quarter',eighth:'Eighth','16th':'16th','32nd':'32nd','64th':'64th'})) {
      const button=document.createElement('button');button.type='button';button.className='btn';button.dataset.length=value;button.title=value==='eighth'?'Quaver (eighth note)':label+' note';button.setAttribute('aria-label',button.title);
      const hollow=value==='whole'||value==='half',flags=['eighth','16th','32nd','64th'].indexOf(value)+1;
      const shape=`<ellipse cx="9" cy="24" rx="6" ry="4" transform="rotate(-20 9 24)" fill="${hollow?'none':'currentColor'}" stroke="currentColor" stroke-width="1.6"/>`+(value==='whole'?'':'<path d="M14 24V3" fill="none" stroke="currentColor" stroke-width="1.6"/>')+Array.from({length:Math.max(0,flags)},(_,i)=>`<path d="M14 ${3+i*4}q12 5 5 12" fill="none" stroke="currentColor" stroke-width="1.6"/>`).join('');
      const shortcut=Object.keys(durationKeys).find(k=>durationKeys[k]===value);button.title+=` (${shortcut})`;
      button.innerHTML=`<svg viewBox="0 0 28 34" aria-hidden="true">${shape}</svg><span>${label} <kbd>${shortcut}</kbd></span>`;
      button.addEventListener('click',()=>changeLength(value,inputDots));$('palette').append(button);
    }
    for(const [value,label,glyph,transform]of [['treble','G clef',ViolinMusicGlyphs.gClef,'translate(8 22) scale(.017 -.017)'],['bass','F clef',ViolinMusicGlyphs.fClef,'translate(4 12) scale(.028 -.028)']]){
      const button=document.createElement('button');button.type='button';button.className='btn';button.dataset.composerTool=`clef-${value}`;
      button.setAttribute('aria-label',`Insert ${label}`);button.title=`Insert ${label} at a note, rest or measure start`;
      button.innerHTML=`<svg viewBox="0 0 28 34" aria-hidden="true"><path d="${glyph.path}" transform="${transform}" fill="currentColor"/></svg><span>${label}</span>`;
      $('palette').append(button);
    }
    const restButton=document.createElement('button');restButton.type='button';restButton.className='btn';restButton.dataset.composerTool='rest';
    restButton.setAttribute('aria-label','Insert rest');restButton.title='Insert a rest using the selected note length';
    // Quarter-rest outline from the bundled OSMD/VexFlow music font (v7c).
    restButton.innerHTML='<svg viewBox="0 0 28 34" aria-hidden="true"><path fill="currentColor" transform="translate(10 16) scale(.026 -.026)" d="M49 505 C50 505 51 506 53 506 C58 506 62 503 70 496 C73 492 78 488 81 485 L96 473 L111 459 L122 449 L134 438 L182 396 L255 330 C292 298 292 298 292 291 L292 290 L292 284 L283 270 C234 197 209 113 209 36 C209 -44 235 -119 288 -170 C295 -179 299 -181 299 -184 C300 -187 300 -188 300 -191 C300 -199 294 -206 285 -206 C283 -206 281 -206 280 -206 C270 -202 259 -201 247 -201 C223 -201 197 -208 176 -222 C136 -249 114 -292 114 -340 C114 -384 134 -433 172 -471 C182 -481 185 -487 185 -492 C185 -496 183 -499 181 -502 C176 -505 174 -508 171 -508 C166 -508 160 -503 152 -498 C65 -428 12 -352 0 -284 C0 -278 0 -270 0 -260 C0 -252 0 -242 1 -238 C16 -177 73 -140 148 -140 C167 -140 189 -142 209 -148 C212 -148 215 -149 215 -149 C215 -149 215 -149 215 -149 L215 -149 C215 -148 209 -142 201 -136 L157 -97 L96 -41 C21 24 17 29 17 34 C17 36 17 36 17 37 C17 37 17 38 17 38 C17 44 17 44 25 56 C81 131 110 219 110 298 C110 367 88 431 46 474 C40 480 38 487 38 491 C38 498 42 502 49 505 Z"/></svg><span>Rest</span>';
    $('palette').append(restButton);
    function propertyButton(group,data,value,label,shape){
      const button=document.createElement('button');button.type='button';button.className='btn';button.dataset[data]=value;
      button.title=label;button.setAttribute('aria-label',label);button.setAttribute('aria-pressed','false');
      button.innerHTML=`<svg viewBox="0 0 28 34" aria-hidden="true">${shape}</svg>`;$(group).append(button);return button;
    }
    for(const [value,label,shape]of [
      [0,'Remove dots','<circle cx="14" cy="17" r="3" fill="currentColor"/><path d="M7 24L21 10" stroke="currentColor" stroke-width="1.5"/>'],
      [1,'Dotted','<circle cx="14" cy="17" r="3" fill="currentColor"/>'],
      [2,'Double dotted','<circle cx="9" cy="17" r="3" fill="currentColor"/><circle cx="19" cy="17" r="3" fill="currentColor"/>']
    ])propertyButton('dots','dots',String(value),label,shape).addEventListener('click',()=>changeLength(type,value));
    const glyph=(name,transform)=>`<path d="${ViolinMusicGlyphs[name].path}" transform="${transform}" fill="currentColor"/>`;
    for(const [value,label,shape]of [
      ['key','Use key signature','<path d="M6 12a10 10 0 1 1-1 12M6 6v8h8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>'],
      ['0','Natural',glyph('accidentalNatural','translate(11 18) scale(.031 -.031)')],
      ['1','Sharp',glyph('accidentalSharp','translate(10 18) scale(.031 -.031)')],
      ['-1','Flat',glyph('accidentalFlat','translate(11 22) scale(.031 -.031)')],
      ['2','Double sharp','<path d="M7 10h5v4l2 2 2-2v-4h5v5h-4l-2 2 2 2h4v5h-5v-4l-2-2-2 2v4H7v-5h4l2-2-2-2H7z" fill="currentColor"/>'],
      ['-2','Double flat',glyph('accidentalFlat','translate(6 22) scale(.031 -.031)')+glyph('accidentalFlat','translate(15 22) scale(.031 -.031)')]
    ])propertyButton('accidentals','accidental',value,label,shape).addEventListener('click',()=>{
      const {d,s,g}=propertySelection();if(!g||g.rest)return;
      inputAccidental=value;
      const note=g.notes[s.tone]||g.notes[0],choice=value,fifths=d.context(s.part,s.measure,g.staff,g.beat).fifths;
      const alter=choice==='key'?((fifths<0?'BEADGCF':'FCGDAEB').slice(0,Math.abs(fifths)).includes(note.step)?Math.sign(fifths):0):Number(choice);
      mutate(()=>d.pitch(s.part,s.measure,s.index,s.tone,{...note,alter}));
    });
    $('actions').querySelectorAll('[data-composer-tool]').forEach(button=>button.addEventListener('click',()=>setTool(button.dataset.composerTool)));
    function draw(){
      const {d:draft,s:selection,g:group}=selected();if(!draft)return;
      const snapshot=draft.inspect(selection.part,selection.measure),lanes=draft.lanes(selection.part);
      if(previousPart!==selection.part)playbackRange.reset(snapshot.parts[selection.part].measures);else playbackRange.update(snapshot.parts[selection.part].measures);
      if(previousPart!==selection.part){selectedNotes.clear();anchor=null;lane=group?{staff:group.staff,voice:group.voice}:lanes[0];previousPart=selection.part;}
      if(group&&!(group.staff===lane.staff&&group.voice===lane.voice)){selectedNotes.clear();lane={staff:group.staff,voice:group.voice};}
      if(!lanes.some(l=>l.staff===lane.staff&&l.voice===lane.voice))lanes.push(lane);
      $('part-picker').hidden=snapshot.parts.length<2;
      const zoom=Number($('zoom').value),width=($('canvas-scroll').clientWidth||800)/zoom;
      engraving.draw(draft,selection.part,Math.max(280,width),zoom,{staff:lane.staff,measure:selection.measure,selected:selectedNotes.size?-1:selection.index,tone:selection.tone,playing,selectedNotes:new Set(selectedNotes),cursor:keyboardEntry?inputCursor:null,playbackRange:playbackRange.snapshot()});
      const property=propertySelection();
      if(property.g){
        const g=property.g;
        type=g.type==='measure'?(Object.keys(ScoreEditorModel.TYPES).find(t=>ScoreEditorModel.TYPES[t]===g.duration)||'whole'):g.type;
        inputDots=g.dots;
        if(!g.rest)accidental=String((g.notes[property.s.tone]||g.notes[0]).alter);
      }else accidental=inputAccidental;
      updateTools();
      if(keyboardEntry&&inputCursor){
        $('hint').textContent=`Note entry · measure ${inputCursor.measure+1}, beat ${+(inputCursor.beat+1).toFixed(3)} · A–G: notes · 0: rest · Esc: select`;
      }
    }
    function reveal(measure,staff=lane.staff){
      const bar=geometry?.bars.find(b=>b.measure===measure&&b.staff===staff);if(!bar)return;
      const pane=$('canvas-scroll'),scale=Number($('zoom').value),left=bar.left*scale,top=bar.top*scale,bottom=(bar.top+bar.height)*scale;
      if(left<pane.scrollLeft||left>pane.scrollLeft+pane.clientWidth-60)pane.scrollLeft=Math.max(0,left-12);
      if(top<pane.scrollTop||bottom>pane.scrollTop+pane.clientHeight)pane.scrollTop=Math.max(0,top);
    }
    function point(event){const p=svg.createSVGPoint();p.x=event.clientX;p.y=event.clientY;return p.matrixTransform(svg.getScreenCTM().inverse());}
    // Selecting the last inserted note updates its controls, but must not turn
    // key-aware input into that note's explicit sharp or natural.
    function locate(p){return ComposerStaff.target(geometry,p.x,p.y,Math.min(.25,(ScoreEditorModel.TYPES[type]||1)/2**inputDots),inputAccidental);}
    function erase(notes){
      const {d,s}=selected();
      const refs=[...new Map(notes.map(n=>[`${key(n)}:${n.tone}`,n])).values()]
        .filter(n=>!d.inspect(s.part,n.measure).groups[n.index].rest)
        .sort((a,b)=>b.measure-a.measure||b.index-a.index||b.tone-a.tone);
      if(!refs.length)return;
      mutate(()=>{
        d.transaction(()=>{
          for(const note of refs){
            const g=d.inspect(s.part,note.measure).groups[note.index];
            if(g.notes.length>1)d.removeTone(s.part,note.measure,note.index,note.tone);
            else d.rest(s.part,note.measure,note.index,true);
          }
        });
        clearSelection();
      });
    }
    function focusStaffAt(measure,staff){
      if(staff!==lane.staff)lane=getDraft().lanes(getSelection().part).find(l=>l.staff===staff)||{staff,voice:'1'};
      clearSelection();select({measure,index:-1,tone:0});reveal(measure,staff);
    }
    function eraseSymbol(symbol){
      const {d,s}=selected();
      mutate(()=>{
        if(symbol.kind==='clef'&&symbol.inherited)throw new Error('This clef continues from an earlier measure. Erase the earlier change, or use Select to switch this clef here.');
        if(symbol.kind==='clef')d.removeClef(s.part,symbol.measure,symbol.staff,symbol.beat);
        else d.removeAccidental(s.part,symbol.measure,symbol.index,symbol.tone);
        focusStaffAt(symbol.measure,symbol.staff);
      });
    }
    function writeClef(value,measure,staff,beat){
      const {d,s}=selected();
      mutate(()=>{d.changeClef(s.part,measure,staff,beat,value);focusStaffAt(measure,staff);});
    }
    function toggleClef(symbol){
      if(!['treble','bass'].includes(symbol.value))return;
      writeClef(symbol.value==='treble'?'bass':'treble',symbol.measure,symbol.staff,symbol.beat);
    }
    function clefPoint(p){
      const target=locate(p);if(!target)return null;
      const symbol=ComposerStaff.symbolAt(geometry,p.x,p.y);
      if(symbol?.kind==='clef')return {...target,beat:symbol.beat};
      const hit=ComposerStaff.hit(geometry,p.x,p.y);
      const beat=hit?.bar===target.bar?hit.group.beat:p.x<target.bar.start?0:
        geometry.hits.filter(n=>n.bar===target.bar).sort((a,b)=>Math.abs(a.column-p.x)-Math.abs(b.column-p.x))[0]?.group.beat||0;
      return {...target,beat};
    }
    function deleteSelected(){
      const {d,s,g}=selected(),refs=selectedNotes.size?[...selectedNotes].map(ref):g?[{measure:s.measure,index:s.index,tone:s.tone}]:[];
      if(!refs.length)return;
      if(selectedNotes.size){erase(refs);return;}
      mutate(()=>{d.removeMany(s.part,refs);clearSelection();});
    }
    $('delete-selected').addEventListener('click',deleteSelected);
    $('clear-selection').addEventListener('click',()=>clearSelection(true));
    function selectGroup(note,event){
      if(note.rest)return;
      const item={measure:note.measure,index:note.index,tone:note.tone},id=noteKey(item);
      if(event.shiftKey&&anchor){
        const all=geometry.hits.filter(n=>!n.rest),a=all.findIndex(n=>noteKey(n)===noteKey(anchor)),b=all.findIndex(n=>noteKey(n)===id);
        if(a>=0&&b>=0){if(!event.ctrlKey&&!event.metaKey)selectedNotes.clear();for(const n of all.slice(Math.min(a,b),Math.max(a,b)+1))selectedNotes.add(noteKey(n));}
      }else {if(selectedNotes.has(id))selectedNotes.delete(id);else selectedNotes.add(id);anchor=item;}
      select({measure:item.measure,index:-1,tone:0});
    }
    function ghost(p){
      svg.querySelector('[data-composer-ghost]')?.remove();const target=locate(p);if(!target)return;
      const g=document.createElementNS(svg.namespaceURI,'g');g.dataset.composerGhost='true';g.setAttribute('pointer-events','none');
      const bar=gesture?.hit?.bar||target.bar,beat=gesture?.hit?.group.beat??target.beat,ctx=ComposerStaff.contextAt(bar,beat);
      const pitch=ComposerStaff.pitchAt(p.y,bar,geometry,gesture?.hit?accidental:inputAccidental,beat);
      const x=gesture?.hit&&!gesture.hit.rest?gesture.hit.x:target.x,y=bar.bottom-ComposerStaff.stepOf(pitch,ctx.clef)*(bar.halfGap||geometry.halfGap);
      const head=document.createElementNS(svg.namespaceURI,'path'),glyph=ViolinMusicGlyphs.noteheadBlack,scale=10/ViolinMusicGlyphs.staffSpace;
      for(const [k,v] of Object.entries({d:glyph.path,transform:`translate(${x-glyph.width*scale/2} ${y}) scale(${scale} ${-scale})`,fill:'#1479dd',opacity:.6}))head.setAttribute(k,v);g.append(head);svg.append(g);
      $('hint').textContent=`${pitch.step}${pitch.alter>0?'♯':pitch.alter<0?'♭':''}${pitch.octave} · measure ${bar.number}, beat ${+(target.beat+1).toFixed(3)}`;
    }
    function box(p){
      svg.querySelector('[data-composer-box]')?.remove();const start=gesture.start,layer=document.createElementNS(svg.namespaceURI,'g'),rect=document.createElementNS(svg.namespaceURI,'rect');
      layer.dataset.composerBox='true';layer.setAttribute('pointer-events','none');
      const color=gesture.erase?'#dc2626':'#1479dd';
      for(const [k,v] of Object.entries({x:Math.min(start.x,p.x),y:Math.min(start.y,p.y),width:Math.abs(p.x-start.x),height:Math.abs(p.y-start.y),fill:color+'18',stroke:color,'stroke-dasharray':'5 3'}))rect.setAttribute(k,v);
      layer.append(rect);
      if(gesture.erase||gesture.multi){
        const notes=ComposerStaff.notesInRect(geometry,start,p);
        for(const n of notes){
          const mark=document.createElementNS(svg.namespaceURI,'rect');
          for(const [k,v] of Object.entries({[gesture.erase?'data-erase-note':'data-select-note']:noteKey(n),x:n.x-9,y:n.y-8,width:18,height:16,rx:3,fill:color,opacity:.3}))mark.setAttribute(k,v);
          layer.append(mark);
        }
        $('selection-status').textContent=`${notes.length} ${notes.length===1?'note':'notes'} to ${gesture.erase?'erase':'select'}`;
      }
      svg.append(layer);
    }
    svg.addEventListener('pointerdown',event=>{
      if(event.button!==0||gesture||!getDraft()||!geometry||engraving.busy)return;playback.stop();const p=point(event),symbol=ComposerStaff.symbolAt(geometry,p.x,p.y),hit=symbol?null:ComposerStaff.hit(geometry,p.x,p.y),target=locate(p);
      if(playbackRange.setting){
        const bar=geometry.bars.find(b=>p.x>=b.left&&p.x<=b.end&&p.y>=b.top&&p.y<=b.top+b.height);
        if(!bar)return;gesture={id:event.pointerId,start:p,moved:false,range:true,measure:bar.measure};svg.setPointerCapture?.(event.pointerId);svg.focus({preventScroll:true});return;
      }
      keyboardEntry=false;inputCursor=null;
      const erasing=tool==='erase',multi=tool==='select'&&(event.shiftKey||event.ctrlKey||event.metaKey||!hit&&!symbol);
      if(!target&&!multi&&!erasing)return;
      if(target&&(tool!=='select'||hit)){const staff=target.bar.staff;lane=hit?{staff:hit.staff,voice:hit.voice}:staff===lane.staff?lane:getDraft().lanes(getSelection().part).find(l=>l.staff===staff)||{staff,voice:'1'};}
      const current=selected();
      const additive=event.shiftKey||event.ctrlKey||event.metaKey;
      gesture={id:event.pointerId,start:p,hit,target,symbol,moved:false,multi,erase:erasing,add:additive,base:multi&&additive&&current.g&&!current.g.rest?{measure:current.s.measure,index:current.s.index,tone:current.s.tone}:null};
      svg.setPointerCapture?.(event.pointerId);
      if(!multi&&!erasing&&!isClefTool()){selectedNotes.clear();if(hit&&tool!=='chord'&&(!hit.rest||!['note','rest'].includes(tool)))select({measure:hit.measure,index:hit.index,tone:hit.tone});}
      svg.focus({preventScroll:true});
    });
    svg.addEventListener('pointermove',event=>{
      if(!geometry||engraving.busy)return;const p=point(event);
      if(gesture){
        if(gesture.id!==event.pointerId)return;
        gesture.moved ||= Math.hypot(p.x-gesture.start.x,p.y-gesture.start.y)>4;
        if(gesture.range)return;
        if((gesture.multi||gesture.erase)&&gesture.moved)box(p);
        else if(gesture.hit&&!gesture.hit.rest&&['select','note'].includes(tool))ghost(p);
      }else if(tool==='note'||tool==='chord')ghost(p);
    });
    function cancel(){const id=gesture?.id;gesture=null;if(id!==undefined&&svg.hasPointerCapture?.(id))svg.releasePointerCapture(id);svg.querySelector('[data-composer-ghost]')?.remove();svg.querySelector('[data-composer-box]')?.remove();updateTools();}
    svg.addEventListener('pointercancel',event=>{if(gesture?.id===event.pointerId)cancel();});svg.addEventListener('lostpointercapture',event=>{if(gesture?.id===event.pointerId)cancel();});svg.addEventListener('pointerleave',()=>{if(!gesture)cancel();});
    svg.addEventListener('pointerup',event=>{
      if(!gesture||gesture.id!==event.pointerId)return;
      const action=gesture,p=point(event),target=locate(p),{d,s}=selected();cancel();
      action.moved ||= Math.hypot(p.x-action.start.x,p.y-action.start.y)>4;
      if(action.range){if(!action.moved)playbackRange.choose(action.measure);return;}
      if(action.erase){
        if(!action.moved&&action.symbol){eraseSymbol(action.symbol);return;}
        erase(action.moved?ComposerStaff.notesInRect(geometry,action.start,p):action.hit?[action.hit]:[]);return;
      }
      if(action.multi){
        if(action.base){selectedNotes.add(noteKey(action.base));anchor=action.base;}
        if(action.moved){if(!action.add)selectedNotes.clear();for(const n of ComposerStaff.notesInRect(geometry,action.start,p))selectedNotes.add(noteKey(n));select({index:-1,tone:0});}
        else if(action.hit)selectGroup(action.hit,event);else clearSelection(true);
        updateTools();return;
      }
      if(!action.moved&&tool==='select'&&action.symbol?.kind==='clef'){toggleClef(action.symbol);return;}
      if(isClefTool()){
        if(!action.moved){const at=clefPoint(p);if(at)writeClef(tool.slice(5),at.measure,at.bar.staff,at.beat);}
        return;
      }
      if(!target)return;
      if(action.moved){
        if(action.hit&&!action.hit.rest&&['select','note'].includes(tool)) {
          if(!['treble','bass'].includes(action.hit.ctx.clef)){$('hint').textContent='Pitch editing supports treble and bass clefs.';return;}
          const value=ComposerStaff.pitchAt(p.y,action.hit.bar,geometry,accidental,action.hit.group.beat);
          mutate(()=>d.pitch(s.part,action.hit.measure,action.hit.index,action.hit.tone,value));
        }
        return;
      }
      if(tool==='select')return;
      if(tool==='chord'){
        if(!['treble','bass'].includes(target.ctx.clef)){$('hint').textContent='Pitch editing supports treble and bass clefs.';return;}
        const column=geometry.hits.filter(n=>n.measure===target.measure&&n.staff===lane.staff&&n.voice===lane.voice&&!n.rest&&Math.abs(n.column-p.x)<20).sort((a,b)=>Math.abs(a.column-p.x)-Math.abs(b.column-p.x))[0];
        if(!column){$('hint').textContent='Tap above or below an existing note to build a chord.';return;}
        const g=d.inspect(s.part,column.measure).groups[column.index];
        if(g.notes.some(n=>n.step===target.pitch.step&&n.alter===target.pitch.alter&&n.octave===target.pitch.octave)){select({measure:column.measure,index:column.index,tone:0});return;}
        mutate(()=>{d.addTone(s.part,column.measure,column.index,target.pitch);select({measure:column.measure,index:column.index,tone:g.notes.length},false);});return;
      }
      if(action.hit&&!action.hit.rest){if(tool==='rest')mutate(()=>d.rest(s.part,action.hit.measure,action.hit.index,true));return;}
      if(!['treble','bass'].includes(target.ctx.clef)){$('hint').textContent='Pitch editing supports treble and bass clefs.';return;}
      const input={type,dots:inputDots,pitch:tool==='rest'?null:target.pitch,...lane};
      mutate(()=>{const index=d.place(s.part,target.measure,target.beat,input);select({measure:target.measure,index,tone:0},false);});
    });
    function beginInput(){
      const {d,s,g}=selected(),ctx=d.context(s.part,s.measure,lane.staff,g?.beat||0);
      const start={measure:s.measure,beat:g?.beat??0},note=g&&!g.rest?(g.notes[s.tone]||g.notes[0]):null;
      lastMidi=note?noteMidi(note):ctx.clef==='bass'?48:60;
      setTool('note');keyboardEntry=true;inputCursor=start;draw();
    }
    function inputNote(letter,chord=false){
      if(!keyboardEntry&&!chord)beginInput();
      const {d,s,g}=selected();
      const point=chord?{measure:s.measure,beat:g?.beat??0}:{...inputCursor};
      if(chord&&(!g||g.rest)){$('hint').textContent='Select a note before adding a chord tone.';return;}
      if(chord&&!keyboardEntry)lastMidi=noteMidi(g.notes[s.tone]||g.notes[0]);
      let ctx=d.context(s.part,Math.min(point.measure,d.inspect().parts[s.part].measures.length-1),lane.staff,point.beat);
      const meter=()=>ctx.beats.split('+').reduce((a,b)=>a+Number(b),0)*4/Number(ctx.beatType);
      if(!chord&&point.beat>=meter()-1e-7){point.measure++;point.beat=0;ctx=d.context(s.part,Math.min(point.measure,d.inspect().parts[s.part].measures.length-1),lane.staff,0);}
      let pitch=null,midi=lastMidi;
      if(letter){
        const alter=inputAccidental==='key'?((ctx.fifths<0?'BEADGCF':'FCGDAEB').slice(0,Math.abs(ctx.fifths)).includes(letter)?Math.sign(ctx.fifths):0):Number(inputAccidental);
        const candidates=Array.from({length:9},(_,octave)=>({step:letter,alter,octave,midi:{C:0,D:2,E:4,F:5,G:7,A:9,B:11}[letter]+alter+12*(octave+1)})).filter(n=>n.midi>=21&&n.midi<=108);
        const chosen=candidates.sort((a,b)=>Math.abs(a.midi-lastMidi)-Math.abs(b.midi-lastMidi))[0];
        pitch={step:chosen.step,alter:chosen.alter,octave:chosen.octave};midi=chosen.midi;
      }
      const duration=ScoreEditorModel.TYPES[type]*(2-2**(-inputDots));
      const ok=mutate(()=>d.transaction(()=>{
        if(chord){
          if(!g.notes.some(n=>n.step===pitch.step&&n.alter===pitch.alter&&n.octave===pitch.octave)){
            d.addTone(s.part,s.measure,s.index,pitch);select({tone:g.notes.length},false);
          }
          return;
        }
        while(d.inspect().parts[s.part].measures.length<=point.measure)d.addMeasure(s.part);
        const occupied=d.inspect(s.part,point.measure).groups.find(n=>n.staff===lane.staff&&n.voice===lane.voice&&Math.abs(n.beat-point.beat)<1e-7);
        if(occupied&&!occupied.rest)d.rest(s.part,point.measure,occupied.index,true);
        const index=d.place(s.part,point.measure,point.beat,{type,dots:inputDots,pitch,...lane});
        select({measure:point.measure,index,tone:0},false);
      }));
      if(ok){lastMidi=midi;if(!chord)inputCursor={measure:point.measure,beat:point.beat+duration};draw();reveal(point.measure);}
    }
    $('dialog').addEventListener('keydown',event=>{
      if(!getDraft()||event.target.closest?.('input,select,textarea,[contenteditable="true"]'))return;
      if(event.target.closest?.('button')&&['Enter',' '].includes(event.key))return;
      if(playbackRange.setting){
        if(event.key==='Escape'){event.preventDefault();playbackRange.cancel();return;}
        const target=event.target.closest?.('[data-playback-measure]');
        if(target&&['Enter',' '].includes(event.key)){event.preventDefault();playbackRange.choose(Number(target.dataset.playbackMeasure));svg.focus({preventScroll:true});return;}
        if(event.key==='Tab')return;
        // Avoid entering notes or changing tools while choosing a boundary.
        if(event.target.closest?.('button')&&['Enter',' '].includes(event.key))return;
        event.preventDefault();return;
      }
      if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='a'){
        if(!geometry||engraving.busy)return;event.preventDefault();setTool('select');selectedNotes=new Set(geometry.hits.filter(n=>!n.rest).map(noteKey));select({index:-1,tone:0});return;
      }
      if(event.key==='Escape'){event.preventDefault();setTool('select');clearSelection(true);return;}
      if((event.ctrlKey||event.metaKey)&&['ArrowUp','ArrowDown'].includes(event.key)){
        event.preventDefault();shiftPitch(event.key==='ArrowUp'?7:-7);return;
      }
      if(event.ctrlKey||event.metaKey||event.altKey)return;
      if(event.key.toLowerCase()==='n'){event.preventDefault();if(keyboardEntry)setTool('select');else beginInput();return;}
      if(durationKeys[event.key]){event.preventDefault();changeLength(durationKeys[event.key],inputDots);return;}
      if(event.key==='.'){event.preventDefault();changeLength(type,(inputDots+1)%3);return;}
      if(/^[a-g]$/i.test(event.key)||event.key==='0'){event.preventDefault();inputNote(event.key==='0'?null:event.key.toUpperCase(),event.shiftKey&&event.key!=='0');return;}
      if(event.key===' '){event.preventDefault();if(!event.repeat)$('play').click();return;}
      if(['ArrowLeft','ArrowRight'].includes(event.key)){
        if(!geometry||engraving.busy)return;event.preventDefault();const {s}=selected(),all=geometry.bars.flatMap(b=>b.groups.filter(g=>g.staff===lane.staff&&g.voice===lane.voice).map(g=>({measure:b.measure,index:g.index}))),index=all.findIndex(g=>g.measure===s.measure&&g.index===s.index);
        const next=all[Math.max(0,Math.min(all.length-1,index+(event.key==='ArrowRight'?1:-1)))];
        if(next){keyboardEntry=false;inputCursor=null;selectedNotes.clear();anchor=null;select({...next,tone:0});reveal(next.measure);}return;
      }
      if(['Delete','Backspace'].includes(event.key)){event.preventDefault();deleteSelected();return;}
      if(['ArrowUp','ArrowDown'].includes(event.key)){event.preventDefault();shiftPitch(event.key==='ArrowUp'?1:-1);}
    });
    svg.addEventListener('click',event=>{
      if(event.detail!==0)return;
      if(playbackRange.setting){const target=event.target.closest('[data-playback-measure]');if(target)playbackRange.choose(Number(target.dataset.playbackMeasure));return;}
      playback.stop();
      const symbolElement=event.target.closest('[data-composer-symbol]'),symbol=symbolElement&&geometry?.symbols.find(s=>s.id===symbolElement.dataset.composerSymbol);
      if(symbol){if(tool==='erase')eraseSymbol(symbol);else if(tool==='select'&&symbol.kind==='clef')toggleClef(symbol);else if(isClefTool())writeClef(tool.slice(5),symbol.measure,symbol.staff,symbol.beat);return;}
      const item=event.target.closest('[data-composer-note]');if(!item)return;
      const [measure,index,tone]=item.dataset.composerNote.split(':').map(Number);
      if(tool==='erase'){erase([{measure,index,tone}]);return;}
      if(isClefTool()){const g=getDraft().inspect(getSelection().part,measure).groups[index];writeClef(tool.slice(5),measure,g.staff,g.beat);return;}
      keyboardEntry=false;inputCursor=null;selectedNotes.clear();select({measure,index,tone});
    });
    $('zoom').addEventListener('change',()=>{draw();reveal(getSelection().measure);});
    $('tempo').addEventListener('change',()=>playback.stop());
    $('play').addEventListener('click',async()=>{
      if(playback.active){playback.stop();return;}
      playbackRange.cancel(false);
      const {d,s}=selected();
      try{
        const selection=selectedNotes.size?[...selectedNotes].map(ref):s.index>=0?[{measure:s.measure,index:s.index,tone:s.tone}]:null;
        const range=selection?null:playbackRange.read();
        const score=selection?d.playbackSelection(s.part,selection):d.playback(s.part,null,null,null,range);
        if(!score.events.length)throw new Error(selection?'Select a pitched note to play.':range?'This measure range has no playable notes.':'Add a note to hear a preview.');
        cancel();keyboardEntry=false;inputCursor=null;tool='select';$('error').hidden=true;
        const ready=playback.start(score,Number($('tempo').value));
        if(playback.active){$('play').textContent='■ Stop';$('play-status').textContent=selection?'Starting selection…':'Starting score…';}
        await ready;if(playback.active)$('play-status').textContent=selection?'Playing selected notes':range?`Playing measures ${range.start+1}–${range.end+1}`:'Playing this part';
      }
      catch(error){$('error').textContent=error.message;$('error').hidden=false;}
    });
    if(typeof ResizeObserver!=='undefined')new ResizeObserver(()=>{if(getDraft()&&$('dialog').open&&!gesture)draw();}).observe($('canvas-scroll'));
    return {render:draw,reveal,clearSelection,ready:()=>engraving.ready(),exitInput(){setTool('select');clearSelection(true);},currentLane:()=>previousPart===getSelection().part?lane:getDraft()?.lanes(getSelection().part)[0],stop:()=>playback.stop(),close(){playback.close();engraving.close();geometry=null;},reset(){playback.stop();engraving.reset();geometry=null;previousPart=-1;playing.clear();tool='select';type='quarter';gesture=null;keyboardEntry=false;inputCursor=null;selectedNotes.clear();anchor=null;inputAccidental='key';inputDots=0;accidental='key';$('canvas-scroll').scrollLeft=$('canvas-scroll').scrollTop=0;updateTools();}};
  }
};
