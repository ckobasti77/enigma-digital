// components/LaptopScene.tsx
"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, useGLTF } from "@react-three/drei";

export default function LaptopScene() {
  const laptop = useGLTF("/models/laptop.gltf"); // import your 3D laptop model

  return (
    <Canvas camera={{ position: [0, 1, 3], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <primitive object={laptop.scene} scale={1} />
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}
