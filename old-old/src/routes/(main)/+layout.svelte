<script lang="ts">
	import { Button } from 'uisv';

	let { children } = $props();
</script>

<svelte:head>
	<title>Quizbe - Interactive learning in one space</title>
</svelte:head>

<nav class="sticky top-0 p-4 flex items-center gap-4">
	<a href="/" class="h-fit font-black text-2xl text-primary-500"> Quizbe </a>

	<span class="flex-1"></span>

	<Button href="/account" label="Account" variant="soft" color="surface" icon="i-ph:user" />

	<!-- href={$session.data ? '/account' : '/signin'} -->
	<!-- label={$session.data ? $session.data.user.name : 'Sign in'} -->
</nav>

{@render children()}
