import { z } from "zod";
import * as auth from "./authentication";
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
      try {
        const claims = await auth.deserializeToken(appleToken);
        console.log(`User ${claims.payload.sub} signed in`);
        const uid = claims.payload.sub;
        if (!uid) {
          return { success: false, error: "Invalid Token" } as const;
        }
        let user = await auth.getUserByAppleId(uid);
        if (!user) {
          user = await auth.createUser({ name: "", appleId: uid });
        }
        return { success: true, user } as const;
      } catch (e) {
        console.error(e);
        return { success: false, error: "Server Error" } as const;
      }
    }),
  getUser: publicProcedure.input(z.string()).query(async ({ input }) => {
    const user = await auth.getUserById(input);
    return user;
  }),
});

export type AppRouter = typeof appRouter;
