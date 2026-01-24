import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

/* ---------------- SCROLL-REVEALED STARFIELD ---------------- */

function StarField({ scrollProgressRef }) {
  const pointsRef = useRef(null);

  const COUNT = 420;

  const { basePositions, currentPositions, directions } = useMemo(() => {
    const basePositions = new Float32Array(COUNT * 3);
    const directions = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
      // Deep-space distribution
      const r = Math.random() * 2.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = (Math.random() - 0.5) * 5;

      basePositions.set([x, y, z], i * 3);
      directions.set([x * 2.2, y * 2.2, z * 1.4], i * 3);
    }

    const currentPositions = new Float32Array(basePositions);

    return { basePositions, currentPositions, directions };
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;

    const t = scrollProgressRef.current;
    const posAttr = pointsRef.current.geometry.attributes.position;
    const material = pointsRef.current.material;

    // Position animation (reversible)
    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      posAttr.array[i3]     = basePositions[i3]     + directions[i3]     * t;
      posAttr.array[i3 + 1] = basePositions[i3 + 1] + directions[i3 + 1] * t;
      posAttr.array[i3 + 2] = basePositions[i3 + 2] + directions[i3 + 2] * t;
    }
    posAttr.needsUpdate = true;

    /* ---------- BALANCED INTENSITY ---------- */

    // Smooth ramp: visible early, controlled later
    const reveal = Math.min(Math.pow(t, 0.75) * 2.2, 1);

    material.opacity = reveal * 0.6;          // visible, not overpowering
    material.size    = 0.010 + reveal * 0.018; // ambient scale, no flares
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={currentPositions}
          count={currentPositions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        color="#7fdfe0"
        size={0.01}
        opacity={0}
        transparent
        depthWrite={false}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ---------------- BACKGROUND SCENE ---------------- */

export default function Background3D() {
  const progressRef = useRef(0);

  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) return;

    const onScroll = () => {
      const rect = hero.getBoundingClientRect();
      const total = rect.height || 1;

      const t = Math.min(Math.max(-rect.top / total, 0), 1);
      progressRef.current = t;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 52 }}>
        <ambientLight intensity={0.25} />
        <StarField scrollProgressRef={progressRef} />
      </Canvas>
    </div>
  );
}