<!-- // src/routes/+page.svelte -->
<script lang="ts">
	import type { Course } from '$lib/types';

	export let data: { courses: Course[] };
</script>

<div class="container mx-auto px-4 py-8">
	<h1 class="mb-8 text-3xl font-bold">Language Learning Resources</h1>

	<div class="grid gap-6 md:grid-cols-2">
		{#each data.courses as course}
			<a
				href="/{course.slug}"
				class="block rounded-lg border p-6 transition-shadow hover:shadow-lg"
			>
				<h2 class="mb-2 text-2xl font-semibold">{course.title}</h2>
				<p class="text-gray-600">
					{course.modules.length} modules available
				</p>
			</a>
		{/each}
	</div>
</div>
