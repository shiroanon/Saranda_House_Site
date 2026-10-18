<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { assets } from '#lib/data/site.ts';
	import { formatDate, toDate } from '#lib/format.ts';
	import { reveal } from '#lib/motion.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>{data.city} meetups — Saranda</title>
	<meta name="description" content={`Past Saranda meetups in the ${data.city} region.`} />
</svelte:head>

<PageHero
	title={`${data.city} region`}
	kicker="Regional chapter"
	subtitle="Every Saranda meetup held here, with the photographs people brought back."
	image={data.image ?? assets.mist1}
>
	<a href="/meetups" class="btn-ghost">‹ All regions</a>
</PageHero>

<section class="shell pt-12 pb-16 md:pt-14" use:reveal>
	{#if data.events.length === 0}
		<p class="card p-8 text-center opacity-80">No meetups recorded for this region yet.</p>
	{/if}

	{#each data.events as event (event.$id)}
		<article class="border-t border-primary/15 py-10 first:border-t-0 first:pt-0" data-reveal>
			<header class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
				<h2 class="display-face text-title font-semibold capitalize">{event.name}</h2>
				{#if toDate(event.date)}
					<time class="event-date" datetime={toDate(event.date)}>{formatDate(event.date)}</time>
				{/if}
			</header>

			{#if event.description}
				<p class="mt-3 max-w-[68ch] leading-relaxed whitespace-pre-line text-primary/85">
					{event.description}
				</p>
			{/if}

			{#if event.images?.length}
				<div class="mt-6 columns-2 gap-3 md:columns-3 lg:columns-4">
					{#each event.images as src, i (`${event.$id}-${i}`)}
						<img
							{src}
							alt={`${event.name} photo`}
							loading="lazy"
							class="album-photo mb-3 w-full rounded-lg break-inside-avoid"
						/>
					{/each}
				</div>
			{/if}
		</article>
	{/each}
</section>
