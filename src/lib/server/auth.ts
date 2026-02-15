import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '$lib/server/db';
import { BETTER_AUTH_SECRET, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';
import * as schema from '$lib/server/schema';

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'sqlite',
		schema,
	}),
	secret: BETTER_AUTH_SECRET,
	socialProviders: {
		// atlassian: {},
		// cognito: {},
		// discord: {},
		// dropbox: {},
		// facebook: {},
		// figma: {},
		github: {
			clientId: GITHUB_CLIENT_ID,
			clientSecret: GITHUB_CLIENT_SECRET,
		},
		// gitlab: {},
		// google: {},
		// huggingface: {},
		// kakao: {},
		// kick: {},
		// line: {},
		// linear: {},
		// linkedin: {},
		// microsoft: {},
		// naver: {},
		// notion: {},
		// paybin: {},
		// paypal: {},
		// polar: {},
		// reddit: {},
		// roblox: {},
		// salesforce: {},
		// slack: {},
		// spotify: {},
		// tiktok: {},
		// twitch: {},
		// twitter: {},
		// vercel: {},
		// vk: {},
		// zoom: {},
	},
});
