---
slugId: pamtrack
lang: id
title: Client Progress Tracker (PAMTrack)
summary: Platform web pemantauan proyek terintegrasi yang memungkinkan tim memperbarui progres secara langsung dan mendistribusikan notifikasi status terkini ke WhatsApp klien via bot otomatis.
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
coverAlt: Antarmuka dashboard sistem Client Progress Tracker (PAMTrack)
order: 1
specs:
  - label: Framework Utama
    value: Next.js (App Router)
  - label: Database & BaaS
    value: PostgreSQL & Supabase (Auth, RLS)
  - label: Integrasi Notifikasi
    value: WhatsApp Gateway / Webhook Bot
  - label: Model Layanan
    value: Client Portal & Team Progress Tracker
---

## Gambaran Sistem

Client Progress Tracker (PAMTrack) dirancang untuk mempermudah komunikasi dan transparansi antara tim pengembang dan klien. Sering kali klien membutuhkan kepastian dan pembaruan progres tanpa harus terus-menerus menanyakannya secara manual.

Melalui sistem ini, tim internal dapat mengelola milestone, mencatat aktivitas pengerjaan, dan memperbarui status proyek melalui antarmuka web yang terpusat. Setiap kali terjadi pembaruan progres yang signifikan, sistem secara otomatis men-trigger bot WhatsApp untuk mengirimkan laporan ringkas ke nomor WhatsApp klien yang terdaftar.

## Fitur Utama & Alur Kerja

- **Portal Klien & Autentikasi Terproteksi:** Klien dapat masuk ke dashboard privat untuk melihat ringkasan milestone, dokumen pendukung, dan riwayat revisi secara real-time.
- **Manajemen Progres Internal:** Tim pengembang memiliki dashboard operasional untuk memperbarui persentase progres, catatan teknis, dan kendala yang dihadapi.
- **Dispatching Notifikasi WhatsApp Otomatis:** Integrasi webhook yang terhubung dengan bot WhatsApp mengirimkan notifikasi pesan terformat secara instan ketika tiket atau milestone diperbarui.
- **Keamanan Data dengan Row Level Security (RLS):** Memanfaatkan kapabilitas Supabase RLS untuk menjamin klien hanya dapat mengakses data proyek mereka masing-masing.

## Arsitektur Teknis

<div class="tech-arch">
<div class="tech-arch-header">
<span class="tech-arch-system-tag">Pipeline berbasis event</span>
</div>
<div class="tech-arch-flow">
<div class="tech-arch-node">
<div class="tech-arch-node-top">
<span class="tech-arch-step">01</span>
<span class="tech-arch-badge">Tier Klien & Tim</span>
</div>
<h3 class="tech-arch-title">Frontend (Next.js & React)</h3>
<p class="tech-arch-sub">Antarmuka web responsif, server actions, state management</p>
<ul class="tech-arch-list">
<li>Dashboard pemantauan progres real-time bagi klien</li>
<li>Konsol manajemen tugas & milestone oleh tim pengembang</li>
<li>Mutasi data terproteksi melalui Next.js Server Actions</li>
</ul>
</div>
<div class="tech-arch-connector" aria-hidden="true">
<span class="tech-arch-connector-line"></span>
<span class="tech-arch-connector-tag">Mutasi Progres via Server Actions</span>
<span class="tech-arch-connector-arrow">↓</span>
</div>
<div class="tech-arch-node">
<div class="tech-arch-node-top">
<span class="tech-arch-step">02</span>
<span class="tech-arch-badge">Data Layer & Keamanan</span>
</div>
<h3 class="tech-arch-title">Backend & BaaS (Supabase & PostgreSQL)</h3>
<p class="tech-arch-sub">Database relasional, row level security (RLS), database webhooks</p>
<ul class="tech-arch-list">
<li>Isolasi data antar-klien menggunakan kebijakan ketat Supabase RLS</li>
<li>Penyimpanan histori pembaruan milestone dan lampiran file</li>
<li>Trigger event otomatis saat status tiket atau persentase progres berubah</li>
</ul>
</div>
<div class="tech-arch-connector" aria-hidden="true">
<span class="tech-arch-connector-line"></span>
<span class="tech-arch-connector-tag">Webhook HTTP POST Payload</span>
<span class="tech-arch-connector-arrow">↓</span>
</div>
<div class="tech-arch-node">
<div class="tech-arch-node-top">
<span class="tech-arch-step">03</span>
<span class="tech-arch-badge">Engine Otomasi</span>
</div>
<h3 class="tech-arch-title">WhatsApp Bot Gateway</h3>
<p class="tech-arch-sub">Webhook receiver, message formatter, delivery queue</p>
<ul class="tech-arch-list">
<li>Menerima payload pembaruan dari database dan memformat template pesan</li>
<li>Validasi nomor kontak klien dan status antrean pengiriman</li>
<li>Menghandle pengiriman pesan terenkripsi ke WhatsApp API</li>
</ul>
</div>
<div class="tech-arch-connector" aria-hidden="true">
<span class="tech-arch-connector-line"></span>
<span class="tech-arch-connector-tag">Pesan Notifikasi Otomatis</span>
<span class="tech-arch-connector-arrow">↓</span>
</div>
<div class="tech-arch-node">
<div class="tech-arch-node-top">
<span class="tech-arch-step">04</span>
<span class="tech-arch-badge">Endpoint Penerima</span>
</div>
<h3 class="tech-arch-title">Klien (WhatsApp Mobile)</h3>
<p class="tech-arch-sub">Notifikasi langsung tanpa hambatan login manual</p>
<p class="tech-arch-desc">Klien menerima ringkasan pembaruan progres, link detail, dan catatan milestone terkini langsung di aplikasi pesan sehari-hari mereka.</p>
</div>
</div>
</div>

## Hasil & Dampak

Sistem ini memangkas waktu koordinasi manual tim hingga lebih dari 60%, menghilangkan miskomunikasi progres proyek, dan meningkatkan kepuasan klien berkat laporan status yang transparan dan proaktif langsung ke aplikasi pesan harian mereka.
