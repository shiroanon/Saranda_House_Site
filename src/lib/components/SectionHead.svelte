<script lang="ts">
	/**
	 * Section heading: a mono label, the banner rule, and an optional count or aside.
	 *
	 * The rule marks a real boundary — where one section ends and the next begins — so it
	 * is structure rather than trim. It draws left-to-right when the section scrolls in.
	 */
	let {
		label,
		tone = 'moss',
		count = '',
		intro = false
	}: {
		label: string;
		tone?: 'moss' | 'gold';
		count?: string;
		intro?: boolean;
	} = $props();
</script>

<div class="section-head" class:text-gold={tone === 'gold'} data-reveal>
	<span>{label}</span>
	<span class="rule-wrap" aria-hidden="true">
		{#if intro}
			<span class="rule-line" data-intro-rule></span>
		{:else}
			<span class="rule-line" data-reveal="rule"></span>
		{/if}
		<span class="rule-dot"></span>
	</span>
	{#if count}
		<span class="shrink-0">{count}</span>
	{/if}
</div>
