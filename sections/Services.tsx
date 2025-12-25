
import React from 'react';
import { motion } from 'framer-motion';

const services = [
  { title: "The Signature Cut", desc: "Precision tailored to your cranial architecture.", size: "col-span-2 row-span-2", img: "https://images.unsplash.com/photo-1599351431247-f13150b0ad38?q=80&w=1974&auto=format&fit=crop" },
  { title: "Hot Towel Shave", desc: "Traditional steel ritual.", size: "col-span-1 row-span-1", img: "https://images.unsplash.com/photo-1512690118299-a91f04176161?q=80&w=2070&auto=format&fit=crop" },
  { title: "Beard Sculpting", desc: "Contour and structure.", size: "col-span-1 row-span-1", img: "https://images.unsplash.com/photo-1622286332618-f2802b2c3063?q=80&w=2070&auto=format&fit=crop" },
  { title: "Scalp Therapy", desc: "Depth hydration for the modern mind.", size: "col-span-2 row-span-1", img: "https://images.unsplash.com/photo-1620331713240-ed6041a57659?q=80&w=1974&auto=format&fit=crop" },
];

export const Services: React.FC = () => {
  return (
    <section id="services" className="relative min-h-screen w-full bg-[#0A0A0A] py-40 px-8">
      <div className="max-w-7xl mx-auto space-y-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <h2 className="text-8xl font-black tracking-tighter leading-none">THE<br/>LIST</h2>
            <p className="max-w-xs text-sm uppercase tracking-[0.2em] opacity-40">
                A selection of services designed for absolute refinement.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-3 gap-0.5 bg-white/10 border border-white/10 overflow-hidden">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`${service.size} relative group bg-[#0A0A0A] overflow-hidden p-8 flex flex-col justify-end min-h-[300px]`}
              data-cursor="hover"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-700">
                <img src={service.img} className="w-full h-full object-cover grayscale" alt={service.title} />
              </div>
              
              <div className="relative z-10 space-y-2">
                <div className="text-[10px] uppercase tracking-widest opacity-40">0{idx+1}</div>
                <h3 className="text-2xl font-bold tracking-tight">{service.title}</h3>
                <p className="text-sm font-light opacity-60 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  {service.desc}
                </p>
              </div>

              {/* Hairline highlight */}
              <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 transition-colors pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
