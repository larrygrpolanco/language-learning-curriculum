<script lang="ts">
	import type { PageData } from './$types';
	import UnitContent from '$lib/components/UnitContent.svelte';

	export let data: PageData;
</script>

// +page.svelte (Unit page) // Main unit page that loads and displays content
<main class="container mx-auto px-4 py-8">
	{#if data.error}
		<p class="text-red-600">{data.error}</p>
	{:else}
		<UnitContent unit={data.unit} />
	{/if}
</main>
