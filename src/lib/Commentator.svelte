<script>
	// results is an array of booleans, true if the user guessed correctly, false otherwise
	let { results } = $props();
	let correctGuesses = $derived(results.filter((result) => result).length);
	let totalGuesses = $derived(results.length);
	let incorrectGuesses = $derived(totalGuesses - correctGuesses);
	let score = $derived((correctGuesses / totalGuesses) * 100);
	let lastResult = $derived(results[results.length - 1]);

	const comments = [
		[1, 0, 1, 'Bien vu !'],
		[2, 0, 1, "2/2, c'est un bon début !"],
		[3, 0, 1, '3/3, pas mal, mais ça peut encore être de la chance.'],
		[4, 0, 1, '4/4, est-ce que tu vas faire le sans faute ?'],
		[5, 0, 1, 'Un vrai détecteur de robots !'],
		[0, 1, 0, "Non, c'était l'inverse. Mais ce n'est que le début, voyons la suite !"],
		[0, 2, 0, 'Encore raté !'],
		[
			0,
			3,
			0,
			"... donc l'objectif est de cliquer sur le texte écrit par un humain, pas l'inverse."
		],
		[0, 4, 0, 'Est-ce que tu ne serais pas un robot ?'],
		[0, 5, 0, "0/5, d'une certaine manière, c'est un exploit."],
		[1, 1, 0, "Non, cette fois c'était l'inverse."],
		[1, 1, 1, "Bravo, cette fois c'est bon !"],
		[1, 2, 0, 'Encore raté !'],
		[1, 2, 1, 'Bien joué, tu peux encore revenir dans la course !'],
		[1, 3, 0, 'Il te reste encore un essai, mais ça va pas être un super score.'],
		[1, 3, 1, 'Bravo, on lache rien !'],
		[1, 4, 0, "1/5... tu es sûr d'avoir bien compris le principe ?"],
		[1, 4, 1, "Allez tu sauves l'honneur ! Mais 1/5, c'est pas terrible."],
		[2, 1, 0, null],
		[2, 1, 1, null],
		[2, 2, 0, '50/50... autant choisir au hasard.'],
		[2, 2, 1, '50/50... autant choisir au hasard.'],
		[2, 3, 0, "On dirait que c'est pas facile de différencier IA et humain."],
		[2, 3, 1, 'Bon dernier choix, mais ça reste pas mieux que tirer à pile ou face.'],
		[3, 1, 0, null],
		[3, 1, 1, null],
		[3, 2, 0, 'Dommage pour le dernier, au final tu ne fais pas beaucoup mieux que le hasard'],
		[3, 2, 1, 'Bon dernier choix, mais ça reste pas beaucoup mieux que tirer à pile ou face.'],
		[4, 1, 0, "Si proche du but ! Mais 4 sur 5 c'est vraiment pas mal."],
		[4, 1, 1, 'Bravo, quasi sans faute !']
	];

	function getComment(correctGuesses, incorrectGuesses, lastResult) {
		let comment = comments.find(
			(c) => c[0] === correctGuesses && c[1] === incorrectGuesses && c[2] == lastResult
		);
		console.log(comment);
		if (comment && comment[3]) {
			return comment[3];
		} else {
			if (lastResult) {
				return 'Correct !';
			} else {
				return "Non, c'était l'inverse :(";
			}
		}
	}
</script>

<p>
	{getComment(correctGuesses, incorrectGuesses, lastResult)}
</p>
