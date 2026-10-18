<script lang="ts">
	import type { MeetupCollage } from '#lib/data/gallery.ts';

	/**
	 * One region's latest meetup as a single plate: two rails of photographs, the right one
	 * dropped, with the region named on a disc at the junction. The whole collage is one
	 * link — the photographs are decoration and the sticker is the label.
	 *
	 * Odd-indexed photographs go left, even-indexed right, so a region with three frames
	 * still reads as a pair with one left over rather than a lopsided row.
	 */
	let { collage }: { collage: MeetupCollage } = $props();

	const rails = $derived([
		collage.photos.filter((_, i) => i % 2 === 0),
		collage.photos.filter((_, i) => i % 2 === 1)
	]);
</script>

<a
	class="collage focus-visible:outline-none"
	href={`/meetups/${collage.city}`}
	aria-label={`${collage.label} meetups`}
	data-reveal
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
		<span class="collage-city">{collage.label}</span>
		<span class="collage-word">Meetup</span>
	</span>
</a>
