import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdtempSync, writeFileSync, rmSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";
import { parseOpenApiSpec } from "./openapi.js";

// ── HELPERS ──────────────────────────────────────────────

function makeSpec(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    openapi: "3.0.0",
    info: { title: "Test API", version: "1.0.0", description: "A test API" },
    servers: [{ url: "https://api.example.com", description: "Production" }],
    tags: [{ name: "users", description: "User operations" }],
    paths: {
      "/users": {
        get: {
          operationId: "listUsers",
          summary: "List all users",
          tags: ["users"],
          parameters: [
            {
              name: "limit",
              in: "query",
              required: false,
              schema: { type: "integer" },
              description: "Max results",
            },
          ],
          responses: {
            "200": {
              description: "Success",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { type: "object" },
                  },
                },
              },
            },
          },
        },
        post: {
          operationId: "createUser",
          summary: "Create a user",
          tags: ["users"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { name: { type: "string" } },
                },
              },
            },
          },
          responses: {
            "201": { description: "Created" },
            "400": { description: "Bad request" },
          },
        },
      },
      "/users/{id}": {
        get: {
          operationId: "getUser",
          summary: "Get user by ID",
          deprecated: true,
          tags: ["users"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
              description: "User ID",
            },
          ],
          responses: {
            "200": { description: "Success" },
            "404": { description: "Not found" },
          },
        },
      },
    },
    ...overrides,
  };
}

function writeSpec(dir: string, spec: Record<string, unknown>, filename = "spec.json"): string {
  const filePath = join(dir, filename);
  writeFileSync(filePath, JSON.stringify(spec, null, 2));
  return filePath;
}

// ── TESTS ───────────────────────────────────────────────

let tmpDir: string;

beforeEach(() => {
  tmpDir = mkdtempSync(join(tmpdir(), "tome-openapi-test-"));
});

afterEach(() => {
  rmSync(tmpDir, { recursive: true, force: true });
});

// ── Basic parsing ───────────────────────────────────────

describe("basic parsing", () => {
  it("parses a valid OpenAPI 3.0 spec from a JSON file", async () => {
    const specPath = writeSpec(tmpDir, makeSpec());
    const manifest = await parseOpenApiSpec(specPath);
    expect(manifest).toBeDefined();
    expect(manifest.title).toBe("Test API");
  });

  it("parses a valid OpenAPI 3.0 spec from a YAML file", async () => {
    const yamlContent = `openapi: "3.0.0"
info:
  title: YAML API
  version: "2.0.0"
  description: A YAML test API
servers:
  - url: https://yaml.example.com
    description: YAML Server
paths:
  /items:
    get:
      operationId: listItems
      summary: List items
      responses:
        "200":
          description: OK
`;
    const specPath = join(tmpDir, "spec.yaml");
    writeFileSync(specPath, yamlContent);
    const manifest = await parseOpenApiSpec(specPath);
    expect(manifest.title).toBe("YAML API");
    expect(manifest.version).toBe("2.0.0");
  });

  it("extracts API title and version", async () => {
    const specPath = writeSpec(tmpDir, makeSpec());
    const manifest = await parseOpenApiSpec(specPath);
    expect(manifest.title).toBe("Test API");
    expect(manifest.version).toBe("1.0.0");
    expect(manifest.description).toBe("A test API");
  });

  it("extracts server URLs", async () => {
    const specPath = writeSpec(tmpDir, makeSpec());
    const manifest = await parseOpenApiSpec(specPath);
    expect(manifest.servers).toHaveLength(1);
    expect(manifest.servers[0].url).toBe("https://api.example.com");
    expect(manifest.servers[0].description).toBe("Production");
  });
});

// ── Endpoint extraction ─────────────────────────────────

