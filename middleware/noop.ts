import { Context } from "../deps.ts";

export const noopFn = async (ctx: Context, next: () => Promise<void>) => {
  await next();
};
