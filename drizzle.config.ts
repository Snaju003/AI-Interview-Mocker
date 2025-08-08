import * as dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

dotenv.config(); // This is fine here since Drizzle Kit runs in Node.js

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DATABASE_URL!
  },
});