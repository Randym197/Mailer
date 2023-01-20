import { sign, verify } from "jsonwebtoken";
import { env } from "../env/server.mjs";
import type { JwtPayload, VerifyCallback } from "jsonwebtoken";

export type TDataToken = {
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

export const signData = (data: TDataToken) => {
  return sign(data, env.MAILER_JWT_SECRET);
};
