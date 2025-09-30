// app/_components/LightBulb.tsx
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import * as THREE from "three";

const TIMELINE_SENTINEL_ID = "timeline-end-sentinel";
const BULB_GLOW = "#39f0ff";
const BULB_GLASS = "#8d4efc";
const BULB_SOCKET = "#0f1327";

type BulbModelProps = {
  poweredOn: boolean;
};

function BulbModel({ poweredOn }: BulbModelProps) {
  const filamentRef = useRef<THREE.Mesh>(null);
  const pulse = useRef(0);

  const glassMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: BULB_GLASS,
        transparent: true,
        opacity: 0.08,
        transmission: 0.45,
        thickness: 0.6,
        roughness: 0.05,
        ior: 1.18,
      }),
    []
  );

  const filamentMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: BULB_GLOW,
        emissive: BULB_GLOW,
        emissiveIntensity: 0,
        roughness: 0.25,
      }),
    []
  );

  const socketMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: BULB_SOCKET,
        metalness: 0.88,
        roughness: 0.35,
      }),
    []
  );

  useFrame((state, delta) => {
    const target = poweredOn ? 1 : 0;
    pulse.current = THREE.MathUtils.damp(pulse.current, target, 3, delta);

    const flicker = 1.6 + Math.sin(state.clock.elapsedTime * 7.5) * 0.2;

    filamentMaterial.emissiveIntensity = pulse.current * flicker * 5;
    glassMaterial.opacity = 0.08 + pulse.current * 0.4;
    glassMaterial.transmission = 0.45 + pulse.current * 0.3;
    filamentRef.current?.scale.setScalar(0.82 + pulse.current * 0.22);
  });

  return (
    <group rotation={[Math.PI, 0, Math.PI]}>
      <mesh material={glassMaterial} position={[0, -0.25, 0]}>
        <sphereGeometry args={[0.95, 64, 64]} />
      </mesh>
      <mesh
        ref={filamentRef}
        material={filamentMaterial}
        position={[0, 0.25, 0]}
      >
        <torusKnotGeometry args={[0.22, 0.045, 120, 16, 2, 3]} />
      </mesh>
      <mesh material={socketMaterial} position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.26, 0.36, 0.6, 32]} />
      </mesh>
      <mesh material={socketMaterial} position={[0, 1.12, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.28, 24]} />
      </mesh>
    </group>
  );
}

export default function LightBulb() {
  const [poweredOn, setPoweredOn] = useState(false);

// app/_components/LightBulb.tsx:66
  useEffect(() => {
    const sentinel = document.getElementById(TIMELINE_SENTINEL_ID);
    if (!sentinel) return;

    const update = () => {
      const rect = sentinel.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      setPoweredOn(rect.top <= viewportCenter);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);


  return (
    <section className="relative -mt-16 flex min-h-screen flex-col items-center justify-start pt-0">
      <div className="flex flex-col items-center">
        <span className="h-16 w-px bg-gradient-to-b from-cyan-400 via-cyan-400/30 to-transparent" />
        <div
          className={clsx(
            "relative h-[220px] w-[220px]",
            poweredOn ? "drop-shadow-[0_0_80px_rgba(57,240,255,0.6)]" : ""
          )}
        >
          <span
            className={clsx(
              "pointer-events-none absolute inset-0 transition-all duration-400 ease-out",
              poweredOn
                ? "scale-105 bg-[radial-gradient(circle_at_center,rgba(57,240,255,0.7)_0%,rgba(57,240,255,0.25)_45%,rgba(0,0,0,0)_70%)]"
                : "opacity-0"
            )}
            aria-hidden
          />
          <Canvas
            camera={{ position: [0, 0, 4], fov: 38 }}
            gl={{ alpha: true, antialias: true }}
            style={{ width: "100%", height: "100%" }}
          >
            <ambientLight intensity={poweredOn ? 0.3 : 0} />
            <pointLight
              position={[0, 2.5, 4]}
              intensity={poweredOn ? 2.8 : 0}
              color={BULB_GLOW}
            />
            <pointLight
              position={[-2, -3, -3]}
              intensity={poweredOn ? 0.9 : 0}
              color="#8d4efc"
            />
            <Suspense fallback={null}>
              <BulbModel poweredOn={poweredOn} />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </section>
  );
}
