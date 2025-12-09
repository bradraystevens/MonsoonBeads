import React from 'react';
import { Star } from 'lucide-react';
import { Review } from '../types';

const reviews: Review[] = [
  {
    id: 1,
    author: "Elena R.",
    location: "Milan, Italy",
    text: "The way the light hits the Mist Drop bracelet is unreal. It truly feels like wearing a piece of the sky.",
    rating: 5
  },
  {
    id: 2,
    author: "Sarah J.",
    location: "London, UK",
    text: "Minimalist perfection. The packaging, the weight of the beads, everything screams quiet luxury.",
    rating: 5
  },
  {
    id: 3,
    author: "Yuki T.",
    location: "Kyoto, Japan",
    text: "I've never seen texture like this. Smooth yet organic. It matches my entire wardrobe.",
    rating: 5
  }
];

const ReviewsSection: React.FC = () => {
  return (
    <section className="py-24 bg-mist-gradient relative" id="journal">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-monsoon-800 mb-4">Voices of the Monsoon</h2>
          <div className="w-12 h-px bg-monsoon-400 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div 
              key={review.id}
              className="bg-white/40 backdrop-blur-md border border-white/60 p-8 rounded-sm hover:shadow-xl hover:shadow-monsoon-200/50 transition-all duration-500 group"
            >
              <div className="flex space-x-1 text-monsoon-400 mb-6 group-hover:text-yellow-500 transition-colors">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <p className="font-serif text-xl text-monsoon-800 italic mb-6 leading-relaxed">
                "{review.text}"
              </p>
              <div className="flex flex-col">
                <span className="font-sans text-xs font-bold text-monsoon-900 uppercase tracking-widest">{review.author}</span>
                <span className="font-sans text-[10px] text-monsoon-500 uppercase tracking-wide mt-1">{review.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
