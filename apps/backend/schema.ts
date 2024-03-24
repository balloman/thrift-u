import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  appleId: text("apple_id").unique().notNull(),
  profilePictureUrl: text("profile_picture_url"),
});

export type User = typeof users.$inferSelect;
