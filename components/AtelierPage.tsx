
import React, { useState, useRef, Suspense, useEffect, useCallback, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, MeshTransmissionMaterial, ContactShadows, Lightformer, Float } from '@react-three/drei';
import * as THREE from 'three';
import { RefreshCcw, Plus, Volume2, VolumeX, ArrowLeft, MousePointer2, Settings2 } from 'lucide-react';

// --- Audio System ---
const playGlassSound = (velocity: number) => {
  if (typeof window === 'undefined') return;
  
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Procedural glass sound: High pitch sine wave with very fast decay
    const baseFreq = 800;
    const randomOffset = Math.random() * 600;
    osc.frequency.setValueAtTime(baseFreq + randomOffset, ctx.currentTime);
    osc.type = 'sine';

    // Velocity determines volume
    const vol = Math.min(Math.abs(velocity) / 15, 1) * 0.15;
    
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(vol, ctx.currentTime + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  } catch (e) {
    console.warn("Audio playback failed", e);
  }
};

// --- Types ---
interface BeadState {
  id: string;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  rotation: THREE.Euler;
  angularVelocity: THREE.Vector3;
  color: string;
  scale: number;
}

interface Ripple {
  id: string;
  x: number;
  z: number;
  age: number; // 0 to 1
}

// --- Components ---

const RippleEffect: React.FC<{ ripples: Ripple[] }> = ({ ripples }) => {
  return (
    <group>
      {ripples.map((r) => (
        <mesh key={r.id} position={[r.x, 0.02, r.z]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.2 + r.age * 0.8, 0.25 + r.age * 0.8, 32]} />
          <meshBasicMaterial 
            color="white" 
            transparent 
            opacity={(1 - r.age) * 0.4} 
            side={THREE.DoubleSide} 
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
};

const Bead: React.FC<{ 
  data: BeadState; 
  onImpact: (velocity: number, x: number, z: number) => void;
  gravity: number;
}> = ({ data, onImpact, gravity }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Initialize physics state lazily to avoid re-creation on renders
  // We use a ref to hold mutable state separate from props
  const physics = useRef<{
    pos: THREE.Vector3;
    vel: THREE.Vector3;
    rot: THREE.Euler;
    isResting: boolean;
  } | null>(null);

  if (!physics.current) {
    physics.current = {
      pos: data.position.clone(),
      vel: data.velocity.clone(),
      rot: data.rotation.clone(),
      isResting: false
    };
  }

  useFrame((_, delta) => {
    if (!meshRef.current || !physics.current || physics.current.isResting) return;
    
    const dt = Math.min(delta, 0.05); // Cap delta to prevent tunneling
    const s = physics.current;
    
    // Gravity
    s.vel.y -= gravity * dt;

    // Position Update
    s.pos.add(s.vel.clone().multiplyScalar(dt));
    
    // Floor Collision
    const floorY = 0.4; // Radius of bead
    if (s.pos.y < floorY) {
      s.pos.y = floorY;
      
      // Impact logic
      const impactVelocity = Math.abs(s.vel.y);
      if (impactVelocity > 0.5) {
        onImpact(impactVelocity, s.pos.x, s.pos.z);
        s.vel.y = -s.vel.y * 0.6; // Bounce elasticity (glass is rigid but loses energy)
      } else {
        // Rolling / Sliding
        s.vel.y = 0;
        
        // Friction
        s.vel.x *= 0.96;
        s.vel.z *= 0.96;

        // Stop completely if very slow
        if (s.vel.lengthSq() < 0.01) {
             s.isResting = true;
        }
      }
    }

    // Rotation based on movement (simulated rolling)
    if (!s.isResting) {
        s.rot.x += s.vel.z * dt * 2;
        s.rot.z -= s.vel.x * dt * 2;
    }

    // Apply to mesh
    meshRef.current.position.copy(s.pos);
    meshRef.current.rotation.copy(s.rot);
  });

  return (
    <mesh 
      ref={meshRef} 
      // CRITICAL FIX: Pass position as array [x,y,z] instead of Vector3 object
      // This prevents React/Three from trying to freeze/mutate the prop object in StrictMode
      position={[data.position.x, data.position.y, data.position.z]} 
      rotation={[data.rotation.x, data.rotation.y, data.rotation.z]}
      castShadow 
      receiveShadow
    >
      <sphereGeometry args={[0.4, 64, 64]} />
      <MeshTransmissionMaterial
        backside
        backsideThickness={1}
        thickness={2}
        roughness={0.02}
        transmission={1}
        ior={1.5}
        chromaticAberration={0.04}
        anisotropy={0.1}
        distortion={0.0}
        color={data.color}
        bg="transparent"
      />
    </mesh>
  );
};

const AtelierScene: React.FC<{ 
  beads: BeadState[]; 
  onImpact: (v: number, x: number, z: number) => void;
  gravity: number;
  ripples: Ripple[];
}> = ({ beads, onImpact, gravity, ripples }) => {
  return (
    <>
      <group>
        {beads.map((bead) => (
          <Bead key={bead.id} data={bead} onImpact={onImpact} gravity={gravity} />
        ))}
        <RippleEffect ripples={ripples} />
      </group>

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#0f172a" roughness={0.1} metalness={0.5} opacity={0.5} transparent />
      </mesh>
      
      {/* Grid for "Lab" feel */}
      <gridHelper args={[20, 20, 0x444444, 0x222222]} position={[0, 0.01, 0]} />

      <ContactShadows opacity={0.6} scale={20} blur={2} far={4} color="#000000" />
      
      <Environment resolution={512}>
        <group rotation={[-Math.PI / 4, -0.3, 0]}>
            <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} color="#ffffff" />
            <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[10, 2, 1]} color="#8b5cf6" />
            <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 2, 1]} color="#fbbf24" />
        </group>
      </Environment>

      <ambientLight intensity={0.2} />
      <spotLight position={[5, 10, 5]} angle={0.5} penumbra={1} intensity={2} castShadow shadow-bias={-0.0001} />
    </>
  );
};

