<script lang="ts">
	import { auth } from '$lib/auth-client';
	import Logo from '$lib/components/logo.svelte';
	import { Button } from 'uisv';

	const session = auth.useSession();
</script>

<div class="h-18 p-4 sticky top-0 bg-white border-b border-zinc-200 flex overflow-hidden">
	<a href="/" class="">
		<Logo class="h-8 text-primary-500" />
	</a>

	<span class="flex-1"></span>

	<Button
		variant="ghost"
		size="lg"
		color="surface"
		icon="i-ph-user"
		href={$session.data ? '/account' : '/signin'}
		label={$session.data ? $session.data.user.name : 'Sign in'}
	/>
</div>

<slot />
