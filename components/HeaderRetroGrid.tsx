import Meteors from '@/SelfPresent/components/magicui/meteors';
import { Badge } from './ui/shadcn/badge';

export function HeaderMeteor() {
  return (
    <>
      <div className="relative flex w-full flex-col items-center justify-center overflow-visible rounded-lg bg-background p-20 pb-20 pt-48">
        <Meteors number={6} />
        <Badge className="mb-4 flex items-center justify-center whitespace-nowrap rounded-full bg-gradient-to-r from-neutral-700 to-neutral-900 px-8 py-1 dark:from-neutral-500/10 dark:to-neutral-100/20">
          <p className="bg-gradient-to-r from-neutral-100 to-neutral-300 bg-clip-text text-center font-light uppercase text-transparent dark:from-neutral-900 dark:to-neutral-700">
            AI tools to <span className="font-bold">self represent</span>
          </p>
        </Badge>
        <h1 className="z-10 mt-8 h-16 whitespace-pre-wrap bg-gradient-to-r from-neutral-700 to-neutral-950 bg-clip-text text-center text-6xl font-medium leading-none tracking-tighter text-transparent dark:from-neutral-300 dark:to-neutral-100 md:text-7xl md:leading-snug">
          Never feel lost in family court again
        </h1>
      </div>
    </>
  );
}
