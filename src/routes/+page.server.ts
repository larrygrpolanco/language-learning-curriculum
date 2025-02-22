// src/routes/+page.server.ts
import { readCourseStructure } from '$lib/server/courseReader';

export async function load() {
  const courses = await readCourseStructure();
  return { courses };
}