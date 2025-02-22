// src/routes/[course]/+page.ts
// Course page - shows modules
import courses from '$lib/data/courses.json';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
    const course = courses.courses.find(c => c.id === params.course);
    if (!course) {
        throw new Error(`Course with id ${params.course} not found`);
    }

    const modules = await Promise.all(course.moduleOrder.map(async moduleId => {
        const module = await import(`../../lib/data/${params.course}/${moduleId}/module.json`);
        return module.default;
    }));

    return { course, modules };
};