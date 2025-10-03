// app/_components/LightBulb.tsx
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, Sparkles, Text } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import type { ElementRef } from "react";
import clsx from "clsx";
import * as THREE from "three";

const TIMELINE_SENTINEL_ID = "timeline-end-sentinel";
const BULB_GLOW = "#7ee6ff";
const BULB_GLASS = "#cfa8ff";
const BULB_SOCKET = "#101526";
const CITY_GROUND_LEVEL = -0.95;
const CITY_MIN_SCALE = 0.32;

const EXPERIENCE_OPTIONS = [
  {
    id: "neon-city" as const,
    label: "Neon Growth City",
    tagline: "A skyline built from campaigns, content, and conversion",
    description:
      "Scroll to ignite the city: skyscrapers pulse with site visits, sky trains carry new leads, and floating signs broadcast wins in real time.",
  },
  {
    id: "cyber-lasers" as const,
    label: "Signal Hub",
    tagline: "Laser-linked dashboards for every growth channel",
    description:
      "When the filament fires, data beams route into holographic panelsâ€”social feeds, analytics, and revenue boards all powered from one spark.",
  },
];

type ExperienceId = (typeof EXPERIENCE_OPTIONS)[number]["id"];

type BulbModelProps = {
  poweredOn: boolean;
};

type NeonBuildingDefinition = {
  x: number;
  z: number;
  width: number;
  depth: number;
  height: number;
  color: string;
  delay: number;
};

type CityBillboardDefinition = {
  text: string;
  accent: string;
  position: [number, number, number];
};

type HologramDefinition = {
  id: string;
  label: string;
  caption: string;
  position: [number, number, number];
  rotationY?: number;
  color: string;
};

const CITY_BUILDINGS: NeonBuildingDefinition[] = [
  { x: -1.6, z: -0.45, width: 0.42, depth: 0.44, height: 1.4, color: "#2dd4bf", delay: 0.04 },
  { x: -1.1, z: 0.28, width: 0.56, depth: 0.46, height: 1.25, color: "#38bdf8", delay: 0.1 },
  { x: -0.38, z: -0.2, width: 0.52, depth: 0.54, height: 1.95, color: "#f472b6", delay: 0.18 },
  { x: 0.48, z: 0.22, width: 0.64, depth: 0.58, height: 1.7, color: "#67e8f9", delay: 0.27 },
  { x: 1.25, z: -0.35, width: 0.46, depth: 0.48, height: 1.45, color: "#c084fc", delay: 0.36 },
  { x: 1.75, z: 0.12, width: 0.62, depth: 0.52, height: 1.8, color: "#facc15", delay: 0.45 },
];

const CITY_BILLBOARDS: CityBillboardDefinition[] = [
  { text: "Social Buzz Lanes", accent: "#f472b6", position: [-1.22, -0.28, 0.92] },
  { text: "Organic Reach Grid", accent: "#38bdf8", position: [0.24, -0.2, 0.98] },
  { text: "Qualified Leads Atrium", accent: "#facc15", position: [1.42, -0.22, -0.55] },
];

const HOLOGRAMS: HologramDefinition[] = [
  {
    id: "social-feed",
    label: "Social Pulse",
    caption: "Carousel launches and reels trending up by 187%.",
    position: [-2.1, 0.95, -0.72],
    rotationY: 0.32,
    color: "#f472b6",
  },
  {
    id: "analytics",
    label: "Insights Core",
    caption: "Traffic spikes mapped across search, paid, and referral.",
    position: [0, 1.4, -1.68],
    rotationY: 0,
    color: "#38bdf8",
  },
  {
    id: "commerce",
    label: "Revenue Flow",
    caption: "Abandoned-cart recovery filling every glowing column.",
    position: [2.1, 1.05, 0.48],
    rotationY: -0.34,
    color: "#facc15",
  },
];

