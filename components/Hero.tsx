
import React, { Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import HeroScene from './3d/HeroScene';

interface HeroProps {
  onNavigate: (view: 'home' | 'collections') => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const { scrollY } = useScroll();
  
  // Parallax effects - slowed down for calming effect
  const textY = useTransform(scrollY, [0, 500], [0, 150]);
  const textOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const bgY = useTransform(scrollY, [0, 500], [0, 50]);

  return (
    <section className="relative h-[110vh] w-full overflow-hidden flex flex-col justify-center items-center bg-primary">
      {/* Background - 3D Scene */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute inset-0 z-0 opacity-80"
      >
        <Canvas camera={{ position: [0, 0, 6], fov: 35 }} dpr={[1, 1.5]}>
          <Suspense fallback={null}>
             <Environment resolution={512}>
                <group rotation={[-Math.PI / 2, 0, 0]}>
                  {/* Cooler lighting for moonlight feel */}
                  <Lightformer intensity={1.5} rotation-x={Math.PI / 2} position={[0, 4, -9]} scale={[10, 10, 1]} color="#f1f5f9" />
                  <Lightformer intensity={0.8} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[10, 2, 1]} color="#bae6fd" />
                  <Lightformer intensity={0.3} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 2, 1]} color="#94a3b8" />
                </group>
              </Environment>
            <HeroScene />
          </Suspense>
        </Canvas>
        
        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-transparent to-primary"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_var(--tw-colors-primary)_120%)]"></div>
      </motion.div>

      {/* Editorial Content */}
      <motion.div 
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center"
      >
        <div className="overflow-hidden mb-8">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
             <span className="font-sans text-accent/80 tracking-[0.5em] text-[10px] font-medium uppercase border border-white/10 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm">
               Est. 2024 — The Archive
             </span>
          </motion.div>
        </div>
        
        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-white leading-[0.9] tracking-tight mb-8 drop-shadow-2xl">
          <motion.span 
            initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="block"
          >
            MONSOON
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            className="block italic font-light text-white/60"
          >
            BEADS
          </motion.span>
        </h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
          className="font-sans text-accent/60 max-w-md mx-auto leading-relaxed text-sm md:text-base mb-12 tracking-wide font-light"
        >
          Wearable atmosphere sculpted from glass and light. 
          <br className="hidden md:block"/>
          A collection defined by the silence of rain.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
        >
          <button 
            onClick={() => onNavigate('collections')}
            className="btn-luxury group px-12 py-5 rounded-sm"
          >
            <span className="relative z-10 flex items-center gap-4 font-sans text-[11px] font-bold tracking-[0.25em] uppercase text-white group-hover:text-highlight transition-colors">
              Enter The Store
              <ArrowRight size={14} className="text-white/50 group-hover:text-highlight transition-all duration-500 group-hover:translate-x-1" />
            </span>
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll Hint */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/20"
      >
        <span className="text-[9px] uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-white/0 via-white/20 to-white/0"></div>
      </motion.div>
    </section>
  );
};

export default Hero;
