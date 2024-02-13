<script>
	import { enhance } from '$app/forms';

	let { id, name } = $props();
</script>

<form method="POST" action="?/castVote" use:enhance>
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
