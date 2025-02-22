<!-- src/routes/[course]/[module]/+page.svelte -->
<script lang="ts">
  import type { Course, Module } from '$lib/types';
  
  let { data } = $props<{
    data: {
      course: Course;
      module: Module;
    }
  }>();
</script>

<div class="container mx-auto px-4 py-8">
  <!-- Breadcrumb navigation -->
  <nav class="text-sm mb-6">
    <a href="/{data.course.slug}" class="text-blue-600 hover:underline">
      {data.course.title}
    </a>
    <span class="mx-2">›</span>
    <span>{data.module.title}</span>
  </nav>

  <h1 class="text-3xl font-bold mb-8">{data.module.title}</h1>

  <!-- Units grid -->
  <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {#each data.module.units as unit (unit.slug)}
      <a
        href="/{data.course.slug}/{data.module.slug}/{unit.slug}"
        class="block p-6 rounded-lg border hover:shadow-lg transition-shadow"
      >
        <h2 class="text-xl font-semibold mb-3">{unit.title}</h2>
        
        <!-- Section preview -->
        <div class="space-y-2">
          {#each unit.sections as section (section.order)}
            <div class="text-sm text-gray-600">
              <span class="inline-block w-6">{section.order}.</span>
              {section.title}
              {#if section.type}
                <span class="text-gray-400 ml-1">({section.type})</span>
              {/if}
            </div>
          {/each}
        </div>
      </a>
    {/each}
  </div>
</div>