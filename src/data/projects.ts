import achiImg from "../assets/projects/achicraftgallery.webp";
import tigoKotoImg from "../assets/projects/tigokoto.webp";
import bemImg from "../assets/projects/bemstiaadabiah.webp";
import pamtrackImg from "../assets/projects/pamtrack.webp";

export type Project = {
  title: string;
  category: string;
  year: string;
  desc: string;
  image: string;
  github?: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    title: "Achi Craft Gallery Internal",
    category: "Website",
    year: "2026",
    desc: "Sistem admin internal untuk manajemen inventaris perusahaan.",
    image: achiImg,
    github: "https://github.com/Jarruu/achi-craft-gallery-internal.git",
  },
  {
    title: "Website Desa Nagari Tigo Koto",
    category: "Website",
    year: "2026",
    desc: "Mengelola data UMKM serta destinasi pariwisata via CMS WebsiteDesa dalam program KKN.",
    image: tigoKotoImg,
    demo: "https://tigokoto.desa.id/",
  },
  {
    title: "Laporan Keuangan BEM KM STIA Adabiah",
    category: "Website",
    year: "2025",
    desc: "Sistem untuk mengelola laporan keuangan BEM KM STIA Adabiah.",
    image: bemImg,
    github: "https://github.com/Jarruu/laporan-keuangan-bem-stia-adabiah.git",
    demo: "https://bemstiaadabiah.online/",
  },
  {
    title: "Client Progress Tracker",
    category: "Website",
    year: "2025",
    desc: "Aplikasi web untuk memantau progres pengerjaan proyek web/aplikasi milik client.",
    image: pamtrackImg,
    github: "https://github.com/Jarruu/pamtrack-client-progress-tracker.git",
    demo: "https://pamtrack.vercel.app",
  },
];
