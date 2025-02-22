// src/routes/[course]/+page.server.ts
import { error } from '@sveltejs/kit';
import { readCourseStructure } from '$lib/server/courseReader';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const courses = await readCourseStructure();
  const course = courses.find(c => c.slug === params.course);
  
  if (!course) {
    throw error(404, 'Course not found');
  }
  
  return { course };
}