'use client';

import { X } from 'lucide-react';
import { motion } from 'framer-motion';
// import { Button } from '@/components/ui/Button';

export default function LogoXIconRotate() {
  return (
    <motion.div
      initial={{ rotate: -45, scale: 0.8 }}
      animate={{ rotate: 0, scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 5, // Lower stiffness makes the spring effect less rigid
        damping: 8, // Higher damping slows down the motion
        mass: 1, // Increased mass makes the spring effect feel heavier
        duration: 13, // Duration to complete the animation
        delay: 1 // Starts the animation after a delay
      }}
    >
      <button
        // variant="outline"
        // size="icon"
        className="h-5 w-5 shrink-0 bg-opacity-10"
      >
        <motion.div
          initial={{ rotate: -45, scale: 0.8 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 5, // Lower stiffness makes the spring effect less rigid
            damping: 8, // Higher damping slows down the motion
            mass: 1, // Increased mass makes the spring effect feel heavier
            duration: 13, // Duration to complete the animation
            delay: 1 // Starts the animation after a delay
          }}
        >
          <X className="h-4 w-4 text-neutral-400 dark:text-neutral-300 " />
        </motion.div>
      </button>
    </motion.div>
  );
}
