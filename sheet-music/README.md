# Sheet Music Editor

`/sheet-music/` is a separate static web app for creating, editing and playing
MusicXML scores. The microphone visualizer lives at `/pitch-visualizer/`.
Both apps use `../music-shared/`; publish all three directories together.

## Using the app

- Choose **Piano · grand staff**, **Single treble staff**, or **Single bass staff**
  and click **New sheet**. The piano template has four measures and two staves;
  the editor works on the staff/voice selected above the page. **Open MusicXML** accepts
  uncompressed score-partwise `.musicxml` or `.xml` files up to 10 MB.
- **Upload sheet photo** or **Take photo** imports a printed sheet and starts
  local recognition. First conversion downloads roughly 100 MB of models plus
  an 11 MB WASM runtime. **Load sample sheet** opens a four-measure exercise.
- The complete sheet appears immediately. **Play sheet** plays all parts using
  sampled grand piano. **Listen to** selects a particular part/staff/voice; BPM
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
  **Apply changes** replaces the displayed score; **Discard** closes the draft.
- **Save MusicXML** downloads the applied score. **Print / Save PDF** prints the
  score. The fullscreen symbols enlarge either the score or uploaded photo.

The full-window editor uses a notation toolbar, properties sidebar and white
score page inspired by desktop notation editors. Keyboard entry supports:

| Key | Action |
| --- | --- |
| N | Start/stop note entry at the selected note or beginning of the current measure |
| 1–7 | 64th, 32nd, 16th, eighth, quarter, half, whole note |
| A–G / 0 | Enter the nearest octave of a note / enter a rest, then advance |
| Shift + A–G | Add a chord tone to the selected note |
| . | Cycle zero, one or two augmentation dots |
| Left / Right | Select the previous / next group |
| Up / Down | Move the selected tone by one staff step |
| Ctrl/Cmd + Up / Down | Move the selected tone one octave |
| Ctrl/Cmd + Z / Shift + Z | Undo / redo |
| Space / Escape | Start/stop preview / leave note entry without discarding |

Entry appends a measure when needed. A note must fit inside the available rest
and measure; invalid edits leave the score unchanged. Templates and keyboard
entry cover basic notation, not the full MuseScore feature set. Imported tuplets,
grace notes and percussion retain their existing editing restrictions.

## Piano sound

Both playback controls use Salamander Grand Piano V3 recordings by Alexander
Holm (CC BY 3.0). The compact velocity-6 set contains 30 MP3 files (5.3 MiB),
hosted with the app. The first Play downloads and decodes them; later plays reuse
the audio in memory. Loading shows progress, can be stopped, and can be retried
after a connection failure. No third-party audio service is needed.

This is one recorded velocity layer, with nearby notes repitched and a short
release envelope. It has no pedal/resonance simulation, dynamic layers or
instrument switching. See `samples/piano/ATTRIBUTION.md` and `manifest.json`
for provenance, license links and file checksums.

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
- `score-playback.js`: cancellable short-lookahead Web Audio sample scheduler.
- `piano-samples.js`: lazy sample fetch/decode, caches, repitching and release.
- `editor-workspace.css`: Reader-style app shell and full-window score editor.
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
