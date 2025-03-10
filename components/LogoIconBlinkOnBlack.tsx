'use client';
import { motion } from 'framer-motion';

export default function LogoIconBlinkOnBlack() {
  return (
    <motion.div
      className="h-4 w-0.5 rounded-xl bg-neutral-800/50"
      initial={{ scaleY: 0.25, scaleX: 0.4 }}
      animate={{ scaleY: 1, scaleX: 1 }}
      transition={{
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
        type: 'spring',
        stiffness: 8
      }}
      style={{ originY: 0.5 }}
    />
  );
}
