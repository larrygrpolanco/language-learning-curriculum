<!-- /// file: src/lib/components/Layout.svelte -->
<script lang="ts">
  import CollapsibleBreadcrumbs from './CollapsibleBreadcrumbs.svelte';
  
  // Props for flexible layout configuration
  /** @type {string} */
  export let title = 'Language Learning Resources'; // Default title for the app
  /** @type {import('$lib/types').Breadcrumb[] | undefined} */
  export let breadcrumbs = undefined;
</script>

<div class="min-h-screen bg-gray-50">
  <!-- {/* Simple header with consistent styling */} -->
  <header class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
      <h1 class="text-2xl font-bold text-gray-900">{title}</h1>
      {#if breadcrumbs}
        <CollapsibleBreadcrumbs {breadcrumbs} />
      {/if}
    </div>
  </header>

  <!-- {/* Main content area with consistent max-width and padding */} -->
  <main class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
    <slot />
  </main>
</div>