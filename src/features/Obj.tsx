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

export function Obj(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/models/python/python.glb') as GLTFResult;

  // Create a reference to the group
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const elapsed = clock.getElapsedTime();

      // Set constant rotation of 30 degrees along Z-axis
      groupRef.current.rotation.z = -Math.PI / 6; // 30 degrees Z-axis

      // Continuous rotation along Y-axis
      groupRef.current.rotation.y = elapsed * 0.5; // Rotate Y-axis

      // Create a direction vector for the local Y-axis (0, 1, 0) in object space
      const direction = new THREE.Vector3(0, 1, 0);

      // Apply the object's rotation to this vector (convert to world space)
      direction.applyQuaternion(groupRef.current.quaternion);

      // Move the object up and down along its local Y-axis
      const upDownMovement = Math.sin(elapsed) * 0.2; // Amplitude of 0.5
      groupRef.current.position.addScaledVector(direction, upDownMovement);
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
