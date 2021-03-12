import { Context } from 'https://deno.land/x/oak@v6.2.0/mod.ts';
import { Snelm } from 'https://deno.land/x/snelm/mod.ts';

const snelm = new Snelm('oak');
export const snelmFn = (ctx: Context, next: () => Promise<void>) => {
  ctx.response = snelm.snelm(ctx.request, ctx.response);
  next();
};
