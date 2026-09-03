const { createClient } = require("redis");

const client = createClient({
  url: process.env.REDIS_URL,
});

client.on("error", (err) => console.log("Redis Client Error", err));

async function main() {
  await client.connect();
  console.log("Connected to Redis");
  await client.set("test", "hello");
}

main();
