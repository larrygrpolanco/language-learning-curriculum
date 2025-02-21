// src/routes/[course]/[module]/+page.ts
// Module page - shows units
export const load = ({ params }) => ({
    module: import(`../../../lib/data/${params.course}/${params.module}/module.json`)
});