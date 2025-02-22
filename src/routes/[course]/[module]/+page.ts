// src/routes/[course]/[module]/+page.ts
// Module page - shows units
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
    try {
        const module = await import(`../../../lib/data/${params.course}/${params.module}/module.json`);
        return { module: module.default };
    } catch (error) {
        throw new Error(`Module with id ${params.module} not found`);
    }
};