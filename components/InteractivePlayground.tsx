
import React, { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, MeshTransmissionMaterial, ContactShadows, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import { RefreshCcw, Plus } from 'lucide-react';
import { BeadType } from '../types';

const COLORS = ["#e0f2fe", "#bae6fd", "#7dd3fc", "#cbd5e1", "#f8fafc"];

interface InteractiveBeadProps {
  position: [number, number, number];
  color: string;
}

const InteractiveBead: React.FC<InteractiveBeadProps> = ({ position, color }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const physicsRef = useRef({
    velocity: 0,
    y: position[1] + 5,
    isResting: false,
    bounceCount: 0
  });

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const dt = Math.min(delta, 0.1); 
    const physics = physicsRef.current;
    
    if (!physics.isResting) {
        const gravity = 9.8;
        const bounceFactor = 0.5;
        const floorY = position[1];

        physics.velocity -= gravity * dt;
        physics.y += physics.velocity * dt;

        if (physics.y <= floorY) {
            physics.y = floorY;
            if (Math.abs(physics.velocity) > 0.5) {
                physics.velocity = -physics.velocity * bounceFactor;
                physics.bounceCount++;
            } else {
                physics.velocity = 0;
                physics.isResting = true;
            }
        }

        meshRef.current.position.y = physics.y;
        meshRef.current.rotation.x += physics.velocity * 0.05;
        meshRef.current.rotation.z += physics.velocity * 0.02;
    }
  });

  return (
    <mesh ref={meshRef} position={[position[0], position[1] + 5, position[2]]} castShadow receiveShadow>
      <sphereGeometry args={[0.4, 32, 32]} />
      <MeshTransmissionMaterial
        backside
        backsideThickness={2}
        thickness={1}
        roughness={0.1}
        transmission={1}
        ior={1.5}
        chromaticAberration={0.04}
        anisotropy={0.1}
        distortion={0.2}
        color={color}
        bg="transparent"
      />
    </mesh>
  );
};

const SceneContent: React.FC<{ beads: BeadType[] }> = ({ beads }) => {
  return (
    <group>
      {beads.map((bead) => (
        <InteractiveBead 
          key={bead.id} 
          position={[bead.x, bead.y, bead.z]} 
          color={bead.color} 
        />
      ))}

      <ContactShadows opacity={0.4} scale={10} blur={2} far={4} color="#64748B" />
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 2, 0, 0]}>
            <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, -6]} scale={[10, 10, 1]} />
            <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[10, 2, 1]} />
            <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 2, 1]} />
        </group>
      </Environment>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
    </group>
  );
};

const InteractivePlayground: React.FC = () => {
  const [beads, setBeads] = useState<BeadType[]>([]);

  const addBead = () => {
    if (beads.length > 15) return;
    const x = (Math.random() - 0.5) * 6;
    const z = (Math.random() - 0.5) * 2;
    const id = Math.random().toString(36).substr(2, 9);
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    setBeads(prev => [...prev, { id, x, y: -1, z, color, scale: 1 }]);
  };

  const reset = () => setBeads([]);

  return (
    <section className="py-24" id="atelier">
      <div className="container mx-auto px-6 md:px-12">
        <div className="relative w-full h-[600px] rounded-sm overflow-hidden border border-white/10 bg-[#1e293b]/50">
          
          {/* UI Overlay */}
          <div className="absolute top-0 left-0 w-full p-8 flex justify-between items-start z-10 pointer-events-none">
            <div>
              <h3 className="font-serif text-2xl text-white mb-1">The Atelier</h3>
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-slate-400">Interactive Lab v1.0</p>
            </div>
            <div className="pointer-events-auto flex gap-4">
               <button 
                  onClick={reset} 
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white transition-all"
               >
                 <RefreshCcw size={16} />
               </button>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 pointer-events-auto">
            <button 
              onClick={addBead}
              className="group flex items-center gap-3 px-8 py-4 bg-white text-black font-sans text-xs font-bold tracking-widest uppercase hover:bg-accent hover:text-white transition-colors duration-500"
            >
              <Plus size={16} className="group-hover:rotate-90 transition-transform duration-500" />
              Add Droplet
            </button>
          </div>

          <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 8], fov: 45 }}>
            <Suspense fallback={null}>
              <SceneContent beads={beads} />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </section>
  );
};

export default InteractivePlayground;
