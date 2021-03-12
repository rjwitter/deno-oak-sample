import { Context } from 'https://deno.land/x/oak@v6.2.0/mod.ts';

export const errorHandler = (ctx: Context, next: () => Promise<void>) => {
  try {
    next();
  } catch (error) {
    ctx.response.body = `Error: ${error.toString()}`;
    ctx.response.status = 500;
  }
};
