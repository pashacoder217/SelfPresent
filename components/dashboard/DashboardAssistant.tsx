// components/dashboard/DashboardAssistant.tsx

"use client";

import React, { useEffect, useRef, useState, useContext } from "react";
import { ArrowBigUp, CircleArrowUp, RefreshCcw } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/shadcn/label";
import { Roboto_Mono, Poppins } from "next/font/google";

import { motion } from "framer-motion";
import { InitialMessagesContext } from "../../app/InitialMessagesProvider";
import { useAssistant } from "ai/react";
import { createClient } from "../../utils/supabase/client";
import { Skeleton } from "../ui/skeleton";

import { Button } from "../ui/shadcn/button";
import NavbarAssistant from "./NavbarAssistant";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function DashboardAssistant() {
  const supabase = createClient();
  const { initialMessages, setInitialMessages } = useContext(
    InitialMessagesContext,
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {
    status,
    setMessages,
    messages,
    input,
    submitMessage,
    handleInputChange,
  } = useAssistant({ api: `/api/generateChat` });

  useEffect(() => {
    const updatedMessages = messages.map((message) => ({
      ...message,
      createdAt: message.createdAt || new Date(),
    }));

    if (JSON.stringify(messages) !== JSON.stringify(updatedMessages)) {
      setInitialMessages(updatedMessages);
    }
  }, [messages, setInitialMessages]);

  const deleteChatHistory = async () => {
    if (typeof window !== "undefined") {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { error } = await supabase
          .from("user_openai_thread_id")
          .delete()
          .eq("user_id", user.id);

        if (!error) {
          const formData = new FormData();
          formData.append("userId", user.id);
          await fetch("/api/delete_chat", {
            method: "POST",
            body: formData,
          });
          window.location.assign("/dashboard/assistant");
        }
      }
    }
  };

  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
      event.preventDefault();
      const formEvent = new Event("submit", {
        bubbles: true,
        cancelable: true,
      });
      const form = event.currentTarget.form;
      if (form) {
        form.dispatchEvent(formEvent);
      }
    }
  };

  const handleFocus = () => {
    textareaRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleBlur = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleGetMessage = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const formData = new FormData();
      formData.append("userId", user.id);
      const res = await fetch("/api/get_chat", {
        method: "POST",
        body: formData,
      });
      const { chatHistory } = await res.json();
      setMessages(JSON.parse(chatHistory));
      setIsLoading(false);
    }
  };

  const handleStoreMessage = async () => {
    if (messages.length > 0) {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const formData = new FormData();
        formData.append("userId", user.id);
        formData.append("chatHistory", JSON.stringify(messages));
        await fetch("/api/store_chat", {
          method: "POST",
          body: formData,
        });
      }
    }
  };

  useEffect(() => {
    handleGetMessage();
  }, []);

  useEffect(() => {
    handleStoreMessage();
  }, [status]);

  return (
    <>
      <div className="flex h-screen flex-col">
        <main className="relative bottom-0 z-0 mt-1 flex-1 overflow-hidden md:bottom-10">
          {isLoading ? (
            <div className="flex flex-col items-center">
              <Skeleton className="h-[1000px] w-[95%] rounded-sm" />
            </div>
          ) : (
            <>
              <div className="absolute inset-0" ref={containerRef}>
                <div className="mx-4 mt-6 flex h-full flex-col rounded-sm bg-gradient-to-r from-white/40 to-white/70 backdrop-blur-sm dark:border-black/80 dark:from-black/40 dark:to-black/70">
                  <div className="flex flex-col overflow-y-auto border px-5 md:px-10">
                    <div className="pb-36 pt-32">
                      <div className="flex-1">
                        {messages.map((message, index) => (
                          <div key={index} className="mx-auto">
                            {message.role === "user" && message.content && (
                              <p className="font-regular text-md bg-gradient-to-r from-neutral-800 to-neutral-500 bg-clip-text pt-14 text-right leading-6 text-transparent dark:from-neutral-400 dark:to-neutral-500">
                                {message.content
                                  .split("\n")
                                  .map((line, lineIndex) => (
                                    <React.Fragment key={lineIndex}>
                                      {line}
                                      <br />
                                    </React.Fragment>
                                  ))}
                              </p>
                            )}
                            {message.role === "assistant" && (
                              <p
                                className={`${robotoMono.className} bg-gradient-to-r from-neutral-900 to-neutral-700 bg-clip-text pr-[20%] pt-14 text-sm text-transparent dark:from-neutral-100 dark:to-neutral-300`}
                              >
                                {message.content
                                  .split("\n")
                                  .map((line, lineIndex) => (
                                    <React.Fragment key={lineIndex}>
                                      {line.includes("https://") ? (
                                        <>
                                          {line
                                            .split("https://")
                                            .map((part, partIndex) =>
                                              partIndex === 0 ? (
                                                part
                                              ) : (
                                                <a
                                                  href={`https://${part.split(" ")[0]}`}
                                                  key={partIndex}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  className="text-sm text-neutral-500 underline md:text-base"
                                                >
                                                  {`https://${part.split(" ")[0]}`}
                                                </a>
                                              ),
                                            )}
                                        </>
                                      ) : (
                                        line
                                          .split(/(\*\*[^*]+\*\*|\#\s.+)/g)
                                          .map((segment, segmentIndex) => {
                                            if (
                                              segment.startsWith("**") &&
                                              segment.endsWith("**")
                                            ) {
                                              return (
                                                <span
                                                  className="font-bold"
                                                  key={segmentIndex}
                                                >
                                                  {segment.substring(
                                                    2,
                                                    segment.length - 2,
                                                  )}
                                                </span>
                                              );
                                            } else if (
                                              segment.startsWith("#")
                                            ) {
                                              return (
                                                <span
                                                  className={`${poppins.className} text-lg font-medium tracking-wider md:text-xl`}
                                                  key={segmentIndex}
                                                >
                                                  {segment.substring(2)}
                                                </span>
                                              );
                                            } else {
                                              return segment;
                                            }
                                          })
                                      )}
                                      <br />
                                    </React.Fragment>
                                  ))}
                              </p>
                            )}
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
        <div id="input-container-footer" className="flex w-full justify-center">
          <div className="fixed bottom-10 z-20 flex h-[120px] w-[38%] justify-center">
            <form
              onSubmit={submitMessage}
              className="flex h-[120px] w-full rounded-b-xl rounded-t-none border border-neutral-200/50 bg-white/5 shadow backdrop-blur-lg focus-visible:ring-0 dark:border-neutral-800/90 dark:bg-black/5 md:focus-within:ring-1 md:focus-within:ring-neutral-600/20 md:dark:focus-within:ring-neutral-100/10"
            >
              <Label htmlFor="message" className="sr-only">
                Message
              </Label>
              <Textarea
                disabled={status !== "awaiting_message"}
                id="message"
                placeholder="Type a message..."
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onBlur={handleBlur}
                ref={textareaRef}
                className="w-full resize-none border-0 pl-12 pr-8 pt-12 shadow-none focus-visible:ring-0"
              />
              <div className="flex items-end py-3 pr-3">
                <Button
                  size="sm"
                  type="submit"
                  className="mb-3 ml-auto mr-6 rounded-xl p-2 dark:bg-opacity-80"
                >
                  <ArrowBigUp className="size-6" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
