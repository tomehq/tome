import { describe, it, expect } from "vitest";
import {
  diffOpenApiSpecs,
  generateChangelogEntry,
  formatChangelogMarkdown,
  type ApiDiffResult,
} from "./api-diff.js";
import type { ApiManifest, ApiEndpoint } from "./openapi.js";

// ── Helpers ──────────────────────────────────────────────

function makeManifest(endpoints: ApiEndpoint[], version = "1.0.0"): ApiManifest {
  return {
    title: "Test API",
    version,
    servers: [{ url: "https://api.example.com" }],
    endpoints,
    tags: [],
  };
}

function makeEndpoint(overrides: Partial<ApiEndpoint> = {}): ApiEndpoint {
  return {
    method: "get",
    path: "/users",
    summary: "List users",
    tags: [],
    parameters: [],
    responses: [{ statusCode: "200", description: "OK" }],
    deprecated: false,
    ...overrides,
  };
}

// ── diffOpenApiSpecs ────────────────────────────────────

describe("diffOpenApiSpecs", () => {
  it("detects no changes when specs are identical", () => {
    const spec = makeManifest([makeEndpoint()]);
    const diff = diffOpenApiSpecs(spec, spec);
    expect(diff.changes).toHaveLength(0);
    expect(diff.hasBreaking).toBe(false);
    expect(diff.summary.total).toBe(0);
  });

  it("detects added endpoint", () => {
    const oldSpec = makeManifest([]);
    const newSpec = makeManifest([makeEndpoint()]);
    const diff = diffOpenApiSpecs(oldSpec, newSpec);

    expect(diff.changes).toHaveLength(1);
    expect(diff.changes[0].type).toBe("added");
    expect(diff.changes[0].severity).toBe("non-breaking");
    expect(diff.changes[0].description).toContain("GET /users");
    expect(diff.hasBreaking).toBe(false);
  });

  it("detects removed endpoint (breaking)", () => {
    const oldSpec = makeManifest([makeEndpoint()]);
    const newSpec = makeManifest([]);
    const diff = diffOpenApiSpecs(oldSpec, newSpec);

    expect(diff.changes).toHaveLength(1);
    expect(diff.changes[0].type).toBe("removed");
    expect(diff.changes[0].severity).toBe("breaking");
    expect(diff.hasBreaking).toBe(true);
  });

  it("detects deprecated endpoint", () => {
    const oldSpec = makeManifest([makeEndpoint({ deprecated: false })]);
    const newSpec = makeManifest([makeEndpoint({ deprecated: true })]);
    const diff = diffOpenApiSpecs(oldSpec, newSpec);

    const deprecation = diff.changes.find((c) => c.type === "deprecated");
    expect(deprecation).toBeDefined();
    expect(deprecation!.severity).toBe("deprecation");
  });

  it("detects un-deprecated endpoint", () => {
    const oldSpec = makeManifest([makeEndpoint({ deprecated: true })]);
    const newSpec = makeManifest([makeEndpoint({ deprecated: false })]);
    const diff = diffOpenApiSpecs(oldSpec, newSpec);

    const change = diff.changes.find((c) => c.description.includes("Un-deprecated"));
    expect(change).toBeDefined();
    expect(change!.severity).toBe("non-breaking");
  });

  it("detects docs-only changes", () => {
    const oldSpec = makeManifest([makeEndpoint({ summary: "List users" })]);
    const newSpec = makeManifest([makeEndpoint({ summary: "Get all users" })]);
    const diff = diffOpenApiSpecs(oldSpec, newSpec);

    const docsChange = diff.changes.find((c) => c.severity === "docs-only");
    expect(docsChange).toBeDefined();
    expect(diff.hasBreaking).toBe(false);
  });

  it("detects added required parameter (breaking)", () => {
    const oldSpec = makeManifest([makeEndpoint({ parameters: [] })]);
    const newSpec = makeManifest([
      makeEndpoint({
        parameters: [{ name: "page", in: "query", required: true, type: "integer" }],
      }),
    ]);
    const diff = diffOpenApiSpecs(oldSpec, newSpec);

    const paramChange = diff.changes.find((c) => c.field?.includes("parameter.page"));
    expect(paramChange).toBeDefined();
    expect(paramChange!.severity).toBe("breaking");
    expect(paramChange!.description).toContain("required");
  });

  it("detects added optional parameter (non-breaking)", () => {
    const oldSpec = makeManifest([makeEndpoint({ parameters: [] })]);
    const newSpec = makeManifest([
      makeEndpoint({
        parameters: [{ name: "limit", in: "query", required: false, type: "integer" }],
      }),
    ]);
    const diff = diffOpenApiSpecs(oldSpec, newSpec);

    const paramChange = diff.changes.find((c) => c.field?.includes("parameter.limit"));
    expect(paramChange).toBeDefined();
    expect(paramChange!.severity).toBe("non-breaking");
  });

  it("detects removed required parameter (breaking)", () => {
    const oldSpec = makeManifest([
      makeEndpoint({
        parameters: [{ name: "id", in: "path", required: true, type: "string" }],
      }),
    ]);
    const newSpec = makeManifest([makeEndpoint({ parameters: [] })]);
    const diff = diffOpenApiSpecs(oldSpec, newSpec);

    const paramChange = diff.changes.find((c) => c.field?.includes("parameter.id"));
    expect(paramChange).toBeDefined();
    expect(paramChange!.severity).toBe("breaking");
  });

  it("detects parameter type change (breaking)", () => {
    const oldSpec = makeManifest([
      makeEndpoint({
        parameters: [{ name: "id", in: "path", required: true, type: "string" }],
      }),
    ]);
    const newSpec = makeManifest([
      makeEndpoint({
        parameters: [{ name: "id", in: "path", required: true, type: "integer" }],
      }),
    ]);
    const diff = diffOpenApiSpecs(oldSpec, newSpec);

    const typeChange = diff.changes.find((c) => c.field?.includes("type"));
    expect(typeChange).toBeDefined();
    expect(typeChange!.severity).toBe("breaking");
    expect(typeChange!.description).toContain("string");
    expect(typeChange!.description).toContain("integer");
  });

  it("detects parameter becoming required (breaking)", () => {
    const oldSpec = makeManifest([
      makeEndpoint({
        parameters: [{ name: "filter", in: "query", required: false, type: "string" }],
      }),
    ]);
    const newSpec = makeManifest([
      makeEndpoint({
        parameters: [{ name: "filter", in: "query", required: true, type: "string" }],
      }),
    ]);
    const diff = diffOpenApiSpecs(oldSpec, newSpec);

    const reqChange = diff.changes.find((c) => c.field?.includes("required"));
    expect(reqChange).toBeDefined();
    expect(reqChange!.severity).toBe("breaking");
    expect(reqChange!.description).toContain("now required");
  });

  it("detects added request body", () => {
    const oldSpec = makeManifest([makeEndpoint({ method: "post", path: "/users" })]);
    const newSpec = makeManifest([
      makeEndpoint({
        method: "post",
        path: "/users",
        requestBody: { required: true, contentType: "application/json" },
      }),
    ]);
    const diff = diffOpenApiSpecs(oldSpec, newSpec);

    const bodyChange = diff.changes.find((c) => c.field === "requestBody");
    expect(bodyChange).toBeDefined();
    expect(bodyChange!.severity).toBe("breaking"); // required body = breaking
  });

  it("detects removed request body (breaking)", () => {
    const oldSpec = makeManifest([
      makeEndpoint({
        method: "post",
        path: "/users",
        requestBody: { required: true, contentType: "application/json" },
      }),
    ]);
    const newSpec = makeManifest([makeEndpoint({ method: "post", path: "/users" })]);
    const diff = diffOpenApiSpecs(oldSpec, newSpec);

    const bodyChange = diff.changes.find((c) => c.field === "requestBody");
    expect(bodyChange).toBeDefined();
    expect(bodyChange!.severity).toBe("breaking");
  });

  it("detects removed success response (breaking)", () => {
    const oldSpec = makeManifest([
      makeEndpoint({
        responses: [
          { statusCode: "200", description: "OK" },
          { statusCode: "201", description: "Created" },
        ],
      }),
    ]);
    const newSpec = makeManifest([
      makeEndpoint({
        responses: [{ statusCode: "200", description: "OK" }],
      }),
    ]);
    const diff = diffOpenApiSpecs(oldSpec, newSpec);

    const respChange = diff.changes.find((c) => c.field === "response.201");
    expect(respChange).toBeDefined();
    expect(respChange!.severity).toBe("breaking");
  });

  it("detects added error response (non-breaking)", () => {
    const oldSpec = makeManifest([
      makeEndpoint({ responses: [{ statusCode: "200", description: "OK" }] }),
    ]);
    const newSpec = makeManifest([
      makeEndpoint({
        responses: [
          { statusCode: "200", description: "OK" },
          { statusCode: "404", description: "Not Found" },
        ],
      }),
    ]);
    const diff = diffOpenApiSpecs(oldSpec, newSpec);

    const respChange = diff.changes.find((c) => c.field === "response.404");
    expect(respChange).toBeDefined();
    expect(respChange!.severity).toBe("non-breaking");
  });

  it("provides correct summary counts", () => {
    const oldSpec = makeManifest([
      makeEndpoint({ method: "get", path: "/users" }),
      makeEndpoint({ method: "delete", path: "/users/{id}" }),
    ]);
    const newSpec = makeManifest([
      makeEndpoint({ method: "get", path: "/users", summary: "Updated summary" }),
      makeEndpoint({ method: "post", path: "/users" }),
    ]);
    const diff = diffOpenApiSpecs(oldSpec, newSpec);

    expect(diff.summary.breaking).toBeGreaterThan(0); // DELETE removed
    expect(diff.summary.nonBreaking).toBeGreaterThan(0); // POST added
    expect(diff.summary.total).toBe(diff.changes.length);
  });

  it("tracks old and new versions", () => {
    const oldSpec = makeManifest([], "1.0.0");
    const newSpec = makeManifest([], "2.0.0");
    const diff = diffOpenApiSpecs(oldSpec, newSpec);
    expect(diff.oldVersion).toBe("1.0.0");
    expect(diff.newVersion).toBe("2.0.0");
  });
});

