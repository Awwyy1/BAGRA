
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SniperMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: string[];
}

export const SniperMenu: React.FC<SniperMenuProps> = ({ isOpen, onClose, links }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-6 md:hidden"
        >
          {/* Backdrop with Blur */}
          <motion.div 
            initial={{ backdropFilter: 'blur(0px)', backgroundColor: 'rgba(10,10,10,0)' }}
            animate={{ backdropFilter: 'blur(12px)', backgroundColor: 'rgba(10,10,10,0.9)' }}
            exit={{ backdropFilter: 'blur(0px)', backgroundColor: 'rgba(10,10,10,0)' }}
            className="absolute inset-0"
            onClick={onClose}
          />

          {/* Sniper HUD Elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Horizontal Scanning Line */}
            <motion.div 
              initial={{ top: '0%' }}
              animate={{ top: '100%' }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 w-full h-[1px] bg-white/10 z-10"
            />
            
            {/* Vertical Crosshair Lines */}
            <motion.div 
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-1/2 top-0 w-[0.5px] h-full bg-white/20 -translate-x-1/2"
            />
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-1/2 left-0 w-full h-[0.5px] bg-white/20 -translate-y-1/2"
            />

            {/* Rotating Targeting Circles */}
            <motion.div 
              initial={{ scale: 0, opacity: 0, rotate: 0 }}
              animate={{ scale: 1, opacity: 1, rotate: 360 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] aspect-square border border-white/5 rounded-full"
            >
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 border-t border-white/20 rounded-full"
              />
            </motion.div>
          </div>

          {/* Tactical Corners */}
          {[0, 90, 180, 270].map((rotation, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute w-12 h-12 border-t-2 border-l-2 border-white/40 pointer-events-none"
              style={{
                top: i < 2 ? '15%' : 'auto',
                bottom: i >= 2 ? '15%' : 'auto',
                left: i === 0 || i === 3 ? '10%' : 'auto',
                right: i === 1 || i === 2 ? '10%' : 'auto',
                rotate: `${rotation}deg`
              }}
            />
          ))}

          {/* Menu Content */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="mb-8 text-[10px] tracking-[1em] uppercase opacity-40 font-bold">Target_Locked</div>
            <nav className="flex flex-col items-center gap-6">
              {links.map((link, i) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  onClick={onClose}
                  className="group relative flex items-center gap-4"
                >
                  <motion.span 
                    whileHover={{ scale: 1.2 }}
                    className="w-2 h-2 border border-white rotate-45 opacity-0 group-hover:opacity-100 transition-all"
                  />
                  <span className="text-4xl font-black tracking-tighter uppercase group-hover:italic group-hover:translate-x-2 transition-all duration-300">
                    {link}
                  </span>
                  <div className="absolute -right-12 opacity-0 group-hover:opacity-100 transition-opacity text-[8px] font-mono">
                    [0{i+1}]
                  </div>
                </motion.a>
              ))}
            </nav>
            
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              onClick={onClose}
              className="mt-20 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group"
            >
              <div className="relative w-4 h-4">
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white rotate-45 group-hover:rotate-0 transition-transform" />
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white -rotate-45 group-hover:rotate-0 transition-transform" />
              </div>
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
