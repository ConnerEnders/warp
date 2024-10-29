<script lang="ts">
	import { T } from '@threlte/core';
	import { AutoColliders, Debug } from '@threlte/rapier';
	import { Mesh, PlaneGeometry } from 'three';
	import { DEG2RAD } from 'three/src/math/MathUtils';
	import { createNoise2D } from 'simplex-noise';
	import Material from './Material.svelte';
	import alea from 'alea';

	export let mesh: Mesh;
	let scale = [10, 10, 2];

	const geometry = new PlaneGeometry(10, 10, 100, 100);
	const prng = alea('testseed');
	const noise = createNoise2D(prng);
	const vertices = geometry.getAttribute('position').array;
	for (let i = 0; i < vertices.length; i += 3) {
		const x = vertices[i];
		const y = vertices[i + 1];
		vertices[i + 2] = noise(x / 4, y / 4);
	}
	geometry.computeVertexNormals();
</script>

<!-- <Debug /> -->

<AutoColliders shape="trimesh">
	<T.Mesh receiveShadow bind:ref={mesh} {geometry} rotation.x={DEG2RAD * -90} {scale}>
		<!-- <Material path="ground" repeat={10} /> -->
		<T.MeshStandardMaterial color="#ffcc99" />
		<!-- <T.MeshToonMaterial color="#ffcc99" /> -->
		<!-- <T.MeshStandardMaterial color="#ffcc99" /> -->
		<!-- <T.MeshStandardMaterial /> -->
	</T.Mesh>
</AutoColliders>
