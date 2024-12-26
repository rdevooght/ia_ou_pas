<script>
	import '../app.css';
	import { dev } from '$app/environment';
	let { children } = $props();
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>AI ou pas ?</title>
	<meta name="title" content="AI ou pas ?" />
	<meta
		name="description"
		content="Savez-vous différencier une texte généré par une IA d'un texte écrit par un humain ?"
	/>

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://blog.robindevooght.be/ia_ou_pas" />
	<meta property="og:title" content="AI ou pas ?" />
	<meta
		property="og:description"
		content="Savez-vous différencier une texte généré par une IA d'un texte écrit par un humain ?"
	/>
	<meta property="og:image" content="https://blog.robindevooght.be/ia_ou_pas/mini.png" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://blog.robindevooght.be/ia_ou_pas" />
	<meta property="twitter:title" content="AI ou pas ?" />
	<meta
		property="twitter:description"
		content="Savez-vous différencier une texte généré par une IA d'un texte écrit par un humain ?"
	/>
	<meta property="twitter:image" content="https://blog.robindevooght.be/ia_ou_pas/mini.png" />

	<!-- Meta Tags Generated with https://metatags.io -->
</svelte:head>
<main class="">
	{@render children()}
</main>

{#if !dev}
	{@html `<!-- Cloudflare Web Analytics --><script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "05b4282391484b1ba19c5fa3458aa5a6"}'></script><!-- End Cloudflare Web Analytics -->`}
{/if}
