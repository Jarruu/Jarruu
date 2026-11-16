---
slugId: laporan-keuangan-bem-stia
lang: id
title: Laporan Keuangan BEM KM STIA Adabiah
summary: Sistem pelaporan keuangan organisasi mahasiswa berbasis web yang terstruktur dan transparan untuk mengolah pemasukan, pengeluaran, serta rekapitulasi periodik bagi pengurus dan stakeholder.
category: software
year: 2025
role: Fullstack Developer
stack:
  - React.js
  - Laravel
  - Tailwind CSS
  - MySQL
cover: ../../../assets/works/bemstiaadabiah.webp
coverAlt: Tampilan website sistem laporan keuangan BEM KM STIA Adabiah
order: 5
specs:
  - label: Framework Frontend
    value: React.js & Tailwind CSS
  - label: Framework Backend
    value: Laravel
  - label: Basis Data
    value: MySQL
  - label: Tujuan Sistem
    value: Akuntabilitas & Transparansi Keuangan
---

## Gambaran Sistem

Membangun sistem pelaporan keuangan berbasis web untuk BEM KM STIA Adabiah guna menyusun dan mengelola pencatatan keuangan organisasi mahasiswa secara terstruktur dan transparan.

Sistem ini membantu pengurus mengolah data pemasukan dan pengeluaran menjadi rekapitulasi keuangan periodik yang mudah dipahami oleh pengurus internal maupun stakeholder organisasi.

## Fitur Utama & Alur Kerja

- **Pengelolaan Laporan Keuangan Terstruktur:** Menyusun pencatatan kas organisasi mahasiswa dalam format digital yang rapi dan transparan.
- **Pengolahan Pemasukan & Pengeluaran:** Mencatat serta mengelompokkan transaksi masuk dan keluar untuk mendukung akuntabilitas organisasi.
- **Rekapitulasi Keuangan Periodik:** Menyajikan ringkasan laporan per periode yang mudah dibaca oleh pengurus dan stakeholder.
- **Peningkatan Ketertiban Administrasi:** Mengurangi pencatatan manual terpisah sehingga administrasi keuangan lebih tertib dan efisien.

## Arsitektur Teknis

<div class="tech-arch">
<div class="tech-arch-header">
<span class="tech-arch-system-tag">Buku Kas Digital React + Laravel</span>
</div>
<div class="tech-arch-flow">
<div class="tech-arch-node">
<div class="tech-arch-node-top">
<span class="tech-arch-step">01</span>
<span class="tech-arch-badge">Lapisan Presentasi</span>
</div>
<h3 class="tech-arch-title">React.js &amp; Tailwind CSS</h3>
<p class="tech-arch-sub">Tampilan laporan transparan dan panel pencatatan bendahara</p>
<ul class="tech-arch-list">
<li>Ringkasan rekapitulasi periodik untuk pengurus dan stakeholder</li>
<li>Form pencatatan pemasukan serta pengeluaran yang terstruktur</li>
</ul>
</div>
<div class="tech-arch-connector" aria-hidden="true">
<span class="tech-arch-connector-line"></span>
<span class="tech-arch-connector-tag">Permintaan JSON REST API</span>
<span class="tech-arch-connector-arrow">↓</span>
</div>
<div class="tech-arch-node">
<div class="tech-arch-node-top">
<span class="tech-arch-step">02</span>
<span class="tech-arch-badge">Lapisan Aplikasi</span>
</div>
<h3 class="tech-arch-title">Backend Laravel</h3>
<p class="tech-arch-sub">Validasi transaksi, kalkulasi saldo, dan penyusunan rekap periodik</p>
<ul class="tech-arch-list">
<li>Memvalidasi data transaksi dan menghitung rekap per periode</li>
<li>Menyediakan endpoint laporan keuangan terstruktur</li>
</ul>
</div>
<div class="tech-arch-connector" aria-hidden="true">
<span class="tech-arch-connector-line"></span>
<span class="tech-arch-connector-tag">Kueri Eloquent ORM</span>
<span class="tech-arch-connector-arrow">↓</span>
</div>
<div class="tech-arch-node">
<div class="tech-arch-node-top">
<span class="tech-arch-step">03</span>
<span class="tech-arch-badge">Lapisan Basis Data</span>
</div>
<h3 class="tech-arch-title">Basis Data Kas MySQL</h3>
<p class="tech-arch-sub">Penyimpanan relasional data pemasukan, pengeluaran, dan periode</p>
<p class="tech-arch-desc">Menyimpan riwayat transaksi organisasi secara teratur untuk menjaga akuntabilitas dan kemudahan audit laporan periodik.</p>
</div>
</div>
</div>

## Hasil & Dampak

Meningkatkan ketertiban administrasi serta efisiensi pencatatan keuangan BEM KM STIA Adabiah, sekaligus memberikan transparansi laporan periodik yang jelas bagi pengurus dan stakeholder.