describe("endpoint extraction", () => {
  it("extracts GET endpoints with path and summary", async () => {
    const specPath = writeSpec(tmpDir, makeSpec());
    const manifest = await parseOpenApiSpec(specPath);
    const getUsers = manifest.endpoints.find(
      (e) => e.method === "get" && e.path === "/users",
    );
    expect(getUsers).toBeDefined();
    expect(getUsers!.summary).toBe("List all users");
    expect(getUsers!.path).toBe("/users");
  });

  it("extracts POST endpoints with request body", async () => {
    const specPath = writeSpec(tmpDir, makeSpec());
    const manifest = await parseOpenApiSpec(specPath);
    const postUsers = manifest.endpoints.find(
      (e) => e.method === "post" && e.path === "/users",
    );
    expect(postUsers).toBeDefined();
    expect(postUsers!.requestBody).toBeDefined();
    expect(postUsers!.requestBody!.required).toBe(true);
    expect(postUsers!.requestBody!.contentType).toBe("application/json");
  });

  it("extracts multiple methods on the same path", async () => {
    const specPath = writeSpec(tmpDir, makeSpec());
    const manifest = await parseOpenApiSpec(specPath);
    const usersEndpoints = manifest.endpoints.filter(
      (e) => e.path === "/users",
    );
    expect(usersEndpoints).toHaveLength(2);
    const methods = usersEndpoints.map((e) => e.method).sort();
    expect(methods).toEqual(["get", "post"]);
  });

  it("extracts operation IDs and tags", async () => {
    const specPath = writeSpec(tmpDir, makeSpec());
    const manifest = await parseOpenApiSpec(specPath);
    const getUsers = manifest.endpoints.find(
      (e) => e.operationId === "listUsers",
    );
    expect(getUsers).toBeDefined();
    expect(getUsers!.tags).toContain("users");

    // Also check tags at manifest level
    expect(manifest.tags).toHaveLength(1);
    expect(manifest.tags[0].name).toBe("users");
    expect(manifest.tags[0].description).toBe("User operations");
  });

  it("marks deprecated endpoints", async () => {
    const specPath = writeSpec(tmpDir, makeSpec());
    const manifest = await parseOpenApiSpec(specPath);
    const getUser = manifest.endpoints.find(
      (e) => e.operationId === "getUser",
    );
    expect(getUser).toBeDefined();
    expect(getUser!.deprecated).toBe(true);

    // Non-deprecated endpoints should be false
    const listUsers = manifest.endpoints.find(
      (e) => e.operationId === "listUsers",
    );
    expect(listUsers!.deprecated).toBe(false);
  });
});

// ── Parameter extraction ────────────────────────────────

describe("parameter extraction", () => {
  it("extracts path parameters with type", async () => {
    const specPath = writeSpec(tmpDir, makeSpec());
    const manifest = await parseOpenApiSpec(specPath);
    const getUser = manifest.endpoints.find(
      (e) => e.operationId === "getUser",
    );
    expect(getUser).toBeDefined();
    const idParam = getUser!.parameters.find((p) => p.name === "id");
    expect(idParam).toBeDefined();
    expect(idParam!.in).toBe("path");
    expect(idParam!.required).toBe(true);
    expect(idParam!.type).toBe("string");
    expect(idParam!.description).toBe("User ID");
  });

  it("extracts query parameters with required flag", async () => {
    const specPath = writeSpec(tmpDir, makeSpec());
    const manifest = await parseOpenApiSpec(specPath);
    const listUsers = manifest.endpoints.find(
      (e) => e.operationId === "listUsers",
    );
    expect(listUsers).toBeDefined();
    const limitParam = listUsers!.parameters.find(
      (p) => p.name === "limit",
    );
    expect(limitParam).toBeDefined();
    expect(limitParam!.in).toBe("query");
    expect(limitParam!.required).toBe(false);
    expect(limitParam!.type).toBe("integer");
    expect(limitParam!.description).toBe("Max results");
  });

  it("extracts header parameters", async () => {
    const spec = makeSpec({
      paths: {
        "/secure": {
          get: {
            operationId: "secureEndpoint",
            summary: "Secure endpoint",
            parameters: [
              {
                name: "X-Api-Key",
                in: "header",
                required: true,
                schema: { type: "string" },
                description: "API key",
              },
            ],
            responses: {
              "200": { description: "OK" },
            },
          },
        },
      },
    });
    const specPath = writeSpec(tmpDir, spec);
    const manifest = await parseOpenApiSpec(specPath);
    const endpoint = manifest.endpoints.find(
      (e) => e.operationId === "secureEndpoint",
    );
    expect(endpoint).toBeDefined();
    const headerParam = endpoint!.parameters.find(
      (p) => p.name === "X-Api-Key",
    );
    expect(headerParam).toBeDefined();
    expect(headerParam!.in).toBe("header");
    expect(headerParam!.required).toBe(true);
    expect(headerParam!.type).toBe("string");
  });
});

// ── Request/response bodies ─────────────────────────────

