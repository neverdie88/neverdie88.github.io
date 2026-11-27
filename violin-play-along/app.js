(() => {
  "use strict";

  // =========================================================================
  // 1. DYNAMIC MULTI-SONG LIBRARY DATA (loaded from songs/catalog.json)
  // =========================================================================
  let SONG_CATALOG = null;
  const SONG_CACHE = new Map();
  let CURRENT_SONG = null;
  let LAYOUT = { width: 440, height: 324, halfSpace: 2.15625, systemMid: [88, 156, 224, 292] };
  let SHEET_W = 440;
  let SHEET_H = 324;
  let HALF_SPACE = 2.15625;
  let PITCH_INFO = {};
  let MEASURES = [];
  let RESTS = [];
  let NOTES = [];
  let PIANO_EVENTS = [];
  let ORCHESTRA_EVENTS = [];
  let TOTAL_BEATS = 65.0;

  function fingerboardStringX(strIdx, y) {
    const t = (y - 38) / 368;
    if (strIdx === 0) return 68 - 4 * t;
    if (strIdx === 1) return 104 - 2 * t;
    if (strIdx === 2) return 140;
    return 176 + 2 * t;
  }

  function systemMidSvgY(sys) {
    return (LAYOUT.systemMid && LAYOUT.systemMid[sys] !== undefined) ? LAYOUT.systemMid[sys] : 88;
  }

  // =========================================================================
  // 2. STATE & DOM ELEMENTS
  // =========================================================================
  const state = {
    isPlaying: false,
    bpm: 72,
    countInEnabled: true,
    loopEnabled: false,
    micMatchEnabled: true,
    vocalAudio: false, // no sung vocal bank for this song (instrumental play-along)
    violinAudio: true,
    orchestraAudio: true,
    chordAudio: false,
    violinVolume: 1.0,
    orchVolume: 1.0,
    backingAudio: true,
    concertView: false,
    concertTab: false, // show the animated TAB beside the 3D concert view
    clickAudio: false,
    tabMode: "detailed", // "classic" | "detailed" | "notes"
    showSheetFingers: true,
    showPositionPanel: true,
    leftPanelPct: 52,
    posPanelWidth: 262,
    sheetZoomPct: 100,
    sheetFitMode: true,
    currentBeat: -3.0,
    anchorAudioTime: 0,
    anchorBeat: -3.0,
  };

  const dom = {
    btnPlay: document.getElementById("btnPlay"),
    playIcon: document.getElementById("playIcon"),
    playLabel: document.getElementById("playLabel"),
    btnRestart: document.getElementById("btnRestart"),
    btnLoop: document.getElementById("btnLoop"),
    btnCountIn: document.getElementById("btnCountIn"),
    tempoSlider: document.getElementById("tempoSlider"),
    tempoValue: document.getElementById("tempoValue"),
    presetBtns: document.querySelectorAll(".preset-btn"),
    btnMicMatch: document.getElementById("btnMicMatch"),
    btnMicStatus: document.getElementById("btnMicStatus"),
    micDot: document.getElementById("micDot"),
    micPitchReadout: document.getElementById("micPitchReadout"),
    cntPerfect: document.getElementById("cntPerfect"),
    cntAlmost: document.getElementById("cntAlmost"),
    cntMiss: document.getElementById("cntMiss"),
    totalScoreVal: document.getElementById("totalScoreVal"),
    totalAccVal: document.getElementById("totalAccVal"),
    finalTotalHeadline: document.getElementById("finalTotalHeadline"),
    finalScoreSummary: document.getElementById("finalScoreSummary"),
    noteRatingsLayer: document.getElementById("noteRatingsLayer"),
    btnVocalAudio: document.getElementById("btnVocalAudio"),
    btnViolinAudio: document.getElementById("btnViolinAudio"),
    btnOrchestraAudio: document.getElementById("btnOrchestraAudio"),
    btnChordAudio: document.getElementById("btnChordAudio"),
    violinVolSlider: document.getElementById("violinVolSlider"),
    violinVolVal: document.getElementById("violinVolVal"),
    orchVolSlider: document.getElementById("orchVolSlider"),
    orchVolVal: document.getElementById("orchVolVal"),
    btnClickAudio: document.getElementById("btnClickAudio"),
    tabModeSelect: document.getElementById("tabModeSelect"),
    btnSheetFingers: document.getElementById("btnSheetFingers"),
    btnTogglePosition: document.getElementById("btnTogglePosition"),
    btnClosePosition: document.getElementById("btnClosePosition"),
    btnReopenPosition: document.getElementById("btnReopenPosition"),
    positionSidebar: document.getElementById("positionSidebar"),
    workspace: document.getElementById("workspace"),
    tabSplitBody: document.getElementById("tabSplitBody"),
    mainSplitResizer: document.getElementById("mainSplitResizer"),
    posSplitResizer: document.getElementById("posSplitResizer"),
    sheetStage: document.getElementById("sheetStage"),
    sheetCanvasWrap: document.getElementById("sheetCanvasWrap"),
    btnSheetZoomOut: document.getElementById("btnSheetZoomOut"),
    sheetZoomSlider: document.getElementById("sheetZoomSlider"),
    sheetZoomValue: document.getElementById("sheetZoomValue"),
    btnSheetZoomIn: document.getElementById("btnSheetZoomIn"),
    btnSheetZoomFit: document.getElementById("btnSheetZoomFit"),
    barIndicator: document.getElementById("barIndicator"),
    sampleStatus: document.getElementById("sampleStatus"),
    nowPlayingBadge: document.getElementById("nowPlayingBadge"),
    lyricDisplay: document.getElementById("lyricDisplay"),
    measureBoxesLayer: document.getElementById("measureBoxesLayer"),
    activeMeasureBox: document.getElementById("activeMeasureBox"),
    sheetFingeringsLayer: document.getElementById("sheetFingeringsLayer"),
    activeNoteBlueInk: document.getElementById("activeNoteBlueInk"),
    playheadGroup: document.getElementById("playheadGroup"),
    playheadGlow: document.getElementById("playheadGlow"),
    playheadLine: document.getElementById("playheadLine"),
    noteHitTargets: document.getElementById("noteHitTargets"),
    tabCanvas: document.getElementById("tabCanvas"),
    miniMapDot: document.getElementById("miniMapDot"),
    miniMapHalo: document.getElementById("miniMapHalo"),
    miniMapCore: document.getElementById("miniMapCore"),
    miniMapText: document.getElementById("miniMapText"),
    fbNextStrLine: document.getElementById("fbNextStrLine"),
    miniShiftArrow: document.getElementById("miniShiftArrow"),
    miniNextGroup: document.getElementById("miniNextGroup"),
    miniNextHalo: document.getElementById("miniNextHalo"),
    miniNextCore: document.getElementById("miniNextCore"),
    miniNextProgress: document.getElementById("miniNextProgress"),
    miniNextText: document.getElementById("miniNextText"),
    miniNextTagGroup: document.getElementById("miniNextTagGroup"),
    miniNextTagBg: document.getElementById("miniNextTagBg"),
    miniNextTagTxt: document.getElementById("miniNextTagTxt"),
    posNowText: document.getElementById("posNowText"),
    posNextMain: document.getElementById("posNextMain"),
    posNextHint: document.getElementById("posNextHint"),
    fbHdrs: [
      document.getElementById("fbHdr0"),
      document.getElementById("fbHdr1"),
      document.getElementById("fbHdr2"),
      document.getElementById("fbHdr3"),
    ],
    fbStrings: [
      document.getElementById("fbStr0"),
      document.getElementById("fbStr1"),
      document.getElementById("fbStr2"),
      document.getElementById("fbStr3"),
    ],
    wellDoneOverlay: document.getElementById("wellDoneOverlay"),
    btnReplayOverlay: document.getElementById("btnReplayOverlay"),
    beatScrubber: document.getElementById("beatScrubber"),
    timeCurrent: document.getElementById("timeCurrent"),
    timeTotal: document.getElementById("timeTotal"),
  };

  function getStartMinBeat() {
    if (state.countInEnabled) return CURRENT_SONG ? CURRENT_SONG.startMinBeat : -3.0;
    return CURRENT_SONG && !CURRENT_SONG.hasPickup ? CURRENT_SONG.bar1Beat : 0.0;
  }

  function fingerLabelFor(note) {
    if (state.tabMode === "classic") return note.classic;
    if (state.tabMode === "notes") return note.noteLabel;
    return note.detailed;
  }

  function shortTapeLocation(note) {
    if (note.fbY <= 50) return "Open String (no finger)";
    if (note.fbY === 96) return "Before Tape 1 (Low 1)";
    if (note.fbY === 148) return "Right ON White Tape 1";
    if (note.fbY === 200) return "Just past Tape 1 (Low 2)";
    if (note.fbY === 252) return "High 2 · snug against Tape 3";
    if (note.fbY === 304) return "Right ON White Tape 3";
    return note.tapeHint;
  }

  function describeHandGuidance(activeNote, nextNote) {
    if (!nextNote) return "Hold final note steady to the end";
    const nextLbl = fingerLabelFor(nextNote);
    const spot = shortTapeLocation(nextNote);
    if (!activeNote) {
      return nextNote.kind === "open"
        ? `Prepare Open ${nextNote.stringName} String (lift fingers)`
        : `Place ${nextLbl} on ${nextNote.stringName} · ${spot}`;
    }
    if (activeNote.pitch === nextNote.pitch) {
      return nextNote.kind === "open"
        ? `Stay on Open ${nextNote.stringName} String (repeat)`
        : `Keep ${nextLbl} pressed down · Same spot`;
    }
    if (activeNote.stringIdx !== nextNote.stringIdx) {
      return nextNote.kind === "open"
        ? `Cross ${activeNote.stringName}→${nextNote.stringName} · Lift to Open ${nextNote.stringName}`
        : `Cross ${activeNote.stringName}→${nextNote.stringName} · ${spot}`;
    }
    if (nextNote.kind === "open") {
      return `Lift finger → Open ${nextNote.stringName} String (0)`;
    }
    if (nextNote.fbY > activeNote.fbY) {
      return `Drop ${nextLbl} down · ${spot}`;
    }
    return `Lift to ${nextLbl} · ${spot}`;
  }

  // =========================================================================
  // 3. REAL ACOUSTIC SOLO VIOLIN & GRAND PIANO SAMPLER + RECITAL HALL REVERB
  //    Uses studio-recorded VSCO-2 Solo Violin Arco Vibrato & Acoustic Piano
  // =========================================================================
  const VIOLIN_SAMPLE_DEFS = [
    { name: "E4", midi: 64, url: "samples/violin/E4.mp3", gainNorm: 1.18, baseOffset: 0.002 },
    { name: "G4", midi: 67, url: "samples/violin/G4.mp3", gainNorm: 1.05, baseOffset: 0.002 },
    { name: "A4", midi: 69, url: "samples/violin/A4.mp3", gainNorm: 0.90, baseOffset: 0.016 },
    { name: "C5", midi: 72, url: "samples/violin/C5.mp3", gainNorm: 1.38, baseOffset: 0.002 },
    { name: "E5", midi: 76, url: "samples/violin/E5.mp3", gainNorm: 1.00, baseOffset: 0.002 },
  ];

  const PIANO_SAMPLE_DEFS = [
    { name: "As1", midi: 34, url: "samples/piano/As1.mp3" },
    { name: "D2",  midi: 38, url: "samples/piano/D2.mp3" },
    { name: "F2",  midi: 41, url: "samples/piano/F2.mp3" },
    { name: "G2",  midi: 43, url: "samples/piano/G2.mp3" },
    { name: "A2",  midi: 45, url: "samples/piano/A2.mp3" },
    { name: "As2", midi: 46, url: "samples/piano/As2.mp3" },
    { name: "C3",  midi: 48, url: "samples/piano/C3.mp3" },
    { name: "D3",  midi: 50, url: "samples/piano/D3.mp3" },
    { name: "Ds3", midi: 51, url: "samples/piano/Ds3.mp3" },
    { name: "F3",  midi: 53, url: "samples/piano/F3.mp3" },
    { name: "G3",  midi: 55, url: "samples/piano/G3.mp3" },
    { name: "A3",  midi: 57, url: "samples/piano/A3.mp3" },
    { name: "As3", midi: 58, url: "samples/piano/As3.mp3" },
    { name: "C4",  midi: 60, url: "samples/piano/C4.mp3" },
    { name: "D4",  midi: 62, url: "samples/piano/D4.mp3" },
    { name: "Ds4", midi: 63, url: "samples/piano/Ds4.mp3" },
    { name: "F4",  midi: 65, url: "samples/piano/F4.mp3" },
    { name: "G4",  midi: 67, url: "samples/piano/G4.mp3" },
    { name: "A4",  midi: 69, url: "samples/piano/A4.mp3" },
  ];

  // This song is an instrumental play-along: no sung vocal / choir banks are loaded.
  const CHOIR_SAMPLE_DEFS = [];
  const CODA_WORDS = new Set();
  function lyricToWordKey(lyric) {
    return lyric.toLowerCase().replace(/[^a-z]/g, "");
  }
  const VOCAL_SAMPLE_DEFS = [];

  let audioCtx = null;
  let dryBus = null;
  let reverbSendBus = null;
  let violinBus = null;
  let accompDryBus = null;
  let accompWetBus = null;
  let recordMixBus = null;
  let recordDest = null;
  let micRecGain = null;
  const rawSampleBytes = new Map();
  const decodedViolinBuffers = new Map();
  const decodedPianoBuffers = new Map();
  const decodedVocalBuffers = new Map();
  const decodedChoirBuffers = new Map();
  let samplesReady = false;
  let activeNodes = [];
  const scheduledKeys = new Set();

  // Pre-fetch raw audio bytes immediately on page load so playback starts instantaneously
  async function prefetchSampleFiles() {
    try {
      const allDefs = [
        ...VIOLIN_SAMPLE_DEFS,
        ...PIANO_SAMPLE_DEFS,
        ...VOCAL_SAMPLE_DEFS,
        ...CHOIR_SAMPLE_DEFS,
      ];
      const orchPrefetch = window.ChamberOrchestra ? window.ChamberOrchestra.prefetch() : Promise.resolve();
      await Promise.all([
        orchPrefetch,
        ...allDefs.map(async (def) => {
          const resp = await fetch(def.url);
          if (!resp.ok) throw new Error(`HTTP ${resp.status} for ${def.url}`);
          const buf = await resp.arrayBuffer();
          rawSampleBytes.set(def.url, buf);
        }),
      ]);
      if (dom.sampleStatus) {
        dom.sampleStatus.textContent = "🎻+🎼 Studio Orchestra Ready";
      }
      if (audioCtx) {
        await decodeSamplesIntoContext();
      }
    } catch (err) {
      console.warn("Acoustic sample fetch unavailable (falling back to synth):", err);
      if (dom.sampleStatus) {
        dom.sampleStatus.textContent = "Synth Violin Mode";
      }
    }
  }

  async function decodeSamplesIntoContext() {
    if (!audioCtx || samplesReady || rawSampleBytes.size === 0) return;
    try {
      for (const def of VIOLIN_SAMPLE_DEFS) {
        const raw = rawSampleBytes.get(def.url);
        if (raw && !decodedViolinBuffers.has(def.name)) {
          const audioBuf = await audioCtx.decodeAudioData(raw.slice(0));
          decodedViolinBuffers.set(def.name, { ...def, buffer: audioBuf });
        }
      }
      for (const def of PIANO_SAMPLE_DEFS) {
        const raw = rawSampleBytes.get(def.url);
        if (raw && !decodedPianoBuffers.has(def.name)) {
          const audioBuf = await audioCtx.decodeAudioData(raw.slice(0));
          decodedPianoBuffers.set(def.name, { ...def, buffer: audioBuf });
        }
      }
      for (const def of VOCAL_SAMPLE_DEFS) {
        const raw = rawSampleBytes.get(def.url);
        if (raw && !decodedVocalBuffers.has(def.name)) {
          const audioBuf = await audioCtx.decodeAudioData(raw.slice(0));
          decodedVocalBuffers.set(def.name, { ...def, buffer: audioBuf });
        }
      }
      for (const def of CHOIR_SAMPLE_DEFS) {
        const raw = rawSampleBytes.get(def.url);
        if (raw && !decodedChoirBuffers.has(def.name)) {
          const audioBuf = await audioCtx.decodeAudioData(raw.slice(0));
          decodedChoirBuffers.set(def.name, { ...def, buffer: audioBuf });
        }
      }
      samplesReady = decodedViolinBuffers.size > 0;
    } catch (e) {
      console.warn("Audio decode error:", e);
    }
  }

  function createWarmHallImpulse(ctx, seconds = 1.65, decay = 2.6) {
    const rate = ctx.sampleRate;
    const length = Math.floor(rate * seconds);
    const impulse = ctx.createBuffer(2, length, rate);
    for (let ch = 0; ch < 2; ch++) {
      const data = impulse.getChannelData(ch);
      let prev = 0;
      for (let i = 0; i < length; i++) {
        const t = i / length;
        const env = Math.pow(1 - t, decay);
        // Gentle low-passed wooden hall reflections
        const white = Math.random() * 2 - 1;
        prev = prev * 0.72 + white * 0.28;
        data[i] = prev * env;
      }
    }
    return impulse;
  }

  async function ensureAudio() {
    if (!audioCtx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AC();

      dryBus = audioCtx.createGain();
      dryBus.gain.value = 0.86;
      dryBus.connect(audioCtx.destination);

      // Warm recital hall convolution reverb
      const convolver = audioCtx.createConvolver();
      convolver.buffer = createWarmHallImpulse(audioCtx, 1.65, 2.7);
      reverbSendBus = audioCtx.createGain();
      reverbSendBus.gain.value = 0.24;
      reverbSendBus.connect(convolver);
      convolver.connect(audioCtx.destination);

      // Dedicated live-adjustable volume buses for Solo Violin vs Orchestra/Accompaniment
      violinBus = audioCtx.createGain();
      violinBus.gain.value = state.violinVolume;
      violinBus.connect(dryBus);
      violinBus.connect(reverbSendBus);

      accompDryBus = audioCtx.createGain();
      accompDryBus.gain.value = state.orchVolume;
      accompDryBus.connect(dryBus);

      accompWetBus = audioCtx.createGain();
      accompWetBus.gain.value = state.orchVolume;
      accompWetBus.connect(reverbSendBus);

      // Dedicated Recording Mix Bus (combines Orchestra/Piano + user's live mic without speaker feedback)
      if (audioCtx.createMediaStreamDestination) {
        recordDest = audioCtx.createMediaStreamDestination();
        recordMixBus = audioCtx.createDynamicsCompressor();
        recordMixBus.threshold.value = -14;
        recordMixBus.knee.value = 18;
        recordMixBus.ratio.value = 3;
        recordMixBus.attack.value = 0.006;
        recordMixBus.release.value = 0.15;
        recordMixBus.connect(recordDest);

        // Tap accompaniment + hall reverb (and guide violin if user keeps it on) into the recorder
        dryBus.connect(recordMixBus);
        convolver.connect(recordMixBus);

        // User's live microphone feeds ONLY the recorder & pitch analyser (never speakers!)
        micRecGain = audioCtx.createGain();
        micRecGain.gain.value = 1.25;
        micRecGain.connect(recordMixBus);
      }
    }
    if (audioCtx.state === "suspended") {
      await audioCtx.resume();
    }
    if (!samplesReady && rawSampleBytes.size > 0) {
      await decodeSamplesIntoContext();
    }
    if (window.ChamberOrchestra && !window.ChamberOrchestra.isReady()) {
      await window.ChamberOrchestra.ensureDecoded(audioCtx);
    }
  }

  function midiToFreq(midi) {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  function findClosestSample(sampleMap, targetMidi) {
    let best = null;
    let bestDist = Infinity;
    for (const entry of sampleMap.values()) {
      const dist = Math.abs(targetMidi - entry.midi);
      if (dist < bestDist) {
        bestDist = dist;
        best = entry;
      }
    }
    return best;
  }

  function stopAllScheduledAudio() {
    scheduledKeys.clear();
    const now = audioCtx ? audioCtx.currentTime : 0;
    for (const item of activeNodes) {
      try {
        item.gain.gain.cancelScheduledValues(now);
        item.gain.gain.setTargetAtTime(0.0001, now, 0.018);
        for (const src of item.sources) {
          src.stop(now + 0.08);
        }
      } catch (_) {}
    }
    activeNodes = [];
  }

  // =========================================================================
  // 3A. OPTIONAL BACKING TRACK SLOT
  //     Load any audio file; tell the app its tempo and when Bar 1 starts.
  //     It is time-stretched (playbackRate) to follow the chosen practice tempo
  //     and re-synced on every play / seek / tempo change.
  // =========================================================================
  const backing = { buffer: null, name: "", bpm: 72, bar1Sec: 0 };

  function scheduleBackingTrack(now) {
    if (!backing.buffer || !state.backingAudio || !audioCtx) return;
    const rate = Math.max(0.5, Math.min(2.0, state.bpm / backing.bpm));
    let when = state.anchorAudioTime;
    let trackPos = backing.bar1Sec + (state.anchorBeat - 1) * (60 / backing.bpm);
    if (trackPos < 0) {
      when += -trackPos / rate;
      trackPos = 0;
    }
    if (trackPos >= backing.buffer.duration) return;
    const src = audioCtx.createBufferSource();
    src.buffer = backing.buffer;
    src.playbackRate.setValueAtTime(rate, Math.max(now, when));
    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.9, Math.max(now, when));
    src.connect(gain);
    gain.connect(accompDryBus || dryBus);
    const startAt = Math.max(now, when);
    src.start(startAt, trackPos + Math.max(0, now - when) * rate);
    activeNodes.push({ sources: [src], gain, endTime: startAt + (backing.buffer.duration - trackPos) / rate + 0.1 });
  }

  // Built-in orchestra recording (generated with Flow Music, supplied by the user).
  // Measured: steady 74.0 BPM, 8-beat intro, Bar 1 downbeat at 7.31 s. Its harmony is a free
  // D-major arrangement; it does not follow the chord chart of the song bar by bar.
  const ORCHESTRA_TRACK = { url: "audio/orchestra-flow.mp3", bpm: 74, bar1Sec: 7.31, name: "Orchestra (Flow Music)" };
  let orchestraBuffer = null;
  let orchestraOn = false;
  let pianoBeforeOrchestra = true;
  let refreshBackingUI = () => {};

  async function setOrchestraTrack(on) {
    if (on) {
      if (!orchestraBuffer) {
        const resp = await fetch(ORCHESTRA_TRACK.url);
        if (!resp.ok) throw new Error("Orchestra track missing");
        const bytes = await resp.arrayBuffer();
        // Decode without needing a user gesture; AudioBuffers work in any context
        const OAC = window.OfflineAudioContext || window.webkitOfflineAudioContext;
        orchestraBuffer = await new OAC(2, 2, 48000).decodeAudioData(bytes);
      }
      backing.buffer = orchestraBuffer;
      backing.name = ORCHESTRA_TRACK.name;
      backing.bpm = ORCHESTRA_TRACK.bpm;
      backing.bar1Sec = ORCHESTRA_TRACK.bar1Sec;
      state.backingAudio = true;
      if (!orchestraOn) pianoBeforeOrchestra = state.chordAudio;
      state.chordAudio = false;
      state.orchestraAudio = false;
      if (dom.btnOrchestraAudio) dom.btnOrchestraAudio.classList.remove("active");
      orchestraOn = true;
      setTempo(ORCHESTRA_TRACK.bpm); // original speed = original pitch
    } else {
      if (orchestraOn) {
        backing.buffer = null;
        backing.name = "";
        state.chordAudio = pianoBeforeOrchestra;
      }
      orchestraOn = false;
    }
    dom.btnChordAudio.classList.toggle("active", state.chordAudio);
    refreshBackingUI();
    if (state.isPlaying) seekToBeat(state.currentBeat, true);
    return orchestraOn;
  }

  async function loadBackingFile(file) {
    await ensureAudio();
    const bytes = await file.arrayBuffer();
    backing.buffer = await audioCtx.decodeAudioData(bytes);
    backing.name = file.name;
    orchestraOn = false;
    return backing.buffer.duration;
  }

  function scheduleViolinNote(note, when, durSec) {
    if (!state.violinAudio || !audioCtx) return;

    const sampleEntry = samplesReady ? findClosestSample(decodedViolinBuffers, note.midi) : null;
    if (sampleEntry) {
      const src = audioCtx.createBufferSource();
      src.buffer = sampleEntry.buffer;
      const semitoneDiff = note.midi - sampleEntry.midi;
      src.playbackRate.setValueAtTime(Math.pow(2, semitoneDiff / 12), when);

      // Warm body tone shaping so pitch-shifted notes stay silky
      const toneFilter = audioCtx.createBiquadFilter();
      toneFilter.type = "lowpass";
      toneFilter.frequency.setValueAtTime(note.durBeats < 0.4 ? 3600 : 4800, when);

      const env = audioCtx.createGain();
      // Gently tuck solo violin slightly when singing in duet with the child voice
      const duetScale = state.vocalAudio ? 0.76 : 1.0;
      const peakGain = 0.78 * sampleEntry.gainNorm * duetScale;
      const isShort = durSec < 0.36;
      // For quick 16th/8th notes, start slightly into the bow stroke so articulation is crisp
      const sampleOffset = sampleEntry.baseOffset + (isShort ? 0.045 : 0.0);
      const attack = isShort ? Math.min(0.022, durSec * 0.22) : Math.min(0.065, durSec * 0.22);
      const release = isShort ? 0.055 : 0.11;
      const sustainStart = when + attack;
      const releaseStart = Math.max(sustainStart + 0.005, when + durSec - release * 0.35);

      env.gain.setValueAtTime(0.0001, when);
      env.gain.linearRampToValueAtTime(peakGain, sustainStart);
      env.gain.setValueAtTime(peakGain * 0.94, releaseStart);
      env.gain.exponentialRampToValueAtTime(0.0001, when + durSec + release);

      src.connect(toneFilter);
      if (audioCtx.createStereoPanner && state.vocalAudio) {
        const vPan = audioCtx.createStereoPanner();
        vPan.pan.value = 0.14;
        toneFilter.connect(vPan);
        vPan.connect(env);
      } else {
        toneFilter.connect(env);
      }
      env.connect(violinBus || dryBus);

      src.start(when, sampleOffset);
      src.stop(when + durSec + release + 0.03);
      activeNodes.push({ sources: [src], gain: env, endTime: when + durSec + release + 0.04 });
      return;
    }

    // Graceful synth fallback if samples haven't loaded
    const freq = midiToFreq(note.midi);
    const osc = audioCtx.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(freq, when);
    const lp = audioCtx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.setValueAtTime(2200, when);
    const env = audioCtx.createGain();
    env.gain.setValueAtTime(0.0001, when);
    env.gain.linearRampToValueAtTime(0.28, when + 0.05);
    env.gain.exponentialRampToValueAtTime(0.0001, when + durSec + 0.04);
    osc.connect(lp);
    lp.connect(env);
    env.connect(violinBus || dryBus);
    osc.start(when);
    osc.stop(when + durSec + 0.05);
    activeNodes.push({ sources: [osc], gain: env, endTime: when + durSec + 0.06 });
  }

  function scheduleChildVocal(note, when, durSec) {
    if (!state.vocalAudio || !audioCtx || !samplesReady) return;
    const wordKey = lyricToWordKey(note.lyric);
    const stemKey = `${wordKey}_${note.midi}`;
    const stemEntry = decodedVocalBuffers.get(stemKey);
    if (!stemEntry) return;

    const sources = [];
    const vocalBus = audioCtx.createGain();
    vocalBus.gain.setValueAtTime(1.0, when);

    // Studio Condenser Microphone Vocal Tone Chain (clean low-cut + sweet lyric presence + silky air)
    const hp = audioCtx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.setValueAtTime(165, when);

    const presence = audioCtx.createBiquadFilter();
    presence.type = "peaking";
    presence.frequency.setValueAtTime(2450, when);
    presence.Q.value = 0.85;
    presence.gain.setValueAtTime(2.2, when);

    const silkLp = audioCtx.createBiquadFilter();
    silkLp.type = "lowpass";
    silkLp.frequency.setValueAtTime(7400, when);
    silkLp.Q.value = 0.55;

    vocalBus.connect(hp);
    hp.connect(presence);
    presence.connect(silkLp);

    if (audioCtx.createStereoPanner) {
      const pan = audioCtx.createStereoPanner();
      pan.pan.value = state.violinAudio ? -0.06 : 0.0;
      silkLp.connect(pan);
      pan.connect(dryBus);
      pan.connect(reverbSendBus);
    } else {
      silkLp.connect(dryBus);
      silkLp.connect(reverbSendBus);
    }

    // Dynamic phrasing: fuller on long high notes, lighter on quick notes
    const soloBoost = state.violinAudio ? 1.0 : 1.15;
    const phraseWeight =
      note.durBeats >= 2.0 && note.midi >= 72
        ? 1.08
        : note.durBeats <= 0.3
        ? 0.86
        : 0.98;
    const peakGain = 0.88 * soloBoost * phraseWeight;

    // 1. Pitch-exact Child Singing Stem (initial consonant + sustained vowel)
    const stemSrc = audioCtx.createBufferSource();
    stemSrc.buffer = stemEntry.buffer;
    stemSrc.playbackRate.setValueAtTime(1.0, when);

    const stemEnv = audioCtx.createGain();
    const isVeryShort = durSec < 0.28;
    const hasCoda = CODA_WORDS.has(wordKey) && decodedVocalBuffers.has(`${stemKey}_end`) && !isVeryShort;
    const release = isVeryShort ? 0.045 : 0.085;
    const vowelHoldEnd = hasCoda
      ? Math.max(when + 0.09, when + durSec - 0.075)
      : Math.max(when + 0.03, when + durSec - release * 0.35);

    stemEnv.gain.setValueAtTime(0.0001, when);
    stemEnv.gain.linearRampToValueAtTime(peakGain, when + 0.007);
    stemEnv.gain.setValueAtTime(peakGain * 0.95, vowelHoldEnd);
    stemEnv.gain.exponentialRampToValueAtTime(0.0001, vowelHoldEnd + release);

    stemSrc.connect(stemEnv);
    stemEnv.connect(vocalBus);
    stemSrc.start(when, 0);
    const stemStop = vowelHoldEnd + release + 0.03;
    stemSrc.stop(stemStop);
    sources.push(stemSrc);
    let maxEndTime = stemStop;

    // 2. Tempo-Adaptive Closing Consonant Coda (-d, -ngz, -z, -n, -vd, -r, -zd) right at note end
    if (hasCoda) {
      const codaEntry = decodedVocalBuffers.get(`${stemKey}_end`);
      const codaSrc = audioCtx.createBufferSource();
      codaSrc.buffer = codaEntry.buffer;
      codaSrc.playbackRate.setValueAtTime(1.0, vowelHoldEnd - 0.015);

      const codaEnv = audioCtx.createGain();
      const codaWhen = Math.max(when + 0.08, vowelHoldEnd - 0.018);
      const codaDur = Math.min(codaEntry.buffer.duration, 0.28);
      codaEnv.gain.setValueAtTime(0.0001, codaWhen);
      codaEnv.gain.linearRampToValueAtTime(peakGain * 0.92, codaWhen + 0.018);
      codaEnv.gain.setValueAtTime(peakGain * 0.85, codaWhen + Math.max(0.03, codaDur - 0.05));
      codaEnv.gain.exponentialRampToValueAtTime(0.0001, codaWhen + codaDur + 0.02);

      codaSrc.connect(codaEnv);
      codaEnv.connect(vocalBus);
      codaSrc.start(codaWhen, 0);
      codaSrc.stop(codaWhen + codaDur + 0.03);
      sources.push(codaSrc);
      maxEndTime = Math.max(maxEndTime, codaWhen + codaDur + 0.04);
    }

    // 3. Subtle Angelic Child Choir "Ooh" Air Layer on sustained notes (>= 1 beat)
    if (note.durBeats >= 1.0 && decodedChoirBuffers.has(note.pitch)) {
      const choirEntry = decodedChoirBuffers.get(note.pitch);
      const choirSrc = audioCtx.createBufferSource();
      choirSrc.buffer = choirEntry.buffer;
      choirSrc.playbackRate.setValueAtTime(1.0, when);

      const choirEnv = audioCtx.createGain();
      const airGain = 0.115 * soloBoost * phraseWeight;
      choirEnv.gain.setValueAtTime(0.0001, when);
      choirEnv.gain.linearRampToValueAtTime(airGain, when + Math.min(0.14, durSec * 0.35));
      choirEnv.gain.setValueAtTime(airGain * 0.9, Math.max(when + 0.15, when + durSec - 0.06));
      choirEnv.gain.exponentialRampToValueAtTime(0.0001, when + durSec + 0.12);

      choirSrc.connect(choirEnv);
      choirEnv.connect(vocalBus);
      choirSrc.start(when, 0.02);
      choirSrc.stop(when + durSec + 0.14);
      sources.push(choirSrc);
      maxEndTime = Math.max(maxEndTime, when + durSec + 0.15);
    }

    activeNodes.push({ sources, gain: vocalBus, endTime: maxEndTime + 0.02 });
  }

  function schedulePianoEvent(evt, when, secPerBeat) {
    if (!state.chordAudio || !audioCtx) return;
    const [startBeat, holdUntilBeat, midis, vel, rollMs] = evt;
    // Skip count-in intro chords when count-in is disabled
    if (startBeat < 0 && !state.countInEnabled) return;

    const durSec = Math.max(0.25, (holdUntilBeat - startBeat) * secPerBeat);
    // Boost piano presence slightly when both solo violin and child vocals are muted (pure piano backing mode)
    const backingBoost = (!state.violinAudio && !state.vocalAudio) ? 1.22 : 1.0;

    if (samplesReady && decodedPianoBuffers.size > 0) {
      const env = audioCtx.createGain();
      // Damper-pedal envelope: rings naturally and releases softly at pedal change
      const pedalRelease = 0.22;
      env.gain.setValueAtTime(1.0, when);
      env.gain.setValueAtTime(0.92, when + Math.max(0.05, durSec - 0.04));
      env.gain.exponentialRampToValueAtTime(0.0001, when + durSec + pedalRelease);

      // Velocity-sensitive warm hammer felt filter (soft notes are mellower, climax chords brighter)
      const feltFilter = audioCtx.createBiquadFilter();
      feltFilter.type = "lowpass";
      feltFilter.frequency.setValueAtTime(1350 + vel * 4600, when);
      feltFilter.Q.value = 0.55;

      feltFilter.connect(env);
      env.connect(accompDryBus || dryBus);
      env.connect(accompWetBus || reverbSendBus);

      const sources = [];
      const sorted = [...midis].sort((a, b) => a - b);
      sorted.forEach((m, idx) => {
        const sample = findClosestSample(decodedPianoBuffers, m);
        if (!sample) return;
        const src = audioCtx.createBufferSource();
        src.buffer = sample.buffer;
        src.playbackRate.setValueAtTime(Math.pow(2, (m - sample.midi) / 12), when);

        // Voice balance: anchor deep bass & gently bring out top melody/bell voice
        const isBass = m <= 46;
        const isTopVoice = idx === sorted.length - 1 && sorted.length > 1;
        const voiceWeight = isBass ? 0.92 : isTopVoice ? 1.08 : 0.78;
        const noteGain = audioCtx.createGain();
        noteGain.gain.value = 0.44 * vel * voiceWeight * backingBoost;

        // Concert Grand stereo lid perspective (low bass slightly left, upper register slightly right)
        if (audioCtx.createStereoPanner) {
          const pan = audioCtx.createStereoPanner();
          pan.pan.value = Math.max(-0.35, Math.min(0.35, ((m - 52) / 24) * 0.28));
          src.connect(noteGain);
          noteGain.connect(pan);
          pan.connect(feltFilter);
        } else {
          src.connect(noteGain);
          noteGain.connect(feltFilter);
        }

        const rollDelay = sorted.length > 1 ? (idx * (rollMs / 1000)) / Math.max(1, sorted.length - 1) : 0;
        const noteWhen = when + rollDelay;
        src.start(noteWhen, 0.002);
        src.stop(when + durSec + pedalRelease + 0.04);
        sources.push(src);
      });

      activeNodes.push({ sources, gain: env, endTime: when + durSec + pedalRelease + 0.06 });
      return;
    }

    // Fallback warm electric/acoustic synth piano if offline without samples
    const env = audioCtx.createGain();
    env.gain.setValueAtTime(0.0001, when);
    env.gain.linearRampToValueAtTime(0.18 * vel * backingBoost, when + 0.015);
    env.gain.exponentialRampToValueAtTime(0.0001, when + durSec + 0.12);
    env.connect(accompDryBus || dryBus);
    const sources = midis.map((m) => {
      const osc = audioCtx.createOscillator();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(midiToFreq(m), when);
      osc.connect(env);
      osc.start(when);
      osc.stop(when + durSec + 0.14);
      return osc;
    });
    activeNodes.push({ sources, gain: env, endTime: when + durSec + 0.16 });
  }

  function scheduleClick(when, isDownbeat, isCountIn) {
    if ((!state.clickAudio && !isCountIn) || !audioCtx) return;
    const osc = audioCtx.createOscillator();
    const env = audioCtx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(isDownbeat ? 1120 : 820, when);
    env.gain.setValueAtTime(0.0001, when);
    env.gain.linearRampToValueAtTime(isDownbeat ? 0.20 : 0.12, when + 0.003);
    env.gain.exponentialRampToValueAtTime(0.0001, when + 0.05);
    osc.connect(env);
    env.connect(audioCtx.destination);
    osc.start(when);
    osc.stop(when + 0.06);
    activeNodes.push({ sources: [osc], gain: env, endTime: when + 0.07 });
  }

  function pumpAudioScheduler() {
    if (!state.isPlaying || !audioCtx) return;
    const now = audioCtx.currentTime;
    activeNodes = activeNodes.filter((n) => n.endTime > now);

    const secPerBeat = 60.0 / state.bpm;
    const lookaheadBeats = 0.85 / secPerBeat;
    const windowStart = state.currentBeat - 0.02;
    const windowEnd = state.currentBeat + lookaheadBeats;

    // 1. Real Acoustic Solo Violin & Child Singing Voice melody notes
    for (const note of NOTES) {
      if (note.startBeat >= windowStart && note.startBeat <= windowEnd) {
        const key = `n_${note.idx}`;
        if (!scheduledKeys.has(key)) {
          scheduledKeys.add(key);
          const when = Math.max(now, state.anchorAudioTime + (note.startBeat - state.anchorBeat) * secPerBeat);
          const durSec = Math.max(0.11, note.durBeats * secPerBeat * 0.97);
          scheduleViolinNote(note, when, durSec);
          scheduleChildVocal(note, when, durSec);
        }
      }
    }

    // 2A. Real-Time Chamber Orchestra Accompaniment (A Major, 100% tempo-locked)
    if (state.orchestraAudio && window.ChamberOrchestra && window.ChamberOrchestra.isReady()) {
      const oEvents = ORCHESTRA_EVENTS;
      for (let i = 0; i < oEvents.length; i++) {
        const evt = oEvents[i];
        if (evt.beat < (CURRENT_SONG && CURRENT_SONG.hasPickup ? 0 : 1) && !state.countInEnabled) continue;
        if (evt.beat >= windowStart && evt.beat <= windowEnd) {
          const key = `o_${i}`;
          if (!scheduledKeys.has(key)) {
            scheduledKeys.add(key);
            const when = Math.max(now, state.anchorAudioTime + (evt.beat - state.anchorBeat) * secPerBeat);
            window.ChamberOrchestra.scheduleEvent(
              evt, when, secPerBeat, audioCtx, accompDryBus || dryBus, accompWetBus || reverbSendBus, activeNodes, !state.violinAudio
            );
          }
        }
      }
    }

    // 2B. Expressive Two-Handed Concert Grand Piano Accompaniment
    if (backing.buffer && state.backingAudio && !scheduledKeys.has("bt")) {
      scheduledKeys.add("bt");
      scheduleBackingTrack(now);
    }
    for (let i = 0; i < PIANO_EVENTS.length; i++) {
      const evt = PIANO_EVENTS[i];
      const evtBeat = evt[0];
      if (evtBeat >= windowStart && evtBeat <= windowEnd) {
        const key = `p_${i}`;
        if (!scheduledKeys.has(key)) {
          scheduledKeys.add(key);
          const when = Math.max(now, state.anchorAudioTime + (evtBeat - state.anchorBeat) * secPerBeat);
          schedulePianoEvent(evt, when, secPerBeat);
        }
      }
    }

    // 3. Metronome & Count-in Clicks
    const minIntBeat = Math.ceil(windowStart);
    const maxIntBeat = Math.floor(windowEnd);
    for (let b = minIntBeat; b <= maxIntBeat; b++) {
      if (b < getStartMinBeat() || b >= TOTAL_BEATS) continue;
      const key = `k_${b}`;
      if (!scheduledKeys.has(key)) {
        scheduledKeys.add(key);
        const when = Math.max(now, state.anchorAudioTime + (b - state.anchorBeat) * secPerBeat);
        const isCountIn = b < 0;
        const isDownbeat = b === -3 || (b >= 1 && (b - 1) % 4 === 0);
        scheduleClick(when, isDownbeat, isCountIn);
      }
    }
  }

  // =========================================================================
  // 3B. LIVE VIOLIN PITCH DETECTION & NOTE MATCHING (★ Perfect / ≈ Almost / ✕ Miss)
  // =========================================================================
  const NOTE_NAMES_SHARP = ["C", "C♯", "D", "E♭", "E", "F", "F♯", "G", "G♯", "A", "B♭", "B"];
  let micStream = null;
  let micAnalyser = null;
  let micTimeBuf = null;
  let livePitchInfo = { active: false, freqHz: 0, midiFloat: 0, centsOff: 0, noteName: "" };

  // Per-note evaluation state for every melody note
  // status: null | "perfect" | "almost" | "miss", score: 0..100 based on exact pitch/timing closeness
  let noteEvaluations = [];
  function rebuildNoteEvaluations() {
    noteEvaluations = NOTES.map(() => ({
      status: null, // "perfect" | "almost" | "miss"
      score: 0,     // 0..100 precision closeness score
      bestAbsCents: Infinity,
      perfectFrames: 0,
      almostFrames: 0,
      centsSum: 0,
      voicedFrames: 0,
      hint: "",
    }));
  }

  // Continuous 0..100 closeness score based on exact cent deviation from target note
  function centsToClosenessScore(absCents) {
    if (!Number.isFinite(absCents) || absCents >= 220) return 0;
    if (absCents <= 12) {
      return Math.round(100 - (absCents / 12) * 3); // 97..100 pts
    }
    if (absCents <= 42) {
      return Math.round(97 - ((absCents - 12) / 30) * 15); // 82..97 pts (Perfect zone)
    }
    if (absCents <= 150) {
      return Math.round(82 - ((absCents - 42) / 108) * 57); // 25..82 pts (Almost zone)
    }
    return Math.max(0, Math.round(25 - ((absCents - 150) / 70) * 25)); // 0..25 pts
  }

  const highwayPopups = [];
  const highwayParticles = [];
  let sheetRatingTexts = [];

  async function enableMicMatching() {
    if (micStream && micAnalyser) return true;
    try {
      await ensureAudio();
      micStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
      });
      const src = audioCtx.createMediaStreamSource(micStream);
      micAnalyser = audioCtx.createAnalyser();
      micAnalyser.fftSize = 2048;
      src.connect(micAnalyser);
      if (micRecGain) src.connect(micRecGain);
      micTimeBuf = new Float32Array(micAnalyser.fftSize);
      if (dom.micDot) dom.micDot.classList.add("listening");
      if (dom.micPitchReadout) dom.micPitchReadout.textContent = "🎙 Mic Listening — Play Violin!";
      return true;
    } catch (err) {
      console.warn("Microphone access unavailable:", err);
      if (dom.micPitchReadout) {
        dom.micPitchReadout.textContent = "🎙 Mic Blocked (Press 1/2/3 to test)";
      }
      return false;
    }
  }

  // Normalized Square Difference Function (McLeod Pitch Method) for accurate violin F0
  function detectViolinPitch(buf, sr) {
    const n = buf.length;
    let rmsSq = 0;
    for (let i = 0; i < n; i++) rmsSq += buf[i] * buf[i];
    const rms = Math.sqrt(rmsSq / n);
    if (rms < 0.008) return null; // Silence gate

    // Violin fundamental range: G3 (190 Hz) .. B5 (990 Hz)
    const minLag = Math.max(20, Math.floor(sr / 990));
    const maxLag = Math.min(Math.floor(n / 2) - 2, Math.ceil(sr / 185));
    const win = Math.min(900, Math.floor(n / 2));

    const nsdf = new Float32Array(maxLag + 2);
    for (let lag = minLag; lag <= maxLag + 1; lag++) {
      let acf = 0;
      let m = 0;
      for (let i = 0; i < win; i++) {
        const a = buf[i];
        const b = buf[i + lag];
        acf += a * b;
        m += a * a + b * b;
      }
      nsdf[lag] = m > 1e-8 ? (2 * acf) / m : 0;
    }

    // Find highest peak after initial positive-going zero crossing
    let globalMax = 0;
    const peaks = [];
    for (let lag = minLag + 1; lag <= maxLag; lag++) {
      if (nsdf[lag] > 0.45 && nsdf[lag] > nsdf[lag - 1] && nsdf[lag] >= nsdf[lag + 1]) {
        peaks.push(lag);
        if (nsdf[lag] > globalMax) globalMax = nsdf[lag];
      }
    }
    if (peaks.length === 0 || globalMax < 0.58) return null;

    // Pick first strong peak (>= 84% of globalMax) so harmonics never cause octave leaps
    const thresh = globalMax * 0.84;
    let chosenLag = peaks[0];
    for (const pLag of peaks) {
      if (nsdf[pLag] >= thresh) {
        chosenLag = pLag;
        break;
      }
    }

    // Parabolic interpolation for sub-sample precision
    const y1 = nsdf[chosenLag - 1];
    const y2 = nsdf[chosenLag];
    const y3 = nsdf[chosenLag + 1];
    const denom = y1 - 2 * y2 + y3;
    const delta = Math.abs(denom) > 1e-7 ? (0.5 * (y1 - y3)) / denom : 0;
    const refinedLag = chosenLag + Math.max(-0.5, Math.min(0.5, delta));

    const freqHz = sr / refinedLag;
    const midiFloat = 69 + 12 * Math.log2(freqHz / 440.0);
    const nearestMidi = Math.round(midiFloat);
    const noteName = `${NOTE_NAMES_SHARP[((nearestMidi % 12) + 12) % 12]}${Math.floor(nearestMidi / 12) - 1}`;
    return { freqHz, midiFloat, nearestMidi, noteName, clarity: y2, rms };
  }

  function resetAllNoteEvaluations() {
    for (let i = 0; i < noteEvaluations.length; i++) {
      noteEvaluations[i].status = null;
      noteEvaluations[i].score = 0;
      noteEvaluations[i].bestAbsCents = Infinity;
      noteEvaluations[i].perfectFrames = 0;
      noteEvaluations[i].almostFrames = 0;
      noteEvaluations[i].centsSum = 0;
      noteEvaluations[i].voicedFrames = 0;
      noteEvaluations[i].hint = "";
      if (sheetRatingTexts[i]) {
        sheetRatingTexts[i].textContent = "";
        sheetRatingTexts[i].setAttribute("class", "sheet-rating");
      }
    }
    highwayPopups.length = 0;
    highwayParticles.length = 0;
    updateScoreCountersUI();
  }

  function clearNoteEvaluationsFromBeat(fromBeat) {
    for (let i = 0; i < NOTES.length; i++) {
      if (NOTES[i].startBeat >= fromBeat - 0.05) {
        noteEvaluations[i].status = null;
        noteEvaluations[i].score = 0;
        noteEvaluations[i].bestAbsCents = Infinity;
        noteEvaluations[i].perfectFrames = 0;
        noteEvaluations[i].almostFrames = 0;
        noteEvaluations[i].centsSum = 0;
        noteEvaluations[i].voicedFrames = 0;
        noteEvaluations[i].hint = "";
        if (sheetRatingTexts[i]) {
          sheetRatingTexts[i].textContent = "";
          sheetRatingTexts[i].setAttribute("class", "sheet-rating");
        }
      }
    }
    updateScoreCountersUI();
  }

  function updateScoreCountersUI() {
    let perf = 0;
    let almost = 0;
    let miss = 0;
    let totalPoints = 0;
    let gradedCount = 0;
    for (const ev of noteEvaluations) {
      if (ev.status !== null) {
        gradedCount++;
        totalPoints += ev.score;
      }
      if (ev.status === "perfect") perf++;
      else if (ev.status === "almost") almost++;
      else if (ev.status === "miss") miss++;
    }
    const maxPoints = NOTES.length * 100; // 5,000
    const avgClosenessPct = gradedCount > 0 ? Math.round(totalPoints / gradedCount) : 100;

    if (dom.totalScoreVal) dom.totalScoreVal.textContent = totalPoints.toLocaleString();
    if (dom.totalAccVal) dom.totalAccVal.textContent = `(${avgClosenessPct}%)`;
    if (dom.cntPerfect) dom.cntPerfect.textContent = String(perf);
    if (dom.cntAlmost) dom.cntAlmost.textContent = String(almost);
    if (dom.cntMiss) dom.cntMiss.textContent = String(miss);
    if (dom.finalTotalHeadline) {
      dom.finalTotalHeadline.innerHTML = `
        Total Score: <strong>${totalPoints.toLocaleString()} / ${maxPoints.toLocaleString()}</strong> · <span>${avgClosenessPct}% Closeness</span>
      `;
    }
    if (dom.finalScoreSummary) {
      dom.finalScoreSummary.innerHTML = `
        <span class="fs-item fs-perf">★ ${perf} Perfect</span>
        <span class="fs-item fs-almost">≈ ${almost} Almost</span>
        <span class="fs-item fs-miss">✕ ${miss} Miss</span>
      `;
    }
  }

  function applySheetRatingBadge(noteIdx, status) {
    const el = sheetRatingTexts[noteIdx];
    if (!el) return;
    if (status === "perfect") {
      el.textContent = "★";
      el.setAttribute("class", "sheet-rating perf");
    } else if (status === "almost") {
      el.textContent = "≈";
      el.setAttribute("class", "sheet-rating almost");
    } else if (status === "miss") {
      el.textContent = "✕";
      el.setAttribute("class", "sheet-rating miss");
    } else {
      el.textContent = "";
      el.setAttribute("class", "sheet-rating");
    }
  }

  function triggerJudgmentBanner(note, status, subHint = "", customScore = null) {
    if (!note) return;
    const ev = noteEvaluations[note.idx];
    const defaultScore = status === "perfect" ? 96 : status === "almost" ? 64 : 0;
    const computedScore =
      customScore !== null
        ? Math.max(0, Math.min(100, Math.round(customScore)))
        : Number.isFinite(ev.bestAbsCents)
        ? centsToClosenessScore(ev.bestAbsCents)
        : defaultScore;

    // Allow upgrading score if user locks closer in tune while holding the note
    ev.score = ev.status ? Math.max(ev.score, computedScore) : computedScore;

    // Allow upgrading "almost" -> "perfect", but don't duplicate same popup
    if (ev.status === status && highwayPopups.some((p) => p.noteIdx === note.idx && p.status === status)) {
      highwayPopups.forEach((p) => {
        if (p.noteIdx === note.idx) p.score = ev.score;
      });
      updateScoreCountersUI();
      return;
    }
    ev.status = status;
    ev.hint = subHint;
    window.dispatchEvent(new CustomEvent("playalong-judgment", { detail: { status, score: ev.score, noteIdx: note.idx } }));
    applySheetRatingBadge(note.idx, status);
    updateScoreCountersUI();

    // Remove older popup for same note if upgrading from almost -> perfect
    for (let i = highwayPopups.length - 1; i >= 0; i--) {
      if (highwayPopups[i].noteIdx === note.idx) highwayPopups.splice(i, 1);
    }

    highwayPopups.push({
      noteIdx: note.idx,
      stringIdx: note.stringIdx,
      status, // "perfect" | "almost" | "miss"
      score: ev.score,
      subHint,
      life: 1.0,
      dy: 0,
    });

    // Spawn celebratory particles on TAB highway + cute animal companion
    if (status === "perfect") {
      for (let k = 0; k < 9; k++) {
        const ang = -Math.PI * 0.15 - Math.random() * Math.PI * 0.7;
        const spd = 1.6 + Math.random() * 2.2;
        highwayParticles.push({
          stringIdx: note.stringIdx,
          ox: (Math.random() - 0.5) * 26,
          oy: -8,
          vx: Math.cos(ang) * spd,
          vy: Math.sin(ang) * spd - 0.8,
          life: 1.0,
          kind: "star",
          color: k % 2 === 0 ? "#fbbf24" : "#fef08a",
        });
      }
      noteParticles.push({
        x: 74 + (Math.random() - 0.5) * 32,
        y: 32,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -0.85,
        life: 1.0,
        glyph: "★",
        color: "#fbbf24",
      });
    } else if (status === "almost") {
      for (let k = 0; k < 5; k++) {
        highwayParticles.push({
          stringIdx: note.stringIdx,
          ox: (Math.random() - 0.5) * 22,
          oy: -6,
          vx: (Math.random() - 0.5) * 2.0,
          vy: -1.4 - Math.random() * 1.4,
          life: 0.9,
          kind: "spark",
          color: "#38bdf8",
        });
      }
    }
  }

  function updateNoteMatching(beat) {
    if (!state.micMatchEnabled) {
      livePitchInfo.active = false;
      return;
    }

    const ctxInfo = findNoteContext(beat);
    const activeNote = ctxInfo.activeNote;

    // 1. Sample live microphone pitch if available
    let detected = null;
    if (micAnalyser && micTimeBuf && audioCtx) {
      micAnalyser.getFloatTimeDomainData(micTimeBuf);
      detected = detectViolinPitch(micTimeBuf, audioCtx.sampleRate);
    }

    if (detected) {
      livePitchInfo.active = true;
      livePitchInfo.freqHz = detected.freqHz;
      livePitchInfo.midiFloat = detected.midiFloat;
      livePitchInfo.noteName = detected.noteName;
      livePitchInfo.centsOff = activeNote ? Math.round((detected.midiFloat - activeNote.midi) * 100) : 0;

      if (dom.micDot) {
        dom.micDot.classList.add("singing");
      }
      if (dom.micPitchReadout) {
        if (activeNote) {
          const c = livePitchInfo.centsOff;
          const sign = c > 0 ? `+${c}¢` : `${c}¢`;
          const tag = Math.abs(c) <= 40 ? "★ Perfect!" : Math.abs(c) <= 145 ? "≈ Almost" : "Off Pitch";
          dom.micPitchReadout.textContent = `🎤 ${detected.noteName} (${sign}) · ${tag}`;
        } else {
          dom.micPitchReadout.textContent = `🎤 ${detected.noteName} (${Math.round(detected.freqHz)} Hz)`;
        }
      }
    } else {
      livePitchInfo.active = false;
      if (dom.micDot) {
        dom.micDot.classList.remove("singing");
      }
      if (micStream && dom.micPitchReadout && state.isPlaying) {
        dom.micPitchReadout.textContent = activeNote
          ? `🎙 Play ${activeNote.noteLabel} (${fingerLabelFor(activeNote)} on ${activeNote.stringName})…`
          : "🎙 Mic Listening…";
      }
    }

    if (!state.isPlaying) return;

    // 2. Evaluate active note from live pitch frames (calculating exact cent closeness score 0..100)
    if (activeNote && detected) {
      const ev = noteEvaluations[activeNote.idx];
      const absCents = Math.abs((detected.midiFloat - activeNote.midi) * 100);
      const signedCents = (detected.midiFloat - activeNote.midi) * 100;
      ev.voicedFrames++;
      ev.centsSum += signedCents;
      if (absCents < ev.bestAbsCents) {
        ev.bestAbsCents = absCents;
      }
      const frameScore = centsToClosenessScore(ev.bestAbsCents);

      if (absCents <= 42) {
        ev.perfectFrames++;
        if (ev.perfectFrames >= 3) {
          const cHint = `${Math.round(ev.bestAbsCents)}¢ off · ${frameScore}% match`;
          triggerJudgmentBanner(activeNote, "perfect", cHint, frameScore);
        }
      } else if (absCents <= 150) {
        ev.almostFrames++;
        if (ev.almostFrames >= 3 && ev.status !== "perfect") {
          const dirHint =
            signedCents < 0
              ? `↑ ${Math.round(absCents)}¢ Low ♭ (${frameScore} pts)`
              : `↓ ${Math.round(absCents)}¢ High ♯ (${frameScore} pts)`;
          triggerJudgmentBanner(activeNote, "almost", dirHint, frameScore);
        }
      }
    }

    // 3. Finalize any passed notes that haven't been graded yet -> ✕ MISS (or Almost/Perfect if brief)
    if (beat >= 0) {
      for (let i = 0; i < NOTES.length; i++) {
        const n = NOTES[i];
        if (beat >= n.endBeat && noteEvaluations[i].status === null) {
          const ev = noteEvaluations[i];
          const finalScore = centsToClosenessScore(ev.bestAbsCents);
          if (ev.perfectFrames >= 1) {
            triggerJudgmentBanner(n, "perfect", `${Math.round(ev.bestAbsCents)}¢ · ${finalScore}%`, finalScore);
          } else if (ev.almostFrames >= 1) {
            const avgC = ev.centsSum / Math.max(1, ev.voicedFrames);
            triggerJudgmentBanner(n, "almost", avgC < 0 ? "↑ Little Low ♭" : "↓ Little High ♯", finalScore);
          } else {
            triggerJudgmentBanner(n, "miss", "Missed (0 pts)", 0);
          }
        }
      }
    }
  }

  // =========================================================================
  // 4. LEFT MUSIC SHEET OVERLAY (MuseScore.com Measure Highlight & Blue Cursor)
  // =========================================================================
  const svgNS = "http://www.w3.org/2000/svg";
  let sheetFingerTexts = [];

  function buildSheetInteractiveOverlay() {
    dom.measureBoxesLayer.innerHTML = "";
    dom.noteHitTargets.innerHTML = "";
    dom.sheetFingeringsLayer.innerHTML = "";
    if (dom.noteRatingsLayer) dom.noteRatingsLayer.innerHTML = "";
    sheetFingerTexts = [];
    sheetRatingTexts = [];

    // 1. MuseScore.com Hoverable & Clickable Measure Boxes
    for (const m of MEASURES) {
      const midY = systemMidSvgY(m.sys);
      const mRect = document.createElementNS(svgNS, "rect");
      mRect.setAttribute("x", m.xStart.toFixed(1));
      mRect.setAttribute("y", (midY - 15.5).toFixed(1));
      mRect.setAttribute("width", (m.xEnd - m.xStart).toFixed(1));
      mRect.setAttribute("height", "31.0");
      mRect.setAttribute("rx", "2");
      mRect.setAttribute("class", "ms-measure-hover");
      mRect.innerHTML = `<title>${m.label} — Click to jump</title>`;
      mRect.addEventListener("click", () => {
        seekToBeat(m.startBeat, true);
      });
      dom.measureBoxesLayer.appendChild(mRect);
    }

    // 2. Clickable Note Targets + Optional Violin Fingerings
    for (const note of NOTES) {
      const hit = document.createElementNS(svgNS, "rect");
      hit.setAttribute("x", (note.pdfX - 7).toFixed(1));
      hit.setAttribute("y", (systemMidSvgY(note.sys) - 16).toFixed(1));
      hit.setAttribute("width", "14");
      hit.setAttribute("height", "40");
      hit.setAttribute("rx", "2");
      hit.setAttribute("class", "note-hit");
      hit.innerHTML = `<title>${note.lyric} — ${note.noteLabel} (${note.stringName} string: ${note.detailed})</title>`;
      hit.addEventListener("click", () => {
        seekToBeat(note.startBeat, true);
      });
      dom.noteHitTargets.appendChild(hit);

      // Violin fingering label above staff
      const txt = document.createElementNS(svgNS, "text");
      const topLineSvgY = systemMidSvgY(note.sys) - 8.625;
      const labelY = Math.min(topLineSvgY - 5.5, note.svgY - 8.0);
      txt.setAttribute("x", note.pdfX.toFixed(2));
      txt.setAttribute("y", labelY.toFixed(2));
      txt.textContent = fingerLabelFor(note);
      const kindCls = note.kind === "nat" ? "nat" : note.kind === "low" ? "low" : "";
      txt.setAttribute("class", `sheet-fingering ${kindCls}`);
      dom.sheetFingeringsLayer.appendChild(txt);
      sheetFingerTexts.push(txt);

      // Per-note matching rating badge (★ / ≈ / ✕) above fingering on music sheet
      const rTxt = document.createElementNS(svgNS, "text");
      rTxt.setAttribute("x", note.pdfX.toFixed(2));
      const rOff = (CURRENT_SONG && CURRENT_SONG.sheet && CURRENT_SONG.sheet.ratingOffsetY) || 6.8;
      rTxt.setAttribute("y", (labelY - rOff).toFixed(2));
      rTxt.setAttribute("class", "sheet-rating");
      rTxt.textContent = "";
      if (dom.noteRatingsLayer) dom.noteRatingsLayer.appendChild(rTxt);
      sheetRatingTexts.push(rTxt);
    }
    refreshSheetFingeringLabels();
  }

  function refreshSheetFingeringLabels() {
    dom.sheetFingeringsLayer.style.display = state.showSheetFingers ? "block" : "none";
    for (let i = 0; i < NOTES.length; i++) {
      sheetFingerTexts[i].textContent = fingerLabelFor(NOTES[i]);
    }
  }

  function findActiveMeasure(beat) {
    if (beat < 0) return MEASURES[0];
    for (const m of MEASURES) {
      if (beat >= m.startBeat && beat < m.endBeat) return m;
    }
    return MEASURES[MEASURES.length - 1];
  }

  function findNoteContext(beat) {
    if (!NOTES.length) return { activeNote: null, nextNote: null, activeMeasure: null, sys: 0, cursorX: 0 };
    const firstNote = NOTES[0];
    if (beat < firstNote.startBeat) {
      const minB = Math.min(getStartMinBeat(), beat);
      const startX = MEASURES[0].xStart;
      const frac = Math.max(0, Math.min(1, (beat - minB) / Math.max(0.001, firstNote.startBeat - minB)));
      return {
        activeNote: null,
        nextNote: firstNote,
        activeMeasure: MEASURES[0],
        sys: 0,
        cursorX: startX + frac * (firstNote.pdfX - startX),
      };
    }

    const activeMeasure = findActiveMeasure(beat);

    // Rests (half rests in Bars 8 & 16): cursor glides across the rest to the barline
    for (const r of RESTS) {
      if (beat >= r.startBeat && beat < r.endBeat) {
        const frac = (beat - r.startBeat) / (r.endBeat - r.startBeat);
        return {
          activeNote: null,
          nextNote: NOTES.find((n) => n.startBeat >= r.endBeat) || null,
          activeMeasure,
          sys: r.sys,
          cursorX: r.x + frac * (r.endX - r.x),
        };
      }
    }

    for (let i = 0; i < NOTES.length; i++) {
      const n = NOTES[i];
      if (beat >= n.startBeat && beat < n.endBeat) {
        const frac = (beat - n.startBeat) / n.durBeats;
        return {
          activeNote: n,
          nextNote: NOTES[i + 1] || null,
          activeMeasure,
          sys: n.sys,
          cursorX: n.pdfX + frac * (n.endPdfX - n.pdfX),
        };
      }
    }

    const last = NOTES[NOTES.length - 1];
    return {
      activeNote: null,
      nextNote: null,
      activeMeasure,
      sys: last.sys,
      cursorX: last.endPdfX,
    };
  }

  function updateSheetAndHUD(beat) {
    const ctxInfo = findNoteContext(beat);
    const { activeNote, nextNote, activeMeasure, sys, cursorX } = ctxInfo;

    // 1. MuseScore.com Active Measure Box Highlight
    const midSvgY = systemMidSvgY(sys);
    if (activeMeasure && beat < TOTAL_BEATS) {
      dom.activeMeasureBox.setAttribute("x", activeMeasure.xStart.toFixed(1));
      dom.activeMeasureBox.setAttribute("y", (midSvgY - 15.5).toFixed(1));
      dom.activeMeasureBox.setAttribute("width", (activeMeasure.xEnd - activeMeasure.xStart).toFixed(1));
      dom.activeMeasureBox.setAttribute("height", "31.0");
    } else {
      dom.activeMeasureBox.setAttribute("width", "0");
    }

    // 2. MuseScore.com Vertical Blue Playback Cursor Bar
    const cursorTopY = midSvgY - 16.5;
    const cursorHeight = 33.0;
    dom.playheadGroup.setAttribute("transform", `translate(${cursorX.toFixed(2)}, 0)`);
    dom.playheadGlow.setAttribute("y", cursorTopY.toFixed(1));
    dom.playheadGlow.setAttribute("height", cursorHeight.toFixed(1));
    dom.playheadLine.setAttribute("y1", cursorTopY.toFixed(1));
    dom.playheadLine.setAttribute("y2", (cursorTopY + cursorHeight).toFixed(1));

    // Auto-scroll Music Sheet whenever its height or width exceeds the visible stage viewport
    if (dom.sheetStage && dom.sheetCanvasWrap && (state.isPlaying || state.lastScrolledBeat !== beat)) {
      const wrapW = dom.sheetCanvasWrap.offsetWidth;
      const wrapH = dom.sheetCanvasWrap.offsetHeight;
      const stageW = dom.sheetStage.clientWidth;
      const stageH = dom.sheetStage.clientHeight;
      const isJump = !state.isPlaying && state.lastScrolledBeat !== beat;
      const lerpRate = isJump ? 1.0 : 0.14;

      if (wrapH > stageH + 2) {
        const maxScrollTop = Math.max(0, wrapH + 16 - stageH);
        const rawTop = ((midSvgY + 6) / SHEET_H) * wrapH - stageH * 0.45;
        const targetTop = Math.max(0, Math.min(maxScrollTop, rawTop));
        dom.sheetStage.scrollTop += (targetTop - dom.sheetStage.scrollTop) * lerpRate;
      }
      if (wrapW > stageW + 2) {
        const maxScrollLeft = Math.max(0, wrapW + 16 - stageW);
        const rawLeft = (cursorX / SHEET_W) * wrapW - stageW * 0.45;
        const targetLeft = Math.max(0, Math.min(maxScrollLeft, rawLeft));
        dom.sheetStage.scrollLeft += (targetLeft - dom.sheetStage.scrollLeft) * lerpRate;
      }
      state.lastScrolledBeat = beat;
    }

    // 3. Recolor Active Notehead Ink + Update Left-Hand Fingerboard (NOW + UPCOMING Guidance)
    sheetFingerTexts.forEach((el) => el.classList.remove("active-finger"));
    const defaultStrColors = ["#c4cad4", "#d4dae3", "#e2e8f0", "#f8fafc"];
    dom.fbStrings.forEach((line, idx) => {
      line.setAttribute("stroke", defaultStrColors[idx]);
    });
    dom.fbHdrs.forEach((hdr) => {
      if (hdr) hdr.classList.remove("now-str", "next-str");
    });

    if (activeNote) {
      const nx = activeNote.pdfX;
      const ny = activeNote.svgY;
      dom.activeNoteBlueInk.setAttribute("cx", nx.toFixed(2));
      dom.activeNoteBlueInk.setAttribute("cy", ny.toFixed(2));
      dom.activeNoteBlueInk.setAttribute("transform", `rotate(-20 ${nx.toFixed(2)} ${ny.toFixed(2)})`);
      sheetFingerTexts[activeNote.idx].classList.add("active-finger");

      // Highlight active string & place glowing Cyan NOW finger pad on fingerboard
      dom.fbStrings[activeNote.stringIdx].setAttribute("stroke", "#00f2fe");
      if (dom.fbHdrs[activeNote.stringIdx]) {
        dom.fbHdrs[activeNote.stringIdx].classList.add("now-str");
      }
      dom.miniMapDot.setAttribute("opacity", "1");
      const fbx = fingerboardStringX(activeNote.stringIdx, activeNote.fbY);
      const fby = activeNote.fbY;
      dom.miniMapHalo.setAttribute("cx", fbx.toFixed(1));
      dom.miniMapHalo.setAttribute("cy", fby.toFixed(1));
      dom.miniMapCore.setAttribute("cx", fbx.toFixed(1));
      dom.miniMapCore.setAttribute("cy", fby.toFixed(1));
      dom.miniMapCore.setAttribute("fill", "#00e8ff");
      dom.miniMapText.setAttribute("x", fbx.toFixed(1));
      dom.miniMapText.setAttribute("y", (fby + 3.8).toFixed(1));
      dom.miniMapText.textContent = fingerLabelFor(activeNote);

      const nextCueShort = nextNote
        ? `  →  Next: ${nextNote.stringName}·${fingerLabelFor(nextNote)}`
        : "";
      if (dom.nowPlayingBadge) {
        dom.nowPlayingBadge.textContent = `${activeNote.stringName} · ${fingerLabelFor(activeNote)} (${activeNote.noteLabel})${nextCueShort}`;
      }
      dom.posNowText.textContent = `${activeNote.stringName} · ${fingerLabelFor(activeNote)} (${activeNote.noteLabel}) "${activeNote.lyric}"`;
    } else {
      dom.activeNoteBlueInk.setAttribute("cx", "-50");
      dom.activeNoteBlueInk.setAttribute("cy", "-50");
      dom.miniMapDot.setAttribute("opacity", "0");

      const cBeats = (CURRENT_SONG && CURRENT_SONG.countInBeats) || 4;
      if (NOTES[0] && beat < NOTES[0].startBeat) {
        const countNum = Math.min(cBeats, Math.max(1, Math.floor(beat + 4)));
        if (dom.nowPlayingBadge) {
          dom.nowPlayingBadge.textContent = `Count-In: ${countNum} / ${cBeats} → Prepare ${NOTES[0].stringName} · ${fingerLabelFor(NOTES[0])}`;
        }
        dom.posNowText.textContent = state.isPlaying
          ? `Count-In ${countNum} / ${cBeats} — Prepare hand`
          : "Paused — Prepare hand";
      } else if (beat < TOTAL_BEATS) {
        if (dom.nowPlayingBadge) {
          dom.nowPlayingBadge.textContent = nextNote
            ? `Rest → Prepare ${nextNote.stringName} · ${fingerLabelFor(nextNote)} (${nextNote.noteLabel})`
            : "Rest · Bow Reset";
        }
        const activeRest = RESTS.find((r) => beat >= r.startBeat && beat < r.endBeat);
        dom.posNowText.textContent = (activeRest && activeRest.label) || "Rest — Prepare next finger";
      } else {
        if (dom.nowPlayingBadge) dom.nowPlayingBadge.textContent = "Finished · Well done!";
        dom.posNowText.textContent = "Song Complete! 🎉";
      }
    }

    // 3B. Render Upcoming Note Left-Hand Guidance (Target Pad + Countdown Arc + Trajectory Arrow + Callout)
    if (nextNote && beat < TOTAL_BEATS) {
      const nfx = fingerboardStringX(nextNote.stringIdx, nextNote.fbY);
      const nfy = nextNote.fbY;
      const isSameSpot = Boolean(activeNote && activeNote.pitch === nextNote.pitch);
      const isCrossString = !activeNote || activeNote.stringIdx !== nextNote.stringIdx;

      // Highlight upcoming string header & dashed string guide if crossing strings (or preparing 1st note)
      if (isCrossString) {
        if (dom.fbHdrs[nextNote.stringIdx]) {
          dom.fbHdrs[nextNote.stringIdx].classList.add("next-str");
        }
        dom.fbNextStrLine.setAttribute("x1", fingerboardStringX(nextNote.stringIdx, 38).toFixed(1));
        dom.fbNextStrLine.setAttribute("x2", fingerboardStringX(nextNote.stringIdx, 406).toFixed(1));
        dom.fbNextStrLine.setAttribute("opacity", activeNote ? "0.52" : "0.72");
      } else {
        dom.fbNextStrLine.setAttribute("opacity", "0");
      }

      // Compute smooth anticipation progress (0 -> 1 as nextNote approaches)
      const beatsUntilNext = Math.max(0, nextNote.startBeat - beat);
      const prepSpan = activeNote ? Math.max(0.25, activeNote.durBeats) : 3.0;
      const prepProgress = Math.max(0, Math.min(1, 1 - beatsUntilNext / prepSpan));
      const pulse = state.isPlaying ? 0.5 + 0.5 * Math.sin(performance.now() * 0.009) : 0.65;

      const circumference = 103.67; // 2 * PI * 16.5
      const dashOffset = circumference * (1 - (state.isPlaying ? prepProgress : 1));

      dom.miniNextGroup.setAttribute("opacity", activeNote ? (0.84 + 0.16 * prepProgress).toFixed(2) : "1");
      dom.miniNextHalo.setAttribute("cx", nfx.toFixed(1));
      dom.miniNextHalo.setAttribute("cy", nfy.toFixed(1));
      dom.miniNextHalo.setAttribute("r", (18.5 + pulse * 3.2).toFixed(1));

      dom.miniNextProgress.setAttribute("cx", nfx.toFixed(1));
      dom.miniNextProgress.setAttribute("cy", nfy.toFixed(1));
      dom.miniNextProgress.setAttribute("stroke-dashoffset", dashOffset.toFixed(2));
      dom.miniNextProgress.setAttribute("transform", `rotate(-90 ${nfx.toFixed(1)} ${nfy.toFixed(1)})`);

      if (isSameSpot) {
        // Keep Cyan NOW center readable; wrap it with Gold concentric repeat ring!
        dom.miniNextCore.setAttribute("opacity", "0");
        dom.miniNextText.setAttribute("opacity", "0");
        dom.miniShiftArrow.setAttribute("opacity", "0");
      } else {
        dom.miniNextCore.setAttribute("opacity", "1");
        dom.miniNextCore.setAttribute("cx", nfx.toFixed(1));
        dom.miniNextCore.setAttribute("cy", nfy.toFixed(1));
        dom.miniNextCore.setAttribute(
          "fill",
          activeNote ? "rgba(245, 158, 11, 0.30)" : "rgba(245, 158, 11, 0.46)"
        );
        dom.miniNextText.setAttribute("opacity", "1");
        dom.miniNextText.setAttribute("x", nfx.toFixed(1));
        dom.miniNextText.setAttribute("y", (nfy + 3.8).toFixed(1));
        dom.miniNextText.textContent = fingerLabelFor(nextNote);

        // Draw curved left-hand movement trajectory arrow from Active Finger -> Upcoming Finger
        if (activeNote) {
          const afx = fingerboardStringX(activeNote.stringIdx, activeNote.fbY);
          const afy = activeNote.fbY;
          const dx = nfx - afx;
          const dy = nfy - afy;
          const dist = Math.hypot(dx, dy);
          if (dist > 26) {
            const sideSign = nextNote.stringIdx >= 2 ? 1 : -1;
            const curveBow = activeNote.stringIdx === nextNote.stringIdx ? sideSign * 22 : (dx > 0 ? 14 : -14);
            const ctrlX = (afx + nfx) * 0.5 + curveBow;
            const ctrlY = (afy + nfy) * 0.5;

            // Trim start & end along quadratic curve tangents so arrow sits cleanly outside both finger circles
            const t0Len = Math.max(1, Math.hypot(ctrlX - afx, ctrlY - afy));
            const sx = afx + ((ctrlX - afx) / t0Len) * 15.5;
            const sy = afy + ((ctrlY - afy) / t0Len) * 15.5;

            const t1Len = Math.max(1, Math.hypot(nfx - ctrlX, nfy - ctrlY));
            const ex = nfx - ((nfx - ctrlX) / t1Len) * 18.5;
            const ey = nfy - ((nfy - ctrlY) / t1Len) * 18.5;

            dom.miniShiftArrow.setAttribute(
              "d",
              `M ${sx.toFixed(1)} ${sy.toFixed(1)} Q ${ctrlX.toFixed(1)} ${ctrlY.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`
            );
            dom.miniShiftArrow.setAttribute("opacity", (0.68 + 0.30 * prepProgress).toFixed(2));
          } else {
            dom.miniShiftArrow.setAttribute("opacity", "0");
          }
        } else {
          dom.miniShiftArrow.setAttribute("opacity", "0");
        }
      }

      // Position crisp Gold Callout Pill ("READY", "NEXT", or "STAY 2×") in clear open lane beside string
      const badgeLabel = !activeNote ? "READY" : isSameSpot ? "STAY 2×" : "NEXT";
      const badgeW = badgeLabel === "STAY 2×" ? 42 : badgeLabel === "READY" ? 36 : 32;
      const badgeCenterX = nextNote.stringIdx <= 1 ? nfx - (19 + badgeW * 0.5) : nfx + (19 + badgeW * 0.5);
      const badgeCenterY = nfy;

      dom.miniNextTagGroup.setAttribute("opacity", "1");
      dom.miniNextTagBg.setAttribute("x", (badgeCenterX - badgeW * 0.5).toFixed(1));
      dom.miniNextTagBg.setAttribute("y", (badgeCenterY - 7.5).toFixed(1));
      dom.miniNextTagBg.setAttribute("width", String(badgeW));
      dom.miniNextTagTxt.setAttribute("x", badgeCenterX.toFixed(1));
      dom.miniNextTagTxt.setAttribute("y", (badgeCenterY + 2.6).toFixed(1));
      dom.miniNextTagTxt.textContent = badgeLabel;

      // Update Two-Row Guidance Footer Card
      dom.posNextMain.textContent = `${nextNote.stringName} String · ${fingerLabelFor(nextNote)} (${nextNote.noteLabel}) "${nextNote.lyric}"`;
      dom.posNextHint.textContent = describeHandGuidance(activeNote, nextNote);
    } else {
      dom.fbNextStrLine.setAttribute("opacity", "0");
      dom.miniShiftArrow.setAttribute("opacity", "0");
      dom.miniNextGroup.setAttribute("opacity", "0");
      dom.miniNextTagGroup.setAttribute("opacity", "0");

      if (beat >= TOTAL_BEATS) {
        dom.posNextMain.textContent = `All ${NOTES.length} notes complete!`;
        dom.posNextHint.textContent = "Press Play (or Space) to play again";
      } else {
        dom.posNextMain.textContent = "Final Note — Hold steady!";
        dom.posNextHint.textContent = (CURRENT_SONG && CURRENT_SONG.finalNoteHint) || "Hold final note warmly to the end";
      }
    }

    // 4. Bar & Lyric Banner
    const cBeats = (CURRENT_SONG && CURRENT_SONG.countInBeats) || 4;
    const totalBars = (CURRENT_SONG && CURRENT_SONG.barCount) || 16;
    if (beat < 0) {
      dom.barIndicator.textContent = `Count-In · Beat ${Math.min(cBeats, Math.max(1, Math.floor(beat + 4)))}`;
    } else if (beat < 1.0) {
      dom.barIndicator.textContent = CURRENT_SONG && CURRENT_SONG.hasPickup
        ? "Pickup · Beat 4"
        : `Count-In · Beat ${Math.min(cBeats, Math.max(1, Math.floor(beat + 4)))}`;
    } else {
      const barNum = Math.min(totalBars, Math.floor((beat - 1.0) / 4.0) + 1);
      const beatInBar = Math.floor((beat - 1.0) % 4.0) + 1;
      dom.barIndicator.textContent = `Bar ${barNum} / ${totalBars} · Beat ${beatInBar}`;
    }

    const lineNotes = NOTES.filter((n) => n.sys === sys);
    dom.lyricDisplay.innerHTML = lineNotes
      .map((n) => {
        if (activeNote && n.idx === activeNote.idx) {
          return `<span class="active-word">${n.lyric}</span>`;
        } else if (beat >= n.endBeat) {
          return `<span class="past-word">${n.lyric}</span>`;
        }
        return `<span>${n.lyric}</span>`;
      })
      .join(" ");

    // 5. Scrubber & Time Readout
    const secPerBeat = 60.0 / state.bpm;
    const minBeat = getStartMinBeat();
    const elapsedSec = Math.max(0, (beat - minBeat) * secPerBeat);
    const totalSec = (TOTAL_BEATS - minBeat) * secPerBeat;
    dom.timeCurrent.textContent = formatTime(elapsedSec);
    dom.timeTotal.textContent = formatTime(totalSec);
    dom.beatScrubber.min = String(minBeat);
    dom.beatScrubber.value = String(beat);
  }

  function formatTime(sec) {
    const s = Math.max(0, Math.round(sec));
    const m = Math.floor(s / 60);
    const rem = s % 60;
    return `${m}:${rem < 10 ? "0" : ""}${rem}`;
  }

  // =========================================================================
  // 5. RIGHT ANIMATED VIOLIN TAB HIGHWAY (Happy Scales for Duo Style)
  // =========================================================================
  const tabCtx = dom.tabCanvas.getContext("2d");

  function drawStarShape(ctx, cx, cy, spikes, outerR, innerR, fillStyle, strokeStyle) {
    let rot = (Math.PI / 2) * 3;
    const step = Math.PI / spikes;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(cx, cy - outerR);
    for (let i = 0; i < spikes; i++) {
      ctx.lineTo(cx + Math.cos(rot) * outerR, cy + Math.sin(rot) * outerR);
      rot += step;
      ctx.lineTo(cx + Math.cos(rot) * innerR, cy + Math.sin(rot) * innerR);
      rot += step;
    }
    ctx.closePath();
    ctx.fillStyle = fillStyle;
    ctx.fill();
    if (strokeStyle) {
      ctx.strokeStyle = strokeStyle;
      ctx.lineWidth = 1.6;
      ctx.stroke();
    }
    ctx.restore();
  }

  function resizeTabCanvas() {
    // Size from the canvas itself: it fills the stage normally, or a side column in the 3D concert view
    const parentRect = dom.tabCanvas.parentElement.getBoundingClientRect();
    const rect = { width: dom.tabCanvas.clientWidth || parentRect.width, height: dom.tabCanvas.clientHeight || parentRect.height };
    const dpr = window.devicePixelRatio || 1;
    dom.tabCanvas.width = Math.max(1, Math.floor(rect.width * dpr));
    dom.tabCanvas.height = Math.max(1, Math.floor(rect.height * dpr));
    tabCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  window.addEventListener("resize", () => {
    resizeTabCanvas();
    renderTabHighway(state.currentBeat);
  });

  function renderTabHighway(beat) {
    const W = dom.tabCanvas.clientWidth;
    const H = dom.tabCanvas.clientHeight;
    if (W <= 0 || H <= 0) return;

    tabCtx.clearRect(0, 0, W, H);

    // 3D Tapered Fingerboard Geometry (matching Happy Scales for Duo video)
    const centerX = W * 0.50;
    const topHalfW = W * 0.24;
    const botHalfW = W * 0.42;
    const hitY = H * 0.865;
    const lookaheadBeats = 5.4;
    const pxPerBeat = hitY / lookaheadBeats;

    function boardHalfWAt(y) {
      const t = Math.max(-0.1, Math.min(1.15, y / H));
      return topHalfW + (botHalfW - topHalfW) * t;
    }

    function stringXAt(strIdx, y) {
      const norm = -0.68 + (strIdx / 3) * 1.36;
      return centerX + norm * boardHalfWAt(y);
    }

    // 1. Soft Drop Shadow beneath Fingerboard
    tabCtx.save();
    tabCtx.beginPath();
    tabCtx.moveTo(centerX - topHalfW, 0);
    tabCtx.lineTo(centerX + topHalfW, 0);
    tabCtx.lineTo(centerX + botHalfW, H);
    tabCtx.lineTo(centerX - botHalfW, H);
    tabCtx.closePath();
    tabCtx.shadowColor = "rgba(15, 23, 42, 0.28)";
    tabCtx.shadowBlur = 24;
    tabCtx.shadowOffsetY = 6;

    const woodGrad = tabCtx.createLinearGradient(centerX - botHalfW, H * 0.7, centerX + topHalfW, H * 0.05);
    woodGrad.addColorStop(0.0, "#7c724c");
    woodGrad.addColorStop(0.45, "#a69a6e");
    woodGrad.addColorStop(0.82, "#c8bc91");
    woodGrad.addColorStop(1.0, "#e6dcc0");
    tabCtx.fillStyle = woodGrad;
    tabCtx.fill();
    tabCtx.restore();

    // Clip interior of fingerboard
    tabCtx.save();
    tabCtx.beginPath();
    tabCtx.moveTo(centerX - topHalfW, 0);
    tabCtx.lineTo(centerX + topHalfW, 0);
    tabCtx.lineTo(centerX + botHalfW, H);
    tabCtx.lineTo(centerX - botHalfW, H);
    tabCtx.closePath();
    tabCtx.clip();

    // 2. Subtle Measure & Beat Guide Lines scrolling down
    const minVisibleBeat = Math.floor(beat - 1);
    const maxVisibleBeat = Math.ceil(beat + lookaheadBeats + 1);
    for (let b = minVisibleBeat; b <= maxVisibleBeat; b++) {
      if (b < -3 || b > TOTAL_BEATS) continue;
      const y = hitY - (b - beat) * pxPerBeat;
      if (y < -10 || y > H + 10) continue;

      const isBarLine = b >= 1 && (b - 1) % 4 === 0;
      const hw = boardHalfWAt(y);
      tabCtx.beginPath();
      tabCtx.moveTo(centerX - hw, y);
      tabCtx.lineTo(centerX + hw, y);
      const startLineBeat = CURRENT_SONG && CURRENT_SONG.hasPickup ? 0 : 1;
      if (b === startLineBeat) {
        tabCtx.strokeStyle = "rgba(255, 255, 255, 0.92)";
        tabCtx.lineWidth = 2.4;
        tabCtx.stroke();

        tabCtx.fillStyle = "#ffffff";
        tabCtx.font = "700 15px -apple-system, BlinkMacSystemFont, sans-serif";
        tabCtx.textAlign = "left";
        tabCtx.fillText("start", centerX - hw + 10, y - 5);
      } else if (isBarLine) {
        tabCtx.strokeStyle = "rgba(255, 255, 255, 0.22)";
        tabCtx.lineWidth = 1.2;
        tabCtx.stroke();
      } else {
        tabCtx.strokeStyle = "rgba(255, 255, 255, 0.08)";
        tabCtx.lineWidth = 0.8;
        tabCtx.stroke();
      }
    }

    let soundingNote = null;
    for (const n of NOTES) {
      if (beat >= n.startBeat && beat < n.endBeat) {
        soundingNote = n;
        break;
      }
    }

    // 3. Draw the 4 Metallic Violin Strings (G, D, A, E)
    const baseWidths = [4.0, 3.1, 2.3, 1.6];
    for (let s = 0; s < 4; s++) {
      const xTop = stringXAt(s, 0);
      const xBot = stringXAt(s, H);
      const isSounding = soundingNote && soundingNote.stringIdx === s && state.isPlaying;

      tabCtx.beginPath();
      tabCtx.moveTo(xTop - 1, 0);
      tabCtx.lineTo(xBot - 1.5, H);
      tabCtx.strokeStyle = "rgba(30, 27, 20, 0.62)";
      tabCtx.lineWidth = baseWidths[s] + 1.2;
      tabCtx.stroke();

      tabCtx.beginPath();
      if (isSounding) {
        const amp = 1.6;
        const steps = 22;
        for (let k = 0; k <= steps; k++) {
          const ty = (k / steps) * H;
          const env = ty < hitY ? Math.sin((ty / hitY) * Math.PI) : 0;
          const vib = Math.sin(performance.now() * 0.065 + k * 0.9) * amp * env;
          const sx = stringXAt(s, ty) + vib;
          if (k === 0) tabCtx.moveTo(sx, ty);
          else tabCtx.lineTo(sx, ty);
        }
        tabCtx.strokeStyle = "#e0fbff";
        tabCtx.shadowColor = "#00f0ff";
        tabCtx.shadowBlur = 10;
      } else {
        tabCtx.moveTo(xTop, 0);
        tabCtx.lineTo(xBot, H);
        tabCtx.strokeStyle = "#dde3ec";
        tabCtx.shadowBlur = 0;
      }
      tabCtx.lineWidth = baseWidths[s];
      tabCtx.stroke();
      tabCtx.shadowBlur = 0;
    }

    // 4. Draw Falling Sustain Tails + Glowing Finger Digits
    for (const note of NOTES) {
      if (note.endBeat < beat - 0.35 || note.startBeat > beat + lookaheadBeats + 0.5) {
        continue;
      }

      const isActive = beat >= note.startBeat && beat < note.endBeat;
      const isPast = beat >= note.endBeat;
      const colorMain = note.kind === "nat" ? "#ffd166" : "#00f5ff";
      const colorGlow = note.kind === "nat" ? "rgba(255, 209, 102, 0.85)" : "rgba(0, 245, 255, 0.85)";

      const articulationGap = Math.min(0.11, note.durBeats * 0.18);
      const tailEndBeat = Math.max(note.startBeat + 0.05, note.endBeat - articulationGap);

      const rawNoteY = hitY - (note.startBeat - beat) * pxPerBeat;
      const digitY = isActive ? hitY : rawNoteY;
      const tailTopY = hitY - (tailEndBeat - beat) * pxPerBeat;
      const tailBottomY = isActive ? hitY - 14 : digitY - 15;

      if (tailBottomY > tailTopY + 2 && !isPast) {
        const x1 = stringXAt(note.stringIdx, tailTopY);
        const x2 = stringXAt(note.stringIdx, tailBottomY);
        tabCtx.save();
        tabCtx.beginPath();
        tabCtx.moveTo(x1, tailTopY);
        tabCtx.lineTo(x2, tailBottomY);
        tabCtx.strokeStyle = colorMain;
        tabCtx.lineWidth = isActive ? 6.2 : 4.8;
        tabCtx.lineCap = "round";
        tabCtx.shadowColor = colorGlow;
        tabCtx.shadowBlur = isActive ? 16 : 9;
        tabCtx.stroke();
        tabCtx.restore();
      }

      if (!isPast) {
        const dx = stringXAt(note.stringIdx, digitY);
        const perspScale = 0.72 + 0.32 * Math.max(0, Math.min(1.1, digitY / hitY));
        const activeBoost = isActive ? 1.18 : 1.0;
        const fontSize = Math.round(28 * perspScale * activeBoost);
        const label = fingerLabelFor(note);

        tabCtx.save();
        const noteStatus = noteEvaluations[note.idx] ? noteEvaluations[note.idx].status : null;
        if (isActive) {
          const ringColorInner =
            noteStatus === "perfect"
              ? "rgba(251, 191, 36, 0.72)"
              : noteStatus === "almost"
              ? "rgba(56, 189, 248, 0.65)"
              : "rgba(0, 245, 255, 0.55)";
          const grad = tabCtx.createRadialGradient(dx, hitY, 2, dx, hitY, 32);
          grad.addColorStop(0, ringColorInner);
          grad.addColorStop(1, "rgba(0, 245, 255, 0)");
          tabCtx.fillStyle = grad;
          tabCtx.beginPath();
          tabCtx.arc(dx, hitY, 32, 0, Math.PI * 2);
          tabCtx.fill();
        }

        tabCtx.font = `900 ${fontSize}px -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif`;
        tabCtx.textAlign = "center";
        tabCtx.textBaseline = "middle";

        tabCtx.lineWidth = 3.8;
        tabCtx.strokeStyle = "rgba(18, 24, 32, 0.72)";
        tabCtx.strokeText(label, dx, digitY);

        tabCtx.shadowColor = noteStatus === "perfect" ? "rgba(251, 191, 36, 0.95)" : colorGlow;
        tabCtx.shadowBlur = isActive ? 18 : 8;
        tabCtx.fillStyle = isActive
          ? noteStatus === "perfect"
            ? "#fef08a"
            : "#ffffff"
          : colorMain;
        tabCtx.fillText(label, dx, digitY);
        tabCtx.restore();
      }
    }

    // 5. Bottom Glossy Black Nut / Hit Bar
    const nutY = hitY + 12;
    const hwHit = boardHalfWAt(hitY);
    const hwNut = boardHalfWAt(nutY);

    tabCtx.beginPath();
    tabCtx.moveTo(centerX - hwHit + 8, hitY);
    tabCtx.lineTo(centerX + hwHit - 8, hitY);
    tabCtx.strokeStyle = "rgba(255, 255, 255, 0.92)";
    tabCtx.lineWidth = 2.2;
    tabCtx.stroke();

    const nutGrad = tabCtx.createLinearGradient(0, nutY - 5, 0, nutY + 7);
    nutGrad.addColorStop(0, "#2d3138");
    nutGrad.addColorStop(0.45, "#090b0e");
    nutGrad.addColorStop(1, "#1e2228");
    tabCtx.fillStyle = nutGrad;
    tabCtx.fillRect(centerX - hwNut - 4, nutY - 5, (hwNut + 4) * 2, 11);

    tabCtx.restore();

    // 6. String Name Badges at Bottom (G  D  A  E)
    const stringNames = ["G", "D", "A", "E"];
    for (let s = 0; s < 4; s++) {
      const sx = stringXAt(s, H - 16);
      const isSounding = soundingNote && soundingNote.stringIdx === s;
      tabCtx.save();
      tabCtx.beginPath();
      tabCtx.arc(sx, H - 18, 12.5, 0, Math.PI * 2);
      tabCtx.fillStyle = isSounding ? "#00d4ff" : "rgba(15, 23, 42, 0.82)";
      tabCtx.fill();
      tabCtx.font = "800 12.5px -apple-system, BlinkMacSystemFont, sans-serif";
      tabCtx.fillStyle = isSounding ? "#04131d" : "#f8fafc";
      tabCtx.textAlign = "center";
      tabCtx.textBaseline = "middle";
      tabCtx.fillText(stringNames[s], sx, H - 18);
      tabCtx.restore();
    }

    // 6B. Live Microphone Intonation Meter below Nut (when violin pitch is detected)
    if (livePitchInfo.active && soundingNote) {
      const meterW = Math.min(180, hwNut * 1.15);
      const meterY = nutY + 13;
      const clampedCents = Math.max(-150, Math.min(150, livePitchInfo.centsOff));
      const needleX = centerX + (clampedCents / 150) * (meterW * 0.5);

      tabCtx.save();
      tabCtx.fillStyle = "rgba(15, 23, 42, 0.72)";
      tabCtx.beginPath();
      tabCtx.roundRect(centerX - meterW * 0.5, meterY - 4, meterW, 8, 4);
      tabCtx.fill();

      // Perfect target zone (±40 cents) in center
      const perfW = (40 / 150) * meterW;
      tabCtx.fillStyle = "rgba(251, 191, 36, 0.55)";
      tabCtx.fillRect(centerX - perfW * 0.5, meterY - 3, perfW, 6);

      // Moving pitch needle dot
      const inTune = Math.abs(livePitchInfo.centsOff) <= 42;
      const isNear = Math.abs(livePitchInfo.centsOff) <= 150;
      tabCtx.beginPath();
      tabCtx.arc(needleX, meterY, 5.5, 0, Math.PI * 2);
      tabCtx.fillStyle = inTune ? "#fbbf24" : isNear ? "#38bdf8" : "#f87171";
      tabCtx.strokeStyle = "#ffffff";
      tabCtx.lineWidth = 1.5;
      tabCtx.fill();
      tabCtx.stroke();
      tabCtx.restore();
    }

    // 6C. Render Celebratory Star / Spark Particles on Highway
    for (let i = highwayParticles.length - 1; i >= 0; i--) {
      const pt = highwayParticles[i];
      pt.ox += pt.vx;
      pt.oy += pt.vy;
      pt.vy += 0.05; // light gravity
      pt.life -= 0.024;
      if (pt.life <= 0) {
        highwayParticles.splice(i, 1);
        continue;
      }
      const px = stringXAt(pt.stringIdx, hitY) + pt.ox;
      const py = hitY + pt.oy;
      tabCtx.save();
      tabCtx.globalAlpha = Math.max(0, pt.life);
      if (pt.kind === "star") {
        drawStarShape(tabCtx, px, py, 5, 7.5 * pt.life + 2.5, 3.4 * pt.life + 1.2, pt.color, "#b45309");
      } else {
        tabCtx.fillStyle = pt.color;
        tabCtx.beginPath();
        tabCtx.arc(px, py, 3.5 * pt.life + 1, 0, Math.PI * 2);
        tabCtx.fill();
      }
      tabCtx.restore();
    }

    // 6D. Render Floating Note-Matching Judgment Popups (★ PERFECT! / ≈ ALMOST! / ✕ MISS)
    for (let i = highwayPopups.length - 1; i >= 0; i--) {
      const pop = highwayPopups[i];
      pop.dy -= 0.55;
      pop.life -= 0.017;
      if (pop.life <= 0) {
        highwayPopups.splice(i, 1);
        continue;
      }
      const baseX = stringXAt(pop.stringIdx, hitY);
      const shakeX = pop.status === "miss" && pop.life > 0.7 ? Math.sin(pop.life * 55) * 5.5 : 0;
      const px = Math.max(76, Math.min(W - 76, baseX + shakeX));
      const py = hitY - 46 + pop.dy;
      const popScale = pop.life > 0.86 ? 0.8 + ((1.0 - pop.life) / 0.14) * 0.32 : 1.0;

      tabCtx.save();
      tabCtx.globalAlpha = Math.max(0, Math.min(1, pop.life * 1.35));
      tabCtx.translate(px, py);
      tabCtx.scale(popScale, popScale);

      if (pop.status === "perfect") {
        // Golden Star Badge + "★ PERFECT! +98"
        drawStarShape(tabCtx, 0, -22, 5, 16, 7.2, "#fde047", "#d97706");

        tabCtx.fillStyle = "rgba(15, 23, 42, 0.90)";
        tabCtx.strokeStyle = "#fbbf24";
        tabCtx.lineWidth = 2.2;
        tabCtx.beginPath();
        tabCtx.roundRect(-68, -4, 136, 26, 13);
        tabCtx.fill();
        tabCtx.stroke();

        tabCtx.font = "900 13px -apple-system, BlinkMacSystemFont, sans-serif";
        tabCtx.fillStyle = "#fde047";
        tabCtx.textAlign = "center";
        tabCtx.textBaseline = "middle";
        tabCtx.fillText(`★ PERFECT! +${pop.score}`, 0, 9);
      } else if (pop.status === "almost") {
        // Nearly Correct Badge ("≈ ALMOST! +64" + pitch direction hint)
        tabCtx.fillStyle = "#38bdf8";
        tabCtx.strokeStyle = "#0284c7";
        tabCtx.lineWidth = 2;
        tabCtx.beginPath();
        tabCtx.arc(0, -21, 12, 0, Math.PI * 2);
        tabCtx.fill();
        tabCtx.stroke();

        tabCtx.font = "900 15px -apple-system, BlinkMacSystemFont, sans-serif";
        tabCtx.fillStyle = "#0f172a";
        tabCtx.textAlign = "center";
        tabCtx.textBaseline = "middle";
        tabCtx.fillText("≈", 0, -20.5);

        const pillW = pop.subHint ? 142 : 124;
        tabCtx.fillStyle = "rgba(15, 23, 42, 0.90)";
        tabCtx.strokeStyle = "#38bdf8";
        tabCtx.lineWidth = 2.0;
        tabCtx.beginPath();
        tabCtx.roundRect(-pillW * 0.5, -5, pillW, pop.subHint ? 36 : 25, 11);
        tabCtx.fill();
        tabCtx.stroke();

        tabCtx.font = "900 12.5px -apple-system, BlinkMacSystemFont, sans-serif";
        tabCtx.fillStyle = "#bae6fd";
        tabCtx.fillText(`≈ ALMOST! +${pop.score}`, 0, 6);
        if (pop.subHint) {
          tabCtx.font = "700 10px -apple-system, BlinkMacSystemFont, sans-serif";
          tabCtx.fillStyle = "#fde68a";
          tabCtx.fillText(pop.subHint, 0, 21);
        }
      } else {
        // Missed Note Badge: Bold Crimson "✕" Cross + "✕ MISS +0"
        tabCtx.fillStyle = "rgba(220, 38, 38, 0.95)";
        tabCtx.strokeStyle = "#fecaca";
        tabCtx.lineWidth = 2;
        tabCtx.beginPath();
        tabCtx.arc(0, -21, 12.5, 0, Math.PI * 2);
        tabCtx.fill();
        tabCtx.stroke();

        // Draw crisp vector X inside circle
        tabCtx.strokeStyle = "#ffffff";
        tabCtx.lineWidth = 3.0;
        tabCtx.lineCap = "round";
        tabCtx.beginPath();
        tabCtx.moveTo(-5.2, -26.2);
        tabCtx.lineTo(5.2, -15.8);
        tabCtx.moveTo(5.2, -26.2);
        tabCtx.lineTo(-5.2, -15.8);
        tabCtx.stroke();

        tabCtx.fillStyle = "rgba(15, 23, 42, 0.90)";
        tabCtx.strokeStyle = "#f87171";
        tabCtx.lineWidth = 2.0;
        tabCtx.beginPath();
        tabCtx.roundRect(-54, -4, 108, 25, 12);
        tabCtx.fill();
        tabCtx.stroke();

        tabCtx.font = "900 13px -apple-system, BlinkMacSystemFont, sans-serif";
        tabCtx.fillStyle = "#fca5a5";
        tabCtx.textAlign = "center";
        tabCtx.textBaseline = "middle";
        tabCtx.fillText("✕ MISS +0", 0, 8.5);
      }

      tabCtx.restore();
    }

    // 7. Count-in Banner on Highway
    const firstBeat = NOTES[0] ? NOTES[0].startBeat : 1;
    if (beat < firstBeat) {
      const cBeats = (CURRENT_SONG && CURRENT_SONG.countInBeats) || 4;
      const countNum = Math.min(cBeats, Math.max(1, Math.floor(beat + 4)));
      tabCtx.save();
      tabCtx.font = "900 44px -apple-system, BlinkMacSystemFont, sans-serif";
      tabCtx.textAlign = "center";
      tabCtx.fillStyle = "rgba(15, 23, 42, 0.78)";
      tabCtx.fillText(`${countNum}`, centerX, H * 0.24);
      tabCtx.font = "700 13px -apple-system, BlinkMacSystemFont, sans-serif";
      const cueSub = CURRENT_SONG && CURRENT_SONG.hasPickup
        ? "Count-In (Pickup enters on 4)"
        : `Count-In · Bar 1 starts after ${cBeats}`;
      tabCtx.fillText(cueSub, centerX, H * 0.24 + 28);
      tabCtx.restore();
    }
  }

  // =========================================================================
  // 5B. CUTE DANCING ANIMAL COMPANION (Beat-Synced Kawaii Cat, Bunny & Bear)
  // =========================================================================
  const dancerCanvas = document.getElementById("dancerCanvas");
  const dancerBox = document.getElementById("dancerBox");
  const btnSwitchPet = document.getElementById("btnSwitchPet");
  const dancerMoodTag = document.getElementById("dancerMoodTag");
  const dCtx = dancerCanvas.getContext("2d");

  const PETS = [
    { id: "cat",   label: "🐱 Mochi", fur: "#fff8ee", patch: "#eba063", earIn: "#fda4af", bow: "#38bdf8", cheek: "rgba(251, 113, 133, 0.45)" },
    { id: "bunny", label: "🐰 Boba",  fur: "#fdfbf7", patch: "#f3e8ff", earIn: "#f9a8d4", bow: "#fb7185", cheek: "rgba(244, 114, 182, 0.45)" },
    { id: "bear",  label: "🐻 Honey", fur: "#d9985f", patch: "#faebd7", earIn: "#b0723c", bow: "#34d399", cheek: "rgba(251, 113, 133, 0.42)" },
  ];
  let currentPetIdx = 0;
  let lastParticleNoteIdx = -1;
  const noteParticles = [];

  function resizeDancerCanvas() {
    if (!dancerCanvas) return;
    const rect = dancerCanvas.parentElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    dancerCanvas.width = Math.max(1, Math.floor(rect.width * dpr));
    dancerCanvas.height = Math.max(1, Math.floor(rect.height * dpr));
    dCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  window.addEventListener("resize", resizeDancerCanvas);

  if (dancerBox) {
    dancerBox.addEventListener("click", () => {
      currentPetIdx = (currentPetIdx + 1) % PETS.length;
      if (btnSwitchPet) btnSwitchPet.textContent = PETS[currentPetIdx].label;
      // Pop a happy heart when pet is switched!
      noteParticles.push({
        x: 76 + (Math.random() - 0.5) * 24,
        y: 34,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -0.65,
        life: 1.0,
        glyph: "♡",
        color: "#fb7185",
      });
    });
  }

  function spawnNoteParticles(activeNote) {
    const glyphs = activeNote && activeNote.midi >= 72 ? ["♫", "✦", "♡"] : ["♪", "♫"];
    const colors = ["#38bdf8", "#fbbf24", "#fb7185", "#a78bfa"];
    const count = activeNote && activeNote.durBeats >= 2.0 ? 2 : 1;
    for (let i = 0; i < count; i++) {
      noteParticles.push({
        x: 72 + (Math.random() - 0.5) * 38,
        y: 36 + Math.random() * 8,
        vx: (Math.random() - 0.5) * 0.55,
        vy: -0.55 - Math.random() * 0.35,
        life: 1.0,
        glyph: glyphs[Math.floor(Math.random() * glyphs.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
  }

  function renderDancingAnimal(beat) {
    if (!dancerCanvas) return;
    const W = dancerCanvas.clientWidth;
    const H = dancerCanvas.clientHeight;
    if (W <= 0 || H <= 0) return;

    dCtx.clearRect(0, 0, W, H);
    const pet = PETS[currentPetIdx];
    const nowSec = performance.now() * 0.001;
    const ctxInfo = findNoteContext(beat);
    const activeNote = ctxInfo.activeNote;

    // Trigger floating musical notes when a new melody note starts
    if (state.isPlaying && activeNote && activeNote.idx !== lastParticleNoteIdx) {
      lastParticleNoteIdx = activeNote.idx;
      spawnNoteParticles(activeNote);
    } else if (!state.isPlaying) {
      lastParticleNoteIdx = -1;
    }

    // Update cute mood tag
    if (dancerMoodTag) {
      if (beat >= TOTAL_BEATS) {
        dancerMoodTag.textContent = "Yay!! Bravo! 🎉";
      } else if (!state.isPlaying) {
        dancerMoodTag.textContent = "Ready to dance ♪";
      } else if (beat < 0) {
        const cNum = Math.min(3, Math.max(1, Math.floor(beat + 4)));
        dancerMoodTag.textContent = `Counting in: ${cNum}… ♪`;
      } else if (!activeNote) {
        dancerMoodTag.textContent = "Catching a breath ~";
      } else if (activeNote.midi >= 74 || activeNote.durBeats >= 2.5) {
        dancerMoodTag.textContent = state.vocalAudio ? "Singing with joy! ✨" : "Soaring with joy! ✨";
      } else if (activeNote.durBeats <= 0.5) {
        dancerMoodTag.textContent = "Happy paws! ♫";
      } else {
        dancerMoodTag.textContent = state.vocalAudio ? "Singing & swaying ♪" : "Swaying to the music ♪";
      }
    }

    // Compute Choreography Parameters (Beat-synced when playing, gentle breathing when paused)
    const isFinished = beat >= TOTAL_BEATS;
    const isSoaring = state.isPlaying && activeNote && (activeNote.midi >= 72 && activeNote.durBeats >= 2.0);
    const isQuick = state.isPlaying && activeNote && activeNote.durBeats <= 0.5;

    let hop = 0;
    let swayX = 0;
    let headTilt = 0;
    let squashX = 1;
    let squashY = 1;
    let armL = 0.35;
    let armR = 0.35;
    let earLag = 0;
    let tailWag = 0;

    if (state.isPlaying) {
      const speedMul = isQuick ? 2.0 : 1.0;
      const bounceWave = Math.abs(Math.sin(beat * Math.PI * speedMul));
      hop = bounceWave * (isSoaring ? 8.5 : isQuick ? 6.5 : 7.2);
      swayX = Math.sin(beat * Math.PI * 0.5) * (isSoaring ? 9.0 : 6.5);
      headTilt = Math.sin(beat * Math.PI * 0.5) * 0.16;
      squashX = 1.04 - bounceWave * 0.07;
      squashY = 0.96 + bounceWave * 0.08;
      earLag = Math.cos(beat * Math.PI * speedMul) * 0.18;
      tailWag = Math.sin(beat * Math.PI * 2) * 0.45;

      if (beat < 0) {
        // Cute count-in foot tap & nod
        hop = Math.abs(Math.sin(beat * Math.PI)) * 4.0;
        swayX = 0;
        headTilt = Math.sin(beat * Math.PI) * 0.12;
        armL = 0.25;
        armR = -0.35 - Math.abs(Math.sin(beat * Math.PI)) * 0.55;
      } else if (isSoaring) {
        // Both paws raised happily in praise/awe!
        armL = -0.95 - Math.sin(beat * Math.PI * 2) * 0.2;
        armR = -0.95 + Math.sin(beat * Math.PI * 2) * 0.2;
      } else {
        // Alternating groovy dance paws
        armL = -0.25 + Math.sin(beat * Math.PI) * 0.75;
        armR = -0.25 - Math.sin(beat * Math.PI) * 0.75;
      }
    } else if (isFinished) {
      const celWave = Math.abs(Math.sin(nowSec * 6.0));
      hop = celWave * 8.0;
      swayX = Math.sin(nowSec * 3.0) * 5.0;
      headTilt = Math.sin(nowSec * 3.0) * 0.14;
      armL = -1.05;
      armR = -1.05;
      tailWag = Math.sin(nowSec * 10) * 0.5;
    } else {
      // Gentle idle breathing & ear twitch
      const breath = Math.sin(nowSec * 2.4);
      squashX = 1.0 + breath * 0.018;
      squashY = 1.0 - breath * 0.018;
      headTilt = Math.sin(nowSec * 1.2) * 0.05;
      tailWag = Math.sin(nowSec * 2.8) * 0.22;
      armL = 0.35 + breath * 0.06;
      armR = 0.35 - breath * 0.06;
    }

    const baseX = W * 0.46 + swayX;
    const floorY = H - 11;

    // 1. Spotlight Stage Floor & Dynamic Hop Shadow
    dCtx.save();
    dCtx.beginPath();
    dCtx.ellipse(W * 0.46, floorY + 1, 44, 7.5, 0, 0, Math.PI * 2);
    dCtx.fillStyle = "rgba(56, 189, 248, 0.13)";
    dCtx.fill();

    const shadowScale = Math.max(0.55, 1 - hop * 0.035);
    dCtx.beginPath();
    dCtx.ellipse(baseX, floorY, 21 * shadowScale, 4.5 * shadowScale, 0, 0, Math.PI * 2);
    dCtx.fillStyle = "rgba(2, 6, 23, 0.48)";
    dCtx.fill();
    dCtx.restore();

    // 2. Draw Character Body & Head
    dCtx.save();
    dCtx.translate(baseX, floorY - hop);
    dCtx.scale(squashX, squashY);

    // Wagging Tail (behind body)
    dCtx.save();
    if (pet.id === "cat") {
      dCtx.translate(14, -14);
      dCtx.rotate(0.4 + tailWag);
      dCtx.beginPath();
      dCtx.moveTo(0, 0);
      dCtx.quadraticCurveTo(14, -6, 12, -19);
      dCtx.strokeStyle = pet.patch;
      dCtx.lineWidth = 5.5;
      dCtx.lineCap = "round";
      dCtx.stroke();
    } else {
      // Fluffy pom-pom tail for Bunny & Bear
      dCtx.beginPath();
      dCtx.arc(16, -11 + tailWag * 3, 5.5, 0, Math.PI * 2);
      dCtx.fillStyle = pet.fur;
      dCtx.fill();
      dCtx.strokeStyle = "rgba(15, 23, 42, 0.35)";
      dCtx.lineWidth = 1.2;
      dCtx.stroke();
    }
    dCtx.restore();

    // Dancing Little Feet
    const leftStep = state.isPlaying ? Math.max(0, Math.sin(beat * Math.PI)) * 3.5 : 0;
    const rightStep = state.isPlaying ? Math.max(0, -Math.sin(beat * Math.PI)) * 3.5 : 0;
    dCtx.fillStyle = pet.fur;
    dCtx.strokeStyle = "#1e293b";
    dCtx.lineWidth = 1.5;

    dCtx.beginPath();
    dCtx.ellipse(-8.5, -3 - leftStep, 5.5, 3.6, -0.1, 0, Math.PI * 2);
    dCtx.fill();
    dCtx.stroke();

    dCtx.beginPath();
    dCtx.ellipse(8.5, -3 - rightStep, 5.5, 3.6, 0.1, 0, Math.PI * 2);
    dCtx.fill();
    dCtx.stroke();

    // Chubby Kawaii Torso
    dCtx.beginPath();
    dCtx.ellipse(0, -17, 15.5, 14.5, 0, 0, Math.PI * 2);
    dCtx.fillStyle = pet.fur;
    dCtx.fill();
    dCtx.stroke();

    // Cream Tummy Patch
    dCtx.beginPath();
    dCtx.ellipse(0, -15.5, 9.5, 9.0, 0, 0, Math.PI * 2);
    dCtx.fillStyle = pet.id === "bear" ? pet.patch : "#ffffff";
    dCtx.fill();

    // Cute Bow-Tie at Neck
    dCtx.save();
    dCtx.translate(0, -28);
    dCtx.fillStyle = pet.bow;
    dCtx.beginPath();
    dCtx.moveTo(0, 0);
    dCtx.lineTo(-6.5, -3.5);
    dCtx.lineTo(-6.5, 3.5);
    dCtx.closePath();
    dCtx.moveTo(0, 0);
    dCtx.lineTo(6.5, -3.5);
    dCtx.lineTo(6.5, 3.5);
    dCtx.closePath();
    dCtx.fill();
    dCtx.beginPath();
    dCtx.arc(0, 0, 2.2, 0, Math.PI * 2);
    dCtx.fillStyle = "#ffffff";
    dCtx.fill();
    dCtx.restore();

    // Grooving Paws / Arms
    function drawPaw(side, angle) {
      dCtx.save();
      dCtx.translate(side * 13, -23);
      dCtx.rotate(side * angle);
      dCtx.beginPath();
      dCtx.ellipse(side * 5.5, 0, 6.8, 4.0, 0, 0, Math.PI * 2);
      dCtx.fillStyle = pet.fur;
      dCtx.fill();
      dCtx.strokeStyle = "#1e293b";
      dCtx.lineWidth = 1.5;
      dCtx.stroke();
      dCtx.restore();
    }
    drawPaw(-1, armL);
    drawPaw(1, armR);

    // Head + Ears Group (tilts adorably to the music)
    dCtx.save();
    dCtx.translate(0, -43);
    dCtx.rotate(headTilt);

    // Ears by Species
    if (pet.id === "cat") {
      for (const s of [-1, 1]) {
        dCtx.save();
        dCtx.translate(s * 12, -11);
        dCtx.rotate(s * (0.18 + earLag * 0.5));
        dCtx.beginPath();
        dCtx.moveTo(-6, 4);
        dCtx.lineTo(0, -11);
        dCtx.lineTo(6, 4);
        dCtx.closePath();
        dCtx.fillStyle = s === -1 ? pet.patch : pet.fur;
        dCtx.fill();
        dCtx.strokeStyle = "#1e293b";
        dCtx.lineWidth = 1.5;
        dCtx.stroke();

        dCtx.beginPath();
        dCtx.moveTo(-3.2, 2.5);
        dCtx.lineTo(0, -6.5);
        dCtx.lineTo(3.2, 2.5);
        dCtx.closePath();
        dCtx.fillStyle = pet.earIn;
        dCtx.fill();
        dCtx.restore();
      }
    } else if (pet.id === "bunny") {
      for (const s of [-1, 1]) {
        dCtx.save();
        dCtx.translate(s * 9.5, -13);
        dCtx.rotate(s * (0.22 + earLag));
        dCtx.beginPath();
        dCtx.ellipse(0, -10, 5.2, 13.5, 0, 0, Math.PI * 2);
        dCtx.fillStyle = pet.fur;
        dCtx.fill();
        dCtx.strokeStyle = "#1e293b";
        dCtx.lineWidth = 1.5;
        dCtx.stroke();

        dCtx.beginPath();
        dCtx.ellipse(0, -9.5, 2.6, 9.2, 0, 0, Math.PI * 2);
        dCtx.fillStyle = pet.earIn;
        dCtx.fill();
        dCtx.restore();
      }
    } else {
      // Teddy Bear round ears
      for (const s of [-1, 1]) {
        dCtx.save();
        dCtx.translate(s * 14.5, -12.5);
        dCtx.rotate(s * earLag * 0.4);
        dCtx.beginPath();
        dCtx.arc(0, 0, 6.8, 0, Math.PI * 2);
        dCtx.fillStyle = pet.fur;
        dCtx.fill();
        dCtx.strokeStyle = "#1e293b";
        dCtx.lineWidth = 1.5;
        dCtx.stroke();

        dCtx.beginPath();
        dCtx.arc(0, 0, 3.6, 0, Math.PI * 2);
        dCtx.fillStyle = pet.earIn;
        dCtx.fill();
        dCtx.restore();
      }
    }

    // Round Kawaii Head
    dCtx.beginPath();
    dCtx.ellipse(0, 0, 19.5, 16.0, 0, 0, Math.PI * 2);
    dCtx.fillStyle = pet.fur;
    dCtx.fill();
    dCtx.strokeStyle = "#1e293b";
    dCtx.lineWidth = 1.6;
    dCtx.stroke();

    // Calico Forehead Patch (Cat) or Cream Muzzle (Bear)
    if (pet.id === "cat") {
      dCtx.save();
      dCtx.beginPath();
      dCtx.ellipse(-9, -8.5, 8.5, 5.5, -0.35, 0, Math.PI * 2);
      dCtx.fillStyle = pet.patch;
      dCtx.fill();
      dCtx.restore();
    } else if (pet.id === "bear") {
      dCtx.beginPath();
      dCtx.ellipse(0, 3.8, 7.2, 5.2, 0, 0, Math.PI * 2);
      dCtx.fillStyle = pet.patch;
      dCtx.fill();
    }

    // Rosy Blushing Cheeks
    dCtx.fillStyle = pet.cheek;
    dCtx.beginPath();
    dCtx.ellipse(-11.5, 3.2, 4.2, 2.5, 0, 0, Math.PI * 2);
    dCtx.ellipse(11.5, 3.2, 4.2, 2.5, 0, 0, Math.PI * 2);
    dCtx.fill();

    // Eyes (Happy ^ ^ arcs when soaring/celebrating or periodic blink; shiny kawaii eyes otherwise)
    const isBlinking = !state.isPlaying && Math.sin(nowSec * 1.7) > 0.96;
    if (isSoaring || isFinished || isBlinking) {
      dCtx.strokeStyle = "#1e293b";
      dCtx.lineWidth = 1.9;
      dCtx.lineCap = "round";
      for (const s of [-1, 1]) {
        dCtx.beginPath();
        dCtx.arc(s * 7.5, -0.5, 3.4, Math.PI * 1.1, Math.PI * 1.9);
        dCtx.stroke();
      }
    } else {
      for (const s of [-1, 1]) {
        dCtx.beginPath();
        dCtx.arc(s * 7.5, -1.2, 2.9, 0, Math.PI * 2);
        dCtx.fillStyle = "#0f172a";
        dCtx.fill();
        // Kawaii white eye sparkle
        dCtx.beginPath();
        dCtx.arc(s * 7.5 - 0.9, -2.2, 1.05, 0, Math.PI * 2);
        dCtx.fillStyle = "#ffffff";
        dCtx.fill();
      }
    }

    // Cute Nose & Singing/Smiling Mouth
    dCtx.fillStyle = pet.id === "bear" ? "#3b2314" : "#fb7185";
    dCtx.beginPath();
    dCtx.ellipse(0, 2.0, 2.1, 1.5, 0, 0, Math.PI * 2);
    dCtx.fill();

    if (state.isPlaying && activeNote) {
      // Singing kawaii mouth synced with note!
      const mouthOpen = activeNote.durBeats >= 1.5 ? 3.2 : 2.3;
      dCtx.beginPath();
      dCtx.ellipse(0, 5.8, 2.6, mouthOpen, 0, 0, Math.PI * 2);
      dCtx.fillStyle = "#fb7185";
      dCtx.fill();
      dCtx.strokeStyle = "#1e293b";
      dCtx.lineWidth = 1.1;
      dCtx.stroke();
    } else {
      // Sweet kawaii "w" smile
      dCtx.strokeStyle = "#1e293b";
      dCtx.lineWidth = 1.4;
      dCtx.lineCap = "round";
      dCtx.beginPath();
      dCtx.arc(-2.1, 4.2, 2.1, 0.15, Math.PI - 0.15);
      dCtx.stroke();
      dCtx.beginPath();
      dCtx.arc(2.1, 4.2, 2.1, 0.15, Math.PI - 0.15);
      dCtx.stroke();
    }

    // Cat Whiskers
    if (pet.id === "cat") {
      dCtx.strokeStyle = "rgba(30, 41, 59, 0.55)";
      dCtx.lineWidth = 1.0;
      for (const s of [-1, 1]) {
        dCtx.beginPath();
        dCtx.moveTo(s * 14, 0.5);
        dCtx.lineTo(s * 21, -0.8);
        dCtx.moveTo(s * 14, 3.2);
        dCtx.lineTo(s * 21, 3.8);
        dCtx.stroke();
      }
    }

    dCtx.restore(); // End head
    dCtx.restore(); // End character body

    // 3. Render & Update Floating Musical Note / Sparkle Particles
    for (let i = noteParticles.length - 1; i >= 0; i--) {
      const p = noteParticles[i];
      p.x += p.vx + Math.sin(nowSec * 5 + i) * 0.18;
      p.y += p.vy;
      p.life -= 0.018;
      if (p.life <= 0) {
        noteParticles.splice(i, 1);
        continue;
      }
      dCtx.save();
      dCtx.globalAlpha = Math.max(0, p.life);
      dCtx.font = "800 13px -apple-system, BlinkMacSystemFont, sans-serif";
      dCtx.fillStyle = p.color;
      dCtx.fillText(p.glyph, p.x, p.y);
      dCtx.restore();
    }
  }

  // =========================================================================
  // 6. PLAYBACK LOOP & TRANSPORT CONTROLS
  // =========================================================================
  function updatePlayButtonUI() {
    if (state.isPlaying) {
      dom.btnPlay.classList.add("playing");
      dom.playIcon.textContent = "⏸";
      dom.playLabel.textContent = "Pause";
    } else {
      dom.btnPlay.classList.remove("playing");
      dom.playIcon.textContent = "▶";
      dom.playLabel.textContent = "Play";
    }
  }

  async function startPlayback() {
    await ensureAudio();
    if (state.micMatchEnabled && !micStream) {
      enableMicMatching().catch(() => {});
    }
    dom.wellDoneOverlay.classList.add("hidden");
    if (state.currentBeat >= TOTAL_BEATS - 0.05) {
      state.currentBeat = getStartMinBeat();
      resetAllNoteEvaluations();
    } else if (state.currentBeat <= 0) {
      resetAllNoteEvaluations();
    }
    state.isPlaying = true;
    state.anchorBeat = state.currentBeat;
    state.anchorAudioTime = audioCtx.currentTime + 0.03;
    stopAllScheduledAudio();
    updatePlayButtonUI();
    pumpAudioScheduler();
  }

  function pausePlayback() {
    state.isPlaying = false;
    stopAllScheduledAudio();
    updatePlayButtonUI();
  }

  function togglePlayback() {
    if (state.isPlaying) pausePlayback();
    else startPlayback();
  }

  async function seekToBeat(targetBeat, keepPlaying = state.isPlaying) {
    const clamped = Math.max(getStartMinBeat(), Math.min(TOTAL_BEATS, targetBeat));
    dom.wellDoneOverlay.classList.add("hidden");
    if (clamped <= 0) {
      resetAllNoteEvaluations();
    } else if (clamped < state.currentBeat) {
      clearNoteEvaluationsFromBeat(clamped);
    }
    state.currentBeat = clamped;
    if (keepPlaying) {
      await ensureAudio();
      state.isPlaying = true;
      state.anchorBeat = clamped;
      state.anchorAudioTime = audioCtx.currentTime + 0.02;
      stopAllScheduledAudio();
      updatePlayButtonUI();
      pumpAudioScheduler();
    } else {
      stopAllScheduledAudio();
      updateSheetAndHUD(clamped);
      renderTabHighway(clamped);
    }
  }

  function setTempo(newBpm) {
    const bpm = Math.max(42, Math.min(108, Math.round(newBpm)));
    if (state.isPlaying && audioCtx) {
      const secPerBeatOld = 60.0 / state.bpm;
      state.currentBeat = state.anchorBeat + (audioCtx.currentTime - state.anchorAudioTime) / secPerBeatOld;
      state.anchorBeat = state.currentBeat;
      state.anchorAudioTime = audioCtx.currentTime;
      stopAllScheduledAudio();
    }
    state.bpm = bpm;
    dom.tempoSlider.value = String(bpm);
    const speedTag = bpm <= 58 ? "Slower" : bpm <= 68 ? "Slow" : bpm <= 82 ? "Normal" : "Brisk";
    dom.tempoValue.textContent = `${bpm} BPM (${speedTag})`;
    dom.presetBtns.forEach((btn) => {
      btn.classList.toggle("active", Number(btn.dataset.bpm) === bpm);
    });
    updateSheetAndHUD(state.currentBeat);
  }

  function tick() {
    if (state.isPlaying && audioCtx) {
      const secPerBeat = 60.0 / state.bpm;
      state.currentBeat = state.anchorBeat + (audioCtx.currentTime - state.anchorAudioTime) / secPerBeat;

      if (state.currentBeat >= TOTAL_BEATS) {
        updateNoteMatching(TOTAL_BEATS);
        if (state.loopEnabled) {
          seekToBeat(getStartMinBeat(), true);
        } else {
          state.currentBeat = TOTAL_BEATS;
          pausePlayback();
          if (typeof stopRecordingIfActive === "function") stopRecordingIfActive();
          dom.wellDoneOverlay.classList.remove("hidden");
        }
      } else {
        pumpAudioScheduler();
        updateNoteMatching(state.currentBeat);
      }
    } else {
      updateNoteMatching(state.currentBeat);
    }

    updateSheetAndHUD(state.currentBeat);
    if (!state.concertView || state.concertTab) renderTabHighway(state.currentBeat);
    renderDancingAnimal(state.currentBeat);
    requestAnimationFrame(tick);
  }

  // =========================================================================
  // 7. WIRE UP UI EVENTS & KEYBOARD SHORTCUTS
  // =========================================================================
  dom.btnPlay.addEventListener("click", togglePlayback);
  dom.btnRestart.addEventListener("click", () => seekToBeat(getStartMinBeat(), state.isPlaying));
  dom.btnReplayOverlay.addEventListener("click", () => {
    state.currentBeat = getStartMinBeat();
    startPlayback();
  });

  dom.btnLoop.addEventListener("click", () => {
    state.loopEnabled = !state.loopEnabled;
    dom.btnLoop.classList.toggle("active", state.loopEnabled);
  });

  dom.btnCountIn.addEventListener("click", () => {
    state.countInEnabled = !state.countInEnabled;
    dom.btnCountIn.classList.toggle("active", state.countInEnabled);
    if (!state.isPlaying && state.currentBeat <= 0) {
      seekToBeat(getStartMinBeat(), false);
    }
  });

  dom.tempoSlider.addEventListener("input", (e) => setTempo(Number(e.target.value)));
  dom.presetBtns.forEach((btn) => {
    btn.addEventListener("click", () => setTempo(Number(btn.dataset.bpm)));
  });

  if (dom.btnMicMatch) {
    dom.btnMicMatch.addEventListener("click", async () => {
      state.micMatchEnabled = !state.micMatchEnabled;
      dom.btnMicMatch.classList.toggle("active", state.micMatchEnabled);
      if (state.micMatchEnabled) {
        await enableMicMatching();
      } else if (dom.micPitchReadout) {
        dom.micPitchReadout.textContent = "🎙 Note Match Paused";
      }
    });
  }

  if (dom.btnMicStatus) {
    dom.btnMicStatus.addEventListener("click", () => {
      state.micMatchEnabled = true;
      if (dom.btnMicMatch) dom.btnMicMatch.classList.add("active");
      enableMicMatching();
    });
  }

  // Interactive String Click on TAB Highway & Score Chip Click Demo
  dom.tabCanvas.addEventListener("click", (e) => {
    const rect = dom.tabCanvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const W = rect.width;
    const centerX = W * 0.50;
    const botHalfW = W * 0.42;
    let closestStr = 0;
    let minD = Infinity;
    for (let s = 0; s < 4; s++) {
      const sx = centerX + (-0.68 + (s / 3) * 1.36) * botHalfW;
      const d = Math.abs(clickX - sx);
      if (d < minD) {
        minD = d;
        closestStr = s;
      }
    }
    const ctxInfo = findNoteContext(state.currentBeat);
    const targetNote = ctxInfo.activeNote || ctxInfo.nextNote || NOTES[0];
    if (!targetNote) return;
    if (closestStr === targetNote.stringIdx) {
      const beatDiff = ctxInfo.activeNote
        ? Math.min(0.22, Math.abs(state.currentBeat - targetNote.startBeat) * 0.25)
        : Math.abs(state.currentBeat - targetNote.startBeat);
      const equivCents = Math.min(200, beatDiff * 125 + Math.min(20, minD * 0.35));
      const clickScore = centsToClosenessScore(equivCents);
      if (clickScore >= 82) {
        triggerJudgmentBanner(targetNote, "perfect", `${clickScore}% Closeness`, clickScore);
      } else if (clickScore >= 25) {
        triggerJudgmentBanner(targetNote, "almost", `${clickScore}% Closeness`, clickScore);
      } else {
        triggerJudgmentBanner(targetNote, "miss", "Too Far Off (0 pts)", 0);
      }
    } else if (Math.abs(closestStr - targetNote.stringIdx) === 1) {
      const adjScore = Math.max(35, Math.round(62 - Math.min(25, minD * 0.4)));
      triggerJudgmentBanner(targetNote, "almost", `Try ${targetNote.stringName} String (${adjScore}%)`, adjScore);
    } else {
      triggerJudgmentBanner(targetNote, "miss", "Wrong String (0 pts)", 0);
    }
  });

  // Clicking the 3 Score Chips in the HUD previews ★ Perfect / ≈ Almost / ✕ Miss immediately
  document.querySelector(".perf-chip")?.addEventListener("click", () => {
    const ctxInfo = findNoteContext(state.currentBeat);
    triggerJudgmentBanner(ctxInfo.activeNote || ctxInfo.nextNote || NOTES[0], "perfect", "4¢ off · 99% match", 99);
  });
  document.querySelector(".good-chip")?.addEventListener("click", () => {
    const ctxInfo = findNoteContext(state.currentBeat);
    triggerJudgmentBanner(ctxInfo.activeNote || ctxInfo.nextNote || NOTES[0], "almost", "↑ 65¢ Low ♭ (70% match)", 70);
  });
  document.querySelector(".miss-chip")?.addEventListener("click", () => {
    const ctxInfo = findNoteContext(state.currentBeat);
    triggerJudgmentBanner(ctxInfo.activeNote || ctxInfo.nextNote || NOTES[0], "miss", "Missed (0 pts)", 0);
  });

  if (dom.btnVocalAudio) {
    dom.btnVocalAudio.addEventListener("click", () => {
      state.vocalAudio = !state.vocalAudio;
      dom.btnVocalAudio.classList.toggle("active", state.vocalAudio);
      if (state.isPlaying) seekToBeat(state.currentBeat, true);
    });
  }

  dom.btnViolinAudio.addEventListener("click", () => {
    state.violinAudio = !state.violinAudio;
    dom.btnViolinAudio.classList.toggle("active", state.violinAudio);
    if (state.isPlaying) seekToBeat(state.currentBeat, true);
  });

  function setLiveOrchestra(on) {
    state.orchestraAudio = Boolean(on);
    if (state.orchestraAudio) {
      state.chordAudio = false;
      if (orchestraOn) setOrchestraTrack(false);
    }
    if (dom.btnOrchestraAudio) dom.btnOrchestraAudio.classList.toggle("active", state.orchestraAudio);
    dom.btnChordAudio.classList.toggle("active", state.chordAudio);
    window.dispatchEvent(new CustomEvent("playalong-backing"));
    if (state.isPlaying) seekToBeat(state.currentBeat, true);
    return state.orchestraAudio;
  }

  function applyMixVolumes() {
    if (dom.violinVolVal) dom.violinVolVal.textContent = `${Math.round(state.violinVolume * 100)}%`;
    if (dom.orchVolVal) dom.orchVolVal.textContent = `${Math.round(state.orchVolume * 100)}%`;
    if (dom.violinVolSlider) dom.violinVolSlider.value = String(Math.round(state.violinVolume * 100));
    if (dom.orchVolSlider) dom.orchVolSlider.value = String(Math.round(state.orchVolume * 100));
    if (!audioCtx) return;
    const now = audioCtx.currentTime;
    if (violinBus) violinBus.gain.setTargetAtTime(state.violinVolume, now, 0.02);
    if (accompDryBus) accompDryBus.gain.setTargetAtTime(state.orchVolume, now, 0.02);
    if (accompWetBus) accompWetBus.gain.setTargetAtTime(state.orchVolume, now, 0.02);
  }

  if (dom.violinVolSlider) {
    dom.violinVolSlider.addEventListener("input", (e) => {
      state.violinVolume = Math.max(0, Math.min(1.5, Number(e.target.value) / 100));
      applyMixVolumes();
    });
    dom.violinVolSlider.addEventListener("dblclick", () => {
      state.violinVolume = 1.0;
      applyMixVolumes();
    });
  }

  if (dom.orchVolSlider) {
    dom.orchVolSlider.addEventListener("input", (e) => {
      state.orchVolume = Math.max(0, Math.min(1.5, Number(e.target.value) / 100));
      applyMixVolumes();
    });
    dom.orchVolSlider.addEventListener("dblclick", () => {
      state.orchVolume = 1.0;
      applyMixVolumes();
    });
  }

  if (dom.btnOrchestraAudio) {
    dom.btnOrchestraAudio.addEventListener("click", () => {
      setLiveOrchestra(!state.orchestraAudio);
    });
  }

  dom.btnChordAudio.addEventListener("click", () => {
    state.chordAudio = !state.chordAudio;
    if (state.chordAudio && state.orchestraAudio) {
      state.orchestraAudio = false;
      if (dom.btnOrchestraAudio) dom.btnOrchestraAudio.classList.remove("active");
    }
    dom.btnChordAudio.classList.toggle("active", state.chordAudio);
    window.dispatchEvent(new CustomEvent("playalong-backing"));
    if (state.isPlaying) seekToBeat(state.currentBeat, true);
  });

  dom.btnClickAudio.addEventListener("click", () => {
    state.clickAudio = !state.clickAudio;
    dom.btnClickAudio.classList.toggle("active", state.clickAudio);
    if (state.isPlaying) seekToBeat(state.currentBeat, true);
  });

  dom.tabModeSelect.addEventListener("change", (e) => {
    state.tabMode = e.target.value;
    refreshSheetFingeringLabels();
    updateSheetAndHUD(state.currentBeat);
    renderTabHighway(state.currentBeat);
  });

  dom.btnSheetFingers.addEventListener("click", () => {
    state.showSheetFingers = !state.showSheetFingers;
    dom.btnSheetFingers.classList.toggle("active", state.showSheetFingers);
    refreshSheetFingeringLabels();
  });

  // =========================================================================
  // 7B. PANEL RESIZING, POSITION PANEL CLOSE/OPEN & MUSIC SHEET SIZE ZOOM
  // =========================================================================
  function applySheetSize() {
    if (!dom.sheetStage || !dom.sheetCanvasWrap) return;
    // Maximize to full available width of the sheet stage; vertical overflow auto-scrolls smoothly
    const stageW = Math.max(160, dom.sheetStage.clientWidth - 16);
    const aspect = SHEET_W / SHEET_H;
    const fitW = stageW;
    const fitH = fitW / aspect;

    const scale = state.sheetZoomPct / 100;
    const targetW = Math.round(fitW * scale);
    const targetH = Math.round(fitH * scale);

    dom.sheetCanvasWrap.style.width = `${targetW}px`;
    dom.sheetCanvasWrap.style.height = `${targetH}px`;

    // If newly resized width caused vertical scrollbar to appear/disappear, refine width once so there is zero horizontal scrollbar in Fit mode
    if (state.sheetFitMode) {
      const refinedStageW = Math.max(160, dom.sheetStage.clientWidth - 16);
      if (refinedStageW !== stageW) {
        const rW = Math.round(refinedStageW * scale);
        const rH = Math.round((refinedStageW / aspect) * scale);
        dom.sheetCanvasWrap.style.width = `${rW}px`;
        dom.sheetCanvasWrap.style.height = `${rH}px`;
      }
    }

    if (dom.sheetZoomSlider) dom.sheetZoomSlider.value = String(state.sheetZoomPct);
    if (dom.sheetZoomValue) dom.sheetZoomValue.textContent = `${state.sheetZoomPct}%`;
    if (dom.btnSheetZoomFit) dom.btnSheetZoomFit.classList.toggle("active", state.sheetFitMode);
  }

  function setSheetZoom(newPct, isFit = false) {
    state.sheetZoomPct = Math.max(60, Math.min(220, Math.round(newPct / 5) * 5));
    state.sheetFitMode = isFit || state.sheetZoomPct === 100;
    applySheetSize();
  }

  function setPositionPanelVisible(visible) {
    state.showPositionPanel = Boolean(visible);
    if (dom.positionSidebar) dom.positionSidebar.classList.toggle("hidden", !state.showPositionPanel);
    if (dom.posSplitResizer) dom.posSplitResizer.classList.toggle("hidden", !state.showPositionPanel);
    if (dom.btnTogglePosition) dom.btnTogglePosition.classList.toggle("active", state.showPositionPanel);
    if (dom.btnReopenPosition) dom.btnReopenPosition.classList.toggle("hidden", state.showPositionPanel);
    resizeTabCanvas();
    renderTabHighway(state.currentBeat);
  }

  if (dom.btnTogglePosition) {
    dom.btnTogglePosition.addEventListener("click", () => setPositionPanelVisible(!state.showPositionPanel));
  }
  if (dom.btnClosePosition) {
    dom.btnClosePosition.addEventListener("click", () => setPositionPanelVisible(false));
  }
  if (dom.btnReopenPosition) {
    dom.btnReopenPosition.addEventListener("click", () => setPositionPanelVisible(true));
  }

  if (dom.btnSheetZoomOut) {
    dom.btnSheetZoomOut.addEventListener("click", () => setSheetZoom(state.sheetZoomPct - 15, false));
  }
  if (dom.btnSheetZoomIn) {
    dom.btnSheetZoomIn.addEventListener("click", () => setSheetZoom(state.sheetZoomPct + 15, false));
  }
  if (dom.btnSheetZoomFit) {
    dom.btnSheetZoomFit.addEventListener("click", () => setSheetZoom(100, true));
  }
  if (dom.sheetZoomSlider) {
    dom.sheetZoomSlider.addEventListener("input", (e) => setSheetZoom(Number(e.target.value), false));
  }
  if (dom.sheetStage) {
    dom.sheetStage.addEventListener(
      "wheel",
      (e) => {
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          const delta = e.deltaY < 0 ? 10 : -10;
          setSheetZoom(state.sheetZoomPct + delta, false);
        }
      },
      { passive: false }
    );
  }

  // Draggable Main Left/Right Panel Splitter
  if (dom.mainSplitResizer && dom.workspace) {
    let draggingMain = false;
    dom.mainSplitResizer.addEventListener("pointerdown", (e) => {
      draggingMain = true;
      dom.mainSplitResizer.classList.add("dragging");
      dom.mainSplitResizer.setPointerCapture(e.pointerId);
      e.preventDefault();
    });
    dom.mainSplitResizer.addEventListener("pointermove", (e) => {
      if (!draggingMain) return;
      const rect = dom.workspace.getBoundingClientRect();
      const pct = ((e.clientX - rect.left) / Math.max(1, rect.width)) * 100;
      state.leftPanelPct = Math.max(24, Math.min(76, pct));
      dom.workspace.style.setProperty("--left-panel-pct", `${state.leftPanelPct.toFixed(1)}%`);
      applySheetSize();
      resizeTabCanvas();
      resizeDancerCanvas();
      renderTabHighway(state.currentBeat);
      renderDancingAnimal(state.currentBeat);
    });
    const endMainDrag = () => {
      if (!draggingMain) return;
      draggingMain = false;
      dom.mainSplitResizer.classList.remove("dragging");
    };
    dom.mainSplitResizer.addEventListener("pointerup", endMainDrag);
    dom.mainSplitResizer.addEventListener("pointercancel", endMainDrag);
    dom.mainSplitResizer.addEventListener("dblclick", () => {
      state.leftPanelPct = 52;
      dom.workspace.style.setProperty("--left-panel-pct", "52%");
      applySheetSize();
      resizeTabCanvas();
      resizeDancerCanvas();
      renderTabHighway(state.currentBeat);
    });
  }

  // Draggable Left-Hand Position Sidebar Width Splitter
  if (dom.posSplitResizer && dom.tabSplitBody) {
    let draggingPos = false;
    dom.posSplitResizer.addEventListener("pointerdown", (e) => {
      draggingPos = true;
      dom.posSplitResizer.classList.add("dragging");
      dom.posSplitResizer.setPointerCapture(e.pointerId);
      e.preventDefault();
    });
    dom.posSplitResizer.addEventListener("pointermove", (e) => {
      if (!draggingPos) return;
      const rect = dom.tabSplitBody.getBoundingClientRect();
      const newW = Math.round(Math.max(175, Math.min(430, rect.right - e.clientX)));
      state.posPanelWidth = newW;
      dom.tabSplitBody.style.setProperty("--pos-panel-width", `${newW}px`);
      resizeTabCanvas();
      renderTabHighway(state.currentBeat);
    });
    const endPosDrag = () => {
      if (!draggingPos) return;
      draggingPos = false;
      dom.posSplitResizer.classList.remove("dragging");
    };
    dom.posSplitResizer.addEventListener("pointerup", endPosDrag);
    dom.posSplitResizer.addEventListener("pointercancel", endPosDrag);
    dom.posSplitResizer.addEventListener("dblclick", () => {
      state.posPanelWidth = 262;
      dom.tabSplitBody.style.setProperty("--pos-panel-width", "262px");
      resizeTabCanvas();
      renderTabHighway(state.currentBeat);
    });
  }

  window.addEventListener("resize", () => {
    applySheetSize();
  });

  dom.beatScrubber.addEventListener("input", (e) => {
    seekToBeat(Number(e.target.value), state.isPlaying);
  });

  window.addEventListener("keydown", (e) => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "SELECT") return;
    if (e.code === "Space") {
      e.preventDefault();
      togglePlayback();
    } else if (e.code === "KeyR") {
      seekToBeat(getStartMinBeat(), state.isPlaying);
    } else if (e.code === "ArrowRight") {
      e.preventDefault();
      seekToBeat(state.currentBeat + 2.0, state.isPlaying);
    } else if (e.code === "ArrowLeft") {
      e.preventDefault();
      seekToBeat(state.currentBeat - 2.0, state.isPlaying);
    } else if (["Digit0", "Digit1", "Digit2", "Digit3"].includes(e.code)) {
      // Finger-number key matching (0, 1, 2, 3) for playing along on keyboard
      const pressedDigit = e.code.replace("Digit", "");
      const ctxInfo = findNoteContext(state.currentBeat);
      const targetNote = ctxInfo.activeNote || ctxInfo.nextNote || NOTES[0];
      if (!targetNote) return;
      const expectedDigit = targetNote.classic.replace(/[^0-9]/g, "");
      if (pressedDigit === expectedDigit) {
        const beatDiff = ctxInfo.activeNote
          ? Math.min(0.2, Math.abs(state.currentBeat - targetNote.startBeat) * 0.22)
          : Math.abs(state.currentBeat - targetNote.startBeat);
        const keyScore = centsToClosenessScore(Math.min(180, beatDiff * 120));
        const st = keyScore >= 82 ? "perfect" : keyScore >= 25 ? "almost" : "miss";
        triggerJudgmentBanner(targetNote, st, `${keyScore}% Closeness`, keyScore);
      } else if (Math.abs(Number(pressedDigit) - Number(expectedDigit)) === 1) {
        triggerJudgmentBanner(targetNote, "almost", `Use Finger ${targetNote.detailed} (58%)`, 58);
      } else {
        triggerJudgmentBanner(targetNote, "miss", "Wrong Finger (0 pts)", 0);
      }
    }
  });

  // Backing Track slot UI
  (() => {
    const btn = document.getElementById("btnBacking");
    const panel = document.getElementById("backingPanel");
    const fileInput = document.getElementById("backingFile");
    const bpmInput = document.getElementById("backingBpm");
    const bar1Input = document.getElementById("backingBar1");
    const playToggle = document.getElementById("backingEnabled");
    const status = document.getElementById("backingStatus");
    const clearBtn = document.getElementById("backingClear");
    if (!btn || !panel) return;

    const resync = () => {
      if (state.isPlaying) seekToBeat(state.currentBeat, true);
    };
    const refreshBtn = () => {
      btn.classList.toggle("active", Boolean(backing.buffer) && state.backingAudio);
      btn.textContent = backing.buffer ? "🎵 Backing ✓" : "🎵 Backing";
    };

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      panel.classList.toggle("hidden");
    });
    document.addEventListener("click", (e) => {
      if (!panel.contains(e.target) && e.target !== btn) panel.classList.add("hidden");
    });
    fileInput.addEventListener("change", async () => {
      const file = fileInput.files && fileInput.files[0];
      if (!file) return;
      status.textContent = "Decoding…";
      try {
        const dur = await loadBackingFile(file);
        status.textContent = `${file.name} · ${formatTime(dur)}`;
        resync();
      } catch (err) {
        console.warn(err);
        backing.buffer = null;
        status.textContent = "Could not decode that file";
      }
      refreshBtn();
    });
    bpmInput.addEventListener("change", () => {
      backing.bpm = Math.max(30, Math.min(240, Number(bpmInput.value) || 72));
      bpmInput.value = String(backing.bpm);
      resync();
    });
    bar1Input.addEventListener("change", () => {
      backing.bar1Sec = Math.max(0, Number(bar1Input.value) || 0);
      bar1Input.value = String(backing.bar1Sec);
      resync();
    });
    playToggle.addEventListener("change", () => {
      state.backingAudio = playToggle.checked;
      refreshBtn();
      window.dispatchEvent(new CustomEvent("playalong-backing"));
      resync();
    });
    clearBtn.addEventListener("click", () => {
      if (orchestraOn) {
        setOrchestraTrack(false);
        return;
      }
      backing.buffer = null;
      backing.name = "";
      fileInput.value = "";
      status.textContent = "No track loaded — using built-in piano";
      refreshBtn();
      resync();
    });
    refreshBackingUI = () => {
      bpmInput.value = String(backing.bpm);
      bar1Input.value = String(backing.bar1Sec);
      playToggle.checked = state.backingAudio;
      status.textContent = backing.buffer
        ? `${backing.name} · ${formatTime(backing.buffer.duration)}`
        : "No track loaded — using built-in piano";
      refreshBtn();
      window.dispatchEvent(new CustomEvent("playalong-backing"));
    };
    const presetBtn = document.getElementById("backingOrchestra");
    if (presetBtn) {
      presetBtn.addEventListener("click", () =>
        setOrchestraTrack(true).catch((e) => {
          status.textContent = "Could not load orchestra track";
          console.warn(e);
        })
      );
    }
    refreshBtn();
  })();

  // Bridge for the 3D concert view (concert3d.js)
  // =========================================================================
  // 8. MULTI-SONG LOADER, FINGERBOARD SYNC, SONG PICKER & PWA REGISTRATION
  // =========================================================================
  function rebuildFingerboardForSong(song) {
    const activeGuides = new Set((song.fingerboard && song.fingerboard.activeGuides) || []);
    const setGuide = (key, lineId, txtId) => {
      const on = activeGuides.has(key);
      const line = document.getElementById(lineId);
      const txt = document.getElementById(txtId);
      if (line) line.setAttribute("opacity", on ? "0.45" : "0.15");
      if (txt) txt.setAttribute("class", `fb-pos-lbl ${on ? "low-lbl" : "dim-lbl"}`);
    };
    setGuide("b1", "fbGuideB1Line", "fbGuideB1Txt");
    setGuide("L2", "fbGuideL2Line", "fbGuideL2Txt");
    setGuide("H2", "fbGuideH2Line", "fbGuideH2Txt");

    const ghostLayer = document.getElementById("fbGhostNotesLayer");
    if (!ghostLayer) return;
    ghostLayer.innerHTML = "";
    for (const info of Object.values(PITCH_INFO)) {
      const cx = fingerboardStringX(info.stringIdx, info.fbY);
      const cy = info.fbY;
      const onTape = cy === 148 || cy === 304;
      const c = document.createElementNS(svgNS, "circle");
      c.setAttribute("cx", cx.toFixed(1));
      c.setAttribute("cy", String(cy));
      c.setAttribute("r", info.kind === "open" ? "8.5" : "9.5");
      c.setAttribute("class", `fb-ref-spot${onTape ? " on-tape" : ""}`);
      const t = document.createElementNS(svgNS, "text");
      t.setAttribute("x", cx.toFixed(1));
      t.setAttribute("y", String(cy + 3));
      t.setAttribute("class", `fb-ref-txt${onTape ? " on-tape" : ""}`);
      t.textContent = info.noteLabel;
      ghostLayer.appendChild(c);
      ghostLayer.appendChild(t);
    }
  }

  function applySongData(song, isInitial = false) {
    pausePlayback();
    CURRENT_SONG = song;
    LAYOUT = {
      width: song.sheet.width,
      height: song.sheet.height,
      halfSpace: song.sheet.halfSpace,
      systemMid: song.sheet.systemMid,
    };
    SHEET_W = song.sheet.width;
    SHEET_H = song.sheet.height;
    HALF_SPACE = song.sheet.halfSpace;
    PITCH_INFO = song.pitches;
    MEASURES = song.measures;
    RESTS = song.rests || [];
    NOTES = song.notes.map((row, idx) => {
      const [sys, startBeat, durBeats, pitch, pdfX, endPdfX, lyric, bar] = row;
      const info = PITCH_INFO[pitch];
      const svgY = systemMidSvgY(sys) - info.step * HALF_SPACE;
      return {
        idx, sys, bar, startBeat, durBeats,
        endBeat: startBeat + durBeats,
        pitch, pdfX, endPdfX, svgY, lyric,
        ...info,
      };
    });
    PIANO_EVENTS = song.pianoEvents || [];
    ORCHESTRA_EVENTS = song.orchestraEvents || [];
    TOTAL_BEATS = song.totalBeats;

    // Update UI headers, sheet image, SVG viewBox, notehead size & presets
    document.title = `${song.title} — Violin Play-Along`;
    const elTitle = document.getElementById("songTitleText");
    const elBadge = document.getElementById("songBadgeText");
    const elSub = document.getElementById("songSubtitleText");
    const elSheetTitle = document.getElementById("sheetPanelTitle");
    const elWellDone = document.getElementById("wellDoneSongTitle");
    const elImg = document.getElementById("sheetImage");
    const elSvg = document.getElementById("sheetOverlay");
    const elOptDet = document.getElementById("optTabDetailed");
    const elOptNotes = document.getElementById("optTabNotes");

    if (elTitle) elTitle.textContent = song.title;
    if (elBadge) elBadge.textContent = song.badge;
    if (elSub) elSub.textContent = `${song.composer} · Solo Violin · Live Chamber Orchestra & 3D Concert Hall`;
    if (elSheetTitle) elSheetTitle.textContent = song.sheetTitle || `${song.title} · Music Sheet`;
    if (elWellDone) elWellDone.textContent = song.title;
    if (elImg) {
      elImg.src = song.sheet.image;
      elImg.alt = `${song.title} violin music sheet`;
    }
    if (elSvg) elSvg.setAttribute("viewBox", `0 0 ${SHEET_W} ${SHEET_H}`);
    if (dom.sheetCanvasWrap) dom.sheetCanvasWrap.style.aspectRatio = `${SHEET_W} / ${SHEET_H}`;
    if (dom.activeNoteBlueInk) {
      dom.activeNoteBlueInk.setAttribute("rx", String(song.sheet.noteheadRx || 3.6));
      dom.activeNoteBlueInk.setAttribute("ry", String(song.sheet.noteheadRy || 2.7));
    }
    if (dom.btnCountIn && song.countInLabel) dom.btnCountIn.textContent = song.countInLabel;
    if (elOptDet && song.tabDetailedLabel) elOptDet.textContent = song.tabDetailedLabel;
    if (elOptNotes && song.tabNotesLabel) elOptNotes.textContent = song.tabNotesLabel;
    if (dom.beatScrubber) {
      dom.beatScrubber.min = String(getStartMinBeat());
      dom.beatScrubber.max = String(TOTAL_BEATS);
    }

    // Update tempo preset buttons for this song
    if (song.tempoPresets && dom.presetBtns.length === song.tempoPresets.length) {
      song.tempoPresets.forEach((p, idx) => {
        dom.presetBtns[idx].dataset.bpm = String(p.bpm);
        dom.presetBtns[idx].textContent = p.label;
      });
    }

    // Dynamic per-song fingering font size
    document.documentElement.style.setProperty("--sheet-finger-size", `${song.sheet.fingerFontSize || 6.4}px`);

    rebuildNoteEvaluations();
    resetAllNoteEvaluations();
    rebuildFingerboardForSong(song);
    buildSheetInteractiveOverlay();
    applySheetSize();
    resizeTabCanvas();
    resizeDancerCanvas();
    setTempo(song.defaultBpm || 72);

    const startBeat = getStartMinBeat();
    state.currentBeat = startBeat;
    state.anchorBeat = startBeat;
    updateSheetAndHUD(startBeat);
    renderTabHighway(startBeat);
    renderDancingAnimal(startBeat);

    if (!isInitial) {
      try {
        localStorage.setItem("violinPlayAlong.songId", song.id);
        const u = new URL(location.href);
        u.searchParams.set("song", song.id);
        u.searchParams.delete("beat");
        history.replaceState(null, "", u.toString());
      } catch (_) {}
    }

    renderSongPickerList();
    window.dispatchEvent(new CustomEvent("playalong-song-changed", { detail: { song } }));
  }

  async function loadSong(songId, isInitial = false) {
    if (!SONG_CATALOG) return;
    const entry = SONG_CATALOG.songs.find((s) => s.id === songId) || SONG_CATALOG.songs[0];
    if (!entry) return;
    let song = SONG_CACHE.get(entry.id);
    if (!song) {
      const resp = await fetch(entry.dataUrl);
      if (!resp.ok) throw new Error(`Could not load ${entry.dataUrl}`);
      song = await resp.json();
      SONG_CACHE.set(entry.id, song);
    }
    applySongData(song, isInitial);
  }

  function renderSongPickerList() {
    const listEl = document.getElementById("songList");
    const cntEl = document.getElementById("songCountBadge");
    if (!listEl || !SONG_CATALOG) return;
    if (cntEl) cntEl.textContent = `${SONG_CATALOG.songs.length} ${SONG_CATALOG.songs.length === 1 ? "song" : "songs"}`;
    listEl.innerHTML = "";
    for (const entry of SONG_CATALOG.songs) {
      const btn = document.createElement("button");
      btn.type = "button";
      const isActive = CURRENT_SONG && CURRENT_SONG.id === entry.id;
      btn.className = `sp-item${isActive ? " active" : ""}`;
      btn.innerHTML = `
        <div class="sp-item-top">
          <span class="sp-item-title">${isActive ? "▶ " : ""}${entry.title}</span>
          <span class="sp-item-badge">${entry.badge}</span>
        </div>
        <div class="sp-item-meta">${entry.composer} · ${entry.level} · ${entry.defaultBpm} BPM · ${entry.noteCount} notes</div>
      `;
      btn.addEventListener("click", () => {
        const panel = document.getElementById("songPickerPanel");
        const trigger = document.getElementById("btnSongPicker");
        if (panel) panel.classList.add("hidden");
        if (trigger) trigger.classList.remove("open");
        if (!CURRENT_SONG || CURRENT_SONG.id !== entry.id) {
          loadSong(entry.id, false).catch((err) => console.warn(err));
        }
      });
      listEl.appendChild(btn);
    }
  }

  (() => {
    const trigger = document.getElementById("btnSongPicker");
    const panel = document.getElementById("songPickerPanel");
    if (!trigger || !panel) return;
    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      const willOpen = panel.classList.contains("hidden");
      panel.classList.toggle("hidden", !willOpen);
      trigger.classList.toggle("open", willOpen);
    });
    document.addEventListener("click", (e) => {
      if (!panel.contains(e.target) && !trigger.contains(e.target)) {
        panel.classList.add("hidden");
        trigger.classList.remove("open");
      }
    });
  })();

  // =========================================================================
  // 8B. LIVE RECORDER (User Violin Mic + Orchestra / Piano Accompaniment)
  // =========================================================================
  let mediaRecorder = null;
  let recordedChunks = [];
  let isRecording = false;
  let recStartMs = 0;
  let recTimerId = 0;
  let guideWasOnBeforeRec = null;
  const recordedTakes = [];

  function pickRecordMimeType() {
    if (typeof MediaRecorder === "undefined") return "";
    const prefs = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg;codecs=opus"];
    for (const m of prefs) {
      if (MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(m)) return m;
    }
    return "";
  }

  function currentAccompLabel() {
    if (state.orchestraAudio) return "🎼 Orchestra";
    if (state.chordAudio) return "🎹 Piano";
    if (backing.buffer && state.backingAudio) return "🎵 Backing";
    return "🎻 Solo";
  }

  function renderRecordingsList() {
    const listEl = document.getElementById("recordingsList");
    const takesBtn = document.getElementById("btnTakes");
    const countEl = document.getElementById("takesCount");
    const statusEl = document.getElementById("recordingsStatus");
    if (countEl) countEl.textContent = String(recordedTakes.length);
    if (takesBtn) takesBtn.classList.toggle("hidden", recordedTakes.length === 0);
    if (!listEl) return;

    listEl.innerHTML = "";
    if (recordedTakes.length === 0) {
      if (statusEl) statusEl.textContent = "Press Record to capture your violin with Orchestra or Piano.";
      return;
    }
    if (statusEl) {
      statusEl.textContent = `${recordedTakes.length} ${recordedTakes.length === 1 ? "take" : "takes"} ready to listen or save:`;
    }
    for (const take of recordedTakes) {
      const card = document.createElement("div");
      card.className = "rec-item";
      const fileSafe = `${take.songTitle}-${take.accompRaw}-${take.bpm}bpm`.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
      card.innerHTML = `
        <div class="rec-item-top">
          <span class="rec-item-title">${take.songTitle} · ${take.accompLabel}</span>
          <span class="rec-item-meta">${take.bpm} BPM · ${formatTime(take.durSec)}</span>
        </div>
        <audio controls preload="metadata" src="${take.url}"></audio>
        <div class="rec-item-actions">
          <span class="rec-item-meta" style="margin-right:auto">${take.timeStr}${take.hasMic ? "" : " · (no mic)"}</span>
          <a class="rec-action-btn" href="${take.url}" download="${fileSafe}.${take.ext}">⬇ Save</a>
          <button class="rec-action-btn del" type="button">🗑 Delete</button>
        </div>
      `;
      card.querySelector(".del").addEventListener("click", () => {
        const idx = recordedTakes.findIndex((t) => t.id === take.id);
        if (idx >= 0) {
          URL.revokeObjectURL(recordedTakes[idx].url);
          recordedTakes.splice(idx, 1);
          renderRecordingsList();
        }
      });
      listEl.appendChild(card);
    }
  }

  function updateRecordButtonUI() {
    const btn = document.getElementById("btnRecord");
    const lbl = document.getElementById("recordLabel");
    if (!btn || !lbl) return;
    btn.classList.toggle("recording", isRecording);
    if (isRecording) {
      const sec = Math.max(0, (Date.now() - recStartMs) / 1000);
      lbl.textContent = `Stop (${formatTime(sec)})`;
    } else {
      lbl.textContent = "Record";
    }
  }

  async function startRecording() {
    if (isRecording) return;
    await ensureAudio();
    if (!recordDest || typeof MediaRecorder === "undefined") {
      const statusEl = document.getElementById("recordingsStatus");
      if (statusEl) statusEl.textContent = "Recording is not supported in this browser.";
      return;
    }
    const hasMic = await enableMicMatching();
    const chkMute = document.getElementById("chkMuteGuideOnRec");
    if (chkMute && chkMute.checked && state.violinAudio) {
      guideWasOnBeforeRec = true;
      state.violinAudio = false;
      dom.btnViolinAudio.classList.remove("active");
    } else {
      guideWasOnBeforeRec = null;
    }

    const mimeType = pickRecordMimeType();
    recordedChunks = [];
    mediaRecorder = mimeType ? new MediaRecorder(recordDest.stream, { mimeType }) : new MediaRecorder(recordDest.stream);
    const accompLabel = currentAccompLabel();
    const accompRaw = state.orchestraAudio ? "orchestra" : state.chordAudio ? "piano" : "backing";
    const songTitle = (CURRENT_SONG && CURRENT_SONG.title) || "Violin";
    const bpmSnap = state.bpm;

    mediaRecorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) recordedChunks.push(e.data);
    };
    mediaRecorder.onstop = () => {
      const durSec = Math.max(1, (Date.now() - recStartMs) / 1000);
      const type = (mediaRecorder && mediaRecorder.mimeType) || mimeType || "audio/webm";
      const ext = type.includes("mp4") ? "m4a" : type.includes("ogg") ? "ogg" : "webm";
      const blob = new Blob(recordedChunks, { type });
      const url = URL.createObjectURL(blob);
      const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      recordedTakes.unshift({ id: Date.now(), url, blob, ext, songTitle, accompLabel, accompRaw, bpm: bpmSnap, durSec, timeStr, hasMic });
      renderRecordingsList();
      const panel = document.getElementById("recordingsPanel");
      if (panel) panel.classList.remove("hidden");
    };

    recStartMs = Date.now();
    isRecording = true;
    mediaRecorder.start(250);
    updateRecordButtonUI();
    clearInterval(recTimerId);
    recTimerId = setInterval(updateRecordButtonUI, 250);

    // Start play-along automatically so the student can immediately play with Orchestra or Piano
    if (!state.isPlaying) {
      await startPlayback();
    }
  }

  function stopRecordingIfActive() {
    if (!isRecording) return;
    isRecording = false;
    clearInterval(recTimerId);
    updateRecordButtonUI();
    if (guideWasOnBeforeRec) {
      state.violinAudio = true;
      dom.btnViolinAudio.classList.add("active");
      guideWasOnBeforeRec = null;
    }
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      try { mediaRecorder.stop(); } catch (_) {}
    }
    if (state.isPlaying) pausePlayback();
  }

  (() => {
    const btnRec = document.getElementById("btnRecord");
    const btnTakes = document.getElementById("btnTakes");
    const panel = document.getElementById("recordingsPanel");
    const btnClose = document.getElementById("btnCloseTakes");
    if (btnRec) {
      btnRec.addEventListener("click", () => {
        if (isRecording) stopRecordingIfActive();
        else startRecording().catch((e) => console.warn("Record error:", e));
      });
    }
    if (btnTakes && panel) {
      btnTakes.addEventListener("click", (e) => {
        e.stopPropagation();
        panel.classList.toggle("hidden");
      });
    }
    if (btnClose && panel) {
      btnClose.addEventListener("click", () => panel.classList.add("hidden"));
    }
    document.addEventListener("click", (e) => {
      if (panel && !panel.classList.contains("hidden") && !panel.contains(e.target) && e.target !== btnTakes && !btnTakes?.contains(e.target) && e.target !== btnRec && !btnRec?.contains(e.target)) {
        panel.classList.add("hidden");
      }
    });
  })();

  // PWA Service Worker & Install prompt
  (() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("sw.js").catch((err) => console.warn("SW register skipped:", err));
      });
    }
    let deferredPrompt = null;
    const installBtn = document.getElementById("btnInstallPwa");
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      deferredPrompt = e;
      if (installBtn) installBtn.classList.remove("hidden");
    });
    if (installBtn) {
      installBtn.addEventListener("click", async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        await deferredPrompt.userChoice.catch(() => {});
        deferredPrompt = null;
        installBtn.classList.add("hidden");
      });
    }
    window.addEventListener("appinstalled", () => {
      if (installBtn) installBtn.classList.add("hidden");
    });
  })();

  window.PlayAlong = {
    get NOTES() { return NOTES; },
    get MEASURES() { return MEASURES; },
    get LAYOUT() { return LAYOUT; },
    get TOTAL_BEATS() { return TOTAL_BEATS; },
    get SONG() { return CURRENT_SONG; },
    state,
    loadSong,
    getBeat: () => state.currentBeat,
    getContext: (beat) => findNoteContext(beat),
    fingerLabel: (note) => fingerLabelFor(note),
    setOrchestraTrack,
    isOrchestraOn: () => orchestraOn && state.backingAudio && Boolean(backing.buffer),
    setLiveOrchestra,
    isLiveOrchestraOn: () => state.orchestraAudio,
    relayout() {
      applySheetSize();
      resizeTabCanvas();
      resizeDancerCanvas();
      renderTabHighway(state.currentBeat);
    },
  };

  // Boot! Load song catalog + active song, prefetch studio audio, start render loop
  (async () => {
    prefetchSampleFiles();
    try {
      const resp = await fetch("songs/catalog.json");
      SONG_CATALOG = await resp.json();
      const params = new URLSearchParams(location.search);
      let savedId = null;
      try { savedId = localStorage.getItem("violinPlayAlong.songId"); } catch (_) {}
      const initialId = params.get("song") || savedId || SONG_CATALOG.defaultSongId;
      await loadSong(initialId, true);
      const deepBeat = Number(params.get("beat"));
      if (Number.isFinite(deepBeat) && deepBeat !== 0) seekToBeat(deepBeat, false);
    } catch (err) {
      console.error("Failed to load song catalog:", err);
    }
    requestAnimationFrame(tick);
  })();
})();
