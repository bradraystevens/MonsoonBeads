
import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  currentView?: 'home' | 'collections';
  onNavigate?: (view: 'home' | 'collections') => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, currentView = 'home', onNavigate }) => {
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    setIsScrolled(latest > 50);
    if (latest > 100 && latest > previous) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  const handleNavClick = (e: React.MouseEvent, item: string) => {
    e.preventDefault();
    if (!onNavigate) return;

    if (item === 'Collections') {
      onNavigate('collections');
    } else if (item === 'Logo' || item === 'Home') {
      onNavigate('home');
    } else {
      if (currentView !== 'home') {
        onNavigate('home');
        setTimeout(() => {
          const id = item.toLowerCase().replace(' ', '-');
          const element = document.getElementById(id);
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      } else {
        const id = item.toLowerCase().replace(' ', '-');
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navItems = ['Collections', 'Our Story', 'Journal'];

  return (
    <>
      <motion.nav 
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -100, opacity: 0 },
        }}
        animate={isHidden ? "hidden" : "visible"}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ${
          isScrolled 
            ? 'bg-primary/80 backdrop-blur-md border-b border-white/5 py-4' 
            : 'bg-transparent py-8'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-xl md:text-2xl font-serif font-bold tracking-widest text-white cursor-pointer select-none mix-blend-difference"
              onClick={(e) => handleNavClick(e as any, 'Logo')}
            >
              MONSOON
            </motion.div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-12">
            {navItems.map((item, idx) => (
              <motion.a 
                key={item} 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                href={`#${item.toLowerCase().replace(' ', '-')}`} 
                onClick={(e) => handleNavClick(e, item)}
                className="relative group py-2"
              >
                <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-muted group-hover:text-white transition-colors duration-500">
                    {item}
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-500 ease-out group-hover:w-full" />
              </motion.a>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-6">
            <button className="text-muted hover:text-white transition-colors hidden md:block">
              <Search size={18} />
            </button>
            <button 
              onClick={onOpenCart}
              className="text-muted hover:text-white transition-colors relative"
            >
              <ShoppingBag size={18} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1.5 -right-1.5 bg-accent text-primary text-[9px] w-3.5 h-3.5 flex items-center justify-center rounded-full font-bold"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: "tween", duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-primary flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="text-xl font-serif text-white tracking-widest">MONSOON</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-white">
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col space-y-6">
              {navItems.map((item, idx) => (
                <motion.a 
                  key={item} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  href="#" 
                  className="text-3xl font-serif text-muted hover:text-white transition-colors"
                  onClick={(e) => {
                    handleNavClick(e as any, item);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
