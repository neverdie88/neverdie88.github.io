# Sheet Music Practice

This directory is the source for the GitHub Pages `/pitch-visualizer/` route.
It is a static browser app: microphone processing, photo recognition, MusicXML
rendering, and practice all run on the user's device. No API key or server is used.

## Use

- **Free play** is the initial mode. Start the microphone to see the pitch trace,
  played noteheads and note names, with no sheet required. Choose **Staff** (treble
  or bass) and **Scale** (major or minor). Free play tracks one pitch at a time.
  **Follow sheet** opens the sheet tools. Switching modes pauses practice and keeps
  the loaded score, practice position, and free-play staff/scale selections.
- **Upload sheet photo** or **Take photo** opens a photo and automatically converts
  it to digital notation. The first conversion downloads approximately 100 MB of
  models plus an 11 MB WebAssembly runtime. Models are cached if browser storage
  permits; images and scores are not persisted. **Cancel conversion** stops the
  worker. Rotate the photo to retry; **Convert photo again** uses the selected
  staff line. All lines are joined top to bottom as one instrument.
  The current sheet and paused practice position remain available until the new
  score renders successfully, including after a failed or canceled conversion.
- **Open MusicXML** reads an uncompressed `.musicxml` or `.xml` score, including
  multiple parts and voices. Compressed `.mxl`, PDF input, and score-timewise XML
  are not supported. **Save MusicXML** downloads the complete displayed score;
  including changes applied in the editor. **Print / Save PDF**
  opens the browser's print dialog with the score only.
- In **Follow sheet**, loading a score opens **Practice with sheet**. Select an instrument/staff and
  start practice to request the microphone, or use an already running microphone.
  The current note or chord sits in the middle, with upcoming groups to its right
  and the live pitch traces to its left. A matching note within 35 cents held
  for 250 ms disappears. Play piano chords together, or play each tone individually
  in any order. Matched tones fade to transparent light grey. Once every tone is
  matched, the chord disappears and the next group slides into the middle.
- **Load sample sheet** opens an original four-measure exercise with single notes,
  repeated notes, two-note chords, and three-note chords (11 groups, 17 tones).
  **View full sheet** opens the complete notation for review. Save and print work
  for the sample as well as imported scores.
- **Edit sheet** opens a staff composer. Choose **Note**, a length from the
  symbol palette, then tap a beat and staff line/space. New notes split rests
  without moving the other voices. Choose **Rest** for rests, **Chord** and tap
  above/below a note to add a tone, or **Eraser** to remove an individual tone.
  Erasing a single note leaves a rest so the remaining notes keep their timing.
- **Select** a note or chord to edit it. The palette shows its current length;
  choosing **Quaver** (eighth note), Whole, Half or another length changes the
  entire group immediately. **Dots** changes that group's duration. **Accidental**
  applies to the selected tone, including inside a chord. Drag a pitch vertically
  or use Arrow Up/Down. Choose **Note** to clear the selection and set input
  values for more notes. **In key** stays key-aware during continuous note/chord
  entry; it does not inherit the previous tone's sharp or natural. Length changes shift later notes in the same voice;
  overfull measures show a warning.
- The score wraps into rows to fit the editor. Scroll down to see later measures;
  Zoom changes how many measures fit per row. Dense notation can still require
  horizontal scrolling. On small screens, swipe the tool rows horizontally to
  reach the remaining controls. Reopening the editor shows the first measure.
  Choose a part/staff/voice when the score contains more
  than one. **Add measure** extends that part and scrolls to the new row;
  **New sheet** starts a blank score.
- **Staff** and **Scale** are visible above the sheet. They apply from the selected
  staff and measure until the next written change. Changing the clef or key does not
  transpose existing notes. **Sheet settings** contains the title and meter.
- **Select multiple** lets you tap notes/chords to toggle a group, drag a box, or
  Shift-click a range across rows. Ctrl/Cmd-click adds/removes groups, and
  Ctrl/Cmd-A while the staff has focus selects all displayed groups in this lane.
  **Delete selected** (or Delete/Backspace) removes whole highlighted groups,
  closes the gaps in their voice within each measure, and preserves other voices.
  One Undo restores the whole deletion. **Clear** or Escape clears selection.
