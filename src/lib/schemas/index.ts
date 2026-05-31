import {
	object,
	union,
	intersect,
	string,
	number,
	picklist,
	type InferInput,
	array,
	literal,
} from 'valibot';
import { QUESTIONS } from './questions';
import { uid } from 'uid/secure';

export type Table<O, T extends keyof O> = {
	// @ts-expect-error just because
	[K in O[T]]: Extract<O, { [key in T]: K }>;
};

export type Resource = InferInput<typeof RESOURCE>;
export type Glossary = Extract<Resource, { kind: 'glossary' }>;
export type Quiz = Extract<Resource, { kind: 'quiz' }>;
export type Question = Quiz['questions'][number];
export type QuestionsRecord = Table<Question, 'type'>;

export const RESOURCE = intersect([
	object({
		id: string(),
		title: string(),
		authors: array(string()),
		created: number(),
		updated: number(),
		storage: picklist(['localfirst', 'localonly', 'serverfirst', 'serveronly']),
	}),
	union([
		object({
			kind: literal('glossary'),
			terms: array(
				object({
					text: string(),
					media: string(),
					categories: array(string()),
					definition: object({
						text: string(),
						media: string(),
					}),
				}),
			),
		}),

		object({
			kind: literal('quiz'),
			questions: array(QUESTIONS),
		}),
	]),
]);
