<script>
	// The source of the audio file is passed as a prop
	export let src;
	export let title = ''; // Optional title for the audio
</script>

<div class="my-4">
	{#if title}
		<p class="mb-2 font-medium">{title}</p>
	{/if}
	<audio controls class="w-full" preload="metadata">
		<source {src} type="audio/mpeg" />
		Your browser does not support the audio element.
	</audio>
</div>
