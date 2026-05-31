import { BETTER_AUTH_BASE_URL, BETTER_AUTH_SECRET } from '$env/static/private';
import { betterAuth } from 'better-auth';

export const auth = betterAuth({
	baseURL: BETTER_AUTH_BASE_URL,
	secret: BETTER_AUTH_SECRET,
	socialProviders: {},
});
