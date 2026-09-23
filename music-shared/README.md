# Shared music app assets

Used by `/pitch-visualizer/` and `/sheet-music/`. Keep this directory alongside
both apps when serving or deploying. Paths are relative and work under a site
base path.

- `base.css`: the existing shared theme and control styles.
- `pitch-core.js`: music keys, note spelling, history and monophonic detector.
  Loading it does not start audio or request a microphone.
- `music-glyphs.js`: Bravura paths with the complete SIL Open Font License notice.
- `fullscreen.js` / `fullscreen.css`: controls within `[data-music-app]`, native
  fullscreen and a modal fallback that preserves the original DOM and focus.

App-specific controllers and styles stay in their respective app directories.
