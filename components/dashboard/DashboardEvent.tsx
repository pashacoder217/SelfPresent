// components/DashboardEvent.tsx

"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { Roboto_Mono, Poppins } from "next/font/google";
import { createClient } from "@/utils/supabase/client";
import {
  Archive,
  Baby,
  FileText,
  TriangleAlert,
  RefreshCcw,
  Trash,
  SquareX,
  Trash2,
} from "lucide-react";
import ChildrenCp from "./eventcomponents/ChildrenCp";
import DocumentCp from "./eventcomponents/DocumentCp";
import EvidenceCp from "./eventcomponents/EvidenceCp";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/shadcn/button";
import { Input } from "../ui/input";
import { motion } from "framer-motion";
import { ItemText } from "@radix-ui/react-select";
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
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card-shadcn";
import Link from "next/link";

const robotoMono = Roboto_Mono({ subsets: ["latin"], display: "swap" });
const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  event_children: any[];
  event_documents: any[];
  event_evidence: any[];
}

export default function DashboardEvent() {
  const supabase = createClient();
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [filteredData, setFilteredData] = useState<Event[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchingEvents = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data: eventsData } = await supabase
      .from("events")
      .select(
        `
        id,
        title,
        description,
        date,
        event_children(children(full_name, gender, birth_year, avatar_url)),
        event_documents(documents(title, description, url, date)),
        event_evidence(evidence(description, url, date))
      `,
      )
      .eq("user_id", user?.id);
    if (eventsData) {
      eventsData.sort((a, b) =>
        a.date < b.date ? 1 : b.date < a.date ? -1 : 0,
      );
      setEvents(eventsData);
      setFilteredData(eventsData);
      setIsLoading(false);
    }
  }, [supabase]);

  const filteringEvents = (search: string) => {
    const tmp = events.filter(
      (item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredData(tmp);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    filteringEvents(value);
  };

  const handleDelete = async (id: string) => {
    try {
      await supabase.from("event_documents").delete().eq("event_id", id);
      await supabase.from("event_children").delete().eq("event_id", id);
      await supabase.from("event_evidence").delete().eq("event_id", id);
      await supabase.from("events").delete().eq("id", id);
      const _events = events.filter((item) => item.id != id);
      setEvents(_events);
      setFilteredData(_events);
    } catch (err) {
      console.log(err);
    }
    // window.location.assign("/dashboard/events")
  };

  useEffect(() => {
    fetchingEvents();
  }, [fetchingEvents]);

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
          <Skeleton className="h-[600px] w-full max-w-md rounded-sm" />
        </div>
      ) : (
        <div id="content" className="z-0 flex h-full flex-col pb-12 pt-9">
          <div ref={containerRef} className="z-0 flex-1 overflow-y-auto pb-32">
            <div className="flex justify-center">
              <div className="mt-24 w-full max-w-md snap-x items-center justify-center gap-10 whitespace-nowrap md:gap-10">
                <Input
                  name="search"
                  onChange={handleChange}
                  placeholder="Search..."
                  className="border-none bg-gradient-to-r from-white/5 to-white/10 shadow backdrop-blur-sm dark:from-black/40 dark:to-black/70 dark:shadow-neutral-500/5"
                />
              </div>
            </div>
            {isVisible && filteredData.length ? (
              filteredData.map((event, index) => (
                <div className="mt-4 flex justify-center" key={index}>
                  <div className="w-full max-w-md rounded-lg border border-black/5 bg-gradient-to-r from-white/5 to-white/10 px-14 pb-4 pt-6 shadow backdrop-blur-sm dark:border-white/5 dark:from-black/40 dark:to-black/70 dark:shadow-neutral-500/5">
                    <div className="flex justify-center pt-10">
                      <h1
                        className={`${robotoMono.className} bg-gradient-to-r from-neutral-700 to-neutral-900 bg-clip-text text-center text-xl font-medium text-transparent dark:from-neutral-300 dark:to-neutral-100`}
                      >
                        {event.description}
                      </h1>
                    </div>
                    <div className="pt-10">
                      {event.event_children.length > 0 ? (
                        <ChildrenCp childs={event.event_children} />
                      ) : (
                        <div></div>
                        // <div className="flex justify-center gap-1 pb-6">
                        //   <div className="mt-2 h-6 w-6 rounded-full bg-gradient-to-r from-neutral-400/80 to-neutral-400" />
                        //   <div className="mt-2 h-6 w-6 rounded-full bg-gradient-to-r from-neutral-400/80 to-neutral-400" />
                        //   <div className="mt-2 h-6 w-6 rounded-full bg-gradient-to-r from-neutral-400/80 to-neutral-400" />
                        // </div>
                      )}
                    </div>
                    <div className="flex justify-center pt-2">
                      <p
                        className={`${robotoMono.className} bg-gradient-to-r from-neutral-400 to-neutral-500 bg-clip-text pt-2 text-xs uppercase tracking-widest text-transparent dark:from-neutral-400/70 dark:to-neutral-300/70`}
                      >
                        {event.date}
                      </p>
                    </div>

                    <p
                      className={`${robotoMono.className} bg-gradient-to-r from-neutral-600 to-neutral-700 bg-clip-text pt-12 text-center text-sm leading-7 text-transparent dark:from-neutral-300/70 dark:to-neutral-400/70`}
                    >
                      {event.title}
                    </p>
                    <div className="pt-10">
                      {/* <div className="flex justify-center pb-4">
                        <Archive className="size-5 text-neutral-400 dark:text-neutral-300/70" />
                      </div> */}
                      {event.event_evidence.length > 0 ? (
                        <EvidenceCp childs={event.event_evidence} />
                      ) : (
                        <div></div>
                        // <div className="mt-5">
                        //   <div className="flex pt-10">
                        //     <Archive className="mr-2 size-4 text-muted-foreground" />
                        //     <p
                        //       className={`${robotoMono.className} bg-gradient-to-r from-neutral-500 to-neutral-700 bg-clip-text text-left text-xs tracking-wide text-transparent dark:from-neutral-300/70 dark:to-neutral-400/70`}
                        //     >
                        //       Evidence
                        //     </p>
                        //   </div>
                        //   <div className="flex justify-start gap-1">
                        //     <div className="mt-2 h-5 w-5 rounded bg-gradient-to-r from-neutral-400/80 to-neutral-400" />
                        //     <div className="mt-2 h-5 w-5 rounded bg-gradient-to-r from-neutral-400/80 to-neutral-400" />
                        //     <div className="mt-2 h-5 w-5 rounded bg-gradient-to-r from-neutral-400/80 to-neutral-400" />
                        //   </div>
                        // </div>
                      )}
                    </div>
                    <div className="mt-10 flex justify-center">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full"
                          >
                            <span className="hidden md:inline"></span>
                            <Trash2 className="size-5 h-4 w-4 text-neutral-400 hover:text-neutral-800 dark:text-neutral-300/70 dark:hover:text-neutral-300" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              <div className="flex flex-grow justify-start">
                                <TriangleAlert className="mr-5" />
                                Delete this event ?
                              </div>
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete your event.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => {
                                handleDelete(event.id);
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
              ))
            ) : events.length > 0 ? (
              <div className="flex items-center justify-center pt-12">
                <p
                  className={`${robotoMono.className} bg-gradient-to-r from-neutral-500 to-neutral-950 bg-clip-text text-lg text-transparent dark:from-neutral-400 dark:to-neutral-100`}
                >
                  No events found
                </p>
              </div>
            ) : (
              <div>
                <p>No Data</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
