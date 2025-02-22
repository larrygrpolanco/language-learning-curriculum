// src/routes/[course]/+page.ts
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, parent }) => {
    const { courses } = await parent();
    const course = courses.find(c => c.slug === params.course);
    
    if (!course) {
        throw error(404, 'Course not found');
    }
    
    return { course };
}
