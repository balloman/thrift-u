import { createHTTPServer } from "@trpc/server/adapters/standalone";
import cors from "cors";
import { appRouter } from "./router";

createHTTPServer({
  router: appRouter,
  middleware: cors(),
  createContext: () => ({}),
}).listen(process.env.PORT || 3000);
