// components/onboarding/UserInfoCp.tsx

"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { z } from "zod";
import { Input } from "../ui/shadcn/input";
import { Label } from "../ui/shadcn/label";
import Image from "next/image";
import { uploadFiles } from "@/SelfPresent/lib/uploadthing";

import { toast } from "sonner";
import { cn } from "@/SelfPresent/lib/utils";
import { useOnboarding } from "@/SelfPresent/context/onboardingContext";
import { Poppins } from "next/font/google";
import { Roboto_Mono } from "next/font/google";
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

import IsEmpty from "@/utils/is_empty";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const schema = z.object({
  userName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .min(1, "Your name is Required"),
  exName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .min(1, "Ex Name is required"),
});

const roleDatas = [
  {
    label: "Ex-wife",
    value: "ex_wife",
  },
  {
    label: "Ex-husband",
    value: "ex_husband",
  },
  {
    label: "Ex-common law (woman)",
    value: "ex_common_law_woman",
  },
  {
    label: "Ex-common law (man)",
    value: "ex_common_law_man",
  },
  {
    label: "Ex-girlfriend",
    value: "ex_girlfriend",
  },
  {
    label: "Ex-boyfriend",
    value: "ex_boyfriend",
  },
];

type FormData = z.infer<typeof schema>;
type Errors = Partial<Record<keyof FormData, string>>;

