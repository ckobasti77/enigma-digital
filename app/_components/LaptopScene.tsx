"use client";

import { Bounds, useGLTF, useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Suspense, useEffect, useMemo, useRef } from "react";
import { useTheme } from "./ThemeProvider";

type AxisKey = "x" | "y" | "z";
type ThemeMode = "light" | "dark";

const SHAPE_PALETTES: Record<ThemeMode, { primary: string; accent: string; contrast: string }> = {
  light: {
    primary: "#0f172a",
    accent: "#2563eb",
    contrast: "#f97316",
  },
  dark: {
    primary: "#9db4d6",
    accent: "#60a5fa",
    contrast: "#fbbf24",
  },
};

function Laptop() {
  const { scene } = useGLTF("/assets/models/laptop/laptop.glb");
  const tiltRef = useRef<THREE.Group>(null);

  const screenTexture = useTexture("/assets/images/screen-saver2.avif");
  useEffect(() => {
    if (!screenTexture) return;
    screenTexture.colorSpace = THREE.SRGBColorSpace;
    screenTexture.wrapS = screenTexture.wrapT = THREE.ClampToEdgeWrapping;
    screenTexture.minFilter = THREE.LinearFilter;
    screenTexture.magFilter = THREE.LinearFilter;
    screenTexture.center.set(0.5, 0.5);
    screenTexture.anisotropy = Math.min(8, screenTexture.anisotropy ?? 0);
    screenTexture.needsUpdate = true;
  }, [screenTexture]);

  const screenMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        map: screenTexture,
        toneMapped: false,
        transparent: false,
        side: THREE.FrontSide,
      }),
    [screenTexture]
  );

  const frameMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: false,
        toneMapped: false,
        side: THREE.FrontSide,
      }),
    []
  );

  useEffect(() => {
    if (!scene) return;

    type Candidate = { mesh: THREE.Mesh; bbox: THREE.Box3; size: THREE.Vector3 };
    const candidates: Candidate[] = [];

    scene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      if (!child.name.toLowerCase().includes("screen")) return;

      const geometry = child.geometry as THREE.BufferGeometry;
      geometry.computeBoundingBox();
      const bbox = geometry.boundingBox?.clone();
      if (!bbox) return;

      const size = new THREE.Vector3();
      bbox.getSize(size);

      candidates.push({ mesh: child, bbox, size });
    });

    if (!candidates.length) return;

    const faceArea = (size: THREE.Vector3) => {
      const dims = [size.x, size.y, size.z].sort((a, b) => b - a);
      return dims[0] * dims[1];
    };

    const primary = candidates.reduce((smallest, candidate) =>
      faceArea(candidate.size) < faceArea(smallest.size) ? candidate : smallest
    );

    const originalMaterials: Array<{
      mesh: THREE.Mesh;
      material: THREE.Material | THREE.Material[];
    }> = [];

    candidates.forEach(({ mesh, bbox, size }) => {
      originalMaterials.push({ mesh, material: mesh.material });

      if (mesh === primary.mesh) {
        const axes = [
          { key: "x" as AxisKey, size: size.x, min: bbox.min.x, max: bbox.max.x },
          { key: "y" as AxisKey, size: size.y, min: bbox.min.y, max: bbox.max.y },
          { key: "z" as AxisKey, size: size.z, min: bbox.min.z, max: bbox.max.z },
        ].sort((a, b) => b.size - a.size);

        const widthAxis = axes[0];
        const heightAxis = axes[1];

        const geometry = mesh.geometry as THREE.BufferGeometry;
        const positionAttr = geometry.getAttribute("position") as THREE.BufferAttribute;

        let uvAttr = geometry.getAttribute("uv") as THREE.BufferAttribute | undefined;
        if (!uvAttr) {
          uvAttr = new THREE.Float32BufferAttribute(positionAttr.count * 2, 2);
          geometry.setAttribute("uv", uvAttr);
        }

        const widthRange = Math.max(widthAxis.size, 1e-6);
        const heightRange = Math.max(heightAxis.size, 1e-6);

        const getComponent = (index: number, axis: AxisKey) => {
          switch (axis) {
            case "x":
              return positionAttr.getX(index);
            case "y":
              return positionAttr.getY(index);
            default:
              return positionAttr.getZ(index);
          }
        };

        for (let i = 0; i < positionAttr.count; i++) {
          const widthVal = getComponent(i, widthAxis.key);
          const heightVal = getComponent(i, heightAxis.key);

          const u = (widthVal - widthAxis.min) / widthRange;
          const v = (heightVal - heightAxis.min) / heightRange;

          uvAttr.setXY(i, u, v);
        }

        uvAttr.needsUpdate = true;
        mesh.material = screenMaterial;
      } else {
        mesh.material = frameMaterial;
      }
    });

    return () => {
      originalMaterials.forEach(({ mesh, material }) => {
        mesh.material = material;
      });
      screenMaterial.dispose();
      frameMaterial.dispose();
    };
  }, [scene, screenMaterial, frameMaterial]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!tiltRef.current) return;
      const x = (event.clientX / window.innerWidth - 0.5) * 0.6;
      const y = (event.clientY / window.innerHeight - 0.5) * 0.6;
      tiltRef.current.rotation.y = x;
      tiltRef.current.rotation.x = -y;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return <primitive ref={tiltRef} object={scene} scale={4} />;
}

type StaticShapeProps = {
  position: [number, number, number];
  color: string;
  kind: "cube" | "pyramid" | "cone";
  scale?: number;
  spinSpeed?: number;
};

function StaticShape({ position, color, kind, scale = 0.3, spinSpeed = 0.6 }: StaticShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += spinSpeed * delta;
    // meshRef.current.rotation.x += spinSpeed * 0.25 * delta;  
  });

  return (
    <mesh ref={meshRef} position={position} castShadow receiveShadow>
      {kind === "cube" ? (
        <boxGeometry args={[scale * 1.25, scale * 1.25, scale * 1.25]} />
      ) : kind === "cone" ? (
        <coneGeometry args={[scale * 0.8, scale * 1.6, 40]} />
      ) : (
        <tetrahedronGeometry args={[scale * 1.1, 0]} />
      )}
      <meshStandardMaterial
        color={color}
        roughness={0.45}
        metalness={0.4}
        emissive={new THREE.Color(color).clone().multiplyScalar(0.2)}
        emissiveIntensity={0.6}
        toneMapped={true}
      />
    </mesh>
  );
}

function AmbientShapes() {
  const { theme } = useTheme();
  const palette = useMemo(() => SHAPE_PALETTES[theme ?? "dark"], [theme]);

  return (
    <group>
      <StaticShape
        position={[2, 0.95, -0.25]}
        color={palette.accent}
        kind="pyramid"
        scale={0.3}
        spinSpeed={0.75}
      />
      <StaticShape
        position={[-1.2, -0.05, 0.8]}
        color={palette.primary}
        kind="cube"
        scale={0.28}
        spinSpeed={0.5}
      />
      <StaticShape
        position={[2, -0.9, 0.5]}
        color={palette.contrast}
        kind="cone"
        scale={0.34}
        spinSpeed={0.85}
      />
    </group>
  );
}

export default function LaptopScene() {
  return (
    <Canvas camera={{ position: [0, 1, 3], fov: 45 }} className="-translate-x-16 md:translate-x-0">
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.1} castShadow />
      <Suspense fallback={null}>
        <Bounds fit clip observe margin={1.2}>
          <Laptop />
        </Bounds>
        <AmbientShapes />
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload("/assets/models/laptop/laptop.glb");

