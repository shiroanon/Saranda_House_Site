<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { pastEvents } from '#lib/data/events.ts';
	import { assets } from '#lib/data/site.ts';

	const withImage = pastEvents.filter((e) => e.image).length;
</script>

<svelte:head>
	<title>Events — Saranda</title>
	<meta name="description" content="Past events hosted by Saranda House at IITM BS." />
</svelte:head>

<PageHero
	title="Past Events"
	subtitle={`${pastEvents.length} events hosted by Saranda · ${withImage} with posters`}
	image={assets.woodPlank2}
/>

<section class="mx-auto flex max-w-[120ch] flex-col gap-8 px-5 py-12">
	{#each pastEvents as event (event.title)}
		<article class="grid gap-6 green-glass-container p-6 md:grid-cols-[240px_1fr]">
			{#if event.image}
				<img
					src={event.image}
					alt={event.title}
					loading="lazy"
					class="h-60 w-full album-photo rounded-lg object-cover md:h-full"
				/>
			{/if}
			<div>
				<h2 class="text-2xl font-bold">{event.title}</h2>
				<div class="mt-3 space-y-3 leading-6 opacity-90">
					{#each event.description.split('\n\n') as para}
						<p>{para}</p>
					{/each}
				</div>
			</div>
		</article>
	{/each}
</section>
