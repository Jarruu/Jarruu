---
slugId: line-follower-robot
lang: id
title: Firmware Kendali PID Robot Line Follower
summary: Studi kasus placeholder untuk firmware kendali motor PID lup tertutup pada sasis robot beroda diferensial dengan larik sensor IR 8-kanal.
category: iot
year: 2024
role: Embedded Systems Developer
stack:
  - Embedded C
  - Kendali PID
  - Driver Motor PWM
  - Larik Fototransistor
cover: /works/line-follower-robot.svg
coverAlt: Skematik sasis robot line follower PID dan larik sensor
featured: false
order: 4
placeholder: true
specs:
  - label: Lup Kendali
    value: PID Diskrit (Proportional-Integral-Derivative)
  - label: Sensor Depan
    value: Larik IR Reflektif 8-Kanal
  - label: Penggerak
    value: Penggerak Diferensial PWM Dual H-Bridge
---

## Arsitektur Kendali (Template Placeholder)

Entri ini adalah placeholder terstruktur untuk proyek firmware robotika. Ganti dengan skematik rangkaian asli, parameter penalaan, dan catatan uji lintasan.

## Sorotan Firmware

- **Rutinitas Kalibrasi Sensor:** Mengambil sampel pantulan permukaan lintasan dan garis saat inisialisasi untuk menormalisasi pembacaan ADC terhadap variasi cahaya ruangan.
- **Estimator Posisi Berbobot:** Menghitung simpangan lateral dari larik sensor 8-kanal dan memasukkan nilainya ke lup PID berinterval tetap untuk memperbarui siklus kerja PWM roda kiri dan kanan.
