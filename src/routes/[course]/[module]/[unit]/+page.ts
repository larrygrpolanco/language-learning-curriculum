// src/routes/[course]/[module]/[unit]/+page.ts
// Unit page loader
import type { PageLoad } from './$types';
import type { Unit } from '$lib/types';

export const load: PageLoad = async ({ params }) => {
  try {
    // Load unit data
    const unit = await import(
      `../../../../lib/data/${params.course}/${params.module}/${params.unit}/unit.json`
    ) as Unit;

    return { unit };
  } catch (error) {
    return { 
      error: 'Unit not found' 
    };
  }
};