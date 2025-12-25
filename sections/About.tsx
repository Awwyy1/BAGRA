
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
    <section id="about" ref={ref} className="relative min-h-screen w-full flex items-center justify-center py-40 px-8 overflow-hidden bg-[#0F0F0F]">
      <motion.div 
        style={{ filter: `blur(${blur}px)` }}
        className="max-w-7xl w-full grid md:grid-cols-2 gap-20 items-center"
      >
        <div className="space-y-12">
            <motion.h2 
              style={{ y: textY }}
              className="text-6xl md:text-8xl font-bold tracking-tighter leading-none"
            >
              Beyond the <br/><span className="italic font-light opacity-50">Reflection</span>
            </motion.h2>
            
            <motion.div className="space-y-8 max-w-lg">
                <p className="text-xl md:text-2xl font-light opacity-80 leading-relaxed">
                  In a world of fast trends, we pursue the eternal. Bagrat is more than a cut; it's a curated experience of masculine elegance.
                </p>
                <div className="h-[1px] w-20 bg-white/20" />
                <p className="text-sm opacity-50 uppercase tracking-widest">
                  Our legacy is defined by the sharpest blades and the deepest silence.
                </p>
            </motion.div>
        </div>

        <motion.div 
          style={{ y: imgY }}
          className="relative aspect-[4/5] group"
          data-cursor="text"
          data-cursor-text="PHILOSOPHY"
        >
          <img 
            src="https://images.unsplash.com/photo-1621605815841-aa88a8343111?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
            alt="Philosophy"
          />
          <div className="absolute inset-0 border border-white/5 m-4 pointer-events-none" />
          <div className="absolute top-0 right-0 p-8 text-[10px] uppercase tracking-widest opacity-20">01 / Culture</div>
        </motion.div>
      </motion.div>
    </section>
  );
};
