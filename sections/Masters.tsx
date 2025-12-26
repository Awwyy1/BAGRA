
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const masters = [
  { name: "ФАРА", role: "Про-барбер", img: "/images/masters/fara.jpg", reviews: 637 },
  { name: "ОСКАР", role: "Бренд-барбер", img: "/images/masters/oskar.jpg", reviews: 835 },
  { name: "АЗА", role: "Бренд-барбер", img: "/images/masters/aza.jpg", reviews: 983 },
  { name: "ИСАК", role: "Босс-барбер", img: "/images/masters/isak.jpg", reviews: 750 },
];

const StarIcon = () => (
  <svg className="w-3 h-3 fill-white/60" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

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

  // Desktop: scroll exactly 3 cards worth (to show 4th as last)
  // 4 cards total, each ~25% of row, move 3 cards = -75% but stop early to avoid empty space
  const x = useTransform(scrollYProgress, [0, 0.9], ["0%", "-52%"]);

  // Mobile: smooth scroll through all 4 masters (0 to -300% for 4 cards)
  const mobileX = useTransform(
    mobileScrollProgress,
    [0, 1],
    ["0%", "-300%"]
  );

  return (
    <div id="masters">
      {/* Mobile Version - Horizontal Scroll on Vertical Scroll */}
      <section ref={mobileRef} className="md:hidden relative h-[350vh] bg-[#0A0A0A]">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          <div className="px-4 mb-6">
            <h2 className="text-4xl font-black tracking-tighter leading-none opacity-10 mb-2 font-heading">МАСТЕРА</h2>
            <p className="text-base font-light max-w-xs opacity-60">которые задают стандарт</p>
          </div>

          <motion.div
            style={{ x: mobileX }}
            className="flex"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {masters.map((master, idx) => (
              <div
                key={idx}
                className="relative w-screen h-[65vh] flex-shrink-0 px-4"
              >
                <div className="relative w-full h-full overflow-hidden bg-[#111] rounded-sm">
                  <img src={master.img} className="w-full h-full object-cover grayscale brightness-75" alt={master.name} />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent flex justify-between items-end">
                    <div>
                      <h3 className="text-2xl font-bold tracking-tight font-heading">{master.name}</h3>
                      <p className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-mono">{master.role}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <StarIcon />
                      <span className="text-[10px] font-mono opacity-50">{master.reviews}</span>
                    </div>
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
      <section ref={targetRef} className="hidden md:block relative h-[250vh] bg-[#0A0A0A]">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          <div className="px-24 mb-8">
            <h2 className="text-[12vw] font-black tracking-tighter leading-none opacity-10 font-heading">МАСТЕРА</h2>
            <p className="text-2xl font-light max-w-sm mt-4 opacity-60">которые задают стандарт</p>
          </div>

          <motion.div
            style={{ x }}
            className="flex gap-8 px-24"
            transition={{ type: "tween", ease: "easeOut" }}
          >
            {masters.map((master, idx) => (
              <div
                key={idx}
                className="relative min-w-[400px] h-[65vh] group overflow-hidden bg-[#111]"
                data-cursor="hover"
              >
                <img src={master.img} className="w-full h-full object-cover grayscale brightness-75 group-hover:scale-105 group-hover:brightness-100 transition-all duration-700" alt={master.name} />
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent flex justify-between items-end">
                  <div>
                    <h3 className="text-3xl font-bold tracking-tight font-heading">{master.name}</h3>
                    <p className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-mono">{master.role}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <StarIcon />
                    <span className="text-[11px] font-mono opacity-50">{master.reviews}</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};
