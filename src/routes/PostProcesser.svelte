<script lang="ts">
	import { useRender, useThrelte } from '@threlte/core';
	import {
		BlendFunction,
		EffectComposer,
		EffectPass,
		FXAAEffect,
		OutlineEffect,
		RenderPass,
		SMAAEffect,
		SMAAPreset,
		NoiseEffect,
		PixelationEffect
	} from 'postprocessing';
	import type { Camera, Object3D } from 'three';

	const { scene, renderer, camera, size } = useThrelte();

	// To use the EffectComposer we need to pass arguments to the
	// default WebGLRenderer: https://github.com/pmndrs/postprocessing#usage
	const composer = new EffectComposer(renderer);
	function setupEffectComposer(camera: Camera) {
		composer.removeAllPasses();
		composer.addPass(new RenderPass(scene, camera));
		// composer.addPass(
		// 	new EffectPass(
		// 		camera,
		// 		new BloomEffect({
		// 			intensity: 1,
		// 			luminanceThreshold: 0.15,
		// 			height: 512,
		// 			width: 512,
		// 			luminanceSmoothing: 0.08,
		// 			mipmapBlur: true,
		// 			kernelSize: KernelSize.MEDIUM
		// 		})
		// 	)
		// );

		// outlines.forEach((outline) => {
		// 	const outlineEffect = new OutlineEffect(scene, camera, {
		// 		blendFunction: BlendFunction.ALPHA,
		// 		edgeStrength: 100,
		// 		visibleEdgeColor: 0x000000,
		// 		xRay: false
		// 	});
		// 	outline.forEach((object) => {
		// 		if (!object) return;
		// 		outlineEffect.selection.add(object);
		// 	});
		// 	composer.addPass(new EffectPass(camera, outlineEffect));
		// });

		composer.addPass(
			new EffectPass(
				camera,
				new SMAAEffect({
					preset: SMAAPreset.ULTRA
				})
			)
		);

		// composer.addPass(
		// 	new EffectPass(
		// 		camera,
		// 		new NoiseEffect({
		// 			premultiply: true
		// 			// blendFunction: BlendFunction.
		// 		})
		// 	)
		// );

		// composer.addPass(new EffectPass(camera, new PixelationEffect(0.1)));
		// composer.addPass(new EffectPass(camera, new FXAAEffect()));
	}
	// We need to set up the passes according to the camera in use
	$: setupEffectComposer($camera);
	$: composer.setSize($size.width, $size.height);
	useRender((_, delta) => {
		composer.render(delta);
	});
</script>
