<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Scene from './Scene.svelte';
	import '../app.css';
	import { World } from '@threlte/rapier';
</script>

<main>
	<Canvas>
		<World>
			<Scene />
		</World>
	</Canvas>
</main>
