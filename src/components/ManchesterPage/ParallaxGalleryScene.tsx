import { useRef, Suspense, Component, ReactNode, ErrorInfo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Image, Float } from '@react-three/drei';
import * as THREE from 'three';

class ErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error: Error, info: ErrorInfo) { console.error(error, info); }
  render() { return this.state.hasError ? this.props.fallback : this.props.children; }
}

function ParallaxImages() {
  const group = useRef<THREE.Group>(null);
  const { width, height } = useThree((state) => state.viewport);
  
  useFrame((state) => {
    if (group.current) {
      const targetX = (state.pointer.x * width) / 10;
      const targetY = (state.pointer.y * height) / 10;
      
      group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, targetX, 0.1);
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, targetY, 0.1);
    }
  });

  return (
    <group ref={group}>
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
        <Image 
          position={[-width / 4, 0, -4]} 
          scale={[5, 6]} 
          url="https://picsum.photos/seed/manchester1/800/1000" 
          transparent opacity={0.6}
        />
      </Float>
      
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.8}>
        <Image 
          position={[width / 3, -1, -2]} 
          scale={[4, 5]} 
          url="https://picsum.photos/seed/sports2/800/1000" 
          transparent opacity={0.7}
        />
      </Float>

      <Float speed={2} rotationIntensity={0.3} floatIntensity={1}>
        <Image 
          position={[-width / 3, -2, 1]} 
          scale={[3, 4]} 
          url="https://picsum.photos/seed/city3/800/1000" 
          transparent opacity={0.8}
        />
      </Float>

      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
        <Image 
          position={[width / 4, 2, 0]} 
          scale={[4.5, 3.5]} 
          url="https://picsum.photos/seed/fashion4/800/1000" 
          transparent opacity={0.6}
        />
      </Float>

      <Float speed={1.8} rotationIntensity={0.1} floatIntensity={0.6}>
        <Image 
          position={[0, -3, -1]} 
          scale={[6, 4]} 
          url="https://picsum.photos/seed/bridge5/800/1000" 
          transparent opacity={0.5}
        />
      </Float>

      <Float speed={1.1} rotationIntensity={0.2} floatIntensity={0.2}>
        <Image 
          position={[-1, 3, -3]} 
          scale={[5, 5]} 
          url="https://picsum.photos/seed/night6/800/1000" 
          transparent opacity={0.4}
        />
      </Float>
    </group>
  );
}

export default function ParallaxGalleryScene({ className }: { className?: string }) {
  return (
    <div className={`absolute inset-0 ${className || ''} bg-[#080d12]`}>
      <ErrorBoundary fallback={<div className="absolute inset-0 bg-[#080d12]" />}>
        <Canvas 
          camera={{ position: [0, 0, 8], fov: 45 }}
          gl={{ antialias: false, alpha: false }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={1} />
          <Suspense fallback={null}>
            <ParallaxImages />
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}
