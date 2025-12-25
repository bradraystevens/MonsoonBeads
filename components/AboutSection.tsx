
import React from 'react';
import { motion } from 'framer-motion';

const AboutSection: React.FC = () => {
  return (
    <section className="py-40 bg-[#0f172a] relative overflow-hidden" id="our-story">
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-5 order-2 lg:order-1">
             <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="block text-accent font-sans text-[10px] tracking-[0.3em] uppercase mb-8"
             >
                The Philosophy
             </motion.span>
             
             <motion.h2 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 1 }}
               className="font-serif text-4xl md:text-6xl text-white mb-10 leading-[1.1]"
             >
               Born from the <br/> 
               <span className="italic font-light text-slate-400">Silence of Rain.</span>
             </motion.h2>

             <motion.div 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2, duration: 1 }}
               className="font-sans text-slate-400 leading-8 space-y-6 font-light text-sm tracking-wide"
             >
               <p>
                 MonsoonBeads began with a single drop. We sought to capture that fleeting moment where water meets light—a synthesis of fluidity and permanence that defines our aesthetic.
               </p>
               <p>
                 Every bead is hand-polished to mimic the surface tension of water. We don't just make jewelry; we craft wearable atmosphere. Cool to the touch, radiant to the eye, and serene to the soul.
               </p>
             </motion.div>
             
             <motion.button 
               whileHover={{ x: 10 }}
               transition={{ type: "tween", ease: "circOut" }}
               className="mt-12 text-white font-sans text-xs font-bold tracking-[0.2em] uppercase flex items-center gap-4 group"
             >
               Read Full Story
               <span className="w-8 h-px bg-white group-hover:w-12 transition-all duration-300"></span>
             </motion.button>
          </div>

          {/* Visuals */}
          <div className="lg:col-span-7 order-1 lg:order-2 relative h-[800px] w-full">
             {/* Main Image */}
             <motion.div 
                initial={{ clipPath: 'inset(10% 10% 10% 10%)', opacity: 0 }}
                whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-0 right-0 w-[85%] h-[85%] z-10"
             >
               <img 
                 src="https://picsum.photos/800/1000?random=10" 
                 alt="Craftsmanship" 
                 className="w-full h-full object-cover opacity-90 grayscale-[20%]"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] to-transparent opacity-30"></div>
             </motion.div>

             {/* Overlap Image */}
             <motion.div 
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-0 left-0 w-[45%] h-[40%] z-20 border-r border-t border-white/10 bg-[#0f172a] p-4"
             >
                <img 
                  src="https://picsum.photos/600/800?random=11" 
                  alt="Detail" 
                  className="w-full h-full object-cover opacity-80"
                />
             </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
