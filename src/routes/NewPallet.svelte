<script>
	import { T } from '@threlte/core';
	import { AutoColliders } from '@threlte/rapier';
	import { BoxGeometry, MeshStandardMaterial } from 'three';

	const material = new MeshStandardMaterial({ color: 0xeecc88 });
	const geometry = new BoxGeometry();

	const width = 0.125;
	// const width = 0.15;
	const plank = 0.025;
	// const plank = 0.05;
	const corner = 0.5 - width / 2;
	const blockScale = [width, width, width];
	const top = width - plank / 2;
	const bottom = plank / 2;
	const short = [1, plank, width];
	const long = [width, plank, 1];

	const surfacePlankCount = 6;
	const surfaceOffsets = new Array(surfacePlankCount).fill([]).map((_, i) => {
		const offset = i / (surfacePlankCount - 1) - 0.5;
		return offset - width * offset;
	});
</script>

<T.Group {...$$restProps}>
	<AutoColliders shape="cuboid">
		<!-- Testing Cube -->
		<!-- <T.Mesh {geometry} position={[0, 0.5, 0]}>
		<T.MeshStandardMaterial transparent opacity={0.5} color="red" />
	</T.Mesh> -->

		<T.Group position={[0, width / 2, 0]}>
			<T.Mesh castShadow position={[corner, 0, corner]} scale={blockScale} {material} {geometry} />
			<T.Mesh castShadow position={[corner, 0, -corner]} scale={blockScale} {material} {geometry} />
			<T.Mesh castShadow position={[-corner, 0, corner]} scale={blockScale} {material} {geometry} />
			<T.Mesh
				castShadow
				position={[-corner, 0, -corner]}
				scale={blockScale}
				{material}
				{geometry}
			/>
			<T.Mesh castShadow position={[0, 0, corner]} scale={blockScale} {material} {geometry} />
			<T.Mesh castShadow position={[0, 0, -corner]} scale={blockScale} {material} {geometry} />
		</T.Group>

		<T.Mesh castShadow position={[0, bottom, -corner]} scale={short} {material} {geometry} />
		<T.Mesh castShadow position={[0, bottom, corner]} scale={short} {material} {geometry} />
		<T.Mesh castShadow position={[0, top, -corner]} scale={short} {material} {geometry} />
		<T.Mesh castShadow position={[0, top, corner]} scale={short} {material} {geometry} />

		{#each surfaceOffsets as offset}
			<T.Mesh castShadow position={[offset, width, 0]} scale={long} {material} {geometry} />
		{/each}
	</AutoColliders>
</T.Group>
