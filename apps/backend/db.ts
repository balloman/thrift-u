import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { CONNECTION_STRING } from "./constants";
import * as schema from "./schema";

if (!CONNECTION_STRING) {
  throw new Error(
    "Please define the DATABASE_URL environment variable inside .env.local",
  );
}
export const dbClient = postgres(CONNECTION_STRING, { prepare: false });
export const db = drizzle(dbClient, { schema });
