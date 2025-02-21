<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

// src/routes/[course]/[module]/+page.svelte // Module page - Lists all units in the module
<main class="container mx-auto px-4 py-8">
	{#if data.error}
		<p class="text-red-600">{data.error}</p>
	{:else}
		<h1 class="mb-8 text-3xl font-bold">{data.module.title}</h1>

		<div class="space-y-6">
			{#each data.units as unit}
				<a
					href="/{params.course}/{params.module}/{unit.id}"
					class="block rounded-lg border p-6 hover:shadow-lg"
				>
					<h2 class="text-2xl font-semibold">{unit.title}</h2>
					<p class="mt-2 text-gray-600">{unit.description}</p>
				</a>
			{/each}
		</div>
	{/if}
</main>
