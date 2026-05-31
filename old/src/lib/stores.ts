import type { Quiz } from '$lib/types';
import { writable } from 'svelte/store';

export const quiz = writable<Quiz>({
	id: '',
	title: '',
	authors: [],
	created: 0,
	updated: 0,
	local: true,
	questions: [],
});
