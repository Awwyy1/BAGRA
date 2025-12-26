
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const About: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const imgY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const blur = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [10, 0, 0, 10]);

  return (
    <section id="about" ref={ref} className="relative min-h-screen w-full flex items-center justify-center py-20 md:py-40 px-4 md:px-8 overflow-hidden bg-[#0F0F0F]">
      <motion.div
        style={{ filter: `blur(${blur}px)` }}
        className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center"
      >
        <div className="space-y-8 md:space-y-12 order-2 md:order-1">
            <motion.h2
              style={{ y: textY }}
              className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter leading-[1.2] font-heading pr-4"
            >
              2500+ <br/><span className="italic font-light opacity-50">Довольных</span><br/><span className="italic font-light opacity-50">Гостей</span>
            </motion.h2>

            <motion.div className="space-y-6 md:space-y-8 max-w-lg">
                <p className="text-xl md:text-2xl lg:text-3xl font-light opacity-80 leading-relaxed">
                  Здесь шутят, стригут и не душнят. Вайб, который хочется повторить.
                </p>
                <div className="h-[1px] w-20 bg-white/20" />
                <p className="text-xs md:text-sm opacity-50 uppercase tracking-widest font-mono">
                  Крутые стрижки. Честные цены. Никакой скуки.
                </p>
            </motion.div>
        </div>

        <motion.div
          style={{ y: imgY }}
          className="relative aspect-[4/5] group order-1 md:order-2"
          data-cursor="text"
          data-cursor-text="ВАЙБ"
        >
          <img
            src="/images/philosophy/vibe.jpg"
            className="w-full h-full object-cover grayscale transition-transform duration-700 md:group-hover:scale-105"
            alt="Вайб"
          />
          <div className="absolute inset-0 border border-white/5 m-2 md:m-4 pointer-events-none" />
          <div className="absolute top-0 right-0 p-4 md:p-8 text-[10px] uppercase tracking-widest opacity-20 font-mono">01 / Культура</div>
        </motion.div>
      </motion.div>
    </section>
  );
};
