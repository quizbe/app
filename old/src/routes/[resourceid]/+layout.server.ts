export async function load({ parent, locals }) {
	await parent();

	if (!locals.session) return;

	return {};
}
