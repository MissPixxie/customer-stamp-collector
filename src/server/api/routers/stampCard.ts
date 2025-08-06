import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "stampCollector/server/api/trpc";
import { Prisma, StampCardType } from "@prisma/client";

export type StampCardWithStamps = Prisma.StampCardGetPayload<{
  include: { stamps: true };
}>;

export const stampCardRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        membersNr: z.number().min(1),
        type: z.nativeEnum(StampCardType),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const member = await ctx.db.member.findUnique({
        where: { id: input.membersNr },
      });

      if (!member) {
        throw new Error(`Customer with ID ${input.membersNr} not found`);
      }

      await ctx.db.stampCard.create({
        data: {
          membersNr: input.membersNr,
          type: input.type,
        },
      });
    }),

  getStampCard: publicProcedure
    .input(z.object({ membersNr: z.number().min(1) }))
    .query(async ({ ctx, input }) => {
      if (!input) return null;

      const stampCards = await ctx.db.stampCard.findMany({
        where: {
          membersNr: input.membersNr,
        },
        include: {
          stamps: true,
          pawStamps: true,
        },
      });

      return stampCards;
    }),

  getSpecificStampCard: publicProcedure
    .input(
      z.object({
        membersNr: z.number().min(1),
        stampCardId: z.number().min(1),
      }),
    )
    .query(async ({ ctx, input }) => {
      if (!input) return null;

      const stampCard = await ctx.db.stampCard.findFirst({
        where: {
          id: input.stampCardId,
        },
        include: {
          stamps: true,
          pawStamps: true,
        },
      });
      return stampCard;
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
