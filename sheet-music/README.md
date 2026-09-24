# Sheet Music Editor

`/sheet-music/` is a separate static web app for creating, editing and playing
MusicXML scores. The Tools page links directly to this standalone app, without
the blog sidebar or navigation. The microphone visualizer lives at `/pitch-visualizer/`.
Both apps use `../music-shared/`; publish all three directories together.

## Using the app

- Choose **Piano · grand staff**, **Single treble staff**, or **Single bass staff**
  and click **New sheet**. The piano template has eight measures across two lines;
  tapping a note/rest or entering a note chooses the staff/voice to edit. **Open MusicXML** accepts
  uncompressed score-partwise `.musicxml` or `.xml` files up to 10 MB.
- **Upload sheet photo** or **Take photo** imports a printed sheet and starts
  local recognition. First conversion downloads roughly 100 MB of models plus
  an 11 MB WASM runtime. **Load sample sheet** opens a four-measure exercise.
- The complete sheet appears immediately. **Play sheet** plays all parts using
  sampled grand piano. **Listen to** selects a particular part/staff/voice; BPM
  accepts 30–240. Stop, changing the selection or tempo, editing, closing a sheet,
  backgrounding, and leaving the page cancel pending or active playback.
- Playback honors written order, rests, chords, ties and transposing instruments.
  Recognized pickup measures use their written length without an extra pause
  before measure 2. Older photo imports are repaired when both opening staves
  agree on the shorter length and a later full measure confirms the meter.
  It does not interpret repeat signs, dynamics, ornaments, written tempo changes
  or instrument-specific sounds. The BPM control sets the playback tempo.
- **Edit sheet** opens an isolated draft. Choose a note/rest length, then tap a
  beat and staff line/space. Use Chord to stack tones, Eraser to remove a tone,
  or Select to drag/change pitch, duration, dots and accidentals.
  Selecting one note or rest reveals a **Note properties** symbol row below
  **Notation**: no/single/double dots, natural, sharp, flat, double sharp/flat,
  and restore the key signature. Accidentals affect only the selected chord
  tone; dots change its rhythmic group. A rectangle containing one note also
  exposes the row. The sidebar holds score settings only.
  The **Rest** symbol beside **F clef** enters rests using the selected length.
  **Transpose − / +** moves the whole score down or up by one semitone per
  click. It updates notes, key signatures and chord symbols across all
  parts, staves and voices. Rhythm, rests, ties and clefs remain intact; Undo
  restores the whole score. Arrow keys still move selected notes one staff
  step; Ctrl/Cmd + ↑/↓ moves the selection an octave.
- With **Select**, tapping blank space clears the note selection; measures
  are no longer clickable selections or highlighted boxes.
  Drag from blank space to draw a rectangle and select the noteheads inside it,
  including individual chord tones and notes across staves or rows. Dragging
  directly on a note still changes its pitch. No modifier key is required.
- Editing and the applied sheet use the same OpenSheetMusicDisplay engraving:
  proper noteheads, rests, chord spacing, automatic beams and accidentals.
  Both piano staves appear together; clicking a note or entering on a staff
  selects that staff/voice. Empty measures remain separate and editable.
- New piano scores start with two grand-staff lines of four measures each.
  **Add line** appends four measures on a new line, keeping all staves and parts
  together. It selects the new line and can be undone in one step. Explicit
  line breaks survive Apply, MusicXML export and reopening; narrow screens may
  wrap a line further so the notation still fits.
- In **Select**, tap a G or F clef on the score to switch between them. To insert
  a change, choose **G clef** or **F clef** beside Whole/Half/etc., then tap a
  note/rest or the beginning of a measure. Placement snaps to a written onset;
  repeat at a later point to change back. Repeated clefs at new lines can also
  be tapped to create a change there. Every change supports Undo/Redo.
  Clef changes preserve sounding pitches and the other staff. A change at a
  measure's beginning is drawn inside that measure, after its left barline.
