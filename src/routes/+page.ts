// src/routes/+page.ts
import type { PageLoad } from './$types';
import { getCourses } from '$lib/courses';
import type { CourseData } from '$lib/courses';

export const load: PageLoad<{ courses: CourseData[] }> = async () => {
  const courses = await getCourses();
  return { courses };
};