import redis from "@/utils/Redis/index";

export async function POST(req: Request) {
  const formData = await req.formData();
  const userId = formData.get('userId') as string;
  
  try {
    const chatHistory = await redis.get(`chat:${userId}`);
    return new Response(JSON.stringify({ chatHistory: chatHistory ? JSON.parse(chatHistory) : `[]`}));
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Error retrieving chat history' }));
  }
}