<script lang="ts">
	import { createQuiz, deleteQuiz, loadQuizzes, saveQuiz } from '$lib/storage';
	import type { Quiz } from '$lib/types';
	import { onMount } from 'svelte';
	import SealQuestion from '~icons/ph/seal-question';
	import FilePlus from '~icons/ph/file-plus';
	import Pen from '~icons/ph/pen';
	import Rocket from '~icons/ph/rocket';
	import DotSixVertical from '~icons/ph/dots-six-vertical';
	import Trash from '~icons/ph/trash';
	import Copy from '~icons/ph/copy';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import Dropdown from '$lib/components/dropdown.svelte';
	import { Button } from 'uisv';
	import { uid } from 'uid/secure';
	import { watch } from 'runed';
	import dayjs from 'dayjs';
	import relative from 'dayjs/plugin/relativeTime';

	dayjs.extend(relative);
</script>

<div class="p-4 min-h-[calc(100vh-var(--spacing)*18)] flex flex-col gap-4"></div>
