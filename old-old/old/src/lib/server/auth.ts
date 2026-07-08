import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '$lib/server/db';
import {
	BETTER_AUTH_BASE_URL,
	BETTER_AUTH_SECRET,
	DISCORD_CLIENT_ID,
	DISCORD_CLIENT_SECRET,
	DROPBOX_CLIENT_ID,
	DROPBOX_CLIENT_SECRET,
	FACEBOOK_CLIENT_ID,
	FACEBOOK_CLIENT_SECRET,
	FIGMA_CLIENT_ID,
	FIGMA_CLIENT_SECRET,
	GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET,
	GITLAB_CLIENT_ID,
	GITLAB_CLIENT_SECRET,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	LINKEDIN_CLIENT_ID,
	LINKEDIN_CLIENT_SECRET,
	MICROSOFT_CLIENT_ID,
	MICROSOFT_CLIENT_SECRET,
	NOTION_CLIENT_ID,
	NOTION_CLIENT_SECRET,
	REDDIT_CLIENT_ID,
	REDDIT_CLIENT_SECRET,
	ROBLOX_CLIENT_ID,
	ROBLOX_CLIENT_SECRET,
	SALESFORCE_CLIENT_ID,
	SALESFORCE_CLIENT_SECRET,
	SLACK_CLIENT_ID,
	SLACK_CLIENT_SECRET,
	SPOTIFY_CLIENT_ID,
	SPOTIFY_CLIENT_SECRET,
	TWITCH_CLIENT_ID,
	TWITCH_CLIENT_SECRET,
	TWITTER_CLIENT_ID,
	TWITTER_CLIENT_SECRET,
	ZOOM_CLIENT_ID,
	ZOOM_CLIENT_SECRET,
} from '$env/static/private';
import * as schema from '$lib/server/schema';

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'sqlite',
		schema,
	}),
	secret: BETTER_AUTH_SECRET,
	baseURL: BETTER_AUTH_BASE_URL,
	socialProviders: {
		discord: {
			clientId: DISCORD_CLIENT_ID,
			clientSecret: DISCORD_CLIENT_SECRET,
		},
		dropbox: {
			clientId: DROPBOX_CLIENT_ID,
			clientSecret: DROPBOX_CLIENT_SECRET,
		},
		facebook: {
			clientId: FACEBOOK_CLIENT_ID,
			clientSecret: FACEBOOK_CLIENT_SECRET,
		},
		figma: {
			clientId: FIGMA_CLIENT_ID,
			clientSecret: FIGMA_CLIENT_SECRET,
		},
		github: {
			clientId: GITHUB_CLIENT_ID,
			clientSecret: GITHUB_CLIENT_SECRET,
		},
		gitlab: {
			clientId: GITLAB_CLIENT_ID,
			clientSecret: GITLAB_CLIENT_SECRET,
		},
		google: {
			clientId: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
		},
		linkedin: {
			clientId: LINKEDIN_CLIENT_ID,
			clientSecret: LINKEDIN_CLIENT_SECRET,
		},
		microsoft: {
			clientId: MICROSOFT_CLIENT_ID,
			clientSecret: MICROSOFT_CLIENT_SECRET,
		},
		notion: {
			clientId: NOTION_CLIENT_ID,
			clientSecret: NOTION_CLIENT_SECRET,
		},
		reddit: {
			clientId: REDDIT_CLIENT_ID,
			clientSecret: REDDIT_CLIENT_SECRET,
		},
		roblox: {
			clientId: ROBLOX_CLIENT_ID,
			clientSecret: ROBLOX_CLIENT_SECRET,
		},
		salesforce: {
			clientId: SALESFORCE_CLIENT_ID,
			clientSecret: SALESFORCE_CLIENT_SECRET,
		},
		slack: {
			clientId: SLACK_CLIENT_ID,
			clientSecret: SLACK_CLIENT_SECRET,
		},
		spotify: {
			clientId: SPOTIFY_CLIENT_ID,
			clientSecret: SPOTIFY_CLIENT_SECRET,
		},
		twitch: {
			clientId: TWITCH_CLIENT_ID,
			clientSecret: TWITCH_CLIENT_SECRET,
		},
		twitter: {
			clientId: TWITTER_CLIENT_ID,
			clientSecret: TWITTER_CLIENT_SECRET,
		},
		zoom: {
			clientId: ZOOM_CLIENT_ID,
			clientSecret: ZOOM_CLIENT_SECRET,
		},
	},
});
