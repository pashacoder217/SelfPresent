// components/ui/flip-words.tsx

'use client';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { AnimatePresence, motion, LayoutGroup } from 'framer-motion';
import { cn } from '@/utils/cn';
let interval: any;

export const FlipWords = ({
  words,
  duration = 3000,
  className
}: {
  words: string[];
  duration?: number;
  className?: string;
}) => {
  const [currentWord, setCurrentWord] = useState(words[0]);

  const startAnimation = useCallback(() => {
    let i = 0;
    interval = setInterval(() => {
      i++;
      if (i === words.length) {
        i = 0;
      }
      const word = words[i];
      setCurrentWord(word);
    }, duration);
  }, [words, duration]);

  useEffect(() => {
    startAnimation();

    return () => {
      clearInterval(interval);
    };
  }, [startAnimation]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{
          opacity: 0,
          y: 10
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.4,
          ease: 'easeInOut',
          type: 'spring',
          stiffness: 100,
          damping: 10
        }}
        exit={{
          opacity: 0,
          y: -40,
          x: 40,
          filter: 'blur(8px)',
          scale: 2,
          position: 'absolute'
        }}
        className={cn(
          'relative z-10 inline-block px-2 text-neutral-800 dark:text-neutral-100',
          className
        )}
        key={currentWord}
      >
        {currentWord.split('').map((letter, index) => (
          <motion.span
            key={currentWord + index}
            initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{
              delay: index * 0.08,
              duration: 0.4
            }}
            className="inline-block"
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};
