import { useEffect, useRef, useState } from 'react';
import { Float, useGLTF, useTexture } from '@react-three/drei';
import anime from 'animejs/lib/anime.es.js';
import { Mesh } from 'three';

type CubeProps = React.HTMLProps<HTMLDivElement>;

const Cube: React.FC<CubeProps> = (props) => {
  const { nodes } = useGLTF('models/cube.glb');
  const texture = useTexture('textures/cube.png');

  const cubeRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Run the animation when the component mounts and whenever `hovered` changes
    useEffect(() => {
    if (!cubeRef.current) return;

    anime({
      targets: cubeRef.current.rotation,
      y: hovered ? '+=2' : `+=${Math.PI * 2}`,
      x: hovered ? '+=2' : `-=${Math.PI * 2}`,
      duration: 2500, // duration in milliseconds
      easing: 'linear',
      loop: true,
      delay: 500, // repeatDelay equivalent
      update: () => {
        // Ensure that animation update does not interfere with React rendering
        cubeRef.current?.updateMatrix();
      }
    });
  }, [hovered]);

  return (
    <Float floatIntensity={2}>
      <group position={[9, -4, 0]} rotation={[2.6, 0.8, -1.8]} scale={0.74} dispose={null} {...props}>
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
