// components/DashboardEvidence.tsx

"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import { Poppins, Roboto_Mono } from "next/font/google";
import { CloudDownload, SquareX, Trash2, TriangleAlert } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import FooterEventsDashboard from "./FooterEventsDashboard";
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
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { LinkPreview } from "../ui/link-preview";

const robotoMono = Roboto_Mono({ subsets: ["latin"], display: "swap" });
const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function DashboardEvidence() {
  const supabase = createClient();
  const [evidences, setevidences] = useState<Record<string, string>[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filteredData, setFilteredData] = useState<Record<string, string>[]>(
    [],
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const fetchingEvidence = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data: evidenceData } = await supabase
      .from("evidence")
      .select("*")
      .eq("user_id", user?.id);
    if (evidenceData) {
      setevidences(evidenceData);
      setFilteredData(evidenceData);
      setIsLoading(false);
    }
  }, [supabase]);

  const filteringEvidences = (search: string) => {
    const tmp = evidences.filter(
      (item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredData(tmp);
  };

  const handleDelete = async (id: string) => {
    try {
      await supabase.from("event_evidence").delete().eq("evidence_id", id);
      await supabase.from("evidence").delete().eq("id", id);
      const _evidences = evidences.filter((item) => item.id != id);
      setevidences(_evidences);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    filteringEvidences(value);
  };

  const downloadFile = async (url: string) => {
    const response = await fetch(url, { mode: "cors" });
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = getFilename(url);
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(downloadUrl);
  };

  const getFilename = (url: string): string => {
    return url.split("/").pop() || "download";
  };

  useEffect(() => {
    fetchingEvidence();
  }, [fetchingEvidence]);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        setIsVisible(containerRef.current.scrollTop > 0);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="mt-36 flex flex-col items-center gap-5">
          <Skeleton className="h-[40px] w-full max-w-md rounded-sm" />
          <Skeleton className="h-[220px] w-full max-w-md rounded-sm" />
          <Skeleton className="h-[220px] w-full max-w-md rounded-sm" />
          <Skeleton className="h-[220px] w-full max-w-md rounded-sm" />
          <Skeleton className="h-[220px] w-full max-w-md rounded-sm" />
          <Skeleton className="h-[220px] w-full max-w-md rounded-sm" />
        </div>
      ) : (
        <>
          <div className="z-0 flex h-full flex-col">
            <div
              ref={containerRef}
              className="flex-1 overflow-y-auto pb-64 pt-36"
            >
              <div className="flex justify-center">
                <div className="w-full max-w-md snap-x items-center justify-center gap-10 whitespace-nowrap md:gap-10">
                  <Input
                    name="search"
                    onChange={handleChange}
                    placeholder="Search..."
                    className="border-none bg-gradient-to-r from-white/5 to-white/10 shadow backdrop-blur-sm dark:from-black/40 dark:to-black/70 dark:shadow-neutral-500/5"
                  />
                </div>
              </div>
              <div className="mt-4">
                {filteredData.length ? (
                  filteredData.map((data, index) => (
                    <div className="mb-2 flex justify-center" key={index}>
                      <div
                        id="card"
                        className="w-full max-w-md rounded-sm border border-black/5 bg-gradient-to-r from-white/5 to-white/10 p-4 shadow backdrop-blur-sm dark:border-white/5 dark:from-black/40 dark:to-black/70 dark:shadow-neutral-500/5"
                      >
                        <div className="flex flex-row justify-center">
                          <div>
                            <div className="flex justify-center pt-8">
                              <h1
                                className={`${robotoMono.className} bg-gradient-to-r from-neutral-700 to-neutral-900 bg-clip-text text-center text-xl font-medium text-transparent dark:from-neutral-300 dark:to-neutral-100`}
                              >
                                {data.title}
                              </h1>
                            </div>
                            <div className="flex justify-center pb-1">
                              <div className="pb-1 pt-1">
                                <p
                                  className={`${poppins.className} bg-gradient-to-r from-neutral-400 to-neutral-500 bg-clip-text text-center text-xs uppercase tracking-widest text-transparent dark:from-neutral-300/70 dark:to-neutral-400/70`}
                                >
                                  {data.date}
                                </p>
                              </div>
                            </div>
                            <p
                              className={`${poppins.className} max-w-96 bg-gradient-to-r from-neutral-600 to-neutral-700 bg-clip-text pt-3 text-sm leading-7 text-transparent dark:from-neutral-300/70 dark:to-neutral-400/70`}
                            >
                              {data.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-4 pt-12">
                          <Button className="" variant="outline">
                            <LinkPreview url={data.url} className="">
                              <a
                                href={data.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => {
                                  e.preventDefault();
                                  downloadFile(data.url);
                                }}
                              >
                                <div className="flex items-center gap-3">
                                  <CloudDownload className="size-4 text-neutral-600 dark:text-neutral-300" />
                                  <p
                                    className={`${robotoMono.className} bg-gradient-to-r from-neutral-600 to-neutral-950 bg-clip-text font-normal tracking-wider text-transparent dark:from-neutral-300 dark:to-neutral-100`}
                                  >
                                    Download
                                  </p>
                                  {/* <Image
                                  src={data.url}
                                  width={50}
                                  height={50}
                                  alt="fileUrl"
                                /> */}
                                </div>
                              </a>
                            </LinkPreview>
                          </Button>
                          <div className="">
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
                                      <TriangleAlert className="mr-5" />
                                      Delete evidence?
                                    </div>
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will
                                    permanently delete your evidence.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => {
                                      handleDelete(data.id);
                                    }}
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : evidences.length > 0 ? (
                  <div className="flex items-center justify-center pt-12">
                    <p
                      className={`${robotoMono.className} bg-gradient-to-r from-neutral-500 to-neutral-950 bg-clip-text text-lg text-transparent dark:from-neutral-400 dark:to-neutral-100`}
                    >
                      No evidence found
                    </p>
                  </div>
                ) : (
                  <div>
                    <p>No Data</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
