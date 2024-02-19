<script>
	import { enhance } from '$app/forms';
	import ButtonYes from '$lib/ButtonYes.svelte';
	import ButtonNo from '$lib/ButtonNo.svelte';

	let { id, name } = $props();
</script>

<form method="POST" action="?/castVote" use:enhance>
	<h3>{name}</h3>
	<input type="hidden" name="id" value={id} />
	<ButtonNo type="submit" name="result" value={false} />
	<ButtonYes type="submit" name="result" value={true} />
</form>

<style>
	h3 {
		margin-top: 0;
		text-align: center;
	}

	form {
		border: solid black;
		border-radius: 1rem;
		display: inline-block;
		padding: 1rem;
		margin: 1rem;
		background-color: #eeeeee;
	}
</style>
