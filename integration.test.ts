import { superoak } from "./deps.ts";
import { app } from "./mod.ts";
import {
  assertEquals,
  assertMatch,
} from "https://deno.land/std@0.89.0/testing/asserts.ts";

Deno.test("/blah returns Blah", async () => {
  const request = await superoak(app);
  await request.get("/hello").expect("Hello World!");
});

Deno.test("/user/:userId/order/:orderId returns the userId and orderId", async () => {
  const superDeno = await superoak(app);
  const response = await superDeno.get("/user/34/order/45");
  assertEquals(response.status, 200);
  assertMatch(response.text, /userId: 34/);
  assertMatch(response.text, /orderId: 45/);
});

Deno.test("/user/:userId/order/:orderId returns the query parameters", async () => {
  const superDeno = await superoak(app);
  const response = await superDeno.get("/user/34/order/45?foo=bar&this=that");
  assertEquals(response.status, 200);
  assertMatch(response.text, /foo: bar/);
  assertMatch(response.text, /this: that/);
});
