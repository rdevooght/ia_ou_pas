<script>
	import Commentator from '$lib/Commentator.svelte';
	import Option from '$lib/Option.svelte';
	import original_challenges from '$lib/challenges.json';
	import { generateUUID, save_guess } from '$lib/log.js';
	import { dev } from '$app/environment';
	import EndScreen from '$lib/EndScreen.svelte';
	import confetti from 'canvas-confetti';

	function randomTextOrder() {
		return Math.random() < 0.5 ? ['ai', 'human'] : ['human', 'ai'];
	}

	dev ? console.log('dev mode') : null;

	function successAnimation() {
		const isReduced =
			window.matchMedia(`(prefers-reduced-motion: reduce)`) === true ||
			window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
		// Basic confetti burst
		confetti({
			particleCount: 100,
			spread: 70,
			origin: { y: 0.9 },
			disableForReducedMotion: isReduced
		});
	}

	const challenges = [...original_challenges].sort(() => Math.random() - 0.5);
	const session_id = generateUUID();

	let currentChallengeID = $state(0);
	let currentChallenge = $derived(challenges[currentChallengeID]);
	let textOrder = $state(randomTextOrder());
	let guess = $state(null); // contains 0 if the user clicked on the first text, 1 if the user clicked on the second text, null if the user hasn't clicked yet
	let phase = $state(0); // 0: waiting for the user to submit a guess, 1: showing the result, 2: showing the final score
	let results = $state([]);
	let last_result = $derived(results[results.length - 1]);

	function submitGuess(event) {
		event.preventDefault();
		const correct = textOrder[guess] === 'human';
		results = [...results, correct];
		if (!dev) {
			save_guess(session_id, currentChallenge.id, correct);
		}
		if (correct) {
			successAnimation();
		}
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
		<h1 class="relative z-10 mb-4 text-center text-4xl font-bold lg:text-5xl">
			<div class="inline-block w-32 text-right sm:w-44">
				<div
					class="inline-block -rotate-1 bg-black px-2 py-1 font-['monospace'] text-terminal_green"
				>
					<span class=" text-3xl text-terminal_green-300 lg:text-4xl">></span>IA
				</div>
			</div>
			<span class="text-white">ou</span>
			<div class="inline-block w-32 text-left sm:w-44">
				<div
					class="inline-block rotate-1 rounded-sm bg-amber-900 px-2 py-1 font-['Dancing_Script'] text-amber-100"
				>
					Humain
				</div>
			</div>
		</h1>

		<p class="mb-4 text-center">
			Savez-vous différencier une texte généré par une IA d'un texte écrit par un humain ?
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
			class="absolute left-1/2 top-1/2 min-w-72 -translate-x-1/2 -translate-y-1/2 -rotate-1 rounded p-4 shadow-lg lg:top-0 lg:-translate-y-1/3"
		>
			{#if phase === 0}
				<div class="flex rotate-1 flex-col items-center gap-2">
					<p class="font-bold text-black">Cliquez sur le texte écrit par un humain</p>
					<button
						type="submit"
						disabled={guess === null}
						class="rounded bg-blue_violet-400 px-4 py-2 text-white hover:bg-blue_violet-300 active:bg-blue_violet-200 disabled:cursor-not-allowed disabled:bg-slate-400"
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
						<button
							onclick={nextChallenge}
							type="button"
							class="rounded bg-blue_violet-400 px-4 py-2 hover:bg-blue_violet-300 active:bg-blue_violet-200"
						>
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
	<div class="border-t border-amber-200 bg-amber p-2 text-black">
		<div class="flex flex-row justify-center">
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
		{#if phase === 2}
			<h2 class="mt-3 text-center text-xl">
				<span class="rounded-xl bg-rose-400 px-3 py-1 text-white">
					Un peu de contexte
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						viewBox="0 0 16 16"
						class="inline-block"
					>
						<path
							d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z"
						/>
					</svg>
				</span>
			</h2>
		{/if}
	</div>
</div>
{#if phase === 2}
	<div class="flex w-full flex-row justify-center bg-amber p-2 text-black">
		<div class="prose">
			<p>
				Les capacité des IA génératives peuvent impressionner, et les chatbot sont aujourd’hui <a
					href="https://www.odoxa.fr/sondage/un-francais-sur-cinq-a-deja-utilise-chatgpt/"
					>largement utilisés</a
				>, mais on ne peut en parler sans mentionner un série de problèmes que ces systèmes
				soulèvent:
			</p>
			<ul>
				<li>
					Ces IA sont entraînées sur des textes, images et vidéos sans l’autorisation des auteurs et
					autrices, parfois en ignorant une demande explicite des ayants droits de ne pas le faire.
				</li>

				<li>
					Derrière les IA <a
						href="https://www.theverge.com/features/23764584/ai-artificial-intelligence-data-notation-labor-scale-surge-remotasks-openai-chatbots"
						>se cachent beaucoup d’humains</a
					>
					souvent
					<a href="https://time.com/6247678/openai-chatgpt-kenya-workers"
						>mal payés pour entraîner les modèles</a
					>, les modérer ou
					<a
						href="https://www.theguardian.com/technology/2022/dec/13/becoming-a-chatbot-my-life-as-a-real-estate-ais-human-backup"
						>prendre le relais quand l’IA montre ses limites</a
					>.
				</li>

				<li>
					La consommation électrique des IA est importante, <a
						href="https://www.theguardian.com/technology/2024/sep/15/data-center-gas-emissions-tech"
						>probablement sous-estimée</a
					>
					et en
					<a
						href="https://next.ink/162010/la-consommation-energetique-de-lia-devrait-etre-multipliee-par-4-a-9-dici-2050/"
						>rapide augmentation</a
					>. L’intense consommation des datacenters
					<a href="https://www.bloomberg.com/graphics/2024-ai-power-home-appliances/"
						>met à mal les réseaux électriques</a
					>, et pousse les grandes entreprises de la tech à
					<a href="https://www.thejournal.ie/investigates-data-centres-6554698-Nov2024/"
						>se tourner vers les combustibles fossiles</a
					>.
				</li>

				<li>
					Les chatbot déclarent des vérités comme des pures inventions sur le même ton, et il ne
					semble pas y avoir de piste claire pour résoudre ce problème.
				</li>
			</ul>
		</div>
	</div>
{/if}

{#if phase === 2}
	<EndScreen {results} share={true} />
{/if}
