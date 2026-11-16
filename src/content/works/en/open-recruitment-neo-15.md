---
slugId: open-recruitment-neo-15
lang: en
title: UKM Neo Telemetri 15th Open Recruitment Platform
summary: Large-scale web recruitment backend managing registration, static QRIS payments, online exams, attendance, bootcamp grading, and real-time graduation announcements.
category: software
year: 2026
role: Backend Engineer
stack:
  - Nest.js
  - PostgreSQL
  - Redis
  - Static QRIS
cover: ../../../assets/works/or-neo.webp
coverAlt: UKM Neo Telemetri 15th Open Recruitment web platform interface
order: 2
specs:
  - label: Backend Framework
    value: Nest.js (Modular TypeScript)
  - label: Primary Database
    value: PostgreSQL
  - label: Cache & Session Layer
    value: Redis
  - label: Payment Module
    value: Static QRIS Verification
---

## System Overview

Developed a large-scale web-based Open Recruitment system to orchestrate the entire new member intake lifecycle for the 15th recruitment cycle of UKM Neo Telemetri.

Rather than handling registration forms, payment checks, tests, attendance sheets, and bootcamp scores in disconnected spreadsheets, the backend unifies every recruitment stage inside one structured platform capable of delivering real-time graduation announcements.

## Key Capabilities & Workflow

- **Registration & Static QRIS Payment Integration:** End-to-end applicant onboarding paired with static QRIS payment submission and verification workflows.
- **Online Examination & Attendance System:** Backend modules supporting online selection tests and structured participant attendance tracking.
- **Bootcamp Management & Assessment:** Centralized tracking of bootcamp sessions, mentor evaluations, and participant scoring.
- **Real-Time Graduation Announcements:** Fast status delivery backed by PostgreSQL persistence and Redis caching/state handling during peak announcement traffic.

## Technical Architecture

<div class="tech-arch">
<div class="tech-arch-header">
<span class="tech-arch-system-tag">Modular Recruitment Pipeline</span>
</div>
<div class="tech-arch-flow">
<div class="tech-arch-node">
<div class="tech-arch-node-top">
<span class="tech-arch-step">01</span>
<span class="tech-arch-badge">Applicant &amp; Committee Tier</span>
</div>
<h3 class="tech-arch-title">Recruitment Web Portal</h3>
<p class="tech-arch-sub">Registration, QRIS upload, online exam, and announcement views</p>
<ul class="tech-arch-list">
<li>Participant flow from sign-up through final result lookup</li>
<li>Committee console for payment, attendance, and grading</li>
</ul>
</div>
<div class="tech-arch-connector" aria-hidden="true">
<span class="tech-arch-connector-line"></span>
<span class="tech-arch-connector-tag">Authenticated REST Endpoints</span>
<span class="tech-arch-connector-arrow">↓</span>
</div>
<div class="tech-arch-node">
<div class="tech-arch-node-top">
<span class="tech-arch-step">02</span>
<span class="tech-arch-badge">Application Core</span>
</div>
<h3 class="tech-arch-title">Nest.js Modular Backend</h3>
<p class="tech-arch-sub">Domain modules for auth, QRIS, exams, attendance, and bootcamp</p>
<ul class="tech-arch-list">
<li>Enforces stage progression and role-based access rules</li>
<li>Aggregates exam and bootcamp scores for final selection</li>
</ul>
</div>
<div class="tech-arch-connector" aria-hidden="true">
<span class="tech-arch-connector-line"></span>
<span class="tech-arch-connector-tag">Transactional Writes &amp; Fast Lookups</span>
<span class="tech-arch-connector-arrow">↓</span>
</div>
<div class="tech-arch-node">
<div class="tech-arch-node-top">
<span class="tech-arch-step">03</span>
<span class="tech-arch-badge">Storage &amp; Speed Layer</span>
</div>
<h3 class="tech-arch-title">PostgreSQL &amp; Redis</h3>
<p class="tech-arch-sub">Relational integrity + low-latency caching</p>
<p class="tech-arch-desc">PostgreSQL guarantees consistent recruitment, payment, and assessment records while Redis accelerates session handling and real-time result lookups.</p>
</div>
</div>
</div>

## Impact & Value

Unified every stage of UKM Neo Telemetri's 15th open recruitment workflow—from registration and static QRIS payment to exams, attendance, bootcamp grading, and real-time graduation announcements—into a single reliable web system.
