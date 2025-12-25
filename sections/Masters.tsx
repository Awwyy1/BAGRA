
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const masters = [
  { name: "SARKIS", role: "Master Barber", img: "https://images.unsplash.com/photo-1593030103066-0093718efeb9?q=80&w=2080&auto=format&fit=crop" },
  { name: "LEVON", role: "Style Architect", img: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?q=80&w=2080&auto=format&fit=crop" },
  { name: "ANDRANIK", role: "Beard Specialist", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2187&auto=format&fit=crop" },
  { name: "DAVID", role: "Classic Cuts", img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=2048&auto=format&fit=crop" },
  { name: "ARMEN", role: "Visual Artist", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2187&auto=format&fit=crop" },
];

export const Masters: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  return (
    <>
      {/* Mobile Version - Vertical Scroll */}
      <section id="masters" className="md:hidden relative bg-[#0A0A0A] py-20 px-4">
        <div className="mb-12">
          <h2 className="text-5xl font-black tracking-tighter leading-none opacity-10 mb-6">MASTERS</h2>
          <p className="text-xl font-light max-w-sm">The hands that define the standard.</p>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {masters.map((master, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="relative min-w-[280px] aspect-[3/4] group overflow-hidden bg-[#111] snap-center flex-shrink-0"
            >
              <img src={master.img} className="w-full h-full object-cover grayscale brightness-75" alt={master.name} />
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-2xl font-bold tracking-tight">{master.name}</h3>
                <p className="text-[10px] uppercase tracking-[0.3em] opacity-40">{master.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Desktop Version - Horizontal Scroll on Vertical Scroll */}
      <section ref={targetRef} className="hidden md:block relative h-[300vh] bg-[#0A0A0A]">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          <div className="px-24 mb-12">
            <h2 className="text-[12vw] font-black tracking-tighter leading-none opacity-10">MASTERS</h2>
            <div className="absolute top-1/2 left-24 -translate-y-1/2 z-10 pointer-events-none">
              <p className="text-2xl font-light max-w-sm">The hands that define the standard.</p>
            </div>
          </div>

          <motion.div style={{ x }} className="flex gap-8 px-24">
            {masters.map((master, idx) => (
              <div
                key={idx}
                className="relative min-w-[500px] aspect-[3/4] group overflow-hidden bg-[#111]"
                data-cursor="text"
                data-cursor-text="VIEW"
              >
                <img src={master.img} className="w-full h-full object-cover grayscale brightness-75 group-hover:scale-105 group-hover:brightness-100 transition-all duration-700" alt={master.name} />
                <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-3xl font-bold tracking-tight">{master.name}</h3>
                  <p className="text-[10px] uppercase tracking-[0.3em] opacity-40">{master.role}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};
