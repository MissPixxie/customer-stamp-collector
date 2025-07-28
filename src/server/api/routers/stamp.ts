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
        stampSize: z.string().optional(),
        stampPrice: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const stampCard = await ctx.db.stampCard.findFirst({
        where: { id: input.stampCardId },
      });
      if (!stampCard) {
        throw new Error(`Customer with ID ${input.stampCardId} not found`);
      }

      await ctx.db.stamp.create({
        data: {
          brand: input.stampBrand,
          size: input.stampSize,
          price: input.stampPrice,
          stampCard: {
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
          stampCardid: input.stampCardId,
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
