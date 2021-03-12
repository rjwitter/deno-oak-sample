import { assertEquals } from "https://deno.land/std@0.89.0/testing/asserts.ts";
import { RouterContext } from 'https://deno.land/x/oak@v6.2.0/mod.ts';

import { contextParamsFn } from './context_params.ts';

Deno.test('add context params to context state', async () => {
  const contextParams = { key1: 'val1', key2: 'val2' };
  const routerContext = { params: contextParams, state: {} } as unknown as RouterContext;
  await contextParamsFn(routerContext, () => {
    assertEquals(routerContext.state, { contextParams: ['key1: val1', 'key2: val2']});
    return Promise.resolve();
  });
});

Deno.test('context params are removed', async () => {
  const contextParams = { key1: 'val1', key2: 'val2' };
  const routerContext = { params: contextParams, state: {} } as unknown as RouterContext;
  await contextParamsFn(routerContext, () => {
    return Promise.resolve();
  })
  assertEquals(routerContext.state, {});
});
