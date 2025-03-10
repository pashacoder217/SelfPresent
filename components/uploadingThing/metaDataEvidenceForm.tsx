"use client";
import React, { useState, useEffect, useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/SelfPresent/components/ui/form";
import { Input } from "../ui/shadcn/input";
import { Button } from "@/SelfPresent/components/ui/button";

import { createClient } from "@/utils/supabase/client";
import {
  Select,
  SelectItem,
  SelectLabel,
  SelectGroup,
  SelectContent,
  SelectValue,
  SelectTrigger,
} from "../ui/select";

const schema = z.object({
  title: z.string().min(1, "Title is required!"),
  description: z.string().min(1, "Description is required!"),
  event: z.string().min(0, ""),
});
type Schema = z.infer<typeof schema>;

const MetadataEvidenceForm = () => {
  const [events, setEvents] = useState<Record<string, string>[]>([]);
  const [eventId, setEventId] = useState<string>("");
  const supabase = createClient();
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      event: "event",
    },
  });
  const getEvents = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data: eventData } = await supabase
        .from("events")
        .select("*")
        .eq("user_id", user.id);
      if (eventData) {
        setEvents(eventData);
      }
    }
  }, [supabase]);
  useEffect(() => {
    getEvents();
  }, []);
  const onSubmit = async (input: Schema) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data: data } = await supabase
        .from("evidence")
        .update({
          title: input.title,
          description: input.description,
        })
        .eq("user_id", user.id)
        .is("description", null)
        .select()
        .single();
      if (data) {
        await supabase.from("event_evidence").insert({
          event_id: eventId,
          evidence_id: data.id,
        });
      }
      window.location.assign("/dashboard/evidence");
    }
  };
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="z-10 flex w-full flex-col gap-6 rounded-lg border-3 p-5"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <div className="space-y-6">
                <FormItem className="w-full">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="title...." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <div className="space-y-6">
                <FormItem className="w-full">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="description...." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="event"
            render={({ field }) => (
              <div className="w-75 space-y-6">
                <FormItem className="w-full">
                  <FormLabel>Events</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        setEventId(value);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pick a past event..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Events</SelectLabel>
                          {events.map((event, index) => {
                            return (
                              <SelectItem value={event.id} key={index}>
                                {event.title}
                              </SelectItem>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            )}
          />
          <div className="mr-4 text-right">
            <Button className="w-fit">Save</Button>
          </div>
        </form>
      </Form>
    </>
  );
};
export default MetadataEvidenceForm;
