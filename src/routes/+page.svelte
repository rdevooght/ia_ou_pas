<script>
	import { base } from '$app/paths';
</script>

<div class="flex min-h-screen flex-col bg-blue_violet-200 text-white">
	<div class="flex h-screen flex-col justify-center gap-10 px-4 pt-6">
		<h1 class="mb-4 text-center text-4xl font-bold lg:text-5xl">
			<span class="inline-block -rotate-1 bg-black px-2 py-1 font-['monospace']"
				><span class=" text-3xl text-gray-400 lg:text-4xl">></span>IA</span
			>
			ou
			<span
				class="inline-block rotate-1 rounded-sm bg-amber-900 px-2 py-1 font-['Dancing_Script'] text-amber-100"
				>Humain</span
			>
		</h1>

		<div class="prose mx-auto text-white lg:prose-lg">
			<p>
				Il y a 2 ans, OpenAI lancait ChatGPT. Depuis, nous vivons dans un monde où de plus en plus
				de texte est généré par des programmes plutôt qu'écrit par des humains.
			</p>
			<p>
				Certaines personnes jurent détecter l'IA à des kilomètres. Et vous, est-ce que vous pensez
				pouvoir faire la différence entre une IA et un humain ?
			</p>
		</div>
		<div class="mt-5 text-center">
			<a
				href="{base}/questions"
				class="rounded bg-azure-300 px-4 py-2 hover:bg-azure-200 active:bg-azure-100"
				>Faire le test</a
			>
		</div>
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Style+Script&display=swap');
</style>
