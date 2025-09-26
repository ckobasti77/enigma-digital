// components/LaptopScene.tsx
"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, useGLTF } from "@react-three/drei";

export default function LaptopScene() {
  const laptop = useGLTF("assets/models/laptop/laptop2.glb");

  return (
      <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <primitive object={laptop.scene} scale={10} />
        <OrbitControls enableZoom={true} enablePan={false} />
      </Canvas>
  );
}
