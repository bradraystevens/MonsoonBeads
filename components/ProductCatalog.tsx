
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Product } from '../types';
import GlareHover from './GlareHover';

interface ProductCatalogProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  wishlist: number[];
  onToggleWishlist: (id: number) => void;
}

const ProductCatalog: React.FC<ProductCatalogProps> = ({ products, onAddToCart, onQuickView, wishlist, onToggleWishlist }) => {
  // Filters removed: We only sell Bracelets now.
  
  return (
    <section className="py-40 relative z-10" id="collections">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Editorial Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24 items-end">
           <div className="md:col-span-8">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif text-5xl md:text-7xl text-white mb-8"
              >
                The Bracelet Archive
              </motion.h2>
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: '80px' }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5, ease: "circOut" }}
                className="h-[1px] bg-white/20 mb-8"
              />
              <p className="font-sans text-muted leading-loose max-w-lg tracking-wide font-light text-sm">
                A curated selection of wristwear. Each piece is designed to create a personal atmosphere, 
                blending resilience with fragility. Pure. Focused. Eternal.
              </p>
           </div>
           
           <div className="md:col-span-4 flex justify-end items-end">
             <span className="text-white/20 text-[10px] uppercase tracking-[0.3em] font-sans">
               Viewing {products.length} Artifacts
             </span>
           </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-32">
          {products.map((product, index) => (
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 1.5, 
                ease: [0.22, 1, 0.36, 1],
                delay: index * 0.1
              }}
              key={product.id}
              className={`group flex flex-col ${index % 2 === 1 ? 'md:translate-y-24' : ''}`} // Artistic stagger
            >
              {/* Visual */}
              <div className="relative aspect-[3/4] mb-8 overflow-hidden bg-surface rounded-sm">
                <GlareHover
                  width="100%"
                  height="100%"
                  borderRadius="2px"
                  glareColor="#ffffff"
                  glareOpacity={0.15}
                  glareSize={250}
                  className="shadow-2xl shadow-black/30"
                >
                  <div 
                    className="w-full h-full relative cursor-none"
                    onClick={() => onQuickView(product)}
                  >
                     <img 
                        src={product.images[0]} 
                        alt={product.name}
                        className="w-full h-full object-cover opacity-80 transition-all duration-[2s] ease-[0.22,1,0.36,1] group-hover:scale-110 group-hover:opacity-100"
                     />
                     
                     {/* Subtle Cinematic Darkening on hover */}
                     <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-1000" />
                     
                     {/* Wishlist Button - Minimal */}
                     <div className="absolute top-4 right-4 translate-y-[-10px] opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-out z-10">
                        <button 
                          onClick={(e) => { e.stopPropagation(); onToggleWishlist(product.id); }}
                          className="w-8 h-8 flex items-center justify-center bg-white/5 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black transition-all border border-white/10"
                        >
                           <ArrowUpRight size={14} />
                        </button>
                     </div>
                  </div>
                </GlareHover>
              </div>

              {/* Details - Minimal & Clean */}
              <div className="flex flex-col items-center text-center">
                <h3 className="font-serif text-2xl text-text mb-2 group-hover:text-white transition-colors duration-700 tracking-wide">
                  {product.name}
                </h3>
                <p className="font-sans text-[10px] text-accent/60 mb-4 tracking-wider italic opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                  {product.poeticHeadline}
                </p>
                
                <button 
                  onClick={() => onQuickView(product)}
                  className="text-[10px] font-bold uppercase tracking-[0.25em] text-white border-b border-white/20 hover:border-white pb-1 transition-all duration-500"
                >
                  Explore Piece
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCatalog;
