<script>
	import { T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
</script>

<T.PerspectiveCamera makeDefault position={[2, 2, 2]}>
	<OrbitControls />
</T.PerspectiveCamera>
<T.DirectionalLight />
<T.Mesh>
	<T.BoxGeometry />
	<T.MeshNormalMaterial />
</T.Mesh>
