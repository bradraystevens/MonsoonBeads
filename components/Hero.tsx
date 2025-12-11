import React, { Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import HeroScene from './3d/HeroScene';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background - 3D Scene */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary via-primary/90 to-primary">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
          <Suspense fallback={null}>
             {/* Procedural Lighting */}
             <Environment resolution={512}>
                <group rotation={[-Math.PI / 2, 0, 0]}>
                  <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 4, -9]} scale={[10, 10, 1]} color="#8b5cf6" />
                  <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[10, 2, 1]} color="#fbbf24" />
                  <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 2, 1]} color="#bae6fd" />
                </group>
              </Environment>
            <HeroScene />
          </Suspense>
        </Canvas>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-90"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent opacity-50"></div>
      </div>

      {/* Content */}
      <motion.div 
        style={{ y: y1, opacity }}
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-sans text-accent tracking-[0.3em] text-xs md:text-sm uppercase mb-6"
        >
          Inspired by the Monsoon Rain
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-tight mb-8"
        >
          Handcrafted <br/> 
          <span className="italic font-light bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">Luxury</span>
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col md:flex-row gap-6 justify-center items-center"
        >
          <button className="group relative px-8 py-4 bg-white/5 backdrop-blur-md border border-white/20 text-white font-sans text-sm tracking-widest uppercase overflow-hidden transition-all hover:bg-white/10 hover:border-accent hover:scale-105">
            <span className="relative z-10 flex items-center gap-3">
              Shop Collection 
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 bg-accent/20 transform -translate-x-full transition-transform duration-500 group-hover:translate-x-0"></div>
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 z-10"
      >
        <ChevronDown size={24} />
      </motion.div>
    </section>
  );
};

export default Hero;