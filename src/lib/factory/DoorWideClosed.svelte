<!--
Auto-generated by: https://github.com/threlte/threlte/tree/main/packages/gltf
Command: npx @threlte/gltf@2.0.0 DoorWideClosed.glb --transform --shadows --root=factory/
-->

<script>
	import { Group } from 'three';
	import { T, forwardEventHandlers } from '@threlte/core';
	import { useGltf } from '@threlte/extras';

	export const ref = new Group();

	const gltf = useGltf('factory/DoorWideClosed-transformed.glb', { useDraco: true });

	const component = forwardEventHandlers();
</script>

<T is={ref} dispose={false} {...$$restProps} bind:this={$component}>
	{#await gltf}
		<slot name="fallback" />
	{:then gltf}
		<!-- receiveShadow   -->
		<T.Mesh
			castShadow
			geometry={gltf.nodes['Mesh_door-wide-closed'].geometry}
			material={gltf.materials.striping}
		/>
		<!-- receiveShadow -->
		<T.Mesh
			castShadow
			geometry={gltf.nodes['Mesh_door-wide-closed_1'].geometry}
			material={gltf.materials['striping-dark']}
		/>
		<!-- receiveShadow -->
		<T.Mesh
			castShadow
			geometry={gltf.nodes['Mesh_door-wide-closed_2'].geometry}
			material={gltf.materials.grey}
		/>
	{:catch error}
		<slot name="error" {error} />
	{/await}

	<slot {ref} />
</T>
