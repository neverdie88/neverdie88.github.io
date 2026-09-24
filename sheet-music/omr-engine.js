/* SPDX-License-Identifier: AGPL-3.0-only
 * Browser adapter for HOMR checkpoint 426. Model tensor protocol and vocabulary:
 * https://github.com/liebharc/homr (see models/LICENSE.txt and models/README.md).
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.PitchOMR = api;
})(globalThis, function () {
  'use strict';
  function grayImage({ data, width, height }) {
    const gray = new Uint8Array(width * height);
    for (let i = 0; i < gray.length; i++) {
      const alpha = data[i * 4 + 3] / 255;
      gray[i] = Math.round((data[i * 4] * .299 + data[i * 4 + 1] * .587 + data[i * 4 + 2] * .114) * alpha + 255 * (1 - alpha));
    }
    return { data: gray, width, height };
  }
  function sample(image, x, y) {
    if (x < 0 || y < 0 || x >= image.width - 1 || y >= image.height - 1) return 255;
    const left = Math.floor(x), top = Math.floor(y), fx = x - left, fy = y - top;
    const at = top * image.width + left, d = image.data, w = image.width;
    return (d[at] * (1 - fx) + d[at + 1] * fx) * (1 - fy) + (d[at + w] * (1 - fx) + d[at + w + 1] * fx) * fy;
  }
  function inputPixels(image, crop = { x: 0, y: 0, width: image.width, height: image.height, slope: 0 }) {
    const scale = Math.min(1280 / crop.width, 256 / crop.height);
    const width = Math.max(1, Math.floor(crop.width * scale)), height = Math.max(1, Math.floor(crop.height * scale));
    const top = Math.floor((256 - height) / 2);
    const result = new Float32Array(256 * 1280).fill((1 - .7931) / .1738);
    for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
      const sx = crop.x + (x + .5) / scale - .5;
      const sy = crop.y + (y + .5) / scale - .5 + (crop.slope || 0) * (sx - image.width / 2);
      result[(y + top) * 1280 + x] = (sample(image, sx, sy) / 255 - .7931) / .1738;
    }
    return result;
  }
  const argmax = values => {
    let best = 0;
    for (let i = 1; i < values.length; i++) if (values[i] > values[best]) best = i;
    return best;
  };
  function findStaves(image) {
    // Search a small skew range using long horizontal ink runs. Five regularly
    // spaced lines are required; text or a blank photo must not enter the model.
    const scale = Math.min(1, 1100 / image.width), w = Math.floor(image.width * scale), h = Math.floor(image.height * scale);
    const small = new Uint8Array(w * h);
    const histogram = new Uint32Array(256);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const gray = Math.round(sample(image, x / scale, y / scale));
      small[y * w + x] = gray; histogram[gray]++;
    }
    let sum = 0; for (let i = 0; i < 256; i++) sum += i * histogram[i];
    let count = 0, lowSum = 0, bestVariance = 0, threshold = 160;
    for (let i = 0; i < 245; i++) {
      count += histogram[i]; lowSum += histogram[i] * i;
      if (!count || count === small.length) continue;
      const delta = lowSum / count - (sum - lowSum) / (small.length - count);
      const variance = count * (small.length - count) * delta * delta;
      if (variance > bestVariance) { bestVariance = variance; threshold = Math.min(205, i + 12); }
    }
    let best = { score: -1, slope: 0, rows: null };
    for (let angle = -4; angle <= 4; angle += .25) {
      const slope = Math.tan(angle * Math.PI / 180), rows = new Uint16Array(h);
      for (let x = 0; x < w; x += 2) {
        const offset = Math.round(slope * (x - w / 2));
        for (let y = Math.max(0, -offset); y < Math.min(h, h - offset); y++) {
          if (small[(y + offset) * w + x] < threshold) rows[y]++;
        }
      }
      let score = 0;
      for (const row of rows) if (row > w * .14) score += row * row;
      if (score > best.score) best = { score, slope, rows };
    }
    const peaks = [];
    for (let y = 1; y < h - 1; y++) {
      if (best.rows[y] < w * .14) continue;
      let end = y, weighted = 0, weight = 0;
      while (end < h && best.rows[end] >= w * .14) { weighted += end * best.rows[end]; weight += best.rows[end]; end++; }
      peaks.push(weighted / weight); y = end;
    }
    const candidates = [];
    // Fit the spacing across all five lines. At reduced resolution, adjacent
    // gaps can alternate (e.g. 9, 10, 9, 10 pixels); extrapolating the first
    // gap alone rejects a perfectly regular printed staff.
    for (let i = 0; i < peaks.length; i++) for (let j = i + 4; j < peaks.length; j++) {
      const gap = (peaks[j] - peaks[i]) / 4;
      if (gap < 4 || gap > Math.min(65, h / 8)) continue;
      const lines = [peaks[i]];
      for (let k = 1; k < 4; k++) {
        const expected = peaks[i] + k * gap;
        const next = peaks.slice(i + 1, j).filter(p => Math.abs(p - expected) < Math.max(1.8, gap * .12)).sort((a,b) => Math.abs(a - expected) - Math.abs(b - expected))[0];
        if (next === undefined) break;
        lines.push(next);
      }
      if (lines.length === 4) lines.push(peaks[j]);
      if (lines.length === 5) candidates.push({ lines, gap, strength: lines.reduce((sum, y) => sum + best.rows[Math.round(y)], 0) });
    }
    const accepted = [];
    for (const candidate of candidates.sort((a, b) => b.strength - a.strength)) {
      if (!accepted.some(s => candidate.lines[0] < s.lines[4] + s.gap && candidate.lines[4] > s.lines[0] - s.gap)) accepted.push(candidate);
    }
    accepted.sort((a, b) => a.lines[0] - b.lines[0]);
    if (!accepted.length) throw new Error('No clear five-line staff was found. Rotate the photo upright, crop to the music, and use a flat, well-lit page.');
    return accepted.map((staff, i) => {
      const top = Math.max(0, staff.lines[0] - staff.gap * 4, i ? (accepted[i - 1].lines[4] + staff.lines[0]) / 2 : 0);
      const bottom = Math.min(h, staff.lines[4] + staff.gap * 4, i + 1 < accepted.length ? (staff.lines[4] + accepted[i + 1].lines[0]) / 2 : h);
      let left = w, right = 0;
      for (let x = 0; x < w; x++) {
        const offset = best.slope * (x - w / 2);
        let ink = 0;
        for (const line of staff.lines) {
          const y = Math.round(line + offset);
          if ([-1, 0, 1].some(dy => small[(y + dy) * w + x] < threshold)) ink++;
        }
        if (ink >= 4) { left = Math.min(left, x); right = x; }
      }
      const lineLeft=left/scale,lineRight=right/scale;
      left = Math.max(0, left - staff.gap); right = Math.min(w, right + staff.gap);
      return { x: left / scale, y: top / scale, width: (right - left) / scale, height: (bottom - top) / scale, slope: best.slope,
        lineTop:staff.lines[0]/scale,lineBottom:staff.lines[4]/scale,gap:staff.gap/scale,lineLeft,lineRight };
    });
  }
  function findSystems(image, staves) {
    // A shared barline/brace at the left joins simultaneous staves. Clef order
    // alone is insufficient: a single instrument can change clef between rows.
    function connected(a, b) {
      const gap=(a.gap+b.gap)/2;
      if(Math.abs(a.lineLeft-b.lineLeft)>gap*2||Math.max(a.gap,b.gap)>Math.min(a.gap,b.gap)*1.4)return false;
      const top=a.lineBottom+gap*.5,bottom=b.lineTop-gap*.5;
      if(bottom-top<gap)return false;
      const left=Math.max(0,Math.floor(Math.min(a.lineLeft,b.lineLeft)-gap)),right=Math.min(image.width-1,Math.ceil(Math.max(a.lineLeft,b.lineLeft)+gap*.5));
      for(let x=left;x<=right;x++){
        let ink=0,total=0;
        for(let y=top;y<bottom;y+=Math.max(1,gap/4)){
          const py=y+a.slope*(x-image.width/2);
          if(Math.min(sample(image,x-1,py),sample(image,x,py),sample(image,x+1,py))<160)ink++;
          total++;
        }
        if(total&&ink/total>=.8)return true;
      }
      return false;
    }
    const systems=[];
    staves.forEach((staff,index)=>{
      if(index&&connected(staves[index-1],staff))systems.at(-1).push(index);
      else systems.push([index]);
    });
    return systems;
  }
  async function recognize(ort, encoder, decoder, vocab, pixels, progress = () => {}) {
    const tensor = new ort.Tensor('float32', pixels, [1, 1, 256, 1280]);
    const encoded = await encoder.run({ input: tensor });
    tensor.dispose();
    const context = encoded.output;
    const reduced = new ort.Tensor('float32', context.data.slice(0, 512), [1, 1, 512]);
    let cache = Array.from({ length: 32 }, () => new ort.Tensor('float32', new Float32Array(0), [1, 8, 0, 64]));
    let tokens = { rhythms: 1, pitchs: 0, lifts: 0, articulations: 0, slurs: 0 };
    const symbols = [];
    const branches = { rhythms: 'rhythm', pitchs: 'pitch', lifts: 'lift', positions: 'position', articulations: 'articulation', slurs: 'slur' };
    try {
      // 608 is this checkpoint's architectural sequence length, not a UI limit.
      for (let step = 0; step < 608; step++) {
        const feeds = { context: step ? reduced : context, cache_len: new ort.Tensor('int64', BigInt64Array.of(BigInt(step)), [1]) };
        for (const [name, token] of Object.entries(tokens)) feeds[name] = new ort.Tensor('int64', BigInt64Array.of(BigInt(token)), [1, 1]);
        cache.forEach((value, i) => { feeds['cache_in' + i] = value; });
        let outputs;
        try { outputs = await decoder.run(feeds); }
        finally { feeds.cache_len.dispose(); for (const name of Object.keys(tokens)) feeds[name].dispose(); }
        cache.forEach(value => value.dispose());
        cache = cache.map((_, i) => outputs['cache_out' + i]);
        const symbol = {};
        for (const [name, branch] of Object.entries(branches)) {
          const token = argmax(outputs['out_' + name].data);
          if (name !== 'positions') tokens[name] = token;
          symbol[branch] = vocab[branch][token];
          outputs['out_' + name].dispose();
        }
        outputs.attention.dispose();
        if (tokens.rhythms === 2) return symbols;
        if (tokens.rhythms < 3) throw new Error('The recognizer could not read this staff. Try a clearer, closer photo.');
        symbols.push(symbol);
        if (step % 8 === 0) progress(symbols.length);
      }
      throw new Error('This line is too dense to recognize completely. Crop a shorter section and try again.');
    } finally {
      cache.forEach(value => value.dispose());
      reduced.dispose();
      Object.values(encoded).forEach(value => value.dispose());
    }
  }
  return { grayImage, inputPixels, findStaves, findSystems, recognize };
});
