import redis from "@/utils/Redis/index";

export async function POST(req: Request) {
  
  const formData = await req.formData();
  const userId = formData.get('userId') as string;
  try {
    await redis.set(`chat:${userId}`,JSON.stringify("[]"));
  } catch (err) {
    console.log("error: ", err);
  }
  return new Response();
}