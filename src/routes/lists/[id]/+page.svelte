<script>
	import { enhance } from '$app/forms';
	import { fade } from 'svelte/transition';

	let { data } = $props();
</script>

<div class="list-header">
	<h2>Items in list {data.list.name}</h2>

	<form method="POST" action="?/removeList">
		<button>DELETE</button>
	</form>
</div>

{#each data.items as item}
	<div transition:fade={{ duration: 200 }}>
		<span>{item.name}</span>
		<!-- TODO: this permission check is a touch hacky -->
		{#if item.owner.email === data.user.email}
			<form method="POST" use:enhance>
				<input type="hidden" name="itemId" value={item.id} />
				<button formaction="?/removeItem">delete</button>
			</form>
		{/if}
	</div>
{/each}

<h2>Add items</h2>
<form method="POST" action="?/addItem" use:enhance>
	<textarea name="newitems" placeholder="add items (1 per line)"></textarea>
	<button>Add</button>
</form>

<h2>Voting</h2>
<a href={`${data.list.id}/vote`}>Tinder</a>

<h2>Share</h2>
<form method="POST" action="?/shareList" use:enhance>
	<input type="email" name="email" placeholder="email" />
	<button>Share</button>
</form>

<h2>Members</h2>
<ul>
	<li>{data.list.owner.email} (owner)</li>
	{#each data.members as member}
		<li>{member.email}</li>
	{/each}
</ul>

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
