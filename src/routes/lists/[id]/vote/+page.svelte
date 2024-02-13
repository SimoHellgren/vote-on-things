<script>
	import Card from './Card.svelte';
	import { fade } from 'svelte/transition';

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

{#each votes as { user, item, result }}
	<p transition:fade={{ duration: 200 }}>
		{user.email} voted {result ? 'Yes' : 'No'} for {item.name}
	</p>
{/each}
