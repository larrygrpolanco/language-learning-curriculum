<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

// src/routes/+page.svelte // Home page - Displays available courses
<main class="container mx-auto px-4 py-8">
	<h1 class="mb-8 text-3xl font-bold">Language Courses</h1>

	<div class="grid gap-6 md:grid-cols-2">
		{#each data.courses as course}
			<a href="/{course.id}" class="block rounded-lg border p-6 hover:shadow-lg">
				<h2 class="text-2xl font-semibold">{course.title}</h2>
				<p class="mt-2 text-gray-600">{course.description}</p>
			</a>
		{/each}
	</div>
</main>
