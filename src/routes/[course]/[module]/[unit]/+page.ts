// +page.ts (Unit page load function)
// Loads unit data from our file structure
import type { PageLoad } from './$types';
import type { Unit } from '$lib/types';

export const load: PageLoad = async ({ params }) => {
  try {
    const unit = await import(
      `../../../lib/data/${params.course}/${params.module}/${params.unit}/unit.json`
    ) as Unit;
    
    return { unit };
  } catch (error) {
    return {
      error: 'Could not load unit content'
    };
  }
};