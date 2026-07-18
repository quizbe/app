<script lang="ts">
	import { App } from 'uisv';
	import { PHOSPHOR } from 'uisv/icons';
	import 'virtual:uno.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>Quizbe - Interactive learning in one space</title>
</svelte:head>

<App icons={PHOSPHOR}>
	{@render children()}
</App>
