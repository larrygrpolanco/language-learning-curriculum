<!-- src/routes/+page.svelte -->
<script>
    export let data;
</script>

<main class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Language Courses</h1>
    
    {#each data.courses as course}
        <a href="/{course.id}" class="block p-6 border rounded-lg hover:shadow-lg">
            <h2 class="text-2xl font-semibold">{course.title}</h2>
            <p class="text-gray-600 mt-2">{course.description}</p>
        </a>
    {/each}
</main>