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
import Checks from '~icons/ph/check-square-offset';
import PencilLine from '~icons/ph/pencil-line';
import ChartScatter from '~icons/ph/chart-scatter';
import Hand from '~icons/ph/hand';
import CaretDown from '~icons/ph/caret-up-down-fill';
import Columns from '~icons/ph/columns';
import Video from '~icons/ph/video';
import SubtractSquare from '~icons/ph/subtract-square';
import MathOperations from '~icons/ph/math-operations';
import type { Question } from '$lib/types';
import type { Component } from 'svelte';

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

export const ICONS_OF_TYPES: Record<Question['type'], Component> = {
	multiple: Checks,
	categorize: Columns,
	drag: Hand,
	dropdown: CaretDown,
	match: SubtractSquare,
	plot: ChartScatter,
	type: PencilLine,
	video: Video,
	math: MathOperations,
};

export const LABEL_OF_TYPES: Record<Question['type'], string> = {
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

export const COLORS_OF_TYPES: { class: string; types: Question['type'][]; label: string }[] = [
	{
		label: 'Basic',
		class: 'bg-svelte-50 text-svelte',
		types: ['multiple', 'categorize', 'drag', 'dropdown', 'match', 'type', 'video'],
	},
	{ label: 'Math', class: 'bg-purple-50 text-purple', types: ['plot', 'math'] },
];
