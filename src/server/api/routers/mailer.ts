import { z } from "zod";
import { signData } from "../../../utils/tokenMailer";
import type { TDataToken } from "../../../utils/tokenMailer";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { OriginMailer } from "@prisma/client";

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
        id: z.string(),
        name: z.string(),
        activate: z.boolean(),
        smtpHost: z.string(),
        smtpPort: z.number(),
        smtpUser: z.string(),
        smtpPass: z.string(),
        smtpName: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const id = input.id;
      const mailerUpdated = await ctx.prisma.mailer.update({
        where: { id },
        data: input,
      });
      return mailerUpdated;
    }),
  deleteMailer: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const id = input.id;
      const mailerDeleted = await ctx.prisma.mailer.delete({
        where: { id },
      });
      return mailerDeleted;
    }),
  addOrigin: protectedProcedure
    .input(
      z.object({
        mailerId: z.string(),
        origin: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const originCreated = await ctx.prisma.originMailer.create({
        data: {
          ...input,
        },
      });
      return originCreated;
    }),
  deleteOrigin: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const originCreated = await ctx.prisma.originMailer.delete({
        where: input,
      });
      return originCreated;
    }),
  editOrigin: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        origin: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const originUpdated: OriginMailer = await ctx.prisma.originMailer.update({
        where: {
          id: input.id,
        },
        data: input,
      });
      console.log(originUpdated, "originUpdated");
      return originUpdated;
    }),
});
