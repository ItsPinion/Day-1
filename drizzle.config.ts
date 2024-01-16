import type { Config } from "drizzle-kit";
export default {
  schema: "./db/schema/index.ts", // path to your schema file
  out: "./drizzle", // path where migrations should be stored
  driver: "turso", // specifying Turso as the driver
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  },
} satisfies Config;
