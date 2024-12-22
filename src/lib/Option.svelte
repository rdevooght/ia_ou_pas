<script>
	let { phase, guess, truth, challenge, input_id } = $props();
</script>

<label
	for="choice{input_id}"
	class:guessed-human={(guess === 'human') & (phase === 0)}
	class:guessed-ai={(guess === 'ai') & (phase === 0)}
	class:reveal-human={(phase !== 0) & (truth === 'human')}
	class:reveal-ai={(phase !== 0) & (truth === 'ai')}
	class:correct-guess={(phase !== 0) & (truth === guess)}
	class="relative flex flex-1 cursor-pointer items-center justify-center rounded-lg bg-rose-600 px-4 py-16 transition-colors hover:bg-rose"
>
	<div class="prose text-center text-white lg:prose-xl">
		<p>{challenge[truth].text}</p>
		{#if phase !== 0}
			<p class="text-sm text-rose-900">
				Source: {challenge[truth].source}
			</p>
		{/if}
	</div>
</label>

<style>
	.guessed-human {
		@apply bg-rose shadow-inner shadow-rose-400;
	}

	.guessed-ai {
		@apply bg-rose-700;
	}

	/* .reveal-human.correct-guess {
		@apply bg-forest_green-400;
	}

	.reveal-ai.correct-guess {
		@apply bg-forest_green-600;
	}

	.reveal-human {
		@apply bg-red;
	}

	.reveal-ai {
		@apply bg-red-700;
	} */

	.guessed-human::before,
	.guessed-ai::before,
	.reveal-human::before,
	.reveal-ai::before {
		content: '';
		position: absolute;
		bottom: 0;
		right: 0;
		width: 50%;
		height: 50%;
		background-size: contain;
		background-repeat: no-repeat;
		background-position: bottom right;
		opacity: 0.3;
	}

	.guessed-human::before,
	.reveal-human::before {
		background-image: url('/hand-writting.png');
	}

	.guessed-ai::before,
	.reveal-ai::before {
		background-image: url('/ai-icon.png');
	}
</style>
