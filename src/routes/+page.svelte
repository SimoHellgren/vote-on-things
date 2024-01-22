<script>
	import Card from '../Card.svelte';
	let remaining = $state(['Tami', 'Timo', 'Simo', 'Tomi', 'Sami', 'Somo', 'Timi']);

	const current = $derived(remaining[0]);

	let voted = $state([]);

	function handleResult(event) {
		voted = [...voted, { name: current, vote: event.detail }];
		remaining = remaining.slice(1);
	}
</script>

{#if remaining.length}
	<div>
		<Card name={current} on:result={handleResult} />
	</div>
{:else}
	All done!
{/if}

<h2>Voted</h2>

{#each voted as { name, vote }}
	<p>Voted {vote ? 'Yes' : 'No'} for {name}</p>
{/each}
