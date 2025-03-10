import Redis from "ioredis";

const redis = new Redis(`${process.env.UPSTASH_REDIS_URL}`, {
  password: `${process.env.UPSTASH_REDIS_TOKEN}`,
});

export default redis;