'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/shadcn/button';
import { Zap } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/SelfPresent/components/ui/tooltip';

export default function ButtonLogin() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleClick = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);

    window.location.assign('dashboard/events');
  };

  return (
    <motion.div
      animate={{ scale: [0.7, 0.9] }}
      transition={{ duration: 6, repeat: Infinity, repeatType: 'reverse' }}
      className="flex items-center justify-center rounded-full border-neutral-200 leading-none dark:border-neutral-800"
    >
      <Button
        size="icon"
        onClick={() => handleClick()}
        className="flex items-center justify-center rounded-full text-center"
        loading={isSubmitting}
      >
        {!isSubmitting && (
          <motion.div
            animate={{ scale: [0.8, 1] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: 1
            }}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Zap aria-label="Log In" size={19} className="" />
                </TooltipTrigger>
                <TooltipContent>Log in</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>
        )}
      </Button>
    </motion.div>
  );
}
