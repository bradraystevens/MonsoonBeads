import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Product, CartItem } from './types';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCatalog from './components/ProductCatalog';
import InteractivePlayground from './components/InteractivePlayground';
import AboutSection from './components/AboutSection';
import WhyChooseUs from './components/WhyChooseUs';
import ReviewsSection from './components/ReviewsSection';
import InstagramFeed from './components/InstagramFeed';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import QuickViewModal from './components/QuickViewModal';
import AIChat from './components/AIChat';

// Dummy Data for Initialization
export const products: Product[] = [
  {
    id: 1,
    name: "Midnight Monsoon Drop",
    price: 145,
    category: "Necklaces",
    rating: 5,
    isNew: true,
    description: "A single, perfect sphere capturing the essence of a midnight storm. Hand-polished to a mirror finish.",
    images: ["https://picsum.photos/600/800?random=1", "https://picsum.photos/600/800?random=11"]
  },
  {
    id: 2,
    name: "Storm Grey Bracelet",
    price: 165,
    category: "Bracelets",
    rating: 4.8,
    description: "Resilient grey beads strung with silk, representing the calm before the rain.",
    images: ["https://picsum.photos/600/800?random=2", "https://picsum.photos/600/800?random=12"]
  },
  {
    id: 3,
    name: "Azure Pearl Earrings",
    price: 185,
    category: "Earrings",
    rating: 5,
    isNew: true,
    description: "Drops of azure captured in pearl, reflecting the sky after the clouds clear.",
    images: ["https://picsum.photos/600/800?random=3", "https://picsum.photos/600/800?random=13"]
  },
  {
    id: 4,
    name: "Rain Gold Pendant",
    price: 210,
    category: "Necklaces",
    rating: 4.9,
    description: "A touch of sunlight breaking through the rain. 18k gold accents on deep blue glass.",
    images: ["https://picsum.photos/600/800?random=4", "https://picsum.photos/600/800?random=14"]
  },
  {
    id: 5,
    name: "Mist Walker Ring",
    price: 95,
    category: "Rings",
    rating: 4.7,
    description: "Subtle, frosted glass texture that feels like morning mist on the skin.",
    images: ["https://picsum.photos/600/800?random=5", "https://picsum.photos/600/800?random=15"]
  },
  {
    id: 6,
    name: "Thunderclap Choker",
    price: 250,
    category: "Necklaces",
    rating: 5,
    description: "Bold, dark, and striking. Statement piece for the modern artisan.",
    images: ["https://picsum.photos/600/800?random=6", "https://picsum.photos/600/800?random=16"]
  }
];

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      setIsHovered(
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') !== null ||
        target.closest('a') !== null
      );
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <div 
      className={`custom-cursor hidden md:block ${isHovered ? 'hovered' : ''}`}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    />
  );
};

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [wishlist, setWishlist] = useState<number[]>([]);

  // Cart Functions
  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  // Wishlist Functions
  const toggleWishlist = (id: number) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="bg-primary text-text min-h-screen selection:bg-accent selection:text-white font-sans">
      <CustomCursor />
      
      <Navbar 
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} 
        onOpenCart={() => setIsCartOpen(true)} 
      />

      <main>
        <Hero />
        
        <ProductCatalog 
          products={products}
          onAddToCart={addToCart}
          onQuickView={setQuickViewProduct}
          wishlist={wishlist}
          onToggleWishlist={toggleWishlist}
        />

        <InteractivePlayground />
        <AboutSection />
        
        <WhyChooseUs />
        <ReviewsSection />
        <InstagramFeed />
      </main>

      <Footer />
      
      <AnimatePresence>
        {isCartOpen && (
          <CartDrawer 
            isOpen={isCartOpen} 
            onClose={() => setIsCartOpen(false)} 
            cart={cart}
            onRemove={removeFromCart}
            onUpdateQuantity={updateQuantity}
          />
        )}
        
        {quickViewProduct && (
          <QuickViewModal 
            product={quickViewProduct} 
            onClose={() => setQuickViewProduct(null)}
            onAddToCart={addToCart}
          />
        )}
      </AnimatePresence>

      <AIChat />
    </div>
  );
};

export default App;