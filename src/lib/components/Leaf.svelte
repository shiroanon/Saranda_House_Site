<script lang="ts">
	/**
	 * A single hand-drawn leaf, used as an ornament rather than an illustration.
	 *
	 * `currentColor` means the caller sets the tone; the inner fill is deliberately faint so
	 * the mark reads as a watermark on the mist, never as a logo.
	 */
	let { class: className = '' }: { class?: string } = $props();
</script>

<svg viewBox="0 0 64 64" fill="none" class={className} aria-hidden="true">
	<path
		d="M10 54C10 32 26 14 54 10c-2 28-20 44-44 44Z"
		fill="currentColor"
		opacity="0.16"
	/>
	<path
		d="M10 54C10 32 26 14 54 10"
		stroke="currentColor"
		stroke-width="1.6"
		stroke-linecap="round"
	/>
	<path
		d="M18 46c7-1 13-6 17-13M25 39c7-1 13-6 17-13M33 31c7-1 13-6 16-12"
		stroke="currentColor"
		stroke-width="1.2"
		stroke-linecap="round"
		opacity="0.65"
	/>
</svg>
