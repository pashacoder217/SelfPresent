// src/app/layout.tsx
import { ThemeProvider } from 'next-themes';
import { createClient } from '@/utils/supabase/server';
import type { Metadata } from 'next';
import { Inter as FontSans, Roboto_Mono } from 'next/font/google';

import { cn } from '@/SelfPresent/lib/utils';
import Link from 'next/link';

import { Archive, Brain } from 'lucide-react';

import { Badge } from '@/SelfPresent/components/ui/shadcn/badge';

import { Poppins } from 'next/font/google';
import LogoXIconRotate from '@/SelfPresent/components/LogoXIconRotate';
import SwitchCustom from '@/SelfPresent/components/SwitchCustomVertical';
import { redirect } from 'next/navigation';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap'
});

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
});

export default async function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  //   const supabase = createClient();
  //   const { data, error } = await supabase.auth.getUser();
  //   if (error || !data?.user) {
  //     redirect("/login");
  //   }
  //   console.log("data", data, "user", data.user, "error", error);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className=" flex h-14 items-center border-b px-4 pl-5 lg:ml-1.5 lg:h-[60px]">
            <Link href="/" className="flex gap-2 pt-1 font-semibold">
              <LogoXIconRotate />
              <span
                className={`${poppins.className} bg-gradient-to-r from-neutral-800 via-neutral-600 to-neutral-800 bg-clip-text pl-1 text-sm font-medium tracking-widest text-transparent dark:from-neutral-300 dark:via-neutral-200 dark:to-neutral-300 md:ml-0.5`}
              >
                selfrepresent.ai
              </span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="mt-2 grid items-start gap-4 px-2 text-sm font-medium lg:px-4">
              <div
                className="flex flex-col items-start gap-2 rounded-lg px-3 py-3 text-muted-foreground transition-all hover:text-primary/40" // Increased py from 2 to 3
              >
                <div className="flex items-center gap-3">
                  <Brain strokeWidth={1} className="h-5 w-5" />
                  <h2
                    className={`${robotoMono.className} text-md tracking-wider`}
                  >
                    AI Research
                  </h2>
                </div>
                {/* <hr className="my-2 w-full border-neutral-700" /> */}
                <p
                  className={`${poppins.className} pt-2 text-xs font-normal leading-5 tracking-wider text-muted-foreground`}
                >
                  Utilize AI to enhance legal research capabilities.
                </p>
              </div>
              <div
                className="flex flex-col items-start gap-2 rounded-lg px-3 py-3 text-muted-foreground  transition-all hover:text-primary/40" // Increased py from 2 to 3
              >
                <div className="flex items-center gap-3">
                  <Archive className="h-5 w-5" />
                  <h2
                    className={`${robotoMono.className} text-md tracking-wider`}
                  >
                    AI Evidence
                  </h2>
                </div>
                <p
                  className={`${poppins.className} pt-2 text-xs font-normal leading-5 tracking-wider text-muted-foreground`}
                >
                  Organize and manage case evidence efficiently with AI.
                </p>
              </div>
            </nav>
          </div>
          <div className="mb-8 flex justify-center">
            <div>
              <SwitchCustom />
            </div>
          </div>
        </div>
      </div>

      <div>{children}</div>
    </div>
  );
}
