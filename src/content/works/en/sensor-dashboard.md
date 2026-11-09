---
slugId: sensor-dashboard
lang: en
title: Multi-Node Sensor Telemetry Console
summary: Placeholder case study for a lightweight web console that streams real-time serial and MQTT telemetry packets with CSV logging.
category: software
year: 2024
role: Software Engineer
stack:
  - TypeScript
  - WebSockets
  - MQTT
  - HTML5 Canvas
cover: /works/sensor-dashboard.svg
coverAlt: Waveform schematic of the multi-node sensor telemetry console
featured: false
order: 5
placeholder: true
specs:
  - label: Ingestion
    value: WebSocket Bridge from MQTT & UART Serial
  - label: Buffer Size
    value: 1,024 Rolling Samples per Channel
  - label: Export Format
    value: Timestamped CSV Log
---

## Console Overview (Placeholder Template)

This entry is a structured placeholder for a software telemetry dashboard. Replace with real interface screenshots and protocol documentation.

## System Design

- **Stream Ingestion:** Subscribes to MQTT topics or local serial bridge sockets and parses JSON or binary frames without blocking the UI thread.
- **Ring-Buffer Plotting:** Renders live sensor waveforms on a fixed-size ring buffer and exports recorded runs directly to CSV for post-experiment analysis.