export default function UserInfoCp() {
  const supabase = createClient();
  const { userInfo, saveUserInfo, saveIsNext } = useOnboarding();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>(userInfo.value || "");
  const [selectedUserImage, setSelectedUserImage] = useState<File | null>(null);
  const [selectedExImage, setSelectedExImage] = useState<File | null>(null);
  const [userProgress, setUserProgress] = useState<number>(0);
  const [exProgress, setExProgress] = useState<number>(0);
  const [errors, setErrors] = useState<Errors>({});

  const getUserinfo = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();
      if (data) {
        saveUserInfo({
          ...userInfo,
          userName: data.name || "",
          userFileUrl: data.avatar_url || "",
        });
      }
    }
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name } = event.target;
    const file = event.target.files?.[0];
    let files: File[] = [];
    if (file) {
      files.push(file);
      if (name === "userImage") {
        setSelectedUserImage(file);
        const res = await uploadFiles("userInfo", {
          files,
          onUploadProgress: ({ progress }) => {
            setUserProgress(progress);
            if (progress == 100) {
              setUserProgress(0);
            }
          },
        });
        saveUserInfo({ ...userInfo, userFileUrl: res[0].url });
      } else {
        setSelectedExImage(file);
        const res = await uploadFiles("userInfo", {
          files,
          onUploadProgress: ({ progress }) => {
            setExProgress(progress);
            if (progress == 100) {
              setExProgress(0);
            }
          },
        });
        saveUserInfo({ ...userInfo, exFileUrl: res[0].url });
      }
    }
  };

  const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    const rlt = schema.safeParse(userInfo);
    if (!rlt.success) {
      const fieldErrors = rlt.error.errors.reduce((acc, error) => {
        if (error.path.length > 0) {
          const fieldName = error.path[0] as keyof FormData;
          if (name == fieldName) {
            acc[fieldName] = error.message;
          }
        }
        return acc;
      }, {} as Errors);
      setErrors(fieldErrors);
    } else {
      setErrors({});
    }
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    saveUserInfo({ ...userInfo, [name]: value });
  };

  useEffect(() => {
    getUserinfo();
  }, []);

  useEffect(() => {
    if (userInfo.value) {
      setValue(userInfo.value);
    }
    const filledFieldCount = Object.keys(userInfo).filter((key) => {
      return (
        key != "userFileUrl" && key != "exFileUrl" && !IsEmpty(userInfo[key])
      );
    }).length;
    saveIsNext(!(filledFieldCount === 3 && schema.safeParse(userInfo).success));
  }, [userInfo, saveIsNext]);

  return (
    <>
      <h1
        className={`${poppins.className} bg-gradient-to-r from-neutral-500 to-neutral-950 bg-clip-text pb-10 text-center text-3xl font-light text-transparent dark:from-neutral-400/90 dark:to-neutral-200/90 md:text-4xl`}
      >
        You and Your Ex
      </h1>
      {/* <h3 className="text-center">
        This information helps the AI understand who is who.
      </h3> */}
      <div className="flex flex-col items-center space-y-4 p-4">
        <div
          className="flex h-32 w-32 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-neutral-200/50 dark:border-neutral-800/50"
          style={{ backdropFilter: "blur(1px)" }}
        >
          <Input
            type="file"
            accept="image/*"
            name="userImage"
            className="hidden cursor-pointer"
            id="user-image"
            onChange={handleImageUpload}
          />
          <Label
            htmlFor="user-image"
            className="flex h-full w-full cursor-pointer items-center justify-center"
          >
            {selectedUserImage ? (
              <Image
                src={URL.createObjectURL(selectedUserImage)}
                alt="Selected"
                layout="fill"
                objectFit="cover"
              />
            ) : userInfo.userFileUrl ? (
              <Image
                src={userInfo.userFileUrl}
                alt="Selected"
                layout="fill"
                objectFit="cover"
              />
            ) : (
              <span
                className={`${robotoMono.className} text-center text-neutral-600`}
              >
                Upload your photo
              </span>
            )}
          </Label>
        </div>
      </div>
      <div>
        {userProgress != 0 && (
          <div className="text-right">
            <p>{userProgress}%</p>
          </div>
        )}
        {userProgress != 0 && (
          <div className="relative h-0 w-full text-center">
            <div className="absolute top-1 h-1 w-full overflow-clip rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className="h-full bg-gray-400 transition-all duration-300 ease-in-out dark:bg-white"
                style={{
                  width: userProgress ? `${userProgress}%` : "0%",
                }}
              />
            </div>
          </div>
        )}
      </div>
      <div className="flex w-full flex-col items-center space-y-4 p-4">
        <div className="flex w-full flex-row">
          <div className="w-full space-y-2">
            <Input
              type="text"
              name="userName"
              value={userInfo.userName}
              onBlur={handleBlur}
              onChange={handleInputChange}
              placeholder="Your name..."
              className="w-full rounded border border-neutral-200 p-2 dark:border-neutral-800"
              style={{ backdropFilter: "blur(1px)" }}
            />
            {errors.userName && (
              <p className="text-sm text-red-500">{errors.userName}</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center space-y-4 p-4">
        <div
          className="flex h-32 w-32 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-neutral-200/50 dark:border-neutral-800/50"
          style={{ backdropFilter: "blur(1px)" }}
        >
          <Input
            type="file"
            accept="image/*"
            name="exImage"
            className="hidden cursor-pointer"
            id="ex-image"
            onChange={handleImageUpload}
          />
          <Label
            htmlFor="ex-image"
            className="flex h-full w-full cursor-pointer items-center justify-center"
          >
            {selectedExImage ? (
              <Image
                src={URL.createObjectURL(selectedExImage)}
                alt="Selected"
                layout="fill"
                objectFit="cover"
              />
            ) : userInfo.exFileUrl ? (
              <Image
                src={userInfo.exFileUrl}
                alt="Selected"
                layout="fill"
                objectFit="cover"
              />
            ) : (
              <span
                className={`${robotoMono.className} text-center text-neutral-600`}
              >
                Upload Ex photo
              </span>
            )}
          </Label>
        </div>
      </div>
      <div>
        {exProgress != 0 && (
          <div className="text-right">
            <p>{exProgress}%</p>
          </div>
        )}
        {exProgress != 0 && (
          <div className="relative h-0 w-full text-center">
            <div className="absolute top-1 h-1 w-full overflow-clip rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className="h-full bg-gray-400 transition-all duration-300 ease-in-out dark:bg-white"
                style={{
                  width: exProgress ? `${exProgress}%` : "0%",
                }}
              />
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center space-y-4 p-4">
        <div className="flex w-full flex-row">
          <div className="w-full space-y-2">
            <Input
              type="text"
              name="exName"
              value={userInfo.exName}
              onBlur={handleBlur}
              onChange={handleInputChange}
              placeholder="Name of your ex partner"
              className="w-full rounded border border-neutral-200 p-2 dark:border-neutral-800"
              style={{ backdropFilter: "blur(1px)" }}
            />
            {errors.exName && (
              <p className="text-sm text-red-500">{errors.exName}</p>
            )}
          </div>
        </div>
      </div>
      <div className="w-50 flex flex-col items-center space-y-4">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[350px] justify-between tracking-wider md:w-[300px]"
            >
              <p
                className={`${robotoMono.className} text-md dark:text-neural-400 pl-5 uppercase tracking-widest text-neutral-500`}
              >
                {value ? (
                  <span
                    className={`${robotoMono.className} text-md uppercase tracking-widest text-neutral-400 dark:text-neutral-500`}
                  >
                    {
                      roleDatas?.find((roleData) => roleData.value === value)
                        ?.label
                    }
                  </span>
                ) : null}
              </p>
              <ChevronsUpDown className="ml-2 mr-5 h-4 w-4 shrink-0 opacity-20" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="= w-[350px] justify-between p-0 md:w-[500px]">
            <Command>
              <CommandInput className="pl-1" placeholder="Search..." />
              <CommandEmpty>
                {/* <span className={`${robotoMono.className} text-primary/40`}>
                  Type any US state, or Canadian province
                </span> */}
              </CommandEmpty>
              <CommandGroup>
                {roleDatas?.map((roleData) => (
                  <CommandItem
                    className=""
                    key={roleData.value}
                    value={roleData.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      saveUserInfo({ ...userInfo, value: currentValue });
                      setOpen(false);
                    }}
                  >
                    <Check
                      size="16"
                      className={cn(
                        "mr-2",
                        value === roleData.value ? "opacity-20" : "opacity-0",
                      )}
                    />
                    <span
                      className={`${robotoMono.className} text-neutral-500 dark:text-neutral-300`}
                    >
                      {roleData.label}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}
