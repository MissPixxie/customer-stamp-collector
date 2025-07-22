import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "stampCollector/server/api/trpc";
import { Prisma } from "@prisma/client";

export type StampCardWithStamps = Prisma.StampCardGetPayload<{
  include: { stamps: true };
}>;

export const stampCardRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ membersNr: z.number().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const customer = await ctx.db.member.findUnique({
        where: { id: input.membersNr },
      });

      if (!customer) {
        throw new Error(`Customer with ID ${input.membersNr} not found`);
      }

      return await ctx.db.stampCard.create({
        data: {
          stamps: {
            create: Array.from({ length: 7 }, () => ({
              name: "Default Name",
              price: "0",
            })),
          },
          member: {
            connect: { id: input.membersNr },
          },
        },
      });
    }),

  getStampCard: publicProcedure
    .input(z.object({ membersNr: z.number().min(1) }))
    .query(async ({ ctx, input }): Promise<StampCardWithStamps[]> => {
      const stampCards = await ctx.db.stampCard.findMany({
        where: {
          membersNr: input.membersNr,
        },
        include: {
          stamps: true,
        },
      });
      console.log("stampCards from db:", JSON.stringify(stampCards, null, 2));
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
