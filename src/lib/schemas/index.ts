import { union, intersect, object, string, number, array, boolean } from 'valibot';
import {
	BASE,
	MULTIPLE,
	CATEGORIZE,
	DRAG,
	DROPDOWN,
	MATCH,
	PLOT,
	TYPE,
	VIDEO,
	MATH,
} from './questions';
import type { Question } from '$lib/types';

export type QuestionsRecord = {
	[K in Question['type']]: Extract<Question, { type: K }>;
};

export const QUESTIONS = intersect([
	BASE,
	union([MULTIPLE, CATEGORIZE, DRAG, DROPDOWN, MATCH, PLOT, TYPE, VIDEO, MATH]),
]);
export const QUIZ = object({
	id: string(),
	title: string(),
	authors: array(string()),
	created: number(),
	updated: number(),
	questions: array(QUESTIONS),
	local: boolean(),
});

export const TIMELIMIT_QUESTION: Record<number, string> = {
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
export const TIMELIMIT_KEYS_QUESTION = Object.keys(TIMELIMIT_QUESTION).map(parseFloat);

export const BLANK_QUESTIONS: QuestionsRecord = {
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
