import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "stampCollector/server/api/trpc";

export const pawStampRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        stampCardId: z.number().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const stampCard = await ctx.db.stampCard.findFirst({
        where: { id: input.stampCardId },
      });
      if (!stampCard) {
        throw new Error(`Customer with ID ${input.stampCardId} not found`);
      }

      const createdPawStamp = await ctx.db.pawStamp.create({
        data: {
          stampCard: {
            connect: { id: input.stampCardId },
          },
        },
      });
      return createdPawStamp;
    }),

  getPawStamps: publicProcedure
    .input(z.object({ stampCardId: z.number().min(1) })) // Gör customerId till ett obligatoriskt nummer
    .query(async ({ ctx, input }) => {
      const pawStamps = await ctx.db.pawStamp.findMany({
        where: {
          stampCardid: input.stampCardId,
        },
      });
      return pawStamps;
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
