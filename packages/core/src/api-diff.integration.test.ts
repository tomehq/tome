/**
 * Integration test: API diff with real OpenAPI spec parsing.
 * Tests the full pipeline: parse specs → diff → changelog.
 */
import { describe, it, expect, afterAll } from "vitest";
import { resolve } from "path";
import { mkdirSync, writeFileSync, rmSync, existsSync } from "fs";
import { parseOpenApiSpec } from "./openapi.js";
import { diffOpenApiSpecs, generateChangelogEntry, formatChangelogMarkdown } from "./api-diff.js";

const TMP_DIR = resolve(__dirname, "../.test-tmp-api-diff");

function setup() {
  if (existsSync(TMP_DIR)) rmSync(TMP_DIR, { recursive: true, force: true });
  mkdirSync(TMP_DIR, { recursive: true });
}

setup();

afterAll(() => {
  if (existsSync(TMP_DIR)) rmSync(TMP_DIR, { recursive: true, force: true });
});

function writeSpec(name: string, spec: object) {
  const path = resolve(TMP_DIR, name);
  writeFileSync(path, JSON.stringify(spec, null, 2), "utf-8");
  return path;
}

const baseSpec = {
  openapi: "3.0.0",
  info: { title: "Test API", version: "1.0.0" },
  paths: {
    "/users": {
      get: {
        summary: "List users",
        operationId: "listUsers",
        tags: ["Users"],
        parameters: [
          { name: "limit", in: "query", required: false, schema: { type: "integer" } },
        ],
        responses: { "200": { description: "OK" } },
      },
      post: {
        summary: "Create user",
        operationId: "createUser",
        tags: ["Users"],
        requestBody: {
          required: true,
          content: { "application/json": { schema: { type: "object" } } },
        },
        responses: { "201": { description: "Created" } },
      },
    },
    "/users/{id}": {
      get: {
        summary: "Get user",
        operationId: "getUser",
        tags: ["Users"],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } },
        ],
        responses: { "200": { description: "OK" }, "404": { description: "Not Found" } },
      },
      delete: {
        summary: "Delete user",
        operationId: "deleteUser",
        tags: ["Users"],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } },
        ],
        responses: { "204": { description: "Deleted" } },
      },
    },
  },
};

describe("API diff integration (real spec parsing)", () => {
  it("detects no changes between identical specs", async () => {
    const path1 = writeSpec("v1.json", baseSpec);
    const path2 = writeSpec("v1-copy.json", baseSpec);

    const old = await parseOpenApiSpec(path1);
    const cur = await parseOpenApiSpec(path2);
    const diff = diffOpenApiSpecs(old, cur);

    expect(diff.changes).toHaveLength(0);
    expect(diff.hasBreaking).toBe(false);
  });

  it("detects added endpoint in new version", async () => {
    const newSpec = {
      ...baseSpec,
      info: { ...baseSpec.info, version: "1.1.0" },
      paths: {
        ...baseSpec.paths,
        "/health": {
          get: {
            summary: "Health check",
            operationId: "healthCheck",
            responses: { "200": { description: "OK" } },
          },
        },
      },
    };

    const path1 = writeSpec("v1-base.json", baseSpec);
    const path2 = writeSpec("v1.1.json", newSpec);

    const old = await parseOpenApiSpec(path1);
    const cur = await parseOpenApiSpec(path2);
    const diff = diffOpenApiSpecs(old, cur);

    expect(diff.changes.some((c) => c.type === "added" && c.path === "/health")).toBe(true);
    expect(diff.hasBreaking).toBe(false);
    expect(diff.newVersion).toBe("1.1.0");
  });

  it("detects removed endpoint as breaking", async () => {
    const newSpec = {
      ...baseSpec,
      info: { ...baseSpec.info, version: "2.0.0" },
      paths: {
        "/users": baseSpec.paths["/users"],
        // /users/{id} removed entirely
      },
    };

    const path1 = writeSpec("v1-full.json", baseSpec);
    const path2 = writeSpec("v2-removed.json", newSpec);

    const old = await parseOpenApiSpec(path1);
    const cur = await parseOpenApiSpec(path2);
    const diff = diffOpenApiSpecs(old, cur);

    expect(diff.hasBreaking).toBe(true);
    expect(diff.changes.some((c) => c.type === "removed" && c.path === "/users/{id}")).toBe(true);
  });

  it("generates valid changelog markdown from diff", async () => {
    const newSpec = {
      ...baseSpec,
      info: { ...baseSpec.info, version: "2.0.0" },
      paths: {
        "/users": {
          get: baseSpec.paths["/users"].get,
          // POST /users removed (breaking)
        },
        "/users/{id}": baseSpec.paths["/users/{id}"],
        "/teams": {
          get: {
            summary: "List teams",
            operationId: "listTeams",
            responses: { "200": { description: "OK" } },
          },
        },
      },
    };

    const path1 = writeSpec("v1-changelog.json", baseSpec);
    const path2 = writeSpec("v2-changelog.json", newSpec);

    const old = await parseOpenApiSpec(path1);
    const cur = await parseOpenApiSpec(path2);
    const diff = diffOpenApiSpecs(old, cur);
    const entry = generateChangelogEntry(diff);
    const md = formatChangelogMarkdown(entry);

    expect(md).toContain("## [2.0.0]");
    expect(md).toContain("### Breaking Changes");
    expect(md).toContain("### Added");
    expect(md).toContain("POST /users");
    expect(md).toContain("GET /teams");
  });
});
