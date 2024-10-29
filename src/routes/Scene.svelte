<script lang="ts">
	import { T, useFrame, useThrelte } from '@threlte/core';
	import { Environment, OrbitControls, Sky } from '@threlte/extras';
	import Factory from './Factory.svelte';
	import PostProcesser from './PostProcesser.svelte';
	import { DEG2RAD } from 'three/src/math/MathUtils';
	import { Vector3 } from 'three';

	const { camera } = useThrelte();

	useFrame((_, delta) => {});
</script>

<!-- <Float speed={5} rotationSpeed={[4, 5, 6]}> -->

<!-- <CustomRenderer mesh={groundMesh} /> -->

<!-- {#if true}
	<T.OrthographicCamera makeDefault position={[100, 75, 100]} near={1} far={1000} zoom={100}>
		<OrbitControls />
	</T.OrthographicCamera>
{:else}
	<T.PerspectiveCamera makeDefault fov={90} position={[0, 5, 10]}>
		<OrbitControls />
	</T.PerspectiveCamera>
{/if} -->

<!-- <T.SpotLight position={[0, 10, 0]} intensity={20} castShadow /> -->
<!-- <T.SpotLight position={[0, 9, 0]} intensity={15} castShadow /> -->
<!-- <T.SpotLight position={[0, 20, 0]} intensity={10} angle={Math.PI / 5} decay={1} castShadow /> -->

<!-- <T.SpotLight position={[0, 10, 0]} intensity={3} decay={0.01} penumbra={1} color="#ffeecc" /> -->
<T.Group position={[-10, 0, 0]} let:ref>
	<T.SpotLight
		position={[0, 10, 0]}
		intensity={2}
		decay={0.01}
		penumbra={1}
		color="#ffeecc"
		castShadow
		target={ref}
		on:create={({ ref }) => {
			ref.shadow.mapSize.set(4096, 4096);
		}}
	/>
</T.Group>
<!-- <T.Object></T.Object> -->

<T.Group position={[10, 0, 0]} let:ref>
	<T.SpotLight
		position={[0, 10, 0]}
		intensity={2}
		decay={0.01}
		penumbra={1}
		color="#ffeecc"
		castShadow
		target={ref}
		on:create={({ ref }) => {
			ref.shadow.mapSize.set(4096, 4096);
		}}
	/>
</T.Group>

<!-- <T.PointLight position={[15, 2, -15]} decay={0.75} intensity={2} color="magenta" />
<T.PointLight position={[15, 2, 15]} decay={0.75} intensity={2} color="orange" />
<T.PointLight position={[-15, 2, 15]} decay={0.75} intensity={2} color="green" />
<T.PointLight position={[-15, 2, -15]} decay={0.75} intensity={2} color="orange" /> -->

<!-- <T.DirectionalLight position={[1, 10, 1]} castShadow /> -->

<!-- <Sky setEnvironment={false} /> -->

<Environment files={'environment.png'} />
<!-- <Environment files={'red.png'}  /> -->

<!-- <T.AmbientLight intensity={1} color="#ddddee" /> -->
<!-- <T.AmbientLight intensity={1} color="#444455" /> -->

<Factory />

<!-- <T.Mesh castShadow position={[0, 2, 0]}>
	<T.SphereGeometry />
	<T.MeshStandardMaterial color="red" />
</T.Mesh> -->

<!-- </Float> -->
<!-- <T.DirectionalLight position={[-2, 2, -5]} bind:ref={lightSource}/> -->
<!-- <Sky elevation={2} /> -->

<!-- <T.Mesh bind:ref={lightSource} position={sunPosition} scale={1000}>
	<T.SphereGeometry />
</T.Mesh> -->

<!-- <City /> -->

<!-- <Portal position={[0, 2, -5]} color="orange" />
<Portal position={[0, 2, 5]} color="blue" /> -->

<!-- <Ship position.y={5} bind:meshes={shipMeshes} bind:ref={ship} /> -->
<!-- <CustomRenderer mesh={} /> -->
<!-- <Ground bind:mesh={groundMesh} /> -->

<PostProcesser />
