import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  once?: boolean; // Para controlar si la animación se reproduce una sola vez al entrar en la vista
  className?: string; // Para pasar clases adicionales al contenedor de la animación
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  once = true,
  className = '',
}) => {
  const getVariants = () => {
    switch (direction) {
      case 'up':
        return {
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        };
      case 'down':
        return {
          hidden: { opacity: 0, y: -50 },
          visible: { opacity: 1, y: 0 },
        };
      case 'left':
        return {
          hidden: { opacity: 0, x: -50 },
          visible: { opacity: 1, x: 0 },
        };
      case 'right':
        return {
          hidden: { opacity: 0, x: 50 },
          visible: { opacity: 1, x: 0 },
        };
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className={className}
        initial="hidden"
        whileInView="visible" // Animación cuando el elemento entra en el viewport
        viewport={{ once: once, amount: 0.5 }} // 'once: true' para que solo se anime una vez
        variants={getVariants()}
        transition={{ duration, delay }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedSection;
