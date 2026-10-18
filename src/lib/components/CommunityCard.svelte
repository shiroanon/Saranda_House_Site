<script lang="ts">
	import type { Community } from '#lib/data/communities.ts';

	/**
	 * A community on the landing page. Same approach as a portrait card — the photograph is
	 * the ground and the type sits in a black wash at its foot — but here the copy matters
	 * as much as the picture, so the card is cut 4:5 and the intro is clamped to three lines.
	 */
	let {
		community,
		index
	}: {
		community: Community;
		/** Position in the set, shown as a mono number. */
		index: number;
	} = $props();
</script>

<a
	class="community group aspect-[4/5] focus-visible:outline-none"
	href={`/community/${community.slug}`}
	data-reveal
>
	{#if community.images.length}
		<img src={community.images[0]} alt="" loading="lazy" decoding="async" />
	{/if}
	<span class="community-scrim" aria-hidden="true"></span>

	<div class="relative p-6">
		<span class="card-index">No. {String(index + 1).padStart(2, '0')}</span>

		<h3 class="display-face mt-2 text-[1.5rem] leading-tight font-semibold text-parchment">
			{community.title}
		</h3>

		<span
			class="mt-3 block h-px w-10 bg-gold transition-all duration-500 group-hover:w-24"
			aria-hidden="true"
		></span>

		<p class="mt-3.5 line-clamp-3 text-sm leading-relaxed text-parchment/78">
			{community.intro}
		</p>

		<span class="text-link mt-5 inline-flex items-center gap-2">
			Explore community
			<span aria-hidden="true" class="transition-transform duration-300 group-hover:translate-x-1"
				>→</span
			>
		</span>
	</div>
</a>
