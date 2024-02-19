<script>
	import Card from './Card.svelte';
	import { fade } from 'svelte/transition';
	import { enhance } from '$app/forms';

	let { data } = $props();

	let items = $derived(data.items);
	let votes = $derived(data.votes);

	let remaining = $derived(
		items.filter(
			(item) => !votes.some((vote) => vote.user.id === data.user.id && vote.item.id === item.id)
		)
	);
	let current = $derived(remaining[0]);
</script>

<a href={`/lists/${data.list.id}`}>Back to list <i>{data.list.name}</i></a>

{#if remaining.length}
	<div transition:fade={{ duration: 200 }}>
		<Card id={current.id} name={current.name} />
	</div>
{:else}
	All done!
{/if}

<h2>Votes</h2>

{#each votes as { id, user, item, result }}
	<div transition:fade={{ duration: 200 }}>
		{user.email} voted {result ? 'Yes' : 'No'} for {item.name}
		{#if user.id === data.user.id}
			<form method="POST" action="?/removeVote" use:enhance>
				<input type="hidden" name="voteId" value={id} />
				<button>DELETE</button>
			</form>
		{/if}
	</div>
{/each}

<form method="POST" action="?/removeAllOwnVotes" use:enhance>
	<button type="button" onclick={() => dialog.showModal()}>Delete all my votes!</button>
	<dialog id="dialog">
		Are you sure?
		<button type="submit" onclick={() => dialog.close()}>Purge me brother!</button>
		<button type="button" onclick={() => dialog.close()}>Nah</button>
	</dialog>
</form>

<style>
	form {
		display: inline;
	}
</style>
