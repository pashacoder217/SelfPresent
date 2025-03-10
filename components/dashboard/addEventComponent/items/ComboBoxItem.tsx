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
import { Poppins, Roboto_Mono } from "next/font/google";
const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

interface Props {
  onSelectChange: (selectedValue: string[]) => void;
  data: Record<string, string>[];
  placeholder: string;
}

const ComboBoxItem = memo(function ComboBoxItem({
  data,
  onSelectChange,
  placeholder,
}: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [values, setValues] = useState<string[]>([]);

  const toggleSelection = (value: string) => {
    const index = values.indexOf(value);
    if (index === -1) {
      setValues([...values, value]);
      onSelectChange([...values, value]);
    } else {
      const _values = values.filter((item) => item !== value);
      setValues(_values);
      onSelectChange(_values);
    }
  };
  const handleSelect = (currentValue: string) => {
    toggleSelection(currentValue);
    setOpen(false);
  };

  return (
    <>
      <div className="mt-3 w-full">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div className="w-full">
              <Button
                type="button"
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[300px] justify-between tracking-wider md:w-[350px]"
              >
                <p
                  className={`${poppins.className} text-xs tracking-wide text-neutral-500 dark:text-neutral-400`}
                >
                  {values.length > 0 ? (
                    <span
                      className={`${robotoMono.className} text-xs tracking-wide text-neutral-500 dark:text-neutral-400`}
                    >
                      {values
                        .map(
                          (value) =>
                            data?.find(
                              (item) =>
                                item.value.toLowerCase() ===
                                value.toLowerCase(),
                            )?.label,
                        )
                        .join(", ")}
                    </span>
                  ) : (
                    `Add ${placeholder}`
                  )}
                </p>
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-20" />
              </Button>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0 md:w-[350px]">
            <Command>
              <CommandEmpty>
                {/* <span
                  className={`${robotoMono.className} md:text-md text-xs text-primary/40`}
                >
                  Type any US state, or Canadian province
                </span> */}
              </CommandEmpty>
              <CommandGroup>
                <div className="max-h-[350px] overflow-y-auto overflow-x-hidden">
                  {data?.map((item) => (
                    <CommandItem
                      key={item.value}
                      value={item.value}
                      onSelect={handleSelect}
                    >
                      <Check
                        size="16"
                        className={cn(
                          "mr-2",
                          values.includes(item.value)
                            ? "opacity-20"
                            : "opacity-0",
                        )}
                      />
                      <span
                        className={`${robotoMono.className} text-left text-xs text-neutral-500 dark:text-neutral-300`}
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
export default ComboBoxItem;
