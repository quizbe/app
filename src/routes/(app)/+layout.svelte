<script lang="ts">
	import { auth } from '$lib/auth-client';
	import Logo from '$lib/components/logo.svelte';
	import User from '~icons/ph/user';

	const session = auth.useSession();
</script>

<div class="h-18 p-4 sticky top-0 bg-white border-b border-zinc-200 flex overflow-hidden">
	<a href="/" class="flex items-center h-full px-2">
		<Logo class="h-8 text-svelte" />
	</a>

	<span class="flex-1"></span>

	{#if $session.data === null}
		<a
			href="/signin"
			class="h-10 flex items-center gap-2 px-4 transition rounded-xl hover:(bg-zinc-100)"
		>
			<User />

			Sign in
		</a>
	{/if}
</div>

<slot />