function BulbModel({ poweredOn }: BulbModelProps) {
  const filamentRef = useRef<THREE.Mesh>(null);
  const pulse = useRef(0);

  const glassMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: BULB_GLASS,
        transparent: true,
        opacity: 0.08,
        transmission: 0.4,
        thickness: 0.55,
        roughness: 0.08,
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
        roughness: 0.3,
      }),
    []
  );

  const socketMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: BULB_SOCKET,
        metalness: 0.75,
        roughness: 0.4,
      }),
    []
  );

  useFrame((state, delta) => {
    const target = poweredOn ? 1 : 0;
    pulse.current = THREE.MathUtils.damp(pulse.current, target, 3, delta);

    const flicker = 1.5 + Math.sin(state.clock.elapsedTime * 7.2) * 0.2;

    filamentMaterial.emissiveIntensity = pulse.current * flicker * 4.8;
    glassMaterial.opacity = 0.08 + pulse.current * 0.35;
    glassMaterial.transmission = 0.4 + pulse.current * 0.28;
    filamentRef.current?.scale.setScalar(0.82 + pulse.current * 0.2);
  });

  return (
    <group rotation={[Math.PI, 0, Math.PI]} position={[0, 0.05, 0]}>
      <mesh material={glassMaterial} position={[0, -0.25, 0]}>
        <sphereGeometry args={[0.95, 64, 64]} />
      </mesh>
      <mesh ref={filamentRef} material={filamentMaterial} position={[0, 0.22, 0]}>
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

function NeonBuilding({ definition, active }: { definition: NeonBuildingDefinition; active: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#0b1120",
        emissive: new THREE.Color(definition.color),
        emissiveIntensity: 0.12,
        metalness: 0.55,
        roughness: 0.4,
      }),
    [definition.color]
  );
  const progress = useRef(0);

  useEffect(() => () => material.dispose(), [material]);

  useFrame((state, delta) => {
    const target = active ? 1 : 0;
    progress.current = THREE.MathUtils.damp(
      progress.current,
      target,
      2.6 + definition.delay * 3,
      delta
    );

    const heightScale = CITY_MIN_SCALE + progress.current * (1 - CITY_MIN_SCALE);
    const bob = Math.sin(state.clock.elapsedTime * 1.3 + definition.delay * 9) * 0.045 * progress.current;

    const mesh = meshRef.current;
    if (!mesh) return;

    mesh.scale.set(1, heightScale, 1);
    mesh.position.set(
      definition.x,
      CITY_GROUND_LEVEL + (definition.height * heightScale) / 2 + bob,
      definition.z
    );

    material.emissiveIntensity = THREE.MathUtils.lerp(0.12, 2.2, progress.current);
  });

  return (
    <mesh ref={meshRef} material={material} position={[definition.x, CITY_GROUND_LEVEL, definition.z]} castShadow receiveShadow>
      <boxGeometry args={[definition.width, definition.height, definition.depth]} />
    </mesh>
  );
}

function CityBillboard({ definition, active, index }: { definition: CityBillboardDefinition; active: boolean; index: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const panelRef = useRef<THREE.Mesh>(null);
  const progress = useRef(0);

  useFrame((state, delta) => {
    const target = active ? 1 : 0;
    progress.current = THREE.MathUtils.damp(progress.current, target, 3.2 + index, delta);

    const float = Math.sin(state.clock.elapsedTime * 1.4 + index) * 0.1 * progress.current;
    const lift = THREE.MathUtils.lerp(-0.18, 0.15, progress.current);

    const group = groupRef.current;
    if (group) {
      group.position.set(
        definition.position[0],
        definition.position[1] + float + lift,
        definition.position[2]
      );
      group.visible = progress.current > 0.08;
    }

    const mat = panelRef.current?.material as THREE.MeshBasicMaterial | undefined;
    if (mat) {
      mat.opacity = THREE.MathUtils.lerp(0, 0.88, progress.current);
    }
  });

  return (
    <Float floatIntensity={0.6} rotationIntensity={0.25} speed={1.4}>
      <group ref={groupRef} position={definition.position} scale={0.9}>
        <mesh ref={panelRef}>
          <planeGeometry args={[1.2, 0.52]} />
          <meshBasicMaterial color={definition.accent} transparent opacity={0} />
        </mesh>
        <Text color="#05060d" fontSize={0.18} anchorX="center" anchorY="middle" position={[0, 0, 0.01]}>
          {definition.text}
        </Text>
      </group>
    </Float>
  );
}

function NeonCity({ active }: { active: boolean }) {
  const fogRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    const target = active ? 0.36 : 0;
    const mat = fogRef.current?.material as THREE.MeshBasicMaterial | undefined;
    if (mat) {
      mat.opacity = THREE.MathUtils.damp(mat.opacity ?? 0, target, 2, delta);
    }
  });

  return (
    <group position={[0, -0.12, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, CITY_GROUND_LEVEL + 0.01, 0]}>
        <circleGeometry args={[3.2, 64]} />
        <meshStandardMaterial
          color="#0f172a"
          emissive="#172554"
          emissiveIntensity={active ? 0.6 : 0.15}
          roughness={0.85}
          metalness={0.12}
        />
      </mesh>
      <mesh ref={fogRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, CITY_GROUND_LEVEL + 0.08, 0]}>
        <circleGeometry args={[3, 64]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0} />
      </mesh>
      <Sparkles
        count={55}
        speed={0.6}
        opacity={active ? 0.65 : 0.08}
        size={1.2}
        scale={[3.4, 1.6, 3.4]}
        position={[0, CITY_GROUND_LEVEL + 0.7, 0]}
        color="#a5f3fc"
      />
      {CITY_BUILDINGS.map((definition) => (
        <NeonBuilding key={`${definition.x}-${definition.z}`} definition={definition} active={active} />
      ))}
      {CITY_BILLBOARDS.map((definition, index) => (
        <CityBillboard key={definition.text} definition={definition} active={active} index={index} />
      ))}
    </group>
  );
}

