import React, { Suspense, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShoppingBag, Menu, X, ArrowRight, Play, Droplets } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Environment, Loader, Lightformer } from '@react-three/drei';

// Components
import HeroScene from './components/3d/HeroScene';
import ProductGallery from './components/ProductGallery';
import InteractivePlayground from './components/InteractivePlayground';
import AboutSection from './components/AboutSection';
import ReviewsSection from './components/ReviewsSection';
import Footer from './components/Footer';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl font-serif font-semibold tracking-widest text-monsoon-900 cursor-pointer">
          MONSOON<span className="font-light italic text-monsoon-500">BEADS</span>
        </div>
        
        <div className="hidden md:flex space-x-12 font-sans text-sm font-medium tracking-wide text-monsoon-700">
          {['Collections', 'Atelier', 'Our Story', 'Journal'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="hover:text-monsoon-900 transition-colors relative group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-monsoon-900 transition-all group-hover:w-full duration-300"></span>
            </a>
          ))}
        </div>

        <div className="flex items-center space-x-6">
          <button className="text-monsoon-800 hover:text-monsoon-600 transition-colors">
            <ShoppingBag size={20} strokeWidth={1.5} />
          </button>
          <button className="md:hidden text-monsoon-800" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, 100]);

  return (
    <div className="bg-monsoon-50 text-monsoon-900 min-h-screen selection:bg-monsoon-200">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
            <Suspense fallback={null}>
              {/* Procedural Environment to replace failing HDRI fetch */}
              <Environment resolution={512}>
                <group rotation={[-Math.PI / 2, 0, 0]}>
                  <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, -9]} scale={[10, 10, 1]} />
                  <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[10, 2, 1]} />
                  <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[10, 2, 1]} />
                  <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 2, 1]} />
                </group>
              </Environment>
              <HeroScene />
            </Suspense>
          </Canvas>
        </div>
        
        <motion.div 
          style={{ opacity, y }}
          className="absolute inset-0 z-10 flex flex-col justify-center items-center pointer-events-none text-center px-4"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
            className="font-serif text-5xl md:text-8xl text-monsoon-900 font-light mb-6 tracking-tight leading-tight"
          >
            Handcrafted <br/> <span className="italic text-monsoon-500">Luxury</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="font-sans text-monsoon-600 tracking-widest text-xs md:text-sm uppercase mb-12"
          >
            Inspired by the Monsoon Rain
          </motion.p>

          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 1.4 }}
             className="pointer-events-auto flex gap-6"
          >
            <button className="px-8 py-3 bg-monsoon-900 text-white font-sans text-sm tracking-widest hover:bg-monsoon-800 transition-all duration-500 ease-out shadow-lg shadow-monsoon-200/50">
              SHOP COLLECTION
            </button>
            <button className="px-8 py-3 border border-monsoon-900/20 text-monsoon-900 font-sans text-sm tracking-widest hover:bg-white/50 backdrop-blur-sm transition-all duration-500 ease-out">
              DISCOVER
            </button>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-monsoon-400">
          <Droplets size={24} strokeWidth={1} />
        </div>
      </section>

      {/* SECTIONS */}
      <ProductGallery />
      <InteractivePlayground />
      <AboutSection />
      <ReviewsSection />
      <Footer />
      
      <Loader />
    </div>
  );
};

export default App;