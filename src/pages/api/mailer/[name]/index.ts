import NextCors from "nextjs-cors";
import type { NextApiHandler } from "next";
import { createTransport } from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import { verify } from "jsonwebtoken";
import type { VerifyCallback, JwtPayload } from "jsonwebtoken";
import { env } from "../../../../env/server.mjs";
import { PrismaClient } from "@prisma/client";

type TDataMail = {
  from: string; // Fred Foo 👻" <foo@example.com>', // sender address
  to: string; // "bar@example.com, baz@example.com", // list of receivers
  subject: string; // "Hello ✔", // Subject line
  text: string; // "Hello world?", // plain text body
  html: string; // "<b>Hello world?</b>", // html body
  token?: string;
};

type TDataToken = {
  userId: string;
  mailerId: string;
  now: number;
};

export const verifyToken = (token: string): Promise<null | TDataToken> => {
  return new Promise((res, rej) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    verify(token, env.MAILER_JWT_SECRET, ((error, result) => {
      if (error) {
        console.error(error);
        return rej(null);
      }
      return res(result as TDataToken);
    }) as VerifyCallback<string | JwtPayload> | undefined);
  });
};

const handler: NextApiHandler = async (req, res) => {
  const authorizationHeader = (req.headers.Authorization ||
    req.headers.authorization) as string;
  let token = (req.body as TDataMail).token;

  console.log("1", req.headers, authorizationHeader, token);

  if (!authorizationHeader && !token) {
    return res.send({
      error: "You must add Authorization Bearer Token",
    });
  }

  console.log("2");

  token = token || (authorizationHeader.split("Bearer ")[1] as string);

  if (!token) {
    return res.send({
      error: "You Authorization Bearer Header is malformed",
    });
  }
  console.log("3");

  const dataToken = await verifyToken(token);

  if (!dataToken) {
    return res.send({
      error: "You Authorization Bearer Token is malformed",
    });
  }
  console.log("4");

  const { userId, mailerId } = dataToken;

  const name = req.query.name as string;

  const prisma = new PrismaClient();
  await prisma.$connect();
  console.log("5");

  const mailer = await prisma?.mailer.findFirst({
    where: {
      userId,
      name,
    },
    include: {
      originsMailer: true,
    },
  });
  console.log("6");

  if (!mailer || mailerId !== mailer.id) {
    return res.send({
      error: "No existe un mailer con ese nombre asignado a dicho usuario.",
    });
  }
  console.log("7");

  const whitelist = mailer.originsMailer
    .map(({ origin }) => origin)
    .map((o) => o.trim());

  console.log("8");

  try {
    await NextCors(req, res, {
      methods: ["POST", "OPTIONS"],
      origin: (
        origin: string,
        callback: (error: null | Error, result?: boolean) => void
      ) => {
        const result = whitelist.indexOf(origin);
        const allowAll = whitelist.indexOf("*");
        console.log(result, allowAll);
        if (result !== -1 || allowAll !== -1) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      optionsSuccessStatus: 200,
    });
  } catch (error) {
    console.log("9");

    return res
      .status(403)
      .json(typeof error === "string" ? JSON.parse(error) : error);
  }
  console.log("10");

  const transport: SMTPTransport.Options = {
    host: mailer.smtpHost,
    port: mailer.smtpPort,
    secure: false,
    auth: {
      user: mailer.smtpUser,
      pass: mailer.smtpPass,
    },
  };
  const transporter = createTransport(transport);

  const body = req.body as TDataMail;
  body.from = body.from || mailer.smtpName;

  const result = await transporter.sendMail(body);

  await prisma.$disconnect();

  return res.json(result);
};

export default handler;
