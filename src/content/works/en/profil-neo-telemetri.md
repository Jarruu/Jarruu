---
slugId: profil-neo-telemetri
lang: en
title: Neo Telemetri Profile & Marketing Website
summary: Backend architecture and reliable API services powering the organizational profile, event publications, and digital outreach of UKM Neo Telemetri Universitas Andalas.
category: software
year: 2026
role: Backend Engineer
stack:
  - Express.js
  - MySQL
  - REST API
cover: ../../../assets/works/profil-neo.webp
coverAlt: Neo Telemetri profile and marketing website interface on laptop and mobile
order: 4
specs:
  - label: Backend Framework
    value: Express.js
  - label: Database
    value: MySQL
  - label: API Style
    value: RESTful API
  - label: Domain
    value: Organization Profile & Marketing
---

## System Overview

Built and optimized the backend architecture for the profile and marketing website of UKM Neo Telemetri at Universitas Andalas. The platform serves as the public digital storefront for introducing divisions, publishing activity updates, and supporting the student IT organization's broader outreach.

The backend provides structured, reliable API endpoints so public pages and informational content remain fast, consistent, and straightforward to maintain across organizational periods.

## Key Capabilities & Workflow

- **Backend Architecture Optimization:** Structured Express.js routes, controllers, and middleware to keep response latency low and endpoints easy to maintain.
- **Relational Content Storage:** Modeled MySQL tables for organization profile data, division details, and published activity information.
- **Reliable Public API Delivery:** Exposed clean REST API services supporting activity publications and digital expansion initiatives for the IT student organization.

## Technical Architecture

<div class="tech-arch">
<div class="tech-arch-header">
<span class="tech-arch-system-tag">REST API &amp; Content Delivery</span>
</div>
<div class="tech-arch-flow">
<div class="tech-arch-node">
<div class="tech-arch-node-top">
<span class="tech-arch-step">01</span>
<span class="tech-arch-badge">Public Client</span>
</div>
<h3 class="tech-arch-title">Profile &amp; Marketing Frontend</h3>
<p class="tech-arch-sub">Responsive landing, division showcase, and activity feed</p>
<ul class="tech-arch-list">
<li>Consumes structured profile and event endpoints</li>
<li>Displays organizational vision, divisions, and updates</li>
</ul>
</div>
<div class="tech-arch-connector" aria-hidden="true">
<span class="tech-arch-connector-line"></span>
<span class="tech-arch-connector-tag">HTTPS / JSON REST Requests</span>
<span class="tech-arch-connector-arrow">↓</span>
</div>
<div class="tech-arch-node">
<div class="tech-arch-node-top">
<span class="tech-arch-step">02</span>
<span class="tech-arch-badge">API Tier</span>
</div>
<h3 class="tech-arch-title">Express.js Backend Service</h3>
<p class="tech-arch-sub">Modular routing, validation, and optimized query handlers</p>
<ul class="tech-arch-list">
<li>Serves reliable endpoints for organization information</li>
<li>Handles input validation and standardized error responses</li>
</ul>
</div>
<div class="tech-arch-connector" aria-hidden="true">
<span class="tech-arch-connector-line"></span>
<span class="tech-arch-connector-tag">Parameterized SQL Queries</span>
<span class="tech-arch-connector-arrow">↓</span>
</div>
<div class="tech-arch-node">
<div class="tech-arch-node-top">
<span class="tech-arch-step">03</span>
<span class="tech-arch-badge">Data Layer</span>
</div>
<h3 class="tech-arch-title">MySQL Relational Database</h3>
<p class="tech-arch-sub">Structured storage for divisions, activities, and marketing assets</p>
<p class="tech-arch-desc">Maintains consistent organizational content and activity records ready for continuous updates across cohorts.</p>
</div>
</div>
</div>

## Impact & Value

Delivered a stable backend foundation and dependable API services that support UKM Neo Telemetri's public activity publications and digital growth as a campus technology organization.
