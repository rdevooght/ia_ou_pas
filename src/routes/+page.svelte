<script>
	import Commentator from '$lib/Commentator.svelte';
	import Option from '$lib/Option.svelte';
	import original_challenges from '$lib/challenges.json';

	function randomTextOrder() {
		return Math.random() < 0.5 ? ['ai', 'human'] : ['human', 'ai'];
	}

	const challenges = [...original_challenges].sort(() => Math.random() - 0.5);

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
<div class="flex min-h-screen flex-col bg-blue_violet-200 text-white">
	<div class="px-4 pt-6">
		<h1 class="mb-4 text-center text-3xl font-bold">IA ou pas</h1>

		<p class="mb-4 text-center">
			Savez-vous différencier une texte écrit par une IA d'un texte écrit par un humain ?
		</p>
	</div>

	<form
		class="container relative mx-auto grid flex-1 grid-rows-2 gap-4 p-4 lg:mt-8 lg:grid-cols-2 lg:grid-rows-1"
		onsubmit={submitGuess}
	>
		{#each [0, 1] as i}
			<div class="flex">
				<input
					type="radio"
					name="choice"
					value={i}
					id="choice{i}"
					class="sr-only"
					disabled={phase !== 0}
					bind:group={guess}
				/>
				<Option
					input_id={i}
					truth={textOrder[i]}
					challenge={currentChallenge}
					{phase}
					guess={guess === null ? null : guess === i ? 'human' : 'ai'}
				/>
			</div>
		{/each}

		<div
			class:bg-forest_green-400={last_result && phase !== 0}
			class:bg-red={!last_result && phase !== 0}
			class:bg-amber={phase === 0}
			class="absolute left-1/2 top-1/2 min-w-72 -translate-x-1/2 -translate-y-1/2 -rotate-1 rounded p-4 shadow-lg lg:top-0"
		>
			{#if phase === 0}
				<div class="flex rotate-1 flex-col items-center gap-2">
					<p class="font-bold text-black">Cliquez sur le texte écrit par un humain</p>
					<button
						type="submit"
						disabled={guess === null}
						class="rounded bg-blue_violet-400 px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-slate-400"
						>Valider</button
					>
				</div>
			{:else if phase === 1}
				<div class="flex rotate-1 flex-row items-center gap-4 text-white">
					<div class="text-3xl">
						{last_result ? '✓' : '✗'}
					</div>
					<div class="flex flex-col gap-2">
						<Commentator {results} />
						<button onclick={nextChallenge} type="button" class="rounded bg-blue-500 px-4 py-2">
							Question suivante
						</button>
					</div>
				</div>
			{:else}
				<div class="flex rotate-1 flex-row items-center gap-4 text-white">
					<div class="text-3xl">
						{last_result ? '✓' : '✗'}
					</div>
					<div class="flex flex-col gap-2">
						<Commentator {results} />
						<div class="font-bold">
							Score final: {results.filter((result) => result).length}/{results.length}
						</div>
					</div>
				</div>
			{/if}
		</div>
	</form>
	<div
		class="flex w-full flex-row justify-center border-t border-amber-200 bg-amber p-2 text-black"
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
