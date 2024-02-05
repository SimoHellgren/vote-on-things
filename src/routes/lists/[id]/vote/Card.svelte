<script>
	import { createEventDispatcher } from 'svelte';
	import { enhance } from '$app/forms';
	const dispatch = createEventDispatcher();

	let { id, name } = $props();
</script>

<form method="POST" use:enhance>
	{name}
	<input type="hidden" name="id" value={id} />
	<button type="submit" name="result" value={true}>Yes</button>
	<button type="submit" name="result" value={false}>No</button>
</form>

<style>
	form {
		border: solid black;
		display: inline-block;
		padding: 1rem;
	}
</style>
