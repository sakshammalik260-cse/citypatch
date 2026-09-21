import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Procedural City Grid Component
function CityBlocks({ reducedMotion }) {
  const groupRef = useRef();

  // Generate deterministic grid of architectural blocks
  const blocks = useMemo(() => {
    const items = [];
    const gridSize = 7;
    const spacing = 2.4;
    const offset = (gridSize * spacing) / 2;

    for (let x = 0; x < gridSize; x++) {
      for (let z = 0; z < gridSize; z++) {
        // Pseudo-random deterministic height based on coordinates
        const seed = Math.sin(x * 12.9898 + z * 78.233) * 43758.5453;
        const norm = seed - Math.floor(seed);

        // Make center areas and random streets vary in height
        const isRoad = (x === 3 || z === 3);
        if (isRoad && norm > 0.4) continue; // leave open road corridors

        const height = isRoad ? 0.3 : 0.8 + norm * 3.2;
        const posX = x * spacing - offset;
        const posZ = z * spacing - offset;

        items.push({
          id: `${x}-${z}`,
          pos: [posX, height / 2, posZ],
          size: [1.8, height, 1.8],
          hasBeacon: !isRoad && norm > 0.75,
          beaconColor: norm > 0.88 ? '#f43f5e' : '#14b8a6',
        });
      }
    }
    return items;
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current && !reducedMotion) {
      // Gentle breathing rotation
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.1) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {blocks.map((b) => (
        <group key={b.id} position={b.pos}>
          {/* Building Solid Mesh */}
          <mesh>
            <boxGeometry args={b.size} />
            <meshStandardMaterial
              color="#0d141e"
              roughness={0.7}
              metalness={0.3}
              wireframe={false}
            />
          </mesh>

          {/* Architectural Edge Outline */}
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(...b.size)]} />
            <lineBasicMaterial color="#1e293b" linewidth={1} />
          </lineSegments>

          {/* Civic Alert Beacon (Pulsing node atop building) */}
          {b.hasBeacon && (
            <group position={[0, b.size[1] / 2 + 0.4, 0]}>
              <mesh>
                <sphereGeometry args={[0.12, 12, 12]} />
                <meshBasicMaterial color={b.beaconColor} />
              </mesh>
            </group>
          )}
        </group>
      ))}

      {/* Arterial Road Grid Floor */}
      <gridHelper
        args={[28, 28, '#14b8a6', '#1e293b']}
        position={[0, 0.02, 0]}
      />
    </group>
  );
}

// Scanning Light Plane
function ScanLaser({ reducedMotion }) {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    if (meshRef.current && !reducedMotion) {
      const t = (clock.getElapsedTime() * 0.6) % 1;
      // Sweep back and forth
      meshRef.current.position.z = (t - 0.5) * 20;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[20, 0.4]} />
      <meshBasicMaterial
        color="#14b8a6"
        transparent
        opacity={0.35}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Subtle Spatial Data Particles
function DataParticles({ count = 80, reducedMotion }) {
  const points = useMemo(() => {
    const coords = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      coords[i * 3] = (Math.random() - 0.5) * 24;
      coords[i * 3 + 1] = Math.random() * 6 + 0.5;
      coords[i * 3 + 2] = (Math.random() - 0.5) * 24;
    }
    return coords;
  }, [count]);

  const pointsRef = useRef();

  useFrame(({ clock }) => {
    if (pointsRef.current && !reducedMotion) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#2dd4bf"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Camera Mouse Parallax Rig
function CameraRig({ reducedMotion }) {
  useFrame(({ camera, pointer }) => {
    if (!reducedMotion) {
      // Subtle mouse tracking
      const targetX = pointer.x * 2;
      const targetY = 7 + pointer.y * 1.5;
      camera.position.x += (targetX - camera.position.x) * 0.04;
      camera.position.y += (targetY - camera.position.y) * 0.04;
      camera.lookAt(0, 1.2, 0);
    }
  });
  return null;
}

export default function CityScene() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    const handleMotionChange = (e) => setReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <div className="w-full h-full relative" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 7.5, 12], fov: 45 }}
        dpr={Math.min(window.devicePixelRatio || 1, 1.5)}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#090c10']} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 20, 15]} intensity={0.8} color="#e2e8f0" />
        <pointLight position={[-10, 8, -5]} intensity={0.5} color="#0ea5e9" />

        <CityBlocks reducedMotion={reducedMotion} />
        <ScanLaser reducedMotion={reducedMotion} />
        <DataParticles count={isMobile ? 35 : 70} reducedMotion={reducedMotion} />
        <CameraRig reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