- **Play preview** uses a simple synthesized tone for the selected staff/voice.
  Preview BPM controls playback from 30 to 240 BPM; it does not alter written
  tempo markings. Playback uses written order, rests, chords, ties and sounding
  pitch for transposing instruments. Repeat signs, dynamics, ornaments, and
  instrument-specific sounds are not interpreted. Stop, edits, closing the editor
  and hiding the page stop playback. Audio is neither recorded nor uploaded.
- Chord tones share one stem; adjacent pitches and accidentals are separated.
  **View full sheet** outside the editor opens the complete notation. Direct
  pitch entry supports treble and bass clefs. Creating tuplets, ties, lyrics,
  parts and voices is outside this editor's current scope.
- **Undo/Redo** retains 50 draft edits. **Apply changes** updates the practice
  sheet and export and restarts practice; **Cancel** discards the draft. Use
  **Save MusicXML** to keep work across reloads. Original files are unchanged.
  The editor preserves untouched parts, voices and metadata. Correcting a tied
  pitch updates connected ties; deleting it cleans adjacent ties. Rhythm edits
  adjust following voice backups to preserve their onset. Grace-note, tuplet,
  and percussion rhythm changes are disabled.
- Repeated notes require a release or different pitch for 120 ms. Pause, restart,
  and skip are available. Stopping/disconnecting the mic or hiding the page pauses
  practice. A4 calibration applies to matching. Practice follows sounding pitch
  for transposing instruments and written order once. Simultaneous attacks across
  voices on the same staff become one chord, with duplicate pitches counted once.
  Chord targets automatically use polyphonic microphone detection; single-note
  targets keep the fast YIN detector. No extra hardware or input-mode selection
  is needed. Rests, grace notes, tie continuations, unpitched percussion,
  microtones, and notes outside A0–C8 are skipped. Rhythm is not graded.

Chord listening uses Spotify Basic Pitch in a Web Worker. Its 230 KB model and
the shared 11 MB WASM runtime load when the microphone starts with a chord score.
Audio stays in memory on the device, with only one short window in flight; it is
never uploaded or saved. A load/runtime error shows **Retry chord listening**.
Hold chords briefly in a quiet room. Recognition is experimental: octave doubling,
dense voicings, soft tones, room noise, and sustain-pedal overlap can hide notes.
Octave doubling was a known miss in recorded-piano testing; playing the missed tone
separately remains supported. Contour-based chord tuning is an estimate, less
precise than single-note YIN. Chord feedback includes about 120 ms of audio context
plus processing and the 250 ms hold. This remains practice for one selected staff,
not combined two-hand grand-staff practice.

Photo recognition is experimental. Use clear printed single-staff music on a flat,
evenly lit page. The staff detector corrects up to four degrees of skew; it does
not undo page curvature or perspective. For piano/ensemble pages select one staff
line; the app does not reconstruct systems or assign instruments across a page.
Time signatures are inferred from measure lengths. Notes, accidentals, rhythms,
ties, ornaments, and repeat endings need review. Multi-measure rests and sequences
that exceed the checkpoint's 608-symbol capacity fail with a useful error instead
of silently exporting an incomplete score. Handwriting is not validated.

Photos over 30 MB are rejected. Accepted images are decoded, oriented by the
browser, and rasterized to JPEG with a maximum long edge of 4096 pixels. JPG, PNG,
and WebP work; HEIC depends on browser support. Original files are never changed.
Camera preview requests rear-facing video without audio and stops on capture,
cancel, backgrounding, navigation, or disconnection. Native camera capture is a
fallback. Camera and mic require HTTPS/localhost and browser permission.

## Source and dependencies

- `index.html`: existing pitch detector, music glyphs, microphone loop, and app UI.
  Only fresh microphone frames emit `vp:pitch`; repainting/calibration never does.
- `chord-engine.js`: low-pass resampling and A4 normalization, Basic Pitch ONNX
  inference, probability filtering, and timestamped multipitch frames. Padded
  audio is excluded; each semitone's central contour bin is `3 * noteIndex + 1`.
