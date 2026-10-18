<script lang="ts">
	import { assets, siteName, siteTagline } from '#lib/data/site.ts';
	import { communities } from '#lib/data/communities.ts';
	import { collages } from '#lib/data/gallery.ts';
	import { intro, parallax, refreshTriggers, reveal, splitWords } from '#lib/motion.ts';
	import CommunityCard from '#lib/components/CommunityCard.svelte';
	import MeetupCollage from '#lib/components/MeetupCollage.svelte';
	import SectionHead from '#lib/components/SectionHead.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const lead =
		'Saranda, The House of Excellence and Innovation, is one of the 12 student houses in the IIT Madras BS degree program.';
	const detail =
		'We cultivate a vibrant community by organizing regular meetups, hands-on workshops, tech showcases, eSports tournaments, and cultural festivals. Saranda brings together passionate learners to connect, innovate, and grow beyond boundaries.';

	const cards = Object.values(communities);

	/** The two forest plates drift apart, and the copy rises ahead of them. */
	const heroLayers = [
		{ sel: '.hero-back', y: 15 },
		{ sel: '.hero-front', y: -8 },
		{ sel: '.hero-copy', y: 24 }
	];

	$effect(() => {
		void data.totalMeetups;
		refreshTriggers();
	});
</script>

<svelte:head>
	<title>{siteName} — {siteTagline}</title>
	<meta name="description" content="{lead} {detail}" />
</svelte:head>

<!-- ────────────────────────────────  hero: the name between the two forests -->
<section class="hero" use:intro use:parallax={heroLayers}>
	<img src={assets.forestBack} alt="" class="hero-back" />
	<div class="hero-veil"></div>

	<div class="shell hero-copy">
		<!-- The institute's own crest stands beside the name rather than above it. -->
		<div class="flex items-center gap-4 md:gap-6">
			<img
				src={assets.iitmLogo}
				alt="IIT Madras"
				width="96"
				height="96"
				class="crest h-16 w-16 shrink-0 rounded-full object-cover md:h-24 md:w-24"
				data-intro="soft"
			/>

			<h1 class="display-face text-display leading-[0.9] font-semibold text-parchment">
				<span class="block overflow-hidden pt-[0.08em] pb-[0.16em]">
					<span class="block" data-intro="rise">{siteName}</span>
				</span>
			</h1>
		</div>

		<div class="mt-6 flex max-w-[22rem] items-center gap-3 text-gold">
			<span class="rule-line" data-intro-rule></span>
			<span class="rule-dot"></span>
		</div>

		<p
			class="display-face mt-6 max-w-[22ch] text-[1.2rem] leading-snug font-normal text-parchment/90 italic"
			data-intro="soft"
		>
			{siteTagline}
		</p>

		<div class="mt-9 flex flex-wrap gap-3">
			<a href="/know_us" class="btn-gold" data-intro="soft">Meet the house</a>
			<a href="/events" class="btn-ghost" data-intro="soft">Explore events</a>
		</div>
	</div>

	<img src={assets.forestFront} alt="" class="hero-front" />
</section>

<!-- ─────────────────────────────────────────────────────────────────────  about -->
<section class="shell py-20 md:py-28" use:reveal>
	<div class="rail">
		<div>
			<p class="eyebrow text-moss">About us</p>
			<span class="mt-3 hidden h-px w-12 bg-gold md:block"></span>
		</div>

		<div class="max-w-[62ch]">
			<p class="display-face text-title leading-[1.28] font-normal text-primary">
				<span use:splitWords>{lead}</span>
			</p>
			<p class="mt-6 text-lg leading-relaxed text-primary/85" data-reveal>{detail}</p>

			<div class="mt-8 flex flex-wrap gap-x-7 gap-y-3" data-reveal>
				<a href="/meetups" class="text-link">Regional meetups</a>
				<a href="/newsletter" class="text-link">The Saranda Express</a>
				<a href="/know_us" class="text-link">Who runs the house</a>
			</div>
		</div>
	</div>
</section>

<!-- ────────────────────────────────────────────────────────────  gallery -->
<!--
	One collage per meetup region: four photographs staggered 2x2 with the region named on
	a disc at the junction. Three across on a wide screen, two on a tablet, one on a phone.
-->
<section class="shell py-20 md:py-24" use:reveal>
	<div class="collage-grid grid items-start gap-x-6 gap-y-10 sm:grid-cols-2">
		{#each collages as item (item.city)}
			<MeetupCollage collage={item} />
		{/each}
	</div>

	<div class="mt-9 flex flex-wrap gap-x-7 gap-y-3">
		<a href="/meetups" class="text-link">Every meetup region</a>
		<a href="/events" class="text-link">What the house has run</a>
	</div>
</section>

<!-- ─────────────────────────────────────────────────────────────  communities -->
<section class="shell pb-20 md:pb-24" use:reveal>
	<SectionHead label="Communities" count={`${cards.length} to join`} />

	<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
		{#each cards as c, i (c.slug)}
			<CommunityCard community={c} index={i} />
		{/each}
	</div>
</section>
