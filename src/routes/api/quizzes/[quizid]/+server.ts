import { db } from '$lib/server/db';
import { quiz } from '$lib/server/schema';
import { json, error } from '@sveltejs/kit';
import { like, and, eq } from 'drizzle-orm/sql';

export async function POST({ locals, params: { quizid } }) {
	if (!locals.user) return error(401);

	const data = db.query.quiz.findFirst({
		where: and(like(quiz.authors, locals.user.id), eq(quiz.id, quizid)),
	});

	return json(data);
}
