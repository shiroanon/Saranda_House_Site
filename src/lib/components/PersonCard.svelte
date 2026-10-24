<script lang="ts">
	import SocialIcon from '#lib/components/SocialIcon.svelte';
	import { linkHref, LINK_ORDER, type Person } from '#lib/data/people.ts';
	import { assets } from '#lib/data/site.ts';

	/**
	 * One face in the house roll.
	 *
	 * The portrait is left in its own colours — the house identity comes from the frame and
	 * the type. The name sits *on* the photograph over a black wash, so the card reads as a
	 * portrait with a caption rather than a picture with a box beneath it. The person's own
	 * links wait until the card is hovered, so the face stays the subject.
	 */
	let {
		person,
		size = 'md'
	}: {
		person: Person;
		/** Portrait scale. Council get the large frame. */
		size?: 'sm' | 'md' | 'lg';
	} = $props();

	const nameSize = $derived(
		size === 'lg'
			? 'text-[1.4rem] sm:text-[1.6rem]'
			: size === 'sm'
				? 'text-base sm:text-lg'
				: 'text-lg sm:text-xl'
	);

	/** Only the marks this person actually has, in house order. */
	const links = $derived(
		LINK_ORDER.filter((kind) => person[kind]).map((kind) => ({
			kind,
			href: linkHref(kind, person[kind]!)
		}))
	);

	/** Screen-reader names — `mail` reads as an address, not a platform. */
	const label = (kind: (typeof LINK_ORDER)[number]) =>
		kind === 'mail'
			? `Email ${person.name}`
			: `${person.name} on ${{ instagram: 'Instagram', linkedin: 'LinkedIn', github: 'GitHub' }[kind]}`;
</script>

<article class="group face aspect-[4/5] {person.vacant ? 'face-open' : ''}" data-reveal>
	{#if person.photo}
		<img
			src={person.photo}
			alt={person.name}
			loading="lazy"
			decoding="async"
			style="object-position: {person.photoPosition ?? 'center 24%'}"
		/>
	{:else}
		<img src={assets.placeholder} alt={person.vacant ? '' : person.name} />
	{/if}

	<div class="face-scrim" aria-hidden="true"></div>

	<div class="face-meta">
		{#if person.vacant}
			<h3 class="display-face {nameSize} leading-tight font-semibold text-canopy-ink/85 italic">
				Vacant
			</h3>
		{:else}
			<h3 class="display-face {nameSize} leading-tight font-semibold text-canopy-ink">
				{person.name}
			</h3>
		{/if}

		<div class="mt-2.5 flex flex-wrap items-end justify-between gap-x-3 gap-y-2.5">
			<div class="min-w-0">
				<span
					class="mb-2.5 block h-px w-8 bg-gold-light transition-all duration-500 group-hover:w-16"
					aria-hidden="true"
				></span>
				<p class="font-mono text-[0.72rem] tracking-[0.08em] text-canopy-ink/75">{person.role}</p>
			</div>

			{#if links.length}
				<ul class="face-links shrink-0">
					{#each links as link (link.kind)}
						<li>
							<a class="face-link" href={link.href} aria-label={label(link.kind)}>
								<SocialIcon name={link.kind} />
							</a>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>
</article>
