import { auth } from '$lib/server';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { building } from '$app/environment';

export async function handle({ event, resolve }) {
	// console.log(event.request.headers);

	const session = await auth.api.getSession({
		headers: event.request.headers,
	});

	if (session) {
		event.locals.session = session.session;
		event.locals.user = session.user;
	}

	// console.log(event.request.headers);

	return svelteKitHandler({ event, resolve, auth, building });

	// return resolve(event);
}
