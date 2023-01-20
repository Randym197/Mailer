import { z } from "zod";
import { signData } from "../../../utils/tokenMailer";
import type { TDataToken } from "../../../utils/tokenMailer";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const mailerRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        smtpHost: z.string(),
        smtpPort: z.number(),
        smtpUser: z.string(),
        smtpPass: z.string(),
        smtpName: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId: string = ctx.session.user.id;
      const data = {
        ...input,
        userId,
        activate: true,
        apiKey: "",
        connected: false,
      };
      const mailer = await ctx.prisma.mailer.create({ data });
      const mailerId = mailer.id;
      const dataToken: TDataToken = {
        userId,
        mailerId,
        now: Date.now(),
      };
      const apiKey = signData(dataToken);
      
      await ctx.prisma.mailer.update({
        where: {
          id: mailerId,
        },
        data: {
          apiKey,
        },
      });

      await ctx.prisma.originMailer.create({
        data: {
          mailerId,
          origin: "*",
        },
      });

      const mailerResult = await ctx.prisma.mailer.findFirst({
        where: {
          id: mailerId,
        },
        include: {
          originsMailer: true,
        },
      });

      return mailerResult;
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
        include: {
          originsMailer: true,
        },
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
