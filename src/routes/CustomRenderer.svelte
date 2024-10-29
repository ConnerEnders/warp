<script lang="ts">
	import { useThrelte, useRender } from '@threlte/core';
	import {
		EffectComposer,
		EffectPass,
		RenderPass,
		OutlineEffect,
		BlendFunction
	} from 'postprocessing';
	import type { Camera, Mesh } from 'three';
	export let mesh: Mesh;
	const { scene, renderer, camera, size } = useThrelte();
	const composer = new EffectComposer(renderer);

	const setupEffectComposer = (camera: Camera, mesh: Mesh) => {
		composer.removeAllPasses();
		composer.addPass(new RenderPass(scene, camera));
		const outlineEffect = new OutlineEffect(scene, camera, {
			blendFunction: BlendFunction.ALPHA,
			edgeStrength: 3,
			pulseSpeed: 0.0,
			visibleEdgeColor: 0x000000,
			xRay: false,
			blur: true
		});
		if (mesh !== undefined) {
			outlineEffect.selection.add(mesh);
		}
		composer.addPass(new EffectPass(camera, outlineEffect));
	};
	$: setupEffectComposer($camera, mesh);
	// $: {
	// 	meshes.forEach((mesh) => setupEffectComposer($camera, mesh));
	// }
	$: composer.setSize($size.width, $size.height);
	useRender((_, delta) => {
		composer.render(delta);
	});
</script>
