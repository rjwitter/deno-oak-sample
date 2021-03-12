import { Context } from 'https://deno.land/x/oak@v6.2.0/mod.ts';

export const noopFn = async (ctx: Context, next: () => Promise<void>) => {
  await next();
};  
