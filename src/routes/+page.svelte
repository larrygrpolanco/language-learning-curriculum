<!-- // src/routes/+page.svelte -->
<script lang="ts">
  import type { Course } from '$lib/types';
  
  export let data: { courses: Course[] };
</script>

<div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-8">Language Learning Resources</h1>
  
  <div class="grid gap-6 md:grid-cols-2">
    {#each data.courses as course}
      <a 
        href="/{course.slug}" 
        class="block p-6 rounded-lg border hover:shadow-lg transition-shadow"
      >
        <h2 class="text-2xl font-semibold mb-2">{course.title}</h2>
        <p class="text-gray-600">
          {course.modules.length} modules available
        </p>
      </a>
    {/each}
  </div>
</div>