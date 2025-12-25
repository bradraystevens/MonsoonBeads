
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

const products: Product[] = [
  {
    id: 1,
    name: "Mist Drop",
    price: 145.00,
    images: ["https://picsum.photos/400/500?random=1"],
    tagline: "Pure Clarity",
    color: "bg-slate-200",
    category: "Necklaces",
    description: "Pure Clarity necklace representing the morning mist.",
    rating: 5,
    poeticHeadline: "A single droplet of morning silence.",
    emotionalBenefit: "The clarity of a new day."
  },
  {
    id: 2,
    name: "Storm Grey",
    price: 165.00,
    images: ["https://picsum.photos/400/500?random=2"],
    tagline: "Deep Resonance",
    color: "bg-slate-400",
    category: "Bracelets",
    description: "Storm grey beads reflecting the intensity of the monsoon.",
    rating: 5,
    poeticHeadline: "Thunder trapped in glass.",
    emotionalBenefit: "Strength amidst the chaos."
  },
  {
    id: 3,
    name: "Azure Pearl",
    price: 185.00,
    images: ["https://picsum.photos/400/500?random=3"],
    tagline: "Oceanic Calm",
    color: "bg-sky-200",
    category: "Earrings",
    description: "Azure pearls captured in a moment of calm.",
    rating: 5,
    poeticHeadline: "The ocean's quiet whisper.",
    emotionalBenefit: "Deep calm in a restless world."
  },
  {
    id: 4,
    name: "Rain Gold",
    price: 210.00,
    images: ["https://picsum.photos/400/500?random=4"],
    tagline: "Sunlight Through Rain",
    color: "bg-amber-100",
    category: "Necklaces",
    description: "Gold accents shining through the rain.",
    rating: 5,
    poeticHeadline: "Sunlight breaking the storm.",
    emotionalBenefit: "Hope returning after the rain."
  }
];

interface ProductCardProps {
  product: Product;
  index: number;
  onAdd: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index, onAdd }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden bg-monsoon-100 aspect-[3/4] mb-6">
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 ${product.color || ''}`}></div>
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 text-xs font-sans tracking-widest text-monsoon-900 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
          NEW ARRIVAL
        </div>
        
        {/* Quick Add Overlay */}
        <button 
          onClick={(e) => { e.stopPropagation(); onAdd(product); }}
          className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md py-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out flex justify-center items-center space-x-2 text-monsoon-900 hover:bg-monsoon-900 hover:text-white"
        >
          <ShoppingBag size={16} />
          <span className="font-sans text-xs tracking-widest uppercase">Add to Cart</span>
        </button>
      </div>
      
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-serif text-2xl text-monsoon-900 italic mb-1 group-hover:text-monsoon-600 transition-colors">{product.name}</h3>
          <p className="font-sans text-xs text-monsoon-500 tracking-widest uppercase">{product.tagline}</p>
        </div>
        <div className="flex flex-col items-end">
          <span className="font-sans text-sm font-medium text-monsoon-900 mb-2">${product.price.toFixed(2)}</span>
        </div>
      </div>
    </motion.div>
  );
};

interface ProductGalleryProps {
  addToCart: (product: Product) => void;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ addToCart }) => {
  return (
    <section className="py-24 bg-white px-6 md:px-12" id="collections">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-monsoon-100 pb-8"
        >
          <div>
            <h2 className="font-serif text-4xl md:text-5xl text-monsoon-900 mb-4">Latest Editions</h2>
            <p className="font-sans text-monsoon-500 max-w-md leading-relaxed">
              Discover our newest arrivals, sculpted from the essence of rain and light. 
              Each piece is a frozen moment of the monsoon.
            </p>
          </div>
          <button className="hidden md:flex items-center space-x-2 text-monsoon-900 border-b border-transparent hover:border-monsoon-900 transition-all pb-1 mt-6 md:mt-0 font-sans text-sm tracking-wide">
            <span>VIEW ALL COLLECTIONS</span>
            <ArrowRight size={14} />
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} onAdd={addToCart} />
          ))}
        </div>
        
        <div className="mt-16 flex justify-center md:hidden">
            <button className="border border-monsoon-200 px-8 py-3 text-sm tracking-widest uppercase text-monsoon-800">
                View All
            </button>
        </div>
      </div>
    </section>
  );
};

export default ProductGallery;
