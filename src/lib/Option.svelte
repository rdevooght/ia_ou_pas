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
	class:cursor-pointer={phase === 0}
	class="relative flex flex-1 items-center justify-center rounded-lg bg-rose-600 px-4 py-16 transition-colors hover:bg-rose"
>
	<div class="prose text-center text-white lg:prose-xl">
		<p>{challenge[truth].text}</p>
		{#if phase !== 0}
			<p class="text-sm">
				Source: {challenge[truth].source}
			</p>
		{/if}
	</div>
</label>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap');

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
	*/
	.reveal-human {
		@apply bg-amber-900 font-['Dancing_Script'];
	}
	.reveal-human div {
		@apply text-2xl text-amber-100;
	}

	.reveal-ai {
		@apply bg-black font-['monospace'];
	}
	.reveal-ai div {
		@apply text-terminal_green;
	}

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

	.guessed-human::before {
		background-image: url('/hand-writting.png');
	}

	.guessed-ai::before {
		background-image: url('/ai-icon.png');
	}
</style>
