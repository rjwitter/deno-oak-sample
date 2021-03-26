import { Context } from "../deps.ts";

export const errorHandler = (ctx: Context, next: () => Promise<void>) => {
  try {
    next();
  } catch (error) {
    ctx.response.body = `Error: ${error.toString()}`;
    ctx.response.status = 500;
  }
};
