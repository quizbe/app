<script lang="ts">
	import { useResource } from '$lib/contexts';

	const resource = useResource();

	$inspect(resource);
</script>

<div
	class="min-h-[calc(100vh-var(--spacing)*16)] p-4 flex flex-col gap-4 items-center justify-center"
></div>
