
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const priceData = [
  { name: "МУЖСКАЯ СТРИЖКА / БРИТЬЁ ГОЛОВЫ", prices: [1200, 1700, 2500] },
  { name: "МОДЕЛИРОВАНИЕ БОРОДЫ / БРИТЬЁ", prices: [1000, 1500, 2200] },
  { name: "СТРИЖКА МАШИНКОЙ (2 НАСАДКИ)", prices: [800, 1200, 1500] },
  { name: "КАМУФЛЯЖ СЕДИНЫ", prices: [1000, 1100, 1200] },
  { name: "ЧЁРНАЯ МАСКА", prices: [1000, 1100, 1200] },
  { name: "СТУДЕНЧЕСКАЯ СТРИЖКА", prices: [1000, 1200, 1500] },
  { name: "ПРЕМИУМ УХОД ЗА КОЖЕЙ ГОЛОВЫ", prices: [1000, 1100, 1200] },
  { name: "КОРРЕКЦИЯ ВОСКОМ", prices: [500, 500, 600] },
  { name: "ДЕТОКС БОРОДЫ И КОЖИ ЛИЦА", prices: [1000, 1100, 1200] },
  { name: "УКЛАДКА БЕЗ СТРИЖКИ", prices: [600, 600, 700] },
];

const RollingNumber = ({ value }: { value: number }) => {
  const digits = value.toString().split('');
  return (
    <div className="flex overflow-hidden h-[1.2em] font-mono font-bold">
      {digits.map((digit, i) => (
        <motion.div
          key={i}
          initial={{ y: "100%" }}
          whileInView={{ y: 0 }}
          transition={{ 
            delay: i * 0.1, 
            duration: 0.8, 
            ease: [0.16, 1, 0.3, 1] 
          }}
          className="flex flex-col"
        >
          <span className="inline-block">{digit}</span>
        </motion.div>
      ))}
    </div>
  );
};

const ScrambledText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState('');
  const chars = "!<>-_\\/[]{}—=+*^?#________";
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [isInView, text]);

  return <span ref={ref} className="inline-block">{displayText || text}</span>;
};

export const Services: React.FC = () => {
  return (
    <section id="services" className="relative min-h-screen w-full bg-[#0A0A0A] py-32 md:py-48 px-6 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/[0.02] to-transparent pointer-events-none" />
      
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">PRICING<br/>DATA</h2>
            <div className="mt-4 flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] opacity-40">
              <span className="w-8 h-[1px] bg-white" />
              <span>System_Online / Bagrat_Standard</span>
            </div>
          </motion.div>
          
          <p className="max-w-[280px] text-[10px] md:text-xs uppercase tracking-[0.2em] opacity-40 leading-relaxed text-right md:text-left">
            Selection of premium male grooming services for the modern architecture of style.
          </p>
        </div>

        {/* Pricing Table */}
        <div className="relative border-t border-white/10">
          {/* Header */}
          <div className="grid grid-cols-[1fr_repeat(3,60px)] md:grid-cols-[1fr_repeat(3,100px)] py-6 px-2 opacity-50 text-[10px] md:text-xs font-black tracking-[0.3em] uppercase">
            <div>Service_Type</div>
            <div className="text-center">ПРО</div>
            <div className="text-center">ТОП</div>
            <div className="text-center">БРЕНД</div>
          </div>

          {/* Rows */}
          {priceData.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.5 }}
              viewport={{ once: true }}
              className="group relative grid grid-cols-[1fr_repeat(3,60px)] md:grid-cols-[1fr_repeat(3,100px)] items-center border-b border-white/5 py-4 md:py-6 px-2 hover:bg-white/[0.02] transition-colors duration-300"
              data-cursor="hover"
            >
              <div className="text-[11px] md:text-sm font-bold tracking-tight pr-4">
                <ScrambledText text={item.name} />
              </div>
              
              {item.prices.map((price, pIdx) => (
                <div key={pIdx} className="flex justify-center text-xs md:text-lg opacity-80 group-hover:opacity-100 transition-opacity">
                  <RollingNumber value={price} />
                </div>
              ))}

              {/* Hover scanning line effect */}
              <div className="absolute left-0 bottom-0 w-0 h-[1px] bg-white/40 group-hover:w-full transition-all duration-700 ease-out" />
            </motion.div>
          ))}
        </div>

        {/* Footer info */}
        <div className="mt-20 flex flex-col md:flex-row justify-between items-center gap-8 opacity-20">
          <div className="text-[8px] uppercase tracking-widest flex items-center gap-4">
            <div className="w-2 h-2 border border-white rotate-45" />
            All procedures include premium care products
          </div>
          <div className="text-[8px] uppercase tracking-widest">
            Last updated: Oct 2024
          </div>
        </div>
      </div>
    </section>
  );
};
