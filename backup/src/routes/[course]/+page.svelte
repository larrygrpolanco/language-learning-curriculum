<!-- // src/routes/[course]/+page.svelte -->
<script lang="ts">
	import type { Course } from '$lib/types';

	export let data: { course: Course };
</script>

<div class="container mx-auto px-4 py-8">
	<h1 class="mb-8 text-3xl font-bold">{data.course.title} Course</h1>

	<div class="space-y-6">
		{#each data.course.modules as module}
			<div class="rounded-lg border p-6">
				<h2 class="mb-4 text-2xl font-semibold">{module.title}</h2>

				<div class="grid gap-4 md:grid-cols-2">
					{#each module.units as unit}
						<a
							href="/{data.course.slug}/{module.slug}/{unit.slug}"
							class="rounded border p-4 transition-colors hover:bg-gray-50"
						>
							<h3 class="mb-2 font-medium">{unit.title}</h3>
							<p class="text-sm text-gray-600">
								{unit.sections.length} learning sections
							</p>
						</a>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>
