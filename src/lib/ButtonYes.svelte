<script>
	let { height = 50, width = height, ...props } = $props();
</script>

<button {...props}>
	<svg viewBox="0 0 100 100" {height} {width}>
		<circle cx="50" cy="50" r="38" stroke="green" stroke-width="8" fill-opacity="0" />
	</svg>
</button>

<style>
	button {
		border: none;
		background: none;
		cursor: pointer;
	}

	svg:hover {
		box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.7);
	}
</style>
