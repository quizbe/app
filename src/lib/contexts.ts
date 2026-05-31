import { createContext } from 'svelte';
import type { Resource } from './schemas';

export type ResourceContext = {
	current?: Resource;
	loading: boolean;
	editing: number;
};

export const [useResource, setResource] = createContext<ResourceContext>();
