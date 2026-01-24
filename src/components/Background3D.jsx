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
      directions.set(
        [x * 2.2, y * 2.2, z * 1.4],
        i * 3
      );
    }

    // CLONE: We need a separate array for the buffer attribute to mutate.
    // basePositions must remain static to serve as the reference point.
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
      // Read from the IMMUTABLE basePositions
      // Write to the MUTABLE posAttr.array (which is currentPositions)
      posAttr.array[i3]     = basePositions[i3]     + directions[i3]     * t;
      posAttr.array[i3 + 1] = basePositions[i3 + 1] + directions[i3 + 1] * t;
      posAttr.array[i3 + 2] = basePositions[i3 + 2] + directions[i3 + 2] * t;
    }
    posAttr.needsUpdate = true;

    /* ---------------- KEY IDEA ----------------
       Rapid reveal using nonlinear ramp
       invisible → strong → stable
    */
    const reveal = Math.min(t * 8, 1); // rapid ramp-up in first 12–15% scroll

    material.opacity = reveal * 0.9;          // visibility
    material.size = 0.012 + reveal * 0.03;    // perceived brightness via size
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={currentPositions} // Use the CLONED array here
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