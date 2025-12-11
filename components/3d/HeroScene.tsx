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
        speed={2} 
        rotationIntensity={0.2} 
        floatIntensity={0.5} 
        floatingRange={[-0.2, 0.2]}
      >
        <mesh ref={meshRef} scale={1.5}>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshTransmissionMaterial
            backside
            backsideThickness={1}
            thickness={2}
            roughness={0.1}
            transmission={1}
            ior={1.5}
            chromaticAberration={0.1}
            anisotropy={0.2}
            distortion={0.5}
            distortionScale={0.5}
            temporalDistortion={0.1}
            color="#a78bfa" // Light violet tint
            bg="transparent"
          />
        </mesh>
      </Float>
      
      {/* Atmospheric Particles - Rain/Mist feeling */}
      <Sparkles 
        count={80} 
        scale={10} 
        size={3} 
        speed={0.2} 
        opacity={0.3}
        color="#bae6fd"
      />
      
      {/* Background depth particles */}
      <Sparkles 
        count={40} 
        scale={15} 
        size={6} 
        speed={0.1} 
        opacity={0.1}
        color="#8b5cf6"
      />

      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
    </group>
  );
};

export default HeroScene;