/* Draft MusicXML editing. Unedited parts, voices and notation stay in the XML. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.ScoreEditorModel = api;
})(globalThis, function () {
  'use strict';
  const children = (node, name) => Array.from(node?.childNodes || []).filter(n => n.nodeType === 1 && (!name || n.localName === name));
  const child = (node, name) => children(node, name)[0];
  const text = (node, name, fallback = '') => child(node, name)?.textContent.trim() || fallback;
  const number = (node, name, fallback = 0) => Number(text(node, name, String(fallback)));
  const TYPES = { whole: 4, half: 2, quarter: 1, eighth: .5, '16th': .25, '32nd': .125, '64th': .0625, '128th': .03125 };
  const ORDER = ['grace','cue','chord','pitch','unpitched','rest','duration','tie','instrument','footnote','level','voice','type','dot','accidental','time-modification','stem','notehead','notehead-text','staff','beam','notations','lyric','play','listen'];
  const blank = () => '<?xml version="1.0" encoding="UTF-8"?><score-partwise version="4.0"><work><work-title>New sheet</work-title></work><part-list><score-part id="P1"><part-name>Practice</part-name></score-part></part-list><part id="P1"><measure number="1"><attributes><divisions>16</divisions><key><fifths>0</fifths><mode>major</mode></key><time><beats>4</beats><beat-type>4</beat-type></time><clef><sign>G</sign><line>2</line></clef></attributes><note><rest/><duration>64</duration><type>whole</type></note></measure></part></score-partwise>';
  function create(xml = blank(), Parser = globalThis.DOMParser, Serializer = globalThis.XMLSerializer) {
    function read(source) {
      if (typeof source !== 'string' || source.length > 10 * 1024 * 1024 || /<!ENTITY\b/i.test(source)) throw new Error('Choose partwise MusicXML smaller than 10 MB without entity declarations.');
      const result = new Parser().parseFromString(source, 'application/xml');
      if (result.getElementsByTagName('parsererror').length || result.documentElement?.localName !== 'score-partwise') throw new Error('This is not valid partwise MusicXML.');
      return result;
    }
    let doc = read(xml), original = xml, undo = [], redo = [], changeDepth = 0;
    const serialize = () => new Serializer().serializeToString(doc);
    const parts = () => children(doc.documentElement, 'part');
    const measures = part => children(parts()[part], 'measure');
    const make = (name, value) => { const e = doc.createElementNS(doc.documentElement.namespaceURI || null, name); if (value !== undefined) e.textContent = String(value); return e; };
    const remove = node => node?.parentNode?.removeChild(node);
    function put(node, name, value) {
      let e = child(node, name);
      if (!e) {
        e = make(name);
        const rank = ORDER.indexOf(name);
        const before = node.localName === 'note' ? children(node).find(n => ORDER.indexOf(n.localName) > rank) : null;
        node.insertBefore(e, before || null);
      }
      if (value !== undefined) e.textContent = String(value);
      return e;
    }
    function change(action) {
      if (changeDepth) return action();
      const before = serialize();
      try { action(); }
      catch (error) { doc = read(before); throw error; }
      const after = serialize();
      if (after !== before) { undo.push(before); if (undo.length > 50) undo.shift(); redo = []; }
    }
    function context(part, measure, staff = '1') {
      const result = { divisions: 1, fifths: 0, mode: 'major', beats: '4', beatType: '4', clef: 'treble', transpose: 0 };
      for (const m of measures(part).slice(0, measure + 1)) {
        for (const a of children(m, 'attributes')) {
          if (child(a, 'divisions')) result.divisions = number(a, 'divisions', 1);
          const transpose=children(a,'transpose').filter(n=>!n.getAttribute('number') || n.getAttribute('number')===staff).at(-1);
          if(transpose)result.transpose=number(transpose,'chromatic')+12*number(transpose,'octave-change');
          const key = children(a, 'key').filter(n => !n.getAttribute('number') || n.getAttribute('number') === staff).at(-1);
          if (key) { result.fifths = number(key, 'fifths'); result.mode = text(key, 'mode', 'major'); }
          const time = child(a, 'time');
          if (time) { result.beats = text(time, 'beats', '4'); result.beatType = text(time, 'beat-type', '4'); }
          const clef = children(a, 'clef').find(n => (n.getAttribute('number') || '1') === staff);
          if (clef) result.clef = text(clef, 'sign') === 'F' ? 'bass' : text(clef, 'sign') === 'G' ? 'treble' : 'other';
        }
      }
      return result;
    }
    function groups(part, measure) {
      const m = measures(part)[measure]; if (!m) throw new Error('Select an existing measure.');
      let divisions = measure ? context(part, measure - 1).divisions : 1, position = 0;
      const result = [];
      for (const node of children(m)) {
        if (node.localName === 'attributes' && child(node, 'divisions')) divisions = number(node, 'divisions', 1);
        if (node.localName === 'backup') position -= number(node, 'duration') / divisions;
        if (node.localName === 'forward') position += number(node, 'duration') / divisions;
        if (node.localName !== 'note') continue;
        if (child(node, 'chord') && result.length) result.at(-1).nodes.push(node);
        else {
          result.push({ nodes: [node], beat: position, divisions, staff: text(node, 'staff', '1'), voice: text(node, 'voice', '1') });
          if (!child(node, 'grace')) position += number(node, 'duration') / divisions;
        }
      }
      return result;
    }
    function get(part, measure, index) { const group = groups(part, measure)[index]; if (!group) throw new Error('Select a note or rest first.'); return group; }
    const identity = n => ['step','alter','octave'].map(k => text(child(n,'pitch'), k, k === 'alter' ? '0' : '')).join(':');
    const tied = (n, type) => children(n, 'tie').concat(children(child(n, 'notations'), 'tied')).some(t => t.getAttribute('type') === type);
    function tieChain(note, part) {
      const lane = measures(part).flatMap(m => children(m, 'note')).filter(n => text(n,'voice','1') === text(note,'voice','1') && text(n,'staff','1') === text(note,'staff','1') && identity(n) === identity(note));
      const index = lane.indexOf(note); let lo = index, hi = index;
      while (lo > 0 && tied(lane[lo], 'stop') && tied(lane[lo-1], 'start')) lo--;
      while (hi + 1 < lane.length && tied(lane[hi], 'start') && tied(lane[hi+1], 'stop')) hi++;
      return lane.slice(lo, hi + 1);
    }
    function detachTies(note, part) {
      const chain = tieChain(note, part), index = chain.indexOf(note);
      for (const [n, kind] of [[chain[index-1],'start'],[chain[index+1],'stop'],[note,'start'],[note,'stop']]) if (n) {
        for (const t of children(n,'tie').concat(children(child(n,'notations'),'tied'))) if (t.getAttribute('type') === kind) remove(t);
      }
    }
    function pitch(note, value) {
      const { step, alter, octave } = value;
      const midi = { C:0,D:2,E:4,F:5,G:7,A:9,B:11 }[step] + Number(alter) + 12 * (Number(octave) + 1);
      if (!/^[A-G]$/.test(step) || ![-2,-1,0,1,2].includes(Number(alter)) || !Number.isInteger(Number(octave)) || midi < 21 || midi > 108) throw new Error('Choose a pitch between A0 and C8.');
      remove(child(note,'rest')); remove(child(note,'unpitched'));
      const p = put(note,'pitch');
      while (p.firstChild) p.removeChild(p.firstChild);
      p.appendChild(make('step',step)); if (Number(alter)) p.appendChild(make('alter',Number(alter))); p.appendChild(make('octave',Number(octave)));
      // The written pitch carries its alteration. Let the engraver decide when
      // an accidental is needed in the key/measure instead of forcing a sign
      // (including a natural) onto every inserted or edited note.
      remove(child(note,'accidental'));
      note.removeAttribute('default-y');
    }
    function editableRhythm(group) {
      if (group.nodes.some(n => child(n,'grace') || child(n,'time-modification') || child(n,'unpitched'))) throw new Error('This group has grace notes, tuplets, or percussion. You can correct its pitches; keep its rhythm unchanged.');
    }
    function shiftBackup(group, delta) {
      if (Math.abs(delta) < 1e-8) return;
      for (let node = group.nodes.at(-1).nextSibling; node; node = node.nextSibling) {
        if (node.localName === 'attributes' && child(node,'divisions')) throw new Error('Keep rhythm unchanged across a mid-measure divisions change.');
        if (node.localName === 'backup') {
          const value = number(node,'duration') + delta;
          if (value < -1e-8) throw new Error('This change would move another voice before the start of the measure.');
          if (Math.abs(value) < 1e-8) remove(node); else put(node,'duration',+value.toFixed(8));
          return;
        }
      }
    }
    function rhythm(node, type, dots, divisions) {
      if (!(type in TYPES) || ![0,1,2].includes(Number(dots))) throw new Error('Choose a supported note length.');
      const length = TYPES[type] * (2 - 2 ** (-Number(dots))) * divisions;
      put(node,'duration',+length.toFixed(8)); put(node,'type',type);
      children(node,'dot').forEach(remove); for (let i = 0; i < dots; i++) {
        const e = make('dot'), before = children(node).find(n => ORDER.indexOf(n.localName) > ORDER.indexOf('dot'));
        node.insertBefore(e,before || null);
      }
      if (child(node,'rest')) child(node,'rest').removeAttribute('measure');
      return length;
    }
    function cleanLayout(part, measure) {
      for (const n of children(measures(part)[measure],'note')) { n.removeAttribute('default-x'); children(n,'beam').forEach(remove); }
    }
    const beatsIn = ctx => ctx.beats.split('+').reduce((sum,n)=>sum+Number(n),0)*4/Number(ctx.beatType);
    function makeTimedNote(value, type, dots, divisions, voice, staff) {
      const n=make('note');
      if(value) pitch(n,value); else put(n,'rest');
      put(n,'voice',voice);put(n,'staff',staff);rhythm(n,type,dots,divisions);
      return n;
    }
    function restPieces(beats, divisions, voice, staff) {
      const pieces=[], choices=Object.entries(TYPES).flatMap(([type,length])=>[0,1,2].map(dots=>({type,dots,length:length*(2-2**(-dots))}))).sort((a,b)=>b.length-a.length);
      while(beats>1e-7) {
        const choice=choices.find(c=>c.length<=beats+1e-7);
        if(!choice || pieces.length>256)throw new Error('This rhythm needs a tuplet, which the composer cannot split.');
        pieces.push(makeTimedNote(null,choice.type,choice.dots,divisions,voice,staff));beats-=choice.length;
      }
      return pieces;
    }
    const api = {
      xml: serialize,
      context,
      transaction(action) { change(() => { changeDepth++; try { action(); } finally { changeDepth--; } }); },
      lanes(part=0) {
        const lanes=new Map();
        for(let m=0;m<measures(part).length;m++)for(const g of groups(part,m))lanes.set(`${g.staff}:${g.voice}`,{staff:g.staff,voice:g.voice});
        return lanes.size?[...lanes.values()]:[{staff:'1',voice:'1'}];
      },
      get dirty() { return serialize() !== original; },
      get canUndo() { return undo.length > 0; }, get canRedo() { return redo.length > 0; },
      undo() { if (undo.length) { redo.push(serialize()); doc = read(undo.pop()); } },
      redo() { if (redo.length) { undo.push(serialize()); doc = read(redo.pop()); } },
      inspect(part = 0, measure = 0) {
        const root = doc.documentElement, list = child(root,'part-list');
        return {
          title: text(root,'movement-title') || text(child(root,'work'),'work-title','Untitled score'),
          parts: parts().map(p => ({ name: text(children(list,'score-part').find(n => n.getAttribute('id') === p.getAttribute('id')),'part-name','Part'), measures: children(p,'measure').map((m,i) => m.getAttribute('number') || String(i+1)) })),
          context: context(part,measure),
          groups: groups(part,measure).map((g,index) => ({ index, beat:g.beat, staff:g.staff, voice:g.voice, duration:number(g.nodes[0],'duration') / g.divisions, type:text(g.nodes[0],'type',child(g.nodes[0],'rest')?.getAttribute('measure')==='yes'?'measure':'quarter'), dots:children(g.nodes[0],'dot').length,
            rest:!!child(g.nodes[0],'rest'), rhythmEditable:!g.nodes.some(n => child(n,'grace') || child(n,'time-modification') || child(n,'unpitched')),
            notes:g.nodes.map(n => ({ step:text(child(n,'pitch'),'step','C'), alter:number(child(n,'pitch'),'alter'), octave:number(child(n,'pitch'),'octave',4), tied:tied(n,'start') || tied(n,'stop') })) }))
        };
      },
      title(value) { change(() => { if (!value.trim()) throw new Error('Enter a sheet title.'); const root=doc.documentElement; let work=child(root,'work'); if (!work) { work=make('work'); root.insertBefore(work,root.firstChild); } put(work,'work-title',value.trim()); if (child(root,'movement-title')) put(root,'movement-title',value.trim()); }); },
      pitch(part, measure, index, tone, value) { change(() => { const note=get(part,measure,index).nodes[tone]; if (!note) throw new Error('Select a chord tone.'); for (const n of tieChain(note,part)) pitch(n,value); }); },
      length(part, measure, index, type, dots) { change(() => { const g=get(part,measure,index); editableRhythm(g); const old=number(g.nodes[0],'duration'); const next=TYPES[type]*(2-2**(-Number(dots)))*g.divisions; shiftBackup(g,next-old); for(const n of g.nodes) rhythm(n,type,dots,g.divisions); cleanLayout(part,measure); }); },
      rest(part, measure, index, isRest) { change(() => { const g=get(part,measure,index); editableRhythm(g); if (isRest) { for(const n of g.nodes) detachTies(n,part); g.nodes.slice(1).forEach(remove); const n=g.nodes[0]; remove(child(n,'pitch')); remove(child(n,'unpitched')); remove(child(n,'accidental')); remove(child(n,'stem')); put(n,'rest'); } else pitch(g.nodes[0],{step:'C',alter:0,octave:4}); cleanLayout(part,measure); }); },
      addTone(part, measure, index, value={step:'E',alter:0,octave:4}) { change(() => { const g=get(part,measure,index); editableRhythm(g); if(child(g.nodes[0],'rest')) throw new Error('Turn the rest into a note first.'); const n=g.nodes[0].cloneNode(true); for(const key of ['tie','notations','lyric','beam','chord']) children(n,key).forEach(remove); n.removeAttribute('id'); put(n,'chord'); pitch(n,value); g.nodes[0].parentNode.insertBefore(n,g.nodes.at(-1).nextSibling); }); },
      removeTone(part, measure, index, tone) { change(() => { const g=get(part,measure,index); if(g.nodes.length===1) throw new Error('Use Delete note/rest to remove the last tone.'); const n=g.nodes[tone]; if(!n) throw new Error('Select a chord tone.'); if(tone===0 && number(n,'duration')!==number(g.nodes[1],'duration')) throw new Error('Set a shared chord length before removing its leading tone.'); detachTies(n,part); remove(n); if(tone===0) remove(child(g.nodes[1],'chord')); cleanLayout(part,measure); }); },
      insert(part, measure, index, where = 'after', rest = false) { change(() => { const m=measures(part)[measure], all=groups(part,measure), g=all[index]; if(g) editableRhythm(g); const divisions=g?.divisions || context(part,measure).divisions; const n=make('note'); if(rest) put(n,'rest'); else pitch(n,{step:'C',alter:0,octave:4}); if(g) { put(n,'voice',g.voice); if(child(g.nodes[0],'staff')) put(n,'staff',g.staff); shiftBackup(g,divisions); } rhythm(n,'quarter',0,divisions); const before=g ? where==='before'?g.nodes[0]:g.nodes.at(-1).nextSibling : children(m,'barline').find(b=>b.getAttribute('location')!=='left'); m.insertBefore(n,before || null); cleanLayout(part,measure); }); },
      remove(part, measure, index) { change(() => { const g=get(part,measure,index); editableRhythm(g); shiftBackup(g,-number(g.nodes[0],'duration')); for(const n of g.nodes) { detachTies(n,part); remove(n); } cleanLayout(part,measure); }); },
      removeMany(part, selection) {
        change(() => {
          const refs=[...new Map(selection.map(ref=>[`${ref.measure}:${ref.index}`,ref])).values()].sort((a,b)=>b.measure-a.measure||b.index-a.index);
          // Validate every group before changing XML. One undo restores the set.
          for(const ref of refs)editableRhythm(get(part,ref.measure,ref.index));
          for(const ref of refs){
            const g=get(part,ref.measure,ref.index);shiftBackup(g,-number(g.nodes[0],'duration'));
            for(const n of g.nodes){detachTies(n,part);remove(n);}
            cleanLayout(part,ref.measure);
          }
        });
      },
      place(part, measure, beat, {type='quarter',dots=0,pitch:value=null,staff='1',voice='1'}={}) {
        let placed;
        change(()=>{
          const m=measures(part)[measure],ctx=context(part,measure,staff),lane=groups(part,measure).filter(g=>g.staff===staff&&g.voice===voice);
          const duration=TYPES[type]*(2-2**(-dots));
          if(!Number.isFinite(beat)||beat<0||!(type in TYPES)||![0,1,2].includes(dots))throw new Error('Choose a note length and a beat on the staff.');
          if(beat+duration>beatsIn(ctx)+1e-7)throw new Error('That note crosses the bar line. Choose a shorter note or add a measure.');
          if(Number(staff)>1){
            const first=measures(part)[0];let attributes=child(first,'attributes');
            if(!attributes){attributes=make('attributes');first.insertBefore(attributes,first.firstChild);}
            if(number(attributes,'staves',1)<Number(staff)){
              let count=child(attributes,'staves');
              if(!count){count=make('staves');attributes.insertBefore(count,children(attributes).find(n=>['part-symbol','instruments','clef','staff-details','transpose','directive','measure-style'].includes(n.localName))||null);}
              count.textContent=String(staff);
            }
          }
          const covering=lane.find(g=>beat>=g.beat-1e-7&&beat<g.beat+number(g.nodes[0],'duration')/g.divisions-1e-7);
          if(covering) {
            editableRhythm(covering);
            if(!child(covering.nodes[0],'rest'))throw new Error('This beat has a note. Select it to edit, or choose Chord to add a tone.');
            const end=covering.beat+number(covering.nodes[0],'duration')/covering.divisions;
            if(beat+duration>end+1e-7)throw new Error('The note is longer than this rest. Choose a shorter length.');
            placed=makeTimedNote(value,type,dots,covering.divisions,voice,staff);
            const pieces=[...restPieces(beat-covering.beat,covering.divisions,voice,staff),placed,...restPieces(end-beat-duration,covering.divisions,voice,staff)];
            for(const n of pieces)m.insertBefore(n,covering.nodes[0]);
            covering.nodes.forEach(remove);
          } else {
            const last=lane.at(-1),end=last?last.beat+number(last.nodes[0],'duration')/last.divisions:0;
            if(beat<end-1e-7)throw new Error('Choose a rest or the end of this voice to place a note.');
            const divisions=last?.divisions || ctx.divisions;
            placed=makeTimedNote(value,type,dots,divisions,voice,staff);
            const pieces=[...restPieces(beat-end,divisions,voice,staff),placed];
            if(last) {
              editableRhythm(last);shiftBackup(last,(beat-end+duration)*divisions);
              const before=last.nodes.at(-1).nextSibling;
              for(const n of pieces)m.insertBefore(n,before);
            } else {
              // A voice absent from this measure gets its own timeline after
              // the existing voices. Keep their nodes and directions intact.
              let position=0,unit=measure?context(part,measure-1).divisions:1;
              for(const n of children(m)) {
                if(n.localName==='attributes'&&child(n,'divisions'))unit=number(n,'divisions',1);
                if(n.localName==='backup')position-=number(n,'duration')/unit;
                if(n.localName==='forward'||n.localName==='note'&&!child(n,'chord')&&!child(n,'grace'))position+=number(n,'duration')/unit;
              }
              const before=children(m,'barline').find(n=>n.getAttribute('location')!=='left')||null;
              if(position>1e-7){const backup=make('backup');put(backup,'duration',position*unit);m.insertBefore(backup,before);}
              for(const n of pieces)m.insertBefore(n,before);
            }
          }
          cleanLayout(part,measure);
        });
        return groups(part,measure).findIndex(g=>g.nodes.includes(placed));
      },
      playback(part=0,staff='1',voice='1') {
        const events=[],ties=new Map();let offset=0;
        measures(part).forEach((m,measure)=>{
          const ctx=context(part,measure,staff),all=groups(part,measure);
          for(const g of all.filter(g=>g.staff===staff&&g.voice===voice))for(const [tone,n] of g.nodes.entries()) {
            if(!child(n,'pitch')||child(n,'grace'))continue;
            const p=child(n,'pitch'),midi={C:0,D:2,E:4,F:5,G:7,A:9,B:11}[text(p,'step')]+number(p,'alter')+12*(number(p,'octave')+1)+ctx.transpose;
            const event={beat:offset+g.beat,duration:number(n,'duration')/g.divisions,midi,measure,index:all.indexOf(g),tone};
            const key=identity(n),previous=ties.get(key);
            if(tied(n,'stop')&&previous&&Math.abs(previous.beat+previous.duration-event.beat)<1e-6)previous.duration+=event.duration;
            else events.push(event);
            if(tied(n,'start'))ties.set(key,tied(n,'stop')&&previous?previous:event);else ties.delete(key);
          }
          const used=Math.max(0,...all.map(g=>g.beat+number(g.nodes[0],'duration')/g.divisions));
          offset+=m.getAttribute('implicit')==='yes'?used:Math.max(beatsIn(ctx),used);
        });
        return {events,duration:offset};
      },
      addMeasure(part) { change(() => {
        const list=measures(part), ctx=context(part,list.length-1), lanes=api.lanes(part), length=ctx.divisions*beatsIn(ctx);
        const m=make('measure');m.setAttribute('number',String(Number(list.at(-1)?.getAttribute('number'))+1 || list.length+1));
        lanes.forEach((lane,index)=>{
          if(index){const backup=make('backup');put(backup,'duration',length);m.appendChild(backup);}
          const n=make('note');put(n,'rest').setAttribute('measure','yes');put(n,'duration',length);put(n,'voice',lane.voice);put(n,'staff',lane.staff);m.appendChild(n);
        });
        parts()[part].appendChild(m);
      }); },
      settings(part, measure, values) { change(() => {
        const m=measures(part)[measure]; let a=children(m).find(n=>!['print','barline'].includes(n.localName)); if(a?.localName!=='attributes') { a=make('attributes'); m.insertBefore(a,m.firstChild); }
        if(values.key !== undefined) {
          const [mode,fifths]=values.key.split(':');
          if(!['major','minor'].includes(mode)||!Number.isInteger(Number(fifths))||Math.abs(Number(fifths))>7)throw new Error('Choose a scale.');
          const staff=values.staff,staves=new Set(['1',...api.lanes(part).map(l=>l.staff)]);
          for(const bar of measures(part))for(const attrs of children(bar,'attributes'))for(let i=1;i<=number(attrs,'staves',1);i++)staves.add(String(i));
          if(staff)staves.add(staff);
          const global=children(a,'key').find(k=>!k.getAttribute('number'));
          // Expand an existing shared signature before changing just one staff.
          if(staff&&staves.size>1&&global){
            for(const id of staves)if(!children(a,'key').some(k=>k.getAttribute('number')===id)){
              const copy=global.cloneNode(true);copy.removeAttribute('id');copy.setAttribute('number',id);a.insertBefore(copy,global);
            }
            remove(global);
          }
          let k=staff?children(a,'key').find(k=>(k.getAttribute('number')||'1')===staff):child(a,'key');
          if(!k){k=make('key');if(staff&&(staff!=='1'||staves.size>1))k.setAttribute('number',staff);a.insertBefore(k,children(a).find(n=>!['footnote','level','divisions','key'].includes(n.localName))||null);}
          while(k.firstChild)k.removeChild(k.firstChild);
          put(k,'fifths',Number(fifths));put(k,'mode',mode);
        }
        if(values.time !== undefined) { if(!/^[1-9]\d*(?:\+[1-9]\d*)*\/(2|4|8|16)$/.test(values.time)) throw new Error('Choose a time signature.'); let t=child(a,'time'); if(!t){t=make('time');a.insertBefore(t,children(a).find(n=>!['footnote','level','divisions','key'].includes(n.localName))||null);} while(t.firstChild)t.removeChild(t.firstChild); const [beats,unit]=values.time.split('/');put(t,'beats',beats);put(t,'beat-type',unit); }
        if(values.clef !== undefined) { if(!['treble','bass'].includes(values.clef)) throw new Error('Choose treble or bass clef.'); const staff=values.staff || '1'; let c=children(a,'clef').find(n=>(n.getAttribute('number')||'1')===staff); if(!c){c=make('clef'); if(staff!=='1')c.setAttribute('number',staff);a.insertBefore(c,children(a).find(n=>['staff-details','transpose','directive','measure-style'].includes(n.localName))||null);} put(c,'sign',values.clef==='bass'?'F':'G');put(c,'line',values.clef==='bass'?4:2); }
      }); }
    };
    // Compare canonical XML so opening the editor alone is not a change.
    original = serialize();
    return api;
  }
  function template(kind='piano') {
    if(kind==='treble')return blank();
    if(kind==='bass')return blank().replace('<sign>G</sign><line>2</line>','<sign>F</sign><line>4</line>');
    if(kind!=='piano')throw new Error('Choose a piano, treble or bass score.');
    const rest=staff=>`<note><rest measure="yes"/><duration>64</duration><voice>${staff}</voice><staff>${staff}</staff></note>`;
    const attributes='<attributes><divisions>16</divisions><key><fifths>0</fifths><mode>major</mode></key><time><beats>4</beats><beat-type>4</beat-type></time><staves>2</staves><clef number="1"><sign>G</sign><line>2</line></clef><clef number="2"><sign>F</sign><line>4</line></clef></attributes>';
    return `<?xml version="1.0" encoding="UTF-8"?><score-partwise version="4.0"><work><work-title>Untitled piano score</work-title></work><part-list><score-part id="P1"><part-name>Piano</part-name><score-instrument id="P1-I1"><instrument-name>Grand Piano</instrument-name></score-instrument><midi-instrument id="P1-I1"><midi-channel>1</midi-channel><midi-program>1</midi-program></midi-instrument></score-part></part-list><part id="P1">${Array.from({length:4},(_,i)=>`<measure number="${i+1}">${i===0?attributes:''}${rest('1')}<backup><duration>64</duration></backup>${rest('2')}</measure>`).join('')}</part></score-partwise>`;
  }
  return { create, blank, template, TYPES };
});
