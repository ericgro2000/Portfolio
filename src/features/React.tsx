import { Float, useGLTF, Gltf } from '@react-three/drei';
import { Group, Mesh, MeshStandardMaterial, BufferGeometry } from 'three';

const ReactLogo: React.FC<any> = ({ position = [8, 8, 0], ...props }) => {
  const { nodes, materials } = useGLTF('models/react.glb') as any;

  return (
    <Float floatIntensity={1}>
      <group position={position} scale={[0.3, 0.3, 0.3]} dispose={null} {...props}>
          <mesh geometry={nodes['React-Logo_Material002_0'].geometry as BufferGeometry}
                material={materials['Material.002'] as MeshStandardMaterial}
                position={[0, 0.079, 0.181]}
                rotation={[0, 0, -Math.PI / 2]}
                scale={[0.392, 0.392, 0.527]}
          />
      </group>
    </Float>
  );
};

useGLTF.preload('models/react.glb');

export default ReactLogo;