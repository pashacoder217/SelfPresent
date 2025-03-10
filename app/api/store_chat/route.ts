import redis from "@/utils/Redis/index";

export async function POST(req: Request) {
  
  const formData = await req.formData();
  const userId = formData.get('userId') as string;
  const chatHistory = formData.get('chatHistory');
  try {
    await redis.set(`chat:${userId}`,JSON.stringify(chatHistory));
  } catch (err) {
    console.log("error: ", err);
  }
  return new Response();
}