// components/dashboard/Navbar.tsx

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

const Navbar = () => {
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
      <div className="fixed top-20 z-30 flex w-full justify-center md:top-20">
        <motion.header
          className="relative flex h-12 w-full max-w-md transform flex-col items-center justify-center gap-6 rounded-t-xl border border-y border-black/5 bg-gradient-to-r from-white/40 to-white/70 shadow backdrop-blur-sm dark:border-2 dark:border-white/5 dark:from-black/20 dark:to-black/30"
          initial={{ y: -100, opacity: 1 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 1.3,
            type: "spring",
            stiffness: 50,
            damping: 8,
          }}
        >
          <nav className="flex translate-y-0.5 gap-5 md:gap-8">
            {/* <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 1.5,
                type: "spring",
                stiffness: 50,
                damping: 8,
              }}
              className="block md:hidden"
            >
              <Link
                href="/dashboard/assistant"
                className="flex items-center gap-3"
              >
                <Button
                  onClick={() => {
                    handleAssistant();
                  }}
                  variant="ghost"
                  className="px-0 hover:opacity-80"
                  aria-label="Assistant"
                >
                  <div
                    className={`flex items-center gap-2 ${pathname === "/dashboard/assistant" ? "" : "opacity-40 hover:opacity-100"}`}
                  >
                    <AnimatePresence mode="wait">
                      {isAssistantLoading ? (
                        <motion.div
                          className="mb-2 rounded-full p-1"
                          key="spin"
                        >
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
                          className={`bg mb-1 rounded-lg p-1 ${pathname === "/dashboard/assistant" ? "border border-black/20 bg-gradient-to-r from-white/40 to-white/70 shadow backdrop-blur-sm dark:border-2 dark:border-white/20 dark:from-black/50 dark:to-black/60" : ""}`}
                        >
                          <Scale
                            className={`size-4 md:size-5 ${pathname == "/dashboard/assistant" ? "text-primary/80" : "text-neutral-400 dark:text-neutral-600"}`}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <h1
                      className={`${robotoMono.className} bg-gradient-to-r ${pathname === "/dashboard/assistant" ? "from-neutral-500 to-neutral-700" : "from-neutral-700 to-neutral-900"} bg-clip-text text-center text-xs text-transparent dark:from-neutral-200 dark:to-neutral-300 md:tracking-widest`}
                    >
                      Assistant
                    </h1>
                  </div>
                </Button>
              </Link>
            </motion.div> */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 1.5,
                type: "spring",
                stiffness: 50,
                damping: 8,
              }}
            >
              <Link
                href="/dashboard/events"
                className="flex items-center gap-3"
              >
                <Button
                  onClick={() => {
                    handleEvent();
                  }}
                  variant="ghost"
                  className="px-0 hover:opacity-80"
                  aria-label="Events"
                >
                  <div
                    className={`flex items-center gap-2 ${pathname === "/dashboard/events" ? "" : "opacity-40 hover:opacity-100"}`}
                  >
                    <AnimatePresence mode="wait">
                      {isEventLoading ? (
                        <motion.div
                          className="mb-2 rounded-full p-1"
                          key="spin"
                        >
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
                          className={`bg mb-1 rounded-lg p-1 ${pathname === "/dashboard/events" ? "border border-black/20 bg-gradient-to-r from-white/40 to-white/70 shadow backdrop-blur-sm dark:border-2 dark:border-white/20 dark:from-black/50 dark:to-black/60" : ""}`}
                        >
                          <CalendarRange
                            className={`size-4 md:size-5 ${pathname == "/dashboard/events" ? "text-primary/80" : "text-neutral-400 dark:text-neutral-600"}`}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <h1
                      className={`${robotoMono.className} bg-gradient-to-r ${pathname === "/dashboard/events" ? "from-neutral-500 to-neutral-700" : "from-neutral-700 to-neutral-900"} bg-clip-text text-center text-xs text-transparent dark:from-neutral-200 dark:to-neutral-300 md:tracking-widest`}
                    >
                      Events
                    </h1>
                  </div>
                </Button>
              </Link>
            </motion.div>
            {/* <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 1.6,
                type: "spring",
                stiffness: 50,
                damping: 8,
              }}
              className="hidden md:block"
            >
              <Link
                href="/dashboard/documents"
                className="flex items-center gap-1"
              >
                <Button
                  onClick={() => {
                    handleDocument();
                  }}
                  variant="ghost"
                  className="px-0 hover:opacity-80"
                  aria-label="Documents"
                >
                  <div
                    className={`flex items-center gap-2 ${pathname === "/dashboard/documents" ? "" : "opacity-40 hover:opacity-100"}`}
                  >
                    <AnimatePresence mode="wait">
                      {isDocumentLoading ? (
                        <motion.div className="rounded-full p-1" key="spin">
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
                          className={`mb-1 rounded-lg p-1 ${pathname === "/dashboard/documents" ? "border border-black/20 bg-gradient-to-r from-white/40 to-white/70 shadow backdrop-blur-sm dark:border-2 dark:border-white/20 dark:from-black/50 dark:to-black/60" : ""}`}
                        >
                          <FileText
                            className={`size-4 md:size-5 ${pathname == "/dashboard/documents" ? "text-primary/80" : "text-neutral-600 dark:text-neutral-400"}`}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <h1
                      className={`${robotoMono.className} bg-gradient-to-r ${pathname === "/dashboard/documents" ? "from-neutral-500 to-neutral-700" : "from-neutral-700 to-neutral-900"} bg-clip-text text-center text-xs text-transparent dark:from-neutral-200 dark:to-neutral-300 md:tracking-widest`}
                    >
                      Documents
                    </h1>
                  </div>
                </Button>
              </Link>
            </motion.div> */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 1.7,
                type: "spring",
                stiffness: 50,
                damping: 8,
              }}
            >
              <Link
                href="/dashboard/evidence"
                className="flex items-center gap-3"
              >
                <Button
                  onClick={() => {
                    handleEvidence();
                  }}
                  variant="ghost"
                  className="px-0 hover:opacity-80"
                  aria-label="Evidence"
                >
                  <div
                    className={`flex items-center gap-2 ${pathname === "/dashboard/evidence" ? "" : "opacity-40 hover:opacity-100"}`}
                  >
                    <AnimatePresence mode="wait">
                      {isEvidenceLoading ? (
                        <motion.div className="rounded-full p-1" key="spin">
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
                          className={`mb-1 rounded-lg p-1 ${pathname === "/dashboard/evidence" ? "border border-black/20 bg-gradient-to-r from-white/40 to-white/70 shadow backdrop-blur-sm dark:border-2 dark:border-white/20 dark:from-black/50 dark:to-black/60" : ""}`}
                        >
                          <Archive
                            className={`size-4 md:size-5 ${pathname == "/dashboard/evidence" ? "text-primary/80" : "text-neutral-600 dark:text-neutral-400"}`}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <h1
                      className={`${robotoMono.className} bg-gradient-to-r ${pathname === "/dashboard/evidence" ? "from-neutral-500 to-neutral-700" : "from-neutral-700 to-neutral-900"} bg-clip-text text-center text-xs text-transparent dark:from-neutral-200 dark:to-neutral-300 md:tracking-widest`}
                    >
                      Evidence
                    </h1>
                  </div>
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 1.4,
                type: "spring",
                stiffness: 50,
                damping: 8,
              }}
              className=""
            >
              <Link
                href="/dashboard/children"
                className="flex items-center gap-3"
              >
                <Button
                  onClick={() => {
                    handleChilren();
                  }}
                  variant="ghost"
                  className="px-0 hover:opacity-80"
                  aria-label="Children"
                >
                  <div
                    className={`flex items-center gap-2 ${pathname === "/dashboard/children" ? "" : "opacity-40 hover:opacity-100"}`}
                  >
                    <AnimatePresence mode="wait">
                      {isChilrenLoading ? (
                        <motion.div
                          className="mb-1 rounded-full p-1"
                          key="spin"
                        >
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
                          className={`mb-1 rounded-lg p-1 ${pathname === "/dashboard/children" ? "border border-black/20 bg-gradient-to-r from-white/40 to-white/70 shadow backdrop-blur-sm dark:border-2 dark:border-white/20 dark:from-black/50 dark:to-black/60" : ""}`}
                        >
                          <Baby
                            className={`size-4 md:size-5 ${pathname == "/dashboard/children" ? "text-primary/80" : "text-neutral-600 dark:text-neutral-400"}`}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <h1
                      className={`${robotoMono.className} bg-gradient-to-r ${pathname === "/dashboard/children" ? "from-neutral-500 to-neutral-700" : "from-neutral-700 to-neutral-900"} bg-clip-text text-center text-xs text-transparent dark:from-neutral-200 dark:to-neutral-300 md:tracking-widest`}
                    >
                      Children
                    </h1>
                  </div>
                </Button>
              </Link>
            </motion.div>
          </nav>
        </motion.header>
      </div>
    </>
  );
};
export default Navbar;
