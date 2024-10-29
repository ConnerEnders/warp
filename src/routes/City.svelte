<script lang="ts">
	import {
		LargeBuildingA,
		LargeBuildingB,
		LargeBuildingC,
		LargeBuildingD,
		LargeBuildingE,
		LargeBuildingF,
		LargeBuildingG,
		LowBuildingA,
		LowBuildingB,
		LowBuildingC,
		LowBuildingD,
		LowBuildingE,
		LowBuildingF,
		LowBuildingG,
		LowBuildingH,
		LowBuildingI,
		LowBuildingJ,
		LowBuildingK,
		LowBuildingL,
		LowBuildingM,
		LowBuildingN,
		RoadCrossroadPath,
		RoadStraight,
		SkyscraperA,
		SkyscraperB,
		SkyscraperC,
		SkyscraperD,
		SkyscraperE,
		SkyscraperF,
		SmallBuildingA,
		SmallBuildingB,
		SmallBuildingC,
		SmallBuildingD,
		SmallBuildingE,
		SmallBuildingF
	} from '$lib';
	import { T } from '@threlte/core';
	import alea from 'alea';
	import { Mesh, PlaneGeometry } from 'three';
	import { DEG2RAD } from 'three/src/math/MathUtils';

	export let width = 25;

	const buildings = [
		// LargeBuildingA,
		// LargeBuildingB,
		// LargeBuildingC,
		// LargeBuildingD,
		// LargeBuildingE,
		// LargeBuildingF,
		// LargeBuildingG,
		// LowBuildingA,
		// LowBuildingB,
		// LowBuildingC,
		// LowBuildingD,
		// LowBuildingE,
		// LowBuildingF,
		// LowBuildingG,
		// LowBuildingH,
		// LowBuildingI,
		// LowBuildingJ,
		// LowBuildingK,
		// LowBuildingL,
		// LowBuildingM,
		// LowBuildingN,
		SkyscraperA,
		SkyscraperB,
		SkyscraperC,
		SkyscraperD,
		SkyscraperE,
		SkyscraperF,
		SmallBuildingA,
		SmallBuildingB,
		SmallBuildingC,
		SmallBuildingD,
		SmallBuildingE,
		SmallBuildingF
	];

	// RoadCrossroadPath
	// RoadStraight

	const rng = alea('testseed');

	function randomInt(min: number, max: number) {
		return Math.floor(rng() * (max - min + 1)) + min;
	}

	const buildingRows = new Array(width)
		.fill([])
		.map(() => new Array(width).fill('').map(() => buildings[randomInt(0, buildings.length - 1)]));
</script>

{#each buildingRows as buildingRow, rowIndex}
	{#each buildingRow as building, i}
		<svelte:component this={building} position={[(i % width) * 2, 0, (rowIndex % width) * 2]} />
		<RoadStraight position={[(i % width) * 2, 0, (rowIndex % width) * 2 + 0.25]} />
		<RoadStraight
			position={[(i % width) * 2 + 0.25, 0, (rowIndex % width) * 2]}
			rotation.y={DEG2RAD * 90}
		/>
		<RoadCrossroadPath position={[(i % width) * 2 + 1, 0, (rowIndex % width) * 2 + 0.25]} />
	{/each}
{/each}

<T.Mesh
	receiveShadow
	rotation.x={DEG2RAD * -90}
	position={[width - 1, 0, width - 1]}
	scale={width * 2}
>
	<T.PlaneGeometry />
	<T.MeshStandardMaterial color="gray" />
</T.Mesh>
