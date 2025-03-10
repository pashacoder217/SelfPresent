// components/JurisdictionCp.tsx

"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/SelfPresent/lib/utils";
import { useOnboarding } from "@/SelfPresent/context/onboardingContext";
import { createClient } from "@/utils/supabase/client";

import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/SelfPresent/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/SelfPresent/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/SelfPresent/components/ui/popover";
import { Poppins } from "next/font/google";
import { Roboto_Mono } from "next/font/google";
const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
});
const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const JurisdictionCp = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const { jurisdiction, saveJurisdictionInfo, saveIsNext, saveAssistant } =
    useOnboarding();
  const [jurisdictionDatas, setJurisditionDatas] = useState<
    Record<string, string>[]
  >([]);
  const supabase = createClient();

  const getJurisdictionDatas = useCallback(async () => {
    const { data: datas } = await supabase
      .from("jurisdictions_family_law")
      .select("*");
    let tmp: Record<string, string>[] = [];
    if (datas) {
      datas.forEach((data) => {
        tmp.push({
          label: data.jurisdiction_title,
          value: data.assistant_id,
        });
      });
      setJurisditionDatas(tmp);
    }
  }, [jurisdiction, saveJurisdictionInfo, supabase]);

  useEffect(() => {
    setValue(jurisdiction);
    getJurisdictionDatas();
    saveIsNext(false);
    setOpen(true);
  }, [jurisdiction, getJurisdictionDatas, saveIsNext]);

  return (
    <div className="">
      <h1
        className={`${poppins.className} bg-gradient-to-r from-neutral-500 to-neutral-950 bg-clip-text pb-10 text-center text-3xl font-light text-transparent dark:from-neutral-400/90 dark:to-neutral-200/90 md:text-4xl`}
      >
        Where do you live?
      </h1>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[350px] justify-between tracking-wider md:w-[500px]"
            >
              <p
                className={`${robotoMono.className} text-md dark:text-neural-400 pl-5 uppercase tracking-widest text-neutral-500`}
              >
                {value ? (
                  <span
                    className={`${robotoMono.className} text-md uppercase tracking-widest text-neutral-400 dark:text-neutral-500`}
                  >
                    {
                      jurisdictionDatas?.find(
                        (jurisdictionData) =>
                          jurisdictionData.label.toLowerCase() ===
                          value.toLowerCase(),
                      )?.label
                    }
                  </span>
                ) : null}
              </p>
              <ChevronsUpDown className="ml-2 mr-5 h-4 w-4 shrink-0 opacity-20" />
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent className="= w-[350px] justify-between p-0 md:w-[500px]">
          <Command>
            <CommandInput className="pl-1" placeholder="Search..." />
            <CommandEmpty>
              <span
                className={`${robotoMono.className} md:text-md text-xs text-primary/40`}
              >
                Type in your country
              </span>
            </CommandEmpty>
            <CommandGroup>
              <div className="max-h-[300px] overflow-y-auto overflow-x-hidden">
                {jurisdictionDatas?.map((jurisdictionData) => (
                  <CommandItem
                    className=""
                    key={jurisdictionData.value}
                    value={jurisdictionData.label}
                    onSelect={(currentValue) => {
                      console.log(currentValue);
                      setValue(currentValue === value ? "" : currentValue);
                      saveJurisdictionInfo(currentValue);
                      saveAssistant(jurisdictionData.value);
                      setOpen(false);
                    }}
                  >
                    <Check
                      size="16"
                      className={cn(
                        "mr-2",
                        value === jurisdictionData.value
                          ? "opacity-20"
                          : "opacity-0",
                      )}
                    />
                    <span
                      className={`${robotoMono.className} text-neutral-500 dark:text-neutral-300`}
                    >
                      {jurisdictionData.label}
                    </span>
                  </CommandItem>
                ))}
              </div>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default JurisdictionCp;
