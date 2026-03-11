/**
 * Hostname-aware static site serving from R2.
 *
 * Resolves incoming Host headers to project slugs and serves
 * the corresponding files from the TOME_BUCKET R2 bucket.
 */

// ── Host classification ────────────────────────────────────

const API_PATTERNS = [
  /\.workers\.dev$/,
  /^localhost(:\d+)?$/,
  /^127\.0\.0\.1(:\d+)?$/,
  /^api\.tome\.center$/,
];

/** Returns true if the hostname belongs to the API (not a hosted site). */
export function isApiHost(hostname: string): boolean {
  const bare = hostname.replace(/:\d+$/, "");
  return API_PATTERNS.some((p) => p.test(bare));
}

// ── Hostname → slug resolution ─────────────────────────────

/**
 * Maps an incoming hostname to a project slug.
 *
 * - `{slug}.tome.center` → extract slug from subdomain (no DB hit)
 * - Custom domain       → D1 lookup (domains + projects join)
 * - Returns `null` if no match
 */
export async function resolveHostname(
  hostname: string,
  db: D1Database,
): Promise<string | null> {
  const bare = hostname.replace(/:\d+$/, "");

  // Subdomain extraction for *.tome.center
  if (bare.endsWith(".tome.center")) {
    const sub = bare.slice(0, -(".tome.center".length));
    // Reject multi-level subdomains (e.g. "a.b.tome.center")
    if (!sub || sub.includes(".")) return null;
    return sub;
  }

  // Bare platform domain — no slug
  if (bare === "tome.center") return null;

  // Custom domain — D1 lookup
  const row = await db
    .prepare(
      `SELECT p.slug FROM domains d
       JOIN projects p ON d.project_id = p.id
       WHERE d.domain = ? AND d.verified = 1
       LIMIT 1`,
    )
    .bind(bare)
    .first<{ slug: string }>();

  return row?.slug ?? null;
}

// ── R2 file serving ────────────────────────────────────────

const CONTENT_TYPES: Record<string, string> = {
  html: "text/html; charset=utf-8",
  css: "text/css; charset=utf-8",
  js: "application/javascript; charset=utf-8",
  mjs: "application/javascript; charset=utf-8",
  json: "application/json; charset=utf-8",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  svg: "image/svg+xml",
  ico: "image/x-icon",
  webp: "image/webp",
  woff: "font/woff",
  woff2: "font/woff2",
  ttf: "font/ttf",
  otf: "font/otf",
  eot: "application/vnd.ms-fontobject",
  pdf: "application/pdf",
  xml: "application/xml",
  txt: "text/plain; charset=utf-8",
  map: "application/json",
  webmanifest: "application/manifest+json",
};

function guessContentType(path: string): string {
  const ext = path.split(".").pop()?.toLowerCase() ?? "";
  return CONTENT_TYPES[ext] ?? "application/octet-stream";
}

function r2Headers(object: R2Object, path: string): Headers {
  const headers = new Headers();
  headers.set(
    "Content-Type",
    object.httpMetadata?.contentType ?? guessContentType(path),
  );
  headers.set("Cache-Control", "public, max-age=60, s-maxage=600");
  headers.set("ETag", object.etag);
  return headers;
}

/**
 * Serves a file from R2 for the given project slug and request path.
 *
 * Resolution order:
 *   1. Exact match:        sites/{slug}/{path}
 *   2. Directory index:    sites/{slug}/{path}/index.html
 *   3. Root index:         sites/{slug}/index.html
 *   4. Custom 404 page:    sites/{slug}/404.html  (served with 404 status)
 *   5. Plain text 404
 */
export async function serveFromR2(
  slug: string,
  path: string,
  bucket: R2Bucket,
): Promise<Response> {
  // Strip leading slash and default empty to index.html
  let clean = path.replace(/^\/+/, "");
  if (!clean) clean = "index.html";

  // Path traversal protection
  if (clean.includes("..")) {
    return new Response("Bad request", { status: 400 });
  }

  const prefix = `sites/${slug}`;

  // 1. Exact match
  let object = await bucket.get(`${prefix}/${clean}`);
  if (object) {
    return new Response(object.body, { headers: r2Headers(object, clean) });
  }

  // 2. Directory index fallback (only for paths without extensions)
  if (!clean.includes(".")) {
    object = await bucket.get(`${prefix}/${clean}/index.html`);
    if (object) {
      return new Response(object.body, {
        headers: r2Headers(object, "index.html"),
      });
    }
  }

  // 3. Root index fallback
  if (clean !== "index.html") {
    object = await bucket.get(`${prefix}/index.html`);
    if (object) {
      return new Response(object.body, {
        headers: r2Headers(object, "index.html"),
      });
    }
  }

  // 4. Custom 404 page
  object = await bucket.get(`${prefix}/404.html`);
  if (object) {
    return new Response(object.body, {
      status: 404,
      headers: r2Headers(object, "404.html"),
    });
  }

  // 5. Plain 404
  return new Response("Not found", { status: 404 });
}
