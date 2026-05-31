import { string, number, boolean, object, array, literal, union, intersect } from 'valibot';
import type { Question, QuestionsRecord } from '.';

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

export const QUESTIONS = intersect([
	object({
		points: number(),
		time: number(),
	}),
	union([MULTIPLE, MATH, VIDEO, PLOT, TYPE, DROPDOWN, DRAG, CATEGORIZE, MATCH]),
]);

export const TIMELIMITS: Record<number, string> = {
	10: '10 seconds',
	20: '20 seconds',
	30: '30 seconds',
	45: '45 seconds',
	60: '1 minute',
	120: '2 minutes',
	180: '3 minutes',
	300: '5 minutes',
	600: '10 minutes',
	1200: '20 minutes',
	1800: '30 minutes',
	3600: '1 hour',
};
export const TIMELIMIT_KEYS = Object.keys(TIMELIMITS).map(parseFloat);

export const BLANKS: QuestionsRecord = {
	multiple: {
		type: 'multiple',
		points: 1,
		time: 30,
		media: '',
		text: '',
		single_answer: true,
		answers: [
			{ correct: false, media: '', text: '' },
			{ correct: false, media: '', text: '' },
		],
	},
	categorize: { type: 'categorize', points: 1, time: 30, text: '', categories: [] },
	drag: { type: 'drag', points: 1, time: 30, text: '', media: '', answers: [], nonanswers: [] },
	dropdown: {
		type: 'dropdown',
		points: 1,
		time: 30,
		text: '',
		media: '',
		answers: [],
		nonanswers: [],
	},
	match: { type: 'match', points: 1, time: 30, text: '', answers: [] },
	plot: { type: 'plot', points: 1, time: 30, text: '', answers: [] },
	type: { type: 'type', points: 1, time: 30, text: '', media: '', answer: '' },
	video: { type: 'video', points: 1, time: 30, media: '', timestamps: [] },
	math: { type: 'math', points: 1, time: 30, text: '', media: '', answer: '' },
};

export const ICONS: Record<Question['type'], string> = {
	multiple: 'i-ph:check-square-offset',
	categorize: 'i-ph:columns',
	drag: 'i-ph:hand',
	dropdown: 'i-ph:caret-up-down-fill',
	match: 'i-ph:subtract-square',
	plot: 'i-ph:chart-scatter',
	type: 'i-ph:pencil-line',
	video: 'i-ph:video',
	math: 'i-ph:math-operations',
};

export const LABELS: Record<Question['type'], string> = {
	multiple: 'Multiple Choice',
	categorize: 'Categorize',
	drag: "Drag n' Drop",
	dropdown: 'Dropdown',
	match: 'Match',
	type: 'Type Answer',
	video: 'Video',
	plot: 'Plot',
	math: 'Math Response',
};

export const COLORS: { class: string; types: Question['type'][]; label: string }[] = [
	{
		label: 'Basic',
		class: 'bg-primary-50 text-primary-500',
		types: ['multiple', 'categorize', 'drag', 'dropdown', 'match', 'type', 'video'],
	},
	{ label: 'Math', class: 'bg-purple-50 text-purple', types: ['plot', 'math'] },
];
