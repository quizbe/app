<script lang="ts">
	import favicon from '$lib/assets/icon.svg';
	import 'virtual:uno.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Quizbe - Interactive learning all in one space</title>
</svelte:head>

{@render children()}

<style>
	:global(body) {
		--at-apply: bg-zinc-50;
	}
</style>
