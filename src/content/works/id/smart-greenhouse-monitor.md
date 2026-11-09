---
slugId: smart-greenhouse-monitor
lang: id
title: Node Telemetri & Irigasi Rumah Kaca ESP32
summary: Studi kasus placeholder untuk node pemantauan iklim mikro mandiri menggunakan ESP32, sensor tanah kapasitif, dan telemetri MQTT.
category: iot
year: 2025
role: Embedded & IoT Engineer
stack:
  - C++ (ESP-IDF / Arduino)
  - ESP32
  - MQTT
  - Sensor SHT31
  - Kendali Relay
cover: /works/smart-greenhouse-monitor.svg
coverAlt: Diagram blok teknis node telemetri rumah kaca ESP32
featured: true
order: 1
placeholder: true
specs:
  - label: Mikrokontroler
    value: ESP32-WROOM-32D
  - label: Protokol Transmisi
    value: MQTT melalui Wi-Fi
  - label: Sensor
    value: SHT31 (I2C), Probe Tanah Kapasitif (ADC)
---

## Gambaran Sistem (Template Placeholder)

Entri ini adalah placeholder terstruktur yang siap diganti dengan dokumentasi proyek IoT asli Fajar. Halaman ini mencontohkan bagaimana arsitektur perangkat keras, keputusan firmware, dan catatan pengujian ditampilkan.

## Arsitektur Perangkat Keras

- **Node Pengendali:** ESP32 membaca suhu dan kelembapan udara melalui I2C (`0x44`) serta tingkat kelembapan tanah melalui kanal ADC terkalibrasi.
- **Tahap Aktuasi:** Modul relay terisolasi opto menggerakkan katup solenoid 12V setiap kali kelembapan turun di bawah ambang batas yang ditentukan.
- **Daya & Pemulihan:** Watchdog timer dan rutinitas koneksi ulang MQTT otomatis agar node kembali berjalan normal setelah gangguan jaringan nirkabel.

## Catatan Firmware

```cpp
// Contoh struktur paket telemetri yang dikirim oleh node
struct TelemetryFrame {
  uint32_t timestamp_ms;
  float temp_celsius;
  float relative_humidity;
  uint16_t soil_adc_raw;
  bool valve_open;
};
```