describe("request/response bodies", () => {
  it("extracts request body schema and content type", async () => {
    const specPath = writeSpec(tmpDir, makeSpec());
    const manifest = await parseOpenApiSpec(specPath);
    const createUser = manifest.endpoints.find(
      (e) => e.operationId === "createUser",
    );
    expect(createUser).toBeDefined();
    expect(createUser!.requestBody).toBeDefined();
    expect(createUser!.requestBody!.contentType).toBe("application/json");
    expect(createUser!.requestBody!.required).toBe(true);
    expect(createUser!.requestBody!.schema).toBeDefined();
    const schema = createUser!.requestBody!.schema as Record<string, unknown>;
    expect(schema.type).toBe("object");
  });

  it("extracts response status codes and descriptions", async () => {
    const specPath = writeSpec(tmpDir, makeSpec());
    const manifest = await parseOpenApiSpec(specPath);
    const getUser = manifest.endpoints.find(
      (e) => e.operationId === "getUser",
    );
    expect(getUser).toBeDefined();
    expect(getUser!.responses).toHaveLength(2);
    const r200 = getUser!.responses.find((r) => r.statusCode === "200");
    const r404 = getUser!.responses.find((r) => r.statusCode === "404");
    expect(r200).toBeDefined();
    expect(r200!.description).toBe("Success");
    expect(r404).toBeDefined();
    expect(r404!.description).toBe("Not found");
  });

  it("handles multiple response types", async () => {
    const specPath = writeSpec(tmpDir, makeSpec());
    const manifest = await parseOpenApiSpec(specPath);
    const createUser = manifest.endpoints.find(
      (e) => e.operationId === "createUser",
    );
    expect(createUser).toBeDefined();
    expect(createUser!.responses).toHaveLength(2);

    const statusCodes = createUser!.responses
      .map((r) => r.statusCode)
      .sort();
    expect(statusCodes).toEqual(["201", "400"]);
  });

  it("extracts response content type and schema", async () => {
    const specPath = writeSpec(tmpDir, makeSpec());
    const manifest = await parseOpenApiSpec(specPath);
    const listUsers = manifest.endpoints.find(
      (e) => e.operationId === "listUsers",
    );
    expect(listUsers).toBeDefined();
    const r200 = listUsers!.responses.find((r) => r.statusCode === "200");
    expect(r200).toBeDefined();
    expect(r200!.contentType).toBe("application/json");
    expect(r200!.schema).toBeDefined();
    const schema = r200!.schema as Record<string, unknown>;
    expect(schema.type).toBe("array");
  });
});

// ── Error handling ──────────────────────────────────────

describe("error handling", () => {
  it("throws on invalid/malformed spec", async () => {
    const specPath = join(tmpDir, "invalid.json");
    writeFileSync(specPath, JSON.stringify({ invalid: true }));
    await expect(parseOpenApiSpec(specPath)).rejects.toThrow();
  });

  it("throws on missing file", async () => {
    const specPath = join(tmpDir, "nonexistent.json");
    await expect(parseOpenApiSpec(specPath)).rejects.toThrow();
  });
});

// ── Edge cases ──────────────────────────────────────────

describe("edge cases", () => {
  it("handles spec with no paths", async () => {
    const spec = makeSpec({ paths: {} });
    const specPath = writeSpec(tmpDir, spec);
    const manifest = await parseOpenApiSpec(specPath);
    expect(manifest.endpoints).toEqual([]);
  });

  it("handles spec with no servers", async () => {
    const spec = makeSpec();
    delete (spec as Record<string, unknown>).servers;
    const specPath = writeSpec(tmpDir, spec);
    const manifest = await parseOpenApiSpec(specPath);
    expect(manifest.servers).toEqual([]);
  });

  it("handles spec with no tags", async () => {
    const spec = makeSpec();
    delete (spec as Record<string, unknown>).tags;
    const specPath = writeSpec(tmpDir, spec);
    const manifest = await parseOpenApiSpec(specPath);
    expect(manifest.tags).toEqual([]);
  });

  it("handles array schema types", async () => {
    const specPath = writeSpec(tmpDir, makeSpec());
    const manifest = await parseOpenApiSpec(specPath);
    const listUsers = manifest.endpoints.find(
      (e) => e.operationId === "listUsers",
    );
    const r200 = listUsers!.responses.find((r) => r.statusCode === "200");
    const schema = r200!.schema as Record<string, unknown>;
    expect(schema.type).toBe("array");
  });
});
