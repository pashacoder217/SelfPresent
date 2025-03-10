// components/ui/LogoCloud/LogoCloud.tsx

import Image from 'next/image';

export default function LogoCloud() {
  return (
    <div>
      <p className="mt-24 text-center text-xs font-bold uppercase tracking-[0.3em] text-neutral-400">
        Brought to you by
      </p>
      <div className="my-12 grid grid-cols-1	place-items-center space-y-4 sm:mt-8 sm:grid sm:grid-cols-5 sm:gap-6 sm:space-y-0 md:mx-auto md:max-w-2xl">
        <div className="flex h-12 items-center justify-start">
          <a href="https://nextjs.org" aria-label="Next.js Link">
            <Image
              src="/nextjs.svg"
              alt="Next.js Logo"
              width={48}
              height={48}
              className="h-6 text-white sm:h-12"
            />
          </a>
        </div>
        <div className="flex h-12 items-center justify-start">
          <a href="https://vercel.com" aria-label="Vercel.com Link">
            <Image
              src="/vercel.svg"
              alt="Vercel.com Logo"
              width={48}
              height={48}
              className="h-6 text-white"
            />
          </a>
        </div>
        <div className="flex h-12 items-center justify-start">
          <a href="https://stripe.com" aria-label="stripe.com Link">
            <Image
              src="/stripe.svg"
              alt="stripe.com Logo"
              width={48}
              height={48}
              className="h-12 text-white"
            />
          </a>
        </div>
        <div className="flex h-12 items-center justify-start">
          <a href="https://supabase.io" aria-label="supabase.io Link">
            <Image
              src="/supabase.svg"
              alt="supabase.io Logo"
              width={48}
              height={48}
              className="h-10 text-white"
            />
          </a>
        </div>
        <div className="flex h-12 items-center justify-start">
          <a href="https://github.com" aria-label="github.com Link">
            <Image
              src="/github.svg"
              alt="github.com Logo"
              width={48}
              height={48}
              className="h-8 text-white"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
