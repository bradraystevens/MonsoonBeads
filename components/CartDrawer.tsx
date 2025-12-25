
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
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
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
      />
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 right-0 h-full w-full md:w-[500px] bg-[#0f172a]/95 backdrop-blur-2xl z-[70] flex flex-col border-l border-white/10 shadow-2xl"
      >
        {/* Header */}
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/5">
          <div className="flex items-center gap-4">
            <h2 className="font-serif text-3xl text-white tracking-wide">Your Selection</h2>
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent/20 text-accent text-xs font-bold font-sans">
              {cart.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          </div>
          <button 
            onClick={onClose} 
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-all duration-300"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
          <AnimatePresence mode='popLayout'>
            {cart.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="h-full flex flex-col items-center justify-center text-center opacity-60 space-y-6"
              >
                <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-2">
                   <ShoppingBag size={40} className="text-slate-500" />
                </div>
                <div>
                  <p className="text-white font-serif text-2xl mb-2">Your bag is empty</p>
                  <p className="text-slate-400 text-sm font-sans tracking-wide">The archive awaits your discovery.</p>
                </div>
                <button 
                  onClick={onClose}
                  className="px-8 py-3 border border-white/20 text-white font-sans text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-[#0f172a] transition-all duration-500"
                >
                  Continue Shopping
                </button>
              </motion.div>
            ) : (
              cart.map((item) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20, transition: { duration: 0.3 } }}
                  key={item.id} 
                  className="group flex gap-6 p-4 rounded-sm bg-white/[0.02] hover:bg-white/[0.05] border border-transparent hover:border-white/5 transition-all duration-500"
                >
                  {/* Image */}
                  <div className="w-24 h-32 flex-shrink-0 overflow-hidden rounded-sm bg-gray-900 relative">
                    <img 
                      src={item.images[0]} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100" 
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-white text-xl leading-none mb-2">{item.name}</h4>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="text-slate-500 hover:text-red-400 transition-colors p-1"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <p className="text-accent/80 text-[10px] uppercase tracking-widest font-sans mb-1">{item.category}</p>
                    </div>

                    <div className="flex justify-between items-end mt-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/5">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, -1)} 
                          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-sm font-sans font-medium text-white">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      
                      {/* Price */}
                      <div className="text-right">
                         <span className="block font-serif text-lg text-white">${item.price * item.quantity}</span>
                         {item.quantity > 1 && (
                           <span className="text-[10px] text-slate-500">${item.price} each</span>
                         )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-8 border-t border-white/10 bg-[#0f172a]/80 backdrop-blur-xl space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-slate-400 text-sm">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="font-serif text-xl text-white">Total</span>
                <span className="font-serif text-3xl text-white">${total}</span>
              </div>
            </div>
            
            <button className="w-full relative overflow-hidden group bg-white text-[#0f172a] py-5 font-sans text-xs font-bold tracking-[0.2em] uppercase transition-all duration-500">
               <span className="relative z-10 flex items-center justify-center gap-3 group-hover:gap-6 transition-all duration-500">
                 Proceed to Checkout
                 <ArrowRight size={16} />
               </span>
               <div className="absolute inset-0 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ease-[0.22,1,0.36,1]" />
               <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 z-20 text-white transition-all duration-500 delay-75 group-hover:gap-6">
                 Proceed to Checkout
                 <ArrowRight size={16} />
               </div>
            </button>
            
            <div className="text-center">
              <button onClick={onClose} className="text-xs text-slate-500 hover:text-white transition-colors border-b border-transparent hover:border-white pb-0.5 uppercase tracking-widest">
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default CartDrawer;
