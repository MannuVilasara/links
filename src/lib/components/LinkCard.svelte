<script lang="ts">
	import type { LinkItem } from '$lib/data';
	import { ArrowUpRight } from 'lucide-svelte';

	let { link }: { link: LinkItem } = $props();
	let Icon = $derived(link.icon);
</script>

<a
	href={link.url}
	target="_blank"
	rel="noopener noreferrer"
	class="{link.class} group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-neutral-900/50 p-6 transition-all duration-300 hover:bg-neutral-800 hover:scale-[1.02] hover:shadow-xl hover:shadow-neutral-900/50 border border-neutral-800/50 hover:border-neutral-700"
>
	<div class="flex justify-between items-start">
		<div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/50 {link.color} transition-colors">
			<Icon size={24} />
		</div>
		<div class="text-neutral-600 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white">
			<ArrowUpRight size={20} />
		</div>
	</div>

	<div>
		<h3 class="text-xl font-bold text-white mb-1">{link.title}</h3>
		<p class="text-sm font-medium text-neutral-500 group-hover:text-neutral-400">{link.subtitle}</p>
	</div>
</a>
