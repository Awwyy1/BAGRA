
import React from 'react';
import { motion } from 'framer-motion';
import { Magnetic } from '../components/Magnetic';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="relative min-h-[80vh] md:min-h-screen w-full bg-[#0F0F0F] flex flex-col items-center justify-center px-4 md:px-8 py-12 md:py-20 overflow-hidden">
        {/* Decorative Background Text */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
            <h2 className="text-[30vw] md:text-[40vw] font-black tracking-tighter font-heading">ЗАПИСЬ</h2>
        </div>

        <div className="relative z-10 text-center space-y-6 md:space-y-12 max-w-4xl">
            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="text-5xl md:text-7xl lg:text-[10vw] font-black tracking-tighter leading-none font-heading"
            >
                МЕСТО<br/>СИЛЫ.
            </motion.h2>

            <p className="text-base md:text-lg lg:text-2xl font-light opacity-60 px-4">
                Стрижем так, что хочется вернуться.
            </p>

            <div className="pt-6 md:pt-12">
                <Magnetic strength={0.3}>
                    <motion.a
                        href="https://n49534.yclients.com/company/67283/personal/select-master?o="
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative px-10 md:px-20 py-5 md:py-8 bg-white text-black text-[10px] md:text-xs uppercase font-bold tracking-[0.2em] md:tracking-[0.3em] rounded-full overflow-hidden inline-block"
                        data-cursor="text"
                        data-cursor-text="ЗАПИСЬ"
                    >
                        <span className="relative z-10">Забронировать</span>
                        <motion.div className="absolute inset-0 bg-gray-200 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    </motion.a>
                </Magnetic>
            </div>
        </div>

        <div className="absolute bottom-6 md:bottom-20 w-full px-4 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8 opacity-40">
            <div className="flex gap-6 md:gap-12 text-[10px] uppercase tracking-widest font-bold font-mono">
                <a href="https://www.instagram.com/bagrat_team_" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
                <a href="https://wa.me/79639655444" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp</a>
            </div>

            <div className="text-[10px] uppercase tracking-widest font-bold text-center md:text-right font-mono">
                <a href="https://yandex.com.ge/maps/-/CLHGaN0T" target="_blank" rel="noopener noreferrer" className="md:hidden hover:text-white transition-colors underline underline-offset-2">Новозаводская улица, 2 к5р</a>
                <span className="hidden md:inline">Новозаводская улица, 2 к5р</span><br/>
                Пн — Вс: 10:00 — 22:00
            </div>
        </div>
    </section>
  );
};
