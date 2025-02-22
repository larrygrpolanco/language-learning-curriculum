<!-- src/routes/[course]/[module]/[unit]/+page.svelte -->
<script lang="ts">
  import type { Course, Module, Unit } from '$lib/types';
  import AudioPlayer from '$lib/components/AudioPlayer.svelte';
  
  let { data } = $props<{
    data: {
      course: Course;
      module: Module;
      unit: Unit;
    }
  }>();

  let activeSection = $state(data.unit.sections[0]?.order);
  
  let currentSection = $derived(
    data.unit.sections.find(s => s.order === activeSection)
  );
</script>

<div class="container mx-auto px-4 py-8">
  <!-- Breadcrumb navigation -->
  <nav class="text-sm mb-6">
    <a href="/{data.course.slug}" class="text-blue-600 hover:underline">
      {data.course.title}
    </a>
    <span class="mx-2">›</span>
    <a 
      href="/{data.course.slug}/{data.module.slug}" 
      class="text-blue-600 hover:underline"
    >
      {data.module.title}
    </a>
    <span class="mx-2">›</span>
    <span>{data.unit.title}</span>
  </nav>

  <h1 class="text-3xl font-bold mb-6">{data.unit.title}</h1>

  <!-- Section tabs -->
  <div class="flex gap-2 border-b mb-6">
    {#each data.unit.sections as section (section.order)}
      <button
        class="px-4 py-2 {activeSection === section.order ? 
          'border-b-2 border-blue-500 text-blue-600' : 
          'text-gray-600 hover:text-gray-900'}"
        onclick={() => activeSection = section.order}
      >
        {section.title}
      </button>
    {/each}
  </div>

  <!-- Section content -->
  {#if currentSection}
    <div class="space-y-6">
      <div class="prose max-w-none">
        <h2 class="text-2xl font-semibold mb-4">
          {currentSection.title}
          {#if currentSection.type}
            <span class="text-base font-normal text-gray-600 ml-2">
              ({currentSection.type})
            </span>
          {/if}
        </h2>
      </div>

      {#if currentSection.audioPath}
        <AudioPlayer 
          src={currentSection.audioPath}
          title="Lesson Audio"
        />
      {/if}

      {#if currentSection.imagePaths.length > 0}
        <div class="grid gap-4 md:grid-cols-2">
          {#each currentSection.imagePaths as imagePath}
            <img 
              src={imagePath}
              alt="Lesson material"
              class="rounded-lg shadow-lg"
            />
          {/each}
        </div>
      {/if}
    </div>
  {/if}
</div>