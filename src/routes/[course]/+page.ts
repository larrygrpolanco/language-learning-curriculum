// src/routes/[course]/+page.ts
import { getCourseStructure } from '$lib/utils/fs';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  const course = await getCourseStructure(params.course);
  
  if (!course.modules.length) {
    throw error(404, 'Course not found');
  }
  
  return { course };
}
