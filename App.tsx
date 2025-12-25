
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { Product, CartItem } from './types';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCatalog from './components/ProductCatalog';
import AboutSection from './components/AboutSection';
import WhyChooseUs from './components/WhyChooseUs';
import ReviewsSection from './components/ReviewsSection';
import InstagramFeed from './components/InstagramFeed';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import QuickViewModal from './components/QuickViewModal';
import AIChat from './components/AIChat';
import CollectionsPage from './components/CollectionsPage';
import Orb from './components/Orb';

// Enhanced Luxury Bracelet Collection
export const products: Product[] = [
  {
    id: 1,
    name: "Aether Bloom",
    price: 185,
    category: "Bracelets",
    rating: 5,
    isNew: true,
    poeticHeadline: "Breath of the upper atmosphere.",
    description: "A delicate fusion of translucent sky-blue and soft white glass. Light passes through these beads like sunbeams through thin clouds, creating a halo of calm around the wrist. Each sphere is hand-selected for its clarity.",
    emotionalBenefit: "Wearing a piece of the horizon.",
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=1000&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1602751584552-8ba42d523f17?q=80&w=1000&auto=format&fit=crop"
    ]
  },
  {
    id: 2,
    name: "Champagne Lace",
    price: 210,
    category: "Bracelets",
    rating: 4.9,
    poeticHeadline: "Golden hour captured in glass.",
    description: "Warm, effervescent tones that mimic the sparkle of vintage champagne. Hand-polished to a mirror finish, this piece offers a subtle luxury that glows warmly against the skin. The facets catch low light, creating a continuous, soft shimmer.",
    emotionalBenefit: "An evening soiree in soft light.",
    // Updated Gallery: Golden/Amber tones
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop", // Warm gold aesthetic
      "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=1000&auto=format&fit=crop", // Detail/Texture
      "https://images.unsplash.com/photo-1596944924616-00311a63888c?q=80&w=1000&auto=format&fit=crop"  // Light interaction
    ]
  },
  {
    id: 3,
    name: "Prisma Cloud",
    price: 195,
    category: "Bracelets",
    rating: 5,
    isNew: true,
    poeticHeadline: "Light fractured into dreams.",
    description: "Iridescent beads that shift color with every movement, capturing the elusive rainbow within a storm cloud. A complex, dreamy piece for the thoughtful soul.",
    emotionalBenefit: "Holding a soap bubble that never bursts.",
    images: ["https://picsum.photos/600/800?random=3", "https://picsum.photos/600/800?random=13"]
  },
  {
    id: 4,
    name: "Celestial Blush",
    price: 175,
    category: "Bracelets",
    rating: 4.8,
    poeticHeadline: "The first whisper of sunset.",
    description: "Soft pinks and pale purples blending together in a seamless gradient. A quiet, romantic expression of twilight that feels weightless on the wrist.",
    emotionalBenefit: "The moment day turns into night.",
    images: ["https://picsum.photos/600/800?random=4", "https://picsum.photos/600/800?random=14"]
  },
  {
    id: 5,
    name: "Sapphire Zenith",
    price: 245,
    category: "Bracelets",
    rating: 5,
    poeticHeadline: "The depth of the midnight ocean.",
    description: "Profound, deep blue beads with a mirror finish. Commanding, regal, and infinitely deep. This design absorbs light and reflects only the deepest hues.",
    emotionalBenefit: "Silence at the bottom of the sea.",
    images: ["https://picsum.photos/600/800?random=5", "https://picsum.photos/600/800?random=15"]
  },
  {
    id: 6,
    name: "Ember Glint",
    price: 165,
    category: "Bracelets",
    rating: 4.7,
    poeticHeadline: "A spark in the cooling ash.",
    description: "Deep warm tones with hidden flecks of copper and gold inside the glass. A reminder of warmth in the cold rain, grounding and comforting.",
    emotionalBenefit: "Watching a fire die down on a rainy night.",
    images: ["https://picsum.photos/600/800?random=6", "https://picsum.photos/600/800?random=16"]
  },
  {
    id: 7,
    name: "Aqua Veil",
    price: 155,
    category: "Bracelets",
    rating: 4.9,
    poeticHeadline: "Water running over stone.",
    description: "Crystal clear turquoise with organic imperfections intentionally preserved. It looks liquid, as if it might drip off the wrist at any moment.",
    emotionalBenefit: "Submerging your hand in a cold mountain stream.",
    images: ["https://picsum.photos/600/800?random=7", "https://picsum.photos/600/800?random=17"]
  },
  {
    id: 8,
    name: "Imperial Kiss",
    price: 225,
    category: "Bracelets",
    rating: 5,
    poeticHeadline: "A secret told in velvet.",
    description: "Rich amethyst tones with a smoky finish. Mysterious, alluring, and deeply sophisticated. A design for those who prefer the shadows.",
    emotionalBenefit: "A whispered secret in a crowded room.",
    images: ["https://picsum.photos/600/800?random=8", "https://picsum.photos/600/800?random=18"]
  }
];

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      // Small delay for fluid feeling
      requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
      
      const target = e.target as HTMLElement;
      setIsHovered(
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') !== null ||
        target.closest('a') !== null ||
        target.classList.contains('cursor-pointer') ||
        target.classList.contains('glass-card')
      );
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <div 
      className={`custom-cursor hidden md:block ${isHovered ? 'hovered' : ''}`}
      style={{ 
        transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
        left: 0, 
        top: 0,
        position: 'fixed' 
      }}
    />
  );
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'collections'>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [wishlist, setWishlist] = useState<number[]>([]);

  // Scroll opacity logic for background
  const { scrollY } = useScroll();
  const backgroundOpacity = useTransform(scrollY, [0, 600], [1, 0.2]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentView]);

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

  const toggleWishlist = (id: number) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="bg-primary text-text min-h-screen selection:bg-highlight/30 selection:text-white font-sans relative overflow-x-hidden">
      {/* Ambient Background Layer */}
      <motion.div 
        style={{ opacity: backgroundOpacity }}
        className="fixed inset-0 z-0 pointer-events-none"
      >
         {/* Deeper hue 215 for the Abyss look */}
         <Orb hue={215} hoverIntensity={0.15} /> 
         {/* Noise overlay for texture - reduced opacity for cleaner look */}
         <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
      </motion.div>
      
      <CustomCursor />
      
      <Navbar 
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} 
        onOpenCart={() => setIsCartOpen(true)}
        currentView={currentView}
        onNavigate={setCurrentView}
      />

      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {currentView === 'home' ? (
            <motion.div 
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <Hero onNavigate={setCurrentView} />
              
              <div className="bg-gradient-to-b from-transparent via-primary/90 to-primary">
                <ProductCatalog 
                  products={products}
                  onAddToCart={addToCart}
                  onQuickView={setQuickViewProduct}
                  wishlist={wishlist}
                  onToggleWishlist={toggleWishlist}
                />

                <AboutSection />
                <WhyChooseUs />
                <ReviewsSection />
                <InstagramFeed />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="collections"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <CollectionsPage 
                products={products}
                onAddToCart={addToCart}
                onQuickView={setQuickViewProduct}
                wishlist={wishlist}
                onToggleWishlist={toggleWishlist}
              />
            </motion.div>
          )}
        </AnimatePresence>
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
