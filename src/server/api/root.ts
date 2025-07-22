import { postRouter } from "stampCollector/server/api/routers/post";
import {
  createCallerFactory,
  createTRPCRouter,
} from "stampCollector/server/api/trpc";
import { memberRouter } from "./routers/member";
import { stampCardRouter } from "./routers/stampCard";
import { stampRouter } from "./routers/stamp";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  member: memberRouter,
  stampCard: stampCardRouter,
  stamp: stampRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
