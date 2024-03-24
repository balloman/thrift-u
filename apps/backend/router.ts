import { TRPCError } from "@trpc/server";
import { z } from "zod";
import * as auth from "./authentication";
import * as listing from "./listing";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  userList: publicProcedure.input(z.string()).query(async ({ input }) => {
    console.log(`Fetching user list for ${input}`);
    return [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ];
  }),
  signIn: publicProcedure
    .input(z.object({ appleToken: z.string().min(1) }))
    .mutation(async ({ input }) => {
      const { appleToken } = input;
      let claims: Awaited<ReturnType<typeof auth.deserializeToken>>;
      try {
        claims = await auth.deserializeToken(appleToken);
      } catch (error) {
        console.error("Error deserializing token", error);
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Error deserializing token",
        });
      }
      console.log(`User ${claims.payload.sub} signed in`);
      const uid = claims.payload.sub;
      if (!uid) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "No user ID" });
      }
      let user = await auth.getUserByAppleId(uid);
      if (!user) {
        user = await auth.createUser({ name: "", appleId: uid });
        return { user, newUser: true };
      }
      if (user.name === "") {
        return { user, newUser: true };
      }
      return { user, newUser: false };
    }),
  getUser: publicProcedure.input(z.string()).query(async ({ input }) => {
    const user = await auth.getUserById(input);
    return user;
  }),
  updateProfile: publicProcedure
    .input(
      z.object({
        name: z.string(),
        profilePictureUrl: z.string(),
        uid: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const user = await auth.updateProfile({
        id: input.uid,
        name: input.name,
        profilePictureUrl: input.profilePictureUrl,
      });
      return user;
    }),
  postListing: publicProcedure
    .input(
      z.object({
        title: z.string(),
        price: z.number(),
        image: z.string(),
        size: z.string(),
        category: z.string(),
        description: z.string(),
        year: z.number(),
        uid: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const newListing = await listing.postListing({
        title: input.title,
        price: input.price.toString(),
        image: input.image,
        size: input.size,
        category: input.category,
        description: input.description,
        year: input.year,
        postedBy: input.uid,
      });
      return newListing;
    }),
  getAllListings: publicProcedure.query(async () => {
    const listings = await listing.getAllListings();
    return listings;
  }),
  getListing: publicProcedure.input(z.string()).query(async ({ input }) => {
    const individual = await listing.getListingById(input);
    return individual;
  }),
  getListingForUser: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      const listings = await listing.getListingsForUser(input);
      return listings;
    }),
});

export type AppRouter = typeof appRouter;
