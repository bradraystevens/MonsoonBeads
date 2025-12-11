import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ChevronDown, Heart, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../types';

interface ProductCatalogProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  wishlist: number[];
  onToggleWishlist: (id: number) => void;
}

const ProductCatalog: React.FC<ProductCatalogProps> = ({ products, onAddToCart, onQuickView, wishlist, onToggleWishlist }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = ['All', 'Necklaces', 'Bracelets', 'Earrings', 'Rings'];
  
  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <section className="py-24 bg-primary relative" id="collections">
      <div className="container mx-auto px-6">
        
        {/* Header & Filters */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="font-serif text-4xl text-white mb-4">Our Collections</h2>
            <p className="text-muted font-sans max-w-md">
              Each piece is a frozen moment of rain, crafted with precision and soul.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full border text-sm font-sans transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'bg-white text-primary border-white' 
                    : 'bg-transparent text-muted border-white/10 hover:border-white/40 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={product.id}
                className="group relative bg-secondary rounded-sm overflow-hidden"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden bg-gray-800">
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-90 group-hover:opacity-100"
                  />
                  
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <button 
                      onClick={() => onQuickView(product)}
                      className="p-3 bg-white text-primary rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:scale-110"
                      title="Quick View"
                    >
                      <Eye size={20} />
                    </button>
                    <button 
                      onClick={() => onAddToCart(product)}
                      className="p-3 bg-accent text-white rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75 hover:scale-110 hover:bg-accent/80"
                      title="Add to Cart"
                    >
                      <ShoppingBag size={20} />
                    </button>
                  </div>

                  {/* Badges */}
                  {product.isNew && (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 text-[10px] font-sans font-bold tracking-widest text-primary uppercase">
                      New Arrival
                    </div>
                  )}
                  
                  <button 
                    onClick={() => onToggleWishlist(product.id)}
                    className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors transform translate-x-10 group-hover:translate-x-0 duration-300"
                  >
                    <Heart size={20} fill={wishlist.includes(product.id) ? "currentColor" : "none"} className={wishlist.includes(product.id) ? "text-red-500" : ""} />
                  </button>
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="font-serif text-xl text-white mb-2 group-hover:text-accent transition-colors">{product.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-muted text-sm">{product.category}</span>
                    <span className="font-sans font-medium text-white">${product.price}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        <div className="mt-16 text-center">
           <button className="px-10 py-4 border border-white/20 text-white font-sans text-xs tracking-widest uppercase hover:bg-white hover:text-primary transition-all duration-500">
             Load More
           </button>
        </div>
      </div>
    </section>
  );
};

export default ProductCatalog;