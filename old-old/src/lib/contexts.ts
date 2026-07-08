import { createContext } from 'svelte';
import type { Resource } from '../../../app/composables/schemas';

export type ResourceContext = {
	current?: Resource;
	loading: boolean;
	editing: number;
};

export const [useResource, setResource] = createContext<ResourceContext>();
