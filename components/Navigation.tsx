
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Magnetic } from './Magnetic';
import { SniperMenu } from './SniperMenu';

export const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const links = ['About', 'Services', 'Masters', 'Contact'];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full p-6 md:p-8 md:px-12 md:py-10 z-[150] flex justify-between items-center pointer-events-none">
        {/* Logo */}
        <motion.div
          className="pointer-events-auto flex-1 md:flex-none"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <a href="#" className="text-xl font-black tracking-tighter">BAGRAT</a>
        </motion.div>

        {/* Desktop Links (Hidden on Mobile) */}
        <div className="hidden md:flex gap-8 pointer-events-auto items-center">
          {links.map((link, i) => (
            <Magnetic key={link}>
              <motion.a
                href={`#${link.toLowerCase()}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.5, duration: 0.8 }}
                className="text-[11px] uppercase tracking-[0.2em] font-medium opacity-60 hover:opacity-100 transition-opacity"
                data-cursor="hover"
              >
                {link}
              </motion.a>
            </Magnetic>
          ))}

          <Magnetic>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="ml-4 px-6 py-2 bg-white text-[#0A0A0A] text-[10px] uppercase font-bold tracking-[0.1em] rounded-full"
              data-cursor="hover"
            >
              Book Now
            </motion.button>
          </Magnetic>
        </div>

        {/* Mobile Central "Breathing" Book Button */}
        <div className="md:hidden flex-1 flex justify-center pointer-events-auto">
          <motion.button
            animate={{
              opacity: [0.4, 1, 0.4],
              letterSpacing: ["0.2em", "0.4em", "0.2em"],
              scale: [0.98, 1, 0.98]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-[9px] font-bold uppercase border border-white/20 px-4 py-1.5 rounded-full backdrop-blur-sm"
          >
            Book
          </motion.button>
        </div>

        {/* Mobile Tactical Trigger (Right) */}
        <div className="md:hidden pointer-events-auto flex-1 flex justify-end">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="relative w-10 h-10 flex items-center justify-center"
            aria-label="Open Tactical Menu"
          >
            {/* Crosshair lines */}
            <div className="absolute w-full h-[1px] bg-white opacity-40" />
            <div className="absolute h-full w-[1px] bg-white opacity-40" />
            {/* Inner target circle */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-4 h-4 border border-white rounded-full flex items-center justify-center"
            >
              <div className="w-1 h-1 bg-white rounded-full" />
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
