<!-- src/lib/components/CourseLayout.svelte -->
<script lang="ts">
	import type { Course, Module, Unit } from '$lib/types';
	import type { Snippet } from 'svelte';

	let { course, module, unit, children } = $props<{
		course?: Course;
		module?: Module;
		unit?: Unit;
		children: Snippet;
	}>();

	let breadcrumbs = $derived([
		{ label: 'Home', href: '/' },
		...(course ? [{ label: course.title, href: `/${course.slug}` }] : []),
		...(module ? [{ label: module.title, href: `/${course.slug}/${module.slug}` }] : []),
		...(unit ? [{ label: unit.title }] : [])
	]);
</script>

<div class="min-h-screen bg-gray-50">
	<header class="border-b bg-white">
		<div class="container mx-auto px-4 py-4">
			<nav aria-label="breadcrumb" class="text-sm">
				<ol class="flex flex-wrap items-center gap-2">
					<li class="inline-flex items-center">
						<a href="/" class="text-blue-600 hover:underline">Home</a>
					</li>

					{#each breadcrumbs as { label, href }, i}
						<li class="inline-flex items-center">
							<span class="mx-2 text-gray-400">›</span>
							{#if href}
								<a {href} class="text-blue-600 hover:underline">{label}</a>
							{:else}
								<span class="text-gray-700" aria-current="page">{label}</span>
							{/if}
						</li>
					{/each}
				</ol>
			</nav>
		</div>
	</header>

	<main class="container mx-auto px-4 py-8">
		{@render children()}
	</main>
</div>
