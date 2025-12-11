import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Leaf, Sparkles } from 'lucide-react';

const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: <Sparkles size={32} />,
      title: "Master Craftsmanship",
      desc: "Each bead is hand-polished for over 40 hours to achieve our signature 'wet glass' finish."
    },
    {
      icon: <Leaf size={32} />,
      title: "Ethical Sourcing",
      desc: "Materials sourced directly from artisan communities with fair trade practices."
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "Lifetime Warranty",
      desc: "We stand by the enduring quality of our rain-inspired jewelry, forever."
    }
  ];

  return (
    <section className="py-24 bg-secondary border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {features.map((feature, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              key={idx}
              className="group p-6 rounded-sm hover:bg-primary/50 transition-colors duration-500"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary mb-6 text-accent group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="font-serif text-xl text-white mb-3">{feature.title}</h3>
              <p className="text-muted font-sans text-sm leading-relaxed max-w-xs mx-auto">
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