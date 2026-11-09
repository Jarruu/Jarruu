import { gsap, ScrollTrigger, Flip, prefersReducedMotion } from '../lib/lifecycle';

export function initHomeAnimations(): () => void {
	const reduced = prefersReducedMotion();
	const ctx = gsap.context(() => {
		if (reduced) return;

		const heroLines = gsap.utils.toArray<HTMLElement>('[data-hero-reveal]');
		if (heroLines.length > 0) {
			gsap.fromTo(
				heroLines,
				{ y: 28, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.75,
					stagger: 0.09,
					ease: 'power3.out',
				},
			);
		}

		const words = gsap.utils.toArray<HTMLElement>('[data-scrub-word]');
		if (words.length > 0) {
			gsap.fromTo(
				words,
				{ opacity: 0.28 },
				{
					opacity: 1,
					stagger: 0.04,
					ease: 'none',
					scrollTrigger: {
						trigger: '[data-about-statement]',
						start: 'top 82%',
						end: 'bottom 55%',
						scrub: true,
					},
				},
			);
		}

		const timelineBar = document.querySelector<HTMLElement>('[data-timeline-progress]');
		const timelineWrap = document.querySelector<HTMLElement>('[data-timeline-wrap]');
		if (timelineBar && timelineWrap) {
			gsap.fromTo(
				timelineBar,
				{ scaleY: 0 },
				{
					scaleY: 1,
					ease: 'none',
					scrollTrigger: {
						trigger: timelineWrap,
						start: 'top 75%',
						end: 'bottom 65%',
						scrub: true,
					},
				},
			);
		}

		const revealBlocks = gsap.utils.toArray<HTMLElement>('[data-reveal]');
		for (const block of revealBlocks) {
			gsap.fromTo(
				block,
				{ y: 24, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.65,
					ease: 'power2.out',
					scrollTrigger: {
						trigger: block,
						start: 'top 88%',
						once: true,
					},
				},
			);
		}
	});

	const mm = gsap.matchMedia();
	mm.add('(min-width: 960px) and (prefers-reduced-motion: no-preference)', () => {
		const section = document.querySelector<HTMLElement>('[data-showcase-section]');
		const track = document.querySelector<HTMLElement>('[data-showcase-track]');
		const progressFill = document.querySelector<HTMLElement>('[data-showcase-progress]');
		const counterCurrent = document.querySelector<HTMLElement>('[data-showcase-current]');
		const panels = gsap.utils.toArray<HTMLElement>('[data-showcase-panel]');

		if (!section || !track || panels.length === 0) return;

		const getScrollDistance = () => Math.max(0, track.scrollWidth - section.clientWidth);

		const tween = gsap.to(track, {
			x: () => -getScrollDistance(),
			ease: 'none',
			scrollTrigger: {
				trigger: section,
				pin: true,
				scrub: 0.6,
				invalidateOnRefresh: true,
				end: () => `+=${getScrollDistance()}`,
				onUpdate: (self) => {
					if (progressFill) {
						progressFill.style.transform = `scaleX(${self.progress})`;
					}
					if (counterCurrent) {
						const idx = Math.min(
							panels.length,
							Math.max(1, Math.ceil(self.progress * panels.length)),
						);
						counterCurrent.textContent = String(idx).padStart(2, '0');
					}
				},
			},
		});

		for (const panel of panels) {
			const cover = panel.querySelector<HTMLElement>('[data-panel-cover]');
			if (cover) {
				gsap.fromTo(
					cover,
					{ clipPath: 'inset(0 18% 0 0)' },
					{
						clipPath: 'inset(0 0% 0 0)',
						ease: 'power2.out',
						scrollTrigger: {
							trigger: panel,
							containerAnimation: tween,
							start: 'left 85%',
							end: 'left 35%',
							scrub: true,
						},
					},
				);
			}
		}
	});

	return () => {
		mm.revert();
		ctx.revert();
	};
}

export function initWorksArchive(): () => void {
	const root = document.querySelector<HTMLElement>('[data-works-archive]');
	if (!root) return () => {};

	const reduced = prefersReducedMotion();
	const filterBtns = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-filter-btn]'));
	const viewBtns = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-view-btn]'));
	const items = Array.from(root.querySelectorAll<HTMLElement>('[data-work-item]'));
	const listContainer = root.querySelector<HTMLElement>('[data-works-container]');
	const emptyState = root.querySelector<HTMLElement>('[data-works-empty]');
	const resetBtn = root.querySelector<HTMLButtonElement>('[data-works-reset]');
	const previewBox = root.querySelector<HTMLElement>('[data-cursor-preview]');
	const previewImg = root.querySelector<HTMLImageElement>('[data-cursor-img]');

	function applyFilter(category: string) {
		const state = !reduced ? Flip.getState(items) : null;
		let visibleCount = 0;

		for (const btn of filterBtns) {
			const active = btn.dataset.filterBtn === category;
			btn.setAttribute('aria-pressed', String(active));
			btn.classList.toggle('is-active', active);
		}

		for (const item of items) {
			const match = category === 'all' || item.dataset.category === category;
			item.style.display = match ? '' : 'none';
			if (match) visibleCount++;
		}

		if (emptyState) {
			emptyState.hidden = visibleCount > 0;
		}

		if (state) {
			Flip.from(state, {
				duration: 0.45,
				ease: 'power2.out',
				stagger: 0.03,
				scale: false,
				onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.35 }),
				onLeave: (els) => gsap.to(els, { opacity: 0, duration: 0.2 }),
			});
		}
	}

	function applyViewMode(mode: string) {
		if (!listContainer) return;
		const state = !reduced ? Flip.getState(items) : null;
		listContainer.dataset.viewMode = mode;

		for (const btn of viewBtns) {
			const active = btn.dataset.viewBtn === mode;
			btn.setAttribute('aria-pressed', String(active));
			btn.classList.toggle('is-active', active);
		}

		if (state) {
			Flip.from(state, {
				duration: 0.45,
				ease: 'power2.out',
			});
		}
	}

	for (const btn of filterBtns) {
		btn.addEventListener('click', () => applyFilter(btn.dataset.filterBtn || 'all'));
	}

	for (const btn of viewBtns) {
		btn.addEventListener('click', () => applyViewMode(btn.dataset.viewBtn || 'list'));
	}

	resetBtn?.addEventListener('click', () => applyFilter('all'));

	let cleanupPreview = () => {};
	const finePointer = window.matchMedia('(pointer: fine)').matches;

	if (previewBox && previewImg && finePointer && !reduced) {
		const xTo = gsap.quickTo(previewBox, 'x', { duration: 0.35, ease: 'power3' });
		const yTo = gsap.quickTo(previewBox, 'y', { duration: 0.35, ease: 'power3' });

		const onMove = (e: PointerEvent) => {
			xTo(e.clientX + 24);
			yTo(e.clientY - 90);
		};

		window.addEventListener('pointermove', onMove);

		for (const item of items) {
			item.addEventListener('pointerenter', () => {
				if (listContainer?.dataset.viewMode === 'grid') return;
				const cover = item.dataset.cover;
				if (cover && previewImg.getAttribute('src') !== cover) {
					previewImg.setAttribute('src', cover);
				}
				previewBox.classList.add('is-visible');
			});
			item.addEventListener('pointerleave', () => {
				previewBox.classList.remove('is-visible');
			});
		}

		cleanupPreview = () => {
			window.removeEventListener('pointermove', onMove);
		};
	}

	return () => {
		cleanupPreview();
	};
}
