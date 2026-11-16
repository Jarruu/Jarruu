import type { ImageMetadata } from 'astro';
import type { Lang } from '../i18n/ui';
import reslabPhoto from '../assets/Asisten Reslab 2025-2026.webp';
import pklPhoto from '../assets/Laporan_PKL_IEEE.webp';
import unandPhoto from '../assets/unand.webp';

export interface ExperiencePhoto {
	src: ImageMetadata;
	alt: Record<Lang, string>;
}

export interface ExperienceRole {
	role: Record<Lang, string>;
	period: Record<Lang, string>;
	summary: Record<Lang, string>;
	highlights: Record<Lang, string[]>;
}

export interface ExperienceItem {
	org: string;
	location: string;
	period: Record<Lang, string>;
	photo?: ExperiencePhoto;
	roles: ExperienceRole[];
}

export interface SkillGroup {
	domain: Record<Lang, string>;
	items: string[];
	context: Record<Lang, string>;
}

export const profile = {
	fullName: 'Rahmat Fajar Saputra',
	socials: {
		whatsapp: {
			label: 'WhatsApp',
			url: 'https://wa.me/62895600077007',
		},
		email: {
			label: 'Email',
			url: 'mailto:jarruuwork@gmail.com',
		},
		linkedin: {
			label: 'LinkedIn',
			url: 'https://www.linkedin.com/in/rahmat-fajar-saputra-90690a287/',
		},
		instagram: {
			label: 'Instagram',
			url: 'https://www.instagram.com/jaarruu_',
		},
		github: {
			label: 'GitHub',
			url: 'https://github.com/Jarruu',
		},
	},
} as const;

export const experiences: ExperienceItem[] = [
	{
		org: 'Robotic and Embedded System Laboratory, Teknik Komputer, Universitas Andalas',
		location: 'Padang, ID',
		period: {
			en: 'Jul 2025 - Present',
			id: 'Jul 2025 - Sekarang',
		},
		photo: {
			src: reslabPhoto,
			alt: {
				en: 'Robotic and Embedded System Laboratory assistants group photo (2025-2026)',
				id: 'Foto bersama asisten Robotic and Embedded System Laboratory (2025-2026)',
			},
		},
		roles: [
			{
				role: {
					en: 'Laboratory Assistant & Inventory Coordinator',
					id: 'Asisten Laboratorium & Koordinator Inventaris',
				},
				period: {
					en: 'Jun 2026 - Present',
					id: 'Jun 2026 - Sekarang',
				},
				summary: {
					en: 'Coordinate laboratory hardware inventory and assist undergraduate practicum sessions in embedded systems, IoT, and electronics.',
					id: 'Mengoordinasikan inventaris perangkat keras laboratorium serta membimbing sesi praktikum sistem tertanam, IoT, dan elektronika.',
				},
				highlights: {
					en: [
						'Serve as Inventory Coordinator overseeing tracking, readiness checks, and lending logs for laboratory hardware and kits.',
						'Practicum Assistant for Embedded Systems & IoT, guiding students on microcontroller programming, sensor interfacing, and connected telemetry.',
						'Practicum Assistant for Electronics, supporting hands-on circuit assembly, measurement, and hardware troubleshooting.',
					],
					id: [
						'Bertugas sebagai Koordinator Inventaris dalam pencatatan, pemeriksaan kelayakan, dan peminjaman kit serta perangkat keras laboratorium.',
						'Asisten Praktikum Sistem Tertanam dan IoT, membimbing praktikan dalam pemrograman mikrokontroler, antarmuka sensor, dan telemetri.',
						'Asisten Praktikum Elektronika, mendampingi perakitan rangkaian, pengukuran komponen, dan debugging perangkat keras.',
					],
				},
			},
			{
				role: {
					en: 'Laboratory Assistant & Inventory Division Staff',
					id: 'Asisten Laboratorium & Staf Divisi Inventaris',
				},
				period: {
					en: 'Jul 2025 - Jun 2026',
					id: 'Jul 2025 - Jun 2026',
				},
				summary: {
					en: 'Managed laboratory equipment readiness as Inventory Division Staff and assisted foundational circuit analysis practicum courses.',
					id: 'Mengelola kesiapan peralatan sebagai Staf Divisi Inventaris serta membimbing praktikum dasar analisis dan rangkaian listrik.',
				},
				highlights: {
					en: [
						'Worked as Inventory Division Staff supporting component cataloging, bench preparation, and equipment maintenance.',
						'Practicum Assistant for Introduction to Circuit Analysis, helping students verify circuit laws and basic network calculations.',
						'Practicum Assistant for Electric Circuits, assisting with lab setups, instrumentation use, and circuit verification.',
					],
					id: [
						'Bertugas sebagai Staf Divisi Inventaris dalam pendataan komponen, penyiapan meja praktikum, dan pemeliharaan perangkat.',
						'Asisten Praktikum Pengantar Analisis Rangkaian, membimbing pemahaman hukum rangkaian dan verifikasi perhitungan dasar.',
						'Asisten Praktikum Rangkaian Listrik, mendampingi pengaturan alat ukur, perakitan rangkaian, dan pengujian hasil praktikum.',
					],
				},
			},
		],
	},
	{
		org: 'CV. Putra Anugrah Mandiri',
		location: 'Indonesia',
		period: {
			en: 'Jan 2025 - Feb 2025',
			id: 'Jan 2025 - Feb 2025',
		},
		photo: {
			src: pklPhoto,
			alt: {
				en: 'Internship team at CV. Putra Anugrah Mandiri',
				id: 'Dokumentasi kegiatan magang di CV. Putra Anugrah Mandiri',
			},
		},
		roles: [
			{
				role: {
					en: 'Programmer Intern',
					id: 'Programmer (Magang)',
				},
				period: {
					en: 'Jan 2025 - Feb 2025',
					id: 'Jan 2025 - Feb 2025',
				},
				summary: {
					en: 'Developed and maintained internal software modules during a two-month intensive programming internship.',
					id: 'Mengembangkan dan memelihara modul perangkat lunak internal selama masa magang intensif dua bulan.',
				},
				highlights: {
					en: [
						'Translated operational workflows into structured web application features and database queries.',
						'Collaborated with staff to test edge cases, fix bugs, and document deployment steps.',
					],
					id: [
						'Menerjemahkan kebutuhan operasional ke dalam fitur aplikasi web terstruktur dan kueri basis data.',
						'Bekerja sama dengan tim untuk menguji skenario penggunaan, memperbaiki bug, dan mendokumentasikan alur penggunaan.',
					],
				},
			},
		],
	},
	{
		org: 'Universitas Andalas',
		location: 'Padang, ID',
		period: {
			en: '2023 - Present',
			id: '2023 - Sekarang',
		},
		photo: {
			src: unandPhoto,
			alt: {
				en: 'Universitas Andalas campus aerial view',
				id: 'Kampus Universitas Andalas Padang',
			},
		},
		roles: [
			{
				role: {
					en: 'Computer Engineering Undergraduate Student',
					id: 'Mahasiswa S1 Teknik Komputer',
				},
				period: {
					en: '2023 - Present',
					id: '2023 - Sekarang',
				},
				summary: {
					en: 'Undergraduate studies in Computer Engineering focusing on embedded systems, IoT hardware, computer vision, and full-stack software engineering.',
					id: 'Studi sarjana Teknik Komputer dengan fokus pada sistem tertanam, perangkat keras IoT, computer vision, dan rekayasa perangkat lunak.',
				},
				highlights: {
					en: [
						'Active member of the Robotic and Embedded System Laboratory (RES Lab).',
						'Apply coursework across microcontroller systems, circuit analysis, edge AI, and web application development.',
					],
					id: [
						'Anggota aktif Robotic and Embedded System Laboratory (RES Lab).',
						'Menerapkan materi perkuliahan pada pengembangan mikrokontroler, analisis rangkaian, AI edge, dan aplikasi web.',
					],
				},
			},
		],
	},
];

