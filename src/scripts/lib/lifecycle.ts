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

function normalizePath(pathname: string): string {
	return pathname.replace(/\/+$/, '') || '/';
}

function resolveHashTarget(hash = window.location.hash): HTMLElement | null {
	const raw = hash.slice(1);
	if (!raw) return null;
	try {
		return document.getElementById(decodeURIComponent(raw));
	} catch {
		return document.getElementById(raw);
	}
}

function scrollToElement(target: HTMLElement, immediate = false) {
	if (lenisInstance) {
		// Lenis already subtracts CSS scroll-padding-top when resolving an Element target.
		lenisInstance.scrollTo(target, { immediate, force: true });
		return;
	}
	const scrollPad =
		Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
	const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - scrollPad);
	window.scrollTo({
		top,
		behavior: immediate || prefersReducedMotion() ? ('instant' as ScrollBehavior) : 'smooth',
	});
}

function handleSamePageHashClick(e: MouseEvent) {
	if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) {
		return;
	}
	const el = e.target instanceof Element ? e.target.closest('a[href]') : null;
	if (!(el instanceof HTMLAnchorElement)) return;
	if (el.hasAttribute('download') || el.dataset.astroReload !== undefined) return;
	if (el.target && el.target !== '_self') return;

	const url = new URL(el.href, location.href);
	if (
		url.origin !== location.origin ||
		normalizePath(url.pathname) !== normalizePath(location.pathname) ||
		url.search !== location.search ||
		!url.hash
	) {
		return;
	}

	const target = resolveHashTarget(url.hash);
	if (!target) return;

	// Prevent Astro ClientRouter from swapping the whole DOM on same-page #hash jumps.
	e.preventDefault();
	history.replaceState(history.state, '', url.pathname + url.search + url.hash);
	scrollToElement(target, prefersReducedMotion());
}

export function scrollToRatio(ratio: number, immediate = false) {
	const clamped = Math.max(0, Math.min(1, ratio));
	const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
	const targetY = clamped * maxScroll;

	if (lenisInstance) {
		lenisInstance.scrollTo(targetY, { immediate, force: true });
		return;
	}

	window.scrollTo({
		top: targetY,
		behavior: immediate || prefersReducedMotion() ? ('instant' as ScrollBehavior) : 'smooth',
	});
}

export function onPageLoad(fn: () => Cleanup | void) {
	initializers.push(fn);
	if (!bound && typeof document !== 'undefined') {
		bound = true;
		document.addEventListener('click', handleSamePageHashClick, { capture: true });
		document.addEventListener('astro:page-load', () => {
			stopLenis();
			const hashTarget = resolveHashTarget();
			if (hashTarget) scrollToElement(hashTarget, true);
			startLenis();
			activeCleanups = initializers
				.map((init) => init())
				.filter((c): c is Cleanup => typeof c === 'function');
			ScrollTrigger.refresh();
			if (hashTarget) {
				requestAnimationFrame(() => scrollToElement(hashTarget, true));
			}
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
