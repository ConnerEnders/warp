<script lang="ts">
	import { T, useRender, useThrelte } from '@threlte/core';
	import { TransformControls } from '@threlte/extras';
	import { onMount } from 'svelte';
	import { Vector3, type PerspectiveCamera, Texture, WebGLRenderTarget, Mesh } from 'three';
	import { frameCorners } from 'three/examples/jsm/utils/CameraUtils';
	import Ground from './Ground.svelte';

	export let position: [number, number, number] = [1, 1, 1];
	export let scale = 2;
	export let color = 'black';

	let camera: PerspectiveCamera;
	let mesh: Mesh;
	let target = new WebGLRenderTarget(1000, 1000);

	let bottomLeft = new Vector3(position[0] + 0.5 * scale, position[1] + 0.5 * scale, position[2]);
	let bottomRight = new Vector3(position[0] - 0.5 * scale, position[1] + 0.5 * scale, position[2]);
	let topLeft = new Vector3(position[0] + 0.5 * scale, position[1] - 0.5 * scale, position[2]);

	const { renderer, scene } = useThrelte();

	useRender(() => {
		frameCorners(camera, bottomLeft, bottomRight, topLeft, false);
		target.texture.colorSpace = renderer.outputColorSpace;
		renderer.setRenderTarget(target);
		renderer.state.buffers.depth.setMask(true); // make sure the depth buffer is writable so it can be properly cleared, see #18897
		if (renderer.autoClear === false) renderer.clear();
		mesh.visible = false; // hide this portal from its own rendering
		renderer.render(scene, camera);
		mesh.visible = true; // re-enable this portal's visibility for general rendering
	});
</script>

<TransformControls {position}>
	<T.PerspectiveCamera
		bind:ref={camera}
		on:create={({ ref }) => {
			ref.lookAt(5, 5, 5);
		}}
	/>
	<T.Mesh {scale} bind:ref={mesh}>
		<T.PlaneGeometry />
		<T.MeshBasicMaterial map={target.texture} />
	</T.Mesh>
</TransformControls>

<T.Mesh position={[bottomLeft.x, bottomLeft.y, bottomLeft.z]} scale={0.25}>
	<T.SphereGeometry />
	<T.MeshBasicMaterial {color} />
</T.Mesh>
<T.Mesh position={[bottomRight.x, bottomRight.y, bottomRight.z]} scale={0.25}>
	<T.SphereGeometry />
	<T.MeshBasicMaterial {color} />
</T.Mesh>
<T.Mesh position={[topLeft.x, topLeft.y, topLeft.z]} scale={0.25}>
	<T.SphereGeometry />
	<T.MeshBasicMaterial {color} />
</T.Mesh>
