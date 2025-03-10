// components/dashboard/NavbarAssistant.tsx

"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Roboto_Mono } from "next/font/google";
import {
  Archive,
  Baby,
  Brain,
  CalendarRange,
  FileText,
  Scale,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import Spin from "../ui/shadcn/Spin";

const robotoMono = Roboto_Mono({ subsets: ["latin"], display: "swap" });

const NavbarAssistant = () => {
  const pathname = usePathname();
  const [isEventLoading, setIsEventLoading] = useState(false);
  const [isChilrenLoading, setIsChilrenLoading] = useState(false);
  const [isDocumentLoading, setIsDocumentLoading] = useState(false);
  const [isEvidenceLoading, setIsEvidenceLoading] = useState(false);
  const [isAssistantLoading, setIsAssistantLoading] = useState(false);

  const handleEvent = () => {
    setIsEventLoading(true);
    setTimeout(() => {
      setIsEventLoading(false);
    }, 1000);
  };

  const handleDocument = () => {
    setIsDocumentLoading(true);
    setTimeout(() => {
      setIsDocumentLoading(false);
    }, 1000);
  };
  const handleChilren = () => {
    setIsChilrenLoading(true);
    setTimeout(() => {
      setIsChilrenLoading(false);
    }, 1000);
  };
  const handleEvidence = () => {
    setIsEvidenceLoading(true);
    setTimeout(() => {
      setIsEvidenceLoading(false);
    }, 1000);
  };
  const handleAssistant = () => {
    setIsAssistantLoading(true);
    setTimeout(() => {
      setIsAssistantLoading(false);
    }, 1000);
  };

  return (
    <>
      <div className="fixed top-20 z-30 w-[38%]">
        <motion.header
          className="relative flex h-12 transform flex-col items-center justify-center rounded-none border-y border-black/5 bg-gradient-to-r from-white/40 to-white/70 shadow backdrop-blur-sm dark:border-2 dark:border-white/5 dark:from-black/20 dark:to-black/30 md:rounded-b-none md:rounded-t-xl md:border"
          initial={{ y: -100, opacity: 1 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.1,
            type: "spring",
            stiffness: 50,
            damping: 8,
          }}
        >
          <nav className="flex translate-y-0.5 gap-5 md:gap-8">
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.2,
                type: "spring",
                stiffness: 50,
                damping: 8,
              }}
            >
              {/* <Button
                onClick={() => {
                  handleEvent();
                }}
                variant="ghost"
                className="px-0 hover:opacity-80"
                aria-label="Events"
              > */}
              <div className={`flex items-center gap-2`}>
                <AnimatePresence mode="wait">
                  {isEventLoading ? (
                    <motion.div className="mb-2 rounded-full p-1" key="spin">
                      <Spin />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="icon"
                      initial={{ opacity: 0, rotate: -180 }}
                      animate={{
                        opacity: 1,
                        rotate: 0,
                      }}
                      exit={{
                        opacity: 0,
                        rotate: 180,
                      }}
                      transition={{ duration: 0.3 }}
                      className={`bg mb-1 rounded-lg border border-black/20 bg-gradient-to-r from-white/40 to-white/70 p-1 shadow backdrop-blur-sm dark:border-2 dark:border-white/20 dark:from-black/50 dark:to-black/60`}
                    >
                      <Scale
                        className={`size-4 text-neutral-500 dark:text-neutral-300 md:size-5`}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
                <h1
                  className={`${robotoMono.className} bg-gradient-to-r from-neutral-700 to-neutral-900 bg-clip-text text-center text-xs text-transparent dark:from-neutral-200 dark:to-neutral-300 md:tracking-widest`}
                >
                  Assistant
                </h1>
              </div>
              {/* </Button> */}
            </motion.div>
          </nav>
        </motion.header>
      </div>
    </>
  );
};
export default NavbarAssistant;
