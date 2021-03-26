import { Context } from "../deps.ts";

const manualOutput = (ctx: Context, next: () => Promise<void>) => {
  // use rendering engine, much nicer
  let body =
    `<html><head><title>Oak Test</title></head><body><h4>Request Headers:</h4><ul>`;
  body += ctx.state.headers.map((h: string) => `<li>${h}</li>`).join("");
  body += `</ul><h4>Request Params</h4><ul>`;
  body += ctx.state.params.map((p: string) => `<li>${p}</li>`).join("");
  body += `</ul><h4>Context Params</h4><ul>`;
  body += ctx.state.contextParams.map((p: string) => `<li>${p}</li>`).join(
    "",
  );
  body += `</ul><h4>Cookies</h4><ul>`;
  body += ctx.state.cookies.map((p: string) => `<li>${p}</li>`).join(
    "",
  );
  body += `</ul></body></html>`;
  ctx.response.body = body;
};
