import type { Question } from '$lib/types';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { uid } from 'uid/secure';

export const quiz = sqliteTable('quiz', {
	id: text().primaryKey().$defaultFn(uid),
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
	id: text().primaryKey().$defaultFn(uid),
	name: text().notNull(),
	email: text().notNull(),
	emailVerified: integer({ mode: 'boolean' }).notNull(),
	image: text(),
	createdAt: integer({ mode: 'timestamp_ms' }).notNull(),
	updatedAt: integer({ mode: 'timestamp_ms' }).notNull(),
});

export const session = sqliteTable('session', {
	id: text().primaryKey().$defaultFn(uid),
	userId: text().references(() => user.id),
	token: text().notNull(),
	expiresAt: integer({ mode: 'timestamp_ms' }).notNull(),
	createdAt: integer({ mode: 'timestamp_ms' }).notNull(),
	updatedAt: integer({ mode: 'timestamp_ms' }).notNull(),
	ipAddress: text(),
	userAgent: text(),
});

export const account = sqliteTable('account', {
	id: text().primaryKey().$defaultFn(uid),
	userId: text().references(() => user.id),
	accountId: text().notNull(),
	providerId: text().notNull(),
	accessToken: text(),
	refreshToken: text(),
	accessTokenExpiresAt: integer({ mode: 'timestamp_ms' }),
	refreshTokenExpiresAt: integer({ mode: 'timestamp_ms' }),
	scope: text(),
	idToken: text(),
	password: text(),
	createdAt: integer({ mode: 'timestamp_ms' }).notNull(),
	updatedAt: integer({ mode: 'timestamp_ms' }).notNull(),
});

export const verification = sqliteTable('verification', {
	id: text().primaryKey().$defaultFn(uid),
	identifier: text().notNull(),
	value: text().notNull(),
	expiresAt: integer({ mode: 'timestamp_ms' }).notNull(),
	createdAt: integer({ mode: 'timestamp_ms' }).notNull(),
	updatedAt: integer({ mode: 'timestamp_ms' }).notNull(),
});
