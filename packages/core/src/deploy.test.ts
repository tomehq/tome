import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  mkdtempSync,
  rmSync,
  mkdirSync,
  writeFileSync,
  existsSync,
  readFileSync,
} from "fs";
import { join } from "path";
import { tmpdir } from "os";
import {
  collectBuildFiles,
  computeFileHashes,
  readAuthToken,
  saveAuthToken,
  deployToCloud,
} from "./deploy.js";

// ── collectBuildFiles ───────────────────────────────────

describe("collectBuildFiles", () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = mkdtempSync(join(tmpdir(), "tome-deploy-test-"));
  });

  afterEach(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  it("collects files from a directory", async () => {
    writeFileSync(join(tmpDir, "index.html"), "<html></html>");
    mkdirSync(join(tmpDir, "assets"), { recursive: true });
    writeFileSync(join(tmpDir, "assets", "style.css"), "body {}");

    const files = await collectBuildFiles(tmpDir);

    expect(files.size).toBe(2);
    expect(files.has("index.html")).toBe(true);
    expect(files.has(join("assets", "style.css"))).toBe(true);
    expect(files.get("index.html")!.toString()).toBe("<html></html>");
    expect(files.get(join("assets", "style.css"))!.toString()).toBe("body {}");
  });

  it("returns empty map for non-existent directory", async () => {
    const files = await collectBuildFiles(join(tmpDir, "does-not-exist"));
    expect(files.size).toBe(0);
  });
});

// ── computeFileHashes ───────────────────────────────────

describe("computeFileHashes", () => {
  it("returns SHA-256 hashes", () => {
    const files = new Map<string, Buffer>();
    files.set("test.txt", Buffer.from("hello world"));

    const hashes = computeFileHashes(files);

    expect(hashes.size).toBe(1);
    expect(hashes.has("test.txt")).toBe(true);
    // SHA-256 of "hello world"
    expect(hashes.get("test.txt")).toBe(
      "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9"
    );
  });

  it("returns consistent hashes for same content", () => {
    const files1 = new Map<string, Buffer>();
    files1.set("a.txt", Buffer.from("same content"));

    const files2 = new Map<string, Buffer>();
    files2.set("b.txt", Buffer.from("same content"));

    const hashes1 = computeFileHashes(files1);
    const hashes2 = computeFileHashes(files2);

    expect(hashes1.get("a.txt")).toBe(hashes2.get("b.txt"));
  });
});

// ── readAuthToken / saveAuthToken ───────────────────────

describe("readAuthToken / saveAuthToken", () => {
  let tmpConfigDir: string;

  beforeEach(() => {
    tmpConfigDir = mkdtempSync(join(tmpdir(), "tome-auth-test-"));
    // Use a subdirectory to test directory creation
    tmpConfigDir = join(tmpConfigDir, ".tome");
  });

  afterEach(() => {
    // Clean up the parent dir
    const parent = join(tmpConfigDir, "..");
    rmSync(parent, { recursive: true, force: true });
  });

  it("returns null when no config file exists", () => {
    const token = readAuthToken(tmpConfigDir);
    expect(token).toBeNull();
  });

  it("creates config directory and file", async () => {
    await saveAuthToken("test-token-123", tmpConfigDir);

    expect(existsSync(tmpConfigDir)).toBe(true);
    expect(existsSync(join(tmpConfigDir, "config"))).toBe(true);

    const raw = readFileSync(join(tmpConfigDir, "config"), "utf-8");
    const parsed = JSON.parse(raw);
    expect(parsed.token).toBe("test-token-123");
  });

  it("reads saved token", async () => {
    await saveAuthToken("my-secret-token", tmpConfigDir);

    const token = readAuthToken(tmpConfigDir);
    expect(token).toBe("my-secret-token");
  });
});

// ── deployToCloud ───────────────────────────────────────

