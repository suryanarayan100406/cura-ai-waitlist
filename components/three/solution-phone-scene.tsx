"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Html,
  RoundedBox,
  ScrollControls,
  useScroll,
} from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

interface SolutionPhoneSceneProps {
  activeIndex: number;
  progress: number;
  labels: string[];
}

function PhoneModel({
  activeIndex,
  progress,
  labels,
}: Omit<SolutionPhoneSceneProps, "labels"> & { labels: string[] }) {
  const groupRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Mesh>(null);
  const scroll = useScroll();

  const colorStops = useMemo(
    () => [
      "#DDF3EA",
      "#C9EEDC",
      "#B4E9CF",
      "#D4F5E5",
      "#D8F0E3",
      "#C5EBD8",
      "#E7F8EF",
      "#D9F3E7",
    ],
    []
  );

  useFrame((state) => {
    if (!groupRef.current || !screenRef.current) {
      return;
    }

    const composedProgress = Math.max(progress, scroll.offset);
    const frameIndex = Math.round(composedProgress * (labels.length - 1));

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      -0.18 + activeIndex * 0.028,
      0.08
    );
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.35) * 0.04;

    const activeColor = new THREE.Color(
      colorStops[Math.min(colorStops.length - 1, frameIndex)]
    );
    const material = screenRef.current.material as THREE.MeshStandardMaterial;
    material.color.lerp(activeColor, 0.08);
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef}>
        <RoundedBox args={[2.6, 5, 0.24]} radius={0.24} smoothness={5}>
          <meshStandardMaterial color="#13241D" metalness={0.35} roughness={0.4} />
        </RoundedBox>

        <RoundedBox
          ref={screenRef}
          args={[2.2, 4.5, 0.05]}
          radius={0.18}
          smoothness={4}
          position={[0, 0, 0.13]}
        >
          <meshStandardMaterial color="#DDF3EA" />
        </RoundedBox>

        <Html transform position={[0, 0.3, 0.18]} distanceFactor={6.5}>
          <div className="w-36 rounded-xl border border-brand-deep/20 bg-white/90 p-2 text-[10px] text-ink shadow-sm">
            <p className="font-semibold text-brand-deep">Live Preview</p>
            <p className="mt-1 text-ink-soft">{labels[activeIndex]}</p>
            <div className="mt-2 h-1.5 rounded-full bg-brand-deep/15" />
            <div className="mt-1 h-1.5 w-3/4 rounded-full bg-brand-bright/35" />
            <div className="mt-1 h-1.5 w-1/2 rounded-full bg-brand-deep/10" />
          </div>
        </Html>
      </group>
    </Float>
  );
}

export default function SolutionPhoneScene(props: SolutionPhoneSceneProps) {
  return (
    <div className="h-full w-full rounded-3xl bg-gradient-to-br from-brand-deep/10 to-brand-bright/10">
      <Canvas camera={{ position: [0, 0.1, 6], fov: 34 }} dpr={[1, 1.5]}>
        <ambientLight intensity={1.15} />
        <directionalLight position={[2, 2, 2]} intensity={0.9} />
        <pointLight position={[-2, -1, 2]} intensity={0.8} color="#52B788" />

        <ScrollControls pages={props.labels.length} damping={0.2}>
          <PhoneModel {...props} />
        </ScrollControls>
      </Canvas>
    </div>
  );
}
