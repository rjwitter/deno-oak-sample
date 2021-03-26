import { RouterContext } from "../deps.ts";

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
