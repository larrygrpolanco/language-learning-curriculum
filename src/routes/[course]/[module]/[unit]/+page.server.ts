// src/routes/[course]/[module]/[unit]/+page.server.ts
import { getCourseStructure } from '$lib/server/fs-utils';
import { join } from 'path';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  try {
    const coursePath = join('static', 'courses', params.course);
    const course = await getCourseStructure(coursePath);
    
    const module = course.modules.find(m => m.slug === params.module);
    if (!module) throw error(404, 'Module not found');
    
    const unit = module.units.find(u => u.slug === params.unit);
    if (!unit) throw error(404, 'Unit not found');
    
    return {
      course,
      module,
      unit
    };
  } catch (e) {
    console.error('Error loading unit:', e);
    throw error(404, 'Content not found');
  }
}

