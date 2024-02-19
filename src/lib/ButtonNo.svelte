<script>
	let { height = 50, width = 50, ...props } = $props();
</script>

<button {...props}>
	<svg viewBox="0 0 100 100" {height} {width}>
		<g transform="rotate(45)" transform-origin="center">
			<rect width="90" height="10" x="5" y="45" rx="6" fill="red" />
			<rect width="10" height="90" x="45" y="5" rx="6" fill="red" />
		</g>
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
