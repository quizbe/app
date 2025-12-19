import { string, number, boolean, object, array, literal, union } from 'valibot';
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

export const BASE = object({
	points: number(),
	time: number(),
});

export const ICONS_OF_QUESTION_TYPES: Record<Question['type'], Component> = {
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

export const TYPE_OF_QUESTIONS: Record<Question['type'], string> = {
	multiple: 'Multiple Choice',
	categorize: 'Categorize',
	drag: "Drag n' Drop",
	dropdown: 'Dropdown',
	match: 'Match',
	plot: 'Plot',
	type: 'Type Answer',
	video: 'Video',
	math: 'Math Response',
};

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
