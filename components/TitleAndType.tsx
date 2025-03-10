"use client";

import React, { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "./ui/shadcn/button";

type Data = {
  title: string;
  type: string;
};

const TitleAndType: React.FC<{ fileUrl?: string }> = ({ fileUrl }) => {
  const [title, setTitle] = useState<string>("");
  const [type, setType] = useState<string>("agreement");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const superbase = createClient();

  const insertData = async (data: Data) => {
    const {
      data: { user },
    } = await superbase.auth.getUser();

    if (user) {
      const { error } = await superbase
        .from("user_uploads")
        .update({
          title: data.title,
          type: data.type,
        })
        .is("title", null);
      window.location.assign("/app/files");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);
    insertData({ title: title, type: type });

    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="my-[200px] bg-gray-500 p-8">
      <form
        noValidate={true}
        className="mb-4"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="gird gap-2">
          <div className="grid gap-1">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              className="mb-8 w-full rounded-md bg-neutral-800 p-3"
              name="title"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              placeholder="Title..."
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="flex items-center justify-center">
            <div className="w-full max-w-xs">
              <label className="mb-2 block text-white" htmlFor="type">
                Select an file type...
              </label>
              <select
                id="type"
                className="w-full rounded-md px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                }}
              >
                <option value="agreement" className="py-2">
                  agreement
                </option>
                <option value="medical" className="py-2">
                  medical
                </option>
                <option value="legal" className="py-2">
                  legal
                </option>
              </select>
            </div>
          </div>
          <div className="mt-5 text-right">
            <Button
              variant="outline"
              type="submit"
              className="right-0 mt-1"
              loading={isSubmitting}
            >
              Upload
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default TitleAndType;
