import { RouterContext } from 'https://deno.land/x/oak@v6.2.0/mod.ts';

export const contextParamsFn = async (
  ctx: RouterContext,
  next: () => Promise<void>,
) => {
  ctx.state.contextParams = [];
  for (const [key, value] of Object.entries(ctx.params)) {
    ctx.state.contextParams.push(`${key}: ${value}`);
  }
  await next();
  delete ctx.state.contextParams;
};