- `chord-worker.js`: model/hash loading and inference using the existing WASM
  runtime. `chord-listener.js`: one in-flight window, reset epochs, duplicate/stale
  result rejection, timeouts, and worker shutdown. Pausing, changing targets,
  calibration, restarting, and closing cannot reuse old recognition results.
  `vp:chords` carries audio-timestamped frame batches to the practice controller;
  it stops consuming a batch once a target advances. `vp:chord-status` reports
  loading/failures. The worker starts only with a microphone and a chord score,
  runs inference only on chord targets, and terminates when either is closed.
- `sheet-photo.js`: camera, file decoding, photo transforms; emits `vp:photo` after
  successful replacement/rotation and `null` on removal.
- `omr-engine.js`: grayscale normalization, staff detection, and HOMR autoregressive
  ONNX inference. `omr-musicxml.js`: recognized symbols to MusicXML.
- `omr-worker.js`: model fetching/hash validation, browser caching, and inference.
  Single-thread WASM needs no cross-origin isolation headers and runs on Pages.
- `music-score.js`: MusicXML event extraction and deterministic pitch follower.
- `practice-staff.js`: shared SVG staff, written target notes/chords, per-tone
  matching feedback, and the pitch trace. The microphone app animates the queue
  when a group completes.
- `score-practice.js`: worker lifecycle, stale-result protection, lazy OSMD loading,
  full-score rendering, practice controls, downloads, and print. Publishes
  `vp:practice` snapshots to the microphone app. It owns the explicit mode switch,
  preserves paused progress in Free play, and renders replacement scores before
  discarding the previous score. A null snapshot restores live notation; it is
  published once when leaving sheet mode to avoid resetting the free-play trace.
- `score-editor-model.js`: transactional MusicXML DOM edits, draft history, tie
  maintenance, rest splitting, timing-safe note placement and preview events. It retains original XML instead of rebuilding a
  score from the follower's simplified events.
- `score-editor.js`: isolated draft lifecycle, sheet settings,
  apply/cancel and keyboard undo. Only Apply calls the score loader.
- `composer-controller.js`: note palette, staff/voice selection, pointer capture,
  selected pitch/rhythm/accidental editing, range and box selection, bulk delete,
  pitch drag, erase, zoom and preview transport. Pointer cancellation never edits
  the draft. A drag commits one model change on release.
- `composer-staff.js`: SVG input staff, measure/beat geometry, key-aware pitch
  coordinates, responsive row layout and chord-tone hit testing. Uses the
  existing music glyphs.
- `score-playback.js`: short-lookahead Web Audio scheduler, note envelopes,
  playback cursor and cancellation of active/pending audio sessions.
- `samples/notes-and-chords.musicxml`: the built-in practice exercise.
- `models/`: HOMR checkpoint 426 (AGPL-3.0), weights, vocabulary, and SHA-256 hashes.
  The three OMR adapters are provided under AGPL-3.0. See `recognition.html` for
  upstream attribution, license links, and complete browser-adapter source.
- `models/basic-pitch/`: Spotify's ICASSP 2022 ONNX model (Apache-2.0), pinned
  source revision and hash in `manifest.json`, and its original license.
- `lib/`: vendored ONNX Runtime Web 1.23.2 (MIT) and OpenSheetMusicDisplay 2.1.2
  (BSD-3-Clause). Runtime dependencies require no CDN requests. Keep these under
  `lib`, since the repository ignores/excludes directories named `vendor`.

Edit this directory directly. The older Playground project generated the original
page; copying its output over this directory would overwrite these additions.
There is no npm build for the visualizer. Jekyll copies its static assets as-is.
Each model is below GitHub's 100 MB per-file limit; keep the weights as ordinary
static files, not Git LFS pointers, so Pages can serve them.

## Verification

```sh
npm ci --prefix _tests
node --test _tests/pitch-*.test.cjs
bundle exec jekyll build --trace
python3 -m http.server 8779 --bind 127.0.0.1
```

