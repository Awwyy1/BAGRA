
import React from 'react';
import { motion } from 'framer-motion';
import { Magnetic } from '../components/Magnetic';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="relative h-screen w-full bg-[#0F0F0F] flex flex-col items-center justify-center px-8 overflow-hidden">
        {/* Decorative Background Text */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
            <h2 className="text-[40vw] font-black tracking-tighter">RESERVE</h2>
        </div>

        <div className="relative z-10 text-center space-y-12 max-w-4xl">
            <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="text-7xl md:text-[10vw] font-black tracking-tighter leading-none"
            >
                STEP INTO THE<br/>SQUARE.
            </motion.h2>
            
            <p className="text-lg md:text-2xl font-light opacity-60">
                A chair is waiting for your next legacy chapter.
            </p>

            <div className="pt-12">
                <Magnetic strength={0.3}>
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative px-20 py-8 bg-white text-black text-xs uppercase font-black tracking-[0.5em] rounded-full overflow-hidden"
                        data-cursor="text"
                        data-cursor-text="BOOK"
                    >
                        <span className="relative z-10">Secure Your Slot</span>
                        <motion.div className="absolute inset-0 bg-gray-200 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    </motion.button>
                </Magnetic>
            </div>
        </div>

        <div className="absolute bottom-20 w-full px-12 flex flex-col md:flex-row justify-between items-center gap-8 opacity-40">
            <div className="flex gap-12 text-[10px] uppercase tracking-widest font-bold">
                <a href="#" className="hover:text-white transition-colors">Instagram</a>
                <a href="#" className="hover:text-white transition-colors">Telegram</a>
                <a href="#" className="hover:text-white transition-colors">WhatsApp</a>
            </div>
            
            <div className="text-[10px] uppercase tracking-widest font-bold text-center md:text-right">
                12 Luxury Ave, Downtown<br/>
                Mon - Sun: 10:00 - 22:00
            </div>
        </div>
    </section>
  );
};
