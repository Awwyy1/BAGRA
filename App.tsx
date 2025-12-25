
import React, { useEffect, useState, useRef } from 'react';
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
              className="text-[10px] tracking-[2.5em] font-light text-white ml-[2.5em]"
            >
              BAGRAT
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
        <div className="text-[10px] tracking-widest uppercase">Precision & Legacy</div>
        <div className="text-[10px] tracking-widest uppercase">EST. 2024</div>
      </footer>
    </div>
  );
};

export default App;
