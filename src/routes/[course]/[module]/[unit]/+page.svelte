<!-- src/routes/[course]/[module]/[unit]/+page.svelte -->
<script>
    import UnitContent from '$lib/components/UnitContent.svelte';
    export let data;
</script>

<main class="container mx-auto px-4 py-8">
    <UnitContent unit={data.unit} />
</main>