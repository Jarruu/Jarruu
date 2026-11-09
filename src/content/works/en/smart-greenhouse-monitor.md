---
slugId: smart-greenhouse-monitor
lang: en
title: ESP32 Greenhouse Telemetry & Irrigation Node
summary: Placeholder case study for an autonomous microclimate monitoring node using ESP32, capacitive soil probes, and MQTT telemetry.
category: iot
year: 2025
role: Embedded & IoT Engineer
stack:
  - C++ (ESP-IDF / Arduino)
  - ESP32
  - MQTT
  - SHT31 Sensor
  - Relay Control
cover: /works/smart-greenhouse-monitor.svg
coverAlt: Technical block diagram of the ESP32 greenhouse telemetry node
featured: true
order: 1
placeholder: true
specs:
  - label: Microcontroller
    value: ESP32-WROOM-32D
  - label: Transport Protocol
    value: MQTT over Wi-Fi
  - label: Sensors
    value: SHT31 (I2C), Capacitive Soil Probe (ADC)
---

## System Overview (Placeholder Template)

This entry is a structured placeholder ready to be replaced with Fajar's real IoT project documentation. It illustrates how hardware architecture, firmware decisions, and test bench notes are presented on the detail page.

## Hardware Architecture

- **Controller Node:** ESP32 reading ambient temperature and humidity over I2C (`0x44`) and analog soil moisture levels through a calibrated ADC channel.
- **Actuation Stage:** Opto-isolated relay channel driving a 12V solenoid valve whenever moisture drops below the configured threshold.
- **Power & Recovery:** Watchdog timer and automatic MQTT reconnection routine so the node recovers cleanly after wireless dropouts.

## Firmware Notes

```cpp
// Sample telemetry payload format used by the node
struct TelemetryFrame {
  uint32_t timestamp_ms;
  float temp_celsius;
  float relative_humidity;
  uint16_t soil_adc_raw;
  bool valve_open;
};
```
