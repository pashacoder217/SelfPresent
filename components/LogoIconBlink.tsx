'use client';
import { motion } from 'framer-motion';

export default function LogoIconBlink() {
  return (
    <motion.div
      className="h-6 w-1 rounded-xl bg-neutral-500"
      initial={{ scaleY: 0.75, scaleX: 0.4 }}
      animate={{ scaleY: 1, scaleX: 1 }}
      transition={{
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
        type: 'spring',
        stiffness: 10
      }}
      style={{ originY: 0.5 }}
    />
  );
}