Open `http://127.0.0.1:8779/pitch-visualizer/`. The Node tests include real WASM
inference against a printed-score fixture and check the exported melody, plus
staff segmentation, MusicXML timing/polyphony, live synthetic microphone signals,
partial chord matching, repeated pitches, queue movement, cancellation races, and
simulated camera/media permissions. The chord suite runs real Basic Pitch WASM
against licensed acoustic piano recordings, mixed into simultaneous chords; it
checks missing/wrong tones, octave-harmonic false positives, A4 calibration,
44.1/48 kHz input, silence, repeated chords, and stale worker results. See
`fixtures/piano/README.md` under `_tests` for recording provenance.
The browser check at
`http://127.0.0.1:8779/_tests/practice-browser.html` drives the real sample and pitch
detector using synthetic audio, with controls for a partially matched chord,
completion, and a narrow viewport. It does not access a physical microphone.
`http://127.0.0.1:8779/_tests/chord-browser.html` instead feeds recorded piano
audio into the production microphone loop and real browser worker, and checks
simultaneous two/three-note chords, partial/sequential matches, and multiple traces.
`http://127.0.0.1:8779/_tests/editor-browser.html` checks Free play with synthetic
A3 audio, mode switches and a 390 px viewport. The Node editor suite checks ties,
multiple voices/staves, unaffected parts, invalid edits and failed-apply recovery.
`http://127.0.0.1:8779/_tests/composer-browser.html` checks direct pointer entry,
chord stacking, pitch dragging, erasing, rest/accidental input, keyboard edits,
canceled touch drags, real Web Audio pitches, preview stop, Cancel and MusicXML
export. Its editing check also verifies that the first notes are visible and
unobscured after reopening a score, including at 390 px. Chord layout checks reproduce the five-note chord from the reported
screenshot, along with downward stems and flagged chords.
The Node composer tests cover rest splitting, undo atomicity, rejected overlap,
staff-only editor open/cancel/apply, other-voice preservation, ties/transposition,
chord stems and displaced-head
hit testing, geometry and audio cancellation.
`pitch-composer-controls.test.cjs` uses jsdom to run the actual editor and
composer controllers together. It checks selected accidentals and chord lengths,
dots, continuous note entry, later-row input, visible signatures, selection by
tap/range/box, canceled gestures, deletion/undo and saved MusicXML. SVG coordinate
transforms and pane sizes are supplied because jsdom does not perform layout.
The review regressions also cover staff/voice switching, per-staff signatures and
transposition, additive meters, natural-sign cancellation, half-rest placement,
scrolling to new measures, pending/failed audio startup, and preserving the current
sheet after failed or canceled photo recognition. Staff-scoped MusicXML handling
follows the W3C [key](https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/key/)
and [transpose](https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/transpose/)
definitions.
`_tests/` and its development dependencies are excluded from the deployed site.

Verified in Chrome on macOS: photo upload through the native chooser, actual
worker inference, notation display, and MusicXML download with its saved pitches
checked, plus a PDF export opened and visually inspected. The synthetic-audio
browser check verified partial chord fading, removal and centering after
completion, and the layout at a 390 px viewport width.
The recorded-piano browser check also verified simultaneous two/three-note chord
completion and separate traces, plus missing-tone and sequential-tone matching at
390 px. Free play shows the live note and trace with staff/scale choices, and the
staff composer checks cover note/chord entry, eraser/rest/accidental input,
undo/redo, keyboard edits, canceled pointer gestures, playback, Cancel/Apply and
saved MusicXML at desktop and 390 px. Note details and the editor's engraved
preview have been removed. A native mouse drag and undo were checked on the
390 px layout; touch events were simulated through the actual pointer handlers.
Physical touch hardware was not used. All 69 automated tests pass.
The 2026-09-18 review reran the full suite (including real HOMR and Basic Pitch
WASM), the Jekyll build, and Chrome checks for editing/selection at desktop and
390 px, chord layout, Web Audio preview, practice integration and MusicXML export.
No physical instrument was used in these
checks: recorded piano audio was supplied at the microphone boundary.
Physical camera quality and real instrument/microphone matching still depend on
the device and browser. Changes in this directory are local until committed and
published through Pages.

Editor CSS/JS URLs in `index.html` include the first 12 SHA-256 characters of each
file as `?v=...`. Refresh those values when changing editor assets so a regular
page reload does not mix a new UI with an older cached controller.
