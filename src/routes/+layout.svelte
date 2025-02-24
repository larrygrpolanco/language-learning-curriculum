<!-- src/routes/+layout.svelte -->
<script lang="ts">
    import CourseLayout from '$lib/components/CourseLayout.svelte';
    import type { Course, Module, Unit } from '$lib/types';
    import type { Snippet } from 'svelte';
    
    interface LayoutData {
        courses: Course[];
        course?: Course;
        module?: Module;
        unit?: Unit;
    }

    let { data, children } = $props<{
        data: LayoutData;
        children: Snippet;
    }>();
</script>

<CourseLayout 
    course={data.course} 
    module={data.module} 
    unit={data.unit}
>
    {@render children()}
</CourseLayout>