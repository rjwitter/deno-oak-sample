import { Context } from 'https://deno.land/x/oak@v6.2.0/mod.ts';

export const headersFn = async (ctx: Context, next: () => Promise<void>) => {
  ctx.state.headers = [];
  for (const [key, value] of ctx.request.headers) {
    ctx.state.headers.push(`${key}: ${value}`);
  }
  await next();
  delete ctx.state.headers;
};  
