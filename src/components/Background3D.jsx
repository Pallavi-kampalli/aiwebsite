import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/* ---------------- CONTINUOUS STARFIELD (SPIRAL GALAXY) ---------------- */

function StarField() {
  const pointsRef = useRef(null);

  // Increased count for better definition of the spiral shape
  const COUNT = 800;

  // We need two things:
  // 1. "starData" to store the invariant parameters (radius, initial angle, speed, z-depth)
  // 2. "positions" to hold the mutable X/Y/Z coordinates for the buffer attribute
  const { starData, positions } = useMemo(() => {
    const starData = new Float32Array(COUNT * 4); // [radius, angle, speed, z]
    const positions = new Float32Array(COUNT * 3); // [x, y, z]

    for (let i = 0; i < COUNT; i++) {
      // 1. RADIUS: Spread stars out from center (0.2 to 5)
      const r = Math.random() * 5 + 0.2;

      // 2. ANGLE: Create 5 distinct "arms" for a star-like spiral shape
      const branches = 5;
      const branchAngle = ((i % branches) / branches) * Math.PI * 2;
      
      // Add "spin" based on radius to curve the arms (spiral effect)
      // Add randomness to spread them out slightly so it's not a perfect line
      const spinAngle = r * 0.8;
      const randomOffset = (Math.random() - 0.5) * 0.5;
      const finalAngle = branchAngle + spinAngle + randomOffset;

      // 3. SPEED: Inner stars rotate faster, outer stars slower (standard galaxy physics)
      const speed = (Math.random() * 0.2 + 0.1) + (1 / r) * 0.5;

      // 4. Z-DEPTH: Random scatter in height/depth
      const z = (Math.random() - 0.5) * 2;

      // Store params
      starData[i * 4] = r;          // Radius
      starData[i * 4 + 1] = finalAngle; // Initial Angle
      starData[i * 4 + 2] = speed;  // Rotation Speed
      starData[i * 4 + 3] = z;      // Base Z height

      // Set initial positions (though useFrame will immediately overwrite this)
      positions[i * 3] = r * Math.cos(finalAngle);
      positions[i * 3 + 1] = r * Math.sin(finalAngle);
      positions[i * 3 + 2] = z;
    }

    return { starData, positions };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const t = state.clock.getElapsedTime();
    const posAttr = pointsRef.current.geometry.attributes.position;
    const material = pointsRef.current.material;

    // Animate every star
    for (let i = 0; i < COUNT; i++) {
      const i4 = i * 4;
      const i3 = i * 3;

      const r = starData[i4];
      const initialAngle = starData[i4 + 1];
      const speed = starData[i4 + 2];
      const zBase = starData[i4 + 3];

      // Calculate current rotation angle: Initial + (Time * Speed * specificFactor)
      // * 0.1 slows down the overall simulation speed
      const currentAngle = initialAngle - t * speed * 0.1;

      // Convert Polar (Angle, Radius) -> Cartesian (X, Y)
      const x = r * Math.cos(currentAngle);
      const y = r * Math.sin(currentAngle);
      
      // Add a gentle "breathing" wave to the Z axis
      const z = zBase + Math.sin(t * 0.5 + r) * 0.1;

      posAttr.array[i3] = x;
      posAttr.array[i3 + 1] = y;
      posAttr.array[i3 + 2] = z;
    }
    
    posAttr.needsUpdate = true;

    // Twinkling effect: Pulse size slightly based on time
    material.size = 0.018 + Math.sin(t * 2) * 0.010;
    material.opacity = 0.5; // Constant visibility for the galaxy
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        color="#ffffff"
        size={0.015}
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
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <ambientLight intensity={0.25} />
        <StarField />
      </Canvas>
    </div>
  );
}