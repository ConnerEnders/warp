<script lang="ts">
	import { T } from '@threlte/core';
	import { DEG2RAD } from 'three/src/math/MathUtils';

	export let color = 'white';
	export let size: [number, number, number] = [1, 1, 1];
	export let thickness = 0.01;

	const [x, y, z] = size;
	const corners = [
		{
			position: [x / 2 - thickness / 2, 0, z / 2 - thickness / 2],
			scale: [thickness, y, thickness]
		},
		{
			position: [x / 2 - thickness / 2, 0, -z / 2 + thickness / 2],
			scale: [thickness, y, thickness]
		},
		{
			position: [-x / 2 + thickness / 2, 0, z / 2 - thickness / 2],
			scale: [thickness, y, thickness]
		},
		{
			position: [-x / 2 + thickness / 2, 0, -z / 2 + thickness / 2],
			scale: [thickness, y, thickness]
		},

		{
			position: [0, y / 2 - thickness / 2, z / 2 - thickness / 2],
			scale: [x, thickness, thickness]
		},
		{
			position: [0, y / 2 - thickness / 2, -z / 2 + thickness / 2],
			scale: [x, thickness, thickness]
		},
		{
			position: [0, -y / 2 + thickness / 2, z / 2 - thickness / 2],
			scale: [x, thickness, thickness]
		},
		{
			position: [0, -y / 2 + thickness / 2, -z / 2 + thickness / 2],
			scale: [x, thickness, thickness]
		},

		{
			position: [x / 2 - thickness / 2, y / 2 - thickness / 2, 0],
			scale: [thickness, thickness, z]
		},
		{
			position: [x / 2 - thickness / 2, -y / 2 + thickness / 2, 0],
			scale: [thickness, thickness, z]
		},
		{
			position: [-x / 2 + thickness / 2, y / 2 - thickness / 2, 0],
			scale: [thickness, thickness, z]
		},
		{
			position: [-x / 2 + thickness / 2, -y / 2 + thickness / 2, 0],
			scale: [thickness, thickness, z]
		}
	];
</script>

<T.Group {...$$restProps}>
	{#each corners as { position, scale }}
		<T.Mesh {position} {scale}>
			<T.BoxGeometry />
			<T.MeshBasicMaterial {color} />
		</T.Mesh>
	{/each}
</T.Group>
