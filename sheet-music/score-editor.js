/* Staff composer and sheet settings for an isolated MusicXML draft. */
globalThis.ScoreEditor = {
  mount({ apply }) {
    const $ = id => document.getElementById('vp-editor-' + id);
    let draft, part = 0, measure = 0, selected = -1, selectedTone = 0, busy = false;
    const message = (id, value) => { $(id).textContent = value; $(id).hidden = !value; };
    const option = (value, label) => { const node = document.createElement('option'); node.value = value; node.textContent = label; return node; };
    function close() {
      if (busy) return;
      composer.close();
      $('dialog').close(); draft = null;
    }
    function mutate(action) {
      if (!draft || busy) return;
      composer.stop();
      let success=false;
      try { action(); message('error',''); success=true; }
      catch (error) { message('error',error.message); }
      render();
      return success;
    }
    function render() {
      if(!draft) return;
      const initial=draft.inspect(0,0);part=Math.min(part,initial.parts.length-1);measure=Math.min(measure,initial.parts[part].measures.length-1);
      const snapshot=draft.inspect(part,measure);selected=Math.max(-1,Math.min(selected,snapshot.groups.length-1));
      const group=snapshot.groups[selected],staff=group?.staff || composer.currentLane?.().staff || '1',beat=group?.beat||0,ctx=draft.context(part,measure,staff,beat);
      selectedTone=Math.max(0,Math.min(selectedTone,(group?.notes.length||1)-1));
      $('title').value=snapshot.title;
      if($('document-title'))$('document-title').textContent=snapshot.title;
      $('part').replaceChildren(...snapshot.parts.map((p,i)=>option(i,p.name)));$('part').value=String(part);
      $('key').value=`${ctx.mode}:${ctx.fifths}`;
      const meter=`${ctx.beats}/${ctx.beatType}`;
      if(!Array.from($('time').options).some(o=>o.value===meter))$('time').append(option(meter,meter));$('time').value=meter;
      $('undo').disabled=!draft.canUndo;$('redo').disabled=!draft.canRedo;
      $('dirty').textContent=draft.dirty?'Changes not applied':'';
      const used=Math.max(0,...snapshot.groups.map(g=>g.beat+g.duration)),expected=ctx.beats.split('+').reduce((sum,n)=>sum+Number(n),0)*4/Number(ctx.beatType);
      message('meter',used>expected+1e-6?`This measure uses ${+used.toFixed(3)} quarter-note beats; the time signature allows ${expected}. Adjust note lengths if needed.`:'');
      composer.render();
    }
    const composer=ScoreComposer.mount({
      getDraft:()=>draft,
      getSelection:()=>({part,measure,index:selected,tone:selectedTone}),
      select(value,refresh=true){if(busy)return;if(value.measure!==undefined)measure=value.measure;if(value.index!==undefined)selected=value.index;if(value.tone!==undefined)selectedTone=value.tone;if(refresh){render();}},
      mutate
    });
    $('key').append(...ViolinPitch.KEYS.map(k=>option(k.id,k.name)));
    for(const [direction,semitones]of [['down',-1],['up',1]])$('transpose-'+direction).addEventListener('click',()=>{
      mutate(()=>{draft.transpose(semitones);composer.clearSelection();});
    });
    $('title').addEventListener('change',()=>mutate(()=>draft.title($('title').value)));
    $('part').addEventListener('change',()=>{composer.stop();part=Number($('part').value);measure=selectedTone=0;selected=-1;composer.clearSelection?.();render();});
    $('key').addEventListener('change',()=>mutate(()=>draft.settings(part,measure,{key:$('key').value,staff:composer.currentLane?.().staff || '1'})));
    $('time').addEventListener('change',()=>mutate(()=>draft.settings(part,measure,{time:$('time').value})));
    $('add-line').addEventListener('click',()=>{mutate(()=>{measure=draft.addLine(part);selected=-1;selectedTone=0;composer.clearSelection?.();});composer.reveal?.(measure);});
    $('undo').addEventListener('click',()=>mutate(()=>{draft.undo();composer.clearSelection?.();}));$('redo').addEventListener('click',()=>mutate(()=>{draft.redo();composer.clearSelection?.();}));
    $('cancel').addEventListener('click',close);
    $('dialog').addEventListener('cancel',event=>{event.preventDefault();composer.exitInput?.();});
    $('dialog').addEventListener('keydown',event=>{
      if(!(event.ctrlKey||event.metaKey)||event.key.toLowerCase()!=='z'||event.target.closest('input,select,textarea,[contenteditable="true"]'))return;
      event.preventDefault();mutate(()=>{event.shiftKey?draft.redo():draft.undo();composer.clearSelection?.();});
    });
    $('apply').addEventListener('click',async()=>{
      if(!draft||busy)return;
      composer.stop();
      try {
        draft.title($('title').value);
        const xml=draft.xml();PitchScore.parse(xml);
        busy=true;$('apply').disabled=$('cancel').disabled=true;message('error','');
        await apply(xml);
        busy=false;close();
      } catch(error) {message('error',error.message);}
      finally {busy=false;$('apply').disabled=$('cancel').disabled=false;}
    });
    document.addEventListener('visibilitychange',()=>{if(document.hidden)composer.stop();});
    window.addEventListener('pagehide',()=>composer.close());
    return {ready:()=>composer.ready(), open(xml) { draft=ScoreEditorModel.create(xml);part=measure=selectedTone=0;selected=-1;composer.reset();message('error','');$('settings').open=false;$('dialog').showModal();render();$('dialog').scrollTop=0;$('canvas-scroll').scrollLeft=$('canvas-scroll').scrollTop=0;$('canvas').focus({preventScroll:true}); } };
  }
};
