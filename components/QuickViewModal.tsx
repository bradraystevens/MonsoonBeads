import React from 'react';
import { motion } from 'framer-motion';
import { X, Star, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose, onAddToCart }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative bg-secondary w-full max-w-4xl rounded-sm overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors"
        >
          <X size={20} />
        </button>

        {/* Image Gallery */}
        <div className="w-full md:w-1/2 bg-gray-800 h-[300px] md:h-auto relative overflow-hidden group">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        {/* Details */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col overflow-y-auto">
          <div className="mb-6">
            <span className="text-accent text-xs font-bold tracking-widest uppercase mb-2 block">{product.category}</span>
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">{product.name}</h2>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} className={i < Math.floor(product.rating) ? "" : "opacity-30"} />
                ))}
              </div>
              <span className="text-muted text-xs">(24 Reviews)</span>
            </div>
            <p className="text-2xl font-serif text-white">${product.price}</p>
          </div>

          <p className="text-gray-300 font-sans leading-relaxed mb-8 text-sm">
            {product.description}
          </p>

          <div className="mt-auto space-y-4">
             <div className="flex gap-4">
                <button 
                  onClick={() => {
                    onAddToCart(product);
                    onClose();
                  }}
                  className="flex-1 bg-white text-primary py-4 font-sans text-sm font-bold tracking-widest uppercase hover:bg-accent hover:text-white transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={18} />
                  Add to Cart
                </button>
             </div>
             <p className="text-center text-xs text-muted">Free shipping on orders over $200</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default QuickViewModal;