<!--
Auto-generated by: https://github.com/threlte/threlte/tree/main/packages/gltf
Command: npx @threlte/gltf@2.0.0 SmallBuildingC.glb --transform --shadows
-->

<script>
	import { Group } from 'three';
	import { T, forwardEventHandlers } from '@threlte/core';
	import { useGltf } from '@threlte/extras';

	export const ref = new Group();

	const gltf = useGltf('buildings/SmallBuildingC-transformed.glb', { useDraco: true });

	const component = forwardEventHandlers();
</script>

<T is={ref} dispose={false} {...$$restProps} bind:this={$component}>
	{#await gltf}
		<slot name="fallback" />
	{:then gltf}
		<T.Mesh
			castShadow
			receiveShadow
			geometry={gltf.nodes.Mesh_small_buildingC.geometry}
			material={gltf.materials.border}
		/>
		<T.Mesh
			castShadow
			receiveShadow
			geometry={gltf.nodes.Mesh_small_buildingC_1.geometry}
			material={gltf.materials.window}
		/>
		<T.Mesh
			castShadow
			receiveShadow
			geometry={gltf.nodes.Mesh_small_buildingC_2.geometry}
			material={gltf.materials._defaultMat}
		/>
		<T.Mesh
			castShadow
			receiveShadow
			geometry={gltf.nodes.Mesh_small_buildingC_3.geometry}
			material={gltf.materials.door}
		/>
	{:catch error}
		<slot name="error" {error} />
	{/await}

	<slot {ref} />
</T>
