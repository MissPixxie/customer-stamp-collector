import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "stampCollector/server/api/trpc";

export const stampCardRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ customerId: z.number().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.stampCard.create({
        data: {
          customer: {
            connect: { id: input.customerId }, // Kopplar stämpelkortet till kunden med det givna id:t
          },
        },
      });
    }),

  getStampCard: publicProcedure
    .input(z.object({ customerId: z.number().min(1) })) // Gör customerId till ett obligatoriskt nummer
    .query(async ({ ctx, input }) => {
      const stampCards = await ctx.db.stampCard.findMany({
        where: {
          customerid: input.customerId,
        },
        include: {
          stamps: true,
        },
      });
      console.log("stampCards from db:", stampCards);
      return stampCards;
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
