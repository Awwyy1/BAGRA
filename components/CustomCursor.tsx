
import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [cursorType, setCursorType] = useState<'default' | 'hover' | 'text'>('default');
  const [cursorText, setCursorText] = useState('');

  const springConfig = { damping: 30, stiffness: 250, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverAttr = target?.closest ? target.closest('[data-cursor]') : null;
      
      if (hoverAttr) {
        const type = hoverAttr.getAttribute('data-cursor') as any;
        const text = hoverAttr.getAttribute('data-cursor-text') || '';
        setCursorType(type || 'hover');
        setCursorText(text);
      } else {
        setCursorType('default');
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[10000] mix-blend-difference"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      <motion.div
        animate={{
          scale: cursorType === 'hover' ? 3 : cursorType === 'text' ? 4 : 1,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 150 }}
        className="w-5 h-5 rounded-full border border-white flex items-center justify-center overflow-hidden"
      >
        {cursorType === 'text' && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[2px] uppercase font-bold text-white tracking-tighter"
          >
            {cursorText}
          </motion.span>
        )}
        {cursorType === 'default' && (
          <div className="w-1 h-1 bg-white rounded-full" />
        )}
      </motion.div>
    </motion.div>
  );
};
