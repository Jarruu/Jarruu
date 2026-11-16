import deviconJson from '@iconify-json/devicon/icons.json';

export interface TechLogo {
	label: string;
	viewBox: string;
	body: string;
}

interface IconifyEntry {
	body: string;
	width?: number;
	height?: number;
}

interface IconifyCollection {
	width?: number;
	height?: number;
	icons: Record<string, IconifyEntry>;
}

const devicon = deviconJson as unknown as IconifyCollection;
const defaultW = devicon.width ?? 128;
const defaultH = devicon.height ?? 128;

function fromDevicon(key: string, label: string): TechLogo {
	const entry = devicon.icons[key];
	if (!entry) {
		throw new Error(`Missing devicon icon: ${key}`);
	}
	const w = entry.width ?? defaultW;
	const h = entry.height ?? defaultH;
	return {
		label,
		viewBox: `0 0 ${w} ${h}`,
		body: entry.body,
	};
}

function customLogo(label: string, body: string): TechLogo {
	return {
		label,
		viewBox: '0 0 24 24',
		body,
	};
}

const CUSTOM_LOGOS = {
	yolo: customLogo(
		'YOLO',
		`<rect x="3" y="3" width="18" height="18" rx="3" fill="#0B1F3A"/>
		<path d="M7 9V7h2M15 7h2v2M7 15v2h2M15 17h2v-2" stroke="#38BDF8" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
		<circle cx="12" cy="12" r="2.2" fill="#FACC15"/>`,
	),
	edgeAi: customLogo(
		'Edge AI',
		`<rect x="6" y="6" width="12" height="12" rx="2.5" fill="#1D4ED8"/>
		<path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" stroke="#60A5FA" stroke-width="1.7" stroke-linecap="round"/>
		<path d="M9.5 12h1.5l1-2.5 1.5 5 1-2.5h1" stroke="#FDE047" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
	),
	esp32: customLogo(
		'ESP32',
		`<rect x="5" y="5" width="14" height="14" rx="2.5" fill="#DC2626"/>
		<path d="M8.5 2.5v2.5M12 2.5v2.5M15.5 2.5v2.5M8.5 19v2.5M12 19v2.5M15.5 19v2.5M2.5 8.5H5M2.5 12H5M2.5 15.5H5M19 8.5h2.5M19 12h2.5M19 15.5h2.5" stroke="#991B1B" stroke-width="1.5" stroke-linecap="round"/>
		<path d="M9 10.2a4.3 4.3 0 0 1 6 0M10.4 12.4a2.3 2.3 0 0 1 3.2 0" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" fill="none"/>
		<circle cx="12" cy="14.7" r="1" fill="#FDE047"/>`,
	),
	telemetry: customLogo(
		'Telemetry',
		`<circle cx="12" cy="15.5" r="2" fill="#7C3AED"/>
		<path d="M8.5 12.2a5 5 0 0 1 7 0M5.5 9.2a9.2 9.2 0 0 1 13 0" stroke="#0EA5E9" stroke-width="1.9" stroke-linecap="round" fill="none"/>
		<path d="M12 17.5v3.5" stroke="#7C3AED" stroke-width="1.9" stroke-linecap="round"/>`,
	),
	serialBus: customLogo(
		'Serial Bus',
		`<path d="M4 7h7l2 3h7M4 12h16M4 17h7l2-3h7" stroke="#0D9488" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
		<circle cx="4" cy="7" r="1.6" fill="#0F766E"/>
		<circle cx="4" cy="12" r="1.6" fill="#0284C7"/>
		<circle cx="4" cy="17" r="1.6" fill="#0F766E"/>
		<circle cx="20" cy="10" r="1.6" fill="#F59E0B"/>
		<circle cx="20" cy="12" r="1.6" fill="#0284C7"/>
		<circle cx="20" cy="14" r="1.6" fill="#F59E0B"/>`,
	),
	sensors: customLogo(
		'Sensors',
		`<rect x="4" y="13" width="16" height="6" rx="2" fill="#D97706"/>
		<circle cx="8" cy="16" r="1" fill="#FEF3C7"/>
		<circle cx="12" cy="16" r="1" fill="#FEF3C7"/>
		<path d="M7.5 10a5.5 5.5 0 0 1 9 0M5 7a9 9 0 0 1 14 0" stroke="#EA580C" stroke-width="1.8" stroke-linecap="round" fill="none"/>`,
	),
	restApi: customLogo(
		'REST APIs',
		`<rect x="2.5" y="4.5" width="19" height="15" rx="3" fill="#065F46"/>
		<path d="M8.5 9L5.5 12l3 3M15.5 9l3 3-3 3M13 8.5l-2 7" stroke="#34D399" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
	),
};

const SKILL_LOGO_MAP: Record<string, TechLogo[]> = {
	'C / C++': [fromDevicon('c', 'C'), fromDevicon('cplusplus', 'C++')],
	Python: [fromDevicon('python', 'Python')],
	'TypeScript / JavaScript': [
		fromDevicon('typescript', 'TypeScript'),
		fromDevicon('javascript', 'JavaScript'),
	],
	'C#': [fromDevicon('csharp', 'C#')],
	Dart: [fromDevicon('dart', 'Dart')],
	'PyTorch / TensorFlow': [
		fromDevicon('pytorch', 'PyTorch'),
		fromDevicon('tensorflow', 'TensorFlow'),
	],
	OpenCV: [fromDevicon('opencv', 'OpenCV')],
	'YOLO Object Detection': [CUSTOM_LOGOS.yolo],
	'NumPy / Pandas': [fromDevicon('numpy', 'NumPy'), fromDevicon('pandas', 'Pandas')],
	'Edge Inference': [CUSTOM_LOGOS.edgeAi],
	'ESP32 / Arduino': [CUSTOM_LOGOS.esp32, fromDevicon('arduino', 'Arduino')],
	'Raspberry Pi': [fromDevicon('raspberrypi', 'Raspberry Pi')],
	'MQTT & HTTP Telemetry': [CUSTOM_LOGOS.telemetry],
	'I2C / SPI / UART': [CUSTOM_LOGOS.serialBus],
	'Sensor & Actuator Interfacing': [CUSTOM_LOGOS.sensors],
	Astro: [fromDevicon('astro', 'Astro')],
	React: [fromDevicon('react', 'React')],
	'Next.js': [fromDevicon('nextjs', 'Next.js')],
	Flutter: [fromDevicon('flutter', 'Flutter')],
	'React Native': [fromDevicon('reactnative', 'React Native')],
	Laravel: [fromDevicon('laravel', 'Laravel')],
	'ASP.NET': [fromDevicon('dotnetcore', 'ASP.NET')],
	NestJS: [fromDevicon('nestjs', 'NestJS')],
	'REST APIs': [CUSTOM_LOGOS.restApi],
	'Git & GitHub': [fromDevicon('git', 'Git'), fromDevicon('github', 'GitHub')],
	'Arduino IDE': [fromDevicon('arduino', 'Arduino IDE')],
};

export function getSkillLogos(skillName: string): TechLogo[] {
	return SKILL_LOGO_MAP[skillName] ?? [CUSTOM_LOGOS.restApi];
}
