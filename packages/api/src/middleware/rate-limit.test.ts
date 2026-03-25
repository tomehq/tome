import { describe, it, expect } from "vitest";
import { Hono } from "hono";
import { rateLimit } from "./rate-limit.js";
import type { Env } from "../types.js";

function makeApp(maxRequests: number, windowMs: number) {
  const app = new Hono<{ Bindings: Env }>();
  app.use("*", rateLimit({ maxRequests, windowMs }));
  app.get("/test", (c) => c.json({ ok: true }));
  return app;
}

describe("rateLimit middleware", () => {
  // Each test creates its own app so the buckets are fresh via module isolation
  // The module-level Map persists between tests, so we use unique paths.
  let counter = 0;

  it("allows requests under the limit", async () => {
    const app = makeApp(5, 60_000);
    const ip = `10.0.1.${++counter}`;
    for (let i = 0; i < 5; i++) {
      const res = await app.request("/test", {
        headers: { "cf-connecting-ip": ip },
      });
      expect(res.status).toBe(200);
    }
  });

  it("blocks requests over the limit with 429", async () => {
    const app = makeApp(2, 60_000);
    const ip = `10.0.2.${++counter}`;

    // Two requests succeed
    await app.request("/test", { headers: { "cf-connecting-ip": ip } });
    await app.request("/test", { headers: { "cf-connecting-ip": ip } });

    // Third is blocked
    const res = await app.request("/test", {
      headers: { "cf-connecting-ip": ip },
    });
    expect(res.status).toBe(429);
    const body = await res.json();
    expect(body.error).toContain("Too many requests");
  });

  it("returns Retry-After header on 429", async () => {
    const app = makeApp(1, 60_000);
    const ip = `10.0.3.${++counter}`;

    await app.request("/test", { headers: { "cf-connecting-ip": ip } });
    const res = await app.request("/test", {
      headers: { "cf-connecting-ip": ip },
    });

    expect(res.status).toBe(429);
    expect(res.headers.get("Retry-After")).toBeTruthy();
    expect(res.headers.get("X-RateLimit-Limit")).toBe("1");
    expect(res.headers.get("X-RateLimit-Remaining")).toBe("0");
  });

  it("sets rate limit headers on success responses", async () => {
    const app = makeApp(10, 60_000);
    const ip = `10.0.4.${++counter}`;

    const res = await app.request("/test", {
      headers: { "cf-connecting-ip": ip },
    });

    expect(res.status).toBe(200);
    expect(res.headers.get("X-RateLimit-Limit")).toBe("10");
    expect(res.headers.get("X-RateLimit-Remaining")).toBe("9");
    expect(res.headers.get("X-RateLimit-Reset")).toBeTruthy();
  });

  it("falls back to x-forwarded-for when cf-connecting-ip is missing", async () => {
    const app = makeApp(1, 60_000);
    const ip = `10.0.5.${++counter}`;

    await app.request("/test", {
      headers: { "x-forwarded-for": `${ip}, 10.0.0.1` },
    });
    const res = await app.request("/test", {
      headers: { "x-forwarded-for": `${ip}, 10.0.0.1` },
    });

    expect(res.status).toBe(429);
  });

  it("tracks different IPs independently", async () => {
    const app = makeApp(1, 60_000);
    const ip1 = `10.0.6.${++counter}`;
    const ip2 = `10.0.7.${++counter}`;

    await app.request("/test", { headers: { "cf-connecting-ip": ip1 } });
    // ip1 is now at limit

    const res = await app.request("/test", {
      headers: { "cf-connecting-ip": ip2 },
    });
    // ip2 should still be allowed
    expect(res.status).toBe(200);
  });
});
