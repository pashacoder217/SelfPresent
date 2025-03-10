// app/api/uploadthing/core.ts

import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { createClient } from "@/utils/supabase/server";

const f = createUploadthing();

const auth = async (req: Request) => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    console.log("auth error: ", error);
    return null;
  }
  console.log("user id: ", data.user.id);
  return { id: data.user.id };
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  docUploader: f({
    pdf: { maxFileSize: "32MB" },
    text: { maxFileSize: "32MB" },
    image: { maxFileSize: "32MB" },
  })
    .middleware(async ({ req }) => {
      const user = await auth(req);
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const supabase = createClient();
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
      const { data, error } = await supabase
        .from("user_uploads")
        .insert([{ user_id: metadata.userId, file_url: file.url }]);
      await supabase.from("documents").insert({
        user_id: metadata.userId,
        url: file.url,
      });
      if (data) {
        console.log("Inserted data:", data);
      }
      if (error) {
        console.error("Error inserting file URL into Supabase", error);
      }
      return { uploadedBy: metadata.userId };
    }),
  evidenceUploader: f({
    pdf: { maxFileSize: "32MB" },
    text: { maxFileSize: "32MB" },
    image: { maxFileSize: "32MB" },
  })
    .middleware(async ({ req }) => {
      const user = await auth(req);
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const supabase = createClient();
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
      const { data, error } = await supabase
        .from("user_uploads")
        .insert([{ user_id: metadata.userId, file_url: file.url }]);
      await supabase.from("evidence").insert({
        user_id: metadata.userId,
        url: file.url,
      });
      if (data) {
        console.log("Inserted data:", data);
      }
      if (error) {
        console.error("Error inserting file URL into Supabase", error);
      }
      return { uploadedBy: metadata.userId };
    }),
  userInfo: f({ image: { maxFileSize: "32MB" } })
    .middleware(async ({ req }) => {
      const user = await auth(req);
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("complete uploading");
    }),
  updateChildImage: f({ image: { maxFileSize: "32MB" } })
    .middleware(async ({ req }) => {
      const user = await auth(req);
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // 
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
