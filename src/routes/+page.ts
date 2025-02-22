// src/routes/+page.ts
import { getCourseStructure } from '$lib/utils/fs';
import { error } from '@sveltejs/kit';

export async function load() {
  try {
    // Get available courses by reading the courses directory
    const courses = await Promise.all([
      getCourseStructure('courses/korean'),
      getCourseStructure('courses/mandarin')
    ]);
    
    return { courses };
  } catch (e) {
    throw error(500, 'Failed to load courses');
  }
}