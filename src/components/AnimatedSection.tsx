import { motion } from "framer-motion";
import React from "react";

interface AnimatedSectionProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
}

export default function AnimatedSection({
  children,
  direction = "up",
  delay = 0,
}: AnimatedSectionProps) {
  // Define el desplazamiento inicial según la dirección
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration: 0.7, delay },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
