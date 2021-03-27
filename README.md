# deno-oak-sample
This project demonstrates Deno and Oak (plus some related libraries) by displaying HTTP request information.

Run with:
```bash
deno run --allow-net --allow-read mod.ts
```
(sample URL: localhost:3000/user/123/order/456?foo=bar&this=that)

Run tests with:
```bash
deno test --allow-net --allow-read mod.ts
```

Oak Middleware adds these things from the HTTP request to the context state:
- context parameters
- cookies
- HTTP headers
- HTTP parameters

Then an ejs view engine formats them into HTML

Other libraries used:
- bootstrap to make the page look nice
- snelm used for security
- oak-logger to log the requests
- super-oak for integration tests
