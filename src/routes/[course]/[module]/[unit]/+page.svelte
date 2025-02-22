<!-- // src/routes/[course]/[module]/[unit]/+page.svelte -->
<script lang="ts">
	import type { Course, Module, Unit } from '$lib/types';

	export let data: {
		course: Course;
		module: Module;
		unit: Unit;
	};

	let activeSection = data.unit.sections[0]?.order;
	$: currentSection = data.unit.sections.find((s) => s.order === activeSection);
</script>

<div class="container mx-auto px-4 py-8">
	<!-- Breadcrumb navigation -->
	<nav class="mb-6 text-sm">
		<a href="/{data.course.slug}" class="text-blue-600 hover:underline">
			{data.course.title}
		</a>
		<span class="mx-2">›</span>
		<a href="/{data.course.slug}/{data.module.slug}" class="text-blue-600 hover:underline">
			{data.module.title}
		</a>
		<span class="mx-2">›</span>
		<span>{data.unit.title}</span>
	</nav>

	<h1 class="mb-6 text-3xl font-bold">{data.unit.title}</h1>

	<!-- Section tabs -->
	<div class="mb-6 flex gap-2 border-b">
		{#each data.unit.sections as section}
			<button
				class="px-4 py-2 {activeSection === section.order
					? 'border-b-2 border-blue-500 text-blue-600'
					: 'text-gray-600 hover:text-gray-900'}"
				on:click={() => (activeSection = section.order)}
			>
				{section.title}
				{#if section.type !== 'default'}
					<span class="ml-1 text-sm text-gray-500">({section.type})</span>
				{/if}
			</button>
		{/each}
	</div>

	<!-- Section content -->
	{#if currentSection}
		<div class="space-y-6">
			<h2 class="text-2xl font-semibold">
				{currentSection.title}
				{#if currentSection.type !== 'default'}
					<span class="ml-2 text-base font-normal text-gray-600">
						({currentSection.type})
					</span>
				{/if}
			</h2>

			<!-- Audio files -->
			{#if currentSection.audioFiles.length > 0}
				<div class="space-y-4">
					{#each currentSection.audioFiles as audioFile}
						<div class="rounded border p-4">
							<audio controls class="w-full">
								<source src={audioFile} type="audio/mpeg" />
							</audio>
						</div>
					{/each}
				</div>
			{/if}

			<!-- Image files -->
			{#if currentSection.imageFiles.length > 0}
				<div class="grid gap-4 md:grid-cols-2">
					{#each currentSection.imageFiles as imageFile}
						<img src={imageFile} alt="Lesson material" class="rounded-lg shadow-lg" />
					{/each}
				</div>
			{/if}
		</div>
	{/if}
</div>
