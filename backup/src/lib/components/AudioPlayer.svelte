<script lang="ts">
	import { onMount } from 'svelte';

	/** @type {string} */
	export let src;

	let audio;
	let duration = 0;
	let currentTime = 0;

	// Handle space bar for play/pause
	function handleKeydown(event) {
		if (event.code === 'Space' && event.target.tagName !== 'BUTTON') {
			event.preventDefault();
			audio.paused ? audio.play() : audio.pause();
		}
	}

	onMount(() => {
		document.addEventListener('keydown', handleKeydown);
		return () => document.removeEventListener('keydown', handleKeydown);
	});

	// Format time in mm:ss
	function formatTime(seconds) {
		return new Date(seconds * 1000).toISOString().slice(14, 19);
	}
</script>

/// file: src/lib/components/AudioPlayer.svelte
<div class="rounded-lg border bg-white p-4 shadow-sm">
	<audio
		bind:this={audio}
		{src}
		bind:duration
		bind:currentTime
		on:timeupdate
		class="w-full"
		controls
	/>
	<div class="mt-2 flex justify-between text-sm text-gray-600">
		<span>{formatTime(currentTime)}</span>
		<span>{formatTime(duration)}</span>
	</div>
</div>
