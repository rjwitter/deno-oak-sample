import { Context } from 'https://deno.land/x/oak@v6.2.0/mod.ts';

export const paramsFn = async (ctx: Context, next: () => Promise<void>) => {
  ctx.state.params = [];
  for (const [key, value] of ctx.request.url.searchParams) {
    ctx.state.params.push(`${key}: ${value}`);
  }
  await next();
  delete ctx.state.params;
};
