/* Hit testing on the positions supplied by the score engraver. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.ComposerStaff=api;})(globalThis,function(){
  const letters='CDEFGAB',naturals=[0,2,4,5,7,9,11];
  const stepOf=(note,clef)=>7*(note.octave-4)+letters.indexOf(note.step)-2+(clef==='bass'?12:0);
  const contextAt=(bar,beat)=>(bar.contexts||[]).filter(item=>item.beat<=beat+1e-7).at(-1)?.ctx||bar.ctx;
  function pitchAt(y,bar,layout,accidental='key',beat=0){
    const ctx=contextAt(bar,beat);
    const step=Math.round(((bar.bottom??layout.bottom)-y)/(bar.halfGap||layout.halfGap));
    const diatonic=step+2-(ctx.clef==='bass'?12:0)+28;
    const letter=letters[(diatonic%7+7)%7],octave=Math.floor(diatonic/7),fifths=ctx.fifths;
    const inKey=(fifths<0?'BEADGCF':'FCGDAEB').slice(0,Math.abs(fifths)).includes(letter);
    const alter=accidental==='key'?(inKey?Math.sign(fifths):0):Number(accidental);
    return {step:letter,octave,alter,midi:naturals[letters.indexOf(letter)]+12*(octave+1)+alter};
  }
  function xAt(bar,beat){
    const points=bar.points;
    if(beat<=points[0].beat)return points[0].x;
    for(let i=1;i<points.length;i++)if(beat<=points[i].beat){
      const a=points[i-1],b=points[i];return a.x+(b.x-a.x)*(beat-a.beat)/(b.beat-a.beat);
    }
    return points.at(-1).x;
  }
  function target(layout,x,y,unit=.25,accidental='key'){
    const bar=layout.bars.filter(b=>x>=b.left&&x<b.end&&y>=b.top&&y<b.top+b.height)
      .sort((a,b)=>Math.abs(y-(a.bottom-4*a.halfGap))-Math.abs(y-(b.bottom-4*b.halfGap)))[0];
    if(!bar)return null;
    let beat=0;
    for(let i=1;i<bar.points.length;i++){
      const a=bar.points[i-1],b=bar.points[i];
      if(x<=b.x||i===bar.points.length-1){beat=a.beat+(x-a.x)/(b.x-a.x)*(b.beat-a.beat);break;}
    }
    beat=Math.max(0,Math.min(bar.beats-unit,Math.round(beat/unit)*unit));
    const rest=layout.hits.find(n=>n.bar===bar&&n.rest&&Math.abs(n.x-x)<10&&Math.abs(n.y-y)<14);
    if(rest)beat=rest.group.beat;
    return {bar,measure:bar.measure,beat,ctx:contextAt(bar,beat),pitch:pitchAt(y,bar,layout,accidental,beat),x:xAt(bar,beat)};
  }
  function hit(layout,x,y){
    return layout.hits.map(n=>({...n,distance:Math.hypot((n.x-x)*1.2,n.y-y)}))
      .filter(n=>n.distance<=14).sort((a,b)=>a.distance-b.distance)[0];
  }
  function groupsInRect(layout,a,b){
    const left=Math.min(a.x,b.x),right=Math.max(a.x,b.x),top=Math.min(a.y,b.y),bottom=Math.max(a.y,b.y),groups=new Map();
    for(const n of layout.hits)if(n.x+7>=left&&n.x-7<=right&&n.y+6>=top&&n.y-6<=bottom)groups.set(`${n.measure}:${n.index}`,{measure:n.measure,index:n.index});
    return [...groups.values()];
  }
  return {target,hit,pitchAt,stepOf,groupsInRect,xAt,contextAt};
});
