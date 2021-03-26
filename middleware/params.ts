import { Context } from "../deps.ts";

export const paramsFn = async (ctx: Context, next: () => Promise<void>) => {
  ctx.state.params = [];
  for (const [key, value] of ctx.request.url.searchParams) {
    ctx.state.params.push(`${key}: ${value}`);
  }
  await next();
  delete ctx.state.params;
};
