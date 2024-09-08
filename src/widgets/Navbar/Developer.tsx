import React, { useEffect, useRef } from 'react';
import { useGraph } from '@react-three/fiber';
import { useAnimations, useFBX, useGLTF } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';
import { Group, Object3D, SkinnedMesh } from 'three';

const Developer = ({ animationName = 'idle', ...props }) => {
  const group = useRef<Group | null>(null); // Initialize the ref with null

  const { scene } = useGLTF('/models/animations/developer.glb');
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);

  const { animations: idleAnimation } = useFBX('/models/animations/idle.fbx');
  const { animations: saluteAnimation } = useFBX('/models/animations/salute.fbx');
  const { animations: clappingAnimation } = useFBX('/models/animations/clapping.fbx');
  const { animations: victoryAnimation } = useFBX('/models/animations/victory.fbx');

  idleAnimation[0].name = 'idle';
  saluteAnimation[0].name = 'salute';
  clappingAnimation[0].name = 'clapping';
  victoryAnimation[0].name = 'victory';

  const { actions } = useAnimations(
    [idleAnimation[0], saluteAnimation[0], clappingAnimation[0], victoryAnimation[0]],
    group,
  );

  useEffect(() => {
    const action = actions[animationName];
    
    if (action) {
      action.reset().fadeIn(0.5).play();
      return () => {
        action.fadeOut(0.5);
      };
    }

    return undefined; // Return undefined if no action is found
  }, [animationName, actions]);
  
  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={nodes.Hips as Object3D} />
      <skinnedMesh
        geometry={(nodes.Wolf3D_Hair as SkinnedMesh).geometry}
        material={materials.Wolf3D_Hair}
        skeleton={(nodes.Wolf3D_Hair as SkinnedMesh).skeleton}
      />
      <skinnedMesh
        geometry={(nodes.Wolf3D_Glasses as SkinnedMesh).geometry}
        material={materials.Wolf3D_Glasses}
        skeleton={(nodes.Wolf3D_Glasses as SkinnedMesh).skeleton}
      />
      <skinnedMesh
        geometry={(nodes.Wolf3D_Body as SkinnedMesh).geometry}
        material={materials.Wolf3D_Body}
        skeleton={(nodes.Wolf3D_Body as SkinnedMesh).skeleton}
      />
      <skinnedMesh
        geometry={(nodes.Wolf3D_Outfit_Bottom as SkinnedMesh).geometry}
        material={materials.Wolf3D_Outfit_Bottom}
        skeleton={(nodes.Wolf3D_Outfit_Bottom as SkinnedMesh).skeleton}
      />
      <skinnedMesh
        geometry={(nodes.Wolf3D_Outfit_Footwear as SkinnedMesh).geometry}
        material={materials.Wolf3D_Outfit_Footwear}
        skeleton={(nodes.Wolf3D_Outfit_Footwear as SkinnedMesh).skeleton}
      />
      <skinnedMesh
        geometry={(nodes.Wolf3D_Outfit_Top as SkinnedMesh).geometry}
        material={materials.Wolf3D_Outfit_Top}
        skeleton={(nodes.Wolf3D_Outfit_Top as SkinnedMesh).skeleton}
      />
      <skinnedMesh
        name="EyeLeft"
        geometry={(nodes.EyeLeft as SkinnedMesh).geometry}
        material={materials.Wolf3D_Eye}
        skeleton={(nodes.EyeLeft as SkinnedMesh).skeleton}
        morphTargetDictionary={(nodes.EyeLeft as SkinnedMesh).morphTargetDictionary}
        morphTargetInfluences={(nodes.EyeLeft as SkinnedMesh).morphTargetInfluences}
      />
      <skinnedMesh
        name="EyeRight"
        geometry={(nodes.EyeRight as SkinnedMesh).geometry}
        material={materials.Wolf3D_Eye}
        skeleton={(nodes.EyeRight as SkinnedMesh).skeleton}
        morphTargetDictionary={(nodes.EyeRight as SkinnedMesh).morphTargetDictionary}
        morphTargetInfluences={(nodes.EyeRight as SkinnedMesh).morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Head"
        geometry={(nodes.Wolf3D_Head as SkinnedMesh).geometry}
        material={materials.Wolf3D_Skin}
        skeleton={(nodes.Wolf3D_Head as SkinnedMesh).skeleton}
        morphTargetDictionary={(nodes.Wolf3D_Head as SkinnedMesh).morphTargetDictionary}
        morphTargetInfluences={(nodes.Wolf3D_Head as SkinnedMesh).morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Teeth"
        geometry={(nodes.Wolf3D_Teeth as SkinnedMesh).geometry}
        material={materials.Wolf3D_Teeth}
        skeleton={(nodes.Wolf3D_Teeth as SkinnedMesh).skeleton}
        morphTargetDictionary={(nodes.Wolf3D_Teeth as SkinnedMesh).morphTargetDictionary}
        morphTargetInfluences={(nodes.Wolf3D_Teeth as SkinnedMesh).morphTargetInfluences}
      />
    </group>
  );
};

useGLTF.preload('/models/animations/developer.glb');

export default Developer;