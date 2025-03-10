// app/api/generateChat/route.ts

export const maxDuration = 60; // 60 second function timeout

import { createClient } from "@/utils/supabase/server";
import { AssistantResponse } from "ai";
import OpenAI from "openai";
import { MessageContentPartParam } from "openai/resources/beta/threads/messages";

type UserData = {
  id: string;
  avatar_url: string | null;
  name: string | null;
  role: string | null;
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
  dangerouslyAllowBrowser: true,
});

export async function POST(req: Request) {
  console.log("Creating Supabase client");
  const supabase = createClient();

  console.log("Fetching user from Supabase");
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error("Error fetching user: ", userError);
    throw new Error("User not found");
  }

  console.log("Fetching thread ID for user:", user.id);
  const { data: threadData, error: threadError } = await supabase
    .from("user_openai_thread_id")
    .select("thread_id")
    .eq("user_id", user.id)
    .single();

  if (threadError) {
    console.error("Error fetching thread ID: ", threadError);
  }

  let threadId = threadData?.thread_id || null;

  if (!threadId) {
    console.log("No thread ID found, creating new thread");
    const newThreadId = (await openai.beta.threads.create({})).id;
    threadId = newThreadId;

    console.log("Saving new thread ID to Supabase:", newThreadId);
    const { error: saveError } = await supabase
      .from("user_openai_thread_id")
      .upsert({ user_id: user.id, thread_id: newThreadId });

    if (saveError) {
      console.error("Error saving new thread ID: ", saveError);
    }
  } else {
    console.log("Existing thread ID found:", threadId);
  }

  console.log("Fetching vector store ID for user:", user.id);
  const { data: vectorStoreData, error: vectorStoreError } = await supabase
    .from("user_openai_vector_store_id")
    .select("vector_store_id")
    .eq("user_id", user.id)
    .single();

  if (vectorStoreError) {
    console.error("Error fetching vector store ID: ", vectorStoreError);
  }

  let vectorStoreId = vectorStoreData?.vector_store_id || null;

  if (!vectorStoreId) {
    console.log("No vector store ID found, proceeding without it");
  } else {
    console.log("Existing vector store ID found:", vectorStoreId);
  }

  console.log("Parsing request body");
  const input: { message: string } = await req.json();
  console.log("Request body parsed:", input);

  console.log("Retrieving user jurisdiction");
  const { data: jurisdictionData, error: jurisdictionError } = await supabase
    .from("user_jurisdiction")
    .select("jurisdiction")
    .eq("user_id", user.id)
    .single();

  if (jurisdictionError) {
    console.error("Error fetching user jurisdiction: ", jurisdictionError);
    throw new Error("Failed to fetch jurisdiction");
  }
  console.log("User jurisdiction retrieved:", jurisdictionData?.jurisdiction);

  console.log("Fetching file URL from Supabase");
  const { data: fileData, error: fileError } = await supabase
    .from("user_uploads")
    .select("*")
    .eq("user_id", user.id);

  if (fileError) {
    console.error("Error fetching file URL: ", fileError);
    throw new Error("Failed to fetch file URL");
  }
  if (!fileData || fileData.length === 0) {
    throw new Error("No files found for user");
  }
  const fileUrl = fileData[0].file_url;
  console.log("File URL retrieved:", fileUrl);

  console.log("Saving user message to database");
  const { error: messageSaveError } = await supabase
    .from("user_messages")
    .insert({
      user_id: user.id,
      thread_id: threadId,
      user_input_messages: input.message,
      jurisdiction: jurisdictionData?.jurisdiction,
    });

  if (messageSaveError) {
    console.error("Error saving user message: ", messageSaveError);
    throw new Error("Failed to save message");
  }
  console.log("User message saved successfully");

  const { data: userData }: { data: UserData | null } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();
  const { data: userExData } = await supabase
    .from("ex_partners")
    .select("*")
    .eq("user_id", user.id)
    .single();
  const { data: childrensData } = await supabase
    .from("children")
    .select("*")
    .eq("user_id", user.id);
  const { data: eventData } = await supabase
    .from("events")
    .select("*")
    .eq("user_id", user.id);

  const userPrompt = `
    You are a helpful chatbot.
    Here is additional user's information that you are currently speaking with, to contextualize your response:
    User's name: ${userData?.name || "N/A"}
    User's role: ${userData?.role || "N/A"}
    User's ex-partner's name: ${userExData?.name || "N/A"}
    User has ${childrensData?.length || 0} children
  `;
  let childPrompt = ``;
  childrensData?.forEach((child, index) => {
    childPrompt += `
      The ${index + 1}rd child's name: ${child.full_name}
      ${index + 1}rd child's gender: ${child.gender}
      ${index + 1}rd child's birthday: ${child.birth_year}
    `;
  });

  let eventPrompt = `Latest events the user has added`;
  eventData?.forEach((event, index) => {
    eventPrompt += `
      Event ${index + 1}:
        Title: ${event?.title || "N/A"}
        Description: ${event?.description || "N/A"}
        Date: ${event?.date || "N/A"}
        Time: ${event?.time || "N/A"}
    `;
  });

  const additionalPrompt = `${userPrompt}\n${childPrompt}\n${eventPrompt}`;
  const contents = [];
  contents.push({
    type: "text",
    text: input.message
  });
  fileData.sort((a, b) => a.upload_date > b.upload_date ? 1 : a.upload_date < b.upload_date ? -1 : 0).splice(9);
  fileData.forEach((data) => {
    const tmp = {
      type: "image_url",
      image_url: {
        url: data.file_url,
        detail: "high"
      }
    };
    contents.push(tmp);
  })
  console.log("Adding message to OpenAI thread");
  const createdMessage = await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: contents as MessageContentPartParam[]
  });
  console.log("Message added to thread:", createdMessage);

  const assistant_id = jurisdictionData?.jurisdiction || "default_jurisdiction";
  console.log("assistantId: ", assistant_id)
  console.log("Preparing to forward run results from the assistant");
  return AssistantResponse(
    { threadId, messageId: createdMessage.id },
    async ({ forwardStream, sendDataMessage }) => {
      console.log("Initializing interaction with OpenAI assistant");
      const runStream = openai.beta.threads.runs.stream(threadId, {
        assistant_id: assistant_id,
        tools: [{ type: "file_search" }, { type: "code_interpreter" }],
        temperature: 0.01,
        additional_instructions: additionalPrompt,
      });

      console.log("Streaming run results");
      let runResult = await forwardStream(runStream);
      console.log("runReslut: ", runStream)
      while (
        runResult?.status === "requires_action" &&
        runResult.required_action?.type === "submit_tool_outputs"
      ) {
        console.log("Handling required actions from assistant output");
        const tool_outputs =
          runResult.required_action.submit_tool_outputs.tool_calls.map(
            (toolCall: any) => {
              console.log(`Processing tool call: ${toolCall.function.name}`);
              const parameters = JSON.parse(toolCall.function.arguments);
              switch (toolCall.function.name) {
                default:
                  console.error(
                    `Unknown tool call function: ${toolCall.function.name}`,
                  );
                  throw new Error(
                    `Unknown tool call function: ${toolCall.function.name}`,
                  );
              }
            },
          );

        console.log("Submitting tool outputs");
        runResult = await forwardStream(
          openai.beta.threads.runs.submitToolOutputsStream(
            threadId,
            runResult.id,
            { tool_outputs },
          ),
        );
      }
      console.log("Completed processing run results");
    },
  );
}
