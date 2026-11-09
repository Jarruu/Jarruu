---
slugId: line-follower-robot
lang: en
title: PID Line Follower Robot Control Firmware
summary: Placeholder case study for a closed-loop PID motor control firmware driving a differential-wheeled robot chassis over an 8-channel IR sensor array.
category: iot
year: 2024
role: Embedded Systems Developer
stack:
  - Embedded C
  - PID Control
  - PWM Motor Driver
  - Phototransistor Array
cover: /works/line-follower-robot.svg
coverAlt: Schematic of the PID line follower robot chassis and sensor array
featured: false
order: 4
placeholder: true
specs:
  - label: Control Loop
    value: Discrete PID (Proportional-Integral-Derivative)
  - label: Sensor Front-End
    value: 8-Channel Reflective IR Array
  - label: Drive Stage
    value: Dual H-Bridge PWM Differential Drive
---

## Control Architecture (Placeholder Template)

This entry is a structured placeholder for a robotics firmware project. Replace with actual schematic files, tuning parameters, and track test notes.

## Firmware Highlights

- **Sensor Calibration Routine:** Samples background surface and line reflectance during startup to normalize ADC readings across varying room lighting.
- **Weighted Position Estimator:** Computes lateral error from the 8-channel reflectance array and feeds a fixed-interval PID loop updating left and right PWM duty cycles.
