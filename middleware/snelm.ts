import { Context, Snelm } from "../deps.ts";

const snelm = new Snelm("oak");
export const snelmFn = (ctx: Context, next: () => Promise<void>) => {
  ctx.response = snelm.snelm(ctx.request, ctx.response);
  next();
};
