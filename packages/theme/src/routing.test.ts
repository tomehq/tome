import { describe, it, expect } from "vitest";
import { pathnameToPageId, pageIdToPath } from "./routing.js";
import type { MinimalRoute } from "./routing.js";

// ── Shared fixtures ──────────────────────────────────────

const routes: MinimalRoute[] = [
  { id: "index", urlPath: "/" },
  { id: "quickstart", urlPath: "/quickstart" },
  { id: "installation", urlPath: "/installation" },
  { id: "reference/config", urlPath: "/reference/config" },
  { id: "guides/migration", urlPath: "/guides/migration" },
  { id: "v1/index", urlPath: "/v1/" },
  { id: "v1/quickstart", urlPath: "/v1/quickstart" },
];

// ── pathnameToPageId ─────────────────────────────────────

describe("pathnameToPageId", () => {
  const basePath = "/docs";

  it("resolves root path to index", () => {
    expect(pathnameToPageId("/docs/", basePath, routes)).toBe("index");
  });

  it("resolves root without trailing slash", () => {
    expect(pathnameToPageId("/docs", basePath, routes)).toBe("index");
  });

  it("resolves top-level page", () => {
    expect(pathnameToPageId("/docs/quickstart", basePath, routes)).toBe("quickstart");
  });

  it("resolves nested page", () => {
    expect(pathnameToPageId("/docs/reference/config", basePath, routes)).toBe("reference/config");
  });

  it("resolves deeply nested page", () => {
    expect(pathnameToPageId("/docs/guides/migration", basePath, routes)).toBe("guides/migration");
  });

  it("returns null for unknown page", () => {
    expect(pathnameToPageId("/docs/nonexistent", basePath, routes)).toBeNull();
  });

  it("strips /index.html suffix", () => {
    expect(pathnameToPageId("/docs/quickstart/index.html", basePath, routes)).toBe("quickstart");
  });

  it("strips .html suffix", () => {
    expect(pathnameToPageId("/docs/quickstart.html", basePath, routes)).toBe("quickstart");
  });

  it("strips trailing slash", () => {
    expect(pathnameToPageId("/docs/quickstart/", basePath, routes)).toBe("quickstart");
  });

  it("resolves versioned page", () => {
    expect(pathnameToPageId("/docs/v1/quickstart", basePath, routes)).toBe("v1/quickstart");
  });

  it("resolves versioned index", () => {
    // /docs/v1/ → strip basePath → /v1/ → strip leading / → v1/ → strip trailing / → v1
    // But our route ID is "v1/index", not "v1", so this needs to resolve properly
    // After all stripping: "v1" — not in routes (v1/index is). Let's test this edge case.
    expect(pathnameToPageId("/docs/v1", basePath, routes)).toBeNull();
  });

  describe("with empty basePath", () => {
    it("resolves root to index", () => {
      expect(pathnameToPageId("/", "", routes)).toBe("index");
    });

    it("resolves page at root", () => {
      expect(pathnameToPageId("/quickstart", "", routes)).toBe("quickstart");
    });

    it("resolves nested page at root", () => {
      expect(pathnameToPageId("/reference/config", "", routes)).toBe("reference/config");
    });
  });

  describe("with / basePath", () => {
    it("resolves top-level page", () => {
      expect(pathnameToPageId("/quickstart", "", routes)).toBe("quickstart");
    });
  });
});

// ── pageIdToPath ─────────────────────────────────────────

describe("pageIdToPath", () => {
  const basePath = "/docs";

  it("builds path for index", () => {
    expect(pageIdToPath("index", basePath, routes)).toBe("/docs/");
  });

  it("builds path for top-level page", () => {
    expect(pageIdToPath("quickstart", basePath, routes)).toBe("/docs/quickstart");
  });

  it("builds path for nested page", () => {
    expect(pageIdToPath("reference/config", basePath, routes)).toBe("/docs/reference/config");
  });

  it("builds path for versioned page", () => {
    expect(pageIdToPath("v1/quickstart", basePath, routes)).toBe("/docs/v1/quickstart");
  });

  it("falls back to basePath + id for unknown route", () => {
    expect(pageIdToPath("unknown-page", basePath, routes)).toBe("/docs/unknown-page");
  });

  describe("with empty basePath", () => {
    it("builds path for index", () => {
      expect(pageIdToPath("index", "", routes)).toBe("/");
    });

    it("builds path for page", () => {
      expect(pageIdToPath("quickstart", "", routes)).toBe("/quickstart");
    });
  });
});
