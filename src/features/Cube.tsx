import { useEffect, useRef, useState } from 'react';
import { Float, useGLTF, useTexture } from '@react-three/drei';
import anime from 'animejs/lib/anime.es.js';
import { Mesh, MeshStandardMaterial, BufferGeometry } from 'three';

interface CubeNode {
  geometry: BufferGeometry;
  material: MeshStandardMaterial;
}

const Cube: React.FC<any> = ({ position = [0, 0, 0], ...props }) => {
  const { nodes } = useGLTF('models/cube.glb');
  const texture = useTexture('textures/cube.png');

  const cubeRef = useRef<Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const originalRotation = useRef<[number, number, number]>([0, 0, 0]);

  useEffect(() => {
    if (!cubeRef.current) return;

    if (nodes.Cube && ('geometry' in nodes.Cube) && ('material' in nodes.Cube)) {
      
      if (hovered) {
        anime.remove(cubeRef.current.rotation);

        anime({
          targets: cubeRef.current.rotation,
          y: '+=2',
          duration: 500,
          easing: 'easeInOutQuad',
          update: () => {
            cubeRef.current?.updateMatrix();
          },
        });
      } else {
        anime.remove(cubeRef.current.rotation);

        anime({
          targets: cubeRef.current.rotation,
          x: originalRotation.current[0],
          y: originalRotation.current[1],
          z: originalRotation.current[2],
          duration: 1000,
          easing: 'easeInOutQuad',
          update: () => {
            cubeRef.current?.updateMatrix();
          },
        });
      }

      return () => {
        anime.remove(cubeRef.current.rotation);
      };
    }
  }, [hovered, nodes.Cube]);

  return (
    <Float floatIntensity={2}>
      <group position={position} rotation={[0, 0, 0]} scale={0.74} dispose={null} {...props}>
        {nodes.Cube && ('geometry' in nodes.Cube) && ('material' in nodes.Cube) && (
          <mesh
            ref={cubeRef}
            castShadow
            receiveShadow
            geometry={(nodes.Cube as CubeNode).geometry}
            material={(nodes.Cube as CubeNode).material}
            onPointerEnter={() => {
              setHovered(true);
              originalRotation.current = [cubeRef.current.rotation.x, cubeRef.current.rotation.y, cubeRef.current.rotation.z];
            }}
            onPointerLeave={() => setHovered(false)}>
            <meshMatcapMaterial matcap={texture} toneMapped={false} />
          </mesh>
        )}
      </group>
    </Float>
  );
};

useGLTF.preload('models/cube.glb');

export default Cube;