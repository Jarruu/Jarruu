---
slugId: achi-craft-gallery-admin
lang: en
title: Achi Craft Gallery Internal Admin System
summary: Internal inventory management system featuring bcrypt-secured authentication, end-to-end Zod validation across client and server, and phase-by-phase engineering reporting.
category: software
year: 2026
role: Fullstack Developer
stack:
  - TanStack Start
  - Prisma ORM
  - Tailwind CSS
  - Zod
  - bcrypt
cover: ../../../assets/works/achicraftgallery.webp
coverAlt: Achi Craft Gallery internal inventory admin login and dashboard mockup
order: 3
specs:
  - label: Fullstack Framework
    value: TanStack Start
  - label: ORM & Schema
    value: Prisma ORM
  - label: Validation & Security
    value: Zod (End-to-End) & bcrypt
  - label: System Scope
    value: Internal Inventory Management
---

## System Overview

Developed an internal administrative web system for Achi Craft Gallery to centralize and manage company inventory records cleanly.

Beyond implementing core fullstack inventory workflows with TanStack Start and Prisma ORM, the project emphasized strict security and data integrity—combining bcrypt password hashing with shared Zod validation across both frontend forms and backend handlers, alongside structured phase progress reports for the Project Manager.

## Key Capabilities & Workflow

- **Internal Inventory Management:** Centralized admin dashboard for tracking materials, stock levels, and inventory operations.
- **bcrypt Authentication Architecture:** Designed user login security using bcrypt password hashing to protect internal account credentials.
- **End-to-End Zod Validation:** Enforced consistent schema validation with Zod across both frontend inputs and backend endpoints.
- **Phased Engineering Progress Reporting:** Compiled structured per-phase development reports for the Project Manager covering system architecture and feature implementation status.

## Technical Architecture

<div class="tech-arch">
<div class="tech-arch-header">
<span class="tech-arch-system-tag">Type-Safe Fullstack Architecture</span>
</div>
<div class="tech-arch-flow">
<div class="tech-arch-node">
<div class="tech-arch-node-top">
<span class="tech-arch-step">01</span>
<span class="tech-arch-badge">Admin Interface</span>
</div>
<h3 class="tech-arch-title">TanStack Start &amp; Tailwind CSS</h3>
<p class="tech-arch-sub">Responsive admin console and client-side Zod form validation</p>
<ul class="tech-arch-list">
<li>Protected login and inventory dashboard views</li>
<li>Immediate client validation feedback via shared Zod schemas</li>
</ul>
</div>
<div class="tech-arch-connector" aria-hidden="true">
<span class="tech-arch-connector-line"></span>
<span class="tech-arch-connector-tag">Server Functions &amp; Zod Parsing</span>
<span class="tech-arch-connector-arrow">↓</span>
</div>
<div class="tech-arch-node">
<div class="tech-arch-node-top">
<span class="tech-arch-step">02</span>
<span class="tech-arch-badge">Auth &amp; Validation Layer</span>
</div>
<h3 class="tech-arch-title">Backend Handlers &amp; bcrypt</h3>
<p class="tech-arch-sub">Credential hashing, session checks, and server-side Zod guards</p>
<ul class="tech-arch-list">
<li>Verifies passwords against salted bcrypt hashes</li>
<li>Re-validates every payload on the server before persistence</li>
</ul>
</div>
<div class="tech-arch-connector" aria-hidden="true">
<span class="tech-arch-connector-line"></span>
<span class="tech-arch-connector-tag">Typed Prisma Client Queries</span>
<span class="tech-arch-connector-arrow">↓</span>
</div>
<div class="tech-arch-node">
<div class="tech-arch-node-top">
<span class="tech-arch-step">03</span>
<span class="tech-arch-badge">Persistence Layer</span>
</div>
<h3 class="tech-arch-title">Prisma ORM Database</h3>
<p class="tech-arch-sub">Schema-managed inventory and user tables</p>
<p class="tech-arch-desc">Provides type-safe database reads and mutations aligned with the documented system architecture.</p>
</div>
</div>
</div>

## Impact & Value

Delivered a secure, validated internal inventory system with end-to-end type safety and transparent per-phase architectural reporting for project stakeholders.