function LaserBeam({ target, color, active, index }: { target: [number, number, number]; color: string; active: boolean; index: number }) {
  type LineInstance = ElementRef<typeof Line>;
  const lineRef = useRef<LineInstance>(null);
  const progress = useRef(0);

  useFrame((_, delta) => {
    const targetMix = active ? 1 : 0;
    progress.current = THREE.MathUtils.damp(progress.current, targetMix, 3 + index * 0.4, delta);

    const line = lineRef.current;
    if (!line) return;

    const material = line.material as THREE.ShaderMaterial & { dashOffset?: number };
    material.opacity = THREE.MathUtils.lerp(material.opacity ?? 0, 0.9 * progress.current, 0.2);
    if (material.dashOffset !== undefined) {
      material.dashOffset -= delta * (0.7 + index * 0.16) * (0.4 + progress.current * 0.6);
    }
  });

  return (
    <Line
      ref={lineRef}
      points={[[0, 0.35, 0.18], target]}
      color={color}
      lineWidth={1.6}
      dashed
      dashSize={0.16}
      gapSize={0.12}
      dashScale={3.2}
      transparent
      opacity={0}
      toneMapped={false}
      onUpdate={(line: LineInstance) => {
        const rawMaterial = Array.isArray(line.material) ? line.material[0] : line.material;
        if (!rawMaterial) return;
        const material = rawMaterial as THREE.ShaderMaterial & { dashOffset?: number };
        material.transparent = true;
        material.opacity = 0;
        material.depthWrite = false;
        material.toneMapped = false;
      }}
    />
  );
}

