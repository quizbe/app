<script lang="ts">
	import Discord from '~icons/simple-icons/discord';
	import Dropbox from '~icons/simple-icons/dropbox';
	import Facebook from '~icons/simple-icons/facebook';
	import Figma from '~icons/simple-icons/figma';
	import Github from '~icons/simple-icons/github';
	import Gitlab from '~icons/simple-icons/gitlab';
	import Google from '~icons/simple-icons/google';
	import Linkedin from '~icons/simple-icons/linkedin';
	import Microsoft from '~icons/simple-icons/microsoft';
	import Notion from '~icons/simple-icons/notion';
	import Reddit from '~icons/simple-icons/reddit';
	import Roblox from '~icons/simple-icons/roblox';
	import Salesforce from '~icons/simple-icons/salesforce';
	import Slack from '~icons/simple-icons/slack';
	import Spotify from '~icons/simple-icons/spotify';
	import Twitch from '~icons/simple-icons/twitch';
	import Twitter from '~icons/simple-icons/twitter';
	import Zoom from '~icons/simple-icons/zoom';
	import { auth } from '$lib/auth-client';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	const session = auth.useSession();

	$effect(() => {
		if ($session.data) {
			goto(resolve('/(app)/account'));
		}
	});

	const SOCIALS = {
		discord: { icon: Discord },
		dropbox: { icon: Dropbox },
		facebook: { icon: Facebook },
		figma: { icon: Figma },
		github: { icon: Github },
		gitlab: { icon: Gitlab },
		google: { icon: Google },
		linkedin: { icon: Linkedin },
		microsoft: { icon: Microsoft },
		notion: { icon: Notion },
		reddit: { icon: Reddit },
		roblox: { icon: Roblox },
		salesforce: { icon: Salesforce },
		slack: { icon: Slack },
		spotify: { icon: Spotify },
		twitch: { icon: Twitch },
		twitter: { icon: Twitter },
		zoom: { icon: Zoom },
	};
</script>

<div class="p-4 min-h-[calc(100vh-var(--spacing)*18)] grid">
	<div class="max-w-7xl w-full mx-auto flex flex-col justify-center items-center gap-4 h-full">
		<h1 class="text-3xl font-medium">Welcome to Quizbe</h1>

		<p class="text-black/75">
			You can set up your Quizbe account by logging in with your social media account.
		</p>

		<br />

		<div
			class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 w-full"
		>
			{#each Object.entries(SOCIALS) as [provider, { icon: Icon }], idx (idx)}
				<button
					class="flex gap-4 font-medium capitalize cursor-pointer items-center px-4 h-12 border rounded-xl border-neutral-200 transition hover:bg-neutral-50"
					onclick={() => auth.signIn.social({ provider })}
				>
					<Icon />

					{provider}
				</button>
			{/each}
		</div>
	</div>
</div>