- **Play selection** plays only selected notes, preserving their rhythm and
  simultaneous notes across both staves. A tapped chord tone plays alone.
  Playback starts at the first selected note and ends after the last, retaining
  gaps between them; ties extend only across selected, contiguous notes.
  Selection remains highlighted after playback or Stop. Clear the selection
  to use the playback range. Click **Set start**, then click the first measure
  on the sheet. Click **Set end**, then click the final measure; End is inclusive.
  Blue **Start** and amber **End** markers span the staves at the chosen bars.
  The same controls work beside **Play sheet** in the applied score. Either
  staff, a note or blank measure space can set the boundary while its button
  is active. Escape, clicking the active button again, or changing editing
  tools cancels an unfinished choice. Keyboard users can Tab to a measure
  target and press Enter/Space. A drag does not commit an editor boundary.
  **Whole sheet** resets both boundaries; setting only Start plays to the end.
  Choosing a boundary clears note selection and stops playback. Selecting notes
  afterward makes Play use just those notes. Range changes do not edit MusicXML.
  Rests inside the range are preserved, ties entering Start are reattacked, and
  ties stop at End. New sheets and reopened drafts start with the full range.
  During editor playback, all sounding notes turn green together across both
  staves; each returns to its normal or selected color when its duration ends.
- Add line and Zoom remain above the score. Staff/voice and editing-measure dropdowns,
  measure arrows, Add measure, and the sidebar clef selector have been removed.
  Tap a note or rest to choose the editing position and staff. Keyboard note entry still
  appends a measure when needed.
- **Eraser** removes a tapped note or chord tone. Drag a rectangle to highlight
  notes, then release to erase them together. Only noteheads inside the rectangle
  are erased; other chord tones and existing rests stay intact. Erased notes
  become rests where needed, preserving the timing of both staves. Each gesture
  is one undo step; Escape or an interrupted pointer cancels an unfinished box.
  In Select, Shift-click selects a range; Ctrl/Cmd-click toggles notes.
  Delete selected erases a multiple-note selection with timing preserved;
  deleting a single selected group retains the existing ripple behavior.
  Undo/Redo retains 50 draft edits.
  **Apply changes** replaces the displayed score; **Discard** closes the draft.
- With **Eraser**, tap an accidental sign to restore the preceding accidental
  for that pitch in the measure, or the key signature if none precedes it.
  Tap a clef change to remove it and continue the earlier clef. Notes and timing
  stay intact, and each edit supports Undo. The initial clef is required; use
  Select tool to switch it, or insert a clef at the beginning. Rectangle erasing
  targets notes only.
- **Save MusicXML** downloads the applied score. **Print / Save PDF** prints the
  score. The fullscreen symbols enlarge either the score or uploaded photo.
- The applied score fills its container with minimal padding and follows the
  music's height. It re-engraves at the container width, using smaller notation
  below 900 and 500 pixels, and reflows when entering fullscreen or resizing.
  Imported MusicXML lyrics use compact spacing; photo recognition does not
  create lyrics or chord names.

The full-window editor uses a notation toolbar, properties sidebar and white
score page inspired by desktop notation editors. It uses its own MusicXML edit
model with OSMD/VexFlow engraving, rather than the native MuseScore application.
Keyboard entry supports:

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

Recognition is experimental: use flat, well-lit printed music.
The detector corrects up to four degrees of skew, not perspective or page curves.
It fits all five lines together so rounding during reduction does not reject
regular staves. A shared left barline/brace identifies connected staves. The
default **All staves · auto layout** preserves two-staff systems as grand-staff
rows; **Grand staff · paired rows** allows an explicit override for faint braces.
**Single-staff rows in sequence** and individual-staff recognition remain available.
Both grand-staff lanes share divisions, measure positions and system breaks;
unequal recognized bar counts fail explicitly instead of dropping a staff.
Lyrics and chord names are not imported. Ensemble layouts with more than two
simultaneous staves need MusicXML import. Handwriting is not validated.
Time signatures are inferred; review notation and
rhythm. A failed/canceled replacement leaves the current score and export intact.
Compressed MXL, PDF import, score-timewise XML and arbitrary handwritten music
are unsupported. `recognition.html` provides user guidance and limits;
`credits.html` keeps license notices, source links and technical provenance.

