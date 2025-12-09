import React from 'react';
import { Instagram, Twitter, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white pt-20 pb-10 border-t border-monsoon-100">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-12 border-b border-monsoon-50">
          <div className="mb-8 md:mb-0">
            <h3 className="font-serif text-2xl text-monsoon-900 tracking-wider mb-2">MONSOON<span className="italic font-light text-monsoon-400">BEADS</span></h3>
            <p className="text-monsoon-400 font-sans text-xs tracking-wide">Handcrafted in the rain shadow.</p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-monsoon-400 hover:text-monsoon-900 transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-monsoon-400 hover:text-monsoon-900 transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-monsoon-400 hover:text-monsoon-900 transition-colors">
              <Facebook size={20} />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
          <div>
            <h4 className="font-sans text-xs font-bold text-monsoon-900 uppercase tracking-widest mb-4">Shop</h4>
            <ul className="space-y-3 font-sans text-sm text-monsoon-500">
              <li className="hover:text-monsoon-900 cursor-pointer">All Collections</li>
              <li className="hover:text-monsoon-900 cursor-pointer">New Arrivals</li>
              <li className="hover:text-monsoon-900 cursor-pointer">Best Sellers</li>
              <li className="hover:text-monsoon-900 cursor-pointer">Accessories</li>
            </ul>
          </div>
          <div>
            <h4 className="font-sans text-xs font-bold text-monsoon-900 uppercase tracking-widest mb-4">Company</h4>
            <ul className="space-y-3 font-sans text-sm text-monsoon-500">
              <li className="hover:text-monsoon-900 cursor-pointer">Our Story</li>
              <li className="hover:text-monsoon-900 cursor-pointer">Sustainability</li>
              <li className="hover:text-monsoon-900 cursor-pointer">Careers</li>
              <li className="hover:text-monsoon-900 cursor-pointer">Press</li>
            </ul>
          </div>
          <div>
            <h4 className="font-sans text-xs font-bold text-monsoon-900 uppercase tracking-widest mb-4">Support</h4>
            <ul className="space-y-3 font-sans text-sm text-monsoon-500">
              <li className="hover:text-monsoon-900 cursor-pointer">FAQ</li>
              <li className="hover:text-monsoon-900 cursor-pointer">Shipping & Returns</li>
              <li className="hover:text-monsoon-900 cursor-pointer">Care Guide</li>
              <li className="hover:text-monsoon-900 cursor-pointer">Contact Us</li>
            </ul>
          </div>
          <div>
             <h4 className="font-sans text-xs font-bold text-monsoon-900 uppercase tracking-widest mb-4">Newsletter</h4>
             <p className="font-sans text-sm text-monsoon-500 mb-4">Subscribe for exclusive drops and rainfall updates.</p>
             <div className="flex border-b border-monsoon-300 pb-2">
               <input type="email" placeholder="Email Address" className="bg-transparent border-none outline-none w-full text-sm font-sans placeholder-monsoon-300 text-monsoon-800" />
               <button className="text-xs uppercase font-bold tracking-widest text-monsoon-900">Join</button>
             </div>
          </div>
        </div>

        <div className="pt-8 text-center md:text-left">
          <p className="font-sans text-[10px] text-monsoon-300 uppercase tracking-widest">
            © 2024 MonsoonBeads. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
