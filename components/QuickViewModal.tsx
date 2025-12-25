
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Star, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose, onAddToCart }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Ensure images array exists, fallback to single image if needed
  const displayImages = product.images && product.images.length > 0 ? product.images : ["https://picsum.photos/600/800?blur"];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* Dark Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#020617]/95 backdrop-blur-md"
      />
      
      {/* Content Container - Full Screen Feel */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full h-full md:h-[95vh] md:w-[95vw] md:max-w-7xl md:rounded-lg overflow-hidden bg-primary shadow-2xl flex flex-col md:flex-row border border-white/5"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-20 p-3 bg-black/20 hover:bg-white hover:text-black rounded-full text-white transition-all duration-300 border border-white/10 backdrop-blur-md"
        >
          <X size={20} />
        </button>

        {/* Visual Experience (Gallery) */}
        <div 
          className="w-full md:w-[55%] h-[45vh] md:h-full relative bg-surface group flex flex-row md:flex-col overflow-x-auto md:overflow-x-hidden md:overflow-y-auto scrollbar-hide snap-x md:snap-none scroll-smooth"
          ref={containerRef}
        >
          {displayImages.map((img, idx) => (
            <div key={idx} className="min-w-full md:min-w-0 md:w-full h-full md:h-auto flex-shrink-0 relative snap-center">
              <motion.img 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "0px 0px -20% 0px" }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                src={img} 
                alt={`${product.name} - View ${idx + 1}`} 
                className="w-full h-full md:h-auto object-cover"
              />
              
              {/* Subtle gradient overlay on each image for text readability if needed */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-40 md:opacity-0" />
            </div>
          ))}

          {/* Poetic Overlay - Fixed relative to the gallery container on Desktop, overlaid on Mobile */}
          <div className="absolute bottom-6 left-6 right-6 z-10 pointer-events-none mix-blend-difference">
             <p className="font-serif italic text-xl md:text-2xl text-white/90 leading-relaxed max-w-md drop-shadow-lg">
               "{product.emotionalBenefit}"
             </p>
          </div>
          
          {/* Mobile Scroll Hint */}
          {displayImages.length > 1 && (
            <div className="absolute bottom-4 right-4 md:hidden z-10 bg-black/40 backdrop-blur px-3 py-1 rounded-full border border-white/10">
              <span className="text-[9px] uppercase tracking-widest text-white">
                Swipe
              </span>
            </div>
          )}
        </div>

        {/* Narrative & Purchase (Right Panel) */}
        <div className="w-full md:w-[45%] h-[55vh] md:h-full overflow-y-auto bg-primary relative flex flex-col border-l border-white/5">
          <div className="p-8 md:p-16 flex flex-col min-h-full">
            
            {/* Header */}
            <div className="mb-8">
               <motion.span 
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.2 }}
                 className="text-accent text-xs font-bold tracking-[0.25em] uppercase mb-4 block"
               >
                 Monsoon Collection — {product.category}
               </motion.span>
               
               <motion.h2 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.3, duration: 0.8 }}
                 className="font-serif text-3xl md:text-5xl text-white mb-2 leading-tight"
               >
                 {product.name}
               </motion.h2>
               
               <motion.p 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 0.4 }}
                 className="font-sans text-sm text-accent/60 italic mb-6"
               >
                 {product.poeticHeadline}
               </motion.p>
               
               <div className="flex items-center gap-4 border-b border-white/5 pb-8">
                 <p className="text-2xl md:text-3xl font-serif text-white">${product.price}</p>
                 <div className="flex items-center gap-1 text-accent/80 text-xs">
                    <Star size={12} fill="currentColor" />
                    <span>5.0 (Archive Rated)</span>
                 </div>
               </div>
            </div>

            {/* Narrative */}
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.5 }}
               className="mb-12"
            >
               <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-4">The Atmosphere</h3>
               <p className="text-monsoon-200 font-sans leading-loose text-sm font-light">
                 {product.description}
               </p>
            </motion.div>

            {/* Trust Signals */}
            <div className="grid grid-cols-2 gap-4 mb-12">
               <div className="flex items-start gap-3 p-4 bg-white/5 rounded-sm border border-white/5">
                 <ShieldCheck size={18} className="text-accent mt-0.5" />
                 <div>
                   <h4 className="text-white text-[10px] uppercase font-bold tracking-wider mb-1">Handcrafted</h4>
                   <p className="text-monsoon-400 text-[10px]">Artisan finished in Pakistan</p>
                 </div>
               </div>
               <div className="flex items-start gap-3 p-4 bg-white/5 rounded-sm border border-white/5">
                 <Truck size={18} className="text-accent mt-0.5" />
                 <div>
                   <h4 className="text-white text-[10px] uppercase font-bold tracking-wider mb-1">Shipping</h4>
                   <p className="text-monsoon-400 text-[10px]">Cash on Delivery Available</p>
                 </div>
               </div>
            </div>

            {/* Actions */}
            <div className="mt-auto pt-8 border-t border-white/5">
               <button 
                  onClick={() => {
                    onAddToCart(product);
                    onClose();
                  }}
                  className="w-full bg-white text-primary py-5 font-sans text-xs font-bold tracking-[0.2em] uppercase hover:bg-accent hover:text-primary transition-all duration-500 flex items-center justify-center gap-3 group shadow-lg shadow-white/5"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Add to Collection</span>
                  <ShoppingBag size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                <p className="text-center text-[10px] text-monsoon-500 mt-4 tracking-wide">
                  Limited edition. Crafted in small batches.
                </p>
            </div>
            
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default QuickViewModal;
