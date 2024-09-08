import { useGLTF } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { SimpleAnimator } from '../shared/consts/simpleAnimator';
// import { useGSAP } from '@gsap/react';
// import gsap from 'gsap';

const Target = (props) => {
  const targetRef = useRef();
  const { scene } = useGLTF(
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/target-stand/model.gltf',
  );

  useEffect(() => {
    const animator = new SimpleAnimator(targetRef.current.position);

    // Animate position.y for the current target
    animator.to(
      { y: targetRef.current.position.y + 0.5 },
      { duration: 1.5, repeat: -1, yoyo: true, ease: (t) => t }
    );

    return () => {
      animator.stop(); // Clean up animation on unmount
    };
  }, []);

  return (
    <mesh {...props} ref={targetRef} rotation={[0, Math.PI / 5, 0]} scale={1.5}>
      <primitive object={scene} />
    </mesh>
  );
};

export default Target;