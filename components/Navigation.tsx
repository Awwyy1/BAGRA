
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Magnetic } from './Magnetic';

export const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const links = ['About', 'Services', 'Masters', 'Contact'];

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full p-6 md:px-12 md:py-10 z-[100] flex justify-between items-center pointer-events-none">
        <motion.div
          className="pointer-events-auto"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <a href="#" className="text-xl font-black tracking-tighter">BAGRAT</a>
        </motion.div>

        {/* Desktop Navigation */}
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

        {/* Mobile Menu Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden pointer-events-auto w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-[110]"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 6 : 0 }}
            className="w-6 h-[2px] bg-white block"
          />
          <motion.span
            animate={{ opacity: isMenuOpen ? 0 : 1 }}
            className="w-6 h-[2px] bg-white block"
          />
          <motion.span
            animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -6 : 0 }}
            className="w-6 h-[2px] bg-white block"
          />
        </motion.button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-[99] md:hidden flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-8">
              {links.map((link, i) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  onClick={handleLinkClick}
                  className="text-3xl uppercase tracking-[0.2em] font-light opacity-80 hover:opacity-100 transition-opacity"
                >
                  {link}
                </motion.a>
              ))}

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                onClick={handleLinkClick}
                className="mt-8 px-10 py-4 bg-white text-[#0A0A0A] text-sm uppercase font-bold tracking-[0.2em] rounded-full"
              >
                Book Now
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
