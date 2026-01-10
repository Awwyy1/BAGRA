
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Hero: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const hudScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <section ref={ref} className="relative min-h-[100vh] w-full overflow-hidden flex flex-col items-center justify-center bg-[#0A0A0A]">

      {/* Фоновый кинематографичный слой */}
      <motion.div style={{ opacity }} className="absolute inset-0 z-0">
        <div className="w-full h-full relative opacity-[0.15]">
           <img
            src="/images/philosophy/hero.jpg"
            className="w-full h-full object-cover grayscale brightness-[0.7]"
            alt="Hero Background"
           />
           <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
        </div>
      </motion.div>

      {/* Основной HUD-интерфейс (Sniper View) */}
      <motion.div
        style={{ scale: hudScale, opacity }}
        className="relative z-30 w-full max-w-4xl aspect-square md:aspect-video flex items-center justify-center px-4 -mt-24 md:mt-0"
      >
        <div className="relative w-full h-full flex items-center justify-center">

          {/* 1. Направляющие оси (Перекрестие) */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-1/2 top-0 w-[0.5px] h-full bg-white/10 -translate-x-1/2"
          />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-1/2 left-0 w-full h-[0.5px] bg-white/10 -translate-y-1/2"
          />

          {/* 2. Вращающиеся элементы (Орбиты) */}
          <div className="relative w-[65vw] md:w-[400px] aspect-square flex items-center justify-center">
            {/* Внешнее кольцо с маркером */}
            <motion.div
              initial={{ rotate: 0, opacity: 0, scale: 0.8 }}
              animate={{ rotate: 360, opacity: 1, scale: 1 }}
              transition={{
                rotate: { duration: 40, repeat: Infinity, ease: "linear" },
                opacity: { duration: 1.2 },
                scale: { duration: 1.2 }
              }}
              className="absolute inset-0 border border-white/5 rounded-full"
            >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-6 bg-white/30" />
            </motion.div>

            {/* Внутреннее прерывистое кольцо */}
            <motion.div
              initial={{ rotate: 0, opacity: 0 }}
              animate={{ rotate: -360, opacity: 1 }}
              transition={{
                rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                opacity: { duration: 1.5 }
              }}
              className="absolute inset-12 border-t border-b border-white/20 rounded-full"
            />

            {/* Центральная точка с эффектом пульсации */}
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center"
            >
              <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.6)]" />
            </motion.div>
          </div>

          {/* 3. Тактические угловые скобки */}
          {[0, 90, 180, 270].map((rotation, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.1, duration: 1.2, ease: "easeOut" }}
              className="absolute w-14 h-14 md:w-24 md:h-24 border-t-[0.5px] border-l-[0.5px] border-white/25"
              style={{
                top: i < 2 ? '5%' : 'auto',
                bottom: i >= 2 ? '5%' : 'auto',
                left: i === 0 || i === 3 ? '5%' : 'auto',
                right: i === 1 || i === 2 ? '5%' : 'auto',
                rotate: `${rotation}deg`
              }}
            />
          ))}

          {/* Техническая информация (Кириллица) */}
          <div className="absolute top-[8%] left-[8%] md:top-[10%] md:left-[10%]">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 0.3, x: 0 }}
              transition={{ delay: 1.2 }}
              className="text-[7px] md:text-[9px] font-mono tracking-widest opacity-30 leading-relaxed uppercase text-left space-y-0.5 md:space-y-1"
            >
              <p>МАСТЕР: ВООРУЖЕН</p>
              <p className="hidden md:block">ИНСТРУМЕНТ: СТЕРИЛЬНЫЙ</p>
              <p>ТОЧНОСТЬ: 100%</p>
            </motion.div>
          </div>

          <div className="absolute bottom-[8%] right-[8%] md:bottom-[10%] md:right-[10%] text-right">
             <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 0.3, x: 0 }}
                transition={{ delay: 1.4 }}
                className="text-[7px] md:text-[9px] font-mono tracking-widest opacity-30 uppercase"
              >
                <span className="hidden md:inline">РЕЖИМ: </span>FREE ПАРКИНГ<br/>
                ЛОКАЦИЯ: ФИЛИ
             </motion.div>
          </div>
        </div>

        {/* Главный текстовый слоган под HUD */}
        <motion.div
          style={{ y: textY }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ delay: 1.8, duration: 1.5 }}
          className="absolute bottom-[-100px] md:bottom-[-120px] text-center w-full"
        >
          <span className="text-[10px] md:text-[14px] uppercase font-light text-white tracking-[0.5em] md:tracking-[0.8em] ml-[0.5em] md:ml-[0.8em]">
            мужское раздаем
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
};
