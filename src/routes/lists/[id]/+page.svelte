<script>
	import { enhance } from '$app/forms';

	let { data } = $props();
</script>

<div class="list-header">
	<h2>Items in list {data.list.name}</h2>

	<form method="POST" action="?/removeList">
		<button>DELETE</button>
	</form>
</div>

{#each data.items as item}
	<div>
		<span>{item.name}</span>
		<form method="POST" use:enhance>
			<input type="hidden" name="itemId" value={item.id} />
			<button formaction="?/removeItem">delete</button>
		</form>
	</div>
{/each}

<h2>Add items</h2>
<form method="POST" action="?/addItem" use:enhance>
	<textarea name="newitems" placeholder="add items (1 per line)"></textarea>
	<button>Add</button>
</form>

<h2>Voting</h2>
<a href={`${data.list.id}/vote`}>Tinder</a>

<style>
	form {
		display: inline;
	}

	.list-header {
		display: flex;
		justify-content: start;
		align-items: center;
		gap: 1rem;
	}
</style>
