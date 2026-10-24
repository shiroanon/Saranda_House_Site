<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import MeetupCollage from '#lib/components/MeetupCollage.svelte';
	import { assets } from '#lib/data/site.ts';
	import { formatDate, toDate } from '#lib/format.ts';
	import { reveal } from '#lib/motion.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	/** Pick the collage photos: an explicit selection, else the first four of the album. */
	const collageOf = (event: (typeof data.events)[number]) =>
		(event.collage?.length ? event.collage : (event.images ?? []).slice(0, 4)).slice(0, 4);

	/** The remaining photographs, so nothing is shown twice. */
	const restOf = (event: (typeof data.events)[number]) => {
		const chosen = new Set(collageOf(event));
		return (event.images ?? []).filter((src) => !chosen.has(src));
	};
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

<section class="shell pt-10 pb-14 md:pt-14" use:reveal>
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
				<div class="mt-6 max-w-md">
					<MeetupCollage
						photos={collageOf(event)}
						label={formatDate(event.date) || event.name}
						sublabel="Meetup"
					/>
				</div>

				{#if restOf(event).length}
					<div class="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
						{#each restOf(event) as src, i (`${event.$id}-rest-${i}`)}
							<img
								{src}
								alt={`${event.name} photo`}
								loading="lazy"
								class="h-auto w-full rounded-lg album-photo"
							/>
						{/each}
					</div>
				{/if}
			{/if}
		</article>
	{/each}
</section>
