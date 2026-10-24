<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import PersonCard from '#lib/components/PersonCard.svelte';
	import SectionHead from '#lib/components/SectionHead.svelte';
	import { assets } from '#lib/data/site.ts';
	import { reveal } from '#lib/motion.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const total = $derived(
		data.upper.length + data.lower.length + data.teams.reduce((n, t) => n + t.members.length, 0)
	);
</script>

<svelte:head>
	<title>Know Us — Saranda</title>
	<meta
		name="description"
		content="Meet the Saranda House council, Regional Coordinators and teams."
	/>
</svelte:head>

<PageHero
	title="Know Us"
	kicker="The people who run the house"
	subtitle="House Council, Regional Coordinators, and the teams that keep Saranda moving."
	image={assets.mist2}
>
	<p class="eyebrow text-parchment/60">
		{total} people · across the council and {data.teams.length} teams
	</p>
</PageHero>

<!-- ──────────────────────────────────────────────────────────────  house council -->
<section class="shell pt-10 pb-14 md:pt-16 md:pb-20" use:reveal>
	<div class="roll">
		<SectionHead label="House Council" count={`${data.upper.length}`} />

		<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
			{#each data.upper as p (p.$id)}
				<PersonCard person={p} size="lg" />
			{/each}
		</div>
	</div>
</section>

<!-- ─────────────────────────────────────────────────────  regional coordinators -->
<section class="shell pb-14 md:pb-20" use:reveal>
	<div class="roll">
		<SectionHead label="Regional coordinators" count={`${data.lower.length} regions`} />

		<p class="mb-8 max-w-[60ch] text-primary/80" data-reveal>
			One coordinator for every region Saranda covers. If you are studying from outside Chennai,
			this is your first point of contact.
		</p>

		<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
			{#each data.lower as p (p.$id)}
				<PersonCard person={p} />
			{/each}
		</div>
	</div>
</section>

<!-- ────────────────────────────────────────────────────────────────────  teams -->
<section class="shell pb-14 md:pb-20" use:reveal>
	<div class="roll">
		<SectionHead label="Teams" count={`${data.teams.length}`} />

		<div class="flex flex-col gap-12">
			{#each data.teams as team (team.title)}
				<div>
					<div class="mb-6 flex items-center gap-4" data-reveal>
						<h3 class="shrink-0 display-face text-title font-semibold">{team.title}</h3>
						<span class="rule-wrap" aria-hidden="true">
							<span class="rule-line" data-reveal="rule"></span>
							<span class="rule-dot"></span>
						</span>
						<span class="shrink-0 eyebrow text-moss">{team.members.length}</span>
					</div>

					<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
						{#each team.members as p (p.$id)}
							<PersonCard person={p} size="sm" />
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
