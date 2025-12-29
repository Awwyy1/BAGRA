
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { CustomCursor } from './components/CustomCursor';
import { Navigation } from './components/Navigation';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Services } from './sections/Services';
import { Masters } from './sections/Masters';
import { Gallery } from './sections/Gallery';
import { Contact } from './sections/Contact';

gsap.registerPlugin(ScrollTrigger);

// Компонент снежинки
const Snowflake: React.FC<{ delay: number; duration: number; left: string; size: number }> = ({ delay, duration, left, size }) => (
  <motion.div
    className="absolute top-0 rounded-full bg-white pointer-events-none"
    style={{
      left,
      width: size,
      height: size,
      filter: `blur(${size > 3 ? 1 : 0}px)`,
    }}
    initial={{ y: -20, opacity: 0 }}
    animate={{
      y: '100vh',
      opacity: [0, 1, 1, 0],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: 'linear',
    }}
  />
);

// Компонент снегопада
const Snowfall: React.FC = () => {
  const snowflakes = useMemo(() => {
    return Array.from({ length: 54 }, (_, i) => ({
      id: i,
      delay: (i / 54) * 15, // Равномерное распределение по времени
      duration: 12 + Math.random() * 8,
      left: `${Math.random() * 100}%`,
      size: 2 + Math.random() * 4,
    }));
  }, []);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden pointer-events-none">
      {snowflakes.map((flake) => (
        <Snowflake key={flake.id} {...flake} />
      ))}
    </div>
  );
};

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // 1. Инициализируем Lenis с базовыми настройками
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // 2. Связываем с ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    
    // 3. Цикл анимации (RAF)
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // 4. ResizeObserver для автоматического обновления высоты
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
      ScrollTrigger.refresh();
    });
    if (document.body) resizeObserver.observe(document.body);

    // 5. Логика загрузки
    const timer = setTimeout(() => {
      setIsLoaded(true);
      // Небольшая задержка перед показом контента, чтобы все успело отрендериться
      setTimeout(() => {
        setShowContent(true);
        lenis.resize();
        ScrollTrigger.refresh();
      }, 300);
    }, 1500);

    // Очистка
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      resizeObserver.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="relative bg-[#0A0A0A] text-white w-full">
      <Snowfall />
      <CustomCursor />
      <Navigation />
      
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100000] bg-[#0A0A0A] flex flex-col items-center justify-center pointer-events-none"
          >
            <motion.div
              animate={{ opacity: [0, 1, 0.5, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-[10px] tracking-[1.5em] font-light text-white ml-[1.5em] font-heading"
            >
              БАГРАТ
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main 
        ref={mainRef}
        className={`relative w-full transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}
      >
        <Hero />
        <About />
        <Services />
        <Masters />
        <Gallery />
        <Contact />
      </main>

      <footer className="fixed bottom-0 left-0 w-full p-8 pointer-events-none z-40 flex justify-between items-end opacity-20 hidden md:flex">
        <div className="text-[10px] tracking-widest uppercase font-mono">Стиль & Характер</div>
        <div className="text-[10px] tracking-widest uppercase font-mono">ОСН. 2025</div>
      </footer>
    </div>
  );
};

export default App;
