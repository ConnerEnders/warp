<script lang="ts">
	import {
		BoxLarge,
		BoxLong,
		BoxSmall,
		BoxWide,
		DoorWideClosed,
		Forklift,
		StructureDoorwayWide,
		StructureTall,
		StructureWall
	} from '$lib';

	import StructureYellowTall from '$lib/factory/StructureYellowTall.svelte';
	import { T, useFrame, useLoader } from '@threlte/core';
	import { AutoColliders, CollisionGroups, Debug, RigidBody } from '@threlte/rapier';
	import { DEG2RAD, degToRad, lerp } from 'three/src/math/MathUtils';
	import Conveyor from './Conveyor.svelte';
	import { Edges, OrbitControls } from '@threlte/extras';
	import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat';
	import {
		EdgesGeometry,
		Group,
		MeshStandardMaterial,
		RepeatWrapping,
		TextureLoader,
		Vector2,
		Vector3
	} from 'three';
	import { derived } from 'svelte/store';
	import Pallet from './Pallet.svelte';
	import Outline from './Outline.svelte';
	import { wasd } from '$lib/input';
	import { tweened } from 'svelte/motion';
	import NewPallet from './NewPallet.svelte';

	let lift: RapierRigidBody;

	const plateTexture = useLoader(TextureLoader).load('diamondplate.png');
	const plateNormal = useLoader(TextureLoader).load('diamondplatenormal.png');

	const shelfColor = new MeshStandardMaterial({ color: 'orange' });
	$: shelfMaterial = [
		shelfColor,
		shelfColor,
		shelfColor,
		shelfColor,
		new MeshStandardMaterial({
			map: $plateTexture,
			normalMap: $plateNormal,
			color: 'orange'
		}),
		shelfColor
	];

	const aspect = window.innerWidth / window.innerHeight;
	const frustumSize = 10;

	let cameraPosition = [0, 5, -5];

	useFrame((_, delta) => {
		// return;
		if (!lift) return;

		const x = lift.translation().x;
		const threshold = 2;

		// const inThreshold = x > cameraPosition[0] - threshold && x < cameraPosition[0] + threshold;

		cameraPosition[0] = lerp(cameraPosition[0], lift.translation().x, delta * 2);
		cameraPosition[1] = lerp(cameraPosition[1], lift.translation().y + 5, delta * 2);
		cameraPosition[2] = lerp(cameraPosition[2], lift.translation().z - 5, delta * 2);
	});
</script>

<Debug />

<!-- Floor -->
<AutoColliders shape="cuboid">
	<T.Mesh receiveShadow rotation.x={DEG2RAD * -90} scale={50} position.y={-0.1}>
		<T.PlaneGeometry />
		<T.MeshStandardMaterial color="white" />
	</T.Mesh>
</AutoColliders>

<!-- Walls -->
<AutoColliders shape="cuboid">
	<T.Mesh receiveShadow rotation.x={DEG2RAD * 180} scale={[50, 20, 1]} position.z={5}>
		<T.PlaneGeometry />
		<T.MeshStandardMaterial color="white" />
	</T.Mesh>
</AutoColliders>

<!-- <StructureWall position={[-1, 0, -5]} />
<StructureWall position={[-2, 0, -5]} />
<StructureWall position={[-3, 0, -5]} />
<StructureWall position={[-4, 0, -5]} />
<StructureWall position={[-5, 0, -5]} />

<StructureDoorwayWide position={[0.5, 0, -5]} />
<DoorWideClosed position={[0.5, 0, -5]} />

<StructureWall position={[2, 0, -5]} />
<StructureWall position={[3, 0, -5]} />
<StructureWall position={[4, 0, -5]} />
<StructureWall position={[5, 0, -5]} />
<StructureWall position={[6, 0, -5]} /> -->

<Outline position={[-1, 0, -1]} color="#00cccc" thickness={0.05} size={[0.75, 1, 1.25]} />

<!-- <RigidBody angularDamping={10} linearDamping={10}>
	<BoxLarge position={[1, 0, 1]} />
</RigidBody>
<RigidBody angularDamping={10} linearDamping={10}>aa
	<BoxSmall position={[-1, 0, 1]} />
</RigidBody>
<RigidBody angularDamping={10} linearDamping={10}>
	<BoxLong position={[1, 0, -1]} />
</RigidBody>
<RigidBody angularDamping={10} linearDamping={10}>
	<BoxWide position={[-1, 0, -1]} />
</RigidBody> -->

<Forklift bind:rigidBody={lift}>
	<!-- 0.5 * frustumSize * aspect / - 2, 0.5 * frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 0.01, 10  -->
	<!-- left={(0.5 * frustumSize * aspect) / -2}
	right={(0.5 * frustumSize * aspect) / 2}
	top={frustumSize / 2}
	bottom={frustumSize / -2}
	near={0.01}
	far={10} -->
