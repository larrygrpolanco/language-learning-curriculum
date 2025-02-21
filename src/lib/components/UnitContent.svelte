<!-- src/lib/components/UnitContent.svelte -->
<script lang="ts">
	import type { Unit } from '$lib/types';
	import AudioPlayer from './AudioPlayer.svelte';

	export let unit: Unit;

	// Initialize the active section to the first one in the order
	let activeSection = unit.sectionOrder[0];

	// Create an array of sections in the correct order
	$: sections = unit.sectionOrder.map((id) => unit.sections[id]);
</script>

<div class="space-y-6">
    <h1 class="text-3xl font-bold">{unit.title}</h1>
    <p class="text-gray-600">{unit.description}</p>

    <div class="flex gap-2 border-b">
        {#each sections as section}
            <button
                class="px-4 py-2 {activeSection === section.id ? 'border-b-2 border-blue-500' : ''}"
                on:click={() => activeSection = section.id}
            >
                {section.title}
            </button>
        {/each}
    </div>

    {@const section = unit.sections[activeSection]}
    <div class="space-y-6">
        <div class="prose">{section.content}</div>

        {#if section.audio}
            <AudioPlayer src={section.audio} title={section.title} />
        {/if}

        {#if section.images}
            <div class="space-y-4">
                {#each section.images as image}
                    <figure>
                        <img src={image.src} alt={image.alt} class="rounded-lg shadow-lg" />
                        {#if image.caption}
                            <figcaption class="mt-2 text-sm text-gray-600">{image.caption}</figcaption>
                        {/if}
                    </figure>
                {/each}
            </div>
        {/if}
    </div>
</div>