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
  const MEASURES_PER_LINE = 4;
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
    function attributeEvents(measure, divisions) {
      let beat=0;
      const events=[];
      for(const node of children(measure)){
        if(node.localName==='attributes'){
          events.push({node,beat});
          if(child(node,'divisions'))divisions=number(node,'divisions',1);
        }
        if(node.localName==='backup')beat-=number(node,'duration')/divisions;
        if(node.localName==='forward'||node.localName==='note'&&!child(node,'chord')&&!child(node,'grace'))beat+=number(node,'duration')/divisions;
      }
      return events.sort((a,b)=>a.beat-b.beat);
    }
    function context(part, measure, staff = '1', beat = Infinity) {
      const result = { divisions: 1, fifths: 0, mode: 'major', beats: '4', beatType: '4', clef: 'treble', transpose: 0 };
      for (const [index,m] of measures(part).slice(0, measure + 1).entries()) {
        for (const event of attributeEvents(m,result.divisions)) {
          // Attributes affect score time, including voices encoded after a
          // backup. A mid-measure clef must not affect earlier notes.
          if(index===measure&&event.beat>beat+1e-7)continue;
          const a=event.node;
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
    function setClef(part, measure, staff, beat, value) {
      if(!['treble','bass'].includes(value))throw new Error('Choose treble or bass clef.');
      const m=measures(part)[measure];
      if(!m||!Number.isFinite(beat)||beat<0)throw new Error('Choose a note, rest or measure for the clef change.');
      const events=attributeEvents(m,measure?context(part,measure-1).divisions:1).filter(e=>Math.abs(e.beat-beat)<1e-7);
      let attributes=events[0]?.node;
      if(!attributes){
        const before=beat===0?children(m).find(n=>!['print','barline'].includes(n.localName)):groups(part,measure).find(g=>g.staff===staff&&Math.abs(g.beat-beat)<1e-7)?.nodes[0];
        if(beat>0&&!before)throw new Error('Select a note or rest where the clef should change.');
        attributes=make('attributes');m.insertBefore(attributes,before||null);
      }
      for(const {node} of events){
        for(const clef of children(node,'clef'))if((clef.getAttribute('number')||'1')===staff)remove(clef);
        if(node!==attributes&&!children(node).length)remove(node);
      }
      // Keep staff 1 explicit too: the engraver can misassign an unnumbered
      // clef when it follows another staff's numbered clef in the attributes.
      const clef=make('clef');clef.setAttribute('number',staff);
      put(clef,'sign',value==='bass'?'F':'G');put(clef,'line',value==='bass'?4:2);
      attributes.insertBefore(clef,children(attributes).find(n=>n.localName==='clef'&&Number(n.getAttribute('number')||'1')>Number(staff)||['staff-details','transpose','for-part','directive','measure-style'].includes(n.localName))||null);
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
    const writtenBeats=all=>Math.max(0,...all.flatMap(g=>g.nodes.map(n=>g.beat+number(n,'duration')/g.divisions)));
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
      contexts(part, measure, staff='1') {
        const events=attributeEvents(measures(part)[measure],measure?context(part,measure-1).divisions:1);
        return [...new Set([0,...events.map(e=>e.beat)])].sort((a,b)=>a-b).map(beat=>({beat,ctx:context(part,measure,staff,beat)}));
      },
      changeClef(part, measure, staff, beat, value) { change(()=>setClef(part,measure,staff,beat,value)); },
      clefs(part=0) {
        return measures(part).flatMap((m,measure)=>attributeEvents(m,measure?context(part,measure-1).divisions:1).flatMap(({node,beat})=>
          children(node,'clef').map(clef=>({measure,beat,staff:clef.getAttribute('number')||'1',value:text(clef,'sign')==='F'?'bass':text(clef,'sign')==='G'?'treble':'other'}))));
      },
      removeClef(part,measure,staff,beat) {
        if(measure===0&&beat===0)throw new Error('The first clef is required. Use the Clef menu to change it.');
        change(()=>{
          for(const {node,beat:at} of attributeEvents(measures(part)[measure],measure?context(part,measure-1).divisions:1))if(Math.abs(at-beat)<1e-7){
            for(const clef of children(node,'clef'))if((clef.getAttribute('number')||'1')===staff)remove(clef);
            if(!children(node).length)remove(node);
          }
        });
      },
      removeAccidental(part,measure,index,tone) {
        const group=get(part,measure,index),note=group.nodes[tone],p=child(note,'pitch');
        if(!p)throw new Error('Select an accidental beside a pitched note.');
        const step=text(p,'step'),octave=number(p,'octave'),fifths=context(part,measure,group.staff,group.beat).fifths;
        let alter=(fifths<0?'BEADGCF':'FCGDAEB').slice(0,Math.abs(fifths)).includes(step)?Math.sign(fifths):0;
        // Erasing a sign restores the key or preceding accidental for this
        // pitch on this staff, including a natural that cancels a sharp/flat.
        for(const earlier of groups(part,measure).filter(g=>g.staff===group.staff&&g.beat<group.beat-1e-7).sort((a,b)=>a.beat-b.beat))
          for(const n of earlier.nodes){const prior=child(n,'pitch');if(prior&&text(prior,'step')===step&&number(prior,'octave')===octave)alter=number(prior,'alter');}
        api.pitch(part,measure,index,tone,{step,octave,alter});
      },
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
      shiftPitch(part, selection, steps) { change(() => {
        if(!Number.isInteger(steps))throw new Error('Choose a whole number of staff steps.');
        const letters='CDEFGAB',changes=new Map();
        for(const ref of selection){
          const note=get(part,ref.measure,ref.index).nodes[ref.tone||0],p=child(note,'pitch');
          if(!p||changes.has(note))continue;
          const position=number(p,'octave')*7+letters.indexOf(text(p,'step'))+steps;
          const value={step:letters[(position%7+7)%7],octave:Math.floor(position/7),alter:number(p,'alter')};
          // Capture every original tie chain before writing, so moving adjacent
          // chord tones cannot merge their identities or shift a tie twice.
          for(const tiedNote of tieChain(note,part))changes.set(tiedNote,value);
        }
        for(const [note,value]of changes)pitch(note,value);
      }); },
      transpose(semitones) { change(() => {
        if(!Number.isInteger(semitones)||Math.abs(semitones)>12||!semitones)throw new Error('Choose 1–12 semitones up or down.');
        const letters='CDEFGAB',naturals=[0,2,4,5,7,9,11],mod=(n,b)=>(n%b+b)%b;
        const keyAlter=(step,fifths)=>(fifths<0?'BEADGCF':'FCGDAEB').slice(0,Math.abs(fifths)).includes(step)?Math.sign(fifths):0;
        function nextKey(fifths){
          if(!Number.isInteger(fifths)||Math.abs(fifths)>7)throw new Error('Transpose supports standard key signatures with up to seven sharps or flats.');
          if(semitones%12===0)return fifths;
          return Array.from({length:15},(_,i)=>i-7).filter(n=>mod(n-fifths-7*semitones,12)===0)
            .sort((a,b)=>Math.abs(a)-Math.abs(b)||(Math.sign(b)===Math.sign(fifths)?1:0)-(Math.sign(a)===Math.sign(fifths)?1:0))[0];
        }
        function shifted(step,alter,octave,fifths){
          const index=letters.indexOf(step),key=nextKey(fifths);
          if(index<0||!Number.isInteger(alter)||!Number.isInteger(octave))throw new Error('Transpose supports notes and chord symbols with whole-semitone pitches.');
          // Use the interval between the old and new key tonics to preserve
          // diatonic spelling (for example A-flat major becomes B-flat major).
          const tonic=mod(4*fifths,7),nextTonic=mod(4*key,7);
          const tonicMidi=60+naturals[tonic]+keyAlter(letters[tonic],fifths)+semitones;
          const nextOctave=(tonicMidi-naturals[nextTonic]-keyAlter(letters[nextTonic],key))/12-1;
          const delta=nextOctave*7+nextTonic-(4*7+tonic),position=octave*7+index+delta;
          const midi=12*(octave+1)+naturals[index]+alter+semitones;
          let value={step:letters[mod(position,7)],octave:Math.floor(position/7)};
          value.alter=midi-12*(value.octave+1)-naturals[letters.indexOf(value.step)];
          if(Math.abs(value.alter)>2){
            // Prefer a readable enharmonic to a triple sharp/flat.
            value=letters.split('').flatMap((s,i)=>[-1,0,1].map(offset=>{
              const o=Math.floor(midi/12)-1+offset;return {step:s,octave:o,alter:midi-12*(o+1)-naturals[i]};
            })).filter(v=>Math.abs(v.alter)<=2).sort((a,b)=>
              Math.abs(a.alter-keyAlter(a.step,key))-Math.abs(b.alter-keyAlter(b.step,key))||Math.abs(a.alter)-Math.abs(b.alter))[0];
          }
          return value;
        }
        const pitches=new Map(),harmonies=[],keys=[],initialKeys=[];
        parts().forEach((partNode,part)=>{
          const staves=new Set(['1']);
          measures(part).forEach((m,measure)=>{
            for(const g of groups(part,measure))for(const n of g.nodes){
              const staff=text(n,'staff',g.staff);staves.add(staff);
              const p=child(n,'pitch');if(p)pitches.set(n,shifted(text(p,'step'),number(p,'alter'),number(p,'octave'),context(part,measure,staff,g.beat).fifths));
            }
            let beat=0,divisions=measure?context(part,measure-1).divisions:1;
            for(const n of children(m)){
              if(n.localName==='attributes'){
                divisions=number(n,'divisions',divisions);
                for(let s=1;s<=number(n,'staves',1);s++)staves.add(String(s));
                for(const k of children(n,'key')){
                  if(!child(k,'fifths')||children(k,'key-step').length)throw new Error('Transpose supports standard major and minor key signatures.');
                  keys.push({node:k,fifths:nextKey(number(k,'fifths')),cancel:child(k,'cancel')?nextKey(number(k,'cancel')):null});
                }
              }
              if(n.localName==='harmony'){
                const fifths=context(part,measure,text(n,'staff','1'),beat+number(n,'offset')/divisions).fifths;
                for(const kind of ['root','bass']){
                  const p=child(n,kind);if(p)harmonies.push({node:p,kind,value:shifted(text(p,kind+'-step'),number(p,kind+'-alter'),4,fifths)});
                }
              }
              if(n.localName==='backup')beat-=number(n,'duration')/divisions;
              if(n.localName==='forward'||n.localName==='note'&&!child(n,'chord')&&!child(n,'grace'))beat+=number(n,'duration')/divisions;
            }
          });
          const first=measures(part)[0];
          if(first){
            const atStart=attributeEvents(first,1).filter(e=>Math.abs(e.beat)<1e-7).flatMap(e=>children(e.node,'key'));
            const missing=[...staves].filter(staff=>!atStart.some(k=>!k.getAttribute('number')||k.getAttribute('number')===staff));
            if(missing.length&&nextKey(0)!==0)initialKeys.push({first,staffs:atStart.length?missing:[null],fifths:nextKey(0)});
          }
          // A tied continuation must retain the start note's spelling, even
          // across a key change that chooses an enharmonic key signature.
          for(const [n,value] of pitches)if(n.parentNode?.parentNode===partNode&&tied(n,'start')){
            const chain=tieChain(n,part),firstValue=pitches.get(chain[0])||value;
            for(const continuation of chain)pitches.set(continuation,firstValue);
          }
        });
        // Gather all targets before changing any key context. change() rolls
        // back every part if even one note exceeds the supported piano range.
        for(const [n,value]of pitches)pitch(n,value);
        for(const {node,kind,value}of harmonies){
          put(node,kind+'-step',value.step).removeAttribute('text');
          if(value.alter)put(node,kind+'-alter',value.alter);else remove(child(node,kind+'-alter'));
        }
        for(const {node,fifths,cancel}of keys){put(node,'fifths',fifths);if(cancel!==null)put(node,'cancel',cancel);children(node,'key-octave').forEach(remove);}
        for(const {first,staffs,fifths}of initialKeys){
          let attributes=attributeEvents(first,1).find(e=>Math.abs(e.beat)<1e-7)?.node;
          if(!attributes){attributes=make('attributes');first.insertBefore(attributes,children(first).find(n=>!['print','barline'].includes(n.localName))||null);}
          for(const staff of staffs){
            const key=make('key');if(staff)key.setAttribute('number',staff);put(key,'fifths',fifths);
            attributes.insertBefore(key,children(attributes).find(n=>!['footnote','level','divisions','key'].includes(n.localName))||null);
          }
        }
      }); },
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
      playback(part=0,staff='1',voice='1',selection=null,range=null) {
        const count=measures(part).length,start=range?.start??0,end=range?.end??count-1;
        if(!Number.isInteger(start)||!Number.isInteger(end)||start<0||end<start||end>=count)throw new Error('Choose a valid start and end measure.');
        const selected=selection&&new Set(selection.map(n=>`${n.measure}:${n.index}:${n.tone||0}`));
        const events=[],ties=new Map();let offset=0;
        measures(part).forEach((m,measure)=>{
          // Start ties afresh at the chosen bar and stop them at the end bar.
          // Keep the selected measures' opening rests and original note IDs.
          if(measure<start||measure>end)return;
          const ctx=context(part,measure,staff||'1'),all=groups(part,measure);
          for(const g of all.filter(g=>(staff===null||g.staff===staff)&&(voice===null||g.voice===voice)))for(const [tone,n] of g.nodes.entries()) {
            if(selected&&!selected.has(`${measure}:${all.indexOf(g)}:${tone}`))continue;
            if(!child(n,'pitch')||child(n,'grace'))continue;
            const p=child(n,'pitch'),midi={C:0,D:2,E:4,F:5,G:7,A:9,B:11}[text(p,'step')]+number(p,'alter')+12*(number(p,'octave')+1)+context(part,measure,g.staff,g.beat).transpose;
            const event={beat:offset+g.beat,duration:number(n,'duration')/g.divisions,midi,measure,index:all.indexOf(g),tone};
            const key=`${g.staff}:${g.voice}:${identity(n)}`,previous=ties.get(key);
            const connected=tied(n,'stop')&&previous&&Math.abs(previous.beat+previous.duration-event.beat)<1e-6;
            if(connected)previous.duration+=event.duration;
            else events.push(event);
            if(tied(n,'start'))ties.set(key,connected?previous:event);else ties.delete(key);
          }
          const used=writtenBeats(all);
          offset+=m.getAttribute('implicit')==='yes'?used:Math.max(beatsIn(ctx),used);
        });
        if(selected){
          const start=Math.min(...events.map(e=>e.beat));
          for(const event of events)event.beat-=start;
          return {events,duration:Math.max(0,...events.map(e=>e.beat+e.duration))};
        }
        return {events,duration:offset};
      },
      playbackSelection(part,selection){return api.playback(part,null,null,selection);},
      addMeasure(part) { change(() => {
        const list=measures(part), ctx=context(part,list.length-1), lanes=api.lanes(part), length=ctx.divisions*beatsIn(ctx);
        const m=make('measure');m.setAttribute('number',String(Number(list.at(-1)?.getAttribute('number'))+1 || list.length+1));
        lanes.forEach((lane,index)=>{
          if(index){const backup=make('backup');put(backup,'duration',length);m.appendChild(backup);}
          const n=make('note');put(n,'rest').setAttribute('measure','yes');put(n,'duration',length);put(n,'voice',lane.voice);put(n,'staff',lane.staff);m.appendChild(n);
        });
        parts()[part].appendChild(m);
      }); },
      addLine(part=0) {
        if(!parts()[part])throw new Error('Choose a score part.');
        const start=Math.max(...parts().map((_,index)=>measures(index).length));
        api.transaction(()=>{
          // A system spans every part. Keep imported scores aligned as well as
          // the two staves of a piano part, and undo the whole row in one step.
          parts().forEach((_,index)=>{
            while(measures(index).length<start+MEASURES_PER_LINE)api.addMeasure(index);
            const first=measures(index)[start],line=make('print');
            line.setAttribute('new-system','yes');first.insertBefore(line,first.firstChild);
          });
        });
        return start;
      },
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
        if(values.clef !== undefined)setClef(part,measure,values.staff||'1',0,values.clef);
      }); }
    };
    // Older photo imports omitted the pickup flag. Repair only our recognized
    // scores with matching short opening staves and a later full measure.
    const encoding=child(child(doc.documentElement,'identification'),'encoding');
    if(parts().length===1&&children(encoding,'software').some(n=>n.textContent.trim()==='Sheet Music Practice / HOMR')){
      const first=measures(0)[0],all=groups(0,0),length=writtenBeats(all),meter=beatsIn(context(0,0));
      const staves=new Set(all.map(g=>g.staff)),expected=Math.max(1,...children(first,'attributes').map(a=>number(a,'staves',1)));
      const aligned=staves.size===expected&&[...staves].every(staff=>Math.abs(writtenBeats(all.filter(g=>g.staff===staff))-length)<1e-7);
      const laterFull=measures(0).slice(1).some((m,i)=>writtenBeats(groups(0,i+1))>=beatsIn(context(0,i+1))-1e-7);
      if(first&&!first.hasAttribute('implicit')&&length>0&&length<meter-1e-7&&aligned&&laterFull&&all.some(g=>g.nodes.some(n=>child(n,'pitch'))))first.setAttribute('implicit','yes');
    }
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
    return `<?xml version="1.0" encoding="UTF-8"?><score-partwise version="4.0"><work><work-title>Untitled piano score</work-title></work><part-list><score-part id="P1"><part-name>Piano</part-name><score-instrument id="P1-I1"><instrument-name>Grand Piano</instrument-name></score-instrument><midi-instrument id="P1-I1"><midi-channel>1</midi-channel><midi-program>1</midi-program></midi-instrument></score-part></part-list><part id="P1">${Array.from({length:MEASURES_PER_LINE*2},(_,i)=>`<measure number="${i+1}">${i===0?attributes:i===MEASURES_PER_LINE?'<print new-system="yes"/>':''}${rest('1')}<backup><duration>64</duration></backup>${rest('2')}</measure>`).join('')}</part></score-partwise>`;
  }
  return { create, blank, template, TYPES };
});
