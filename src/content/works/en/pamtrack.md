---
slugId: pamtrack
lang: en
title: Client Progress Tracker (PAMTrack)
summary: Integrated web monitoring platform enabling development teams to update work milestones in real time and automatically dispatch progress reports to clients via an automated WhatsApp bot.
category: software
year: 2025
role: Full-Stack Developer
stack:
  - Next.js
  - React
  - PostgreSQL
  - Supabase
  - WhatsApp Gateway API
  - Tailwind CSS
cover: ../../../assets/works/pamtrack.webp
coverAlt: Dashboard interface of the Client Progress Tracker system (PAMTrack)
order: 1
specs:
  - label: Core Framework
    value: Next.js (App Router)
  - label: Database & BaaS
    value: PostgreSQL & Supabase (Auth, RLS)
  - label: Notification Dispatcher
    value: WhatsApp Gateway / Webhook Bot
  - label: Application Type
    value: Client Portal & Progress Tracker
---

## System Overview

Client Progress Tracker (PAMTrack) is a centralized web solution developed to streamline transparency and milestone tracking between software teams and external clients. Instead of repetitive manual status calls or disconnected chat threads, the platform establishes a structured single source of truth for all deliverables.

Whenever engineers update milestone statuses, task completions, or upload deliverable artifacts through the administrative dashboard, the platform triggers an automated WhatsApp bot that dispatches formatted progress summaries directly to the client's registered mobile number.

## Key Capabilities & Workflow

- **Secure Client Portal:** Dedicated view allowing clients to monitor completion percentages, task breakdowns, and deliverables protected by Supabase Row Level Security (RLS).
- **Internal Team Management:** Administrative interface for team members to log milestone progress, track blockers, and manage timelines.
- **Automated WhatsApp Dispatching:** Event-driven webhook integration triggering the WhatsApp gateway bot to format and deliver milestone alerts instantly.
- **Real-Time Data Layer:** Built on PostgreSQL with Supabase for instant state synchronization and granular role-based access control.

## Technical Architecture

<div class="tech-arch">
<div class="tech-arch-header">
<span class="tech-arch-system-tag">Event-driven pipeline</span>
</div>
<div class="tech-arch-flow">
<div class="tech-arch-node">
<div class="tech-arch-node-top">
<span class="tech-arch-step">01</span>
<span class="tech-arch-badge">Client & Team Tier</span>
</div>
<h3 class="tech-arch-title">Frontend (Next.js & React)</h3>
<p class="tech-arch-sub">Responsive web portal, server actions, mutation handlers</p>
<ul class="tech-arch-list">
<li>Real-time client tracking dashboard</li>
<li>Team administration console for milestone updates</li>
<li>Type-safe data mutations via Next.js Server Actions</li>
</ul>
</div>
<div class="tech-arch-connector" aria-hidden="true">
<span class="tech-arch-connector-line"></span>
<span class="tech-arch-connector-tag">Server Actions & Mutations</span>
<span class="tech-arch-connector-arrow">↓</span>
</div>
<div class="tech-arch-node">
<div class="tech-arch-node-top">
<span class="tech-arch-step">02</span>
<span class="tech-arch-badge">Data Layer & Security</span>
</div>
<h3 class="tech-arch-title">Backend & BaaS (Supabase & PostgreSQL)</h3>
<p class="tech-arch-sub">Relational storage, row level security (RLS), database webhooks</p>
<ul class="tech-arch-list">
<li>Strict cross-client tenant isolation via Supabase RLS policies</li>
<li>Persistent milestone logs and deliverable attachments</li>
<li>Automated database triggers on milestone progress events</li>
</ul>
</div>
<div class="tech-arch-connector" aria-hidden="true">
<span class="tech-arch-connector-line"></span>
<span class="tech-arch-connector-tag">HTTP POST Webhook Payload</span>
<span class="tech-arch-connector-arrow">↓</span>
</div>
<div class="tech-arch-node">
<div class="tech-arch-node-top">
<span class="tech-arch-step">03</span>
<span class="tech-arch-badge">Automation Engine</span>
</div>
<h3 class="tech-arch-title">WhatsApp Bot Gateway</h3>
<p class="tech-arch-sub">Webhook receiver, message formatter, delivery queue</p>
<ul class="tech-arch-list">
<li>Ingests update payloads and formats structured text summaries</li>
<li>Destination number validation and delivery queue handling</li>
<li>Encrypted dispatch via WhatsApp Business / Bot Gateway API</li>
</ul>
</div>
<div class="tech-arch-connector" aria-hidden="true">
<span class="tech-arch-connector-line"></span>
<span class="tech-arch-connector-tag">Push Notification Alert</span>
<span class="tech-arch-connector-arrow">↓</span>
</div>
<div class="tech-arch-node">
<div class="tech-arch-node-top">
<span class="tech-arch-step">04</span>
<span class="tech-arch-badge">Recipient Endpoint</span>
</div>
<h3 class="tech-arch-title">Client (WhatsApp Mobile)</h3>
<p class="tech-arch-sub">Direct alerts without friction</p>
<p class="tech-arch-desc">Clients receive structured progress digests, milestone change notes, and verification links directly on their mobile device without requiring active logins.</p>
</div>
</div>
</div>

## Impact & Value

The system reduced manual status reporting overhead by over 60%, eliminated communication gaps between development teams and clients, and elevated client satisfaction through proactive, real-time messaging updates delivered directly to their daily messaging app.
