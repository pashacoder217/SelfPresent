"use client";
import { useState, useEffect, useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createClient } from "@/utils/supabase/client";
import { Button } from "@/SelfPresent/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/SelfPresent/components/ui/form";
import { today, getLocalTimeZone, DateValue } from "@internationalized/date";
import { Input } from "@/SelfPresent/components/ui/shadcn/input";
import { Textarea } from "@/SelfPresent/components/ui/textarea";
import ComboBoxItem from "./items/ComboBoxItem";
import { Poppins, Roboto_Mono } from "next/font/google";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/SelfPresent/lib/utils";
import { Calendar } from "@/SelfPresent/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/SelfPresent/components/ui/popover";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
});
const schema =
  typeof window !== "undefined"
    ? z.object({
        title: z.string().min(1, "Title is required!"),
        description: z.string().min(1, "Description is required!"),
      })
    : z.any();

type Schema = z.infer<typeof schema>;

const Content = () => {
  const now = Date.now();
  const [date, setDate] = useState<Date | undefined>(new Date(now));

  const [documents, setDocuments] = useState<Record<string, string>[]>([]);
  const [evidences, setEvidences] = useState<Record<string, string>[]>([]);
  const [children, setChildren] = useState<Record<string, string>[]>([]);
  // const [partners, setPartners] = useState<Record<string, string>[]>([]);
  const [doc, setDoc] = useState<string[]>([]);
  const [edc, setEdc] = useState<string[]>([]);
  const [child, setChild] = useState<string[]>([]);
  // const [partner, setPartner] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(true);

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const supabase = createClient();
  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
  };
  const fetchingDocuments = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data } = await supabase
      .from("documents")
      .select("*")
      .eq("user_id", user?.id);
    let tmp: Record<string, string>[] = [];
    if (data) {
      data.forEach((item) => {
        tmp.push({
          label: item.title,
          value: item.id,
        });
      });
      setDocuments(tmp);
    }
  }, [supabase]);
  const fetchingEvidences = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data } = await supabase
      .from("evidence")
      .select("*")
      .eq("user_id", user?.id);
    let tmp: Record<string, string>[] = [];
    if (data) {
      data.forEach((item) => {
        tmp.push({
          label: item.title,
          value: item.id,
        });
      });
      setEvidences(tmp);
    }
  }, [supabase]);
  const fetchingChildren = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data } = await supabase
      .from("children")
      .select("*")
      .eq("user_id", user?.id);
    let tmp: Record<string, string>[] = [];
    if (data) {
      data.forEach((item) => {
        tmp.push({
          label: item.full_name,
          value: item.id,
        });
      });
      setChildren(tmp);
    }
  }, [supabase]);

  // const fetchingPatner = useCallback(async () => {
  //   const {
  //     data: { user },
  //   } = await supabase.auth.getUser();
  //   const { data } = await supabase
  //     .from("ex_partners")
  //     .select("*")
  //     .eq("user_id", user?.id);
  //   let tmp: Record<string, string>[] = [];
  //   if (data) {
  //     data.forEach((item) => {
  //       tmp.push({
  //         label: item.name,
  //         value: item.id,
  //       });
  //     });
  //     setPartners(tmp);
  //   }
  // }, [supabase]);

  useEffect(() => {
    fetchingDocuments();
    fetchingEvidences();
    fetchingChildren();
    // fetchingPatner();
    console.log(today(getLocalTimeZone()).toString());
  }, []);

  const selectDocument = useCallback(
    (value: string[]) => {
      setDoc(value);
    },
    [documents],
  );

  const selectEvidence = useCallback(
    (value: string[]) => {
      setEdc(value);
    },
    [evidences],
  );

  const selectChild = useCallback(
    (value: string[]) => {
      setChild(value);
    },
    [children],
  );
  // const selectPartner = useCallback(
  //   (value: string) => {
  //     setPartner(value);
  //     if (!IsEmpty(value)) {
  //       setIsUploading(false);
  //     } else {
  //       setIsUploading(true);
  //     }
  //   },
  //   [partners],
  // );

  const onSubmit = async (input: Schema) => {
    setIsUploading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const {
      data: { id },
    } = await supabase
      .from("events")
      .insert({
        user_id: user?.id,
        // ex_partner_id: partner,
        title: input.title,
        description: input.description,
        date: date,
      })
      .select()
      .single();
    child?.forEach(async (item) => {
      await supabase.from("event_children").insert({
        event_id: id,
        child_id: item,
      });
    });
    doc?.forEach(async (item) => {
      await supabase.from("event_documents").insert({
        event_id: id,
        document_id: item,
      });
    });
    edc?.forEach(async (item) => {
      await supabase.from("event_evidence").insert({
        event_id: id,
        evidence_id: item,
      });
    });
    window.location.assign("/dashboard/events");
  };
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative w-full gap-6 pb-6 pt-8 md:pb-0"
        >
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <div className="w-full space-y-6">
                <FormItem className="w-full">
                  <p
                    className={`${poppins.className} bg-gradient-to-r from-neutral-800 to-neutral-950 bg-clip-text pb-5 text-center text-2xl text-transparent dark:from-neutral-100 dark:to-neutral-300`}
                  >
                    Log Event
                  </p>
                  {/* <FormLabel>Title</FormLabel> */}
                  <FormControl>
                    <Input
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="What happened?"
                      className="w-full"
                    />
                  </FormControl>
                </FormItem>
              </div>
            )}
          />
          <div className="pt-3" />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <div className="space-y-6">
                <FormItem className="w-full">
                  {/* <FormLabel>Description</FormLabel> */}
                  <FormControl>
                    <Textarea
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Detailed notes"
                      className="w-full"
                    />
                  </FormControl>
                </FormItem>
              </div>
            )}
          />
          <div className="pt-3" />
          {/* <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <div className="space-y-6">
                <FormItem className="w-full">
                  <FormControl> */}
          {/* </FormControl>
                </FormItem>
              </div>
            )}
          /> */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <div className="flex justify-center">
            <div className="flex flex-col items-start justify-start pt-6">
              {/* <ComboBoxItem
                data={documents}
                onSelectChange={selectDocument}
                placeholder="documents"
              /> */}
              <div className="w-full">
                <ComboBoxItem
                  data={evidences}
                  onSelectChange={selectEvidence}
                  placeholder="evidence"
                />
              </div>
              {/* <ComboBoxSingle
                data={partners}
                onSelectChange={selectPartner}
                placeholder="partner"
              /> */}
              <ComboBoxItem
                data={children}
                onSelectChange={selectChild}
                placeholder="children"
              />

              <Button
                type="submit"
                // disabled={isUploading}
                className="mt-8 w-full"
              >
                Save
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};
export default Content;
