"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, Stars } from "@react-three/drei";
import * as THREE from "three";

function OrbitalSystem() {
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);

  useFrame(({ clock }, delta) => {
    if (ringA.current) ringA.current.rotation.z += delta * 0.12;
    if (ringB.current) ringB.current.rotation.x += delta * 0.08;
  });

  return (
    <group>
      <mesh ref={ringA} rotation={[0.75, 0.18, 0.1]}>
        <torusGeometry args={[1.8, 0.009, 10, 180]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.72} />
      </mesh>
      <mesh ref={ringB} rotation={[1.18, 0.45, 0.42]}>
        <torusGeometry args={[2.08, 0.006, 8, 180]} />
        <meshBasicMaterial color="#818cf8" transparent opacity={0.5} />
      </mesh>
      <mesh rotation={[Math.PI / 2.15, 0.25, 0.35]}>
        <torusGeometry args={[2.34, 0.004, 8, 180]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

function DigitalCompanion({ reducedMotion }: { reducedMotion: boolean }) {
  const root = useRef<THREE.Group>(null);
  const visor = useRef<THREE.Mesh>(null);
  const leftEye = useRef<THREE.Mesh>(null);
  const rightEye = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Group>(null);

  useFrame(({ clock, pointer }, delta) => {
    if (!root.current || reducedMotion) return;
    const t = clock.elapsedTime;
    root.current.position.y = THREE.MathUtils.damp(root.current.position.y, Math.sin(t * 0.9) * 0.09, 4, delta);
    root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, pointer.x * 0.25 + Math.sin(t * 0.35) * 0.055, 3.5, delta);
    root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, -pointer.y * 0.13, 3.5, delta);
    if (visor.current) {
      const material = visor.current.material as THREE.MeshPhysicalMaterial;
      material.emissiveIntensity = 0.22 + (Math.sin(t * 1.5) + 1) * 0.07;
    }
    if (leftEye.current && rightEye.current) {
      const blink = Math.sin(t * 0.52) > 0.985 ? 0.08 : 1;
      leftEye.current.scale.y = THREE.MathUtils.damp(leftEye.current.scale.y, blink, 22, delta);
      rightEye.current.scale.y = THREE.MathUtils.damp(rightEye.current.scale.y, blink, 22, delta);
    }
    if (ring.current) ring.current.rotation.y += delta * 0.18;
  });

  const shell = "#17243a";
  const metal = "#9db5d0";

  return (
    <group>
      <group ref={root} position={[0, -0.1, 0]}>
        {/* Back shell and shoulders */}
        <mesh position={[0, -0.55, -0.05]} castShadow>
          <sphereGeometry args={[0.79, 48, 48]} />
          <meshPhysicalMaterial color={shell} metalness={0.82} roughness={0.22} clearcoat={0.8} />
        </mesh>
        <mesh position={[0, -0.35, 0.47]}>
          <boxGeometry args={[0.68, 0.52, 0.12]} />
          <meshPhysicalMaterial color="#0d1829" metalness={0.65} roughness={0.25} />
        </mesh>
        <mesh position={[0, -0.34, 0.55]}>
          <boxGeometry args={[0.37, 0.12, 0.035]} />
          <meshStandardMaterial color="#67e8f9" emissive="#22d3ee" emissiveIntensity={1.8} />
        </mesh>
        <mesh position={[0, -0.09, 0.55]}>
          <boxGeometry args={[0.24, 0.035, 0.03]} />
          <meshBasicMaterial color="#a5f3fc" />
        </mesh>

        {/* Arms */}
        <mesh position={[-0.86, -0.43, 0.04]} rotation={[0, 0, -0.23]} castShadow>
          <capsuleGeometry args={[0.16, 0.72, 8, 18]} />
          <meshPhysicalMaterial color={metal} metalness={0.7} roughness={0.28} />
        </mesh>
        <mesh position={[0.86, -0.43, 0.04]} rotation={[0, 0, 0.23]} castShadow>
          <capsuleGeometry args={[0.16, 0.72, 8, 18]} />
          <meshPhysicalMaterial color={metal} metalness={0.7} roughness={0.28} />
        </mesh>
        <mesh position={[-0.94, -0.89, 0.08]}>
          <sphereGeometry args={[0.19, 32, 32]} />
          <meshPhysicalMaterial color="#0e1a2b" metalness={0.9} roughness={0.18} />
        </mesh>
        <mesh position={[0.94, -0.89, 0.08]}>
          <sphereGeometry args={[0.19, 32, 32]} />
          <meshPhysicalMaterial color="#0e1a2b" metalness={0.9} roughness={0.18} />
        </mesh>

        {/* Neck */}
        <mesh position={[0, 0.36, 0]}>
          <cylinderGeometry args={[0.22, 0.26, 0.3, 32]} />
          <meshStandardMaterial color="#7188a5" metalness={0.85} roughness={0.3} />
        </mesh>

        {/* Head */}
        <group position={[0, 1.08, 0]}>
          <mesh castShadow>
            <sphereGeometry args={[0.76, 64, 64]} />
            <meshPhysicalMaterial color="#24364f" metalness={0.72} roughness={0.2} clearcoat={1} clearcoatRoughness={0.12} />
          </mesh>
          {/* Face visor */}
          <mesh ref={visor} position={[0, -0.03, 0.49]} scale={[0.87, 0.63, 0.3]}>
            <sphereGeometry args={[0.63, 64, 64]} />
            <meshPhysicalMaterial color="#071524" metalness={0.72} roughness={0.14} clearcoat={1} emissive="#0e7490" emissiveIntensity={0.28} />
          </mesh>
          {/* Expressive eyes */}
          <mesh ref={leftEye} position={[-0.24, 0.02, 0.68]} scale={[1, 1, 0.5]}>
            <sphereGeometry args={[0.075, 32, 32]} />
            <meshBasicMaterial color="#a5f3fc" />
          </mesh>
          <mesh ref={rightEye} position={[0.24, 0.02, 0.68]} scale={[1, 1, 0.5]}>
            <sphereGeometry args={[0.075, 32, 32]} />
            <meshBasicMaterial color="#a5f3fc" />
          </mesh>
          <mesh position={[0, -0.2, 0.68]}>
            <torusGeometry args={[0.08, 0.012, 8, 36, Math.PI]} />
            <meshBasicMaterial color="#67e8f9" />
          </mesh>
          {/* Side audio/communication modules */}
          <mesh position={[-0.73, 0.02, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 0.16, 40]} />
            <meshPhysicalMaterial color="#0b1728" metalness={0.92} roughness={0.16} />
          </mesh>
          <mesh position={[0.73, 0.02, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 0.16, 40]} />
            <meshPhysicalMaterial color="#0b1728" metalness={0.92} roughness={0.16} />
          </mesh>
          <mesh position={[-0.82, 0.02, 0.01]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.11, 0.018, 8, 32]} />
            <meshBasicMaterial color="#67e8f9" />
          </mesh>
          <mesh position={[0.82, 0.02, 0.01]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.11, 0.018, 8, 32]} />
            <meshBasicMaterial color="#67e8f9" />
          </mesh>
          {/* Top sensor */}
          <mesh position={[0, 0.75, 0]}>
            <cylinderGeometry args={[0.055, 0.09, 0.22, 24]} />
            <meshStandardMaterial color="#8ca9c6" metalness={0.85} roughness={0.22} />
          </mesh>
          <mesh position={[0, 0.88, 0]}>
            <sphereGeometry args={[0.07, 24, 24]} />
            <meshBasicMaterial color="#67e8f9" />
          </mesh>
        </group>

        {/* Lower body */}
        <mesh position={[-0.34, -1.25, 0]} rotation={[0, 0, 0.05]}>
          <capsuleGeometry args={[0.18, 0.48, 8, 20]} />
          <meshPhysicalMaterial color="#7188a5" metalness={0.8} roughness={0.25} />
        </mesh>
        <mesh position={[0.34, -1.25, 0]} rotation={[0, 0, -0.05]}>
          <capsuleGeometry args={[0.18, 0.48, 8, 20]} />
          <meshPhysicalMaterial color="#7188a5" metalness={0.8} roughness={0.25} />
        </mesh>
        <mesh position={[-0.36, -1.62, 0.06]}>
          <boxGeometry args={[0.42, 0.18, 0.58]} />
          <meshPhysicalMaterial color="#0d1a2d" metalness={0.75} roughness={0.25} />
        </mesh>
        <mesh position={[0.36, -1.62, 0.06]}>
          <boxGeometry args={[0.42, 0.18, 0.58]} />
          <meshPhysicalMaterial color="#0d1a2d" metalness={0.75} roughness={0.25} />
        </mesh>

        <group ref={ring} position={[0, -1.86, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.06, 0.018, 10, 100]} />
            <meshBasicMaterial color="#67e8f9" transparent opacity={0.8} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.22, 0.006, 8, 100]} />
            <meshBasicMaterial color="#818cf8" transparent opacity={0.55} />
          </mesh>
        </group>
      </group>
      <OrbitalSystem />
    </group>
  );
}

