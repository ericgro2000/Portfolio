// import * as THREE from 'three'
// import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
// import { GLTF } from 'three-stdlib'

// type GLTFResult = GLTF & {
//   nodes: {
//     Plane_Material_0: THREE.Mesh
//   }
//   materials: {
//     Material: THREE.MeshStandardMaterial
//   }
// }

export function Desk(props: any) {
  const { nodes, materials } = useGLTF('/models/lowqRoom/scene.gltf') as any
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane_Material_0.geometry}
        material={materials.Material}
        rotation={[-1.5, 0, 2.3]}
        //scale={30}
      />
    </group>
  )
}

useGLTF.preload('/models/lowqRoom/scene.gltf')

