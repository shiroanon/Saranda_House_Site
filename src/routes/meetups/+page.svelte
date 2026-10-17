<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { meetups, meetupCities, cityImages } from '#lib/data/meetups.ts';
	import { assets } from '#lib/data/site.ts';

	const totalEvents = Object.values(meetups).reduce((n, r) => n + r.events.length, 0);
</script>

<svelte:head>
	<title>Meet Ups — Saranda</title>
	<meta name="description" content="Explore Saranda meetups by region across India." />
</svelte:head>

<PageHero
	title="Meet Ups"
	subtitle={`${meetupCities.length} regions · ${totalEvents} meetups hosted so far`}
	image={assets.mist2}
/>

<section class="mx-auto max-w-[120ch] px-5 py-12">
	<h2 class="mb-8 text-center text-3xl font-bold">Explore Meetups by Region</h2>
	<div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
		{#each meetupCities as city (city)}
			<a
				href={`/meetups/${city}`}
				class="group overflow-hidden green-glass-container transition-transform hover:-translate-y-1"
			>
				<div class="overflow-hidden">
					<img
						src={cityImages[city] ?? assets.mist1}
						alt={`${city} region`}
						loading="lazy"
						class="h-52 w-full object-cover transition-transform duration-300 group-hover:scale-105"
					/>
				</div>
				<div class="p-5 text-center">
					<h3 class="text-xl font-bold capitalize">{city}</h3>
					<p class="mt-1 text-sm opacity-75">
						{meetups[city].events.length} meetup{meetups[city].events.length === 1 ? '' : 's'}
					</p>
					<span class="mt-2 inline-block font-semibold text-secondary-darker"
						>View past meetups →</span
					>
				</div>
			</a>
		{/each}
	</div>
</section>
