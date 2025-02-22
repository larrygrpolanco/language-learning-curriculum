// src/routes/[course]/[module]/+page.ts
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, parent }) => {
    const { courses } = await parent();
    const course = courses.find(c => c.slug === params.course);
    const module = course?.modules.find(m => m.slug === params.module);
    
    if (!course || !module) {
        throw error(404, 'Module not found');
    }
    
    return { course, module };
}