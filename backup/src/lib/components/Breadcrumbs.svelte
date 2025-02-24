<!-- src/lib/components/Breadcrumbs.svelte -->
<script lang="ts">
    interface BreadcrumbItem {
        label: string;
        href?: string;
    }

    export let items: BreadcrumbItem[] = [];
    
    // Helper to handle optional classes
    const classNames = (...classes: (string | undefined)[]) => 
        classes.filter(Boolean).join(' ');
</script>

<nav aria-label="breadcrumb" class="text-sm mb-6">
    <ol class="flex flex-wrap items-center gap-2">
        {#each items as item, i}
            <li class="inline-flex items-center">
                {#if item.href && i < items.length - 1}
                    <a 
                        href={item.href}
                        class={classNames(
                            "text-blue-600 hover:underline",
                            "transition-colors duration-200"
                        )}
                    >
                        {item.label}
                    </a>
                {:else}
                    <span 
                        class="text-gray-700"
                        aria-current={i === items.length - 1 ? "page" : undefined}
                    >
                        {item.label}
                    </span>
                {/if}
                
                {#if i < items.length - 1}
                    <span class="mx-2 text-gray-400">›</span>
                {/if}
            </li>
        {/each}
    </ol>
</nav>