export const skillGroups: SkillGroup[] = [
	{
		domain: {
			en: 'Languages & Core',
			id: 'Bahasa Pemrograman',
		},
		items: ['C / C++', 'Python', 'TypeScript / JavaScript', 'C#', 'Dart'],
		context: {
			en: 'Firmware development, data pipelines, and web applications',
			id: 'Pengembangan firmware, pipeline data, dan aplikasi web',
		},
	},
	{
		domain: {
			en: 'AI & Computer Vision',
			id: 'AI & Computer Vision',
		},
		items: ['PyTorch / TensorFlow', 'OpenCV', 'YOLO Object Detection', 'NumPy / Pandas', 'Edge Inference'],
		context: {
			en: 'Visual inspection, real-time detection, and sensor data classification',
			id: 'Inspeksi visual, deteksi waktu nyata, dan klasifikasi data sensor',
		},
	},
	{
		domain: {
			en: 'IoT & Embedded Hardware',
			id: 'IoT & Perangkat Keras Tertanam',
		},
		items: ['ESP32 / Arduino', 'Raspberry Pi', 'MQTT & HTTP Telemetry', 'I2C / SPI / UART', 'Sensor & Actuator Interfacing'],
		context: {
			en: 'Laboratory robotics, telemetry nodes, and automated physical control',
			id: 'Robotika laboratorium, node telemetri, dan kendali fisik otomatis',
		},
	},
	{
		domain: {
			en: 'Software & Tooling',
			id: 'Software & Perangkat Kerja',
		},
		items: [
			'Astro',
			'React',
			'Next.js',
			'Flutter',
			'React Native',
			'Laravel',
			'ASP.NET',
			'NestJS',
			'REST APIs',
			'Git & GitHub',
			'Arduino IDE',
		],
		context: {
			en: 'Web dashboards, inventory systems, and version-controlled workflows',
			id: 'Dashboard web, sistem inventaris, dan alur kerja terkontrol versi',
		},
	},
];
