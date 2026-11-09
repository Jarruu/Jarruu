---
slugId: sensor-dashboard
lang: id
title: Konsol Telemetri Sensor Multi-Node
summary: Studi kasus placeholder untuk konsol web ringan yang menampilkan aliran paket telemetri serial dan MQTT secara langsung beserta ekspor CSV.
category: software
year: 2024
role: Software Engineer
stack:
  - TypeScript
  - WebSockets
  - MQTT
  - HTML5 Canvas
cover: /works/sensor-dashboard.svg
coverAlt: Skematik gelombang konsol telemetri sensor multi-node
featured: false
order: 5
placeholder: true
specs:
  - label: Akuisisi Data
    value: Jembatan WebSocket dari MQTT & UART Serial
  - label: Ukuran Buffer
    value: 1.024 Sampel Bergulir per Kanal
  - label: Format Ekspor
    value: Berkas CSV Berstempel Waktu
---

## Gambaran Konsol (Template Placeholder)

Entri ini adalah placeholder terstruktur untuk dashboard telemetri perangkat lunak. Ganti dengan tangkapan layar antarmuka asli dan dokumentasi protokol.

## Desain Sistem

- **Akuisisi Aliran Data:** Berlangganan topik MQTT atau soket jembatan serial lokal dan mengurai paket JSON maupun biner tanpa menghambat thread antarmuka.
- **Visualisasi Ring-Buffer:** Menggambar grafik gelombang sensor langsung pada buffer berukuran tetap serta mengekspor hasil rekaman ke berkas CSV untuk analisis pasca-eksperimen.
