// components/onboarding/childrenInfoCp.tsx

"use client";

import { Poppins } from "next/font/google";
import { Button } from "../ui/shadcn/button";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function WelcomeCP() {
  return (
    <>
      <h1
        className={`${poppins.className} bg-gradient-to-r from-neutral-500 to-neutral-950 bg-clip-text pb-10 text-center text-3xl font-light text-transparent dark:from-neutral-400/90 dark:to-neutral-200/90 md:text-4xl`}
      >
        Welcome!
      </h1>
      <div className="flex flex-col items-center space-y-4 p-4 w-full">
        <div className="text-center w-full">
          <Link href={`/pricing`}>
            <Button>
              Get Started
            </Button>
          </Link>
        </div>
      </div >
    </>
  );
}
