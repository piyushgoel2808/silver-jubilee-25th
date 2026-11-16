'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface LanternProps {
  count?: number;
  scrollProgressRef?: React.MutableRefObject<number>;
}

/**
 * Multi-part 3D Floating Sky Lanterns + Inner Glowing Flame Cores
 */
function LanternField({ count = 38, scrollProgressRef }: LanternProps) {
  const outerMeshRef = useRef<THREE.InstancedMesh>(null);
  const innerCoreRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const coreDummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 42;
      const y = (Math.random() - 0.5) * 36;
      const z = -4 - Math.random() * 32;
      const speedY = 0.25 + Math.random() * 0.38;
      const swaySpeed = 0.45 + Math.random() * 0.9;
      const swayScale = 0.35 + Math.random() * 0.45;
      const scale = 0.32 + Math.random() * 0.42;
      temp.push({ x, y, z, speedY, swaySpeed, swayScale, scale, initialY: y });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!outerMeshRef.current || !innerCoreRef.current) return;
    const time = state.clock.getElapsedTime();
    const scroll = scrollProgressRef?.current || 0;

    particles.forEach((p, i) => {
      let currentY = p.initialY + ((time * p.speedY) % 42) - 14;
      currentY -= scroll * 14;
      const currentX = p.x + Math.sin(time * p.swaySpeed + i) * p.swayScale;
      const currentZ = p.z + (scroll * 8) % 15;

      dummy.position.set(currentX, currentY, currentZ);
      dummy.scale.set(p.scale, p.scale * 1.4, p.scale);
      dummy.rotation.y = Math.sin(time * 0.45 + i) * 0.25;
      dummy.rotation.z = Math.cos(time * 0.7 + i) * 0.06;
      dummy.updateMatrix();
      outerMeshRef.current?.setMatrixAt(i, dummy.matrix);

      // Inner flickering flame core
      const flicker = 0.85 + Math.sin(time * 6 + i * 2) * 0.18;
      coreDummy.position.set(currentX, currentY - p.scale * 0.25, currentZ);
      coreDummy.scale.set(p.scale * 0.45 * flicker, p.scale * 0.55 * flicker, p.scale * 0.45 * flicker);
      coreDummy.updateMatrix();
      innerCoreRef.current?.setMatrixAt(i, coreDummy.matrix);
    });

    outerMeshRef.current.instanceMatrix.needsUpdate = true;
    innerCoreRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      {/* 1. Translucent Mulberry Silk Outer Shell */}
      <instancedMesh ref={outerMeshRef} args={[undefined, undefined, count]}>
        <cylinderGeometry args={[0.55, 0.42, 1.35, 14, 1, true]} />
        <meshStandardMaterial
          color="#FFB300"
          emissive="#FF8F00"
          emissiveIntensity={2.8}
          roughness={0.25}
          transparent
          opacity={0.88}
          side={THREE.DoubleSide}
        />
      </instancedMesh>

      {/* 2. White-Hot Incandescent Flame Core */}
      <instancedMesh ref={innerCoreRef} args={[undefined, undefined, count]}>
        <sphereGeometry args={[0.3, 10, 10]} />
        <meshBasicMaterial color="#FFF9C4" transparent opacity={0.95} />
      </instancedMesh>
    </group>
  );
}

function StarField({ count = 220 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const goldColor = new THREE.Color('#FFF4C2');
    const amberColor = new THREE.Color('#FFD54F');
    const roseColor = new THREE.Color('#FFCDD2');

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 85;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 65;
      pos[i * 3 + 2] = -12 - Math.random() * 38;

      const choice = Math.random();
      const c = choice > 0.6 ? goldColor : choice > 0.3 ? amberColor : roseColor;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = time * 0.008;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.16} vertexColors transparent opacity={0.75} blending={THREE.AdditiveBlending} />
    </points>
  );
}

function CameraRig({ scrollProgressRef }: { scrollProgressRef?: React.MutableRefObject<number> }) {
  useFrame((state) => {
    const scroll = scrollProgressRef?.current || 0;
    state.camera.position.z = 18 - scroll * 9;
    state.camera.position.y = 1.8 - scroll * 3.5;
    state.camera.lookAt(0, 0, -8);
  });
  return null;
}

export default function ThreeBackground({
  scrollProgress = 0,
}: {
  scrollProgress?: number;
}) {
  const scrollRef = useRef<number>(scrollProgress);
  scrollRef.current = scrollProgress;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 1.8, 18], fov: 58 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[0, 10, 6]} color="#FFD54F" intensity={2.6} distance={38} />
        <pointLight position={[-12, -4, -8]} color="#FF8F00" intensity={1.8} distance={42} />

        <CameraRig scrollProgressRef={scrollRef} />
        <StarField count={220} />
        <LanternField count={38} scrollProgressRef={scrollRef} />
      </Canvas>
    </div>
  );
}
