<script lang="ts">
	import { quickLinks, contacts, socials, usefulLinks, assets } from '#lib/data/site.ts';
</script>

<footer class="mt-20 bg-night text-parchment">
	<!-- Ribbon fringe: the same dashed gold edge that caps the banner bands. -->
	<div class="band-rule h-px w-full"></div>

	<div class="shell grid gap-12 py-14 md:grid-cols-[1.3fr_1fr_1fr]">
		<div>
			<div class="flex items-center gap-3">
				<img src={assets.logo} alt="Saranda crest" width="52" height="52" class="rounded-full" />
				<div>
					<p class="display-face text-2xl leading-none font-semibold">Saranda</p>
					<p class="eyebrow mt-1.5 text-gold">House of Excellence</p>
				</div>
			</div>

			<p class="eyebrow mt-9 mb-3 text-gold">Contact</p>
			<ul class="space-y-1.5 text-sm">
				{#each contacts as c (c.href)}
					<li>
						<a href={c.href} class="footer-link break-all">{c.text}</a>
					</li>
				{/each}
			</ul>

			<ul class="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm">
				{#each socials as s (s.href)}
					<li><a href={s.href} target="_blank" rel="noreferrer" class="footer-link">{s.text}</a></li>
				{/each}
			</ul>

			<a href="https://study.iitm.ac.in/" target="_blank" rel="noreferrer" class="mt-8 inline-block">
				<img src={assets.iitmLogo} alt="IIT Madras BS" width="58" height="58" />
			</a>
		</div>

		<div>
			<p class="eyebrow mb-4 text-gold">Quick links</p>
			<ul class="space-y-2 text-sm">
				{#each quickLinks as l (l.href)}
					<li><a href={l.href} class="footer-link">{l.text}</a></li>
				{/each}
			</ul>
		</div>

		<div>
			<p class="eyebrow mb-4 text-gold">Useful documents</p>
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

	<div class="band-rule h-px w-full"></div>
	<p class="shell py-5 text-center font-mono text-[0.72rem] tracking-wider text-parchment/60">
		© {new Date().getFullYear()} Saranda WebOps Team · All rights reserved
	</p>
</footer>
