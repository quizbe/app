import type { InferInput } from 'valibot';
import { QUESTIONS } from './schemas';

export type Question = InferInput<typeof QUESTIONS>;
