// useFrame(({ clock }) => {
//     if (groupRef.current) {
//       const elapsed = clock.getElapsedTime();

//       // Set constant rotation of 30 degrees along Z-axis
//       groupRef.current.rotation.z = -Math.PI / 6; // 30 degrees Z-axis

//       // Continuous rotation along Y-axis
//       // groupRef.current.rotation.y = elapsed * 5; // Rotate Y-axis

//       // Sinusoidal movement amplitude (up and down)
//       const upDownMovement = Math.sin(elapsed) * 5; // Amplitude of 0.1

//       // Reset the position before applying local translation
//       groupRef.current.position.set(0, 0, 0); // Reset position to avoid accumulation of movement

//       // Create a direction vector for the local Y-axis (up-down movement)
//       const direction = new THREE.Vector3(0, 1, 0);

//       // Translate the object along its local Y-axis
//       groupRef.current.translateOnAxis(direction, upDownMovement);
//     }
//   });


// useFrame((state, delta) => {
//     if (groupRef.current) {
//       // Set constant rotation of 30 degrees along Z-axis
//       // groupRef.current.rotation.z = -Math.PI / 6; // 30 degrees Z-axis

//       // Continuous rotation along Y-axis
//       groupRef.current.rotateY(delta * 1); // Rotate Y-axis

//       // Sinusoidal movement amplitude (up and down)
//       const upDownMovement = Math.sin(5) * delta; // Amplitude of 0.1

//       // Reset the position before applying local translation
//       groupRef.current.position.set(0, 0, 0); // Reset position to avoid accumulation of movement

//       // Create a direction vector for the local Y-axis (up-down movement)
//       const direction = new THREE.Vector3(0, 1, 0);

//       // Translate the object along its local Y-axis
//       groupRef.current.translateOnAxis(direction, upDownMovement);
//     }
//   });