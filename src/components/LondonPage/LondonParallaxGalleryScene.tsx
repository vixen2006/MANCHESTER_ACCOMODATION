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
      {/* St James Park / London Eye — large left background */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
        <Image 
          position={[-width / 4, 0, -4]} 
          scale={[5, 6]} 
          url="/london-images/london-park.jpg" 
          transparent opacity={0.65}
        />
      </Float>
      
      {/* Red-brick university building — right mid */}
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.8}>
        <Image 
          position={[width / 3, -1, -2]} 
          scale={[4, 5]} 
          url="/london-images/london-building.jpg" 
          transparent opacity={0.75}
        />
      </Float>

      {/* Luxury dining with Big Ben — lower left foreground */}
      <Float speed={2} rotationIntensity={0.3} floatIntensity={1}>
        <Image 
          position={[-width / 3, -2, 1]} 
          scale={[3.5, 4.5]} 
          url="/london-images/london-dining.jpg" 
          transparent opacity={0.85}
        />
      </Float>

      {/* Grand library interior — upper right */}
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
        <Image 
          position={[width / 4, 2.5, 0]} 
          scale={[5, 3.5]} 
          url="/london-images/london-library.jpg" 
          transparent opacity={0.65}
        />
      </Float>

      {/* Nightclub / nightlife — lower center background */}
      <Float speed={1.8} rotationIntensity={0.1} floatIntensity={0.6}>
        <Image 
          position={[0.5, -3, -1]} 
          scale={[6, 4]} 
          url="/london-images/london-nightlife.jpg" 
          transparent opacity={0.5}
        />
      </Float>

      {/* Tower Bridge — upper left mid layer */}
      <Float speed={1.3} rotationIntensity={0.15} floatIntensity={0.7}>
        <Image 
          position={[-width / 5, 3.5, -2.5]} 
          scale={[4.5, 3.2]} 
          url="/london-images/london-bridge.jpg" 
          transparent opacity={0.6}
        />
      </Float>
    </group>
  );
}

export default function LondonParallaxGalleryScene({ className }: { className?: string }) {
  return (
    <div className={`absolute inset-0 ${className || ''} bg-[#120d08]`}>
      <ErrorBoundary fallback={<div className="absolute inset-0 bg-[#120d08]" />}>
        <Canvas 
          camera={{ position: [0, 0, 8], fov: 45 }}
          gl={{ antialias: false, alpha: false }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={1.2} />
          <Suspense fallback={null}>
            <ParallaxImages />
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}
