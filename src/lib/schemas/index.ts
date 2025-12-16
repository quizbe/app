import { union, intersect, object, string, number, array, boolean } from 'valibot';
import { BASE, CATEGORIZE, DRAG, DROPDOWN, MULTIPLE } from './questions';

export const QUESTIONS = intersect([BASE, union([MULTIPLE, CATEGORIZE, DROPDOWN, DRAG])]);
export const QUIZ = object({
	id: string(),
	title: string(),
	authors: array(string()),
	created: number(),
	updated: number(),
	questions: array(QUESTIONS),
	local: boolean(),
});
