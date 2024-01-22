<script>
	export let data;
</script>

<h1>Lists</h1>

<nav>
	<ul>
		{#each data.list as list}
			<li>
				<a href={`/lists/${list.id}`}>{list.name}</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	ul {
		list-style: none;
		padding: 0;
	}

	li {
		margin: 1rem;
	}
</style>
