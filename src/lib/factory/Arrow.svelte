<!--
Auto-generated by: https://github.com/threlte/threlte/tree/main/packages/gltf
Command: npx @threlte/gltf@2.0.0 Arrow.glb --transform --shadows --root=factory/
-->

<script>
	import { Group } from 'three';
	import { T, forwardEventHandlers } from '@threlte/core';
	import { useGltf } from '@threlte/extras';

	export const ref = new Group();

	const gltf = useGltf('factory/Arrow-transformed.glb', { useDraco: true });

	const component = forwardEventHandlers();
</script>

<T is={ref} dispose={false} {...$$restProps} bind:this={$component}>
	{#await gltf}
		<slot name="fallback" />
	{:then gltf}
		<!-- receiveShadow -->
		<T.Mesh castShadow geometry={gltf.nodes.arrow.geometry} material={gltf.materials.striping} />
	{:catch error}
		<slot name="error" {error} />
	{/await}

	<slot {ref} />
</T>
