---
slugId: open-recruitment-neo-15
lang: id
title: Website Open Recruitment UKM Neo Telemetri ke-15
summary: Sistem backend Open Recruitment berskala besar yang mengintegrasikan pendaftaran, pembayaran QRIS statis, ujian online, absensi, manajemen bootcamp & penilaian, hingga pengumuman kelulusan real-time.
category: software
year: 2026
role: Backend Engineer
stack:
  - Nest.js
  - PostgreSQL
  - Redis
  - QRIS Statis
cover: ../../../assets/works/or-neo.webp
coverAlt: Antarmuka website Open Recruitment UKM Neo Telemetri ke-15
order: 2
specs:
  - label: Framework Backend
    value: Nest.js (Modular TypeScript)
  - label: Basis Data Utama
    value: PostgreSQL
  - label: Cache & Sesi
    value: Redis
  - label: Modul Pembayaran
    value: Verifikasi QRIS Statis
---

## Gambaran Sistem

Mengembangkan sistem Open Recruitment berskala besar berbasis web untuk mengelola seluruh rangkaian rekrutmen anggota baru UKM Neo Telemetri angkatan ke-15.

Seluruh tahapan seleksi—mulai dari pendaftaran peserta, pembayaran biaya registrasi dengan QRIS statis, pengerjaan ujian online, pencatatan absensi, pengelolaan bootcamp beserta penilaian mentor, hingga pengumuman kelulusan—terintegrasi dalam satu arsitektur backend yang terpadu dan real-time.

## Fitur Utama & Alur Kerja

- **Pendaftaran & Pembayaran QRIS Statis:** Alur registrasi calon anggota yang terhubung dengan unggah dan verifikasi pembayaran berbasis QRIS statis.
- **Ujian Online & Sistem Absensi:** Modul backend untuk pelaksanaan ujian seleksi secara daring serta pencatatan kehadiran peserta di setiap sesi.
- **Manajemen Bootcamp & Penilaian:** Pengelolaan jadwal, kelompok bootcamp, serta rekap nilai peserta dari mentor secara terpusat.
- **Pengumuman Kelulusan Real-Time:** Penyajian status kelulusan secara cepat dengan dukungan penyimpanan PostgreSQL dan caching Redis.

## Arsitektur Teknis

<div class="tech-arch">
<div class="tech-arch-header">
<span class="tech-arch-system-tag">Pipeline Rekrutmen Modular</span>
</div>
<div class="tech-arch-flow">
<div class="tech-arch-node">
<div class="tech-arch-node-top">
<span class="tech-arch-step">01</span>
<span class="tech-arch-badge">Tier Peserta &amp; Panitia</span>
</div>
<h3 class="tech-arch-title">Portal Web Rekrutmen</h3>
<p class="tech-arch-sub">Pendaftaran, pembayaran QRIS, ujian online, dan cek kelulusan</p>
<ul class="tech-arch-list">
<li>Alur peserta dari registrasi hingga melihat hasil kelulusan</li>
<li>Konsol panitia untuk verifikasi QRIS, absensi, dan penilaian</li>
</ul>
</div>
<div class="tech-arch-connector" aria-hidden="true">
<span class="tech-arch-connector-line"></span>
<span class="tech-arch-connector-tag">Endpoint REST Terautentikasi</span>
<span class="tech-arch-connector-arrow">↓</span>
</div>
<div class="tech-arch-node">
<div class="tech-arch-node-top">
<span class="tech-arch-step">02</span>
<span class="tech-arch-badge">Inti Aplikasi</span>
</div>
<h3 class="tech-arch-title">Backend Modular Nest.js</h3>
<p class="tech-arch-sub">Modul autentikasi, QRIS, ujian, absensi, dan bootcamp</p>
<ul class="tech-arch-list">
<li>Mengatur alur tahapan seleksi dan hak akses berbasis peran</li>
<li>Mengagregasi nilai ujian serta evaluasi bootcamp peserta</li>
</ul>
</div>
<div class="tech-arch-connector" aria-hidden="true">
<span class="tech-arch-connector-line"></span>
<span class="tech-arch-connector-tag">Transaksi Data &amp; Lookup Cepat</span>
<span class="tech-arch-connector-arrow">↓</span>
</div>
<div class="tech-arch-node">
<div class="tech-arch-node-top">
<span class="tech-arch-step">03</span>
<span class="tech-arch-badge">Lapisan Penyimpanan &amp; Cache</span>
</div>
<h3 class="tech-arch-title">PostgreSQL &amp; Redis</h3>
<p class="tech-arch-sub">Integritas relasional + caching latensi rendah</p>
<p class="tech-arch-desc">PostgreSQL menjaga konsistensi data pendaftar, pembayaran, dan penilaian, sementara Redis mempercepat sesi dan akses pengumuman kelulusan secara real-time.</p>
</div>
</div>
</div>

## Hasil & Dampak

Mengintegrasikan seluruh alur Open Recruitment UKM Neo Telemetri ke-15 dari pendaftaran hingga pengumuman kelulusan real-time dalam satu sistem web yang terstruktur dan efisien bagi panitia maupun peserta.
