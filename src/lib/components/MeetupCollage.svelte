<script lang="ts">
	import type { MeetupCollage } from '#lib/data/gallery.ts';

	/**
	 * The house's collage motif: two rails of photographs, the right one dropped, with a
	 * circular sticker landing on the junction. Reused on the landing page (one per region)
	 * and on each meetup page (one per meetup, date-wise).
	 *
	 * Pass either a `collage` (landing) or `photos` + `label` (meetup page). The sticker's
	 * top line is the label, the bottom line the sublabel.
	 */
	let {
		collage,
		photos: photosProp,
		label: labelProp,
		sublabel = 'Meetup',
		href,
		reveal = true
	}: {
		collage?: MeetupCollage;
		photos?: string[];
		label?: string;
		sublabel?: string;
		href?: string;
		/**
		 * Emit the `data-reveal` hook for a parent `use:reveal` to animate. Turn it off where
		 * the collage is driven by something else (the pinned rail) — the global motion gate
		 * holds `[data-reveal]` at opacity 0 until an action releases it, so a hook with no
		 * action leaves the collage invisible.
		 */
		reveal?: boolean;
	} = $props();

	const photos = $derived(collage?.photos ?? photosProp ?? []);
	const label = $derived(labelProp ?? collage?.label ?? '');
	const target = $derived(href ?? (collage ? `/meetups/${collage.city}` : undefined));

	const rails = $derived([photos.filter((_, i) => i % 2 === 0), photos.filter((_, i) => i % 2 === 1)]);
</script>

{#if target}
	<a
		class="collage focus-visible:outline-none"
		href={target}
		aria-label={`${label} meetups`}
		data-reveal={reveal ? '' : undefined}
	>
		<span class="collage-rail collage-rail-early">
			{#each rails[0] as photo (photo)}
				<span class="collage-plate">
					<img src={photo} alt="" loading="lazy" decoding="async" />
				</span>
			{/each}
		</span>

		<span class="collage-rail collage-rail-late">
			{#each rails[1] as photo (photo)}
				<span class="collage-plate">
					<img src={photo} alt="" loading="lazy" decoding="async" />
				</span>
			{/each}
		</span>

		<span class="collage-sticker">
			<span class="collage-city">{label}</span>
			<span class="collage-word">{sublabel}</span>
		</span>
	</a>
{:else}
	<div class="collage" data-reveal={reveal ? '' : undefined}>
		<span class="collage-rail collage-rail-early">
			{#each rails[0] as photo (photo)}
				<span class="collage-plate">
					<img src={photo} alt="" loading="lazy" decoding="async" />
				</span>
			{/each}
		</span>

		<span class="collage-rail collage-rail-late">
			{#each rails[1] as photo (photo)}
				<span class="collage-plate">
					<img src={photo} alt="" loading="lazy" decoding="async" />
				</span>
			{/each}
		</span>

		<span class="collage-sticker">
			<span class="collage-city">{label}</span>
			<span class="collage-word">{sublabel}</span>
		</span>
	</div>
{/if}
