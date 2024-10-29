<script>
	import { ConveyorBarsSides } from '$lib';
	import { T } from '@threlte/core';
	import { Collider, RigidBody } from '@threlte/rapier';
	import { DEG2RAD } from 'three/src/math/MathUtils';
</script>

<ConveyorBarsSides {...$$restProps}>
	<T.Group position.y={0.25}>
		<Collider
			args={[0.49, 0.1, 0.45]}
			shape="cuboid"
			on:contact={(e) => {
				e.targetRigidBody?.setLinvel({ x: 0.5, y: 0, z: 0 }, true);
			}}
		/>
	</T.Group>
	<!-- <T.Group rotation.x={DEG2RAD * 90}>
		<T.Group position={[-0.4, 0, -0.25]}>
			<RigidBody angularVelocity={[0, 0, -50]} dominance={1} gravityScale={0}>
				<Collider shape="cylinder" args={[0.5, 0.05]} friction={1} />
			</RigidBody>
		</T.Group>
		<T.Group position={[-0.2, 0, -0.25]}>
			<RigidBody angularVelocity={[0, 0, -50]} dominance={1} gravityScale={0}>
				<Collider shape="cylinder" args={[0.5, 0.05]} friction={1} />
			</RigidBody>
		</T.Group>
		<T.Group position={[0, 0, -0.25]}>
			<RigidBody angularVelocity={[0, 0, -50]} dominance={1} gravityScale={0}>
				<Collider shape="cylinder" args={[0.5, 0.05]} friction={1} />
			</RigidBody>
		</T.Group>
		<T.Group position={[0.2, 0, -0.25]}>
			<RigidBody angularVelocity={[0, 0, -50]} dominance={1} gravityScale={0}>
				<Collider shape="cylinder" args={[0.5, 0.05]} friction={1} />
			</RigidBody>
		</T.Group>
		<T.Group position={[0.4, 0, -0.25]}>
			<RigidBody angularVelocity={[0, 0, -50]} dominance={1} gravityScale={0}>
				<Collider shape="cylinder" args={[0.5, 0.05]} friction={1} />
			</RigidBody>
		</T.Group>
	</T.Group> -->
</ConveyorBarsSides>
