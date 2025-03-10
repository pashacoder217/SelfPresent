"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useUploadFile } from "@/SelfPresent/hooks/use-upload-file";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/SelfPresent/components/ui/form";
import { FileUploader } from "./file-uploader";

const schema =
  typeof window !== "undefined"
    ? z.object({
      images: z.array(z.instanceof(File)),
    })
    : z.any();

type Schema = z.infer<typeof schema>;
interface Props {
  endpoint: "docUploader" | "evidenceUploader";
}

const UploadingForm: React.FC<Props> = ({ endpoint }) => {
  const [loading, setLoading] = useState(false);
  const { uploadFiles, progresses, isUploading } = useUploadFile(
    `${endpoint}`,
    { defaultUploadedFiles: [] },
  );
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      images: [],
    },
  });
  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col rounded-lg"
      >
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <div className="">
              <FormItem className="w-full">
                <FormControl>
                  <FileUploader
                    value={field.value}
                    onValueChange={field.onChange}
                    maxFiles={1}
                    maxSize={32 * 1024 * 1024}
                    progresses={progresses}
                    // pass the onUpload function here for direct upload
                    onUpload={uploadFiles}
                    disabled={isUploading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </div>
          )}
        />
      </form>
    </Form>
  );
};
export default UploadingForm;
