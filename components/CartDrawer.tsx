import React from 'react';
import { motion } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, delta: number) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, cart, onRemove, onUpdateQuantity }) => {
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
      />
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-secondary z-50 shadow-2xl flex flex-col border-l border-white/10"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} className="text-accent" />
            <h2 className="font-serif text-2xl text-white">Your Cart</h2>
            <span className="bg-white/10 text-white text-xs px-2 py-1 rounded-full">{cart.length}</span>
          </div>
          <button onClick={onClose} className="text-muted hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
              <ShoppingBag size={48} className="mb-4 text-muted" />
              <p className="text-white font-serif text-xl">Your bag is empty</p>
              <p className="text-muted text-sm mt-2">Time to add some luxury.</p>
            </div>
          ) : (
            cart.map((item) => (
              <motion.div 
                layout
                key={item.id} 
                className="flex gap-4 bg-primary/50 p-4 rounded-sm"
              >
                <img src={item.images[0]} alt={item.name} className="w-20 h-24 object-cover rounded-sm bg-gray-800" />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif text-white text-lg leading-tight mb-1">{item.name}</h4>
                    <p className="text-muted text-xs uppercase">{item.category}</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="flex items-center gap-3 bg-white/5 rounded-full px-2 py-1">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)} 
                        className="p-1 hover:text-white text-muted transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-sm font-sans text-white w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="p-1 hover:text-white text-muted transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <span className="font-sans font-medium text-white">${item.price * item.quantity}</span>
                  </div>
                </div>
                <button onClick={() => onRemove(item.id)} className="text-muted hover:text-red-400 self-start">
                  <X size={16} />
                </button>
              </motion.div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-primary">
            <div className="flex justify-between items-center mb-6">
              <span className="text-muted font-sans uppercase text-sm tracking-widest">Subtotal</span>
              <span className="text-2xl font-serif text-white">${total}</span>
            </div>
            <p className="text-xs text-muted mb-6 text-center">Shipping & taxes calculated at checkout.</p>
            <button className="w-full bg-white text-primary py-4 font-sans text-sm font-bold tracking-widest uppercase hover:bg-accent hover:text-white transition-colors flex items-center justify-center gap-2 group">
              Checkout
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default CartDrawer;