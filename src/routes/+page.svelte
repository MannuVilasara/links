<script lang="ts">
	import { profile, links } from '$lib/data';
	import ProfileCard from '$lib/components/ProfileCard.svelte';
	import LinkCard from '$lib/components/LinkCard.svelte';
</script>

<div class="min-h-screen w-full bg-black text-white selection:bg-blue-500/30 font-sans">
	<!-- Background Gradients -->
	<div class="fixed inset-0 pointer-events-none overflow-hidden">
		<div class="absolute -top-[20%] -left-[10%] h-[70vh] w-[70vh] rounded-full bg-blue-900/10 blur-[120px]"></div>
		<div class="absolute top-[40%] -right-[10%] h-[60vh] w-[60vh] rounded-full bg-purple-900/10 blur-[100px]"></div>
	</div>

	<main class="relative z-10 mx-auto max-w-5xl h-full w-full px-4 py-8 md:px-8 md:py-24 flex flex-col justify-center">
		<div class="grid h-full w-full grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-4">
			
			<!-- Profile Card (Spans 2 columns, 2 rows) -->
			<div class="row-span-2 md:col-span-2 md:row-span-2">
				<ProfileCard {profile} />
			</div>

			<!-- Links -->
			{#each links as link}
				<LinkCard {link} />
			{/each}

		</div>
		


		<div class="absolute bottom-6 left-0 w-full text-center">
			<p class="text-xs font-medium text-neutral-600">
				Made with love ❤️ using <span class="text-[#ff3e00]">SvelteKit</span> by <a href="https://github.com/MannuVilasara" target="_blank" class="hover:text-white transition-colors">MannuVilasara</a>
			</p>
		</div>
	</main>
</div>
