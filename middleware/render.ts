import { Context } from 'https://deno.land/x/oak@v6.2.0/mod.ts';

export const renderFn = (ctx: Context, next: () => Promise<void>) => {
  ctx.render('oak-test', {
    data: {
      headers: ctx.state.headers,
      params: ctx.state.params,
      contextParams: ctx.state.contextParams,
      cookies: ctx.state.cookies,
    }
  });
}
