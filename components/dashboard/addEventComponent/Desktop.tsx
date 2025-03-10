"use client";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/SelfPresent/components/ui/popover";
import { Button } from "@/SelfPresent/components/ui/button";
import { motion } from "framer-motion";
import { Poppins, Roboto_Mono } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
});

import Content from "./Content";

const Desktop = () => {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          {/* <Button variant={"outline"}>
            Add Event
          </Button> */}
        </PopoverTrigger>
        <PopoverContent className="relative flex flex-row text-center">
          <Content />
        </PopoverContent>
      </Popover>
    </>
  );
};
export default Desktop;
