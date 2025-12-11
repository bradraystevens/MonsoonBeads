import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, Menu, X, Heart } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled 
            ? 'bg-primary/80 backdrop-blur-lg border-b border-white/5 py-4' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-serif font-bold tracking-widest text-white cursor-pointer"
            >
              MONSOON<span className="text-accent font-light italic">BEADS</span>
            </motion.div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-12 font-sans text-xs uppercase tracking-[0.2em] text-gray-300">
            {['Collections', 'Atelier', 'Our Story', 'Journal'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(' ', '-')}`} 
                className="hover:text-white transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-2 left-1/2 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
              </a>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            <AnimatePresence>
              {isSearchOpen ? (
                <motion.div 
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 200, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="relative hidden md:block"
                >
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    className="bg-secondary/50 border border-white/10 rounded-full py-1 px-4 text-sm text-white focus:outline-none focus:border-accent w-full"
                    autoFocus
                    onBlur={() => setIsSearchOpen(false)}
                  />
                </motion.div>
              ) : (
                <button onClick={() => setIsSearchOpen(true)} className="text-gray-300 hover:text-white transition-colors">
                  <Search size={20} />
                </button>
              )}
            </AnimatePresence>
            
            <button className="text-gray-300 hover:text-white transition-colors hidden md:block">
              <Heart size={20} />
            </button>

            <button 
              onClick={onOpenCart}
              className="text-gray-300 hover:text-white transition-colors relative"
            >
              <ShoppingBag size={20} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-2 -right-2 bg-accent text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-primary flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-2xl font-serif text-white">Menu</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-white">
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col space-y-8 text-2xl font-serif text-gray-300">
              {['Collections', 'Atelier', 'Our Story', 'Journal', 'Account'].map((item) => (
                <a 
                  key={item} 
                  href="#" 
                  className="hover:text-accent transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;