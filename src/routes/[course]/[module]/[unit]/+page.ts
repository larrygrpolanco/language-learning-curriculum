// src/routes/[course]/[module]/[unit]/+page.ts
// Unit page - shows sections
export const load = ({ params }) => ({
    unit: import(`../../../../lib/data/${params.course}/${params.module}/${params.unit}/unit.json`)
});