
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const HeroScene: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      // Gentle, hypnotic rotation
      meshRef.current.rotation.x = Math.sin(t / 4) / 4;
      meshRef.current.rotation.y = Math.sin(t / 2) / 4;
    }
  });

  return (
    <group dispose={null}>
      <Float
        speed={1.5} 
        rotationIntensity={0.1} 
        floatIntensity={0.4} 
        floatingRange={[-0.1, 0.1]}
      >
        <mesh ref={meshRef} scale={1.5}>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshTransmissionMaterial
            backside
            backsideThickness={1}
            thickness={2}
            roughness={0.05}
            transmission={1}
            ior={1.45} // Slightly lower IOR for water/glass feel
            chromaticAberration={0.06} // Reduced for elegance
            anisotropy={0.1}
            distortion={0.3}
            distortionScale={0.3}
            temporalDistortion={0.1}
            color="#e2e8f0" // Silver/Pearl tint
            bg="transparent"
          />
        </mesh>
      </Float>
      
      {/* Atmospheric Particles - Rain/Mist feeling */}
      <Sparkles 
        count={60} 
        scale={10} 
        size={2} 
        speed={0.1} 
        opacity={0.4}
        color="#bae6fd" // Pale blue
      />
      
      {/* Background depth particles */}
      <Sparkles 
        count={30} 
        scale={15} 
        size={4} 
        speed={0.05} 
        opacity={0.1}
        color="#ffffff"
      />

      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#e0f2fe" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#94a3b8" />
    </group>
  );
};

export default HeroScene;
