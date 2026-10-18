<script lang="ts">
	import { assets, siteName, siteTagline } from '#lib/data/site.ts';
	import { communities } from '#lib/data/communities.ts';
	import { gallery } from '#lib/data/gallery.ts';
	import { intro, parallax, refreshTriggers, reveal, splitWords } from '#lib/motion.ts';
	import CommunityCard from '#lib/components/CommunityCard.svelte';
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

	const ledger = $derived([
		{ label: 'Regions', value: data.regions.length },
		{ label: 'Meetups held', value: data.totalMeetups },
		{ label: 'Communities', value: cards.length }
	]);

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
		<!-- The institute's own crest stands where a caption used to: the mark says it. -->
		<img
			src={assets.iitmLogo}
			alt="IIT Madras"
			width="72"
			height="72"
			class="crest h-16 w-16 rounded-full object-cover md:h-[4.5rem] md:w-[4.5rem]"
			data-intro="soft"
		/>

		<h1 class="display-face mt-6 text-display leading-[0.9] font-semibold text-parchment">
			<span class="block overflow-hidden pt-[0.08em] pb-[0.16em]">
				<span class="block" data-intro="rise">{siteName}</span>
			</span>
		</h1>

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
	One photograph per meetup region, in a single grid with a feature tile spanning two
	cells. The cell count (twelve) divides cleanly at two, three and four columns, so the
	same markup stays square at every breakpoint.
-->
<section class="shell py-20 md:py-24" use:reveal>
	<SectionHead label="From the house" count={`${data.totalMeetups} meetups on record`} />

	<div class="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
		{#each gallery as item, i (item.city)}
			<a
				href={`/meetups/${item.city}`}
				class="tile group aspect-square {i === 0 ? 'col-span-2 row-span-2' : ''}"
				data-reveal
			>
				<img src={item.src} alt="" loading="lazy" decoding="async" />
				<span class="tile-scrim" aria-hidden="true"></span>
				<span class="tile-meta">
					<span class="tile-index">{String(i + 1).padStart(2, '0')}</span>
					<span class="tile-label">{item.label}</span>
				</span>
			</a>
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
