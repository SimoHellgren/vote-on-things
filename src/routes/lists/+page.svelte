<script>
	import { enhance } from '$app/forms';
	import { fade } from 'svelte/transition';
	export let data;
</script>

<h1>Lists</h1>

<form method="POST" use:enhance>
	<input name="listname" type="text" placeholder="new list" />
	<button>Create!</button>
</form>

<nav>
	<ul>
		{#each data.list as list}
			<li>
				<a href={`/lists/${list.id}`} transition:fade={{ duration: 200 }}>{list.name}</a>
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
