// src/routes/[course]/[module]/+page.ts
// Module page loader
import type { PageLoad } from './$types';
import type { Module } from '$lib/types';

export const load: PageLoad = async ({ params }) => {
  try {
    // Load module data
    const module = await import(
      `../../../lib/data/${params.course}/${params.module}/module.json`
    ) as Module;
    
    // Load all units for this module
    const units = await Promise.all(
      module.unitOrder.map(async unitId => {
        const unitData = await import(
          `../../../lib/data/${params.course}/${params.module}/${unitId}/unit.json`
        );
        return unitData;
      })
    );

    return { module, units };
  } catch (error) {
    return { 
      error: 'Module not found' 
    };
  }
};