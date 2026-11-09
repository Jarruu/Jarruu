---
slugId: voice-command-esp32
lang: en
title: On-Device Voice Command Node on ESP32
summary: Placeholder case study for an offline keyword-spotting node capturing digital audio over I2S and running quantized neural network inference.
category: ai
year: 2024
role: Embedded AI Engineer
stack:
  - C++
  - TensorFlow Lite Micro
  - ESP32
  - I2S Digital Audio
cover: /works/voice-command-esp32.svg
coverAlt: Technical diagram of the ESP32 I2S audio keyword spotting pipeline
featured: false
order: 6
placeholder: true
specs:
  - label: Audio Input
    value: INMP441 MEMS Microphone (I2S, 16 kHz)
  - label: Feature Extraction
    value: 40-Bin MFCC SpectrogramSlices
  - label: Model Format
    value: Int8 Quantized Convolutional Network
---

## Edge AI Architecture (Placeholder Template)

This entry is a structured placeholder combining embedded firmware and machine learning. Replace with real training notebooks, confusion matrices, and hardware photos.

## Signal Processing Chain

- **DMA Audio Capture:** Reads 16 kHz mono audio frames directly from an I2S MEMS microphone using double-buffered DMA transfers.
- **MFCC & Int8 Inference:** Converts rolling audio windows into Mel-frequency cepstral coefficients and evaluates command probabilities locally on the microcontroller without cloud dependency.
