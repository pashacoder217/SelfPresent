"use client";

import { memo, useState } from "react";
import { cn } from "@/SelfPresent/lib/utils";
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
import { Roboto_Mono } from "next/font/google";
const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
});

interface Props {
  onSelectChange: (selectedValue: string) => void;
  data: Record<string, string>[];
  placeholder: string;
}

const ComboBoxSingle = memo(function ComboBoxSingle({
  data,
  onSelectChange,
  placeholder,
}: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  return (
    <>
      <div className="mt-3 w-full">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div>
              <Button
                type="button"
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[250px] justify-between tracking-wider"
              >
                <p
                  className={`${robotoMono.className} ml-5 text-xs tracking-wide text-neutral-500 dark:text-neutral-400`}
                >
                  {value ? (
                    <span
                      className={`${robotoMono.className} text-xs tracking-wide text-neutral-500 dark:text-neutral-400`}
                    >
                      {
                        data?.find(
                          (item) =>
                            item.value.toLowerCase() === value.toLowerCase(),
                        )?.label
                      }
                    </span>
                  ) : (
                    `Select ${placeholder}`
                  )}
                </p>
                <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-20" />
              </Button>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-[250px] p-0">
            <Command>
              <CommandEmpty>
                <span
                  className={`${robotoMono.className} text-xs text-primary/40`}
                >
                  Type your country name
                </span>
              </CommandEmpty>
              <CommandGroup>
                <div className="max-h-[350px] overflow-y-auto overflow-x-hidden">
                  {data?.map((item) => (
                    <CommandItem
                      key={item.value}
                      value={item.value}
                      onSelect={(currentValue) => {
                        const _value =
                          currentValue === value ? "" : currentValue;
                        onSelectChange(_value);
                        setValue(_value);
                        setOpen(false);
                      }}
                    >
                      <Check
                        size="16"
                        className={cn(
                          "mr-2",
                          value === item.value ? "opacity-20" : "opacity-0",
                        )}
                      />
                      <span
                        className={`${robotoMono.className} text-xs text-neutral-500 dark:text-neutral-300`}
                      >
                        {item.label}
                      </span>
                    </CommandItem>
                  ))}
                </div>
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
});
export default ComboBoxSingle;
