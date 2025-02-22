/ src/routes/[course]/+page.svelte
<script lang="ts">
  import type { Course } from '$lib/types';
  
  let { data } = $props<{ data: { course: Course } }>();
</script>

<div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-8">{data.course.title} Course</h1>
  
  <div class="space-y-6">
    {#each data.course.modules as module}
      <div class="border rounded-lg p-6">
        <h2 class="text-2xl font-semibold mb-4">{module.title}</h2>
        
        <div class="grid gap-4 md:grid-cols-2">
          {#each module.units as unit}
            <a 
              href="/{data.course.slug}/{module.slug}/{unit.slug}"
              class="p-4 rounded border hover:bg-gray-50 transition-colors"
            >
              <h3 class="font-medium mb-2">{unit.title}</h3>
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