<script lang="ts">
	import { useFrame, useThrelte } from '@threlte/core';
	import { SpatialControls } from 'spatial-controls';
	import type { Camera } from 'three';

	// export let camera: Camera;

	let { camera } = useThrelte();

	const controls = new SpatialControls($camera.position, $camera.quaternion, document.body);

	useFrame((_, delta) => {
		controls.update(delta);
	});
</script>
