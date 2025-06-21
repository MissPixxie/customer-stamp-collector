import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "stampCollector/server/api/trpc";

export const customerRouter = createTRPCRouter({
  getCustomer: publicProcedure
    .input(z.number().optional())
    .query(async ({ ctx, input }) => {
      const customer = await ctx.db.customer.findFirst({
        where: {
          OR: [{ medlemsNr: input }],
        },
      });

      return customer ?? null;
    }),

  listAllCustomers: publicProcedure.query(async ({ ctx }) => {
    const customers = await ctx.db.customer.findMany({
      include: {
        stampCards: true,
      },
    });

    return customers ?? null;
  }),

  create: publicProcedure
    .input(
      z.object({
        medlemsNr: z.number().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.customer.create({
        data: {
          medlemsNr: input.medlemsNr,
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
