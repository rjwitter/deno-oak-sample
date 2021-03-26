import {
  assertEquals,
  RouterContext,
} from '../deps.ts';
import { headersFn } from './headers.ts';

class TestIterableIterator implements IterableIterator<string[]> {
  values: string[][] = [];
  index = 0;

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

Deno.test('add headers to context state', async () => {
  const headerIterableIterator = new TestIterableIterator([[ 'key1', 'val1' ], [ 'key2', 'val2' ]]);

  const routerContext = {
    request: {
      headers: headerIterableIterator,
    },
    state: {},
  } as unknown as RouterContext;
  await headersFn(routerContext, () => {
    assertEquals(routerContext.state, { headers: ['key1: val1', 'key2: val2']});
    return Promise.resolve();
  });
});

Deno.test('remove headers from context state after next()', async () => {
  const headerIterableIterator = new TestIterableIterator([[ 'key1', 'val1' ], [ 'key2', 'val2' ]]);

  const routerContext = {
    request: {
      headers: headerIterableIterator,
    },
    state: {},
  } as unknown as RouterContext;
  await headersFn(routerContext, () => {
    return Promise.resolve();
  });
  assertEquals(routerContext.state, {});
});
