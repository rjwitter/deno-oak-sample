import { Context } from "../deps.ts";

export const cookieFn = async (ctx: Context, next: () => Promise<void>) => {
  ctx.state.cookies = [];
  for (const [key, value] of ctx.cookies) {
    ctx.state.cookies.push(`${key}: ${value}`);
  }
  let cookieCount = ctx.cookies.get("cookieCounter");
  await next();

  if (!cookieCount) {
    cookieCount = "0";
  }
  ctx.cookies.set("cookieCounter", (1 + Number(cookieCount)).toString());
  ctx.cookies.set("last-ran-at", new Date().toISOString());
  delete ctx.state.cookies;
};
