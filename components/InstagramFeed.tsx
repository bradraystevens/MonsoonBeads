import React from 'react';
import { Instagram } from 'lucide-react';

const InstagramFeed: React.FC = () => {
  return (
    <section className="py-24 bg-primary">
      <div className="container mx-auto px-6 mb-12 text-center">
        <h2 className="font-serif text-3xl text-white mb-2">@MonsoonBeads</h2>
        <p className="text-muted text-sm">Follow the journey on Instagram</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="relative group aspect-square bg-gray-800 overflow-hidden cursor-pointer">
            <img 
              src={`https://picsum.photos/400/400?random=${20 + i}`} 
              alt="Instagram" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-accent/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Instagram className="text-white" size={32} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InstagramFeed;