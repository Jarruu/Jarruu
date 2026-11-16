---
slugId: achi-craft-gallery-admin
lang: id
title: Achi Craft Gallery Internal Admin System
summary: Sistem manajemen inventaris internal perusahaan dengan autentikasi bcrypt, validasi data end-to-end menggunakan Zod di frontend dan backend, serta pelaporan progres per fase untuk Project Manager.
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
coverAlt: Antarmuka login dan dashboard sistem manajemen inventaris internal Achi Craft Gallery
order: 3
specs:
  - label: Framework Fullstack
    value: TanStack Start
  - label: ORM & Skema Data
    value: Prisma ORM
  - label: Validasi & Keamanan
    value: Zod (End-to-End) & bcrypt
  - label: Cakupan Sistem
    value: Sistem Manajemen Inventaris Internal
---

## Gambaran Sistem

Mengembangkan sistem admin internal untuk manajemen inventaris perusahaan Achi Craft Gallery agar pencatatan bahan dan stok operasional berjalan lebih rapi dan terkendali.

Selain membangun alur fullstack dengan TanStack Start dan Prisma ORM, sistem ini mengutamakan keamanan akses serta keakuratan input melalui hashing bcrypt dan skema validasi Zod di sisi frontend maupun backend, disertai dokumentasi progres per fase untuk Project Manager.

## Fitur Utama & Alur Kerja

- **Sistem Manajemen Inventaris Internal:** Dashboard admin terpusat untuk memantau item inventaris, bahan baku, dan pergerakan stok internal perusahaan.
- **Arsitektur Autentikasi bcrypt:** Merancang keamanan login pengguna menggunakan hashing bcrypt untuk melindungi data kredensial admin.
- **Validasi Data End-to-End dengan Zod:** Menerapkan skema validasi Zod secara konsisten di sisi frontend dan backend sebelum data diproses atau disimpan.
- **Laporan Progres Pengembangan per Fase:** Menyusun laporan berkala untuk Project Manager yang mencakup arsitektur sistem dan status implementasi setiap fitur.

## Arsitektur Teknis

<div class="tech-arch">
<div class="tech-arch-header">
<span class="tech-arch-system-tag">Arsitektur Fullstack Type-Safe</span>
</div>
<div class="tech-arch-flow">
<div class="tech-arch-node">
<div class="tech-arch-node-top">
<span class="tech-arch-step">01</span>
<span class="tech-arch-badge">Antarmuka Admin</span>
</div>
<h3 class="tech-arch-title">TanStack Start &amp; Tailwind CSS</h3>
<p class="tech-arch-sub">Konsol admin responsif dan validasi form Zod di sisi klien</p>
<ul class="tech-arch-list">
<li>Halaman login terproteksi dan dashboard ringkasan inventaris</li>
<li>Umpan balik validasi langsung menggunakan skema Zod bersama</li>
</ul>
</div>
<div class="tech-arch-connector" aria-hidden="true">
<span class="tech-arch-connector-line"></span>
<span class="tech-arch-connector-tag">Server Functions &amp; Parsing Zod</span>
<span class="tech-arch-connector-arrow">↓</span>
</div>
<div class="tech-arch-node">
<div class="tech-arch-node-top">
<span class="tech-arch-step">02</span>
<span class="tech-arch-badge">Lapisan Auth &amp; Validasi</span>
</div>
<h3 class="tech-arch-title">Backend Handler &amp; bcrypt</h3>
<p class="tech-arch-sub">Verifikasi kredensial ter-hash, sesi, dan guard Zod di server</p>
<ul class="tech-arch-list">
<li>Memverifikasi kata sandi terhadap hash bcrypt tersimpan</li>
<li>Memvalidasi ulang seluruh payload di server sebelum mutasi data</li>
</ul>
</div>
<div class="tech-arch-connector" aria-hidden="true">
<span class="tech-arch-connector-line"></span>
<span class="tech-arch-connector-tag">Kueri Type-Safe Prisma Client</span>
<span class="tech-arch-connector-arrow">↓</span>
</div>
<div class="tech-arch-node">
<div class="tech-arch-node-top">
<span class="tech-arch-step">03</span>
<span class="tech-arch-badge">Lapisan Persistensi</span>
</div>
<h3 class="tech-arch-title">Basis Data via Prisma ORM</h3>
<p class="tech-arch-sub">Tabel inventaris dan pengguna terkelola skema</p>
<p class="tech-arch-desc">Menyediakan operasi baca dan tulis basis data yang type-safe serta selaras dengan arsitektur sistem yang dilaporkan per fase.</p>
</div>
</div>
</div>

## Hasil & Dampak

Menghadirkan sistem admin inventaris internal yang aman dengan validasi data menyeluruh serta visibilitas progres pengembangan yang jelas bagi Project Manager di tiap fase.
