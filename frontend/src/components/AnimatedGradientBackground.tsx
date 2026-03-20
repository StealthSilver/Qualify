import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Subtle cyan and blue color palette
const FIBER_COLORS = [
  new THREE.Color(0x00CED1),  // Dark turquoise
  new THREE.Color(0x4682B4),  // Steel blue
  new THREE.Color(0x5F9EA0),  // Cadet blue
  new THREE.Color(0x87CEEB),  // Sky blue
  new THREE.Color(0x6495ED),  // Cornflower blue
  new THREE.Color(0x00BFFF),  // Deep sky blue
  new THREE.Color(0x48D1CC),  // Medium turquoise
  new THREE.Color(0x1E90FF),  // Dodger blue
  new THREE.Color(0x20B2AA),  // Light sea green
  new THREE.Color(0x7B68EE),  // Medium slate blue
];

// Configuration for dense fiber bundle with twisting strands
const FIBER_CONFIG = {
  count: 800,             // Very dense fiber bundle
  segmentsPerFiber: 400,  // Extra smooth for helical motion
  fiberWidth: 0.015,      // Thinner strands for density
  helixAmplitude: 0.4,    // Amplitude of helical motion
  helixFrequency: 4.0,    // Frequency of helical twisting
  bundleRadius: 0.8,      // Radius of the fiber bundle
  length: 50,             // Extended length to go beyond viewport
};

// Single fiber strand with helical twisting motion
function AnimatedFiber({ 
  angleInBundle,
  radiusInBundle,
  color, 
  phaseOffset,
  helixSpeed,
  depthOffset
}: { 
  angleInBundle: number;
  radiusInBundle: number;
  color: THREE.Color; 
  phaseOffset: number;
  helixSpeed: number;
  depthOffset: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  
  // Create fiber path extending beyond viewport with helical motion
  const geometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const segments = FIBER_CONFIG.segmentsPerFiber;
    
    // Extend path beyond viewport - start way above, end way below/right
    const startX = -5;
    const startY = 25;  // Way above viewport
    const startZ = depthOffset;
    
    const endX = 15;    // Way to the right, beyond viewport
    const endY = -25;   // Way below viewport
    const endZ = depthOffset;
    
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      
      // Linear interpolation for main path
      const baseX = startX + (endX - startX) * t;
      const baseY = startY + (endY - startY) * t;
      const baseZ = startZ + (endZ - startZ) * t;
      
      // Individual helical motion for each strand
      // Each strand spirals around its own path
      const helixAngle = t * Math.PI * FIBER_CONFIG.helixFrequency + angleInBundle + phaseOffset;
      const helixRadius = radiusInBundle;
      
      // Helical offset perpendicular to the main direction
      const helixX = Math.cos(helixAngle) * helixRadius * FIBER_CONFIG.helixAmplitude;
      const helixZ = Math.sin(helixAngle) * helixRadius * FIBER_CONFIG.helixAmplitude;
      
      points.push(new THREE.Vector3(
        baseX + helixX,
        baseY,
        baseZ + helixZ
      ));
    }
    
    const pathCurve = new THREE.CatmullRomCurve3(points);
    const tubeGeometry = new THREE.TubeGeometry(
      pathCurve,
      segments,
      FIBER_CONFIG.fiberWidth,
      8,
      false
    );
    
    return tubeGeometry;
  }, [angleInBundle, radiusInBundle, phaseOffset, depthOffset]);

  // Animated helical motion
  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    // Animate the phase to create moving helical pattern
    // This makes each strand appear to spiral along its path
    const animatedPhase = time * helixSpeed;
    
    // Update geometry with animated helix
    const positions = meshRef.current.geometry.attributes.position;
    const segments = FIBER_CONFIG.segmentsPerFiber;
    
    // Subtle pulsing opacity
    const pulse = 0.75 + Math.sin(time * 1.0 + phaseOffset) * 0.15;
    materialRef.current.opacity = pulse;
    
    // Subtle emissive intensity variation
    materialRef.current.emissiveIntensity = 0.25 + Math.sin(time * 0.6 + phaseOffset) * 0.15;
  });

  return (
    <mesh ref={meshRef} geometry={geometry} castShadow receiveShadow>
      <meshStandardMaterial 
        ref={materialRef}
        color={color}
        emissive={color}
        emissiveIntensity={0.25}
        transparent 
        opacity={0.8}
        roughness={0.2}
        metalness={0.7}
        envMapIntensity={1.5}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Dense fiber bundle with helical arrangement
function FiberField() {
  const groupRef = useRef<THREE.Group>(null);
  
  const fibers = useMemo(() => {
    const fiberData = [];
    
    // Create very dense helical bundle with multiple layers
    for (let i = 0; i < FIBER_CONFIG.count; i++) {
      // More layers for denser packing
      const layer = Math.floor(i / 50);
      const angleStep = (i % 50) / 50;
      
      // Angle around the bundle
      const angle = angleStep * Math.PI * 2;
      
      // Radius from center (multiple concentric layers)
      const radius = FIBER_CONFIG.bundleRadius * (0.2 + (layer / 8) * 0.8);
      
      // Depth variation for more 3D density
      const depth = (Math.random() - 0.5) * 2;
      
      fiberData.push({
        id: i,
        angleInBundle: angle,
        radiusInBundle: radius,
        color: FIBER_COLORS[Math.floor(Math.random() * FIBER_COLORS.length)].clone(),
        phaseOffset: Math.random() * Math.PI * 2,
        helixSpeed: 0.3 + Math.random() * 0.4,
        depthOffset: depth,
      });
    }
    
    return fiberData;
  }, []);

  // Slowly rotate entire bundle for additional twisting effect
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <>
      {/* Soft lighting for illumination */}
      <ambientLight intensity={0.6} />
      
      {/* Key light from top */}
      <directionalLight 
        position={[5, 15, 10]} 
        intensity={1.3} 
        color="#e0f7ff"
      />
      
      {/* Fill light */}
      <pointLight position={[-8, 0, 8]} intensity={0.9} color="#87CEEB" />
      
      {/* Accent light from right */}
      <pointLight position={[15, -10, 8]} intensity={0.8} color="#4682B4" />
      
      {/* Additional depth light */}
      <pointLight position={[0, 0, -5]} intensity={0.5} color="#20B2AA" />
      
      <group ref={groupRef}>
        {fibers.map((fiber) => (
          <AnimatedFiber
            key={fiber.id}
            angleInBundle={fiber.angleInBundle}
            radiusInBundle={fiber.radiusInBundle}
            color={fiber.color}
            phaseOffset={fiber.phaseOffset}
            helixSpeed={fiber.helixSpeed}
            depthOffset={fiber.depthOffset}
          />
        ))}
      </group>
    </>
  );
}

// Main component - positioned with adjustable z-index
export default function AnimatedGradientBackground() {
  return (
    <div className="fixed inset-0 z-[1]">
      <Canvas
        camera={{ position: [0, 0, 28], fov: 50 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <FiberField />
      </Canvas>
    </div>
  );
}
