import { useGLTF } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import anime from 'animejs';
import { Mesh } from 'three';

// Define the Target component
const Target = (props:any) => {
  const targetRef = useRef<Mesh>(null!);
  const { scene } = useGLTF(
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/target-stand/model.gltf',
  );

  useEffect(() => {
    const animation = anime({
      targets: targetRef.current.position,
      y: targetRef.current.position.y + 0.5,
      duration: 1500, // Duration in milliseconds
      easing: 'linear',
      loop: true,
      direction: 'alternate', // This will make it yoyo
    });

    return () => {
      if (targetRef.current) {
        targetRef.current.remove(); // Remove the element from the DOM
      }
      anime.remove(targetRef.current.position); // Stop any ongoing animations
    };
  }, []);

  return (
    <mesh {...props} ref={targetRef} rotation={[0, Math.PI / 5, 0]} scale={1.5}>
      <primitive object={scene} />
    </mesh>
  );
};

export default Target;