## Source map

Clef edits write explicit staff numbers in ascending order, including staff 1.
`ScoreEngraver.loadScore` normalizes clef numbering/order on a copy of imported
MusicXML, so older mixed numbered/unnumbered clefs render correctly without
rewriting the saved score. After OSMD loads, it relocates measure-start clef
instructions from the previous measure's end to their own measure's start.
Both views share this path. Clef and accidental hit regions use VexFlow glyph
metrics, while note hit regions remain tied to notehead positions.

- `sheet-controller.js`: photo recognition worker lifecycle, stale-result
  protection, lazy OSMD loading, transactional replacement, editing/export/print.
- `sheet-player.js`: applied-score transport and combining staff/voice timelines.
- `score-playback.js`: cancellable short-lookahead Web Audio sample scheduler.
- `piano-samples.js`: lazy sample fetch/decode, caches, repitching and release.
- `editor-workspace.css`: standalone app layout and full-window score editor.
- `sheet-photo.js`: local camera/files, rotation and cleanup; emits `vp:photo`.
- `score-editor.js`: draft lifecycle, settings, apply/cancel and keyboard undo.
- `score-editor-model.js`: MusicXML-preserving edits, rest splitting, note timing,
  ties, staff signatures, transposition, history and playback timelines.
  Attribute context follows musical time across voices; clefs can change within
  a measure. Added lines write matching MusicXML system breaks in every part.
- `score-engraver.js`: shared lazy OSMD loading and rendering options, full-part
  editor engraving, note-to-model coordinate mapping and selection overlays.
  Render requests are serialized and stale results cannot replace newer edits.
  The coordinate adapter uses the pinned OSMD 2.1.2 graphical/VexFlow objects;
  run the real engraving tests before updating that dependency.
- `composer-controller.js` / `composer-staff.js`: pointer/keyboard selection,
  note entry, interpolation between engraved beat positions, hit testing,
  palettes and draft preview. They do not draw replacement notation.
- `music-score.js`: score-partwise note extraction; its legacy follower is unused.
- `omr-engine.js`, `omr-musicxml.js`, `omr-worker.js`: HOMR preprocessing, ONNX
  inference, five-line fitting, connected-system detection, single/grand-staff
  conversion, local model caching and checksums. Grand-staff conversion carries
  per-staff clefs/keys across rows and rewinds the MusicXML cursor before the
  lower staff; all rows use shared duration divisions.
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
Engraving tests use the actual bundled OSMD and native Canvas font/raster support
in Node, including engraved-note hit positions, grand staves, chord displacement,
  rests, beams, cancellation and identical paths in edit/display modes. These are
  headless SVG/interaction tests, not a browser audio or physical-webcam playtest.
  They also cover grand-staff rows, line export/undo, mid-measure clefs and input
  pitch mapping on each side of a clef change.
`_tests/composer-browser.html` exercises the actual sheet editor and export;
copy it to `_site/` after building to run the browser checks. Its optional
pickup-timing check expects the six-measure photo-import fixture at
`_site/editor-pickup-source.musicxml` (a 1.5-beat opening bar in 3/4, without
an explicit pickup flag). It checks sampled-piano scheduling in both players.
`_tests/sheet-browser.html` checks loading and the applied-sheet transport.
The pitch-specific browser harness is `_tests/editor-browser.html`.

Keep JS/CSS URLs in the HTML updated with their first 12 SHA-256 characters.
Do not replace this app with the older Playground visualizer generator output.
