import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "stampCollector/server/api/trpc";

export const stampRouter = createTRPCRouter({
  getLatest: publicProcedure.query(async ({ ctx }) => {
    const stamp = await ctx.db.stamp.findFirst({
      orderBy: { createdAt: "desc" },
    });

    return stamp ?? null;
  }),

  create: publicProcedure
    .input(
      z.object({
        stampCardId: z.number().min(1),
        stampBrand: z.string().min(1),
        stampPrice: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.stamp.create({
        data: {
          name: input.stampBrand,
          price: input.stampPrice,
          StampCard: {
            connect: { id: input.stampCardId },
          },
        },
      });
    }),

  //   delete: publicProcedure
  //     .input(z.object({ email: z.string().min(1) }))
  //     .mutation(async ({ ctx, input }) => {
  //       return ctx.db.customer.delete({
  //         data: {
  //           email: input.email,
  //         },
  //       });
  //     }),
});
