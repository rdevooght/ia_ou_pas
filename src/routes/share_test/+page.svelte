<script>
	import EndScreen from '$lib/EndScreen.svelte';
	let results = $state([true, true, true, true, true]);
	let ready = $state(false);

	$effect(() => {
		ready = true;
	});
</script>

{#if ready}
	<EndScreen {results} share={true} />
{/if}
