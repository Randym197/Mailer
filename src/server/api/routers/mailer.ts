import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const mailerRouter = createTRPCRouter({
  create: protectedProcedure
  .input(z.object({
    name: z.string(),
    activate: z.boolean(),
    smtpHost: z.string(),
    smtpUser: z.string(),
    smtpPass: z.string(),
    smtpName: z.string(),
  }))
  .query(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    const data = {
      ...input,
      userId,
      apiKey: "",
      connected: false,
    }
    console.log(data)
    const mailer = await ctx.prisma.mailer.create({ data });
    console.log(mailer)
    return mailer
  }),
});