function LaserPanel({ definition, active, index }: { definition: HologramDefinition; active: boolean; index: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const panelRef = useRef<THREE.Mesh>(null);
  const progress = useRef(0);

  useFrame((state, delta) => {
    const target = active ? 1 : 0;
    progress.current = THREE.MathUtils.damp(progress.current, target, 3 + index * 0.4, delta);

    const float = Math.sin(state.clock.elapsedTime * 1.25 + index) * 0.1 * progress.current;
    const group = groupRef.current;
    if (group) {
      group.position.set(definition.position[0], definition.position[1] + float, definition.position[2]);
      group.rotation.y =
        (definition.rotationY ?? 0) + Math.sin(state.clock.elapsedTime * 0.24 + index) * 0.045 * progress.current;
      group.visible = progress.current > 0.08;
    }

    const mat = panelRef.current?.material as THREE.MeshBasicMaterial | undefined;
    if (mat) {
      mat.opacity = THREE.MathUtils.lerp(0, 0.85, progress.current);
    }
  });

  return (
    <group ref={groupRef} position={definition.position}>
      <mesh ref={panelRef}>
        <planeGeometry args={[1.28, 1]} />
        <meshBasicMaterial
          color={definition.color}
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <group position={[0, 0, 0.03]}>
        <Text color="#0f172a" fontSize={0.2} anchorX="center" anchorY="middle" position={[0, 0.22, 0]} maxWidth={1}>
          {definition.label}
        </Text>
        <Text
          color="#1e293b"
          fontSize={0.12}
          anchorX="center"
          anchorY="middle"
          maxWidth={1.05}
          lineHeight={1.15}
          position={[0, -0.24, 0]}
        >
          {definition.caption}
        </Text>
      </group>
    </group>
  );
}

function LaserScene({ active }: { active: boolean }) {
  const lightRef = useRef<THREE.PointLight>(null);
  const progress = useRef(0);

  useFrame((_, delta) => {
    const target = active ? 1 : 0;
    progress.current = THREE.MathUtils.damp(progress.current, target, 2.6, delta);
    const light = lightRef.current;
    if (!light) return;
    light.intensity = THREE.MathUtils.lerp(0.5, 4.5, progress.current);
    light.distance = 4 + progress.current * 2.5;
  });

  return (
    <group>
      <pointLight ref={lightRef} position={[0, 0.38, 0.24]} color={BULB_GLOW} intensity={0} distance={4} />
      {HOLOGRAMS.map((panel, index) => (
        <LaserBeam key={`${panel.id}-beam`} target={panel.position} color={panel.color} active={active} index={index} />
      ))}
      {HOLOGRAMS.map((panel, index) => (
        <LaserPanel key={panel.id} definition={panel} active={active} index={index} />
      ))}
      <Sparkles
        count={42}
        speed={0.75}
        size={1.6}
        opacity={active ? 0.6 : 0.08}
        scale={[3.8, 2.4, 3.8]}
        position={[0, 0.3, 0]}
        color="#cbe7ff"
      />
    </group>
  );
}

export default function LightBulb() {
  const [poweredOn, setPoweredOn] = useState(false);
  const [experience, setExperience] = useState<ExperienceId>("neon-city");
  const [userLocked, setUserLocked] = useState(false);

  useEffect(() => {
    const sentinel = document.getElementById(TIMELINE_SENTINEL_ID);
    if (!sentinel) {
      setPoweredOn(true);
      return;
    }

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

  useEffect(() => {
    if (!poweredOn || userLocked) return;
    const id = window.setInterval(() => {
      setExperience((prev) => (prev === "neon-city" ? "cyber-lasers" : "neon-city"));
    }, 9000);
    return () => window.clearInterval(id);
  }, [poweredOn, userLocked]);

  const handleSelect = (option: ExperienceId) => {
    setExperience(option);
    setUserLocked(true);
  };

  const isCityActive = poweredOn && experience === "neon-city";
  const isLaserActive = poweredOn && experience === "cyber-lasers";
  const activeExperience = EXPERIENCE_OPTIONS.find((item) => item.id === experience) ?? EXPERIENCE_OPTIONS[0];

  return (
    <section className="relative -mt-16 flex min-h-screen flex-col items-center justify-start pt-0">
      <div className="flex flex-col items-center">
        <span className="h-14 w-px bg-gradient-to-b from-cyan-200/70 via-cyan-200/20 to-transparent" />
        <div
          className={clsx(
            "relative h-[240px] w-[240px] md:h-[300px] md:w-[300px]",
            poweredOn ? "drop-shadow-[0_0_60px_rgba(125,221,255,0.35)]" : ""
          )}
        >
          <span
            className={clsx(
              "pointer-events-none absolute inset-0 transition-all duration-500 ease-out",
              poweredOn
                ? "scale-105 bg-[radial-gradient(circle_at_center,rgba(126,230,255,0.55)_0%,rgba(126,230,255,0.2)_45%,rgba(0,0,0,0)_75%)]"
                : "opacity-0"
            )}
            aria-hidden
          />
          <Canvas
            camera={{ position: [0, 0.1, 4.1], fov: 36 }}
            gl={{ alpha: true, antialias: true }}
            style={{ width: "100%", height: "100%" }}
          >
            <hemisphereLight intensity={0.35} groundColor="#0f172a" color="#bef8ff" />
            <ambientLight intensity={poweredOn ? 0.32 : 0.12} />
            <pointLight position={[0.2, 2.4, 3.8]} intensity={poweredOn ? 2.4 : 0.4} color={BULB_GLOW} />
            <pointLight position={[-1.6, -2.3, -2.8]} intensity={poweredOn ? 0.7 : 0.18} color="#c084fc" />
            <Suspense fallback={null}>
              <BulbModel poweredOn={poweredOn} />
              <NeonCity active={isCityActive} />
              <LaserScene active={isLaserActive} />
            </Suspense>
          </Canvas>
        </div>
        <div className="mt-8 flex flex-col items-center gap-4 px-6">
          <div className="flex w-full max-w-[360px] items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur">
            {EXPERIENCE_OPTIONS.map((option) => {
              const active = experience === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleSelect(option.id)}
                  className={clsx(
                    "flex-1 rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] transition-all",
                    active
                      ? "bg-gradient-to-r from-pink-400/70 via-teal-300/60 to-sky-400/70 text-white shadow-[0_0_20px_rgba(148,233,255,0.35)]"
                      : "text-white/60 hover:text-white/80"
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
          <p className="text-center text-sm text-white/70 md:max-w-[420px]">
            {activeExperience.tagline}
          </p>
          <p className="max-w-[460px] text-center text-xs text-white/50">
            {activeExperience.description}
          </p>
          {!userLocked && poweredOn && (
            <p className="text-center text-[10px] uppercase tracking-[0.38em] text-white/30">
              Auto cycling â€” tap to lock one in
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
