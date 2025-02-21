<!-- src/routes/[course]/[module]/[unit]/+page.svelte
Unit page - Displays unit content using UnitContent component -->
<script lang="ts">
  import type { PageData } from './$types';
  import UnitContent from '$lib/components/UnitContent.svelte';
  
  export let data: PageData;
</script>

<main class="container mx-auto px-4 py-8">
  {#if data.error}
    <p class="text-red-600">{data.error}</p>
  {:else}
    <UnitContent unit={data.unit} />
  {/if}
</main>