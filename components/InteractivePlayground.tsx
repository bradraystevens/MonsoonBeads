import React, { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, MeshTransmissionMaterial, Center, ContactShadows, Lightformer } from '@react-three/drei';
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
  
  // Physics state stored in refs to avoid re-renders
  const physicsRef = useRef({
    velocity: 0,
    y: position[1] + 5, // Start higher to drop
    isResting: false,
    bounceCount: 0
  });

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // Safety check to prevent NaN propagation
    const dt = Math.min(delta, 0.1); 

    const physics = physicsRef.current;
    
    // Only simulate if not fully resting
    if (!physics.isResting) {
        const gravity = 9.8;
        const bounceFactor = 0.5;
        const floorY = position[1]; // The target resting Y position

        // Apply Gravity
        physics.velocity -= gravity * dt;
        physics.y += physics.velocity * dt;

        // Floor Collision / Bounce Logic
        if (physics.y <= floorY) {
            physics.y = floorY;
            
            // Bounce
            if (Math.abs(physics.velocity) > 0.5) {
                physics.velocity = -physics.velocity * bounceFactor;
                physics.bounceCount++;
            } else {
                // Stop bouncing
                physics.velocity = 0;
                physics.isResting = true;
            }
        }

        // Update Mesh Position
        meshRef.current.position.y = physics.y;
        
        // Slight rotation based on velocity
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
      
      {/* Procedural Environment instead of remote preset */}
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
    if (beads.length > 15) return; // Limit beads for performance
    
    const x = (Math.random() - 0.5) * 6;
    const z = (Math.random() - 0.5) * 2;
    const id = Math.random().toString(36).substr(2, 9);
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    
    // y position is the target floor y
    setBeads(prev => [...prev, { id, x, y: -1, z, color, scale: 1 }]);
  };

  const reset = () => setBeads([]);

  return (
    <section className="h-[80vh] bg-monsoon-50 relative overflow-hidden" id="atelier">
      <div className="absolute top-8 left-0 w-full text-center pointer-events-none z-10 px-4">
        <h3 className="font-serif text-3xl text-monsoon-900 mb-2">The Atelier</h3>
        <p className="font-sans text-xs text-monsoon-500 tracking-widest mb-4">DESIGN YOUR RAIN</p>
        <p className="font-sans text-[10px] text-monsoon-400">Tap 'Add Drop' to create unique beads</p>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex gap-4">
        <button 
          onClick={addBead}
          className="flex items-center gap-2 px-6 py-3 bg-monsoon-900 text-white rounded-full font-sans text-xs tracking-widest hover:bg-monsoon-800 transition-all shadow-lg hover:scale-105 active:scale-95"
        >
          <Plus size={16} />
          ADD DROP
        </button>
        <button 
          onClick={reset}
          className="p-3 bg-white text-monsoon-900 rounded-full hover:bg-monsoon-100 transition-all shadow-md hover:rotate-180 duration-500"
          aria-label="Reset"
        >
          <RefreshCcw size={16} />
        </button>
      </div>

      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 8], fov: 45 }}>
        <Suspense fallback={null}>
          <SceneContent beads={beads} />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default InteractivePlayground;