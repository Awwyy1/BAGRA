
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Magnetic } from './Magnetic';
import { SniperMenu } from './SniperMenu';

export const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const links = [
    { id: 'about', label: 'О нас' },
    { id: 'services', label: 'Услуги' },
    { id: 'masters', label: 'Мастера' },
    { id: 'gallery', label: 'Галерея' }
  ];

  const bookingUrl = "https://n49534.yclients.com/company/67283/personal/select-master?o=";

  return (
    <>
      <nav className="fixed top-0 left-0 w-full p-4 md:p-6 md:px-12 z-[150] flex justify-between items-center pointer-events-none bg-black/10 backdrop-blur-[2px]">
        {/* Logo */}
        <motion.div
          className="pointer-events-auto flex-1 md:flex-none"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <a href="#" className="text-xl font-black tracking-tighter font-heading relative">
            <span className="relative inline-block">
              Б
              {/* Santa Hat */}
              <svg
                className="absolute -top-4 -left-1 w-7 h-7"
                viewBox="0 0 100 100"
                fill="none"
              >
                {/* Красный колпак */}
                <path
                  d="M20 70 Q25 30 50 15 Q60 25 70 65 Z"
                  fill="#c41e3a"
                />
                {/* Тень на колпаке */}
                <path
                  d="M35 70 Q40 40 50 20 Q55 35 60 65 Z"
                  fill="#a01830"
                  opacity="0.5"
                />
                {/* Белый мех снизу */}
                <ellipse cx="45" cy="72" rx="30" ry="8" fill="white"/>
                <ellipse cx="45" cy="72" rx="30" ry="6" fill="#f5f5f5"/>
                {/* Помпон */}
                <circle cx="50" cy="12" r="10" fill="white"/>
                <circle cx="48" cy="10" r="8" fill="#f5f5f5"/>
              </svg>
            </span>
            АГРАТ
          </a>
        </motion.div>

        {/* Desktop Links (Hidden on Mobile) */}
        <div className="hidden md:flex gap-8 pointer-events-auto items-center">
          {links.map((link, i) => (
            <Magnetic key={link.id}>
              <motion.a
                href={`#${link.id}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.5, duration: 0.8 }}
                className="text-[11px] uppercase tracking-[0.2em] font-medium opacity-60 hover:opacity-100 transition-opacity"
                data-cursor="hover"
              >
                {link.label}
              </motion.a>
            </Magnetic>
          ))}

          <Magnetic>
            <motion.a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="ml-4 px-6 py-2 bg-white text-[#0A0A0A] text-[10px] uppercase font-bold tracking-[0.1em] rounded-full inline-block"
              data-cursor="hover"
            >
              Записаться
            </motion.a>
          </Magnetic>
        </div>

        {/* Mobile Central "Breathing" Book Button */}
        <div className="md:hidden flex-1 flex justify-center pointer-events-auto">
          <motion.a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            animate={{
              opacity: [0.4, 1, 0.4],
              letterSpacing: ["0.1em", "0.2em", "0.1em"],
              scale: [0.98, 1, 0.98]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-[9px] font-bold uppercase border border-white/20 px-4 py-1.5 rounded-full backdrop-blur-sm font-mono"
          >
            Запись
          </motion.a>
        </div>

        {/* Mobile Tactical Trigger (Right) */}
        <div className="md:hidden pointer-events-auto flex-1 flex justify-end">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="relative w-10 h-10 flex items-center justify-center"
            aria-label="Открыть меню"
          >
            {/* Crosshair lines */}
            <div className="absolute w-full h-[1px] bg-red-500 opacity-60" />
            <div className="absolute h-full w-[1px] bg-red-500 opacity-60" />
            {/* Inner target circle */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-4 h-4 border border-red-500 rounded-full flex items-center justify-center"
            >
              <div className="w-1 h-1 bg-red-500 rounded-full" />
            </motion.div>
          </button>
        </div>
      </nav>

      <SniperMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        links={links}
      />
    </>
  );
};
