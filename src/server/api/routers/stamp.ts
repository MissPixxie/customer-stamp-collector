import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "stampCollector/server/api/trpc";

export const stampRouter = createTRPCRouter({
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

  getStamps: publicProcedure
    .input(z.object({ stampCardId: z.number().min(1) })) // Gör customerId till ett obligatoriskt nummer
    .query(async ({ ctx, input }) => {
      const stamps = await ctx.db.stamp.findMany({
        where: {
          StampCardid: input.stampCardId,
        },
      });
      return stamps;
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
