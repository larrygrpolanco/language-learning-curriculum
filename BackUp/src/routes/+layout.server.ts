// src/routes/+layout.server.ts
import { readdir } from 'fs/promises';
import { join } from 'path';
import type { Course, Module, Unit, Section, SectionType } from '../lib/types';

// Types for directory entries from fs.promises
import type { Dirent } from 'fs';

// Type for media file structure
interface MediaFiles {
	audioFiles: string[];
	imageFiles: string[];
}

const COURSES_PATH = 'courses';

async function readCourseStructure(): Promise<Course[]> {
	const courses: Course[] = [];
	const courseDirs = await readdir(COURSES_PATH, { withFileTypes: true });

	for (const dir of courseDirs.filter((d): d is Dirent => d.isDirectory())) {
		const coursePath = join(COURSES_PATH, dir.name);
		const modules = await readModules(coursePath);
		const order = getOrder(dir.name);

		courses.push({
			order,
			title: formatName(dir.name),
			slug: dir.name,
			modules
		});
	}

	return courses.sort((a, b) => a.order - b.order);
}

async function readModules(coursePath: string): Promise<Module[]> {
	const modules: Module[] = [];
	const moduleDirs = await readdir(coursePath, { withFileTypes: true });

	for (const dir of moduleDirs.filter((d): d is Dirent => d.isDirectory())) {
		const modulePath = join(coursePath, dir.name);
		const units = await readUnits(modulePath);
		const order = getOrder(dir.name);

		modules.push({
			order,
			title: formatName(dir.name),
			slug: dir.name,
			units
		});
	}

	return modules.sort((a, b) => a.order - b.order);
}

async function readUnits(modulePath: string): Promise<Unit[]> {
	const units: Unit[] = [];
	const unitDirs = await readdir(modulePath, { withFileTypes: true });

	for (const dir of unitDirs.filter((d): d is Dirent => d.isDirectory())) {
		const unitPath = join(modulePath, dir.name);
		const sections = await readSections(unitPath);
		const order = getOrder(dir.name);

		units.push({
			order,
			title: formatName(dir.name),
			slug: dir.name,
			sections
		});
	}

	return units.sort((a, b) => a.order - b.order);
}

async function readSections(unitPath: string): Promise<Section[]> {
	const sections: Section[] = [];
	const sectionDirs = await readdir(unitPath, { withFileTypes: true });

	for (const dir of sectionDirs.filter((d): d is Dirent => d.isDirectory())) {
		const sectionPath = join(unitPath, dir.name);
		const { audioFiles, imageFiles } = await getMediaFiles(sectionPath);
		const order = getOrder(dir.name);
		const type = getType(dir.name);

		sections.push({
			order,
			title: formatName(dir.name),
			slug: dir.name,
			type,
			audioFiles,
			imageFiles
		});
	}

	return sections.sort((a, b) => a.order - b.order);
}

async function getMediaFiles(sectionPath: string): Promise<MediaFiles> {
	const files = await readdir(sectionPath);
	const basePath = join('/', sectionPath);

	return {
		audioFiles: files
			.filter((f) => f.endsWith('.mp3'))
			.sort()
			.map((f) => join(basePath, f)),
		imageFiles: files
			.filter((f) => f.endsWith('.jpg') || f.endsWith('.png'))
			.sort()
			.map((f) => join(basePath, f))
	};
}

function formatName(name: string): string {
	return name
		.split('-')
		.slice(1)
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}

function getOrder(name: string): number {
	const order = parseInt(name.split('-')[0]);
	return isNaN(order) ? 999 : order;
}

function getType(name: string): SectionType {
	const parts = name.split('-');
	return (parts[1] || 'default') as SectionType;
}

export async function load() {
	const courses = await readCourseStructure();
	return { courses };
}
