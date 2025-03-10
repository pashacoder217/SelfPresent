"use client";

import { Button } from "@/SelfPresent/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/SelfPresent/components/ui/dialog";
import { Input } from "@/SelfPresent/components/ui/input";
import { Label } from "@/SelfPresent/components/ui/label";
import Content from "@/SelfPresent/components/dashboard/addEventComponent/Content";
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

const Default = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
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
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          {/* <DialogHeader>
            <DialogTitle>Add new Event</DialogTitle>
            <DialogDescription>
              What is happened?
            </DialogDescription>
          </DialogHeader> */}
          {/* <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                defaultValue="Pedro Duarte"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                defaultValue="@peduarte"
                className="col-span-3"
              />
            </div>
          </div> */}
          <Content />
          {/* <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter> */}
        </DialogContent>
      </Dialog>
    </>
  );
};
export default Default;
