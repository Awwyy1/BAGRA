
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Hero: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const layer1Y = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const layer2Y = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const layer3Y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const layer4Y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <section ref={ref} className="relative min-h-[100vh] w-full overflow-hidden flex flex-col justify-center">
      {/* Background Image - Blurred Portrait */}
      <motion.div
        style={{ y: layer2Y, scale, opacity }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-full h-full relative opacity-40">
           <img
            src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2070&auto=format&fit=crop"
            className="w-full h-full object-cover grayscale brightness-50"
            alt="Hero BG"
           />
           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0A]/40 to-[#0A0A0A]" />
        </div>
      </motion.div>

      {/* Front Layer - Typography */}
      <motion.div
        style={{ y: layer4Y, opacity }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-10"
      >
        <div className="overflow-hidden">
            <motion.p
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-sm md:text-lg uppercase tracking-[0.3em] md:tracking-[0.5em] font-medium opacity-80"
            >
                Искусство абсолютной точности
            </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <div className="text-[10px] uppercase tracking-widest opacity-40 font-mono">Листайте вниз</div>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
};
