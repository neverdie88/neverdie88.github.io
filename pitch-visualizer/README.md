# Pitch Visualizer

The `/pitch-visualizer/` app listens to one pitch at a time through the microphone.
Choose treble/bass staff, a major/minor scale, and A4 tuning from 400–480 Hz.
Tap/click the staff, or focus it and press Enter/Space, to switch clefs.
The SVG itself receives pointer input; its frequently replaced drawing children
do not intercept presses, so switching continues while the microphone redraws it.

**Blue pitch lines** starts enabled. These curves trace changes in detected
pitch, including vibrato and slides. The toggle only shows or hides the curves;
notes, note history and the live pitch marker stay visible. History continues
scrolling while the curves are hidden, and turning them back on shows the current
eight-second window. The microphone continues running through these changes.
The fullscreen symbol expands the staff; the same symbol or Escape exits.

Sheet imports, photos, editing, playback and recognition are a separate app at
`/sheet-music/`. None of its controllers, models or rendering libraries are loaded
by this page. Keep the pitch page focused on microphone input.

- `index.html`: page structure and controls.
- `app.js`: microphone lifecycle, detection, staff rendering and pitch-line visibility.
- `styles.css`: pitch-specific styling.
- `../music-shared/`: common styles, music theory/detector functions, licensed
  music glyphs and fullscreen controls. Both apps require this directory.

Audio stays in browser memory and is neither saved nor uploaded. Microphone
access requires HTTPS or localhost and browser permission. Disconnecting,
backgrounding or leaving the page stops capture. There is no API key or backend.

Run `node --test _tests/pitch-*.test.cjs` from the site root, then build Jekyll.
`_tests/editor-browser.html` checks the actual microphone loop using synthetic
signals and verifies the pitch-only page at desktop and 390 px widths, including
stable staff hit targets across microphone redraws. These
checks do not establish accuracy with a physical instrument or microphone.
Refresh `?v=` SHA-256 hashes in the HTML when changing local JS/CSS assets.
