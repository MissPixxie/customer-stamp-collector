import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "stampCollector/server/api/trpc";

import type { Prisma } from "@prisma/client";

export type MemberWithCardsAndStamps = Prisma.MemberGetPayload<{
  include: {
    stampCards: {
      include: {
        stamps: true;
      };
    };
  };
}>;

export const memberRouter = createTRPCRouter({
  getMember: publicProcedure
    .input(z.number().optional())
    .query(async ({ ctx, input }) => {
      const members = await ctx.db.member.findFirst({
        where: {
          OR: [{ membersNr: input }],
        },
      });

      return members;
    }),

  listAllMembers: publicProcedure.query(async ({ ctx }) => {
    const members = await ctx.db.member.findMany({
      include: {
        stampCards: {
          include: {
            stamps: true,
          },
        },
      },
    });
    return members;
  }),

  create: publicProcedure
    .input(
      z.object({
        membersNr: z.number().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.member.create({
        data: {
          membersNr: input.membersNr,
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
