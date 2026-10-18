<script lang="ts">
	import { assets, siteName, siteTagline } from '#lib/data/site.ts';
	import { communities } from '#lib/data/communities.ts';
	import { counter, intro, parallax, refreshTriggers, reveal, splitWords } from '#lib/motion.ts';
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
		<p class="eyebrow text-gold" data-intro="soft">IIT Madras BS · One of twelve houses</p>

		<h1 class="display-face mt-5 text-display leading-[0.9] font-semibold text-parchment">
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

<!-- ────────────────────────────────────────────────  the house across India -->
<section class="band" use:reveal>
	<div class="band-rule h-px w-full"></div>

	<div class="shell py-16 md:py-20">
		<div class="grid gap-12 md:grid-cols-[1.15fr_1fr] md:items-end">
			<div class="max-w-[54ch]">
				<p class="eyebrow text-gold" data-reveal>Across India</p>
				<h2 class="display-face mt-4 text-headline leading-[1.06] font-semibold">
					<span use:splitWords>A house that meets where its people already are</span>
				</h2>
				<p class="mt-5 text-parchment/80" data-reveal>
					The BS degree is spread across the country, so Saranda is too — and every chapter keeps a
					ledger of the evenings it has spent together.
				</p>
			</div>

			<dl class="grid grid-cols-3 gap-4 border-t border-gold/25 pt-6 md:border-t-0 md:pt-0">
				{#each ledger as stat (stat.label)}
					<div data-reveal>
						<dd class="display-face text-4xl leading-none font-semibold text-gold md:text-5xl">
							<span use:counter>{stat.value}</span>
						</dd>
						<dt class="eyebrow mt-3 text-parchment/60">{stat.label}</dt>
					</div>
				{/each}
			</dl>
		</div>

		<ul class="mt-12 flex flex-wrap gap-3 border-t border-gold/20 pt-10">
			{#each data.regions as region (region.$id)}
				<li data-reveal>
					<a href={`/meetups/${region.city}`} class="region-chip">
						{region.city}
						<span>{data.counts[region.city] ?? 0}</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>

	<div class="band-rule h-px w-full"></div>
</section>

<!-- ─────────────────────────────────────────────────────────────  communities -->
<section class="shell py-20 md:py-24" use:reveal>
	<SectionHead label="Communities" count={`${cards.length} to join`} />

	<div class="grid gap-6 md:grid-cols-3">
		{#each cards as c (c.slug)}
			<a href={`/community/${c.slug}`} class="pennant group" data-reveal>
				<div class="photo-box h-52">
					{#if c.images.length}
						<img src={c.images[0]} alt="" loading="lazy" />
					{/if}
					<span class="monogram" aria-hidden="true">{c.title.charAt(0)}</span>
				</div>

				<div class="flex grow flex-col p-6">
					<h3 class="display-face text-[1.35rem] leading-tight font-semibold">{c.title}</h3>

					<span
						class="mt-3 block h-px w-10 bg-gold transition-all duration-500 group-hover:w-24"
						aria-hidden="true"
					></span>

					<p class="mt-4 grow text-sm leading-relaxed text-primary/75 line-clamp-5">{c.intro}</p>

					<span class="text-link mt-6 self-start">
						Explore community
						<span aria-hidden="true" class="transition-transform duration-300 group-hover:translate-x-1"
							>→</span
						>
					</span>
				</div>
			</a>
		{/each}
	</div>
</section>
