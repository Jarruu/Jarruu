import type { Lang } from '../i18n/ui';

export interface ExperienceItem {
	id: string;
	role: Record<Lang, string>;
	org: string;
	location: string;
	period: Record<Lang, string>;
	todoPeriod?: boolean;
	summary: Record<Lang, string>;
	highlights: Record<Lang, string[]>;
}

export interface SkillGroup {
	code: string;
	domain: Record<Lang, string>;
	items: string[];
	context: Record<Lang, string>;
}

export const profile = {
	fullName: 'Rahmat Fajar Saputra',
	shortName: 'Fajar',
	location: 'Padang, West Sumatra, Indonesia',
	timezone: 'Asia/Jakarta',
	socials: {
		whatsapp: {
			label: 'WhatsApp',
			handle: '+62 895-6000-77007',
			url: 'https://wa.me/62895600077007',
		},
		linkedin: {
			label: 'LinkedIn',
			handle: 'rahmat-fajar-saputra-90690a287',
			url: 'https://www.linkedin.com/in/rahmat-fajar-saputra-90690a287/',
		},
		instagram: {
			label: 'Instagram',
			handle: '@jaarruu_',
			url: 'https://www.instagram.com/jaarruu_',
		},
	},
	education: {
		degree: {
			en: 'B.Eng. in Computer Engineering (Teknik Komputer)',
			id: 'S1 Teknik Komputer',
		},
		institution: 'Universitas Andalas',
		period: {
			en: 'Cohort / Graduation Year: [TODO: confirm year]',
			id: 'Angkatan / Tahun Lulus: [TODO: konfirmasi tahun]',
		},
		lab: 'Robotic and Embedded System Laboratory (RES Lab)',
	},
} as const;

export const experiences: ExperienceItem[] = [
	{
		id: 'EXP-01',
		role: {
			en: 'Permanent Assistant & Inventory Coordinator',
			id: 'Asisten Tetap & Koordinator Inventaris',
		},
		org: 'Robotic and Embedded System Laboratory, Teknik Komputer, Universitas Andalas',
		location: 'Padang, ID',
		period: {
			en: 'Period: [TODO: confirm start & end month/year]',
			id: 'Periode: [TODO: konfirmasi bulan/tahun mulai & selesai]',
		},
		todoPeriod: true,
		summary: {
			en: 'Supervise embedded systems practicum sessions and coordinate hardware inventory across microcontrollers, sensors, and robotics testbeds.',
			id: 'Membimbing praktikum sistem tertanam serta mengoordinasikan inventaris perangkat keras laboratorium meliputi mikrokontroler, sensor, dan modul robotika.',
		},
		highlights: {
			en: [
				'Coordinate tracking, calibration checks, and lending logs for laboratory embedded kits and robotic components.',
				'Mentor undergraduate students on microcontroller programming, sensor interfacing, and hardware debugging.',
			],
			id: [
				'Mengoordinasikan pencatatan, pemeriksaan kelayakan, dan peminjaman kit sistem tertanam serta komponen robotika laboratorium.',
				'Membimbing praktikan dalam pemrograman mikrokontroler, antarmuka sensor, dan debugging rangkaian.',
			],
		},
	},
	{
		id: 'EXP-02',
		role: {
			en: 'Programmer Intern',
			id: 'Programmer (Magang)',
		},
		org: 'CV. Putra Anugrah Mandiri',
		location: 'Indonesia',
		period: {
			en: 'Jan 2025 - Feb 2025',
			id: 'Jan 2025 - Feb 2025',
		},
		todoPeriod: false,
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
	{
		id: 'EXP-03',
		role: {
			en: 'Intern Laboratory Assistant',
			id: 'Asisten Magang Laboratorium',
		},
		org: 'Robotic and Embedded System Laboratory, Teknik Komputer, Universitas Andalas',
		location: 'Padang, ID',
		period: {
			en: 'Period: [TODO: confirm start & end month/year]',
			id: 'Periode: [TODO: konfirmasi bulan/tahun mulai & selesai]',
		},
		todoPeriod: true,
		summary: {
			en: 'Assisted senior laboratory assistants in preparing embedded systems modules, testing circuit boards, and supporting student lab sessions.',
			id: 'Membantu asisten laboratorium senior dalam menyiapkan modul sistem tertanam, menguji papan rangkaian, dan mendampingi sesi praktikum.',
		},
		highlights: {
			en: [
				'Prepared and verified microcontroller test benches prior to weekly laboratory sessions.',
				'Assisted troubleshooting of wiring, serial communication, and firmware uploads.',
			],
			id: [
				'Menyiapkan dan menguji kelayakan perangkat praktikum mikrokontroler sebelum sesi mingguan.',
				'Membantu penanganan kendala pengkabelan, komunikasi serial, dan pengunggahan firmware.',
			],
		},
	},
];

export const skillGroups: SkillGroup[] = [
	{
		code: 'SYS-A',
		domain: {
			en: 'Languages & Core',
			id: 'Bahasa Pemrograman',
		},
		items: ['C / C++', 'Python', 'TypeScript / JavaScript', 'SQL', 'HTML / CSS'],
		context: {
			en: 'Firmware development, data pipelines, and web applications',
			id: 'Pengembangan firmware, pipeline data, dan aplikasi web',
		},
	},
	{
		code: 'SYS-B',
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
		code: 'SYS-C',
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
		code: 'SYS-D',
		domain: {
			en: 'Software & Tooling',
			id: 'Software & Perangkat Kerja',
		},
		items: ['Astro / Node.js', 'REST APIs', 'Git & GitHub', 'Linux CLI', 'PlatformIO / Arduino IDE'],
		context: {
			en: 'Web dashboards, inventory systems, and version-controlled workflows',
			id: 'Dashboard web, sistem inventaris, dan alur kerja terkontrol versi',
		},
	},
];