const COLORS = ["#e0f2fe", "#bae6fd", "#7dd3fc", "#a78bfa", "#fde68a", "#ffffff"];

const AtelierPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [beads, setBeads] = useState<BeadState[]>([]);
  const [gravity, setGravity] = useState(15);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  // Ripple cleanup loop
  useEffect(() => {
    let frameId: number;
    const animateRipples = () => {
      setRipples(prev => {
        if (prev.length === 0) return prev;
        // Age ripples faster for snappier effect
        return prev.map(r => ({ ...r, age: r.age + 0.015 })).filter(r => r.age < 1);
      });
      frameId = requestAnimationFrame(animateRipples);
    };
    frameId = requestAnimationFrame(animateRipples);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const addBead = () => {
    const id = Math.random().toString(36).substr(2, 9);
    const x = (Math.random() - 0.5) * 4;
    const z = (Math.random() - 0.5) * 4;
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    
    // Create new vector instances for the state
    const newBead: BeadState = {
      id,
      position: new THREE.Vector3(x, 8 + Math.random() * 2, z),
      velocity: new THREE.Vector3((Math.random() - 0.5) * 2, -Math.random() * 2, (Math.random() - 0.5) * 2),
      rotation: new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, 0),
      angularVelocity: new THREE.Vector3(Math.random(), Math.random(), Math.random()),
      color,
      scale: 1
    };

    setBeads(prev => [...prev, newBead]);
  };

  const reset = () => {
    setBeads([]);
    setRipples([]);
  };

  const handleImpact = useCallback((velocity: number, x: number, z: number) => {
    if (soundEnabled) playGlassSound(velocity);
    // Add ripple if impact is significant enough
    if (velocity > 1) {
        setRipples(prev => [...prev, { id: Math.random().toString(), x, z, age: 0 }]);
    }
  }, [soundEnabled]);

  return (
    <div className="fixed inset-0 z-50 bg-[#0f172a] text-white overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 w-full z-10 p-8 flex justify-between items-center pointer-events-none">
        <div className="pointer-events-auto">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors uppercase tracking-widest text-xs font-bold"
          >
            <ArrowLeft size={16} />
            Back to Archive
          </button>
        </div>
        <div className="text-right">
           <h1 className="font-serif text-3xl text-white tracking-widest">THE ATELIER</h1>
           <p className="text-accent text-[10px] uppercase tracking-[0.4em]">Physics Lab v2.0</p>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute top-1/2 right-8 -translate-y-1/2 flex flex-col gap-6 z-10">
         <div className="bg-white/5 backdrop-blur-md p-4 rounded-sm border border-white/10 flex flex-col gap-4">
            <button 
              onClick={addBead}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-black hover:bg-accent hover:text-white transition-all shadow-lg group"
              title="Add Bead"
            >
              <Plus size={24} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>
            <button 
              onClick={reset}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white hover:text-black transition-all border border-white/10"
              title="Clear All"
            >
              <RefreshCcw size={20} />
            </button>
            <button 
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`w-12 h-12 flex items-center justify-center rounded-full transition-all border border-white/10 ${soundEnabled ? 'bg-white/10 hover:bg-white hover:text-black' : 'bg-red-500/20 text-red-400'}`}
              title="Toggle Sound"
            >
              {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
         </div>
         
         {/* Gravity Slider */}
         <div className="bg-white/5 backdrop-blur-md p-4 rounded-sm border border-white/10 flex flex-col gap-2 items-center">
             <Settings2 size={16} className="text-slate-400 mb-2" />
             <div className="h-32 w-2 bg-white/10 rounded-full relative">
                <input 
                  type="range" 
                  min="1" 
                  max="30" 
                  value={gravity} 
                  onChange={(e) => setGravity(Number(e.target.value))}
                  className="absolute top-0 left-0 w-32 h-2 -rotate-90 origin-top-left translate-y-32 translate-x-0 opacity-0 cursor-pointer z-10"
                />
                <div 
                   className="absolute bottom-0 left-0 w-full bg-accent rounded-full transition-all duration-300"
                   style={{ height: `${(gravity / 30) * 100}%` }}
                />
             </div>
             <span className="text-[9px] uppercase tracking-widest text-slate-400 mt-2">G-Force</span>
         </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center pointer-events-none opacity-50">
        <div className="flex flex-col items-center gap-2">
           <MousePointer2 size={16} />
           <p className="text-[10px] uppercase tracking-[0.2em]">Click controls to experiment</p>
        </div>
      </div>

      {/* Canvas */}
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 5, 12], fov: 40 }}>
        <color attach="background" args={['#0f172a']} />
        <Suspense fallback={null}>
          <AtelierScene beads={beads} onImpact={handleImpact} gravity={gravity} ripples={ripples} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default AtelierPage;
