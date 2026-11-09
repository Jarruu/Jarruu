import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, Flip);

type Cleanup = () => void;

const initializers: Array<() => Cleanup | void> = [];
let activeCleanups: Cleanup[] = [];
let lenisInstance: Lenis | null = null;
let tickerCallback: ((time: number) => void) | null = null;
let bound = false;

export function prefersReducedMotion(): boolean {
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function startLenis() {
	if (prefersReducedMotion()) return;
	lenisInstance = new Lenis({
		duration: 1.05,
		smoothWheel: true,
	});
	lenisInstance.on('scroll', ScrollTrigger.update);
	tickerCallback = (time: number) => {
		lenisInstance?.raf(time * 1000);
	};
	gsap.ticker.add(tickerCallback);
	gsap.ticker.lagSmoothing(0);
}

function stopLenis() {
	if (tickerCallback) {
		gsap.ticker.remove(tickerCallback);
		tickerCallback = null;
	}
	if (lenisInstance) {
		lenisInstance.destroy();
		lenisInstance = null;
	}
}

export function onPageLoad(fn: () => Cleanup | void) {
	initializers.push(fn);
	if (!bound && typeof document !== 'undefined') {
		bound = true;
		document.addEventListener('astro:page-load', () => {
			stopLenis();
			startLenis();
			activeCleanups = initializers
				.map((init) => init())
				.filter((c): c is Cleanup => typeof c === 'function');
			ScrollTrigger.refresh();
		});
		document.addEventListener('astro:before-swap', () => {
			for (const cleanup of activeCleanups) {
				cleanup();
			}
			activeCleanups = [];
			ScrollTrigger.getAll().forEach((t) => t.kill());
			stopLenis();
		});
	}
}

export { gsap, ScrollTrigger, Flip };
