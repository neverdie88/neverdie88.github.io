# Sunny Bites character voices

These original game dialogue clips were generated locally with the Kokoro-82M
v1.0 model and `kokoro-onnx` 0.6.1. They are synthesized character voices rather
than recordings of a particular person. The game ships only the MP3 clips, not
the inference model or its voice tensors. It makes no speech API requests.

Model author and model card: [hexgrad/Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M).
The model weights are licensed under Apache License 2.0, as stated by the model
card. The ONNX model conversion and Python runtime are from
[thewh1teagle/kokoro-onnx](https://github.com/thewh1teagle/kokoro-onnx), whose code
is licensed under MIT. Source licenses:
[Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0) and
[kokoro-onnx MIT license](https://github.com/thewh1teagle/kokoro-onnx/blob/main/LICENSE).

`manifest.json` records every original line, its spoken money wording, voice,
generation speed, source-model hashes, audio-file hashes, duration, and measured
signal levels. Money such as `$10.00` is spoken as "ten dollars". The clips have
light silence trimming and normalization to a target of -20 LUFS / -2 dB true
peak, then mono 24 kHz MP3 encoding. Short checkout thank-you lines are kept
within the customer handover window.
