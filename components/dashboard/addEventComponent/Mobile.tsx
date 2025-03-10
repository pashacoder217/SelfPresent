"use client";

import { Drawer, DrawerTrigger, DrawerContent } from "@/SelfPresent/components/ui/drawer";
import Content from "./Content";
import { Button } from "@/SelfPresent/components/ui/button";
import { Roboto_Mono, Poppins } from "next/font/google";
import { motion } from "framer-motion";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
});

const Mobile = () => {
  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          <div className="mb-4">
            <Button variant="ghost">
              <div>
                <div className="flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: [0.9, 1.3, 0.9] }}
                    transition={{
                      duration: 8,
                      ease: "easeInOut",
                      repeat: Infinity,
                    }}
                    className="mb-4 flex h-9 w-14 items-center justify-center gap-1 rounded-md bg-gradient-to-r from-neutral-700 to-neutral-900 p-1 shadow-sm dark:from-neutral-100 dark:to-neutral-300 dark:hover:bg-neutral-300 dark:hover:text-neutral-50"
                  />
                </div>

                <span
                  className={`${robotoMono.className} mt-10 bg-gradient-to-r from-neutral-700 to-neutral-900 bg-clip-text text-center text-sm tracking-wide text-transparent dark:from-neutral-100 dark:to-neutral-300`}
                >
                  Log event
                </span>
              </div>
            </Button>
          </div>
        </DrawerTrigger>
        <DrawerContent className="px-10 text-center">
          <Content />
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Mobile;
