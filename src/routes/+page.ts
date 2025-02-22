// src/routes/+page.ts
import { getCourseStructure } from '$lib/utils/fs';

export async function load() {
  const korean = await getCourseStructure('korean');
  const mandarin = await getCourseStructure('mandarin');
  
  return {
    courses: [korean, mandarin]
  };
}