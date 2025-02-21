<script lang="ts">
	// Props with TypeScript types for better development experience
	export let src: string;
	export let title: string;

	// Reactive declarations for audio state management
	let audio: HTMLAudioElement;
	let currentTime = 0;
	let duration = 0;
	let playing = false;
	let playbackRate = 1;

	// Update current time as audio plays
	function handleTimeUpdate() {
		currentTime = audio?.currentTime || 0;
	}

	// Format time in MM:SS
	function formatTime(seconds: number): string {
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	}
</script>

// AudioPlayer.svelte // A reusable audio player component with advanced controls
<div class="flex w-full flex-col gap-2">
	<div class="flex items-center justify-between">
		<span class="font-medium">{title}</span>
		<select
			bind:value={playbackRate}
			on:change={() => (audio.playbackRate = playbackRate)}
			class="text-sm"
		>
			{#each [0.5, 0.75, 1, 1.25, 1.5, 2] as rate}
				<option value={rate}>{rate}x</option>
			{/each}
		</select>
	</div>

	<!-- Bind the audio element to our variable for control -->
	<audio
		bind:this={audio}
		{src}
		on:timeupdate={handleTimeUpdate}
		bind:duration
		bind:paused={!playing}
	/>

	<!-- Progress bar and controls -->
	<div class="flex items-center gap-2">
		<button on:click={() => (playing = !playing)} class="flex h-8 w-8 items-center justify-center">
			{#if playing}
				⏸️
			{:else}
				▶️
			{/if}
		</button>

		<input type="range" bind:value={currentTime} max={duration} class="flex-1" />

		<span class="text-sm">
			{formatTime(currentTime)} / {formatTime(duration)}
		</span>
	</div>
</div>
