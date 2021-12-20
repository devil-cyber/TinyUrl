require("dotenv").config();
const Redis = require("ioredis");

const client = new Redis(process.env.REDIS_URL, {
  tls: {
    rejectUnauthorized: false,
  },
});

// const client = Redis.createClient({
//   url: process.env.URL,
//   socket: {
//     tls: true,
//     rejectUnauthorized: false,
//   },
// });

// (async () => {
//   await client.connect();
// })();

client.on("connect", () =>
  console.log("Successfully connected to database Redis")
);
client.on("error", (err) => console.log("Redis Client Error", err));

module.exports = client;
