<script>
	export let label;
	export let details;
	export let url;
</script>

<div class="card">
	<h1>{label}</h1>
	<p>{details}</p>
	<a href={url}>{url}</a>
</div>

<style>
	.card {
		width: clamp(200px, 30vw, 500px);
		aspect-ratio: 4/3;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 2rem;
	}
</style>
