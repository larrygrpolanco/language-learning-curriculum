// src/routes/[course]/[module]/+page.ts
import { getCourseStructure } from '$lib/utils/fs';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  const course = await getCourseStructure(params.course);
  const module = course.modules.find(m => m.slug === params.module);
  
  if (!module) {
    throw error(404, 'Module not found');
  }
  
  return {
    course,
    module
  };
}
