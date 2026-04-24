"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

interface HeroHeartSceneProps {
  progress?: number;
}

function HeartModel({ progress = 0 }: { progress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const orbitCardRefs = useRef<Array<THREE.Group | null>>([]);
  const { camera } = useThree();

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0.25);
    shape.bezierCurveTo(0, 0.25, -0.55, -0.45, -1.2, -0.1);
    shape.bezierCurveTo(-1.95, 0.3, -1.3, 1.35, -0.6, 1.75);
    shape.bezierCurveTo(-0.05, 2.05, 0.3, 2.45, 0.4, 2.8);
    shape.bezierCurveTo(0.5, 2.45, 0.85, 2.05, 1.4, 1.75);
    shape.bezierCurveTo(2.1, 1.35, 2.75, 0.3, 2, -0.1);
    shape.bezierCurveTo(1.35, -0.45, 0.8, 0.25, 0.8, 0.25);
    shape.bezierCurveTo(0.55, 0.1, 0.2, 0.1, 0, 0.25);

    const extrude = new THREE.ExtrudeGeometry(shape, {
      depth: 0.75,
      bevelEnabled: true,
      bevelSegments: 6,
      bevelSize: 0.08,
      bevelThickness: 0.12,
      curveSegments: 64,
      steps: 1,
    });

    extrude.center();
    return extrude;
  }, []);

  const nodePoints = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const position = geometry.attributes.position;
    const sampleStep = Math.max(1, Math.floor(position.count / 24));

    for (let i = 0; i < position.count; i += sampleStep) {
      points.push(
        new THREE.Vector3(position.getX(i), position.getY(i), position.getZ(i))
      );
    }

    return points;
  }, [geometry]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        progress * 0.25,
        0.06
      );

      const scaled = THREE.MathUtils.lerp(1, 0.55, progress);
      groupRef.current.scale.setScalar(scaled);
    }

    const maxTilt = THREE.MathUtils.degToRad(3);
    camera.rotation.x = THREE.MathUtils.lerp(
      camera.rotation.x,
      -state.pointer.y * maxTilt,
      0.07
    );
    camera.rotation.y = THREE.MathUtils.lerp(
      camera.rotation.y,
      state.pointer.x * maxTilt,
      0.07
    );

    orbitCardRefs.current.forEach((node, index) => {
      if (!node) {
        return;
      }
      const t = state.clock.elapsedTime * 0.25 + index * 2.1;
      node.position.x = Math.cos(t) * 2.2;
      node.position.y = Math.sin(t * 1.2) * 0.8;
      node.position.z = Math.sin(t) * 1.2;
      node.rotation.y = -t;
    });
  });

  return (
    <>
      <group ref={groupRef}>
        <mesh geometry={geometry}>
          <meshStandardMaterial
            color="#52B788"
            wireframe
            transparent
            opacity={Math.max(0.12, 1 - progress * 1.4)}
            roughness={0.3}
            metalness={0.45}
          />
        </mesh>

        {nodePoints.map((point, index) => (
          <mesh key={index} position={point} scale={0.04}>
            <sphereGeometry args={[1, 12, 12]} />
            <meshStandardMaterial
              color="#C5F1DB"
              emissive="#52B788"
              emissiveIntensity={1.2}
            />
          </mesh>
        ))}
      </group>

      {[
        "Prescription scan digitized",
        "Family health profiles",
        "Vitals stabilizing",
      ].map((label, index) => (
        <group
          key={label}
          ref={(node) => {
            orbitCardRefs.current[index] = node;
          }}
        >
          <Html transform distanceFactor={7.2}>
            <div className="glass-card w-36 rounded-xl px-3 py-2 text-xs text-ink shadow-lg">
              {label}
            </div>
          </Html>
        </group>
      ))}

      <Html transform position={[0, -1.9 + progress * 0.45, 0]} distanceFactor={6.8}>
        <div
          className="glass-card w-52 rounded-2xl border-brand-deep/20 p-4 transition"
          style={{ opacity: progress }}
        >
          <p className="text-[11px] uppercase tracking-[0.16em] text-brand-deep">
            Health Dashboard
          </p>
          <div className="mt-3 space-y-2 text-[11px] text-ink-soft">
            <div className="h-2 rounded-full bg-brand-deep/15" />
            <div className="h-2 rounded-full bg-brand-deep/10" />
            <div className="h-2 rounded-full bg-brand-bright/20" />
          </div>
        </div>
      </Html>
    </>
  );
}

export default function HeroHeartScene({ progress = 0 }: HeroHeartSceneProps) {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 38 }} dpr={[1, 1.5]}>
        <ambientLight intensity={1.05} />
        <directionalLight position={[2.2, 3, 2]} intensity={1.25} />
        <pointLight position={[-2, -2, 2]} intensity={0.9} color="#52B788" />

        <HeartModel progress={progress} />

        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
}
