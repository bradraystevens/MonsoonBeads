
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    text: "It feels heavier than I expected. The silence of the design speaks volumes.",
    author: "Zara K.",
    city: "Lahore",
    meta: "Verified Buyer"
  },
  {
    id: 2,
    text: "Barish ke baad ki khamoshi... this necklace captures exactly that feeling.",
    author: "Omar A.",
    city: "Islamabad",
    meta: "Verified Buyer"
  },
  {
    id: 3,
    text: "Wore it to a wedding in Clifton. Subtle, yet everyone asked about it.",
    author: "Ayesha R.",
    city: "Karachi",
    meta: "Verified Buyer"
  }
];

const locations = ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan"];

const ReviewsSection: React.FC = () => {
  return (
    <section className="py-32 bg-secondary border-t border-white/5 relative overflow-hidden" id="journal">
      {/* Background Mist */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/50 via-primary to-primary pointer-events-none opacity-50"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="block text-accent font-sans text-[10px] tracking-[0.3em] uppercase mb-4"
          >
            Trust & Heritage
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-serif text-3xl md:text-5xl text-white mb-6"
          >
            Loved Across Pakistan
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="font-serif italic text-muted text-lg"
          >
            "Barish ke baad ki khamoshi."
          </motion.p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {testimonials.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative p-8 glass-card rounded-sm hover:bg-white/5 transition-colors duration-700"
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50"></div>
              
              <p className="font-serif text-lg text-slate-200 leading-relaxed mb-8 opacity-90 group-hover:opacity-100 transition-opacity">
                "{item.text}"
              </p>
              
              <div className="flex justify-between items-end border-t border-white/5 pt-6">
                <div>
                  <h4 className="font-sans text-xs font-bold text-white uppercase tracking-widest mb-1">{item.author}</h4>
                  <div className="flex items-center gap-1 text-muted text-[10px] uppercase tracking-wide">
                    <MapPin size={10} />
                    {item.city}
                  </div>
                </div>
                <span className="text-[9px] text-accent/60 uppercase tracking-widest border border-white/10 px-2 py-1 rounded-full">
                  {item.meta}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* City Presence Strip */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-muted/40 font-serif text-xl md:text-2xl"
        >
          {locations.map((city, i) => (
            <React.Fragment key={city}>
              <span className="hover:text-muted/80 transition-colors duration-500 cursor-default">{city}</span>
              {i < locations.length - 1 && <span className="text-[10px] opacity-20">•</span>}
            </React.Fragment>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default ReviewsSection;
