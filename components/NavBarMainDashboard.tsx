// components/NavBarMainDashboard.tsx

"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Zap } from "lucide-react";
import Spin from "./ui/shadcn/Spin";
import LogoIconBlink from "./LogoIconBlink";
import { Roboto_Mono } from "next/font/google";
import { Poppins } from "next/font/google";
import { Button } from "./ui/shadcn/button";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const ButtonLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Button
      onClick={handleLogin}
      className="flex items-center rounded-full p-2 text-white"
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="spin"
            initial={{ rotate: -180 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
          >
            <Spin />
          </motion.div>
        ) : (
          <motion.div
            key="icon"
            initial={{ rotate: -180 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              animate={{ scale: [0.8, 1] }}
              transition={{
                duration: 5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <Zap className="h-5 w-5" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
};

const NavBarMainDashboard = () => {
  return (
    <nav className="sticky top-0 z-50 flex h-12 items-center justify-between border-b border-neutral-800/10 bg-white/5 px-6 backdrop-blur-sm dark:border-neutral-100/10 dark:bg-black/5">
      <div>
        <Link
          href="/dashboard/events"
          className="flex items-center gap-0 pt-1 font-semibold"
        >
          {/* <LogoIconBlink /> */}
          <div className="flex h-5 w-5 justify-end rounded bg-neutral-400">
            <div className="h-5 w-2 rounded-r bg-neutral-300" />
          </div>
          <h1
            className={`${poppins.className} bg-gradient-to-r from-neutral-700 to-neutral-900 bg-clip-text pl-2 text-sm font-medium tracking-widest text-transparent dark:from-neutral-300 dark:to-neutral-400 md:ml-0.5`}
          >
            <span>Co-Parent Log</span>
            <span className=""> </span>
            {/* <span
              className={`${robotoMono.className} text-xs text-muted-foreground`}
            >
              Log
            </span> */}
          </h1>
        </Link>
      </div>
      {/* <Link href="/dashboard/events">
        <ButtonLogin />
      </Link>
      <Button size="sm" className="rounded-xl">
        AI Assistant
      </Button> */}
    </nav>
  );
};

export default NavBarMainDashboard;
