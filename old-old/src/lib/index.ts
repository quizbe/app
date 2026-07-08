import { createStorage, prefixStorage } from 'unstorage';
import idb from 'unstorage/drivers/indexedb';
import type { Resource } from '../../../app/composables/schemas';

export function useQuizbeStorage() {
	return createStorage({
		driver: idb({
			dbName: 'quizbe',
			storeName: 'quizbe',
		}),
	});
}

export const useSecretStorage = () => prefixStorage<string>(useQuizbeStorage(), 'secret');
export const useResourceStorage = () => prefixStorage<Resource>(useQuizbeStorage(), 'resource');
export const useMediaStorage = () => prefixStorage<string>(useQuizbeStorage(), 'media');
