// Real-time Chamber Orchestra Accompaniment for "Long, Long Ago" (A Major, 4/4)
// Uses studio-recorded acoustic samples (VSCO-2 Cello, Harp, Flute, Clarinet,
// French Horn + MusyngKite String Ensemble & Pizzicato Strings) scheduled on
// the exact beat grid — 100% in tune at any practice tempo (42–108 BPM).
(() => {
  "use strict";

  const SAMPLE_DEFS = {
    strings: [
      { name: "A2",  midi: 45, url: "samples/orchestra/strings/A2.mp3" },
      { name: "D3",  midi: 50, url: "samples/orchestra/strings/D3.mp3" },
      { name: "E3",  midi: 52, url: "samples/orchestra/strings/E3.mp3" },
      { name: "Gb3", midi: 54, url: "samples/orchestra/strings/Gb3.mp3" },
      { name: "Ab3", midi: 56, url: "samples/orchestra/strings/Ab3.mp3" },
      { name: "A3",  midi: 57, url: "samples/orchestra/strings/A3.mp3" },
      { name: "B3",  midi: 59, url: "samples/orchestra/strings/B3.mp3" },
      { name: "Db4", midi: 61, url: "samples/orchestra/strings/Db4.mp3" },
      { name: "D4",  midi: 62, url: "samples/orchestra/strings/D4.mp3" },
      { name: "E4",  midi: 64, url: "samples/orchestra/strings/E4.mp3" },
      { name: "Gb4", midi: 66, url: "samples/orchestra/strings/Gb4.mp3" },
      { name: "A4",  midi: 69, url: "samples/orchestra/strings/A4.mp3" },
    ],
    pizz: [
      { name: "E2",  midi: 40, url: "samples/orchestra/pizz/E2.mp3" },
      { name: "Gb2", midi: 42, url: "samples/orchestra/pizz/Gb2.mp3" },
      { name: "A2",  midi: 45, url: "samples/orchestra/pizz/A2.mp3" },
      { name: "B2",  midi: 47, url: "samples/orchestra/pizz/B2.mp3" },
      { name: "D3",  midi: 50, url: "samples/orchestra/pizz/D3.mp3" },
      { name: "E3",  midi: 52, url: "samples/orchestra/pizz/E3.mp3" },
      { name: "Gb3", midi: 54, url: "samples/orchestra/pizz/Gb3.mp3" },
      { name: "Ab3", midi: 56, url: "samples/orchestra/pizz/Ab3.mp3" },
      { name: "A3",  midi: 57, url: "samples/orchestra/pizz/A3.mp3" },
      { name: "B3",  midi: 59, url: "samples/orchestra/pizz/B3.mp3" },
      { name: "Db4", midi: 61, url: "samples/orchestra/pizz/Db4.mp3" },
      { name: "D4",  midi: 62, url: "samples/orchestra/pizz/D4.mp3" },
      { name: "E4",  midi: 64, url: "samples/orchestra/pizz/E4.mp3" },
    ],
    cello: [
      { name: "D2",  midi: 38, url: "samples/orchestra/cello/D2.mp3" },
      { name: "E2",  midi: 40, url: "samples/orchestra/cello/E2.mp3" },
      { name: "A2",  midi: 45, url: "samples/orchestra/cello/A2.mp3" },
      { name: "B2",  midi: 47, url: "samples/orchestra/cello/B2.mp3" },
      { name: "Cs3", midi: 49, url: "samples/orchestra/cello/Cs3.mp3" },
      { name: "D3",  midi: 50, url: "samples/orchestra/cello/D3.mp3" },
      { name: "E3",  midi: 52, url: "samples/orchestra/cello/E3.mp3" },
      { name: "Fs3", midi: 54, url: "samples/orchestra/cello/Fs3.mp3" },
      { name: "Gs3", midi: 56, url: "samples/orchestra/cello/Gs3.mp3" },
      { name: "A3",  midi: 57, url: "samples/orchestra/cello/A3.mp3" },
    ],
    harp: [
      { name: "A2",  midi: 45, url: "samples/orchestra/harp/A2.mp3" },
      { name: "E3",  midi: 52, url: "samples/orchestra/harp/E3.mp3" },
      { name: "B3",  midi: 59, url: "samples/orchestra/harp/B3.mp3" },
      { name: "D4",  midi: 62, url: "samples/orchestra/harp/D4.mp3" },
      { name: "F4",  midi: 65, url: "samples/orchestra/harp/F4.mp3" },
      { name: "A4",  midi: 69, url: "samples/orchestra/harp/A4.mp3" },
      { name: "C5",  midi: 72, url: "samples/orchestra/harp/C5.mp3" },
      { name: "E5",  midi: 76, url: "samples/orchestra/harp/E5.mp3" },
    ],
    flute: [
      { name: "E4",  midi: 64, url: "samples/orchestra/flute/E4.mp3" },
      { name: "A4",  midi: 69, url: "samples/orchestra/flute/A4.mp3" },
      { name: "C5",  midi: 72, url: "samples/orchestra/flute/C5.mp3" },
      { name: "E5",  midi: 76, url: "samples/orchestra/flute/E5.mp3" },
    ],
    clarinet: [
      { name: "D4",  midi: 62, url: "samples/orchestra/clarinet/D4.mp3" },
      { name: "F4",  midi: 65, url: "samples/orchestra/clarinet/F4.mp3" },
      { name: "As4", midi: 70, url: "samples/orchestra/clarinet/As4.mp3" },
      { name: "D5",  midi: 74, url: "samples/orchestra/clarinet/D5.mp3" },
    ],
    horn: [
      { name: "D3",  midi: 50, url: "samples/orchestra/horn/D3.mp3" },
      { name: "F3",  midi: 53, url: "samples/orchestra/horn/F3.mp3" },
      { name: "A3",  midi: 57, url: "samples/orchestra/horn/A3.mp3" },
      { name: "C4",  midi: 60, url: "samples/orchestra/horn/C4.mp3" },
    ],
  };

  // Acoustic voice-shaping profiles per orchestra section (matched to 3D hall seating)
  const SECTION_PROFILES = {
    strings:  { gain: 0.31, lp: 3200, hp: 120, attack: 0.22, release: 0.42, pan: -0.14, panWidth: 0.26, reverb: 0.50, offset: 0.04 },
    pizz:     { gain: 0.42, lp: 3800, hp: 65,  attack: 0.005, release: 0.55, pan:  0.18, panWidth: 0.20, reverb: 0.32, offset: 0.004 },
    cello:    { gain: 0.34, lp: 2400, hp: 55,  attack: 0.16, release: 0.34, pan:  0.30, panWidth: 0.08, reverb: 0.44, offset: 0.04 },
    harp:     { gain: 0.36, lp: 5800, hp: 90,  attack: 0.006, release: 1.60, pan: -0.42, panWidth: 0.10, reverb: 0.52, offset: 0.004 },
    flute:    { gain: 0.22, lp: 4600, hp: 220, attack: 0.11, release: 0.26, pan: -0.14, panWidth: 0.04, reverb: 0.48, offset: 0.03 },
    clarinet: { gain: 0.24, lp: 2900, hp: 160, attack: 0.09, release: 0.24, pan:  0.12, panWidth: 0.04, reverb: 0.45, offset: 0.03 },
    horn:     { gain: 0.24, lp: 1850, hp: 95,  attack: 0.26, release: 0.45, pan: -0.28, panWidth: 0.05, reverb: 0.55, offset: 0.05 },
  };

  // Exact A-Major Chamber Orchestra Voicings (smooth voice leading around middle C)
  const VOICINGS = {
    A:     { bass: 45, fifth: 52, cello: 45, str: [57, 61, 64],     pizzIn: [57, 61],     harp: [45, 52, 57, 61, 64, 69] },
    "A/E": { bass: 40, fifth: 45, cello: 52, str: [57, 61, 64],     pizzIn: [57, 61],     harp: [40, 45, 52, 57, 61, 64] },
    "F#m": { bass: 42, fifth: 49, cello: 42, str: [57, 61, 66],     pizzIn: [54, 57],     harp: [42, 49, 57, 61, 66] },
    D:     { bass: 38, fifth: 45, cello: 50, str: [57, 62, 66],     pizzIn: [57, 62],     harp: [50, 57, 62, 66, 69] },
    E:     { bass: 40, fifth: 47, cello: 40, str: [56, 59, 64],     pizzIn: [56, 59],     harp: [40, 47, 56, 59, 64] },
    E7:    { bass: 40, fifth: 47, cello: 40, str: [56, 59, 62, 64], pizzIn: [56, 62],     harp: [40, 47, 56, 62, 64] },
  };

  // Exact 16-bar chord progression matching "Long, Long Ago" in A Major
  const CHORD_CHART = [
    [1, 0, 4, "A"],    [2, 0, 2, "A"],   [2, 2, 2, "F#m"],
    [3, 0, 2, "A/E"],  [3, 2, 2, "E7"],  [4, 0, 2, "E7"],  [4, 2, 2, "A"],
    [5, 0, 4, "A"],    [6, 0, 2, "A"],   [6, 2, 2, "F#m"],
    [7, 0, 2, "D"],    [7, 2, 2, "E7"],  [8, 0, 4, "A"],
    [9, 0, 2, "E7"],   [9, 2, 2, "E"],   [10, 0, 2, "E7"], [10, 2, 2, "A"],
    [11, 0, 2, "E7"],  [11, 2, 2, "E"],  [12, 0, 2, "E7"], [12, 2, 2, "A"],
    [13, 0, 4, "A"],   [14, 0, 2, "A"],  [14, 2, 2, "F#m"],
    [15, 0, 2, "D"],   [15, 2, 2, "E7"], [16, 0, 4, "A"],
  ];

  // Dynamic contour matching the score markings: mf (1-8), f (9-10), mp (11-12), mf (13-16)
  function barDynamic(bar) {
    if (bar <= 4)  return 0.78; // mf gentle opening
    if (bar <= 8)  return 0.84; // mf fuller second phrase
    if (bar <= 10) return 1.00; // f  bridge climax
    if (bar <= 12) return 0.62; // mp intimate echo
    if (bar <= 15) return 0.86; // mf warm return
    return 0.82;                // warm final resolution
  }

  // Build the full chamber orchestra event list on the beat grid
  // Event: { beat, dur, inst, midis, vel, rollMs }
  const ORCHESTRA_EVENTS = (() => {
    const ev = [];
    const add = (beat, dur, inst, midis, vel, rollMs = 0) => {
      ev.push({ beat, dur, inst, midis, vel, rollMs });
    };
    const bAt = (bar, bib) => 1 + (bar - 1) * 4 + bib;

    // 1. Gentle 4-beat pizzicato count-in cue (beats -3, -2, -1, 0) in A major
    add(-3.0, 0.8, "pizz", [45],     0.58, 0);
    add(-2.0, 0.8, "pizz", [52],     0.46, 0);
    add(-1.0, 0.8, "pizz", [57],     0.50, 0);
    add( 0.0, 0.9, "pizz", [40, 52], 0.56, 12);
    add( 0.0, 1.2, "harp", [52, 56, 62], 0.36, 45);

    // 2. Chord-driven chamber strings, cello, pizzicato pulse & harp
    for (const [bar, bib, beats, name] of CHORD_CHART) {
      const v = VOICINGS[name];
      const b0 = bAt(bar, bib);
      const dyn = barDynamic(bar);

      // Final bar (Bar 16): grand, warm resolving chord + shimmering ascending harp arpeggio
      if (bar === 16) {
        add(b0, 3.8, "cello",   [45, 52], 0.82, 20);
        add(b0, 3.6, "strings", [57, 61, 64, 69], 0.78, 35);
        add(b0, 3.4, "horn",    [57], 0.56, 0);
        add(b0, 1.0, "pizz",    [45], 0.60, 0);
        // Ascending harp arpeggio over the final half-note & half-rest
        const finHarp = [45, 52, 57, 61, 64, 69, 73, 76];
        finHarp.forEach((m, i) => {
          add(b0 + i * 0.25, 2.6, "harp", [m], 0.52 - i * 0.025, 0);
        });
        continue;
      }

      // Sustained bowed strings (split 4-beat bars into two gently overlapping 2-beat bows)
      if (beats >= 4) {
        add(b0,       2.35, "strings", v.str, dyn * 0.76, 28);
        add(b0 + 2.0, 2.30, "strings", v.str, dyn * 0.68, 26);
        add(b0,       2.40, "cello",   [v.cello], dyn * 0.80, 0);
        add(b0 + 2.0, 2.25, "cello",   [v.fifth], dyn * 0.68, 0);
      } else {
        add(b0, beats + 0.25, "strings", v.str, dyn * 0.78, 24);
        add(b0, beats + 0.20, "cello",   [v.cello], dyn * 0.82, 0);
      }

      // Gentle pizzicato chamber pulse (bass on beats 1 & 3, soft inner pluck on beats 2 & 4)
      for (let k = 0; k < beats; k++) {
        const isStrong = (bib + k) % 2 === 0;
        if (bar === 8 && k >= 2) break; // let the Bar 8 half-rest breathe with harp!
        if (isStrong) {
          const bassNote = k === 0 ? v.bass : v.fifth;
          add(b0 + k, 0.85, "pizz", [bassNote], dyn * (k === 0 ? 0.76 : 0.62), 0);
        } else {
          add(b0 + k, 0.70, "pizz", v.pizzIn, dyn * 0.44, 10);
        }
      }

      // Graceful Harp rolled chord on major phrase openings & bar downbeats
      if (bib === 0 && (bar === 1 || bar === 5 || bar === 9 || bar === 11 || bar === 13 || bar === 15)) {
        add(b0, 2.2, "harp", v.harp.slice(0, 5), dyn * 0.66, 75);
      } else if (bib === 2 && (bar === 2 || bar === 4 || bar === 6 || bar === 10 || bar === 12 || bar === 14)) {
        // Gentle harp sparkle on half-note phrase breaths
        add(b0, 1.8, "harp", v.harp.slice(1, 5), dyn * 0.50, 60);
      }
    }

    // 3. Bar 8 half-rest harp cadence flourish (bridges Verse 1 -> Bridge)
    [57, 61, 64, 69, 73, 76].forEach((m, i) => {
      add(bAt(8, 2.0) + i * 0.25, 1.6, "harp", [m], 0.48 - i * 0.02, 0);
    });

    // 4. Woodwind & French Horn Orchestral Colour (never competes with the solo violin melody!)
    // Bars 5–8: Warm Clarinet inner-voice counter-line
    add(bAt(6, 2.0), 2.0, "clarinet", [61], 0.42, 0); // C#4 on F#m
    add(bAt(7, 0.0), 2.0, "clarinet", [62], 0.44, 0); // D4 on D
    add(bAt(7, 2.0), 2.0, "clarinet", [59], 0.44, 0); // B3 on E7
    add(bAt(8, 0.0), 2.2, "clarinet", [61], 0.46, 0); // C#4 resolving on A

    // Bars 9–10 (forte): Golden French Horn pedal + airy Flute/Clarinet harmony
    add(bAt(9,  0.0), 4.1, "horn",     [52], 0.68, 0); // E3 noble pedal
    add(bAt(10, 0.0), 2.1, "horn",     [52], 0.62, 0); // E3
    add(bAt(10, 2.0), 2.1, "horn",     [57], 0.58, 0); // A3 resolution
    add(bAt(9,  0.0), 2.0, "flute",    [68], 0.40, 0); // G#4 sweet harmony
    add(bAt(9,  2.0), 2.0, "flute",    [71], 0.44, 0); // B4
    add(bAt(10, 0.0), 2.0, "flute",    [68], 0.42, 0); // G#4
    add(bAt(10, 2.0), 2.0, "flute",    [69], 0.44, 0); // A4
    add(bAt(9,  0.0), 2.0, "clarinet", [64], 0.46, 0); // E4
    add(bAt(9,  2.0), 2.0, "clarinet", [64], 0.44, 0);
    add(bAt(10, 0.0), 2.0, "clarinet", [62], 0.46, 0); // D4
    add(bAt(10, 2.0), 2.0, "clarinet", [61], 0.46, 0); // C#4

    // Bars 11–12 (mp echo): Intimate Clarinet + delicate Flute shimmer (Horn rests)
    add(bAt(11, 0.0), 2.0, "clarinet", [62], 0.34, 0);
    add(bAt(11, 2.0), 2.0, "clarinet", [64], 0.32, 0);
    add(bAt(12, 0.0), 2.0, "clarinet", [62], 0.34, 0);
    add(bAt(12, 2.0), 2.0, "clarinet", [61], 0.36, 0);
    add(bAt(12, 2.0), 1.8, "flute",    [69], 0.28, 0);

    // Bars 13–15 (mf warm return): Flute & Clarinet gentle halo + Horn warmth in Bar 15
    add(bAt(14, 2.0), 2.0, "clarinet", [61], 0.42, 0);
    add(bAt(15, 0.0), 2.0, "clarinet", [62], 0.44, 0);
    add(bAt(15, 2.0), 2.0, "clarinet", [62], 0.44, 0);
    add(bAt(15, 0.0), 2.0, "flute",    [69], 0.36, 0);
    add(bAt(15, 2.0), 2.0, "flute",    [68], 0.38, 0);
    add(bAt(15, 0.0), 2.1, "horn",     [57], 0.46, 0);
    add(bAt(15, 2.0), 2.1, "horn",     [52], 0.48, 0);

    return ev.sort((a, b) => a.beat - b.beat);
  })();

  const rawBytes = new Map();
  const decodedBanks = new Map();
  let prefetched = false;
  let decoded = false;
  let decodePromise = null;

  async function prefetch() {
    if (prefetched) return;
    const all = Object.values(SAMPLE_DEFS).flat();
    try {
      await Promise.all(
        all.map(async (def) => {
          const resp = await fetch(def.url);
          if (!resp.ok) throw new Error(`HTTP ${resp.status} for ${def.url}`);
          rawBytes.set(def.url, await resp.arrayBuffer());
        })
      );
      prefetched = true;
    } catch (err) {
      console.warn("Chamber orchestra sample fetch warning:", err);
    }
  }

  async function ensureDecoded(audioCtx) {
    if (decoded) return true;
    if (!prefetched) await prefetch();
    if (!audioCtx || rawBytes.size === 0) return false;
    if (decodePromise) return decodePromise;

    decodePromise = (async () => {
      try {
        for (const [inst, defs] of Object.entries(SAMPLE_DEFS)) {
          const bank = [];
          for (const def of defs) {
            const raw = rawBytes.get(def.url);
            if (!raw) continue;
            const buffer = await audioCtx.decodeAudioData(raw.slice(0));
            bank.push({ ...def, buffer });
          }
          decodedBanks.set(inst, bank);
        }
        decoded = decodedBanks.size > 0;
        return decoded;
      } catch (e) {
        console.warn("Chamber orchestra decode warning:", e);
        return false;
      } finally {
        decodePromise = null;
      }
    })();
    return decodePromise;
  }

  function closestInBank(inst, midi) {
    const bank = decodedBanks.get(inst);
    if (!bank || bank.length === 0) return null;
    let best = bank[0];
    let bestD = Math.abs(midi - best.midi);
    for (let i = 1; i < bank.length; i++) {
      const d = Math.abs(midi - bank[i].midi);
      if (d < bestD) {
        bestD = d;
        best = bank[i];
      }
    }
    return best;
  }

  function scheduleEvent(evt, when, secPerBeat, ctx, dryBus, reverbBus, activeNodes, soloMuted) {
    if (!decoded || !ctx) return;
    const prof = SECTION_PROFILES[evt.inst];
    if (!prof) return;

    const durSec = Math.max(0.18, evt.dur * secPerBeat);
    const boost = soloMuted ? 1.18 : 1.0;

    // Section tone-shaping bus (warm hall acoustics + low/high shelf balance)
    const sectionGain = ctx.createGain();
    sectionGain.gain.setValueAtTime(1.0, when);

    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.setValueAtTime(prof.lp, when);
    lp.Q.value = 0.55;

    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.setValueAtTime(prof.hp, when);

    // Dry/wet hall balance per section (winds & horn sit deeper in the hall than pizzicato)
    const dryOut = ctx.createGain();
    dryOut.gain.setValueAtTime(1.0 - prof.reverb * 0.35, when);
    const wetOut = ctx.createGain();
    wetOut.gain.setValueAtTime(prof.reverb, when);

    sectionGain.connect(hp);
    hp.connect(lp);
    lp.connect(dryOut);
    lp.connect(wetOut);
    dryOut.connect(dryBus);
    wetOut.connect(reverbBus);

    const sources = [];
    let maxEnd = when + durSec + prof.release;
    const sorted = [...evt.midis].sort((a, b) => a - b);

    sorted.forEach((midi, idx) => {
      const sample = closestInBank(evt.inst, midi);
      if (!sample) return;

      const src = ctx.createBufferSource();
      src.buffer = sample.buffer;
      const rate = Math.pow(2, (midi - sample.midi) / 12);
      src.playbackRate.setValueAtTime(rate, when);

      const rollDelay =
        sorted.length > 1 && evt.rollMs > 0
          ? (idx * (evt.rollMs / 1000)) / (sorted.length - 1)
          : 0;
      const noteWhen = when + rollDelay;

      // Natural playback duration bounded by actual sample length
      const availDur = Math.max(0.15, (sample.buffer.duration - prof.offset) / rate);
      const isPlucked = evt.inst === "pizz" || evt.inst === "harp";
      const playDur = isPlucked ? Math.min(availDur, durSec + prof.release) : Math.min(availDur - 0.08, durSec);
      const atk = Math.min(prof.attack, playDur * 0.38);
      const rel = isPlucked ? Math.min(prof.release, Math.max(0.18, availDur - 0.06)) : Math.min(prof.release, Math.max(0.14, availDur - playDur));

      const voiceScale = sorted.length > 2 ? 0.84 : 1.0;
      const peak = prof.gain * evt.vel * voiceScale * boost;

      const env = ctx.createGain();
      if (isPlucked) {
        env.gain.setValueAtTime(0.0001, noteWhen);
        env.gain.linearRampToValueAtTime(peak, noteWhen + atk);
        env.gain.exponentialRampToValueAtTime(0.0001, noteWhen + Math.max(atk + 0.08, playDur));
      } else {
        // Gentle expressive swell on sustained bowed/wind voices
        const swellEnd = noteWhen + Math.max(atk + 0.02, playDur * 0.55);
        const relStart = noteWhen + Math.max(atk + 0.04, playDur);
        env.gain.setValueAtTime(0.0001, noteWhen);
        env.gain.linearRampToValueAtTime(peak * 0.92, noteWhen + atk);
        env.gain.linearRampToValueAtTime(peak * 1.03, swellEnd);
        env.gain.linearRampToValueAtTime(peak * 0.86, relStart);
        env.gain.exponentialRampToValueAtTime(0.0001, relStart + rel);
      }

      if (ctx.createStereoPanner) {
        const pan = ctx.createStereoPanner();
        const spread = sorted.length > 1 ? ((idx / (sorted.length - 1)) - 0.5) * prof.panWidth : 0;
        pan.pan.value = Math.max(-0.85, Math.min(0.85, prof.pan + spread));
        src.connect(env);
        env.connect(pan);
        pan.connect(sectionGain);
      } else {
        src.connect(env);
        env.connect(sectionGain);
      }

      const stopAt = noteWhen + (isPlucked ? playDur : playDur + rel) + 0.04;
      src.start(noteWhen, prof.offset);
      src.stop(stopAt);
      sources.push(src);
      if (stopAt > maxEnd) maxEnd = stopAt;
    });

    if (sources.length > 0) {
      activeNodes.push({ sources, gain: sectionGain, endTime: maxEnd + 0.05 });
    }
  }

  window.ChamberOrchestra = {
    EVENTS: ORCHESTRA_EVENTS,
    prefetch,
    ensureDecoded,
    isReady: () => decoded,
    isPrefetched: () => prefetched,
    scheduleEvent,
  };
})();
