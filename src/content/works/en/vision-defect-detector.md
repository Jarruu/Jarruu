---
slugId: vision-defect-detector
lang: en
title: PCB Solder Defect Detection Pipeline
summary: Placeholder case study for an automated optical inspection pipeline detecting solder bridges and missing pads using OpenCV and YOLO.
category: ai
year: 2025
role: AI & Computer Vision Engineer
stack:
  - Python
  - OpenCV
  - YOLOv8
  - ONNX Runtime
cover: /works/vision-defect-detector.svg
coverAlt: Schematic diagram of the PCB solder defect computer vision pipeline
featured: true
order: 2
placeholder: true
specs:
  - label: Model Architecture
    value: YOLOv8-Nano (ONNX Export)
  - label: Input Resolution
    value: 640 x 640 px
  - label: Target Classes
    value: Solder Bridge, Missing Pad, Cold Joint
---

## Pipeline Overview (Placeholder Template)

This entry is a structured placeholder ready to be replaced with Fajar's real AI or computer vision project. It outlines how dataset preparation, model training, and inference constraints are documented.

## Inspection Workflow

1. **Frame Capture & Alignment:** Overhead camera frames are undistorted and cropped to the board fiducials using OpenCV contour registration.
2. **Object Detection:** An exported ONNX model runs inference on tiled regions to flag solder bridges, missing components, or cold joints.
3. **Operator Review UI:** Flagged bounding boxes are overlaid with confidence scores and logged to an inspection table for manual verification.
