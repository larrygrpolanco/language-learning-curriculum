/// file: src/routes/[course]/[module]/[unit]/+page.ts
import type { PageLoad } from './$types';
import type { Unit } from '$lib/types';

export const load = (async ({ params }) => {
  try {
    // In a real app, you'd want to handle this more elegantly
    const unit = await import(
      `../../../../lib/data/${params.course}/${params.module}/${params.unit}/unit.json`
    );
    return { unit };
  } catch (error) {
    return {
      error: 'Could not load unit content'
    };
  }
}) satisfies PageLoad;