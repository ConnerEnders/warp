<script lang="ts">
	import { T, useFrame, useThrelte } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import { Vector3, type Object3D, Vector2, Quaternion } from 'three';

	export let target: Object3D;
	export let rotateSpeed = 1.0;

	const { camera } = useThrelte();

	export let idealOffset = { x: -5.5, y: -3, z: -3 };
	export let idealLookAt = { x: 0, y: 1, z: 5 };

	const currentPosition = new Vector3();
	const currentLookAt = new Vector3();

	let isOrbiting = false;
	let pointerDown = false;

	const rotateStart = new Vector2();
	const rotateEnd = new Vector2();
	const rotateDelta = new Vector2();

	const axis = new Vector3(0, 1, 0);
	const rotationQuat = new Quaternion();

	function vectorFromObject(vec: { x: number; y: number; z: number }) {
		const { x, y, z } = vec;
		const ideal = new Vector3(x, y, z);
		ideal.applyQuaternion(target.quaternion);
		ideal.add(new Vector3(target.position.x, target.position.y, target.position.z));
		return ideal;
	}

	useFrame((_, delta) => {
		// camera is based on character so we rotation character first
		rotationQuat.setFromAxisAngle(axis, -rotateDelta.x * rotateSpeed * delta);
		target.quaternion.multiply(rotationQuat);

		// then we calculate our ideal's
		const offset = vectorFromObject(idealOffset);
		const lookAt = vectorFromObject(idealLookAt);

		// and how far we should move towards them
		const t = 1.0 - Math.pow(0.001, delta);
		currentPosition.lerp(offset, t);
		currentLookAt.lerp(lookAt, t);

		// then finally set the camera
		$camera.position.copy(currentPosition);
		$camera.lookAt(currentLookAt);
	});

	function onKeyDown(event: KeyboardEvent) {
		switch (event.key) {
			case 'a':
				rotateDelta.x = -2 * rotateSpeed;
				break;
			case 'd':
				rotateDelta.x = 2 * rotateSpeed;
				break;
			default:
				break;
		}
	}

	function onKeyUp(event: KeyboardEvent) {
		switch (event.key) {
			case 'a':
				rotateDelta.x = 0;
				break;
			case 'd':
				rotateDelta.x = 0;
				break;
			default:
				break;
		}
	}
</script>

<T.PerspectiveCamera makeDefault fov={120} />

<svelte:window on:keydown={onKeyDown} on:keyup={onKeyUp} />
