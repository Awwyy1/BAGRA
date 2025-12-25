
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const masters = [
  { name: "ФАРА", role: "Про-барбер", img: "https://images.unsplash.com/photo-1593030103066-0093718efeb9?q=80&w=2080&auto=format&fit=crop" },
  { name: "ОСКАР", role: "Бренд-барбер", img: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?q=80&w=2080&auto=format&fit=crop" },
  { name: "АЗА", role: "Бренд-барбер", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2187&auto=format&fit=crop" },
  { name: "ИСАК", role: "Босс-барбер", img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=2048&auto=format&fit=crop" },
];

export const Masters: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  // Desktop scroll
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Mobile scroll
  const { scrollYProgress: mobileScrollProgress } = useScroll({
    target: mobileRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-45%"]);
  const mobileX = useTransform(mobileScrollProgress, [0, 1], ["0%", `-${(masters.length - 1) * 100}%`]);

  return (
    <div id="masters">
      {/* Mobile Version - Horizontal Scroll on Vertical Scroll */}
      <section ref={mobileRef} className="md:hidden relative h-[300vh] bg-[#0A0A0A]">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          <div className="px-4 mb-6">
            <h2 className="text-4xl font-black tracking-tighter leading-none opacity-10 mb-2 font-heading">МАСТЕРА</h2>
            <p className="text-base font-light max-w-xs opacity-60">Которые задают стандарт.</p>
          </div>

          <motion.div style={{ x: mobileX }} className="flex">
            {masters.map((master, idx) => (
              <div
                key={idx}
                className="relative w-screen h-[65vh] flex-shrink-0 px-4"
              >
                <div className="relative w-full h-full overflow-hidden bg-[#111] rounded-sm">
                  <img src={master.img} className="w-full h-full object-cover grayscale brightness-75" alt={master.name} />
                  <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent">
                    <h3 className="text-2xl font-bold tracking-tight font-heading">{master.name}</h3>
                    <p className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-mono">{master.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Progress indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {masters.map((_, idx) => (
              <motion.div
                key={idx}
                className="w-2 h-2 rounded-full bg-white/30"
                style={{
                  opacity: useTransform(
                    mobileScrollProgress,
                    [idx / masters.length, (idx + 0.5) / masters.length, (idx + 1) / masters.length],
                    [0.3, 1, 0.3]
                  )
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Desktop Version - Horizontal Scroll on Vertical Scroll */}
      <section ref={targetRef} className="hidden md:block relative h-[300vh] bg-[#0A0A0A]">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          <div className="px-24 mb-8">
            <h2 className="text-[12vw] font-black tracking-tighter leading-none opacity-10 font-heading">МАСТЕРА</h2>
            <p className="text-2xl font-light max-w-sm mt-4 opacity-60">Которые задают стандарт.</p>
          </div>

          <motion.div style={{ x }} className="flex gap-8 px-24">
            {masters.map((master, idx) => (
              <div
                key={idx}
                className="relative min-w-[400px] h-[65vh] group overflow-hidden bg-[#111]"
                data-cursor="text"
                data-cursor-text="СМОТРЕТЬ"
              >
                <img src={master.img} className="w-full h-full object-cover grayscale brightness-75 group-hover:scale-105 group-hover:brightness-100 transition-all duration-700" alt={master.name} />
                <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/90 to-transparent">
                  <h3 className="text-3xl font-bold tracking-tight font-heading">{master.name}</h3>
                  <p className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-mono">{master.role}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};
