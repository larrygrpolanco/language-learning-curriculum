// src/routes/+page.ts
// Homepage just uses the data from the parent layout
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
    const { courses } = await parent();
    return { courses };
}