"use client";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/SelfPresent/components/ui/button";
import { Progress } from "@/SelfPresent/components/ui/progress";

import { useOnboarding } from "@/SelfPresent/context/onboardingContext";
import { createClient } from "@/utils/supabase/client";

import SwitchCustomHorizontal from "@/SelfPresent/components/SwitchCustomHorizontal";
import { Badge } from "@/SelfPresent/components/ui/shadcn/badge";
import { MoveLeft, MoveRight } from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { Roboto_Mono } from "next/font/google";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
});

import JurisdictionCp from "@/SelfPresent/components/JurisdictionCp";
import UserInfoCp from "@/SelfPresent/components/onboarding/UserInfoCp";
import ChildrenCp from "@/SelfPresent/components/onboarding/ChildrenCp";
import WelcomeCP from "@/SelfPresent/components/onboarding/WelcomeCp";
import { useMutation } from "@tanstack/react-query";
import IsEmpty from "@/utils/is_empty";

const comp = [
  <JurisdictionCp key="jurisdiction" />,
  <UserInfoCp key="userInfo" />,
  <ChildrenCp key="childInfo" />,
  <WelcomeCP key="welcomeCp" />,
];
let Comp = comp[0];
const date = new Date();

const Onboarding = () => {
  const [stepNumber, setStepNumber] = useState<number>(1);
  const [animateKey, setAnimateKey] = useState<number>(0);
  const [direction, setDirection] = useState<string>("right");
  const [initialLoad, setInitialLoad] = useState<boolean>(true);
  const supabase = createClient();
  const { isNext, assistantID, userInfo } = useOnboarding();

  useEffect(() => {
    setInitialLoad(false);
  }, []);

  const saveJurisdiction = useCallback(
    async (userId: string) => {
      await supabase.from("user_jurisdiction").upsert(
        {
          user_id: userId,
          jurisdiction: assistantID,
        },
        { onConflict: "user_id" },
      );
    },
    [assistantID],
  );

  const saveUserInfo = useCallback(
    async (userId: string) => {
      await supabase
        .from("users")
        .update({
          name: userInfo.userName,
          avatar_url: IsEmpty(userInfo.userFileUrl)
            ? "https://utfs.io/f/c88f03a3-f917-45ab-87dc-4ae803fbe1b9-vjdtpc.png"
            : userInfo.userFileUrl,
          role: userInfo.value,
        })
        .eq("id", userId)
        .select();
      await supabase.from("ex_partners").insert({
        user_id: userId,
        name: userInfo.exName,
        avatar_url: IsEmpty(userInfo.exFileUrl)
          ? "https://utfs.io/f/c88f03a3-f917-45ab-87dc-4ae803fbe1b9-vjdtpc.png"
          : userInfo.exFileUrl,
      });
    },
    [userInfo],
  );

  const mutationJurisdiction = useMutation({
    mutationFn: saveJurisdiction,
    onSuccess: () => {
      console.log("Success!");
    },
  });

  const mutationUserInfo = useMutation({
    mutationFn: saveUserInfo,
    onSuccess: () => {
      console.log("Success!");
    },
  });

  const handleBack = async () => {
    if (stepNumber > 1) {
      setStepNumber(stepNumber - 1);
      Comp = comp[stepNumber - 2];
      setAnimateKey(animateKey + 1);
      setDirection("left");
    }
  };
  const handleNext = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      if (stepNumber == 3) {
        mutationJurisdiction.mutate(user.id);
        mutationUserInfo.mutate(user.id);
      }
      setStepNumber(stepNumber + 1);
      Comp = comp[stepNumber];
      setAnimateKey(animateKey + 1);
      setDirection("right");
    }
  };
  return (
    <div className="flex h-screen flex-col">
      <header className="sticky top-0 z-50 grid grid-cols-3 border-b border-neutral-100 bg-white/5 py-3 backdrop-blur-md dark:border-neutral-800 dark:bg-black/5">
        <div className="col-span-1 flex items-center justify-start"></div>
        <div className="col-span-1 flex flex-col items-center justify-center"></div>

        <div className="flex justify-end">
          <div className="mr-4">
            <SwitchCustomHorizontal />
          </div>
        </div>
      </header>

      <main className="flex flex-grow flex-col justify-between">
        <div className="flex flex-grow flex-col items-center justify-between px-24 pt-12">
          <div className="z-30 flex flex-col justify-between rounded-md">
            <AnimatePresence mode="wait">
              {direction === "right" && (
                <motion.div
                  key={animateKey}
                  initial={initialLoad ? {} : { x: 1000, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -1000, opacity: 0 }}
                  transition={{
                    ease: "easeInOut",
                    duration: 0.5,
                  }}
                >
                  {Comp}
                </motion.div>
              )}
              {direction === "left" && (
                <motion.div
                  key={animateKey}
                  initial={initialLoad ? {} : { x: -1000, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 1000, opacity: 0 }}
                  transition={{
                    ease: "easeInOut",
                    duration: 0.5,
                  }}
                >
                  {Comp}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
      <footer className="sticky bottom-0 z-50">
        <div className="flex items-start justify-start">
          <Progress className="" value={(stepNumber / 4) * 100} />
        </div>
        <div className="z-50 grid grid-cols-3 border-t border-neutral-100/10 bg-white/50 px-4 py-3 backdrop-blur-2xl dark:border-neutral-100/10 dark:bg-black/50 md:py-3">
          <div className="col-span-1 flex items-center justify-start">
            <Button
              className={`flex w-full max-w-48 justify-start rounded-full ${stepNumber == 1 ? "hidden" : ""}`}
              variant="ghost"
              onClick={handleBack}
            >
              <MoveLeft
                size="20"
                className="text-neutral-400 dark:text-neutral-500"
              />
            </Button>
          </div>
          <div className="flex items-center justify-center">
            <Badge
              variant="outline"
              className="rounded-full shadow shadow-neutral-950/10 dark:shadow-neutral-100/10"
            >
              <AnimatePresence mode="wait">
                <motion.p
                  className={`${robotoMono.className} bg-gradient-to-l from-neutral-400 to-neutral-600 bg-clip-text uppercase text-transparent dark:from-neutral-500 dark:to-neutral-400`}
                  key={stepNumber}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ ease: "easeInOut" }}
                >
                  {stepNumber}
                </motion.p>
              </AnimatePresence>
              <p className="whitespace-nowrap px-2 text-neutral-300 dark:text-neutral-900">
                {" "}
                |
              </p>
              <p
                className={`${robotoMono.className} bg-gradient-to-l from-neutral-400 to-neutral-600 bg-clip-text uppercase text-transparent dark:from-neutral-500 dark:to-neutral-400`}
              >
                4
              </p>
            </Badge>
          </div>
          <div className="flex items-center justify-end">
            {/* <SwitchCustomHorizontal /> */}
            <Button
              className={`${stepNumber == 4 ? "hidden" : ""} w-full max-w-48 items-center justify-end rounded-full bg-gradient-to-r from-neutral-900 via-neutral-800 to-black hover:opacity-85 dark:from-neutral-100 dark:via-neutral-200 dark:to-white`}
              onClick={handleNext}
              disabled={isNext}
            >
              <motion.span
                className={`${robotoMono.className} bg-gradient-to-r from-neutral-300 to-neutral-100 bg-clip-text font-bold uppercase tracking-widest text-transparent dark:from-neutral-700 dark:to-neutral-900`}
                whileTap={{ scale: 0.8 }}
              >
                {stepNumber != 3 && "Next"}
                {stepNumber == 3 && "Complete"}
              </motion.span>
              <motion.div
                animate={{ x: [0, 5, 0, -5, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 9,
                  ease: "easeInOut",
                }}
              >
                <MoveRight
                  size="18"
                  className="ml-3 text-neutral-100 dark:text-neutral-950"
                />
              </motion.div>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Onboarding;
