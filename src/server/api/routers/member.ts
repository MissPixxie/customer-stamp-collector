import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "stampCollector/server/api/trpc";

import type { Prisma } from "@prisma/client";
import { error } from "console";

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
      if (!input) return null;

      const member = await ctx.db.member.findUnique({
        where: {
          membersNr: input,
        },
        include: {
          stampCards: {
            include: {
              stamps: true,
              pawStamps: true,
            },
          },
        },
      });

      return member;
    }),

  listAllMembers: publicProcedure.query(async ({ ctx }) => {
    const members = await ctx.db.member.findMany({
      include: {
        stampCards: {
          include: {
            stamps: true,
            pawStamps: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    console.log(JSON.stringify(members, null, 2));
    return members;
  }),

  create: publicProcedure
    .input(
      z.object({
        membersNr: z.number().min(1),
        name: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.member.create({
        data: {
          membersNr: input.membersNr,
          name: input.name,
        },
      });
    }),

  update: publicProcedure.input(z.number()).query(async ({ ctx, input }) => {
    if (!input) return null;

    const member = await ctx.db.member.findUnique({
      where: {
        membersNr: input,
      },
    });

    return member;
  }),

  delete: publicProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
    const member = await ctx.db.member.findUnique({
      where: {
        membersNr: input,
      },
    });

    if (!member) {
      throw new Error("Could not find member");
    }

    await ctx.db.member.delete({
      where: {
        membersNr: input,
      },
    });

    return { success: true };
  }),
});
