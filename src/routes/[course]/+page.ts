// src/routes/[course]/+page.ts
// Course page - shows modules
import courses from '$lib/data/courses.json';

export const load = ({ params }) => {
    const course = courses.courses.find(c => c.id === params.course);
    const modules = course.moduleOrder.map(moduleId => 
        import(`../../lib/data/${params.course}/${moduleId}/module.json`)
    );
    return { course, modules };
};