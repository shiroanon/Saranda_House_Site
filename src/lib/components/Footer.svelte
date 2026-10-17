<script lang="ts">
	import { quickLinks, contacts, socials, usefulLinks, assets } from '#lib/data/site.ts';
</script>

<footer class="mt-16 bg-neutral-dark px-8 pt-9 text-neutral-light">
	<div
		class="mx-auto flex max-w-[120ch] flex-wrap justify-between gap-8 [&_a]:block [&_h3]:mb-4 [&_ul]:mb-8"
	>
		<div>
			<h3>Contacts</h3>
			<ul>
				{#each contacts as c (c.href)}
					<li><a href={c.href} target="_blank" rel="noreferrer">{c.text}</a></li>
				{/each}
			</ul>
			<div class="mb-6 flex flex-wrap gap-4">
				{#each socials as s (s.href)}
					<a href={s.href} target="_blank" rel="noreferrer" class="text-sm hover:text-secondary">
						{s.text}
					</a>
				{/each}
			</div>
			<div class="flex flex-wrap gap-4">
				<a href="/"><img src={assets.logo} alt="Saranda Logo" width="64" height="64" /></a>
				<a href="https://study.iitm.ac.in/" target="_blank" rel="noreferrer">
					<img src={assets.iitmLogo} alt="IITM Logo" width="64" height="64" />
				</a>
			</div>
		</div>

		<div>
			<h3>Quick Links</h3>
			<ul>
				{#each quickLinks as l (l.href)}
					<li><a href={l.href}>{l.text}</a></li>
				{/each}
			</ul>
		</div>

		<div>
			<h3>Other Useful Links</h3>
			<ul>
				{#each usefulLinks as l (l.title + l.url)}
					<li>
						<a href={l.url} target="_blank" rel="noreferrer">{l.title}</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
	<p class="mx-[-2rem] mt-4 text-center text-sm">
		© {new Date().getFullYear()} Saranda WebOps Team · All Rights Reserved
	</p>
</footer>