function StaticCompanion() {
  return (
    <div className="hero-scene-static-fallback" aria-hidden="true">
      <div className="hero-scene-static-orbit hero-scene-static-orbit-one" />
      <div className="hero-scene-static-orbit hero-scene-static-orbit-two" />
      <div className="hero-scene-static-robot">
        <div className="static-robot-antenna" />
        <div className="static-robot-head"><i /><i /></div>
        <div className="static-robot-body"><i /></div>
        <div className="static-robot-arm static-robot-arm-left" />
        <div className="static-robot-arm static-robot-arm-right" />
      </div>
    </div>
  );
}

export function HeroScene() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);

  return (
    <div className={`hero-scene-canvas${reducedMotion ? " is-static" : ""}`} aria-label="A three-dimensional digital companion" role="img">
      {reducedMotion ? (
        <StaticCompanion />
      ) : (
      <Canvas
        fallback={<StaticCompanion />}
        dpr={[1, 1.45]}
        camera={{ position: [0, 0.08, 7.2], fov: 36 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        frameloop={reducedMotion ? "demand" : "always"}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[3.5, 5, 5]} intensity={2.1} color="#dbeafe" />
        <pointLight position={[-3, 1, 2]} intensity={35} distance={8} color="#2563eb" />
        <pointLight position={[3, -1, 1]} intensity={24} distance={7} color="#22d3ee" />
        <pointLight position={[0, 3, -2]} intensity={20} distance={6} color="#818cf8" />
        <Stars radius={24} depth={22} count={900} factor={2.2} saturation={0.2} fade speed={reducedMotion ? 0 : 0.25} />
        <Sparkles count={34} scale={[5.5, 5.5, 3]} size={2.4} speed={reducedMotion ? 0 : 0.25} opacity={0.7} color="#8be9ff" />
        <Float speed={reducedMotion ? 0 : 0.7} rotationIntensity={reducedMotion ? 0 : 0.12} floatIntensity={reducedMotion ? 0 : 0.18}>
          <DigitalCompanion reducedMotion={reducedMotion} />
        </Float>
      </Canvas>
      )}
      <div className="hero-scene-vignette" aria-hidden="true" />
    </div>
  );
}
