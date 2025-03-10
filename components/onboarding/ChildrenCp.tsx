// components/onboarding/childrenInfoCp.tsx

"use client";

import { useCallback, useEffect, useState } from "react";
import { z } from "zod";

import { useOnboarding } from "@/SelfPresent/context/onboardingContext";
import { createClient } from "@/utils/supabase/client";
import { uploadFiles } from "@/SelfPresent/lib/uploadthing";

import Image from "next/image";
import { Poppins } from "next/font/google";
import { Roboto_Mono } from "next/font/google";
import { Input } from "../ui/shadcn/input";
import { Label } from "../ui/shadcn/label";
import { Button } from "../ui/shadcn/button";
import { useMutation } from "@tanstack/react-query";
import { DatePicker } from "@nextui-org/react";
import { DateValue, getLocalTimeZone, today } from "@internationalized/date";
import IsEmpty from "@/utils/is_empty";
import AddedChild from "@/SelfPresent/components/onboarding/item/AddedChild"
const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const currentTime = new Date();
const supabase = createClient();

const schema = z.object({
  childName: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .min(1, "Name is Required!"),
  gender: z
    .string()
    .min(2, "Name must be at least 2 character.s")
    .min(1, "Ex Name is required!"),
  // birth: z.date().max(currentTime, {
  //   message: "Date must be before the time",
  // }),
});

type FormData = z.infer<typeof schema>;
type Errors = Partial<Record<keyof FormData, string>>;

export default function ChidrenCp() {
  const defaultValue = today(getLocalTimeZone());
  const { childrenInfo, saveChildrenInfo } = useOnboarding();
  const [formData, setFormData] = useState<FormData>({
    childName: "",
    gender: "",
  });
  const [url, setUrl] = useState<string>("https://utfs.io/f/c88f03a3-f917-45ab-87dc-4ae803fbe1b9-vjdtpc.png");
  const [date, setDate] = useState<DateValue>(defaultValue);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [progress, setprogress] = useState<number>(0);
  const [errors, setErrors] = useState<Errors>({});

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    let files: File[] = [];
    if (file) {
      files.push(file);
      setSelectedImage(file);
      const res = await uploadFiles("userInfo", {
        files,
        onUploadProgress: ({ progress }) => {
          setprogress(progress);
          if (progress == 100) {
            setprogress(0);
          }
        },
      });
      setUrl(res[0].url);
    }
  };

  const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    const rlt = schema.safeParse(formData);
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
    setFormData({ ...formData, [name]: value });
  };

  const saveChildInfo = useCallback(
    async (userId: string) => {
      await supabase.from("children").insert({
        user_id: userId,
        gender: formData.gender,
        birth_year: date.toString(),
        avatar_url: url,
        full_name: formData.childName,
      });
    },
    [childrenInfo, date],
  );

  const mutation = useMutation({
    mutationFn: saveChildInfo,
    onSuccess: () => {
      console.log("Success!");
    },
  });
  const hanldeSave = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      mutation.mutate(user.id);
      saveChildrenInfo({
        childName: formData.childName,
        gender: formData.gender,
        fileUrl: url,
        date: date.toString()
      });
      setFormData({
        childName: "",
        gender: ""
      });
      setUrl("https://utfs.io/f/c88f03a3-f917-45ab-87dc-4ae803fbe1b9-vjdtpc.png");
    }
  };
  return (
    <>
      <h1
        className={`${poppins.className} bg-gradient-to-r from-neutral-500 to-neutral-950 bg-clip-text pb-10 text-center text-3xl font-light text-transparent dark:from-neutral-400/90 dark:to-neutral-200/90 md:text-4xl`}
      >
        Your shared Children
      </h1>
      <div className="flex flex-col items-center space-y-4 p-4">
        <div
          className="flex h-32 w-96 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-neutral-200/50 dark:border-neutral-800/50"
          style={{ backdropFilter: "blur(1px)" }}
        >
          <Input
            type="file"
            accept="image/*"
            name="image"
            className="hidden cursor-pointer"
            id="image"
            onChange={handleImageUpload}
          />
          <Label
            htmlFor="image"
            className="flex h-full w-full cursor-pointer items-center justify-center"
          >
            {selectedImage ? (
              <Image
                src={URL.createObjectURL(selectedImage)}
                alt="Selected"
                layout="fill"
                objectFit="cover"
              />
            ) : url ? (
              <Image
                src={url}
                alt="Selected"
                layout="fill"
                objectFit="cover"
              />
            ) : (
              <span className={`${robotoMono.className} text-neutral-600`}>
                Upload children photo
              </span>
            )}
          </Label>
        </div>
      </div>
      <div>
        {progress != 0 && (
          <div className="text-right">
            <p>{progress}%</p>
          </div>
        )}
        {progress != 0 && (
          <div className="relative h-0 w-full text-center">
            <div className="absolute top-1 h-1 w-full overflow-clip rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className="h-full bg-gray-400 transition-all duration-300 ease-in-out dark:bg-white"
                style={{
                  width: progress ? `${progress}%` : "0%",
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
              name="childName"
              value={formData.childName}
              onBlur={handleBlur}
              onChange={handleInputChange}
              placeholder="Children name..."
              className="w-full rounded border border-neutral-200 p-2 dark:border-neutral-800"
              style={{ backdropFilter: "blur(1px)" }}
            />
            {errors.childName && (
              <p className="text-sm text-red-500">{errors.childName}</p>
            )}
          </div>
        </div>
        <div className="flex w-full flex-row">
          <div className="w-full space-y-2">
            <Input
              type="text"
              name="gender"
              value={formData.gender}
              onBlur={handleBlur}
              onChange={handleInputChange}
              placeholder="Gender..."
              className="w-full rounded border border-neutral-200 p-2 dark:border-neutral-800"
              style={{ backdropFilter: "blur(1px)" }}
            />
            {errors.gender && (
              <p className="text-sm text-red-500">{errors.gender}</p>
            )}
          </div>
        </div>
        <div className="flex w-full flex-row">
          <div className="flex w-full flex-col">
            <DatePicker
              label="Birth date"
              variant="bordered"
              showMonthAndYearPickers
              value={date}
              onChange={setDate}
            />
          </div>
        </div>
        <div className="flex flex-row">
          <div className="flex flex-col">
            <Button onClick={hanldeSave}>Add Another Child</Button>
          </div>
        </div>
      </div>
      {!IsEmpty(childrenInfo.childName) && 
        <AddedChild
          childName={childrenInfo.childName}
          gender={childrenInfo.gender}
          date={childrenInfo.date}
          url={childrenInfo.fileUrl}
        />
      }
    </>
  );
}
