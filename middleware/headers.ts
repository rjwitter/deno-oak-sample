import { Context } from '../deps.ts';

export const headersFn = async (ctx: Context, next: () => Promise<void>) => {
  ctx.state.headers = [];
  for (const [key, value] of ctx.request.headers) {
    ctx.state.headers.push(`${key}: ${value}`);
  }
  await next();
  delete ctx.state.headers;
};  
