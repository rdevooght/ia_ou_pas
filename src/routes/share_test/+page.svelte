<script>
	import EndScreen from '$lib/EndScreen.svelte';
	let results = $state([true, false, true, true, false]);
	let ready = $state(false);

	$effect(() => {
		ready = true;
	});
</script>

{#if ready}
	<EndScreen {results} share={true} />
{/if}
