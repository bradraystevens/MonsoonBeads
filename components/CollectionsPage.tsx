
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Heart, ShoppingBag, Eye, Search } from 'lucide-react';
import { Product } from '../types';
import GlareHover from './GlareHover';

interface CollectionsPageProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  wishlist: number[];
  onToggleWishlist: (id: number) => void;
}

const CollectionsPage: React.FC<CollectionsPageProps> = ({ 
  products, 
  onAddToCart, 
  onQuickView, 
  wishlist, 
  onToggleWishlist 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { scrollY } = useScroll();
  
  // Header animation
  const headerOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const headerY = useTransform(scrollY, [0, 300], [0, -100]);
  const headerScale = useTransform(scrollY, [0, 300], [1, 0.95]);
  const headerPointerEvents = useTransform(scrollY, (latest) => latest > 200 ? 'none' : 'auto');

  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (searchQuery) {
      result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return result;
  }, [products, searchQuery]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 100, scale: 0.95 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "tween",
        ease: [0.22, 1, 0.36, 1],
        duration: 1.2
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen relative w-full">
      {/* Background layer */}
      <div className="fixed inset-0 bg-primary/20 pointer-events-none z-0" />

      {/* Fixed Header */}
      <motion.div 
        style={{ 
          opacity: headerOpacity, 
          y: headerY,
          scale: headerScale,
          pointerEvents: headerPointerEvents as any,
        }}
        className="fixed top-0 left-0 right-0 z-20 pt-32 pb-8 px-6 md:px-12 flex flex-col md:flex-row md:items-end justify-between gap-6 origin-top"
      >
        <div>
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-accent font-sans text-xs tracking-[0.3em] uppercase mb-3 block"
          >
            The Archive
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="font-serif text-5xl md:text-7xl text-white tracking-wide"
          >
            All Bracelets
          </motion.h1>
        </div>

        {/* Search Bar - Minimal */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative w-full md:w-80 group"
        >
           <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-700" />
           <input 
             type="text" 
             placeholder="Search collection..." 
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             className="relative w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-6 text-white text-sm placeholder-monsoon-500 focus:outline-none focus:border-accent/40 focus:bg-white/10 transition-all duration-500 shadow-2xl shadow-black/10 backdrop-blur-md"
           />
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-monsoon-500 group-focus-within:text-accent transition-colors duration-500 z-10" size={18} />
        </motion.div>
      </motion.div>

      {/* Spacer */}
      <div className="h-[40vh]" />

      {/* Main Grid Content */}
      <div className="relative z-30 px-6 md:px-12 pb-32">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProducts.map((product) => (
              <motion.div
                layout
                variants={itemVariants}
                key={product.id}
                className="group flex flex-col h-full cursor-pointer"
                onClick={() => onQuickView(product)}
              >
                {/* Glare Container */}
                <div className="relative w-full aspect-[3/4] mb-6 perspective-1000 bg-surface rounded-sm overflow-hidden">
                  <GlareHover 
                    width="100%" 
                    height="100%" 
                    borderRadius="2px" 
                    glareColor="#ffffff" 
                    glareOpacity={0.2}
                    className="shadow-2xl shadow-black/40 transition-shadow duration-700 group-hover:shadow-accent/20"
                  >
                    <div className="w-full h-full relative overflow-hidden">
                      {/* Image */}
                      <img 
                        src={product.images[0]} 
                        alt={product.name}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-[0.22,1,0.36,1]"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />

                      {/* Floating Actions */}
                      <div className="absolute top-4 right-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500 ease-out z-20">
                         <button 
                          onClick={(e) => { e.stopPropagation(); onToggleWishlist(product.id); }}
                          className="p-3 bg-black/40 backdrop-blur-xl border border-white/10 text-white hover:bg-white hover:text-red-500 transition-all duration-300 rounded-full shadow-lg"
                        >
                          <Heart size={18} fill={wishlist.includes(product.id) ? "currentColor" : "none"} className={wishlist.includes(product.id) ? "text-red-500" : ""} />
                        </button>
                      </div>

                      {/* Quick Add */}
                       <button 
                          onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
                          className="absolute inset-x-0 bottom-0 py-4 bg-white/10 backdrop-blur-md border-t border-white/10 text-white font-sans text-xs font-bold tracking-[0.2em] uppercase translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-[0.22,1,0.36,1] flex items-center justify-center gap-3 hover:bg-white hover:text-primary"
                        >
                          <ShoppingBag size={14} /> Add to Collection
                        </button>
                    </div>
                  </GlareHover>
                </div>

                {/* Info Section */}
                <div className="flex flex-col px-2 text-center items-center">
                   <h3 className="font-serif text-xl text-white/80 group-hover:text-white transition-colors duration-500 leading-none mb-2">
                     {product.name}
                   </h3>
                   <span className="font-sans text-sm font-medium text-accent/80 group-hover:text-accent transition-colors duration-500 mb-2">
                     ${product.price}
                   </span>
                   <p className="text-[10px] text-monsoon-400 font-sans tracking-wide leading-relaxed italic opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                     {product.poeticHeadline}
                   </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default CollectionsPage;
