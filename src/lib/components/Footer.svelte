<script lang="ts">
	import { quickLinks, contacts, socials, usefulLinks, assets } from '#lib/data/site.ts';
	import Leaf from '#lib/components/Leaf.svelte';
</script>

<!-- The page ends in the trees: a canopy silhouette that fades into the forest floor. -->
<div class="treeline mt-14 md:mt-20" aria-hidden="true">
	<img src={assets.forestFront} alt="" />
</div>

<footer class="footer-floor">
	<!-- Ribbon fringe: the same dashed gold edge that caps the banner bands. -->
	<div class="h-px w-full band-rule"></div>

	<div class="shell grid gap-10 py-12 md:grid-cols-[1.3fr_1fr_1fr] md:gap-12 md:py-14">
		<div>
			<div class="flex items-center gap-3">
				<img
					src={assets.logo}
					alt="Saranda crest"
					width="52"
					height="52"
					class="crest-badge ring-1 ring-gold-light/25 crest"
				/>
				<div>
					<p class="display-face text-2xl leading-none font-semibold">Saranda</p>
					<p class="mt-1.5 flex items-center gap-1.5 eyebrow text-gold-light">
						<Leaf class="h-3 w-3" />
						House of Excellence
					</p>
				</div>
			</div>

			<p class="mt-9 mb-3 eyebrow text-gold-light">Contact</p>
			<ul class="space-y-1.5 text-sm">
				{#each contacts as c (c.href)}
					<li>
						<a href={c.href} class="footer-link break-all">{c.text}</a>
					</li>
				{/each}
			</ul>

			<ul class="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm">
				{#each socials as s (s.href)}
					<li>
						<a href={s.href} target="_blank" rel="noreferrer" class="footer-link">{s.text}</a>
					</li>
				{/each}
			</ul>

			<a
				href="https://study.iitm.ac.in/"
				target="_blank"
				rel="noreferrer"
				class="mt-8 inline-block"
			>
				<img src={assets.iitmLogo} alt="IIT Madras BS" width="58" height="58" />
			</a>
		</div>

		<div>
			<p class="mb-4 eyebrow text-gold-light">Quick links</p>
			<ul class="space-y-2 text-sm">
				{#each quickLinks as l (l.href)}
					<li><a href={l.href} class="footer-link">{l.text}</a></li>
				{/each}
			</ul>
		</div>

		<div>
			<p class="mb-4 eyebrow text-gold-light">Useful documents</p>
			<ul class="space-y-2 text-sm">
				{#each usefulLinks as l (l.title + l.url)}
					<li>
						<a href={l.url} target="_blank" rel="noreferrer" class="footer-link">
							{l.title} <span aria-hidden="true" class="opacity-60">↗</span>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>

	<div class="h-px w-full band-rule"></div>
	<p class="shell py-5 text-center text-[0.78rem] tracking-[0.03em] text-canopy-ink/65">
		© {new Date().getFullYear()} Saranda WebOps Team · All rights reserved
	</p>
</footer>
