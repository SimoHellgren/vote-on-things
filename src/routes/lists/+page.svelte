<script>
	export let data;
</script>

<h1>Lists</h1>
{#each data.list as list}
	<a href={`/lists/${list.id}`}>{list.name}</a>
{/each}
