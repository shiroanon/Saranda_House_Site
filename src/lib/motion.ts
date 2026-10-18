import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * GSAP wiring for the public site.
 *
 * Everything here is exposed as a Svelte action so a component owns its own animation and
 * `destroy` cleans it up on navigation. Motion is opt-in and reversible:
 *
 *  - app.html sets `html.motion` before first paint (and retracts it if GSAP never boots),
 *    which is what hides reveal targets in CSS — so with JS off the page just renders.
 *  - Each action only runs its tween under `(prefers-reduced-motion: no-preference)`, so a
 *    visitor who asks for less motion gets the final state and nothing plays.
 */

if (typeof window !== 'undefined') {
	gsap.registerPlugin(ScrollTrigger);
	// Signals app.html to keep reveal targets hidden through first paint.
	(window as typeof window & { __gsapBooted?: boolean }).__gsapBooted = true;
}

const NO_MOTION = '(prefers-reduced-motion: no-preference)';

export type RevealOptions = {
	/** Seconds between items in a stagger. */
	stagger?: number;
	/** Rise distance, in px. */
	y?: number;
	/** ScrollTrigger start point. */
	start?: string;
};

/**
 * Scroll-triggered reveal for everything inside `node`.
 *
 * Animates `[data-reveal]` (fade + rise) and `[data-reveal="rule"]` (the banner rule
 * drawing left to right) as one trigger, so a section arrives as a single gesture.
 */
export function reveal(node: HTMLElement, options: RevealOptions | true = {}) {
	const { stagger = 0.07, y = 22, start = 'top 85%' } = options === true ? {} : options;

	const mm = gsap.matchMedia();

	mm.add(NO_MOTION, () => {
		const items = gsap.utils
			.toArray<HTMLElement>('[data-reveal]', node)
			.filter((el) => el.getAttribute('data-reveal') !== 'rule');
		const rules = gsap.utils.toArray<HTMLElement>('[data-reveal="rule"]', node);
		const trigger = { trigger: node, start, once: true } as const;

		if (items.length) {
			gsap.fromTo(items, { autoAlpha: 0, y }, {
				autoAlpha: 1,
				y: 0,
				duration: 0.75,
				ease: 'power3.out',
				stagger,
				scrollTrigger: trigger
			});
		}

		if (rules.length) {
			gsap.fromTo(rules, { scaleX: 0 }, {
				scaleX: 1,
				duration: 1.05,
				ease: 'power3.inOut',
				stagger,
				scrollTrigger: trigger
			});
		}
	});

	return { destroy: () => mm.revert() };
}

/**
 * The hero's load sequence: banner rule draws, the display line rises out of its mask,
 * then the supporting copy settles in behind it.
 *
 * `rise` targets must sit inside an `overflow: hidden` wrapper to get the clip-mask.
 */
export function intro(node: HTMLElement) {
	const mm = gsap.matchMedia();

	mm.add(NO_MOTION, () => {
		const rise = gsap.utils.toArray<HTMLElement>('[data-intro~="rise"]', node);
		const soft = gsap.utils.toArray<HTMLElement>('[data-intro~="soft"]', node);
		const rules = gsap.utils.toArray<HTMLElement>('[data-intro-rule]', node);

		const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

		if (rise.length) {
			/*
			 * `y: 0` matters: the CSS gate sets `translateY(112%)`, which GSAP reads as a
			 * pixel offset. Animating yPercent alone would leave that offset in place.
			 */
			tl.fromTo(rise, { y: 0, yPercent: 112 }, {
				y: 0,
				yPercent: 0,
				duration: 1.15,
				ease: 'power4.out',
				stagger: 0.07
			}, 0.05);
		}

		if (rules.length) {
			tl.fromTo(rules, { scaleX: 0 }, {
				scaleX: 1,
				duration: 1.05,
				ease: 'power3.inOut',
				stagger: 0.08
			}, 0.25);
		}

		if (soft.length) {
			tl.fromTo(soft, { autoAlpha: 0, y: 16 }, {
				autoAlpha: 1,
				y: 0,
				duration: 0.8,
				stagger: 0.09
			}, 0.5);
		}

		return () => tl.kill();
	});

	return { destroy: () => mm.revert() };
}

export type ParallaxLayer = { sel: string; y: number };

/**
 * Scroll-linked parallax. Each layer moves by `y` percent of its own height across the
 * node's travel — negative pulls a layer up faster than the page, positive lets it trail.
 */
export function parallax(node: HTMLElement, layers: ParallaxLayer[]) {
	const mm = gsap.matchMedia();

	mm.add(NO_MOTION, () => {
		for (const layer of layers) {
			const target = node.querySelector<HTMLElement>(layer.sel);
			if (!target) continue;

			gsap.fromTo(target, { yPercent: 0 }, {
				yPercent: layer.y,
				ease: 'none',
				scrollTrigger: {
					trigger: node,
					start: 'top top',
					end: 'bottom top',
					scrub: 0.6
				}
			});
		}

		return () => void 0;
	});

	return { destroy: () => mm.revert() };
}

/** Recalculate trigger positions — call after images or async content resize the page. */
export function refreshTriggers() {
	if (typeof window !== 'undefined') ScrollTrigger.refresh();
}

/**
 * Split an element's text into masked words and reveal them on scroll.
 *
 * The original text is kept on the node as `aria-label` and each word is hidden from
 * assistive tech, so screen readers still hear one sentence rather than 12 fragments.
 */
export function splitWords(node: HTMLElement, options: { stagger?: number; y?: number } = {}) {
	const { stagger = 0.035, y = 110 } = options;
	const text = node.textContent?.trim() ?? '';
	if (!text) return { destroy() {} };

	node.setAttribute('aria-label', text);
	node.innerHTML = text
		.split(/(\s+)/)
		.map((part) =>
			/^\s+$/.test(part)
				? part
				: `<span class="word" aria-hidden="true"><span class="word-i">${part}</span></span>`
		)
		.join('');

	const words = gsap.utils.toArray<HTMLElement>('.word-i', node);
	const mm = gsap.matchMedia();

	mm.add(NO_MOTION, () => {
		gsap.fromTo(words, { yPercent: y }, {
			yPercent: 0,
			duration: 0.9,
			ease: 'power4.out',
			stagger,
			scrollTrigger: { trigger: node, start: 'top 88%', once: true }
		});
	});

	return { destroy: () => mm.revert() };
}

/** Count up to the number already in the element, when it scrolls into view. */
export function counter(node: HTMLElement) {
	const target = Number((node.textContent ?? '').replace(/[^\d.]/g, ''));
	if (!Number.isFinite(target) || target <= 0) return { destroy() {} };

	const mm = gsap.matchMedia();

	mm.add(NO_MOTION, () => {
		const state = { value: 0 };
		node.textContent = '0';

		const tween = gsap.to(state, {
			value: target,
			duration: 1.5,
			ease: 'power2.out',
			onUpdate: () => (node.textContent = String(Math.round(state.value))),
			scrollTrigger: { trigger: node, start: 'top 92%', once: true }
		});

		return () => tween.kill();
	});

	return { destroy: () => mm.revert() };
}

/** Thin gold bar that fills as the page is scrolled — the banner rule, doing a job. */
export function scrollProgress(node: HTMLElement) {
	const mm = gsap.matchMedia();

	mm.add(NO_MOTION, () => {
		const tween = gsap.fromTo(node, { scaleX: 0 }, {
			scaleX: 1,
			ease: 'none',
			scrollTrigger: { start: 0, end: 'max', scrub: 0.25 }
		});

		return () => tween.kill();
	});

	return { destroy: () => mm.revert() };
}
