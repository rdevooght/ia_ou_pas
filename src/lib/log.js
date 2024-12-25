export function generateUUID() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = (Math.random() * 16) | 0,
			v = c == 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

export function save_guess(session_id, question_id, correct) {
	console.log('submitting');
	const data = {
		session_id: session_id,
		question_id: question_id.toString(),
		correct: correct
	};
	console.log(data);

	let url = 'https://ai-or-not-backend.robin-de.workers.dev/save_guess';

	fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error(`Failed to submit corrections -> status: ${response.status}`);
			}
			return response.json();
		})
		.then((data) => {
			console.log('Success:', data);
		})
		.catch((error) => {
			console.error('Error:', error);
		});
}
