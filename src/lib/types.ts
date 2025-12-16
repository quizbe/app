import type { InferInput } from 'valibot';
import { QUESTIONS, QUIZ } from './schemas';

export type Question = InferInput<typeof QUESTIONS>;
export type Quiz = InferInput<typeof QUIZ>;
