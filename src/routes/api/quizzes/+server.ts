import { db } from '$lib/server/db';
import { quiz } from '$lib/server/schema';
import { error, json, text } from '@sveltejs/kit';
import { eq, like } from 'drizzle-orm/sql';
import { nanoid } from 'nanoid';

export async function POST({ locals }) {
	if (!locals.user) return error(401);

	const quizzes = db.select().from(quiz).where(like(quiz.authors, locals.user.id));

	return json(quizzes);
}

export async function PUT(event) {
	if (!event.locals.user) return error(401);

	const id = nanoid();
	const res = await db.query.quiz.findFirst({ where: eq(quiz.id, id) });
	if (res) return PUT(event);

	db.insert(quiz).values({
		id,
		title: 'Untitled quiz',
		authors: [event.locals.user.id],
		created: Date.now(),
		updated: Date.now(),
		questions: [],
	});

	return text(id);
}
