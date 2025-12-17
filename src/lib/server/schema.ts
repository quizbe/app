import type { Question } from '$lib/types';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { nanoid } from 'nanoid';

export const quiz = sqliteTable('quiz', {
	id: text().primaryKey().$defaultFn(nanoid),
	title: text().notNull(),
	authors: text({
		mode: 'json',
	})
		.$type<string[]>()
		.notNull(),
	created: integer().notNull().$defaultFn(Date.now),
	updated: integer().notNull().$defaultFn(Date.now),
	questions: text({
		mode: 'json',
	})
		.$type<Question[]>()
		.notNull(),
});

export const user = sqliteTable('user', {
	id: text().primaryKey().$defaultFn(nanoid),
	name: text().notNull(),
	email: text().notNull(),
	emailVerified: integer({ mode: 'boolean' }).notNull(),
	image: text(),
	createdAt: integer({ mode: 'timestamp_ms' }).notNull(),
	updatedAt: integer({ mode: 'timestamp_ms' }).notNull(),
});

export const session = sqliteTable('session', {
	id: text().primaryKey().$defaultFn(nanoid),
	userId: text().references(() => user.id),
	token: text().notNull(),
	expiresAt: integer({ mode: 'boolean' }).notNull(),
	createdAt: integer({ mode: 'timestamp_ms' }).notNull(),
	updatedAt: integer({ mode: 'timestamp_ms' }).notNull(),
	ipAddress: text(),
	userAgent: text(),
});

export const account = sqliteTable('account', {
	id: text().primaryKey().$defaultFn(nanoid),
	userId: text().references(() => user.id),
	accountId: text().notNull(),
	providerId: text().notNull(),
	accessToken: text(),
	refreshToken: text(),
	accessTokenExpiresAt: text(),
	refreshTokenExpiresAt: text(),
	scope: text(),
	idToken: text(),
	password: text(),
	expiresAt: integer({ mode: 'boolean' }).notNull(),
	createdAt: integer({ mode: 'timestamp_ms' }).notNull(),
	updatedAt: integer({ mode: 'timestamp_ms' }).notNull(),
});

export const verification = sqliteTable('verification', {
	id: text().primaryKey().$defaultFn(nanoid),
	identifer: text(),
	value: text().notNull(),
	expiresAt: integer({ mode: 'boolean' }).notNull(),
	createdAt: integer({ mode: 'timestamp_ms' }).notNull(),
	updatedAt: integer({ mode: 'timestamp_ms' }).notNull(),
});
