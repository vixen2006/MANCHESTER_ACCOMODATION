import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

function Building({ position, height, width, depth, color }: {
  position: [number, number, number];
  height: number;
  width: number;
  depth: number;
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const edgesRef = useRef<THREE.LineSegments>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3 + position[0]) * 0.15;
    }
    if (edgesRef.current) {
      edgesRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3 + position[0]) * 0.15;
    }
  });

  const geometry = useMemo(() => new THREE.BoxGeometry(width, height, depth), [width, height, depth]);
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);

  return (
    <group>
      <mesh ref={meshRef} position={position} geometry={geometry}>
        <meshStandardMaterial color={color} transparent opacity={0.4} />
      </mesh>
      <lineSegments ref={edgesRef} position={position} geometry={edges}>
        <lineBasicMaterial color="#3b82f6" transparent opacity={0.8} />
      </lineSegments>
    </group>
  );
}

function CityBuildings() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  const buildings = useMemo(() => {
    const arr = [];
    const seed = 42;
    for (let i = 0; i < 60; i++) {
      const angle = (i / 60) * Math.PI * 2 + ((i * seed) % 7) * 0.1;
      const radius = 3 + ((i * 13 + seed) % 8) * 0.8;
      const height = 0.5 + ((i * 7 + seed) % 10) * 0.3;
      const width = 0.2 + ((i * 3 + seed) % 5) * 0.1;
      const depth = 0.2 + ((i * 11 + seed) % 5) * 0.1;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const colors = ['#0a1a2a', '#0d1b2b', '#08141e', '#0f2333', '#061219'];
      const color = colors[i % colors.length];
      arr.push({
        position: [x, height / 2 - 1, z] as [number, number, number],
        height,
        width,
        depth,
        color,
        key: i,
      });
    }
    return arr;
  }, []);

  return (
    <group ref={groupRef}>
      {buildings.map((b) => (
        <Building key={b.key} {...b} />
      ))}
    </group>
  );
}

function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 200;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#3b82f6" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function CitySceneContent() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 10, 5]} intensity={0.5} color="#2563eb" />
      <pointLight position={[0, 5, 0]} intensity={1} color="#3b82f6" distance={15} />

      <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.3}>
        <CityBuildings />
      </Float>

      <FloatingParticles />
      <Stars radius={50} depth={50} count={1000} factor={2} saturation={0} fade speed={0.5} />
      <fog attach="fog" args={['#0a1015', 5, 25]} />
    </>
  );
}

export default function CityScene({ className }: { className?: string }) {
  return (
    <div className={`absolute inset-0 ${className || ''}`}>
      <Canvas
        camera={{ position: [0, 2, 10], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <CitySceneContent />
      </Canvas>
    </div>
  );
}
