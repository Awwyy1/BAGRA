
import React from 'react';
import { motion } from 'framer-motion';
import { Magnetic } from './Magnetic';

export const Navigation: React.FC = () => {
  const links = ['About', 'Services', 'Masters', 'Contact'];

  return (
    <nav className="fixed top-0 left-0 w-full p-8 md:px-12 md:py-10 z-[100] flex justify-between items-center pointer-events-none">
      <motion.div 
        className="pointer-events-auto"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <a href="#" className="text-xl font-black tracking-tighter">BAGRAT</a>
      </motion.div>

      <div className="flex gap-8 pointer-events-auto items-center">
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
    </nav>
  );
};
