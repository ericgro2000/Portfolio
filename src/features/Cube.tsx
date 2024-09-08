import { useEffect, useRef, useState } from 'react';
import { Float, useGLTF, useTexture } from '@react-three/drei';
import anime from 'animejs/lib/anime.es.js';
import { Mesh } from 'three';

type CubeProps = {
  position?: [number, number, number];
} & React.HTMLProps<HTMLDivElement>;

const Cube: React.FC<CubeProps> = ({ position = [0, 0, 0], ...props }) => {
  const { nodes } = useGLTF('models/cube.glb');
  const texture = useTexture('textures/cube.png');

  const cubeRef = useRef<Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const originalRotation = useRef([0, 0, 0]);

  useEffect(() => {
    if (!cubeRef.current) return;

    // Store the original rotation on mount
    if (originalRotation.current[0] === 0 && originalRotation.current[1] === 0 && originalRotation.current[2] === 0) {
      originalRotation.current = [cubeRef.current.rotation.x, cubeRef.current.rotation.y, cubeRef.current.rotation.z];
    }

    // Animation logic
    if (hovered) {
      // Stop ongoing animation
      anime.remove(cubeRef.current.rotation);

      // Animate rotation on hover
      anime({
        targets: cubeRef.current.rotation,
        y: '+=2', // Rotate on hover
        duration: 500,
        easing: 'easeInOutQuad',
        update: () => {
          cubeRef.current?.updateMatrix();
        },
      });
    } else {
      // Animate back to the original rotation
      anime({
        targets: cubeRef.current.rotation,
        x: originalRotation.current[0],
        y: originalRotation.current[1],
        z: originalRotation.current[2],
        duration: 1000, // Adjust duration for smoothness
        easing: 'easeInOutQuad',
        update: () => {
          cubeRef.current?.updateMatrix();
        },
      });
    }

    // Cleanup function to stop animation on unmount
    return () => {
      anime.remove(cubeRef.current.rotation);
    };
  }, [hovered]);

  return (
    <Float floatIntensity={2}>
      <group position={position} rotation={[0, 0, 0]} scale={0.74} dispose={null} {...props}>
        <mesh
          ref={cubeRef}
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          material={nodes.Cube.material}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}>
          <meshMatcapMaterial matcap={texture} toneMapped={false} />
        </mesh>
      </group>
    </Float>
  );
};

useGLTF.preload('models/cube.glb');

export default Cube;