import {
	BETTER_AUTH_BASE_URL,
	BETTER_AUTH_SECRET,
	DATABASE_URL,
	DATABASE_AUTH_TOKEN,
} from '$env/static/private';
import { betterAuth } from 'better-auth';
import { drizzle } from 'drizzle-orm/libsql';
import { drizzleAdapter } from '@better-auth/drizzle-adapter';
import { createClient } from '@libsql/client';
import * as schemas from '$lib/schemas/auth';

// import { Cloudflare } from 'cloudflare';

const client = createClient({
	url: DATABASE_URL,
	authToken: DATABASE_AUTH_TOKEN,
});

export const db = drizzle({
	client,
});

export const auth = betterAuth({
	baseURL: BETTER_AUTH_BASE_URL,
	secret: BETTER_AUTH_SECRET,
	database: drizzleAdapter(db, {
		provider: 'sqlite',
		schema: schemas,
	}),
	socialProviders: {},
});

// const cf = new Cloudflare({});

// const resources_kv = await cf.kv.namespaces.values.get('', '', { account_id: '' });
