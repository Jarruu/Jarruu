---
slugId: vision-defect-detector
lang: id
title: Pipeline Deteksi Cacat Solder PCB
summary: Studi kasus placeholder untuk pipeline inspeksi optik otomatis yang mendeteksi jembatan solder dan pad kosong menggunakan OpenCV dan YOLO.
category: ai
year: 2025
role: AI & Computer Vision Engineer
stack:
  - Python
  - OpenCV
  - YOLOv8
  - ONNX Runtime
cover: /works/vision-defect-detector.svg
coverAlt: Diagram skematik pipeline computer vision pendeteksi cacat solder PCB
featured: true
order: 2
placeholder: true
specs:
  - label: Arsitektur Model
    value: YOLOv8-Nano (Ekspor ONNX)
  - label: Resolusi Input
    value: 640 x 640 px
  - label: Kelas Target
    value: Jembatan Solder, Pad Kosong, Solder Dingin
---

## Gambaran Pipeline (Template Placeholder)

Entri ini adalah placeholder terstruktur yang siap diganti dengan proyek AI atau computer vision asli Fajar. Bagian ini merinci penyiapan dataset, pelatihan model, dan skema inferensi.

## Alur Inspeksi

1. **Akuisisi & Penyelarasan Citra:** Citra kamera dari atas dikoreksi distorsinya dan dipotong sesuai tanda fidusial papan menggunakan registrasi kontur OpenCV.
2. **Deteksi Objek:** Model ONNX menjalankan inferensi pada area papan untuk menandai jembatan solder, komponen hilang, atau sambungan solder dingin.
3. **Antarmuka Verifikasi:** Kotak deteksi ditampilkan bersama nilai keyakinan (confidence) dan dicatat ke tabel inspeksi untuk pemeriksaan teknisi.
