<!-- src/routes/[course]/+page.svelte
Course overview page - Lists all modules in the course -->
<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main class="container mx-auto px-4 py-8">
	{#if data.error}
		<p class="text-red-600">{data.error}</p>
	{:else}
		<h1 class="mb-8 text-3xl font-bold">{data.course.title}</h1>

		<div class="space-y-6">
			{#each data.modules as module}
				<a href="/{data.course.id}/{module.id}" class="block rounded-lg border p-6 hover:shadow-lg">
					<h2 class="text-2xl font-semibold">{module.title}</h2>
					<p class="mt-2 text-gray-600">{module.description}</p>
				</a>
			{/each}
		</div>
	{/if}
</main>
