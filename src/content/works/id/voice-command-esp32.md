---
slugId: voice-command-esp32
lang: id
title: Node Perintah Suara Lokal pada ESP32
summary: Studi kasus placeholder untuk node pengenalan kata kunci suara luar-jaringan menggunakan mikrofon digital I2S dan inferensi jaringan saraf terkuantisasi.
category: ai
year: 2024
role: Embedded AI Engineer
stack:
  - C++
  - TensorFlow Lite Micro
  - ESP32
  - Audio Digital I2S
cover: /works/voice-command-esp32.svg
coverAlt: Diagram teknis pipeline pengenalan kata kunci audio I2S pada ESP32
featured: false
order: 6
placeholder: true
specs:
  - label: Input Audio
    value: Mikrofon MEMS INMP441 (I2S, 16 kHz)
  - label: Ekstraksi Fitur
    value: Potongan Spektrogram MFCC 40-Bin
  - label: Format Model
    value: Jaringan Konvolusional Terkuantisasi Int8
---

## Arsitektur Edge AI (Template Placeholder)

Entri ini adalah placeholder terstruktur yang memadukan firmware sistem tertanam dan pembelajaran mesin. Ganti dengan notebook pelatihan, matriks konfusi, dan foto perangkat asli.

## Rantai Pemrosesan Sinyal

- **Akuisisi Audio DMA:** Membaca sinyal audio mono 16 kHz langsung dari mikrofon MEMS I2S menggunakan transfer DMA buffer ganda.
- **Inferensi MFCC & Int8:** Mengubah jendela audio bergulir menjadi fitur MFCC dan mengevaluasi probabilitas kata perintah secara lokal di mikrokontroler tanpa ketergantungan server.
