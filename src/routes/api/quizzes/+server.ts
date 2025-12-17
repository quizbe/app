import { db } from '$lib/server/db';
import { quiz } from '$lib/server/schema';
import { error, json } from '@sveltejs/kit';
import { like } from 'drizzle-orm/sql';

export async function POST({ locals }) {
	if (!locals.user) return error(401);

	const quizzes = db.select().from(quiz).where(like(quiz.authors, locals.user.id));

	return json(quizzes);
}
