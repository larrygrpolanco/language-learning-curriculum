// src/routes/[course]/[module]/+page.ts
import { getCourseStructure, courseExists } from '$lib/utils/fs';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  const exists = await courseExists(params.course);
  if (!exists) {
    throw error(404, 'Course not found');
  }

  const course = await getCourseStructure(`courses/${params.course}`);
  const module = course.modules.find(m => m.slug === params.module);

  if (!module) {
    throw error(404, 'Module not found');
  }

  return { course, module };
}