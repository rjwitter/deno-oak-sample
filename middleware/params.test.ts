import { assertEquals } from 'https://deno.land/std@0.89.0/testing/asserts.ts';
import { RouterContext } from 'https://deno.land/x/oak@v6.2.0/mod.ts';

import { paramsFn } from './params.ts';

class TestIterableIterator implements IterableIterator<string[]> {
  values: string[][] = [];
  index = 0;
  public cookies = {};

  constructor(values: string[][]) {
    this.values = values;
  }

  public next(): IteratorResult<string[]> {
    if (this.index < this.values.length) {
      return { done: false, value: this.values[this.index++]};
      }
    return { done: true, value: null };
  }

  [Symbol.iterator](): IterableIterator<string[]> {
    return this;
  }
}

Deno.test('add params to context state', async () => {
  const paramsIterableIterator = new TestIterableIterator([[ 'key1', 'val1' ], [ 'key2', 'val2' ]]);
  const routerContext = {
    request: {
      url: {
        searchParams: paramsIterableIterator,
      },
    },
    state: {},
  } as unknown as RouterContext;

  await paramsFn(routerContext, () => { 
    assertEquals(routerContext.state, { params: ['key1: val1', 'key2: val2']});
    return Promise.resolve();
  });
});

Deno.test('params are removed', async () => {
  const paramsIterableIterator = new TestIterableIterator([[ 'key1', 'val1' ], [ 'key2', 'val2' ]]);
  const routerContext = {
    request: {
      url: {
        searchParams: paramsIterableIterator,
      },
    },
    state: {},
  } as unknown as RouterContext;

  await paramsFn(routerContext, () => {
    return Promise.resolve();
  })
  assertEquals(routerContext.state, {});
});
