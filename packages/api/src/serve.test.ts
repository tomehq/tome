import { describe, it, expect, vi } from "vitest";
import { isApiHost, resolveHostname, serveFromR2 } from "./serve.js";

// ── isApiHost ──────────────────────────────────────────────

describe("isApiHost", () => {
  it("matches *.workers.dev", () => {
    expect(isApiHost("tome-api.myname.workers.dev")).toBe(true);
  });

  it("matches localhost", () => {
    expect(isApiHost("localhost")).toBe(true);
    expect(isApiHost("localhost:8787")).toBe(true);
  });

  it("matches 127.0.0.1", () => {
    expect(isApiHost("127.0.0.1:8787")).toBe(true);
  });

  it("matches api.tome.dev", () => {
    expect(isApiHost("api.tome.dev")).toBe(true);
  });

  it("matches api.tome.center", () => {
    expect(isApiHost("api.tome.center")).toBe(true);
  });

  it("rejects site subdomains", () => {
    expect(isApiHost("my-docs.tome.dev")).toBe(false);
  });

  it("rejects custom domains", () => {
    expect(isApiHost("docs.acme.io")).toBe(false);
  });
});

// ── resolveHostname ────────────────────────────────────────

function mockDb(row: { slug: string } | null = null) {
  return {
    prepare: vi.fn().mockReturnValue({
      bind: vi.fn().mockReturnValue({
        first: vi.fn().mockResolvedValue(row),
      }),
    }),
  } as unknown as D1Database;
}

describe("resolveHostname", () => {
  it("extracts slug from *.tome.dev subdomain", async () => {
    const db = mockDb();
    expect(await resolveHostname("my-docs.tome.dev", db)).toBe("my-docs");
  });

  it("extracts slug from *.tome.center subdomain", async () => {
    const db = mockDb();
    expect(await resolveHostname("my-docs.tome.center", db)).toBe("my-docs");
  });

  it("strips port before extracting", async () => {
    const db = mockDb();
    expect(await resolveHostname("my-docs.tome.dev:443", db)).toBe("my-docs");
  });

  it("rejects bare tome.dev (no subdomain)", async () => {
    const db = mockDb();
    expect(await resolveHostname("tome.dev", db)).toBeNull();
  });

  it("rejects bare tome.center", async () => {
    const db = mockDb();
    expect(await resolveHostname("tome.center", db)).toBeNull();
  });

  it("rejects multi-level subdomains", async () => {
    const db = mockDb();
    expect(await resolveHostname("a.b.tome.dev", db)).toBeNull();
  });

  it("resolves custom domain via D1 lookup", async () => {
    const db = mockDb({ slug: "acme-docs" });
    expect(await resolveHostname("docs.acme.io", db)).toBe("acme-docs");
  });

  it("returns null for unverified custom domain", async () => {
    const db = mockDb(null);
    expect(await resolveHostname("docs.acme.io", db)).toBeNull();
  });
});

// ── serveFromR2 ────────────────────────────────────────────

function mockBucket(files: Record<string, { body: string; contentType?: string }>) {
  return {
    get: vi.fn(async (key: string) => {
      const file = files[key];
      if (!file) return null;
      return {
        body: file.body,
        httpMetadata: file.contentType ? { contentType: file.contentType } : undefined,
        etag: `"etag-${key}"`,
      };
    }),
  } as unknown as R2Bucket;
}

describe("serveFromR2", () => {
  it("serves exact file match", async () => {
    const bucket = mockBucket({
      "sites/my-docs/style.css": { body: "body{}", contentType: "text/css" },
    });
    const res = await serveFromR2("my-docs", "/style.css", bucket);
    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toBe("text/css");
    expect(await res.text()).toBe("body{}");
  });

  it("serves directory index fallback", async () => {
    const bucket = mockBucket({
      "sites/my-docs/getting-started/index.html": {
        body: "<h1>Hi</h1>",
        contentType: "text/html",
      },
    });
    const res = await serveFromR2("my-docs", "/getting-started", bucket);
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("<h1>Hi</h1>");
  });

  it("serves root index.html for unknown paths (SPA fallback)", async () => {
    const bucket = mockBucket({
      "sites/my-docs/index.html": { body: "<html>root</html>" },
    });
    const res = await serveFromR2("my-docs", "/unknown/path", bucket);
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("<html>root</html>");
  });

  it("serves root index.html for empty path", async () => {
    const bucket = mockBucket({
      "sites/my-docs/index.html": { body: "<html>home</html>" },
    });
    const res = await serveFromR2("my-docs", "/", bucket);
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("<html>home</html>");
  });

  it("serves custom 404.html with 404 status", async () => {
    const bucket = mockBucket({
      "sites/my-docs/404.html": { body: "<h1>Custom 404</h1>" },
    });
    const res = await serveFromR2("my-docs", "/nope.css", bucket);
    expect(res.status).toBe(404);
    expect(await res.text()).toBe("<h1>Custom 404</h1>");
  });

  it("returns plain text 404 when no files exist", async () => {
    const bucket = mockBucket({});
    const res = await serveFromR2("my-docs", "/missing.js", bucket);
    expect(res.status).toBe(404);
    expect(await res.text()).toBe("Not found");
  });

  it("rejects path traversal with 400", async () => {
    const bucket = mockBucket({});
    const res = await serveFromR2("my-docs", "/../etc/passwd", bucket);
    expect(res.status).toBe(400);
  });

  it("sets Cache-Control and ETag headers", async () => {
    const bucket = mockBucket({
      "sites/my-docs/app.js": { body: "console.log(1)" },
    });
    const res = await serveFromR2("my-docs", "/app.js", bucket);
    expect(res.headers.get("Cache-Control")).toBe(
      "public, max-age=60, s-maxage=600",
    );
    expect(res.headers.get("ETag")).toBe('"etag-sites/my-docs/app.js"');
  });

  it("guesses content type from extension when R2 metadata missing", async () => {
    const bucket = mockBucket({
      "sites/my-docs/app.js": { body: "console.log(1)" },
    });
    const res = await serveFromR2("my-docs", "/app.js", bucket);
    expect(res.headers.get("Content-Type")).toBe(
      "application/javascript; charset=utf-8",
    );
  });

  it("defaults to application/octet-stream for unknown extensions", async () => {
    const bucket = mockBucket({
      "sites/my-docs/file.xyz": { body: "data" },
    });
    const res = await serveFromR2("my-docs", "/file.xyz", bucket);
    expect(res.headers.get("Content-Type")).toBe("application/octet-stream");
  });
});
