'use client';

import { motion } from 'framer-motion';
import { Badge } from './ui/shadcn/badge';

export default function BadgeHoverMarketing() {
  const animationProps = {
    animate: { y: [0, -10, 0] },
    transition: {
      duration: 7,
      repeat: Infinity,
      repeatType: 'reverse' as const, // Explicitly type 'reverse' as a constant
      ease: 'easeInOut'
    }
  };

  return (
    <motion.div className="my-5 flex justify-center" {...animationProps}>
      <Badge className="flex items-center whitespace-nowrap rounded-full bg-gradient-to-r from-neutral-700 to-neutral-900 px-1.5 py-1 dark:from-neutral-500/10 dark:to-neutral-100/20">
        <motion.div
          className="flex items-center"
          animate={{ y: [0, -2, 0] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: 1 // Staggered start after the parent
          }}
        >
          <Badge variant="secondary" className="mr-3 rounded-full uppercase">
            <motion.p
              className=""
              animate={{ y: [0, -1, 0] }}
              transition={{
                duration: 7,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
                delay: 2 // Staggered start after the previous motion component
              }}
            >
              AI
            </motion.p>
          </Badge>
        </motion.div>
        <motion.p
          className="bg-gradient-to-r from-neutral-100 to-neutral-300 bg-clip-text pr-2 text-center font-light uppercase text-transparent dark:from-neutral-900 dark:to-neutral-700"
          animate={{ y: [0, -1, 0] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: 3 // Staggered start after the previous motion component
          }}
        >
          <span className="font-bold">Assistant + Tools</span>
        </motion.p>
      </Badge>
    </motion.div>
  );
}
