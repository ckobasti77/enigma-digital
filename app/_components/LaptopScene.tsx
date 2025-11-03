"use client";

import { Bounds, useGLTF, useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Suspense, useEffect, useMemo, useRef } from "react";
import { useTheme } from "./ThemeProvider";

type AxisKey = "x" | "y" | "z";
type ThemeMode = "light" | "dark";

const LAPTOP_COLOR_PRESETS: Record<ThemeMode, { chassis: string; bezel: string; glow: string }> = {
  light: {
    chassis: "#dbe6f8",
    bezel: "#1f2c3d",
    glow: "#58c4ff",
  },
  dark: {
    chassis: "#132238",
    bezel: "#58c4ff",
    glow: "#58c4ff",
  },
};

function Laptop() {
  const { scene } = useGLTF("/assets/models/laptop/laptop.glb");
  const tiltRef = useRef<THREE.Group>(null);
  const { theme } = useTheme();
  const palette = useMemo(() => LAPTOP_COLOR_PRESETS[theme], [theme]);

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

  useEffect(() => {
    return () => {
      screenMaterial.dispose();
    };
  }, [screenMaterial]);

  const frameMaterial = useMemo(() => {
    const base = new THREE.Color(palette.bezel);
    const highlight = new THREE.Color(palette.glow);
    const emissive = highlight.clone().lerp(base, 0.55).multiplyScalar(theme === "light" ? 0.22 : 0.42);

    return new THREE.MeshStandardMaterial({
      color: base,
      metalness: 0.35,
      roughness: 0.32,
      envMapIntensity: 0.6,
      emissive,
      emissiveIntensity: 0.75,
      toneMapped: true,
      side: THREE.FrontSide,
    });
  }, [palette, theme]);

  useEffect(() => {
    return () => {
      frameMaterial.dispose();
    };
  }, [frameMaterial]);

  const chassisMaterial = useMemo(() => {
    const color = new THREE.Color(palette.chassis);
    const glow = new THREE.Color(palette.glow);
    const emissive = glow.clone().lerp(color, 0.7).multiplyScalar(theme === "light" ? 0.12 : 0.28);

    const material = new THREE.MeshStandardMaterial({
      color,
      metalness: 0.25,
      roughness: 0.68,
      envMapIntensity: 0.55,
      emissive,
      emissiveIntensity: 0.65,
      toneMapped: true,
    });

    return material;
  }, [palette, theme]);

  useEffect(() => {
    return () => {
      chassisMaterial.dispose();
    };
  }, [chassisMaterial]);

  useEffect(() => {
    if (!scene) return;

    const originalMaterials = new Map<THREE.Mesh, THREE.Material | THREE.Material[]>();

    scene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;

      const meshName = child.name.toLowerCase();
      if (!meshName.includes("keyboard")) return;

      if (!originalMaterials.has(child)) {
        originalMaterials.set(child, child.material);
      }

      child.material = chassisMaterial;
    });

    return () => {
      originalMaterials.forEach((material, mesh) => {
        mesh.material = material;
      });
    };
  }, [scene, chassisMaterial]);

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

type SpinningIconProps = {
  modelPath: string;
  position: [number, number, number];
  spinSpeed?: number;
  targetSize?: number;
};

function SpinningIcon({ modelPath, position, spinSpeed = 0.5, targetSize = 0.5 }: SpinningIconProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(modelPath);

  const icon = useMemo(() => {
    if (!scene) return null;

    const root = scene.clone(true);
    const materialCache = new Map<THREE.Material, THREE.Material>();

    const cloneMaterial = (material: THREE.Material | null | undefined) => {
      if (!material) return material ?? null;
      if (materialCache.has(material)) return materialCache.get(material)!;
      const cloned = material.clone() as THREE.Material & { toneMapped?: boolean };
      if ("toneMapped" in cloned) {
        cloned.toneMapped = true;
      }
      materialCache.set(material, cloned);
      return cloned;
    };

    const stack: THREE.Object3D[] = [root];
    while (stack.length) {
      const current = stack.pop();
      if (!current) continue;

      if (current instanceof THREE.Light || current instanceof THREE.Camera) {
        current.parent?.remove(current);
        continue;
      }

      if (current instanceof THREE.Mesh) {
        if (Array.isArray(current.material)) {
          current.material = current.material.map((material) => cloneMaterial(material) ?? material);
        } else {
          current.material = cloneMaterial(current.material) ?? current.material;
        }

        current.castShadow = true;
        current.receiveShadow = true;
      }

      if (current.children && current.children.length) {
        stack.push(...current.children);
      }
    }

    root.updateMatrixWorld(true);

    const boundingBox = new THREE.Box3().setFromObject(root);
    const size = boundingBox.getSize(new THREE.Vector3());
    const center = boundingBox.getCenter(new THREE.Vector3());

    root.position.sub(center);

    const maxDimension = Math.max(size.x, size.y, size.z) || 1;
    const scaleFactor = targetSize / maxDimension;
    root.scale.setScalar(scaleFactor);

    return root;
  }, [scene, targetSize]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += spinSpeed * delta;
  });

  if (!icon) return null;

  return <primitive ref={groupRef} object={icon} position={position} />;
}

type SocialIconProps = Omit<SpinningIconProps, "modelPath">;

const WHATSAPP_MODEL_PATH = "/assets/models/3d-icons/whatsapp.gltf";

function WhatsAppIcon(props: SocialIconProps) {
  return <SpinningIcon modelPath={WHATSAPP_MODEL_PATH} {...props} />;
}

const TIKTOK_MODEL_PATH = "/assets/models/3d-icons/tik-tok.gltf";

function TikTokIcon(props: SocialIconProps) {
  return <SpinningIcon modelPath={TIKTOK_MODEL_PATH} {...props} />;
}

const INSTAGRAM_MODEL_PATH = "/assets/models/3d-icons/instagram.gltf";

function InstagramIcon(props: SocialIconProps) {
  return <SpinningIcon modelPath={INSTAGRAM_MODEL_PATH} {...props} />;
}

function AmbientShapes() {
  return (
    <group>
      <TikTokIcon
        position={[2, 0.95, -0.25]}
        spinSpeed={0.75}
        targetSize={0.55}
      />
      <WhatsAppIcon
        position={[-1.2, -0.05, 0.8]}
        spinSpeed={0.5}
        targetSize={0.5}
      />
      <InstagramIcon
        position={[2, -0.9, 0.5]}
        spinSpeed={0.85}
        targetSize={0.55}
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
useGLTF.preload(WHATSAPP_MODEL_PATH);
useGLTF.preload(TIKTOK_MODEL_PATH);
useGLTF.preload(INSTAGRAM_MODEL_PATH);
