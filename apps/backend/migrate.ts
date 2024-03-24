import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db, dbClient } from "./db";

await migrate(db, { migrationsFolder: "./drizzle" });
await dbClient.end({ timeout: 5 });
