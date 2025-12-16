import { string, number, boolean, object, array, literal } from 'valibot';

export const BASE = object({
	points: number(),
	time: number(),
});

export const MULTIPLE = object({
	type: literal('multiple'),
	text: string(),
	media: string(),
	answers: array(
		object({
			media: string(),
			text: string(),
			correct: boolean(),
		}),
	),
});

export const CATEGORIZE = object({
	type: literal('categorize'),
	categories: array(
		object({
			label: string(),
			answers: array(string()),
		}),
	),
	nonanswers: array(string()),
});

export const MATCH = object({
	type: literal('match'),
	matches: array(
		object({
			label: string(),
			answer: string(),
		}),
	),
	nonanswers: array(string()),
});

export const DROPDOWN = object({
	type: literal('dropdown'),
	text: string(),
	answers: array(string()),
	nonanswers: array(string()),
});

export const DRAG = object({
	type: literal('drag'),
	text: string(),
	answers: array(string()),
	nonanswers: array(string()),
});
