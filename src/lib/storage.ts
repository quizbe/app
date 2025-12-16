import { browser } from '$app/environment';
import { createStorage } from 'unstorage';
import idb from 'unstorage/drivers/indexedb';
import type { Quiz } from './types';
import { safeParse } from 'valibot';
import { QUIZ } from './schemas';

export const useQuizStorage = () =>
	createStorage<Quiz>({
		driver: idb({
			dbName: 'quizbe',
			storeName: 'quizzes',
		}),
	});

export async function loadQuizzes() {
	const quizzes: Quiz[] = [];

	// TODO: Authed users

	if (browser) {
		const storage = useQuizStorage();

		for (const key of await storage.keys()) {
			const { success, output } = safeParse(QUIZ, await storage.get(key));
			if (!success) continue;
			quizzes.push(output);
		}
	}

	return quizzes;
}

export async function loadQuiz(id: string) {
	// TODO: Authed users

	if (browser) {
		const storage = useQuizStorage();
		const { success, output } = safeParse(QUIZ, await storage.get(id));
		if (!success) return;
		return output;
	}
}
