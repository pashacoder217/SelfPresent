"use client";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";

import { useEffect, useState, useCallback } from "react";
import UploadThingButton from "./uploadthing/UploadThingButton";

export default function DocumentUpload() {
  const supabase = createClient();
  const [userUploads, setUserUploads] = useState<string[]>([]);

  const fetchUserUploads = useCallback(async () => {
    console.log("Attempting to fetch user uploads.");
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      console.log(`User found: ${user.id}, fetching uploads.`);
      const { data, error } = await supabase
        .from("user_uploads")
        .select("file_url")
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching file urls: ", error);
      } else {
        console.log("User uploads fetched successfully.", data);
        setUserUploads(data.map((upload: any) => upload.file_url));
      }
    } else {
      console.log("No user found.");
    }
  }, [supabase]);

  useEffect(() => {
    fetchUserUploads();

    const userUploadsChannel = supabase
      .channel("public-user_uploads")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "user_uploads",
        },
        (payload) => {
          console.log("New upload received!", payload);
          setUserUploads((currentUploads) => [
            ...currentUploads,
            payload.new.file_url,
          ]);
        },
      )
      .subscribe();

    return () => {
      userUploadsChannel.unsubscribe();
    };
  }, [fetchUserUploads, supabase]);

  return (
    <>
      <div className="flex space-x-2 overflow-x-auto">
        {userUploads.map((url, index) => {
          console.log(`File URL ${index + 1}: ${url}`); // Logging the src URL
          return (
            <button key={index} className="shrink-0">
              {url.endsWith(".pdf") ? (
                <div className="flex h-20 w-20 items-center justify-center rounded-md bg-gray-200">
                  <span className="text-sm">PDF</span>
                </div>
              ) : (
                <Image
                  alt={`Product image ${index + 1}`}
                  className="aspect-square rounded-md object-cover" // Adjusted width and height for consistency in a scrollable view
                  src={url}
                  width={80}
                  height={80}
                  quality={90}
                />
              )}
            </button>
          );
        })}
        <button className="flex aspect-square h-20 w-20 shrink-0 items-center justify-center rounded-md border border-dashed">
          <span className="sr-only">Upload</span>
        </button>
      </div>
    </>
  );
}
