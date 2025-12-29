
import React from 'react';
import { motion } from 'framer-motion';

const masters = [
  { name: "ФАРА", role: "Про-барбер", img: "/images/masters/fara.jpg", reviews: 637 },
  { name: "ОСКАР", role: "Бренд-барбер", img: "/images/masters/oskar.jpg", reviews: 835 },
  { name: "АЗА", role: "Бренд-барбер", img: "/images/masters/aza.jpg", reviews: 983 },
  { name: "ИСАК", role: "Босс-барбер", img: "/images/masters/isak.jpg", reviews: 490 },
];

const StarIcon = () => (
  <svg className="w-2 h-2 md:w-3 md:h-3 fill-white/60" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const FiveStars = () => (
  <div className="flex gap-0.5">
    <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
  </div>
);

export const Masters: React.FC = () => {
  return (
    <section id="masters" className="relative w-full py-16 md:py-32 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="mb-12 md:mb-20">
          <h2 className="text-4xl md:text-[12vw] font-black tracking-tighter leading-none opacity-10 font-heading">МАСТЕРА</h2>
          <p className="text-base md:text-2xl font-light max-w-sm mt-2 md:mt-4 opacity-60">которые задают стандарт</p>
        </div>

        {/* Masters Grid - 1 column mobile, 4 columns desktop */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-6">
          {masters.map((master, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative aspect-[3/4] group overflow-hidden bg-[#111]"
              data-cursor="hover"
            >
              <img
                src={master.img}
                className="w-full h-full object-cover grayscale brightness-75 group-hover:scale-105 group-hover:brightness-100 transition-all duration-700"
                alt={master.name}
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/90 to-transparent">
                <h3 className="text-xl md:text-2xl font-bold tracking-tight font-heading mb-1 md:mb-2">{master.name}</h3>
                <div className="flex items-center justify-between">
                  <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] opacity-40 font-mono">{master.role}</p>
                  <div className="flex items-center gap-1 md:gap-2">
                    <FiveStars />
                    <span className="text-[8px] md:text-[10px] font-mono opacity-50">{master.reviews}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
