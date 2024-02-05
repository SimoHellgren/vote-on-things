<script>
	import Card from './Card.svelte';
	let { data } = $props();

	let remaining = $state(data.items);

	const current = $derived(remaining[1]);

	let votes = $state(data.votes);

	function handleResult(event) {
		votes = [...votes, { item: current, vote: event.detail }];
		remaining = remaining.slice(1);
	}
</script>

<a href={`/lists/${data.list.id}`}>Back to list <i>{data.list.name}</i></a>

{#if remaining.length}
	<div>
		<Card id={current.id} name={current.name} on:result={handleResult} />
	</div>
{:else}
	All done!
{/if}

<h2>Votes</h2>

{#each votes as { item, vote }}
	<p>Voted {vote ? 'Yes' : 'No'} for {item.name}</p>
{/each}
