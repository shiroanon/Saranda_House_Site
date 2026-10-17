<script lang="ts">
	import { page } from '$app/state';
	import { nav, assets, siteName } from '#lib/data/site.ts';

	let mobileOpen = $state(false);
	let openDropdown = $state<string | null>(null);

	const isActive = (href: string) =>
		href === '/' ? page.url.pathname === '/' : page.url.pathname.startsWith(href);
</script>

<header class="sticky top-0 z-50 border-b border-primary/10 bg-neutral-light/80 backdrop-blur">
	<nav class="mx-auto flex max-w-[120ch] items-center justify-between gap-4 px-5 py-3">
		<a href="/" class="flex items-center gap-3" onclick={() => (mobileOpen = false)}>
			<img src={assets.logo} alt={`${siteName} logo`} width="44" height="44" class="rounded-full" />
			<span class="text-lg font-bold tracking-wide">{siteName}</span>
		</a>

		<!-- Desktop -->
		<ul class="hidden items-center gap-1 md:flex">
			{#each nav as item (item.href)}
				<li class="relative">
					{#if item.children}
						<button
							type="button"
							class="rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary/60"
							class:text-secondary-darker={isActive(item.href)}
							aria-expanded={openDropdown === item.text}
							onclick={() => (openDropdown = openDropdown === item.text ? null : item.text)}
							onblur={() => setTimeout(() => (openDropdown = null), 150)}
						>
							{item.text} <span aria-hidden="true">▾</span>
						</button>
						{#if openDropdown === item.text}
							<ul
								class="absolute right-0 mt-1 min-w-[10rem] overflow-hidden rounded-xl border border-primary/10 bg-neutral-light shadow-lg"
							>
								{#each item.children as child (child.href)}
									<li>
										<a
											href={child.href}
											class="block px-4 py-2 text-sm capitalize hover:bg-secondary/60"
											onclick={() => (openDropdown = null)}>{child.text}</a
										>
									</li>
								{/each}
							</ul>
						{/if}
					{:else}
						<a
							href={item.href}
							class="rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary/60"
							class:text-secondary-darker={isActive(item.href)}
							aria-current={isActive(item.href) ? 'page' : undefined}>{item.text}</a
						>
					{/if}
				</li>
			{/each}
		</ul>

		<button
			type="button"
			class="rounded-lg p-2 md:hidden"
			aria-label="Toggle menu"
			aria-expanded={mobileOpen}
			onclick={() => (mobileOpen = !mobileOpen)}
		>
			<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
				{#if mobileOpen}
					<path
						d="M18.3 5.7 12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7 4.3 4.3l6.3 6.3 6.3-6.3z"
					/>
				{:else}
					<path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" />
				{/if}
			</svg>
		</button>
	</nav>

	<!-- Mobile -->
	{#if mobileOpen}
		<ul class="border-t border-primary/10 bg-neutral-light px-5 pb-4 md:hidden">
			{#each nav as item (item.href)}
				<li>
					<a
						href={item.href}
						class="block py-2 font-medium"
						class:text-secondary-darker={isActive(item.href)}
						onclick={() => (mobileOpen = false)}>{item.text}</a
					>
				</li>
				{#if item.children}
					{#each item.children as child (child.href)}
						<li>
							<a
								href={child.href}
								class="block py-1.5 pl-5 text-sm capitalize opacity-90"
								onclick={() => (mobileOpen = false)}>· {child.text}</a
							>
						</li>
					{/each}
				{/if}
			{/each}
		</ul>
	{/if}
</header>
