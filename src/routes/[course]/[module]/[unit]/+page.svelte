// src/routes/[course]/[module]/[unit]/+page.svelte
<script lang="ts">
  import type { Section } from '$lib/server/fs-utils';
  import AudioPlayer from '$lib/components/AudioPlayer.svelte';
  
  interface PageData {
    unit: {
      title: string;
      sections: Section[];
    }
  }

  let { data } = $props<{ data: PageData }>();
  let activeSection = $state(data.unit.sections[0]?.order);

  // Derive the currently selected section
  let selectedSection = $derived(
    data.unit.sections.find(s => s.order === activeSection)
  );
</script>

<div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-6">{data.unit.title}</h1>

  <!-- Section tabs -->
  <div class="flex gap-2 border-b mb-6">
    {#each data.unit.sections as section (section.order)}
      <button
        class="px-4 py-2 {activeSection === section.order ? 
          'border-b-2 border-blue-500 text-blue-600' : 
          'text-gray-600 hover:text-gray-900'}"
        on:click={() => activeSection = section.order}
      >
        {section.title}
      </button>
    {/each}
  </div>

  <!-- Section content -->
  {#if selectedSection}
    <div class="space-y-6">
      {#if selectedSection.audioSrc}
        <AudioPlayer 
          src={selectedSection.audioSrc}
          title={selectedSection.title}
        />
      {/if}

      {#if selectedSection.imageSrcs}
        <div class="grid gap-4 grid-cols-1 md:grid-cols-2">
          {#each selectedSection.imageSrcs as src}
            <img 
              {src} 
              alt={`${selectedSection.title} material`}
              class="rounded-lg shadow-lg"
            />
          {/each}
        </div>
      {/if}
    </div>
  {/if}
</div>