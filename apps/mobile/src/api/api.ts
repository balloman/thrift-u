import { PRIVATE_KEY } from "@/private-key";
import { createClient } from "@supabase/supabase-js";
import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "backend/router";

export const trpc = createTRPCReact<AppRouter>();
export const supabase = createClient(
  "https://npjryurjfclrplkzwnsm.supabase.co",
  PRIVATE_KEY,
);
