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

      // Radial dispersion vectors
      // INCREASED SPEED: Multipliers increased from 2.2 to 7.0
      // This ensures stars move significantly even during fast scrolling
      directions.set(
        [x * 7.0, y * 7.0, z * 5.0],
        i * 3
      );
    }

    // CLONE: Create a separate array for the buffer attribute to mutate.
    // basePositions remains static so the animation can reset every time.
    const currentPositions = new Float32Array(basePositions);

    return { basePositions, currentPositions, directions };
  }, []);

  useFrame(() => {
    const t = scrollProgressRef.current; // 0 → 1 (hero-relative)

    const posAttr = pointsRef.current.geometry.attributes.position;
    const material = pointsRef.current.material;

    // STAR POSITIONS (reversible)
    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      // Read from immutable basePositions, write to mutable posAttr
      // This logic ensures the animation works EVERY time you scroll
      posAttr.array[i3]     = basePositions[i3]     + directions[i3]     * t;
      posAttr.array[i3 + 1] = basePositions[i3 + 1] + directions[i3 + 1] * t;
      posAttr.array[i3 + 2] = basePositions[i3 + 2] + directions[i3 + 2] * t;
    }
    posAttr.needsUpdate = true;

    /* ---------------- FASTER REVEAL ---------------- */
    // Changed t * 8 to t * 20
    // Stars now reach full brightness at just 5% scroll depth
    const reveal = Math.min(t * 20, 1);

    material.opacity = reveal * 0.5;          
    material.size = 0.012 + reveal * 0.03;    
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        {/* IMPORTANT: Use currentPositions here, not basePositions */}
        <bufferAttribute
          attach="attributes-position"
          array={currentPositions} 
          count={currentPositions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        color="#9cf6f6"
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
      const total = rect.height;

      // Hero-relative progress: 0 → 1 → 0
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
        <ambientLight intensity={0.3} />
        <StarField scrollProgressRef={progressRef} />
      </Canvas>
    </div>
  );
}