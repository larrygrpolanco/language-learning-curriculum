<!-- // src/routes/[course]/[module]/+page.svelte -->
<script lang="ts">
	import type { Course, Module } from '$lib/types';

	export let data: {
		course: Course;
		module: Module;
	};
</script>

<div class="container mx-auto px-4 py-8">
	<!-- Breadcrumb navigation -->
	<nav class="mb-6 text-sm">
		<a href="/{data.course.slug}" class="text-blue-600 hover:underline">
			{data.course.title}
		</a>
		<span class="mx-2">›</span>
		<span>{data.module.title}</span>
	</nav>

	<h1 class="mb-8 text-3xl font-bold">{data.module.title}</h1>

	<!-- Units grid -->
	<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each data.module.units as unit}
			<a
				href="/{data.course.slug}/{data.module.slug}/{unit.slug}"
				class="block rounded-lg border p-6 transition-shadow hover:shadow-lg"
			>
				<h2 class="mb-3 text-xl font-semibold">{unit.title}</h2>

				<!-- Section preview -->
				<div class="space-y-2">
					{#each unit.sections as section}
						<div class="text-sm text-gray-600">
							<span class="inline-block w-6">{section.order}.</span>
							{section.title}
							{#if section.type !== 'default'}
								<span class="ml-1 text-gray-400">({section.type})</span>
							{/if}
						</div>
					{/each}
				</div>
			</a>
		{/each}
	</div>
</div>
