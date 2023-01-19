import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const mailerRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        activate: z.boolean(),
        smtpHost: z.string(),
        smtpUser: z.string(),
        smtpPass: z.string(),
        smtpName: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const data = {
        ...input,
        userId,
        apiKey: "",
        connected: false,
      };
      const mailer = await ctx.prisma.mailer.create({ data });
      return mailer;
    }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const mailers = await ctx.prisma.mailer.findMany({ where: { userId } });
    return mailers;
  }),
  getMailer: protectedProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ ctx, input }) => {
      const name = input.name;
      const userId = ctx.session.user.id;
      const mailer = await ctx.prisma.mailer.findFirst({
        where: { userId, name },
      });
      return mailer;
    }),
  updateMailer: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        activate: z.boolean(),
        smtpHost: z.string(),
        smtpUser: z.string(),
        smtpPass: z.string(),
        smtpName: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const name = input.name;
      const userId = ctx.session.user.id;
      const mailer = await ctx.prisma.mailer.findFirst({
        where: { userId, name },
      });
      return mailer;
    }),
});
