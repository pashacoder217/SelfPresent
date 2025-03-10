// components/DashboardDocument.tsx

"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Poppins, Roboto_Mono } from "next/font/google";
import { createClient } from "@/utils/supabase/client";
import { Skeleton } from "../ui/skeleton";
import { SquareX, Trash2, TriangleAlert } from "lucide-react";
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
import Image from "next/image";
import IsEmpty from "@/utils/is_empty";

const robotoMono = Roboto_Mono({ subsets: ["latin"], display: "swap" });
const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function DashboardDocument() {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(true);
  const [documents, setDocuments] = useState<Record<string, string>[]>([]);
  const [filteredData, setFilteredData] = useState<Record<string, string>[]>(
    [],
  );

  const fetchingDocuments = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data: documentsData } = await supabase
      .from("documents")
      .select("*")
      .eq("user_id", user?.id);
    if (documentsData) {
      setDocuments(documentsData);
      setFilteredData(documentsData);
      setIsLoading(false);
    }
  }, [supabase]);

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

  const handleDelete = async (id: string) => {
    try {
      await supabase.from("event_documents").delete().eq("document_id", id);
      await supabase.from("documents").delete().eq("id", id);
      const _documents = documents.filter((item) => item.id != id);
      setDocuments(_documents);
    } catch (err) {
      console.log(err);
    }
  };

  const filteringDocuments = (search: string) => {
    const tmp = documents.filter(
      (item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredData(tmp);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    filteringDocuments(value);
  };

  useEffect(() => {
    fetchingDocuments();
  }, [fetchingDocuments]);

  return (
    <>
      {isLoading ? (
        <div className="ml-6 mt-14 flex flex-col gap-2">
          <Skeleton className="h-[220px] w-full rounded-sm md:md:w-[98%]" />
          <Skeleton className="h-[220px] w-full rounded-sm md:md:w-[98%]" />
          <Skeleton className="h-[220px] w-full rounded-sm md:md:w-[98%]" />
          <Skeleton className="h-[220px] w-full rounded-sm md:md:w-[98%]" />
          <Skeleton className="h-[220px] w-full rounded-sm md:md:w-[98%]" />
        </div>
      ) : (
        <>
          <div className="z-0 flex h-full flex-col">
            <div className="flex-1 overflow-y-auto pb-36 pt-9">
              <div className="flex justify-center">
                <div className="mt-24 w-full max-w-md snap-x items-center justify-center gap-10 whitespace-nowrap rounded bg-gradient-to-r from-white/40 to-white/70 shadow backdrop-blur-sm dark:to-black/70 dark:shadow-neutral-500/5 md:gap-10">
                  <Input
                    name="search"
                    onChange={handleChange}
                    placeholder="Search..."
                  />
                </div>
              </div>
              <div className="mt-7">
                {filteredData.length ? (
                  filteredData.map((document, index) => (
                    <div className="mt-7 flex justify-center" key={index}>
                      <div className="w-full max-w-md rounded-sm border border-black/5 bg-gradient-to-r from-white/40 to-white/70 p-8 shadow backdrop-blur-sm dark:border-white/5 dark:from-black/40 dark:to-black/70 dark:shadow-neutral-500/5">
                        <div className="flex flex-row justify-center">
                          <div>
                            <div className="flex justify-center pt-8">
                              <h1
                                className={`${robotoMono.className} bg-gradient-to-r from-neutral-700 to-neutral-900 bg-clip-text text-center text-xl font-medium text-transparent dark:from-neutral-300 dark:to-neutral-100`}
                              >
                                {document.title}
                              </h1>
                            </div>
                            <div className="flex justify-center pb-1">
                              <div className="pb-1 pt-1">
                                <p
                                  className={`${poppins.className} bg-gradient-to-r from-neutral-400 to-neutral-500 bg-clip-text text-center text-xs uppercase tracking-widest text-transparent dark:from-neutral-300/70 dark:to-neutral-400/70`}
                                >
                                  {document.date}
                                </p>
                              </div>
                            </div>
                            <p
                              className={`${poppins.className} max-w-96 bg-gradient-to-r from-neutral-600 to-neutral-700 bg-clip-text pt-3 text-sm leading-7 text-transparent dark:from-neutral-300/70 dark:to-neutral-400/70`}
                            >
                              {document.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-center pt-12">
                          <Button variant="outline">
                            <a
                              href={document.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className=""
                              onClick={() => downloadFile(document.url)}
                            >
                              {/* <Image
                                src={document.url}
                                width={50}
                                height={50}
                                alt="fileUrl"
                              /> */}
                              Download
                            </a>
                          </Button>

                          <div className="">
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <div className="text-center">
                                  <div className="justify-center">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="rounded-full"
                                    >
                                      <span className="hidden md:inline"></span>
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    <div className="flex flex-grow justify-start">
                                      <TriangleAlert className="mr-5" />
                                      Delete this document ?
                                    </div>
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will
                                    permanently delete your document.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => {
                                      handleDelete(document.id);
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
                ) : documents.length > 0 ? (
                  <div>
                    <p>No results for your search!</p>
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
