# Little Table customer voices

The original dialogue in these recordings was synthesized locally using
Kokoro-82M v1.0 through kokoro-onnx 0.6.1. These are character voices, not
recordings of a named person.

Model project: [hexgrad/Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M).
ONNX conversion and generation runtime:
[thewh1teagle/kokoro-onnx](https://github.com/thewh1teagle/kokoro-onnx).

The game includes 136 original speech clips for four customers. It ships only
the MP3 recordings, without the model or voice tensors, and makes no speech API
requests. `manifest.json` records text, voice settings, model hashes, audio
hashes, duration and signal measurements. The `auditions/` folder contains
one short sample per customer.

The development project includes `scripts/generate-kokoro-voices.py` and
`scripts/export-kokoro-lines.mjs` for reproducible offline generation.
