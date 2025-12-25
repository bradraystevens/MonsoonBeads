
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Droplets, Gem } from 'lucide-react';

const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: <Gem size={24} />,
      title: "Wet Glass Finish",
      desc: "Hand-polished for 40 hours to mimic the surface tension of water."
    },
    {
      icon: <Droplets size={24} />,
      title: "Monsoon Inspired",
      desc: "Each piece captures the exact hue of the sky after rain."
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "Lifetime Clarity",
      desc: "Guaranteed to never lose its water-like luster."
    }
  ];

  return (
    <section className="py-24 bg-primary border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-white/5">
          {features.map((feature, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              key={idx}
              className="group px-6 py-8 md:py-0"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/5 mb-6 text-accent group-hover:bg-white/10 group-hover:text-white transition-all duration-500 border border-white/5">
                {feature.icon}
              </div>
              <h3 className="font-serif text-xl text-white mb-3 tracking-wide">{feature.title}</h3>
              <p className="text-muted font-sans text-sm leading-relaxed max-w-xs mx-auto opacity-80 group-hover:opacity-100 transition-opacity">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
