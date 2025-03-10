'use client';

import { cn } from '@/SelfPresent/lib/utils';
import DotPattern from '@/SelfPresent/components/magicui/dot-pattern';
import { MagicAnimatedList } from './MagicAnimatedList';
import { Roboto_Mono } from 'next/font/google';

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
});

const BackgroundDotPattern = () => {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden  border-t bg-background px-10 py-20 md:p-20 ">
      <div className="flex w-full flex-col items-center justify-center gap-12 md:flex-row">
        <div>
          <h2 className="z-10 whitespace-pre-wrap bg-gradient-to-r from-neutral-950 to-neutral-800 bg-clip-text text-center text-5xl font-medium tracking-tighter text-transparent dark:from-neutral-300 dark:to-neutral-100 md:mr-4">
            USA and Canada
          </h2>
          <p
            className={`bg-gradient-to-r from-neutral-600 to-neutral-800 bg-clip-text pt-6 text-center text-lg text-transparent dark:from-neutral-500 dark:to-neutral-400 md:text-xl ${robotoMono.className}`}
          >
            Get instant legal family law information for your jurisdiction
          </p>
        </div>
        <MagicAnimatedList />
      </div>
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          '[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] '
        )}
      />
    </div>
  );
};

export default BackgroundDotPattern;
