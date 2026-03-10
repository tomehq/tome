import { createMiddleware } from "hono/factory";
import type { Env } from "../types.js";

/**
 * Simple sliding-window rate limiter keyed by client IP.
 *
 * Uses in-memory storage which is fine for Cloudflare Workers since
 * each isolate is short-lived. Under heavy traffic, the limit is
 * per-isolate (so slightly generous) but prevents obvious abuse.
 */

interface RateLimitOptions {
  /** Max requests allowed within the time window */
  maxRequests: number;
  /** Time window in milliseconds */
  windowMs: number;
}

const buckets = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(options: RateLimitOptions) {
  return createMiddleware<{ Bindings: Env }>(async (c, next) => {
    const ip = c.req.header("cf-connecting-ip")
      ?? c.req.header("x-forwarded-for")?.split(",")[0]?.trim()
      ?? "unknown";

    const now = Date.now();
    const key = `${ip}:${c.req.path}`;
    let bucket = buckets.get(key);

    // Clean up expired buckets periodically
    if (buckets.size > 10_000) {
      for (const [k, v] of buckets) {
        if (v.resetAt <= now) buckets.delete(k);
      }
    }

    if (!bucket || bucket.resetAt <= now) {
      bucket = { count: 0, resetAt: now + options.windowMs };
      buckets.set(key, bucket);
    }

    bucket.count++;

    if (bucket.count > options.maxRequests) {
      const retryAfter = Math.ceil((bucket.resetAt - now) / 1000);
      return c.json(
        { error: "Too many requests. Please try again later." },
        429,
        {
          "Retry-After": String(retryAfter),
          "X-RateLimit-Limit": String(options.maxRequests),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": String(Math.ceil(bucket.resetAt / 1000)),
        },
      );
    }

    // Set rate limit headers on successful responses
    await next();

    c.header("X-RateLimit-Limit", String(options.maxRequests));
    c.header("X-RateLimit-Remaining", String(Math.max(0, options.maxRequests - bucket.count)));
    c.header("X-RateLimit-Reset", String(Math.ceil(bucket.resetAt / 1000)));
  });
}
