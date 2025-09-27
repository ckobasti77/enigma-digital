"use client";

import { Bounds, OrbitControls, useGLTF, useTexture } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

function Laptop() {
  const { scene } = useGLTF("/assets/models/laptop/laptop.glb");

  // Load any texture (e.g. screenshot of cluttered desktop with unread emails)
  const screenTex = useTexture("/assets/images/screen-saver.png");

  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      // Check mesh name (depends on your model, might be "Screen", "display", etc.)
      if (mesh.name.toLowerCase().includes("screen")) {
        mesh.material = new THREE.MeshBasicMaterial({
          map: screenTex,
          toneMapped: true, // keeps colors vibrant
        });
      }
    }
  });

  return <primitive object={scene} scale={4} />;
}

export default function LaptopScene() {
  return (
    <Canvas camera={{ position: [0, 1, 3], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Bounds fit clip observe margin={1.2}>
        <Laptop />
      </Bounds>
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}
