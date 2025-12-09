import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, ContactShadows, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const HeroBead: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      meshRef.current.rotation.x = Math.cos(t / 4) / 8 + 0.1;
      meshRef.current.rotation.y = Math.sin(t / 4) / 8;
      meshRef.current.rotation.z = (1 + Math.sin(t / 1.5)) / 20;
      meshRef.current.position.y = (1 + Math.sin(t / 1.5)) / 10;
    }
  });

  return (
    <group dispose={null}>
      <Float
        speed={1.5} 
        rotationIntensity={0.5} 
        floatIntensity={0.5}
      >
        <mesh ref={meshRef} scale={1.8}>
          <sphereGeometry args={[1, 64, 64]} />
          {/* 
            MeshTransmissionMaterial gives that premium glass/liquid look.
            It simulates light passing through the object.
          */}
          <MeshTransmissionMaterial
            backside
            backsideThickness={5}
            thickness={2}
            roughness={0.05}
            transmission={1}
            ior={1.5}
            chromaticAberration={0.06} // Subtle rainbow effect like wet glass
            anisotropy={0.1}
            distortion={0.1}
            distortionScale={0.3}
            temporalDistortion={0.5}
            color="#eef2ff"
            bg="transparent"
          />
        </mesh>
      </Float>
      
      {/* Soft Particles - Simulating Mist */}
      <Sparkles 
        count={50} 
        scale={10} 
        size={4} 
        speed={0.4} 
        opacity={0.4}
        color="#CBD5E1"
      />

      <ContactShadows 
        resolution={512} 
        scale={10} 
        blur={2} 
        opacity={0.5} 
        far={10} 
        color="#94A3B8" 
      />
      
      {/* Lighting for drama */}
      <directionalLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
      <ambientLight intensity={0.5} color="#e0f2fe" />
    </group>
  );
};

export default HeroBead;