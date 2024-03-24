import { eq } from "drizzle-orm";
import { db } from "./db";
import { listings, type NewListing } from "./schema";

export async function postListing(params: NewListing) {
  const listing = await db.insert(listings).values(params).returning();
  return listing[0];
}

export async function getAllListings() {
  const listings = await db.query.listings.findMany();
  return listings;
}

export async function getListingById(id: string) {
  const listing = await db.query.listings.findFirst({
    where: eq(listings.id, id),
  });
  return listing;
}

export async function getListingsForUser(userId: string) {
  const userListings = await db.query.listings.findMany({
    where: eq(listings.postedBy, userId),
  });
  return userListings;
}
