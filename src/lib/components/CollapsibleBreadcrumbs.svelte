<!-- /// file: src/lib/components/CollapsibleBreadcrumbs.svelte  -->
<script lang="ts">
  import { slide } from 'svelte/transition';
  
  /** @type {import('$lib/types').Breadcrumb[]} */
  export let breadcrumbs;
  
  let isExpanded = false;
  $: visibleCrumbs = isExpanded ? breadcrumbs : 
    breadcrumbs.length > 2 ? 
      [breadcrumbs[0], breadcrumbs[breadcrumbs.length - 1]] : 
      breadcrumbs;
</script>

<nav class="text-sm text-gray-600 mt-2">
  <div class="flex items-center gap-2">
    {#each visibleCrumbs as crumb, i}
      {#if i !== 0}
        <span class="text-gray-400 mx-1">›</span>
      {/if}
      
      {#if crumb.href}
        <a 
          href={crumb.href}
          class="hover:text-blue-600 hover:underline"
        >
          {crumb.title}
        </a>
      {:else}
        <span>{crumb.title}</span>
      {/if}
    {/each}
    
    {#if breadcrumbs.length > 2}
      <button 
        class="ml-2 text-blue-600 hover:underline"
        on:click={() => isExpanded = !isExpanded}
      >
        {isExpanded ? 'Show less' : '...'}
      </button>
    {/if}
  </div>
</nav>