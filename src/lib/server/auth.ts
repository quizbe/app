import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '$lib/server/db';
import { BETTER_AUTH_SECRET } from '$env/static/private';
import * as schema from '$lib/server/schema';

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'sqlite',
		schema,
	}),
	secret: BETTER_AUTH_SECRET,
});
