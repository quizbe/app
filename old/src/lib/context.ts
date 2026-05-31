import { createContext } from 'svelte';
import type { Quiz } from './types';

export type QuizContext = { current: Quiz | null; loading: boolean; editing: number };
export const [useQuizContext, setQuizContext] = createContext<QuizContext>();
