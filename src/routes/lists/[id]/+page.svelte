<script>
	let { data } = $props();
</script>

<h2>Items in list {data.list.name}</h2>

{#each data.items as item}
	<p>{item.name}</p>
{/each}

<a href={`${data.list.id}/vote`}>Go to voting</a>
