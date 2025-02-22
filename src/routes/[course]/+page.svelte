<!-- src/routes/[course]/+page.svelte -->
<script lang="ts">
    export let data;
</script>

<main class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">{data.course.title}</h1>
    
    <div class="space-y-6">
        {#each data.modules as module}
            <a href="/{data.course.id}/{module.id}" class="block p-6 border rounded-lg hover:shadow-lg">
                <h2 class="text-2xl font-semibold">{module.title}</h2>
                <p class="mt-2 text-gray-600">{module.description}</p>
            </a>
        {/each}
    </div>
</main>