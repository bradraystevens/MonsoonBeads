import React from 'react';
import { Instagram, Twitter, Facebook, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary pt-24 pb-12 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-24 mb-16">
          
          <div className="lg:col-span-1">
            <h3 className="font-serif text-2xl text-white tracking-widest mb-6">MONSOON<span className="italic text-accent font-light">BEADS</span></h3>
            <p className="text-muted text-sm leading-relaxed mb-6">
              Handcrafted luxury jewelry inspired by the ethereal beauty of the monsoon. Designed for the modern muse.
            </p>
            <div className="flex space-x-4">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
             <h4 className="font-serif text-lg text-white mb-6">Shop</h4>
             <ul className="space-y-4 text-sm text-muted">
               <li className="hover:text-accent cursor-pointer transition-colors">New Arrivals</li>
               <li className="hover:text-accent cursor-pointer transition-colors">Best Sellers</li>
               <li className="hover:text-accent cursor-pointer transition-colors">Necklaces</li>
               <li className="hover:text-accent cursor-pointer transition-colors">Rings</li>
             </ul>
          </div>

          <div>
             <h4 className="font-serif text-lg text-white mb-6">About</h4>
             <ul className="space-y-4 text-sm text-muted">
               <li className="hover:text-accent cursor-pointer transition-colors">Our Story</li>
               <li className="hover:text-accent cursor-pointer transition-colors">The Atelier</li>
               <li className="hover:text-accent cursor-pointer transition-colors">Sustainability</li>
               <li className="hover:text-accent cursor-pointer transition-colors">Contact</li>
             </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg text-white mb-6">Newsletter</h4>
            <p className="text-muted text-sm mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-secondary border border-white/10 py-3 px-4 text-white text-sm focus:outline-none focus:border-accent transition-colors"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-white hover:text-accent transition-colors">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-muted">
          <p>© 2024 MonsoonBeads. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
             <span className="hover:text-white cursor-pointer">Privacy Policy</span>
             <span className="hover:text-white cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;