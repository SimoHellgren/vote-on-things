<script>
	import Card from '../../../Card.svelte';
	let { data } = $props();

	let remaining = $state(data.items);

	const current = $derived(remaining[0]);

	let voted = $state([]);

	function handleResult(event) {
		voted = [...voted, { item: current, vote: event.detail }];
		remaining = remaining.slice(1);
	}
</script>

{#if remaining.length}
	<div>
		<Card name={current.name} on:result={handleResult} />
	</div>
{:else}
	All done!
{/if}

<h2>Voted</h2>

{#each voted as { item, vote }}
	<p>Voted {vote ? 'Yes' : 'No'} for {item.name}</p>
{/each}
