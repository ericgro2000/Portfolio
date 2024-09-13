import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    Object_4: THREE.Mesh;
    Object_6: THREE.Mesh;
  };
  materials: {
    material: THREE.MeshStandardMaterial;
    ['.001']: THREE.MeshStandardMaterial;
  };
};
// JSX.IntrinsicElements['group']
export function Obj(props: any) {
  const { nodes, materials } = useGLTF('/models/python/python.glb') as GLTFResult;

  // Create a reference to the group
  const groupRef = useRef<THREE.Group>(null);

useFrame((state, delta) => {
    if (groupRef.current) {
      const elapsed = state.clock.elapsedTime;
      // Set constant rotation of 30 degrees along Z-axis
      groupRef.current.rotation.x = -Math.PI / 3; // 30 degrees Z-axis

      // Continuous rotation along Y-axis
      groupRef.current.rotateY( delta); // Rotate Y-axis

      // Sinusoidal movement amplitude (up and down)
      const upDownMovement = Math.sin(elapsed) * 5; // Amplitude of 0.1

      // // Reset the position before applying local translation
      // groupRef.current.position.set(0, 0, 0); // Reset position to avoid accumulation of movement

      // // Create a direction vector for the local Y-axis (up-down movement)
      // const direction = new THREE.Vector3(0, 1, 0);

      // // Translate the object along its local Y-axis
      // groupRef.current.translateOnAxis(direction, upDownMovement);
    }
  });

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_4.geometry}
        material={materials.material}
        position={[-0.002, 0, 0]}
        rotation={[Math.PI / 2, 0, 0]} // Base rotation
        scale={2.501}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_6.geometry}
        material={materials['.001']}
        position={[-0.002, 0, 0]}
        rotation={[-Math.PI / 2, 0, -Math.PI]} // Base rotation
        scale={2.501}
      />
    </group>
  );
}

useGLTF.preload('/models/python/python.glb');
