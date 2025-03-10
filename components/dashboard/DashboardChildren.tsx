// components/dashboard/DashboardChildren.tsx

"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Roboto_Mono, Poppins } from "next/font/google";
import { createClient } from "@/utils/supabase/client";
import { z } from "zod";
import { uploadFiles } from "@/SelfPresent/lib/uploadthing";
import { Label } from "../ui/shadcn/label";
import { Pencil, Trash2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { px } from "framer-motion";
import SwitchCustomVertical from "../SwitchCustomVertical";
import { Skeleton } from "../ui/skeleton";
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogTrigger,
  AlertDialogFooter,
} from "../ui/alert-dialog";
import { Input } from "../ui/input";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Progress } from "../ui/progress";
import { cn } from "@/SelfPresent/lib/utils";
import { Button } from "@/SelfPresent/components/ui/button";
import { Calendar } from "@/SelfPresent/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/SelfPresent/components/ui/popover";
import IsEmpty from "@/utils/is_empty";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import { Badge } from "../ui/shadcn/badge";
const robotoMono = Roboto_Mono({ subsets: ["latin"], display: "swap" });
const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const calculateAge = (birthDateString: string): number => {
  const today = new Date();
  const birthDate = new Date(birthDateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

const schema = z.object({
  childName: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .min(1, "Name is Required!"),
  gender: z
    .string()
    .min(2, "Name must be at least 2 character.s")
    .min(1, "Ex Name is required!"),
});

type FormData = z.infer<typeof schema>;
type Errors = Partial<Record<keyof FormData, string>>;

export default function DashboardChildren() {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [childrens, setChildrens] = useState<Record<string, string>[]>([]);
  const [filteredData, setFilteredData] = useState<Record<string, string>[]>(
    [],
  );

  const [formData, setFormData] = useState<FormData>({
    childName: "",
    gender: "",
  });
  const [url, setUrl] = useState<string>(
    "https://utfs.io/f/c88f03a3-f917-45ab-87dc-4ae803fbe1b9-vjdtpc.png",
  );
  const [date, setDate] = useState<Date>();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [errors, setErrors] = useState<Errors>({});

  const fetchingChildren = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data: childrensData } = await supabase
      .from("children")
      .select("*")
      .eq("user_id", user?.id);
    if (childrensData) {
      setChildrens(childrensData);
      setFilteredData(childrensData);
      setIsLoading(false);
    }
  }, [supabase]);

  const handleDelete = async (id: string) => {
    try {
      await supabase.from("event_children").delete().eq("child_id", id);
      await supabase.from("children").delete().eq("id", id);
      const _children = childrens.filter((item) => item.id != id);
      setChildrens(_children);
    } catch (err) {
      console.log(err);
    }
  };

  const filteringChildren = (search: string) => {
    const tmp = childrens.filter(
      (item) =>
        item.full_name.toLowerCase().includes(search.toLowerCase()) ||
        item.gender.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredData(tmp);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    filteringChildren(value);
  };

  const init = (child: Record<string, string>) => {
    setFormData({
      ...formData,
      ["childName"]: child.full_name,
      ["gender"]: child.gender,
    });
    setDate(new Date(child.birth_year));
    setUrl(child.avatar_url);
  };

  const startAnimation = () => {
    
  }


  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    let files: File[] = [];
    if (file) {
      files.push(file);
      setSelectedImage(file);
      const res = await uploadFiles("updateChildImage", {
        files,
        onUploadProgress: ({ progress }) => {
          if (progress >= 100) {
            progress = 0
            startAnimation()
          }
          setProgress(progress)
        }
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
    async (id: string) => {
      await supabase
        .from("children")
        .update({
          gender: formData.gender,
          birth_year: date,
          full_name: formData.childName,
        })
        .eq("id", id);
      window.location.assign("/dashboard/children");
    },
    [date, supabase, formData, url],
  );

  const mutation = useMutation({
    mutationFn: saveChildInfo,
    onSuccess: () => {
      console.log("Success!");
    },
  });
  const handleSave = async (id: string) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      mutation.mutate(id);
      setFormData({
        childName: "",
        gender: "",
      });
      setUrl(
        "https://utfs.io/f/c88f03a3-f917-45ab-87dc-4ae803fbe1b9-vjdtpc.png",
      );
    }
  };

  useEffect(() => {
    fetchingChildren();
  }, [fetchingChildren]);

  const childrenItems = filteredData.map((child, index) => ({
    id: index,
    name: child.full_name,
    designation: `${child.gender}, ${calculateAge(child.birth_year)} years old`,
    image: child.avatar_url || "",
  }));

  return (
    <div className="z-0 mx-auto mb-44 mt-32 flex h-screen flex-col items-center justify-center space-y-5 overflow-y-scroll">
      {isLoading ? (
        <div className="flex flex-col items-center">
          <Skeleton className="h-[400px] rounded-sm md:w-[440px] lg:w-[540px]" />
        </div>
      ) : (
        <div className="space-y-5">
          {filteredData.length ? (
            filteredData.map((children, index) => (
              <div
                className="flex w-[300px] flex-col items-center rounded-md bg-gradient-to-r from-white/40 to-white/70 p-5 shadow backdrop-blur-sm dark:from-black/40 dark:to-black/70 dark:shadow-neutral-500/5"
                key={index}
              >
                <div className="flex justify-center pt-2">
                  <h1
                    className={`${robotoMono.className} bg-gradient-to-r from-neutral-700 to-neutral-900 bg-clip-text text-center text-xl font-medium text-transparent dark:from-neutral-300 dark:to-neutral-100`}
                  >
                    {children.full_name}
                  </h1>
                </div>
                <div className="flex flex-col items-center pt-10">
                  <AnimatedTooltip items={[childrenItems[index]]} />
                </div>

                <div className="mt-10 flex flex-col space-y-2">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        onClick={() => {
                          init(children);
                        }}
                        className=""
                        variant="outline"
                      >
                        <div className="flex items-center gap-3">
                          <Pencil className="size-4 text-neutral-600 dark:text-neutral-300" />
                          <p
                            className={`${robotoMono.className} bg-gradient-to-r from-neutral-600 to-neutral-950 bg-clip-text font-normal tracking-wider text-transparent dark:from-neutral-300 dark:to-neutral-100`}
                          >
                            Update
                          </p>
                        </div>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          <div className="flex flex-grow justify-center py-6">
                            <p
                              className={`${robotoMono.className} bg-gradient-to-r from-neutral-400 to-neutral-500 bg-clip-text text-xl font-normal text-transparent dark:from-neutral-300 dark:to-neutral-200`}
                            >
                              Update child information
                            </p>
                          </div>
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          <div>
                            <div className="flex flex-col items-center space-y-4 p-4">
                              <div
                                className="flex h-32 w-32 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-neutral-200/50 dark:border-neutral-800/50"
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
                                      className="rounded-full"
                                    />
                                  ) : url ? (
                                    <Image
                                      src={url}
                                      alt="Selected"
                                      layout="fill"
                                      objectFit="cover"
                                      className="rounded-full"
                                    />
                                  ) : (
                                    <span
                                      className={`${robotoMono.className} text-neutral-600`}
                                    >
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
                              {progress != 0 && <Progress value={progress} />}
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
                                    style={{
                                      backdropFilter: "blur(1px)",
                                    }}
                                  />
                                  {errors.childName && (
                                    <p className="text-sm text-red-500">
                                      {errors.childName}
                                    </p>
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
                                    style={{
                                      backdropFilter: "blur(1px)",
                                    }}
                                  />
                                  {errors.gender && (
                                    <p className="text-sm text-red-500">
                                      {errors.gender}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="flex w-full flex-row">
                                <div className="flex w-full flex-col">
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "w-[280px] justify-start text-left font-normal",
                                          !date && "text-muted-foreground",
                                        )}
                                      >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? (
                                          format(date, "PPP")
                                        ) : (
                                          <span>Pick a date</span>
                                        )}
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                      <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                      />
                                    </PopoverContent>
                                  </Popover>
                                </div>
                              </div>
                            </div>
                          </div>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            handleSave(children.id);
                          }}
                        >
                          Save
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <div className="text-center">
                        <div className="">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full"
                          >
                            <Trash2 className="size-4 text-neutral-400 hover:text-neutral-800 dark:text-neutral-300/70 dark:hover:text-neutral-300" />
                          </Button>
                        </div>
                      </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          <div className="flex flex-grow justify-start">
                            Delete this child?
                          </div>
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your child.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            handleDelete(children.id);
                          }}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))
          ) : childrens.length > 0 ? (
            <div className="flex items-center justify-center pt-12">
              <p
                className={`${robotoMono.className} bg-gradient-to-r from-neutral-500 to-neutral-950 bg-clip-text text-lg text-transparent dark:from-neutral-400 dark:to-neutral-100`}
              >
                No children found
              </p>
            </div>
          ) : (
            <div>
              <p>No Data</p>
            </div>
          )}
        </div>
      )}
      <div className="fixed bottom-0 z-20 flex h-[120px] w-full max-w-md items-center justify-center gap-4 rounded-t-none border border-neutral-200/50 bg-white/5 shadow backdrop-blur-lg dark:border-neutral-800/90 dark:bg-black/5 md:bottom-10 md:rounded-b-xl dark:md:border-2">
        <div className="absolute bottom-5 left-5 z-30 md:left-10">
          <SwitchCustomVertical />
        </div>
      </div>
    </div>
  );
}
