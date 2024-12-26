<script>
	import { base } from '$app/paths';
	let bolt_size = 150;
</script>

<div class="flex min-h-screen flex-col bg-blue_violet-200 text-white">
	<div class="flex h-screen flex-col justify-center gap-14 px-4 pt-6">
		<h1 class="relative z-10 mb-4 text-center text-4xl font-bold lg:text-5xl">
			<div
				class="absolute left-1/2 top-1/2 -z-10 text-amber"
				style="width: {bolt_size}px; height: {bolt_size}px; transform: translate(-50%, -50%);"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={bolt_size}
					height={bolt_size}
					fill="currentColor"
					viewBox="0 0 16 16"
				>
					<path
						d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z"
					/>
				</svg>
			</div>

			<div class="inline-block w-32 text-right sm:w-44">
				<div
					class="text-terminal_green inline-block -rotate-1 bg-black px-2 py-1 font-['monospace']"
				>
					<span class=" text-terminal_green-300 text-3xl lg:text-4xl">></span>IA
				</div>
			</div>
			<span class="text-black">ou</span>
			<div class="inline-block w-32 text-left sm:w-44">
				<div
					class="inline-block rotate-1 rounded-sm bg-amber-900 px-2 py-1 font-['Dancing_Script'] text-amber-100"
				>
					Humain
				</div>
			</div>
		</h1>

		<div class="prose mx-auto text-white lg:prose-lg">
			<p>
				Il y a 2 ans, OpenAI lancait ChatGPT. Depuis, nous vivons dans un monde où de plus en plus
				de texte est généré par des programmes plutôt qu'écrit par des humains.
			</p>
			<p>
				Certaines personnes jurent détecter l'IA à des kilomètres. Et vous, est-ce que vous savez
				faire la différence entre une IA et un humain ?
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
	@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap');
</style>
