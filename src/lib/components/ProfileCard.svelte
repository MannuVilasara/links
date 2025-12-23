<script lang="ts">
	import type { Profile } from '$lib/data';

	let { profile }: { profile: Profile } = $props();
</script>

<div class="flex h-full flex-col justify-between rounded-3xl bg-neutral-900/50 p-8 border border-neutral-800 backdrop-blur-sm">
	<div>
		<div class="relative mb-6 inline-block">
			<img
				src={profile.avatarUrl}
				alt={profile.name}
				class="h-24 w-24 rounded-2xl object-cover shadow-2xl transition-transform hover:scale-105"
			/>
			<div class="group absolute -bottom-2 -right-2">
				<div class="flex h-8 w-8 cursor-help items-center justify-center rounded-xl bg-neutral-800 border-2 border-neutral-900 text-lg shadow-lg">
					💻
				</div>
				<!-- Custom Tooltip -->
				<div class="absolute left-1/2 top-10 -translate-x-1/2 opacity-0 transform transition-all duration-200 group-hover:opacity-100 group-hover:top-9 pointer-events-none z-20 w-max max-w-[150px]">
					<div class="rounded-lg bg-neutral-800/90 px-3 py-1.5 text-xs font-medium text-white shadow-xl backdrop-blur-sm border border-neutral-700/50">
						{profile.status}
						<div class="absolute -top-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-b-neutral-800/90"></div>
					</div>
				</div>
			</div>
		</div>

		<h1 class="mb-2 text-3xl font-bold tracking-tight text-white">{profile.name}</h1>
		<p class="text-neutral-400">{profile.role}</p>
	</div>

	<div class="mt-8">
		<div class="mb-6 flex items-center gap-2 text-sm text-neutral-500">
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
			{profile.location}
		</div>
		<p class="leading-relaxed text-neutral-300">
			{profile.bio}
		</p>
	</div>
</div>
