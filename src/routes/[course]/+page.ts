// src/routes/[course]/+page.ts
// Course overview page loader
import type { PageLoad } from './$types';
import type { Course } from '$lib/types';

export const load: PageLoad = async ({ params }) => {
  try {
    // Load course and its modules
    const course = await import(`../../lib/data/courses.json`)
      .then(m => m.courses.find(c => c.id === params.course));
    
    if (!course) throw new Error('Course not found');
    
    // Load all modules for this course
    const modules = await Promise.all(
      course.moduleOrder.map(async moduleId => {
        const moduleData = await import(
          `../../lib/data/${params.course}/${moduleId}/module.json`
        );
        return moduleData;
      })
    );

    return { course, modules };
  } catch (error) {
    return { 
      error: 'Course not found' 
    };
  }
};