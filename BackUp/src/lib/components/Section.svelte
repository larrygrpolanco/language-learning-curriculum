/// file: src/lib/components/Section.svelte
<script lang="ts">
  import type { Section } from '$lib/types';
  import AudioPlayer from './AudioPlayer.svelte';
  
  let { section } = $props<{ section: Section }>();
</script>

<div class="space-y-6">
  <h3 class="text-xl font-semibold">
    {section.title}
    <span class="ml-2 text-sm text-gray-500">({section.type})</span>
  </h3>

  <div class="prose">
    {section.content}
  </div>

  {#if section.audio}
    <AudioPlayer 
      src={section.audio} 
      title={section.title}
    />
  {/if}

  {#if section.images}
    <div class="grid gap-4 md:grid-cols-2">
      {#each section.images as image}
        <figure>
          <img 
            src={image.src} 
            alt={image.alt}
            class="rounded-lg shadow-lg"
          />
          {#if image.caption}
            <figcaption class="mt-2 text-sm text-gray-600">
              {image.caption}
            </figcaption>
          {/if}
        </figure>
      {/each}
    </div>
  {/if}
</div>