// ── generateChangelogEntry ──────────────────────────────

describe("generateChangelogEntry", () => {
  it("generates entry with correct sections", () => {
    const oldSpec = makeManifest([
      makeEndpoint({ method: "get", path: "/users" }),
      makeEndpoint({ method: "delete", path: "/old" }),
    ]);
    const newSpec = makeManifest([
      makeEndpoint({ method: "get", path: "/users", deprecated: true }),
      makeEndpoint({ method: "post", path: "/new" }),
    ], "2.0.0");

    const diff = diffOpenApiSpecs(oldSpec, newSpec);
    const entry = generateChangelogEntry(diff);

    expect(entry.version).toBe("2.0.0");
    expect(entry.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(entry.sections.added.length).toBeGreaterThan(0);
    expect(entry.sections.removed.length).toBeGreaterThan(0);
    expect(entry.sections.deprecated.length).toBeGreaterThan(0);
  });

  it("uses custom version when provided", () => {
    const diff = diffOpenApiSpecs(makeManifest([]), makeManifest([]));
    const entry = generateChangelogEntry(diff, "v3.0.0-beta");
    expect(entry.version).toBe("v3.0.0-beta");
  });

  it("skips docs-only changes in changelog", () => {
    const oldSpec = makeManifest([makeEndpoint({ summary: "Old" })]);
    const newSpec = makeManifest([makeEndpoint({ summary: "New" })]);
    const diff = diffOpenApiSpecs(oldSpec, newSpec);
    const entry = generateChangelogEntry(diff);

    const allItems = [
      ...entry.sections.added,
      ...entry.sections.changed,
      ...entry.sections.deprecated,
      ...entry.sections.removed,
    ];
    expect(allItems).toHaveLength(0);
  });
});

// ── formatChangelogMarkdown ─────────────────────────────

describe("formatChangelogMarkdown", () => {
  it("formats entry as Keep-a-Changelog markdown", () => {
    const entry: ReturnType<typeof generateChangelogEntry> = {
      version: "2.0.0",
      date: "2026-04-02",
      sections: {
        added: ["Added POST /users"],
        changed: ["Parameter `filter` is now required on GET /users"],
        deprecated: ["Deprecated GET /legacy"],
        removed: ["Removed DELETE /old"],
        breaking: ["Removed DELETE /old", "Parameter `filter` is now required on GET /users"],
      },
    };

    const md = formatChangelogMarkdown(entry);
    expect(md).toContain("## [2.0.0] - 2026-04-02");
    expect(md).toContain("### Breaking Changes");
    expect(md).toContain("### Added");
    expect(md).toContain("### Changed");
    expect(md).toContain("### Deprecated");
    expect(md).toContain("### Removed");
    expect(md).toContain("- Added POST /users");
    expect(md).toContain("- Removed DELETE /old");
  });

  it("omits empty sections", () => {
    const entry: ReturnType<typeof generateChangelogEntry> = {
      version: "1.1.0",
      date: "2026-04-02",
      sections: {
        added: ["Added GET /health"],
        changed: [],
        deprecated: [],
        removed: [],
        breaking: [],
      },
    };

    const md = formatChangelogMarkdown(entry);
    expect(md).toContain("### Added");
    expect(md).not.toContain("### Breaking");
    expect(md).not.toContain("### Changed");
    expect(md).not.toContain("### Deprecated");
    expect(md).not.toContain("### Removed");
  });
});
