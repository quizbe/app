import { string, number, boolean, object, array, literal, union } from 'valibot';

export const BASE = object({
	points: number(),
	time: number(),
});

export const MATH = object({
	type: literal('math'),
	text: string(),
	media: string(),
	answer: string(),
});

export const PLOT = object({
	type: literal('plot'),
	text: string(),
	answers: array(
		object({
			term: object({
				text: string(),
				media: string(),
			}),
			answer: object({
				text: string(),
				media: string(),
			}),
		}),
	),
});

export const MATCH = object({
	type: literal('match'),
	text: string(),
	answers: array(
		object({
			term: object({
				text: string(),
				media: string(),
			}),
			answer: object({
				text: string(),
				media: string(),
			}),
		}),
	),
});

export const CATEGORIZE = object({
	type: literal('categorize'),
	text: string(),
	categories: array(
		object({
			text: string(),
			media: string(),
			answers: array(string()),
		}),
	),
});

export const DROPDOWN = object({
	type: literal('dropdown'),
	text: string(),
	media: string(),
	answers: array(string()),
	nonanswers: array(string()),
});

export const DRAG = object({
	type: literal('drag'),
	text: string(),
	media: string(),
	answers: array(string()),
	nonanswers: array(string()),
});

export const TYPE = object({
	type: literal('type'),
	text: string(),
	media: string(),
	answer: string(),
});

export const MULTIPLE = object({
	type: literal('multiple'),
	single_answer: boolean(),
	text: string(),
	media: string(),
	answers: array(
		object({
			text: string(),
			media: string(),
			correct: boolean(),
		}),
	),
});

export const VIDEO = object({
	type: literal('video'),
	media: string(),
	timestamps: array(
		object({
			stamp: number(),
			points: number(),
			time: number(),
			question: union([MATCH, CATEGORIZE, MULTIPLE, DRAG, DROPDOWN, PLOT, TYPE]),
		}),
	),
});