describe("deployToCloud", () => {
  let tmpDir: string;
  let fetchSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    tmpDir = mkdtempSync(join(tmpdir(), "tome-deploy-cloud-test-"));
    // Suppress console output during tests
    vi.spyOn(console, "log").mockImplementation(() => {});

    // Mock fetch for API calls
    fetchSpy = vi.spyOn(globalThis, "fetch");
  });

  afterEach(() => {
    rmSync(tmpDir, { recursive: true, force: true });
    vi.restoreAllMocks();
  });

  function mockFetchSequence(needed: string[]) {
    let callIndex = 0;

    fetchSpy.mockImplementation(async (url, _opts) => {
      const urlStr = typeof url === "string" ? url : (url as Request).url;

      if (urlStr.endsWith("/api/deploy/start")) {
        return new Response(
          JSON.stringify({
            deploymentId: "deploy-abc123",
            needed,
            total: needed.length,
            skipped: 0,
          }),
          { status: 200, headers: { "Content-Type": "application/json" } },
        );
      }

      if (urlStr.endsWith("/api/deploy/upload")) {
        return new Response(
          JSON.stringify({ ok: true, path: needed[callIndex++] || "file", size: 100 }),
          { status: 200, headers: { "Content-Type": "application/json" } },
        );
      }

      if (urlStr.endsWith("/api/deploy/finalize")) {
        return new Response(
          JSON.stringify({
            url: "https://my-project.tome.center",
            deploymentId: "deploy-abc123",
            status: "live",
          }),
          { status: 200, headers: { "Content-Type": "application/json" } },
        );
      }

      return new Response("Not found", { status: 404 });
    });
  }

  it("returns deployment result with correct slug", async () => {
    writeFileSync(join(tmpDir, "index.html"), "<html>hello</html>");
    writeFileSync(join(tmpDir, "style.css"), "body { color: red; }");

    mockFetchSequence(["index.html", "style.css"]);

    const result = await deployToCloud(
      {
        apiUrl: "https://api.tome.center",
        token: "test-token",
        slug: "my-project",
      },
      tmpDir,
    );

    expect(result.url).toBe("https://my-project.tome.center");
    expect(result.deploymentId).toBe("deploy-abc123");
    expect(result.fileCount).toBe(2);
    expect(result.size).toBeGreaterThan(0);
  });

  it("sends file manifest to /start endpoint", async () => {
    writeFileSync(join(tmpDir, "index.html"), "<html></html>");

    mockFetchSequence(["index.html"]);

    await deployToCloud(
      { apiUrl: "https://api.tome.center", token: "test-token", slug: "my-docs" },
      tmpDir,
    );

    // First call should be to /start with manifest
    const startCall = fetchSpy.mock.calls[0];
    expect(startCall[0]).toBe("https://api.tome.center/api/deploy/start");
    const body = JSON.parse((startCall[1] as RequestInit).body as string);
    expect(body.slug).toBe("my-docs");
    expect(body.files["index.html"]).toBeTruthy();
  });

  it("uploads files with correct headers", async () => {
    writeFileSync(join(tmpDir, "page.html"), "<p>hi</p>");

    mockFetchSequence(["page.html"]);

    await deployToCloud(
      { apiUrl: "https://api.tome.center", token: "test-token", slug: "my-docs" },
      tmpDir,
    );

    // Second call should be upload
    const uploadCall = fetchSpy.mock.calls[1];
    expect(uploadCall[0]).toBe("https://api.tome.center/api/deploy/upload");
    const headers = (uploadCall[1] as RequestInit).headers as Record<string, string>;
    expect(headers["X-Deployment-Id"]).toBe("deploy-abc123");
    expect(headers["X-File-Path"]).toBe("page.html");
    expect(headers["X-File-Hash"]).toBeTruthy();
    expect(headers["Authorization"]).toBe("Bearer test-token");
  });

  it("skips unchanged files when server says none needed", async () => {
    writeFileSync(join(tmpDir, "index.html"), "<html></html>");

    // Server says no files needed (all cached)
    fetchSpy.mockImplementation(async (url) => {
      const urlStr = typeof url === "string" ? url : (url as Request).url;

      if (urlStr.endsWith("/api/deploy/start")) {
        return new Response(
          JSON.stringify({ deploymentId: "deploy-xyz", needed: [], total: 1, skipped: 1 }),
          { status: 200, headers: { "Content-Type": "application/json" } },
        );
      }
      if (urlStr.endsWith("/api/deploy/finalize")) {
        return new Response(
          JSON.stringify({ url: "https://cached.tome.center", deploymentId: "deploy-xyz", status: "live" }),
          { status: 200, headers: { "Content-Type": "application/json" } },
        );
      }
      return new Response("Not found", { status: 404 });
    });

    const result = await deployToCloud(
      { apiUrl: "https://api.tome.center", token: "test-token", slug: "cached" },
      tmpDir,
    );

    expect(result.url).toBe("https://cached.tome.center");
    // Should only call start + finalize (no upload calls)
    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });

  it("throws when output directory has no files", async () => {
    const emptyDir = join(tmpDir, "empty");

    await expect(
      deployToCloud(
        {
          apiUrl: "https://api.tome.center",
          token: "test-token",
          slug: "my-project",
        },
        emptyDir,
      ),
    ).rejects.toThrow("No files found");
  });

  it("throws on API error from /start", async () => {
    writeFileSync(join(tmpDir, "index.html"), "<html></html>");

    fetchSpy.mockResolvedValue(
      new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 }),
    );

    await expect(
      deployToCloud(
        { apiUrl: "https://api.tome.center", token: "bad-token", slug: "fail" },
        tmpDir,
      ),
    ).rejects.toThrow("Deploy failed: Unauthorized");
  });

  it("throws on upload error", async () => {
    writeFileSync(join(tmpDir, "index.html"), "<html></html>");

    let callNum = 0;
    fetchSpy.mockImplementation(async () => {
      callNum++;
      if (callNum === 1) {
        return new Response(
          JSON.stringify({ deploymentId: "d1", needed: ["index.html"], total: 1, skipped: 0 }),
          { status: 200, headers: { "Content-Type": "application/json" } },
        );
      }
      // Upload fails
      return new Response(
        JSON.stringify({ error: "Storage full" }),
        { status: 507 },
      );
    });

    await expect(
      deployToCloud(
        { apiUrl: "https://api.tome.center", token: "tok", slug: "full" },
        tmpDir,
      ),
    ).rejects.toThrow("Upload failed for index.html: Storage full");
  });
});
