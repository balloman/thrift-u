import { relations } from "drizzle-orm";
import { integer, numeric, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  appleId: text("apple_id").unique().notNull(),
  profilePictureUrl: text("profile_picture_url"),
});

export const listings = pgTable("listings", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  price: numeric("price", { precision: 6, scale: 2 }).notNull(),
  image: text("image").notNull(),
  size: text("size").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  year: integer("year").notNull(),
  isSold: text("is_sold").notNull().default("false"),
  postedBy: uuid("posted_by").references(() => users.id),
});

export const usersRelations = relations(users, ({ many }) => ({
  listings: many(listings),
}));

export const listingsRelations = relations(listings, ({ one }) => ({
  postedBy: one(users, {
    fields: [listings.postedBy],
    references: [users.id],
  }),
}));

export type User = typeof users.$inferSelect;
export type NewListing = typeof listings.$inferInsert;
export type Listing = typeof listings.$inferSelect;
