import { json } from '@sveltejs/kit';
import sql_migration from '$drizzle/0000_migration.sql?raw';

export async function POST({ locals }) {
	return json({});
}

export async function PUT({ locals }) {
	return json({});
}

export async function DELETE({ locals }) {
	return json({});
}
