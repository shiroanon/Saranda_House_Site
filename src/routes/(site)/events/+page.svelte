<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { assets } from '#lib/data/site.ts';
	import { formatDate, toDate } from '#lib/format.ts';
	import { reveal } from '#lib/motion.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const withPoster = $derived(data.events.filter((e) => e.image).length);
</script>

<svelte:head>
	<title>Events — Saranda</title>
	<meta name="description" content="Past events hosted by Saranda House at IITM BS." />
</svelte:head>

<PageHero
	title="Past Events"
	kicker="Events"
	subtitle="{data.events.length} events hosted by Saranda{withPoster
		? ` · ${withPoster} with posters`
		: ''}. Every one of them was opened to the whole house."
	image={assets.woodPlank2}
/>

<section class="shell pt-10 pb-14 md:pt-16" use:reveal>
	{#if data.events.length === 0}
		<p class="card p-8 text-center opacity-80">No events yet — check back soon.</p>
	{/if}

	{#each data.events as event (event.$id)}
		<article
			class="grid gap-5 event-row {event.image
				? 'md:grid-cols-[15rem_minmax(0,1fr)] md:gap-7'
				: ''}"
			data-reveal
		>
			{#if event.image}
				<img src={event.image} alt="" loading="lazy" class="h-auto w-full rounded-xl album-photo" />
			{/if}

			<div class="min-w-0">
				{#if toDate(event.date)}
					<time class="event-date" datetime={toDate(event.date)}>{formatDate(event.date)}</time>
				{/if}

				<h2 class="mt-1 display-face text-title leading-tight font-semibold">{event.title}</h2>

				<div class="mt-4 max-w-[64ch] space-y-3 leading-relaxed text-primary/85">
					{#each (event.description ?? '').split('\n\n') as para (`${event.$id}-${para.slice(0, 24)}`)}
						{#if para.trim()}<p>{para}</p>{/if}
					{/each}
				</div>
			</div>
		</article>
	{/each}
</section>
