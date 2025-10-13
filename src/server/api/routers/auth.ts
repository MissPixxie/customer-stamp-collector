// import { z } from "zod";
// import {
//   createTRPCRouter,
//   publicProcedure,
// } from "stampCollector/server/api/trpc";

// export const authRouter = createTRPCRouter({
//   getUser: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
//     if (!input) return null;

//     const user = await ctx.db.user.findUnique({
//       where: {
//         username: input,
//       },
//     });

//     return user;
//   }),
// });
