<script>
	import { onMount } from 'svelte';

	let { isOpen, children } = $props();

	let modal;

	function closeModal() {
		isOpen = false;
	}

	function handleClick(event) {
		if (modal && !modal.contains(event.target)) {
			closeModal();
		}
	}

	$effect(() => {
		document.addEventListener('click', handleClick);
		return () => {
			document.removeEventListener('click', handleClick);
		};
	});
</script>

{#if isOpen}
	<div class="modal-overlay">
		<div class="modal" bind:this={modal}>
			<button class="close-btn" onclick={closeModal}>×</button>
			{@render children?.()}
		</div>
	</div>
{/if}

<style>
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}

	.modal {
		@apply bg-amber-800;
		padding: 20px;
		border-radius: 4px;
		position: relative;
		min-width: 300px;
		max-width: 90%;
		max-height: 90vh;
		overflow-y: auto;
	}

	.close-btn {
		position: absolute;
		top: 10px;
		right: 10px;
		border: none;
		background: none;
		font-size: 24px;
		cursor: pointer;
		padding: 0;
		width: 24px;
		height: 24px;
		line-height: 24px;
	}

	.close-btn:hover {
		opacity: 0.7;
	}
</style>
