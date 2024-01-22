<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	let { name, handleYes, handleNo } = $props();
</script>

<div>
	{name}

	<button onclick={() => dispatch('result', true)}>Yes</button>
	<button onclick={() => dispatch('result', false)}>No</button>
</div>

<style>
	div {
		border: solid black;
		display: inline-block;
		padding: 1rem;
	}
</style>
