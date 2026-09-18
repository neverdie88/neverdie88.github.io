# Recorded piano fixtures

Salamander Grand Piano V3 by **Alexander Holm**, licensed under
[Creative Commons Attribution 3.0](https://creativecommons.org/licenses/by/3.0/).
Original instrument: <https://github.com/sfzinstruments/SalamanderGrandPiano>.

Source MP3 files: `audio/{C3,C4,Ds4,Fs4,A4,C5}v8.mp3` from
<https://github.com/tambien/Piano/tree/0cd2c034f820c53e83ab22f5c13bd490b9e4de85/audio>.
These are acoustic Yamaha C5 recordings, not synthesized sine waves.

Modified for testing: first 1.8 seconds, downmixed to mono, resampled to 22050 Hz,
and converted to 16-bit PCM WAV with FFmpeg. `piano-audio.cjs` interpolates nearby
keys and mixes recorded tones into test chords. This does not simulate a room,
device microphone, or sustain pedal. No endorsement by the authors is implied.
