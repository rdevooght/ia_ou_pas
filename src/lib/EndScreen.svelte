<script>
	import Modal from '$lib/Modal.svelte';
	import Commentator from '$lib/Commentator.svelte';
	import Share from '$lib/Share.svelte';

	let { results, share } = $props();

	let correctGuesses = $derived(results.filter((result) => result).length);
	let last_result = $derived(results[results.length - 1]);

	const level = [
		"IA dans un costume d'être humain",
		'Agent à la solde des IA',
		'Joueur malchanceux',
		'Le hasard fait bien les choses',
		'On ne vous la fait pas',
		"Dernier espoir de l'humanité"
	];
</script>

<Modal isOpen={true}>
	<div class="flex flex-col gap-4 p-4">
		<div
			class="flex flex-row items-center justify-center gap-4 px-2 py-1 text-white"
			class:bg-forest_green-400={last_result}
			class:bg-red={!last_result}
		>
			<div class="text-3xl">
				{last_result ? '✓' : '✗'}
			</div>
			<div>
				<Commentator {results} />
			</div>
		</div>

		<p class="text-center text-2xl lg:text-3xl">
			Score final {correctGuesses}/{results.length}
		</p>

		{#if correctGuesses === results.length}
			<img src="https://i.giphy.com/fnK0jeA8vIh2QLq3IZ.webp" alt="GIF d'applaudissement" />
		{:else if correctGuesses === 0}
			<img
				alt="GIF d'un robot qui grimace"
				src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHJhOG81ZXExYWF4bHVsaDZlY3docXFhZXo1c2ozNWVzZ3BubXNoaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kE6xCyOOHoxlS/giphy.webp"
			/>
		{/if}

		<p class="text-center text-xl lg:text-2xl">
			Niveau: {level[correctGuesses]}
		</p>

		{#if share}
			<Share {results} />
		{/if}
	</div>
</Modal>
