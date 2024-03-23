import { z } from "zod";
import { publicProcedure, router } from "./trpc";

const appRouter = router({
  userList: publicProcedure.input(z.string()).query(async ({ input }) => {
    console.log(`Fetching user list for ${input}`);
    return [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ];
  }),
});

export type AppRouter = typeof appRouter;
