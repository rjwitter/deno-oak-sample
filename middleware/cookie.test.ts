import { assertEquals, assertMatch, RouterContext } from "../deps.ts";
import { cookieFn } from "./cookie.ts";

class TestIterableIterator implements IterableIterator<string[]> {
  values: string[][] = [];
  index = 0;
  public cookies: { [key: string]: string } = {};

  constructor(values: string[][]) {
    this.values = values;
  }

  public next(): IteratorResult<string[]> {
    if (this.index < this.values.length) {
      return { done: false, value: this.values[this.index++] };
    }
    return { done: true, value: null };
  }

  [Symbol.iterator](): IterableIterator<string[]> {
    return this;
  }

  get(val: string): string | undefined {
    return this.cookies[val];
  }

  set(key: string, val: string): void {
    this.cookies[key] = val;
  }
}

Deno.test("add cookies to context state", async () => {
  const cookieIterableIterator = new TestIterableIterator([["key1", "val1"], [
    "key2",
    "val2",
  ]]);

  const routerContext = {
    cookies: cookieIterableIterator,
    state: { empty: true },
  } as unknown as RouterContext;
  await cookieFn(routerContext, () => {
    assertEquals(routerContext.state, {
      cookies: ["key1: val1", "key2: val2"],
      empty: true,
    });
    return Promise.resolve();
  });
});

Deno.test("remove cookies from context state after next()", async () => {
  const cookieIterableIterator = new TestIterableIterator([["key1", "val1"], [
    "key2",
    "val2",
  ]]);

  const routerContext = {
    cookies: cookieIterableIterator,
    state: { empty: true },
  } as unknown as RouterContext;
  await cookieFn(routerContext, () => {
    return Promise.resolve();
  });
  assertEquals(routerContext.state, { empty: true });
});

Deno.test("sets cookie counter after next()", async () => {
  const cookieIterableIterator = new TestIterableIterator([["key1", "val1"], [
    "key2",
    "val2",
  ]]);
  cookieIterableIterator.cookies = { cookieCounter: "24" };

  const routerContext = {
    cookies: cookieIterableIterator,
    state: { empty: true },
  } as unknown as RouterContext;
  await cookieFn(routerContext, () => {
    return Promise.resolve();
  });
  assertEquals(cookieIterableIterator.cookies.cookieCounter, "25");
});

Deno.test("sets cookie for last run date after next()", async () => {
  const cookieIterableIterator = new TestIterableIterator([["key1", "val1"], [
    "key2",
    "val2",
  ]]);

  const routerContext = {
    cookies: cookieIterableIterator,
    state: { empty: true },
  } as unknown as RouterContext;
  await cookieFn(routerContext, () => {
    return Promise.resolve();
  });
  assertMatch(
    cookieIterableIterator.cookies["last-ran-at"],
    /\d{4}-\d{2}-\d{2}/,
  );
});