</Forklift>

<T.OrthographicCamera
	makeDefault
	zoom={150}
	position={cameraPosition}
	on:create={({ ref }) => ref.lookAt(new Vector3(0, 0, 0))}
>
	<OrbitControls />
</T.OrthographicCamera>

<!-- <T.Mesh
	receiveShadow
	castShadow
	rotation.x={DEG2RAD * -90}
	scale={[2, 1, 0.1]}
	position={[3, 0.6, 2]}
	material={shelfMaterial}
>
	<T.BoxGeometry />
</T.Mesh> -->

<Outline position={[-3.4, 1.5, -0.4]} color="cyan" thickness={0.05} size={[1, 1, 2]} />

<T.Group scale={0.8} position={[-5, -0.1, 2]} rotation={[0, DEG2RAD * 90, 0]}>
	<StructureYellowTall position={[2, 0, 2]} />
	<CollisionGroups memberships={[1]} filter={[2]}>
		<AutoColliders shape="cuboid">
			<T.Mesh
				receiveShadow
				castShadow
				rotation.x={DEG2RAD * -90}
				scale={[2, 1, 0.1]}
				position={[3, 0.6, 2]}
				material={shelfMaterial}
			>
				<T.BoxGeometry />
				<!-- <T.MeshStandardMaterial map={$plate} /> -->
			</T.Mesh>
			<T.Mesh
				receiveShadow
				castShadow
				rotation.x={DEG2RAD * -90}
				scale={[2, 1, 0.1]}
				position={[3, 1.5, 2]}
				material={shelfMaterial}
			>
				<T.BoxGeometry />
				<!-- <T.MeshStandardMaterial color="#777788" /> -->
				<!-- <T.MeshStandardMaterial color="#ff00aa" /> -->
			</T.Mesh>
		</AutoColliders>
	</CollisionGroups>
	<StructureYellowTall position={[4, 0, 2]} />
</T.Group>

<StructureTall position={[-4, -0.1, 4]} />
<StructureTall position={[-2, -0.1, 4]} />

<Conveyor position={[4, 0.5, 4]} />
<Conveyor position={[5, 0.5, 4]} />
<Conveyor position={[6, 0.5, 4]} />
<Conveyor position={[7, 0.5, 4]} />
<Conveyor position={[8, 0.5, 4]} />

<!-- Unsure if ccd does anything here, need further testing -->
<!-- Loop over the objective pallets here with increasingly hard to move packages -->
<!-- <RigidBody ccd>
	<T.Group position={[5, 0, 0]}>
		<Pallet />
		<BoxWide />
	</T.Group>
</RigidBody>

<RigidBody ccd>
	<Pallet position={[6, 0, 0]} />
</RigidBody> -->

<RigidBody>
	<NewPallet rotation={[0, degToRad(90), 0]} scale={0.8} position={[4, 0.1, 0]} />
	<NewPallet rotation={[0, degToRad(90), 0]} scale={0.8} position={[4, 0.2, 0]} />
	<NewPallet rotation={[0, degToRad(90), 0]} scale={0.8} position={[4, 0.3, 0]} />
	<NewPallet rotation={[0, degToRad(90), 0]} scale={0.8} position={[4, 0.4, 0]} />
	<NewPallet rotation={[0, degToRad(90), 0]} scale={0.8} position={[4, 0.5, 0]} />
	<NewPallet rotation={[0, degToRad(90), 0]} scale={0.8} position={[4, 0.6, 0]} />
	<NewPallet rotation={[0, degToRad(90), 0]} scale={0.8} position={[4, 0.7, 0]} />
</RigidBody>

<!-- <RigidBody>
	<NewPallet rotation={[0, degToRad(90), 0]} scale={0.8} position={[4, 0.25, 0]} />
</RigidBody>

<RigidBody>
	<NewPallet rotation={[0, degToRad(90), 0]} scale={0.8} position={[4, 0.5, 0]} />
</RigidBody>

<RigidBody>
	<NewPallet rotation={[0, degToRad(90), 0]} scale={0.8} position={[4, 0.75, 0]} />
</RigidBody>

<RigidBody>
	<NewPallet rotation={[0, degToRad(90), 0]} scale={0.8} position={[4, 1, 0]} />
</RigidBody>

<RigidBody>
	<NewPallet rotation={[0, degToRad(90), 0]} scale={0.8} position={[4, 1.25, 0]} />
</RigidBody>

<RigidBody>
	<NewPallet rotation={[0, degToRad(90), 0]} scale={0.8} position={[4, 1.5, 0]} />
</RigidBody>

<RigidBody>
	<NewPallet rotation={[0, degToRad(90), 0]} scale={0.8} position={[4, 1.75, 0]} />
</RigidBody> -->
