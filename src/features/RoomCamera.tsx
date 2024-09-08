import { useRef, ReactNode } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import * as THREE from 'three';

interface HeroCameraProps {
  isMobile: boolean;
  children: ReactNode;
}

const RoomCamera = ({ isMobile, children }: HeroCameraProps) => {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    easing.damp3(state.camera.position, [0, 0, 25], 0.25, delta);

    if (group.current && !isMobile) {
      easing.dampE(
        group.current.rotation,
        [-state.pointer.y / 3, state.pointer.x / 5, 0],
        0.25,
        delta
      );
    }
  });

  return <group ref={group}>{children}</group>;
};

export default RoomCamera;
