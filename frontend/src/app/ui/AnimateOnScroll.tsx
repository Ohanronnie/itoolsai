"use client";
import { motion } from "framer-motion";
import React from "react";

type AnimateOnScrollProps = {
  children: React.ReactNode;
  animation?: "fade" | "slide-up" | "slide-down" | "zoom-in" | "zoom-out";
};

export default function AnimateOnScroll({
  children,
  animation = "fade",
}: AnimateOnScrollProps) {
  const animations = {
    fade: { initial: { opacity: 0 }, animate: { opacity: 1 } },
    "slide-up": {
      initial: { y: 50, opacity: 0 },
      animate: { y: 0, opacity: 1 },
    },
    "slide-down": {
      initial: { y: -50, opacity: 0 },
      animate: { y: 0, opacity: 1 },
    },
    "zoom-in": {
      initial: { scale: 0.8, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
    },
    "zoom-out": {
      initial: { scale: 1.2, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
    },
  };

  const selectedAnimation = animations[animation] || animations.fade;

  return (
    <motion.div
      initial={selectedAnimation.initial}
      whileInView={selectedAnimation.animate}
      viewport={{ once: false, amount: 0.2 }} // Trigger animation once when 20% of the element is visible
      transition={{ duration: 1 }}
    >
      {children}
    </motion.div>
  );
}
