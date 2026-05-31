// place files you want to import through the `$lib` alias in this folder.
import type { Snippet, Component } from 'svelte';

/**
 * Checks if a value is a Svelte snippet
 * @param v - The value to check (should be Snippet | Component)
 * @returns true if the value is a snippet, false otherwise
 */
export function isSnippet(v: unknown): v is Snippet {
	return typeof v === 'object' && v !== null && '$$render' in v;
}

/**
 * Checks if a value is a Svelte component
 * @param v - The value to check (should be Snippet | Component)
 * @returns true if the value is a component, false otherwise
 */
export function isComponent(v: unknown): v is Component {
	return typeof v === 'function' || (typeof v === 'object' && v !== null && !('$$render' in v));
}
