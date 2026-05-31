<script lang="ts">
	import { auth } from '$lib/auth-client';
	import { Button } from 'uisv';

	const session = auth.useSession();

	let { children } = $props();
</script>

<svelte:head>
	<title>Quizbe - Interactive learning in one space</title>
</svelte:head>

<nav class="sticky top-0 p-2 flex items-center gap-2">
	<a href="/" class="h-fit font-black text-2xl text-primary-500"> Quizbe </a>

	<span class="flex-1"></span>

	<Button
		href={$session.data ? '/account' : '/signin'}
		label={$session.data ? $session.data.user.name : 'Sign in'}
		variant="soft"
		color="surface"
		icon="i-ph:user"
	/>
</nav>

{@render children()}
