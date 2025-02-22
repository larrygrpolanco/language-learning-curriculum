// src/routes/[course]/[module]/[unit]/+page.ts
import { getCourseStructure } from '$lib/utils/fs';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  const course = await getCourseStructure(params.course);
  const module = course.modules.find(m => m.slug === params.module);
  const unit = module?.units.find(u => u.slug === params.unit);
  
  if (!module || !unit) {
    throw error(404, 'Unit not found');
  }
  
  return {
    course,
    module,
    unit
  };
}
