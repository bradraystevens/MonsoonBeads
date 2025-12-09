import React from 'react';
import { motion } from 'framer-motion';

const AboutSection: React.FC = () => {
  return (
    <section className="py-32 bg-monsoon-900 text-monsoon-50 relative overflow-hidden" id="our-story">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-monsoon-800 to-transparent opacity-30"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-16">
          
          <div className="w-full md:w-1/2 relative">
             <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
                className="relative z-10"
             >
                <img 
                  src="https://picsum.photos/600/800?random=10" 
                  alt="Craftsmanship" 
                  className="w-full h-[600px] object-cover rounded-sm shadow-2xl brightness-90 contrast-125 grayscale-[30%]"
                />
             </motion.div>
             <motion.div 
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className="absolute -bottom-10 -right-10 w-2/3 h-1/2 overflow-hidden border-4 border-monsoon-900 z-20"
             >
                <img 
                  src="https://picsum.photos/600/800?random=11" 
                  alt="Detail" 
                  className="w-full h-full object-cover"
                />
             </motion.div>
          </div>

          <div className="w-full md:w-1/2 md:pl-12">
            <motion.h4 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-monsoon-400 font-sans tracking-[0.2em] text-sm uppercase mb-6"
            >
                The Philosophy
            </motion.h4>
            <motion.h2 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="font-serif text-4xl md:text-6xl text-white mb-8 leading-tight"
            >
                Born from the <br/> <span className="italic text-monsoon-300">Silence of Rain.</span>
            </motion.h2>
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 1 }}
                className="font-sans text-monsoon-300 leading-8 space-y-6 font-light"
            >
                <p>
                    MonsoonBeads began with a single drop of rain. We sought to capture that fleeting moment where water meets light—a synthesis of fluidity and permanence.
                </p>
                <p>
                    Every bead is hand-polished to mimic the surface tension of water. We don't just make jewelry; we craft wearable atmosphere. Cool to the touch, radiant to the eye, and serene to the soul.
                </p>
            </motion.div>
            
            <motion.button 
                whileHover={{ scale: 1.05 }}
                className="mt-12 px-8 py-4 border border-monsoon-700 text-white font-sans text-xs tracking-widest hover:bg-white hover:text-monsoon-900 transition-all duration-300"
            >
                READ THE FULL STORY
            </motion.button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
