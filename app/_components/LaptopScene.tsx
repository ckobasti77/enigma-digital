"use client";

import { Bounds, useGLTF, useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useEffect } from "react";

function Laptop() {
  const { scene } = useGLTF("/assets/models/laptop/laptop.glb");
  const screenTex = useTexture("/assets/images/screen-saver.png");

  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      if (mesh.name.toLowerCase().includes("screen")) {
        mesh.material = new THREE.MeshBasicMaterial({
          map: screenTex,
          toneMapped: true,
        });
      }
    }
  });

  const ref = useRef<THREE.Group>(null);

  // rotacija po kretanju misa
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 0.6; // intensity
      const y = (e.clientY / window.innerHeight - 0.5) * 0.6;
      ref.current.rotation.y = x;
      ref.current.rotation.x = -y;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return <primitive ref={ref} object={scene} scale={4} />;
}

function Floor() {
  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, -1.5, 0]}>
      {/* manji radius i vise segmenata da bude smooth */}
      <circleGeometry args={[3, 64]} />
      <meshStandardMaterial transparent opacity={0.6} side={THREE.DoubleSide}>
        <canvasTexture
          attach="map"
          image={generateRadialGradient()}
          needsUpdate
        />
      </meshStandardMaterial>
    </mesh>
  );
}

// manji gradient (samo ispod laptopa)
function generateRadialGradient(size = 512) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  );
  gradient.addColorStop(0, "rgba(0, 255, 255, 0.4)"); // cyan centar
  gradient.addColorStop(1, "rgba(0, 0, 0, 0)"); // fade u providno
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  return canvas;
}

export default function LaptopScene() {
  return (
    <Canvas camera={{ position: [0, 1, 3], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      <Bounds fit clip observe margin={1.2}>
        <Laptop />
      </Bounds>

      <Floor />
    </Canvas>
  );
}
