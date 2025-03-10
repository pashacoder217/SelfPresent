"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { z } from "zod";
import { Input } from "../ui/shadcn/input";
import { Label } from "../ui/shadcn/label";
import Image from "next/image";
import { uploadFiles } from "@/SelfPresent/lib/uploadthing";

import { cn } from "@/SelfPresent/lib/utils";
import { Poppins } from "next/font/google";
import { Roboto_Mono } from "next/font/google";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/SelfPresent/components/ui/shadcn/button";
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
  userFileUrl: z.string(),
  exFileUrl: z.string(),
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
];

type FormData = z.infer<typeof schema>;
type Errors = Partial<Record<keyof FormData, string>>;

const Main = () => {
  const supabase = createClient();
  const [userInfo, setUserInfo] = useState<Record<string, string>>({});
  const [disabled, setDisabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
      const { data: userData } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();
      const { data: exData } = await supabase
        .from("ex_partners")
        .select("*")
        .eq("user_id", user.id)
        .single();

      setUserInfo({
        ...userInfo,
        ["userName"]: userData?.name ?? "",
        ["userFileUrl"]: userData?.avatar_url ?? "",
        ["exName"]: exData?.name ?? "",
        ["exFileUrl"]: exData?.avatar_url ?? "",
      });
    }
  };
  const handleSave = async () => {
    setIsLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      await supabase
        .from("users")
        .update({ name: userInfo.userName, avatar_url: userInfo.userFileUrl })
        .eq("id", user.id);
      await supabase
        .from("ex_partners")
        .update({ name: userInfo.exName, avatar_url: userInfo.exFileUrl })
        .eq("user_id", user.id);
      setIsLoading(false);
    }
  };
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDisabled(true);
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
        setUserInfo({ ...userInfo, ["userFileUrl"]: res[0].url });
        setDisabled(false);
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
        setUserInfo({ ...userInfo, ["exFileUrl"]: res[0].url });
        setDisabled(false);
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
    setUserInfo({ ...userInfo, [name]: value });
  };
  useEffect(() => {
    getUserinfo();
  }, []);

  return (
    <>
      {/* <h3 className="text-center">Change your Information</h3> */}
      <div className="flex flex-col items-center space-y-4 p-4">
        <h1
          className={`${poppins.className} bg-gradient-to-r from-neutral-500 to-neutral-950 bg-clip-text pb-10 text-center text-2xl font-light text-transparent dark:from-neutral-400/90 dark:to-neutral-200/90`}
        >
          Edit Information
        </h1>
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
              <span className={`${robotoMono.className} text-neutral-600`}>
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
        <div className="flex w-full flex-row justify-center">
          <div className="w-full max-w-md space-y-2">
            <Input
              type="text"
              name="userName"
              value={userInfo.userName}
              onBlur={handleBlur}
              onChange={handleInputChange}
              placeholder="Your name..."
              className="rounded border border-neutral-200 p-2 dark:border-neutral-800"
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
              <span className={`${robotoMono.className} text-neutral-600`}>
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
        <div className="flex w-full flex-row justify-center">
          <div className="w-full max-w-md space-y-2">
            <Input
              type="text"
              name="exName"
              value={userInfo.exName}
              onBlur={handleBlur}
              onChange={handleInputChange}
              placeholder="Your EX name..."
              className="w-full rounded border border-neutral-200 p-2 dark:border-neutral-800"
              style={{ backdropFilter: "blur(1px)" }}
            />
            {errors.exName && (
              <p className="text-sm text-red-500">{errors.exName}</p>
            )}
          </div>
        </div>
      </div>
      <div
        className={`items-end space-y-4 pt-5 text-center ${
          disabled ? "hidden" : ""
        }`}
      >
        <Button loading={isLoading} className="w-50" onClick={handleSave}>
          Save
        </Button>
      </div>
    </>
  );
};
export default Main;
