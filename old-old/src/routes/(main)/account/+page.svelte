<script>
	import { Card, H2, Icon } from 'uisv';
	import { auth } from '$lib/auth-client';

	const session = auth.useSession();
	// const secrets = $state({ key: '', url: '' });

	// onMount(async () => {
	// 	const storage = useSecretsStorage();
	// 	const key = await storage.get('secrets:api_key');
	// 	const url = await storage.get('secrets:api_url');

	// 	if (key) secrets.key = key;
	// 	if (url) secrets.url = url;
	// });
</script>

<div class="container mx-auto space-y-4">
	<H2>Settings</H2>

	<Card variant="outline">
		{#snippet header()}
			<h3 class="font-semibold mb-4 flex items-center gap-2">
				<Icon name="i-ph:user-fill" />
				You
			</h3>

			<p class="text-label-muted">All things and everything about you, including your profile.</p>
		{/snippet}

		{#if $session?.data}
			hello
		{:else}
			<div class="h-40 flex items-center justify-center gap-2 text-label-muted">
				<Icon name="i-ph:warning" />

				Not signed in
			</div>
		{/if}
	</Card>
	<!--
	<Card variant="outline" ui={{ header: 'space-y-4' }}>
		{#snippet header()}
			<h3 class="font-semibold flex items-center gap-2">
				<Icon name="i-ph:key-fill" />
				Database
			</h3>

			<p class="text-label-muted">
				These secret keys are used for cloud syncing your resources. Keep the inputs empty if you
				want to store resources on your device.
			</p>

			<Alert icon="i-ph:warning" title="This does nothing at the moment" variant="soft" />
		{/snippet}

		<input bind:value={secrets.key} type="text" placeholder="API Key" />
		<input bind:value={secrets.url} type="text" placeholder="API URL" />
	</Card> -->
</div>
