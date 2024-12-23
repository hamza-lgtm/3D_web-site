import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3, Color } from 'three';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ParticleProps {
  count: number;
}

const Particles = ({ count = 2000 }: ParticleProps) => {
  const points = useRef<THREE.Points>(null!);
  
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const color = new Color();
    
    for (let i = 0; i < count; i++) {
      // Create a sphere distribution
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const radius = Math.random() * 30 + 10; // Radius between 10 and 40
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Create a gradient color effect
      const hue = (positions[i * 3] + 40) / 80; // Map x position to hue
      color.setHSL(hue, 0.6, 0.5);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    return { positions, colors };
  }, [count]);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (points.current) {
      // Rotate the entire particle system
      points.current.rotation.y = time * 0.05;
      points.current.rotation.x = Math.sin(time * 0.03) * 0.2;
      
      // Update individual particle positions
      const positions = points.current.geometry.attributes.position.array as Float32Array;
      const colors = points.current.geometry.attributes.color.array as Float32Array;
      const color = new Color();
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const x = positions[i3];
        const y = positions[i3 + 1];
        const z = positions[i3 + 2];
        
        // Add wave motion
        positions[i3 + 1] = y + Math.sin(time + x * 0.1) * 0.1;
        
        // Update colors based on position
        const hue = (Math.sin(time * 0.1 + x * 0.01) + 1) * 0.5;
        color.setHSL(hue, 0.6, 0.5);
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;
      }
      
      points.current.geometry.attributes.position.needsUpdate = true;
      points.current.geometry.attributes.color.needsUpdate = true;
    }
  });
  
  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlePositions.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particlePositions.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </points>
  );
};

const Background3D = () => {
  return (
    <>
      <color attach="background" args={['#000000']} />
      <fog attach="fog" args={['#000000', 30, 100]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Particles count={3000} />
      
      {/* Add subtle glow effect */}
      <mesh position={[0, 0, -50]}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial
          color="#000033"
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </>
  );
};

export default Background3D;
