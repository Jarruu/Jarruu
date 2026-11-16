---
slugId: profil-neo-telemetri
lang: id
title: Website Profil dan Marketing Neo Telemetri
summary: Arsitektur backend dan layanan API yang andal untuk website profil serta marketing UKM Neo Telemetri Universitas Andalas dalam mendukung publikasi kegiatan dan ekspansi digital.
category: software
year: 2026
role: Backend Engineer
stack:
  - Express.js
  - MySQL
  - REST API
cover: ../../../assets/works/profil-neo.webp
coverAlt: Tampilan website profil dan marketing UKM Neo Telemetri di laptop dan ponsel
order: 4
specs:
  - label: Framework Backend
    value: Express.js
  - label: Basis Data
    value: MySQL
  - label: Model API
    value: RESTful API
  - label: Fokus Sistem
    value: Profil Organisasi & Marketing Digital
---

## Gambaran Sistem

Membangun dan mengoptimasi arsitektur backend untuk website profil serta marketing UKM Neo Telemetri Universitas Andalas. Platform ini menjadi etalase digital utama organisasi untuk memperkenalkan divisi, mempublikasikan informasi kegiatan, dan memperluas jangkauan di bidang teknologi informasi.

Backend dirancang dengan struktur endpoint yang rapi dan responsif agar halaman publik serta konten informasi organisasi dapat disajikan secara konsisten dan mudah dikelola.

## Fitur Utama & Alur Kerja

- **Optimasi Arsitektur Backend:** Menyusun routing, controller, dan middleware Express.js agar layanan backend ringan, terstruktur, dan mudah dipelihara.
- **Penyimpanan Konten Terstruktur:** Merancang skema basis data MySQL untuk data profil organisasi, informasi divisi, dan publikasi kegiatan.
- **Layanan API Publik yang Andal:** Menyediakan REST API yang stabil untuk mendukung publikasi informasi kegiatan serta ekspansi digital UKM Neo Telemetri.

## Arsitektur Teknis

<div class="tech-arch">
<div class="tech-arch-header">
<span class="tech-arch-system-tag">REST API &amp; Distribusi Konten</span>
</div>
<div class="tech-arch-flow">
<div class="tech-arch-node">
<div class="tech-arch-node-top">
<span class="tech-arch-step">01</span>
<span class="tech-arch-badge">Klien Publik</span>
</div>
<h3 class="tech-arch-title">Frontend Profil &amp; Marketing</h3>
<p class="tech-arch-sub">Halaman profil responsif, daftar divisi, dan publikasi kegiatan</p>
<ul class="tech-arch-list">
<li>Mengambil data profil dan kegiatan organisasi melalui API</li>
<li>Menampilkan visi, misi, divisi, serta informasi acara terkini</li>
</ul>
</div>
<div class="tech-arch-connector" aria-hidden="true">
<span class="tech-arch-connector-line"></span>
<span class="tech-arch-connector-tag">Permintaan HTTPS / JSON REST</span>
<span class="tech-arch-connector-arrow">↓</span>
</div>
<div class="tech-arch-node">
<div class="tech-arch-node-top">
<span class="tech-arch-step">02</span>
<span class="tech-arch-badge">Lapisan API</span>
</div>
<h3 class="tech-arch-title">Layanan Backend Express.js</h3>
<p class="tech-arch-sub">Routing modular, validasi, dan handler kueri teroptimasi</p>
<ul class="tech-arch-list">
<li>Menyajikan endpoint yang andal untuk konten informasi organisasi</li>
<li>Menangani validasi input dan format respons terstandar</li>
</ul>
</div>
<div class="tech-arch-connector" aria-hidden="true">
<span class="tech-arch-connector-line"></span>
<span class="tech-arch-connector-tag">Kueri SQL Terparameterisasi</span>
<span class="tech-arch-connector-arrow">↓</span>
</div>
<div class="tech-arch-node">
<div class="tech-arch-node-top">
<span class="tech-arch-step">03</span>
<span class="tech-arch-badge">Lapisan Data</span>
</div>
<h3 class="tech-arch-title">Basis Data Relasional MySQL</h3>
<p class="tech-arch-sub">Penyimpanan terstruktur untuk divisi, kegiatan, dan aset informasi</p>
<p class="tech-arch-desc">Menjaga konsistensi data profil dan catatan kegiatan organisasi agar siap diperbarui lintas kepengurusan.</p>
</div>
</div>
</div>

## Hasil & Dampak

Menghadirkan fondasi backend yang stabil dan layanan API yang andal untuk mendukung publikasi informasi kegiatan serta ekspansi digital UKM Neo Telemetri di bidang teknologi informasi.
