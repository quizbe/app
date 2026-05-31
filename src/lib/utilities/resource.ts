import { browser } from '$app/environment';
import { createStorage } from 'unstorage';
import idb from 'unstorage/drivers/indexedb';
import { safeParse } from 'valibot';
import { RESOURCE, type Resource } from '../schemas';
import { ofetch } from 'ofetch';
import { auth } from '$lib/auth-client';
import { uid } from 'uid/secure';

export function useResourceStorage() {
	return createStorage<Resource>({
		driver: idb({
			dbName: 'quizbe',
			storeName: 'resources',
		}),
	});
}

export async function getResources() {
	const resources: Resource[] = [];

	if (browser) {
		const storage = useResourceStorage();
		for (const key of await storage.keys()) {
			const { success, output } = safeParse(RESOURCE, await storage.get(key));
			if (!success || resources.find((v) => v.id === output.id)) continue;
			resources.push(output);
		}
	}

	const { data } = await auth.getSession();
	if (!data) return resources;

	const result = await ofetch<Resource[]>('/api/resources', {
		method: 'POST',
	});
	if (!result) return resources;

	for (const resource of result) {
		if (resources.find((v) => v.id === resource.id)) continue;
		resources.push(resource);
	}

	return resources;
}

export async function getResource(id: string) {
	if (browser) {
		const storage = useResourceStorage();
		const { success, output } = safeParse(RESOURCE, await storage.get(id));
		if (success) return output;
	}

	const { data } = await auth.getSession();
	if (!data) return;
	return await ofetch<Resource>(`/api/resources/${id}`, {
		method: 'POST',
	});
}

export async function saveResource(resource: Resource) {
	if (['localonly', 'localfirst', 'serverfirst'].includes(resource.storage) && browser) {
		await useResourceStorage().set(resource.id, resource);
	}

	if (['serveronly', 'serverfirst'].includes(resource.storage) && browser) {
		// TODO: IMPLEMENT SERVER SAVE
	}
}

export async function deleteQuiz(id: string) {
	const session = await auth.getSession();

	if (session.data) {
		// TODO
	}

	await useResourceStorage().del(id);
}

export async function createResource(kind: Resource['kind']) {
	const session = await auth.getSession();

	if (session) {
		// TODO
	}

	const id = uid();
	const storage = useResourceStorage();

	if (await storage.has(id)) return createResource(kind);

	await storage.set(id, createBlankResource(kind, id));

	return id;
}

export function createBlankResource(kind: Resource['kind'], id?: string): Resource {
	return {
		...(kind === 'glossary'
			? {
					kind: 'glossary',
					terms: [],
				}
			: {
					kind: 'quiz',
					questions: [],
				}),
		id: id || uid(),
		authors: [],
		created: Date.now(),
		updated: Date.now(),
		title: `Untitled ${kind === 'glossary' ? 'glossary' : 'quiz'}`,
		storage: 'localonly',
	};
}
