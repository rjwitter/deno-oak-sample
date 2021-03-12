// deno run --allow-net --allow-read .deno/oak-app/mod.ts

import {
  Application,
  Context,
  Router,
} from 'https://deno.land/x/oak@v6.2.0/mod.ts';
import logger from 'https://deno.land/x/oak_logger/mod.ts';

import { contextParamsFn } from './middleware/context_params.ts';
import { cookieFn } from './middleware/cookie.ts';
import { errorHandler } from './middleware/error_handler.ts';
import { headersFn } from './middleware/headers.ts';
import { noopFn } from './middleware/noop.ts';
import { paramsFn } from './middleware/params.ts';
import { renderFn } from './middleware/render.ts';
import { snelmFn } from './middleware/snelm.ts';
import { viewEngineFn } from './middleware/view_engine.ts';

const app = new Application();
const router = new Router();

router.get('/hello', (ctx: Context, next: () => Promise<void>) => {
  ctx.response.body = 'Hello World!';
});

router.get(
  '/user/:userId/order/:orderId',
  paramsFn,
  contextParamsFn,
  headersFn,
  cookieFn,
  renderFn,
);

const loggerMiddleware = import.meta.main ? logger.logger : noopFn;
app.use(errorHandler);
app.use(snelmFn);
app.use(viewEngineFn);
app.use(loggerMiddleware);
app.use(logger.responseTime);
app.use(router.routes());
app.use(router.allowedMethods());

if (import.meta.main) {
  app.addEventListener('listen', ({ hostname, port, secure }) => {
    console.log(
      `Listening on: ${secure ? 'https://' : 'http://'}${hostname ??
        'localhost'}:${port}`,
    );
  });

  app.listen({ port: 3000 });
}

export { app };
