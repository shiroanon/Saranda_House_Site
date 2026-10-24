<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import MeetupCollage from './MeetupCollage.svelte';
	import type { MeetupCollage as Collage } from '#lib/data/gallery.ts';

	/**
	 * The landing gallery: a rail of meetup collages the page pins while vertical scroll
	 * drives it sideways, so each region passes through one at a time.
	 *
	 * Structure mirrors GSAP's own horizontal-scroll demo — a dedicated `.pin-wrap` is the
	 * pinned element and a separate `.anim-wrap` is the translated track. Nothing here uses
	 * `position: sticky`; a CSS sticky and ScrollTrigger's `pin` would both claim the same
	 * element and the pin slips.
	 */
	let { items }: { items: Collage[] } = $props();

	let sectionEl: HTMLElement;
	let pinEl: HTMLElement;
	let trackEl: HTMLElement;
	let mm: ReturnType<typeof gsap.matchMedia> | null = null;

	/** How far the rail must travel to bring its last collage fully into view. */
	const getToValue = () => -(trackEl.scrollWidth - window.innerWidth);

	onMount(() => {
		if (typeof window === 'undefined') return;

		/*
		 * The sideways rail is a desktop gesture. On a phone the panels are too narrow to
		 * read, so the same collages stack as a full-width column (see the style block) and
		 * no pin is created at all. matchMedia also tears the pin down if the viewport
		 * crosses the breakpoint, instead of leaving a stale spacer behind.
		 */
		mm = gsap.matchMedia();
		mm.add('(min-width: 48.0625rem) and (prefers-reduced-motion: no-preference)', () => {
			const ctx = gsap.context(() => {
				gsap.fromTo(
					trackEl,
					{ x: 0 },
					{
						// Function-based so a refresh re-measures instead of reusing stale pixels.
						x: getToValue,
						ease: 'none',
						scrollTrigger: {
							trigger: sectionEl,
							start: 'top top',
							end: () => '+=' + (trackEl.scrollWidth - window.innerWidth),
							pin: pinEl,
							pinSpacing: true,
							invalidateOnRefresh: true,
							scrub: true,
							anticipatePin: 1
						}
					}
				);
			}, sectionEl);

			/*
			 * Trigger positions are measured at mount, but the hero, fonts and photos above
			 * settle afterwards and shift the section down. Refresh once each has landed, or
			 * the pin starts at the wrong scroll offset.
			 */
			const refresh = () => ScrollTrigger.refresh();
			window.addEventListener('load', refresh);
			document.fonts?.ready.then(refresh).catch(() => {});
			const raf = requestAnimationFrame(refresh);

			return () => {
				cancelAnimationFrame(raf);
				window.removeEventListener('load', refresh);
				ctx.revert();
			};
		});
	});

	onDestroy(() => {
		mm?.revert();
		mm = null;
	});
</script>

<section class="rail-section" bind:this={sectionEl}>
	<!-- The rail has no heading on desktop; on a phone the stacked collages need one. -->
	<div class="rail-mobile-head shell">
		<p class="eyebrow text-moss">Meetups by region</p>
		<span class="mt-3 block h-px w-12 bg-gold" aria-hidden="true"></span>
	</div>

	<div class="pin-wrap" bind:this={pinEl}>
		<div class="anim-wrap" bind:this={trackEl}>
			{#each items as item (item.city)}
				<div class="rail-item">
					<MeetupCollage
						photos={item.photos}
						label={item.label}
						href={`/meetups/${item.city}`}
						reveal={false}
					/>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.rail-section {
		position: relative;
	}

	/* The element ScrollTrigger pins: exactly one viewport tall, clips the track. */
	.pin-wrap {
		position: relative;
		z-index: 1;
		display: flex;
		height: 100vh;
		overflow: hidden;
		/* Solid ground so the near-black collages read against something. */
		background: linear-gradient(
			to bottom,
			var(--color-night) 0%,
			color-mix(in oklab, var(--color-night) 78%, var(--color-abyss)) 100%
		);
	}

	/* The translated track. Items are adjacent (no gap) and carry their own padding. */
	.anim-wrap {
		position: relative;
		display: flex;
		align-items: center;
		padding-inline: 6rem;
		will-change: transform;
	}

	/*
	 * Fixed-width panels with a hairline divider between them, borrowed from the demo's
	 * `.item`. Block, not flex: the collage inside is an inline-size container sized in
	 * `cqw`, so it needs a definite width from the panel rather than a content-sized flex box.
	 * The generous inline padding is the gap between collages; the divider sits at its centre.
	 */
	.rail-item {
		flex: 0 0 auto;
		width: min(86vw, 43rem, 71vh);
		padding: 3rem 4.5rem;
		border-right: 1px solid color-mix(in oklab, var(--color-parchment) 10%, transparent);
	}

	/* Alternate the panels' vertical position as they pass, as the demo does. */
	.rail-item:nth-child(2n + 2) {
		align-self: flex-start;
	}

	.rail-item:nth-child(4n + 4) {
		align-self: flex-end;
	}

	.rail-mobile-head {
		display: none;
	}

	/*
	 * On a phone the sideways rail is the wrong gesture: one narrow panel per screen made
	 * the collages small and left most of the viewport empty. Stack the same panels at the
	 * full shell width instead, so every photograph is legible and nothing hides off-screen.
	 */
	@media (max-width: 48rem) {
		.rail-mobile-head {
			display: block;
			margin-bottom: 1.75rem;
		}

		.pin-wrap {
			display: block;
			height: auto;
			overflow: visible;
			padding-block: 0 2rem;
			padding-inline: 1.25rem;
		}

		.anim-wrap {
			flex-direction: column;
			align-items: stretch;
			gap: 2.75rem;
			padding-inline: 0;
			will-change: auto;
		}

		.rail-item,
		.rail-item:nth-child(2n + 2),
		.rail-item:nth-child(4n + 4) {
			width: 100%;
			max-width: 40rem;
			margin-inline: auto;
			padding: 0;
			border-right: 0;
			align-self: auto;
		}
	}

	/*
	 * No pin and no sideways scroll for a visitor who asked for less motion, so the rail
	 * cannot hide collages 2–4 behind the clip — lay them out as one plain readable column.
	 */
	@media (prefers-reduced-motion: reduce) {
		.pin-wrap {
			display: block;
			height: auto;
			overflow: visible;
			padding-block: 4rem;
			padding-inline: 1.25rem;
		}

		.anim-wrap {
			flex-direction: column;
			align-items: center;
			gap: 3rem;
			padding-inline: 0;
		}

		.rail-item,
		.rail-item:nth-child(2n + 2),
		.rail-item:nth-child(4n + 4) {
			width: 100%;
			max-width: 54rem;
			padding: 0;
			border-right: 0;
			align-self: center;
		}
	}
</style>
