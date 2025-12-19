import { browser } from '$app/environment';
import { createStorage } from 'unstorage';
import idb from 'unstorage/drivers/indexedb';
import type { Quiz } from './types';
import { safeParse } from 'valibot';
import { QUIZ } from './schemas';
import { auth } from './auth-client';
import { ofetch } from 'ofetch';
import { goto } from '$app/navigation';
import { resolve } from '$app/paths';
import { nanoid } from 'nanoid';

export const useQuizStorage = () =>
	createStorage<Quiz>({
		driver: idb({
			dbName: 'quizbe',
			storeName: 'quizzes',
		}),
	});

export async function loadQuizzes() {
	const quizzes: Quiz[] = [];

	if (browser) {
		const storage = useQuizStorage();
		for (const key of await storage.keys()) {
			const { success, output } = safeParse(QUIZ, await storage.get(key));
			if (!success || quizzes.find((v) => v.id === output.id)) continue;
			quizzes.push(output);
		}
	}

	const { data } = await auth.getSession();
	if (!data) return quizzes;

	const result = await ofetch<Quiz[]>('/api/quizzes', {
		method: 'POST',
	});
	if (!result) return quizzes;

	for (const quiz of result) {
		if (quizzes.find((v) => v.id === quiz.id)) continue;
		quizzes.push({
			id: quiz.id,
			title: quiz.title,
			authors: [],
			created: quiz.created,
			updated: quiz.updated,
			questions: quiz.questions,
			local: false,
		});
	}

	return quizzes;
}

export async function loadQuiz(id: string) {
	if (browser) {
		const storage = useQuizStorage();
		const { success, output } = safeParse(QUIZ, await storage.get(id));
		if (success) return output;
	}

	const { data } = await auth.getSession();
	if (!data) return;
	const result = await ofetch<Quiz[]>('/api/quizzes', {
		method: 'POST',
	});
	return result;
}

export async function saveQuiz(quiz: Quiz) {
	if (quiz.local && browser) {
		await useQuizStorage().set(quiz.id, quiz);
	}
}

export async function createQuiz() {
	const session = await auth.getSession();

	if (session.data) {
		//
		const id = await ofetch<string>('/api/quizzes', { method: 'PUT' });
	}

	const id = nanoid();
	const storage = useQuizStorage();

	if (await storage.has(id)) return createQuiz();

	storage.set(id, {
		id,
		title: 'Untitled quiz',
		authors: [],
		created: Date.now(),
		updated: Date.now(),
		questions: [],
		local: true,
	});

	goto(resolve('/[quizid]/edit', { quizid: id }));
}

export async function deleteQuiz(id: string) {
	const session = await auth.getSession();

	if (session.data) {
		// TODO
	}

	await useQuizStorage().del(id);
}
