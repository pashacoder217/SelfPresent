'use client';

import { cn } from '@/SelfPresent/lib/utils';
import { useEffect, useState } from 'react';

interface TypingAnimationProps {
  text: string;
  duration?: number;
  className?: string;
}

export default function TypingAnimation({
  text,
  duration = 200,
  className
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState<string>('');
  const [i, setI] = useState<number>(0);

  useEffect(() => {
    const typingEffect = setInterval(() => {
      setDisplayedText((prevState) => prevState + text.charAt(i));
      setI((prevI) => prevI + 1);
    }, duration);

    if (i >= text.length) {
      clearInterval(typingEffect);
    }

    return () => {
      clearInterval(typingEffect);
    };
  }, [duration, i, text]);

  return (
    <h1
      className={cn(
        'font-display bg-gradient-to-r from-neutral-900 to-neutral-700 bg-clip-text text-center text-4xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm dark:from-neutral-300 dark:to-neutral-100 md:text-7xl md:leading-[5rem]',
        className
      )}
    >
      {displayedText ? displayedText : text}
    </h1>
  );
}
