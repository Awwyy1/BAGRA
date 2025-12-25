
import React from 'react';
import { motion } from 'framer-motion';

const items = [
    "https://images.unsplash.com/photo-1599351431247-f13150b0ad38?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1621605815841-aa88a8343111?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512690118299-a91f04176161?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1622286332618-f2802b2c3063?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1620331713240-ed6041a57659?q=80&w=1000&auto=format&fit=crop"
];

export const Gallery: React.FC = () => {
  return (
    <section id="gallery" className="relative w-full py-20 md:py-40 bg-[#0A0A0A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8 lg:gap-16">
          {items.map((src, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`relative overflow-hidden aspect-[3/4] bg-[#111] group ${idx % 2 === 0 ? 'md:mt-12' : ''}`}
              data-cursor="hover"
            >
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1 }}
                src={src}
                className="w-full h-full object-cover grayscale transition-all duration-700"
                alt={`Gallery ${idx}`}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 md:group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <div className="w-12 h-12 rounded-full border border-white/40 flex items-center justify-center">
                    <div className="w-1 h-1 bg-white rounded-full" />
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
