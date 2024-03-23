import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { handleSwaggerGen } from "./utils";

const app = new Elysia()
  .use(swagger())
  .get("/", () => "Hello Elysia")
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

handleSwaggerGen(app);

export type OurApp = typeof app;
