# Sheet Music Editor

`/sheet-music/` is a separate static web app for creating, editing and playing
MusicXML scores. The microphone visualizer lives at `/pitch-visualizer/`.
Both apps use `../music-shared/`; publish all three directories together.

## Using the app

- **New sheet** opens a blank staff composer. **Open MusicXML** accepts
  uncompressed score-partwise `.musicxml` or `.xml` files up to 10 MB.
- **Upload sheet photo** or **Take photo** imports a printed sheet and starts
  local recognition. First conversion downloads roughly 100 MB of models plus
  an 11 MB WASM runtime. **Load sample sheet** opens a four-measure exercise.
- The complete sheet appears immediately. **Play sheet** plays all parts using
  synthesized tones. **Listen to** selects a particular part/staff/voice; BPM
  accepts 30–240. Stop, changing the selection or tempo, editing, closing a sheet,
  backgrounding, and leaving the page cancel pending or active playback.
- Playback honors written order, rests, chords, ties and transposing instruments.
  It does not interpret repeat signs, dynamics, ornaments, written tempo changes
  or instrument-specific sounds. The BPM control sets the playback tempo.
- **Edit sheet** opens an isolated draft. Choose a note/rest length, then tap a
  beat and staff line/space. Use Chord to stack tones, Eraser to remove a tone,
  or Select to drag/change pitch, duration, dots and accidentals.
- Staff, scale, part/staff/voice, measures, zoom and preview controls are in the
  editor. Its **Play preview** plays only the selected staff/voice in the draft.
  It is separate from **Play sheet**, which plays the applied score.
- Select multiple supports taps, box selection and Shift-click ranges.
  Delete selected removes highlighted groups; Undo/Redo retains 50 draft edits.
  Apply changes replaces the displayed score; Cancel discards the draft.
- **Save MusicXML** downloads the applied score. **Print / Save PDF** prints the
  score. The fullscreen symbols enlarge either the score or uploaded photo.

## Privacy and recognition limits

Photos, score edits and audio stay on the device. The app requests a camera only
when Take photo is used; it never requests a microphone. Files and scores are
not persisted between reloads. Save MusicXML to retain edits.

Photos up to 30 MB are decoded, oriented and resized to a maximum 4096 px edge.
Camera capture requires HTTPS/localhost and permission; a native mobile capture
input is the fallback. Cancel, capture, backgrounding and navigation stop video.
Photo zoom, fit width, rotation and removal remain available after conversion.

Recognition is experimental: use flat, well-lit printed music. Staff lines are
read top-to-bottom as one instrument; select a single staff for piano/ensembles.
The detector corrects up to four degrees of skew, not perspective or page curves.
Handwriting is not validated. Time signatures are inferred; review notation and
rhythm. A failed/canceled replacement leaves the current score and export intact.
Compressed MXL, PDF import, score-timewise XML and arbitrary handwritten music
are unsupported. See `recognition.html` for source attribution and limits.

## Source map

- `sheet-controller.js`: photo recognition worker lifecycle, stale-result
  protection, lazy OSMD loading, transactional replacement, editing/export/print.
- `sheet-player.js`: applied-score transport and combining staff/voice timelines.
- `score-playback.js`: cancellable short-lookahead Web Audio tone scheduler.
- `sheet-photo.js`: local camera/files, rotation and cleanup; emits `vp:photo`.
- `score-editor.js`: draft lifecycle, settings, apply/cancel and keyboard undo.
- `score-editor-model.js`: MusicXML-preserving edits, rest splitting, note timing,
  ties, staff signatures, transposition, history and playback timelines.
- `composer-controller.js` / `composer-staff.js`: responsive editable SVG staff,
  pointer/keyboard selection, note entry, hit testing, palettes and draft preview.
- `music-score.js`: score-partwise note extraction; its legacy follower is unused.
- `omr-engine.js`, `omr-musicxml.js`, `omr-worker.js`: HOMR preprocessing, ONNX
  inference, conversion, local model caching and checksums.
- `lib/`, `models/`, `samples/`: vendored runtime, models/licenses and sample score.
  Workers resolve assets relative to this app; keep the directory intact.
- `chord-*`, `practice-staff.js`, and Basic Pitch models are retained legacy
  modules covered by library tests. The UI does not load them or run practice.

HOMR checkpoint 426 and the OMR adapters use AGPL-3.0. ONNX Runtime Web 1.23.2 is
MIT; OpenSheetMusicDisplay 2.1.2 is BSD-3-Clause. Basic Pitch is Apache-2.0. Original
notices, model manifests and editable adapters remain served with the app.
Shared Bravura glyphs include their SIL Open Font License in `music-glyphs.js`.

## Verification and publication

From the site root run `npm ci --prefix _tests`, then
`node --test _tests/pitch-*.test.cjs` and `bundle exec jekyll build --trace`.
Jekyll copies the static files without an app build and excludes `_tests`.
The tests cover model inference, editing, playback, media lifecycle and both apps.
`_tests/composer-browser.html` exercises the actual sheet editor and export;
`_tests/sheet-browser.html` checks loading and the applied-sheet transport.
The pitch-specific browser harness is `_tests/editor-browser.html`.

Keep JS/CSS URLs in the HTML updated with their first 12 SHA-256 characters.
Do not replace this app with the older Playground visualizer generator output.
