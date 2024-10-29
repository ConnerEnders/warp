<script lang="ts">
	import { T, useLoader } from '@threlte/core';
	import { derived } from 'svelte/store';
	import { MeshStandardMaterial, RepeatWrapping, Texture, TextureLoader, Vector2 } from 'three';

	export let path: string;
	export let repeat = 4;

	const textures = useLoader(TextureLoader).load({
		roughnessMap: path + '/roughness.jpg',
		displacementMap: path + '/displacement.jpg',
		aoMap: path + '/ambient-occlusion.jpg',
		map: path + '/color.jpg',
		normalMap: path + '/normal.jpg'
	});
	const scaled = derived(textures, (textures) => {
		if (!textures) return;
		Object.keys(textures).forEach((key) => {
			let texture = textures[key as keyof typeof textures];
			texture.wrapS = RepeatWrapping;
			texture.wrapT = RepeatWrapping;
			texture.repeat.set(repeat, repeat);
		});
		return textures;
	});
</script>

{#if $scaled}
	<T.MeshStandardMaterial
		{...$scaled}
		normalScale={1 / repeat}
		displacementScale={1 / repeat}
		{...$$restProps}
	/>
{/if}
