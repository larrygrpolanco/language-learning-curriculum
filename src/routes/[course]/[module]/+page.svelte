<!-- src/routes/[course]/[module]/+page.svelte -->
<script>
    export let data;
</script>

<main class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">{data.module.title}</h1>
    
    <div class="space-y-6">
        {#each data.module.units as unit}
            <a href="/{params.course}/{params.module}/{unit.id}" class="block p-6 border rounded-lg hover:shadow-lg">
                <h2 class="text-2xl font-semibold">{unit.title}</h2>
                <p class="mt-2 text-gray-600">{unit.description}</p>
            </a>
        {/each}
    </div>
</main>