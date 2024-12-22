<script>
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<title>AI ou pas ? Pouvez-vous reconnaitre l'IA ?</title>
</svelte:head>
<main class="">
	{@render children()}
</main>
