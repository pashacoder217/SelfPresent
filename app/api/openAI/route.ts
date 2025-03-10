import { revalidatePath } from "next/cache";
import fs from "node:fs/promises";
import { createClient } from "utils/supabase/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  const supabase = createClient();
  let openai;

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const fileUrl = formData.get("fileUrl") as string;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.error("User not authenticated");
      return new Response("User not authenticated", { status: 401 });
    }

    const { data: vectorStoreData, error: vectorStoreError } = await supabase
      .from("user_openai_vector_store_id")
      .select("vector_store_id")
      .eq("user_id", user.id)
      .single();

    let vectorStoreId;

    if (vectorStoreError || !vectorStoreData) {
      console.error(
        "Error fetching vector store ID or no vector store found:",
        vectorStoreError,
      );

      openai = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || "",
        dangerouslyAllowBrowser: true,
      });

      const newVectorStoreResponse = await openai.beta.vectorStores.create({
        name: `vector_store_${user.id}`,
      });

      vectorStoreId = newVectorStoreResponse.id;

      const { error: insertError } = await supabase
        .from("user_openai_vector_store_id")
        .insert({
          user_id: user.id,
          vector_store_id: vectorStoreId,
        });

      if (insertError) {
        console.error("Error inserting new vector store ID:", insertError);
        return new Response("Error inserting new vector store ID", {
          status: 500,
        });
      }

      console.log("New vector store created and inserted:", vectorStoreId);
    } else {
      vectorStoreId = vectorStoreData.vector_store_id;
      console.log("Vector store ID:", vectorStoreId);
    }

    openai =
      openai ||
      new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || "",
        dangerouslyAllowBrowser: true,
      });

    const fileUploadResponse = await openai.files.create({
      file: file,
      purpose: "assistants",
    });

    console.log("OpenAI file uploaded:", fileUploadResponse);

    const { data, error } = await supabase.from("user_uploads").insert({
      user_id: user.id,
      file_url: fileUrl,
      openai_file_id: fileUploadResponse.id,
      vector_store_id: vectorStoreId,
    });

    if (error) {
      console.error("Error inserting user upload:", error);
      return new Response("Error inserting user upload", { status: 500 });
    } else {
      console.log("User upload inserted successfully:", data);

      const vectorStoreFileResponse =
        await openai.beta.vectorStores.files.create(vectorStoreId, {
          file_id: fileUploadResponse.id,
        });

      console.log("File added to vector store:", vectorStoreFileResponse);

      const vectorStoreFiles =
        await openai.beta.vectorStores.files.list(vectorStoreId);
      console.log("List response:", vectorStoreFiles);

      if (vectorStoreFiles?.data?.length > 0) {
        console.log("Files in vector store:", vectorStoreFiles.data);
      } else {
        console.log("No files found in the vector store or an error occurred.");
      }

      const { data: threadData, error: threadError } = await supabase
        .from("user_openai_thread_id")
        .select("thread_id")
        .eq("user_id", user.id)
        .single();

      if (threadError) {
        console.error("Error fetching thread ID:", threadError);
        return new Response("Error fetching thread ID", { status: 500 });
      }

      const threadId = threadData?.thread_id;

      if (threadId) {
        const updatedThread = await openai.beta.threads.update(threadId, {
          tool_resources: {
            file_search: {
              vector_store_ids: [vectorStoreId],
            },
          },
        });

        console.log("Vector store associated with thread:", updatedThread);
      } else {
        console.log("No thread ID found for user");
      }
    }
  } catch (err) {
    console.error("Error processing request:", err);
    return new Response("Internal server error", { status: 500 });
  }

  return new Response("File processed successfully", { status: 200 });
}
