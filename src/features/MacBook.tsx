import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { useFrame } from '@react-three/fiber'

type GLTFResult = GLTF & {
  nodes: {
    Object_4: THREE.Mesh
    Object_6: THREE.Mesh
    Object_8: THREE.Mesh
  }
  materials: {
    MacBookPro: THREE.MeshStandardMaterial
  }
}
// JSX.IntrinsicElements['group']
export function Macbook(props:any) {
  const { nodes, materials } = useGLTF('/models/macbook/macbook.glb') as GLTFResult;
  
  // Create a reference to the model's group
  const groupRef = useRef<THREE.Group>(null);
  
  // Use frame loop to animate the object
  useFrame(({ clock }, delta) => {
    const elapsedTime = clock.getElapsedTime();

    if (groupRef.current) {
      // Create a floating effect using sin function
      groupRef.current.position.y = Math.sin(elapsedTime * 2) * 0.1; // Float up and down

      // Continuous rotation along Y-axis and slight rotation on X-axis
      groupRef.current.rotation.y += delta * 0.5; // Smooth Y-axis rotation
      groupRef.current.rotation.x = Math.cos(elapsedTime) * 0.1; // Sway effect on X-axis

      // Create a wobble effect by scaling the object
      const scaleFactor = 1 + Math.sin(elapsedTime * 3) * 0.05;
      groupRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor);
    }
  });

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <group position={[0.121, 0.007, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_6.geometry}
          material={materials.MacBookPro}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_8.geometry}
          material={materials.MacBookPro}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_4.geometry}
        material={materials.MacBookPro}
      />
    </group>
  );
}

useGLTF.preload('/models/macbook/macbook.glb');
