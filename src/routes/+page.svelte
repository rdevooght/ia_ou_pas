<script>
	const challenges = [
		{
			id: 1,
			title: 'Test #1',
			ai: { text: 'Text écrit par une IA', source: 'GPT-3' },
			human: { text: 'Text écrit par un humain', source: 'Robin' }
		},
		{
			id: 2,
			title: 'Test #2',
			ai: { text: 'Text écrit par une IA', source: 'GPT-3' },
			human: { text: 'Text écrit par un humain', source: 'Robin' }
		},
		{
			id: 3,
			title: 'Test #3',
			ai: { text: 'Text écrit par une IA', source: 'GPT-3' },
			human: { text: 'Text écrit par un humain', source: 'Robin' }
		}
	];

	function randomTextOrder() {
		return Math.random() < 0.5 ? ['ai', 'human'] : ['human', 'ai'];
	}

	let currentChallengeID = $state(0);
	let currentChallenge = $derived(challenges[currentChallengeID]);
	let textOrder = $state(randomTextOrder());
	let guess = $state(null); // contains 0 if the user clicked on the first text, 1 if the user clicked on the second text, null if the user hasn't clicked yet
	let phase = $state(0); // 0: waiting for the user to submit a guess, 1: showing the result, 2: showing the final score
	let results = $state([]);
	let last_result = $derived(results[results.length - 1]);

	function submitGuess(event) {
		event.preventDefault();
		results = [...results, textOrder[guess] === 'human'];
		if (challenges.length > currentChallengeID + 1) {
			phase = 1;
		} else {
			phase = 2;
		}
	}

	function nextChallenge() {
		phase = 0;
		guess = null;
		currentChallengeID++;
		textOrder = randomTextOrder();
	}
</script>

<!-- <div
	class:bg-blue_violet-200={phase === 0}
	class:bg-sgbus_green-300={phase !== 0 && textOrder[guess] === 'human'}
	class:bg-red={phase !== 0 && textOrder[guess] === 'ai'}
	class="flex min-h-screen flex-col text-white"
> -->
<div class="bg-blue_violet-200 flex min-h-screen flex-col text-white">
	<div class="px-4 pt-6">
		<h1 class="mb-4 text-center text-3xl font-bold">IA ou pas</h1>

		<p class="mb-4 text-center">
			Savez-vous différencier une texte écrit par une IA d'un texte écrit par un humain ?
		</p>
	</div>

	<form class="relative flex flex-1 flex-col gap-4 p-4 lg:flex-row" onsubmit={submitGuess}>
		<div class="flex flex-1">
			<input
				type="radio"
				name="choice"
				value={0}
				id="choice0"
				class="sr-only"
				disabled={phase !== 0}
				bind:group={guess}
			/>
			<label
				for="choice0"
				class:guessed-human={(guess === 0) & (phase === 0)}
				class:guessed-ai={(guess === 1) & (phase === 0)}
				class:reveal-human={(phase !== 0) & (textOrder[0] === 'human')}
				class:reveal-ai={(phase !== 0) & (textOrder[0] === 'ai')}
				class:correct-guess={(phase !== 0) & last_result}
				class="hover:bg-rose relative flex flex-1 cursor-pointer items-center justify-center rounded-lg bg-rose-600 p-4 transition-colors"
			>
				<div class="text-center">
					<p>{currentChallenge[textOrder[0]].text}</p>
				</div>
			</label>
		</div>

		<div class="flex flex-1">
			<input
				type="radio"
				name="choice"
				value={1}
				id="choice1"
				class="sr-only"
				disabled={phase !== 0}
				bind:group={guess}
			/>
			<label
				for="choice1"
				class:guessed-human={(guess === 1) & (phase === 0)}
				class:guessed-ai={(guess === 0) & (phase === 0)}
				class:reveal-human={(phase !== 0) & (textOrder[1] === 'human')}
				class:reveal-ai={(phase !== 0) & (textOrder[1] === 'ai')}
				class:correct-guess={(phase !== 0) & last_result}
				class="hover:bg-rose relative flex flex-1 cursor-pointer items-center justify-center rounded-lg bg-rose-600 p-4 transition-colors"
			>
				<div class="text-center">
					<p>{currentChallenge[textOrder[1]].text}</p>
				</div>
			</label>
		</div>

		<div
			class:bg-forest_green-400={last_result && phase !== 0}
			class:bg-red={!last_result && phase !== 0}
			class:bg-amber={phase === 0}
			class="absolute left-1/2 top-1/2 min-w-72 -translate-x-1/2 -translate-y-1/2 -rotate-1 rounded p-4 shadow-lg lg:top-0"
		>
			{#if phase === 0}
				<div class="flex rotate-1 flex-row items-center gap-2">
					<p class="font-bold text-black">Cliquez sur le texte écrit par un humain</p>
					<button
						type="submit"
						disabled={guess === null}
						class="bg-blue_violet-400 rounded px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-slate-400"
						>Valider</button
					>
				</div>
			{:else if phase === 1}
				<div class="flex rotate-1 flex-row items-center gap-2 text-black">
					{#if last_result}
						<p><span class="text-sgbus_green-200">✓</span> Correct!</p>
					{:else}
						<p><span class="text-red-300">✗</span> Incorrect!</p>
					{/if}
					<button
						onclick={nextChallenge}
						type="button"
						class="rounded bg-blue-500 px-4 py-2 text-white"
					>
						Question suivante
					</button>
				</div>
			{:else}
				<div class="rotate-1">
					{#if last_result}
						<p><span class="text-sgbus_green-200">✓</span> Correct!</p>
					{:else}
						<p><span class="text-red-300">✗</span> Incorrect!</p>
					{/if}
					<p>Fin du jeu</p>
				</div>
			{/if}
		</div>
	</form>
	<div
		class="bg-amber flex w-full flex-row justify-center border-t border-amber-200 p-2 text-black"
	>
		<div>Score:</div>
		{#each challenges as challenge, i}
			<div class="mx-1 h-6 w-6 text-center">
				{#if i > results.length}
					•
				{:else if i === results.length}
					?
				{:else if results[i]}
					<span class="text-sgbus_green-200">✓</span>
				{:else}
					<span class="text-red-300">✗</span>
				{/if}
			</div>
		{/each}
	</div>
</div>

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
