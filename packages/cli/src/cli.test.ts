import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  mkdtempSync,
  rmSync,
  existsSync,
  readFileSync,
  mkdirSync,
} from "fs";
import { join, dirname } from "path";
import { tmpdir } from "os";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const CLI_PATH = join(__dir, "cli.ts");
const ROOT = join(__dir, "..", "..", "..");

describe("CLI init command", () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = mkdtempSync(join(tmpdir(), "tome-cli-test-"));
  });

  afterEach(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  function runInit(name?: string): string {
    const args = name ? `init ${name}` : "init";
    return execSync(`npx tsx ${CLI_PATH} ${args}`, {
      cwd: tmpDir,
      encoding: "utf-8",
      env: { ...process.env, NODE_NO_WARNINGS: "1" },
    });
  }

  // ── Directory structure ───────────────────────────────────

  it("creates project directory with subdirectories", () => {
    runInit("test-docs");
    const dir = join(tmpDir, "test-docs");
    expect(existsSync(join(dir, "pages"))).toBe(true);
    expect(existsSync(join(dir, "public"))).toBe(true);
    expect(existsSync(join(dir, "styles"))).toBe(true);
  });

  // ── tome.config.js ───────────────────────────────────────

  it("writes tome.config.js with project name", () => {
    runInit("test-docs");
    const config = readFileSync(
      join(tmpDir, "test-docs", "tome.config.js"),
      "utf-8",
    );
    expect(config).toContain('name: "test-docs"');
    expect(config).toContain("navigation");
  });

  // ── package.json ──────────────────────────────────────────

  it("writes package.json with project name and dependencies", () => {
    runInit("test-docs");
    const pkg = JSON.parse(
      readFileSync(join(tmpDir, "test-docs", "package.json"), "utf-8"),
    );
    expect(pkg.name).toBe("test-docs");
    expect(pkg.scripts.dev).toBe("tome dev");
    expect(pkg.scripts.build).toBe("tome build");
    expect(pkg.devDependencies["@tomehq/cli"]).toBeDefined();
    expect(pkg.devDependencies["@tomehq/theme"]).toBeDefined();
  });

  // ── Starter pages ────────────────────────────────────────

  it("writes index.md with welcome content", () => {
    runInit("test-docs");
    const index = readFileSync(
      join(tmpDir, "test-docs", "pages", "index.md"),
      "utf-8",
    );
    expect(index).toContain("Welcome to test-docs");
    expect(index).toContain("title:");
  });

  it("writes quickstart.md", () => {
    runInit("test-docs");
    const qs = readFileSync(
      join(tmpDir, "test-docs", "pages", "quickstart.md"),
      "utf-8",
    );
    expect(qs).toContain("title: Quickstart");
  });

  it("writes components.mdx", () => {
    runInit("test-docs");
    const comp = readFileSync(
      join(tmpDir, "test-docs", "pages", "components.mdx"),
      "utf-8",
    );
    expect(comp).toContain("title: Components");
    expect(comp).toContain("Callout");
  });

  // ── index.html & entry.tsx ────────────────────────────────

  it("writes index.html with tome-root div", () => {
    runInit("test-docs");
    const html = readFileSync(
      join(tmpDir, "test-docs", "index.html"),
      "utf-8",
    );
    expect(html).toContain("tome-root");
    expect(html).toContain("entry.tsx");
  });

  it("writes .tome/entry.tsx", () => {
    runInit("test-docs");
    const entry = readFileSync(
      join(tmpDir, "test-docs", ".tome", "entry.tsx"),
      "utf-8",
    );
    expect(entry).toContain("@tomehq/theme/entry");
  });

  // ── .gitignore ────────────────────────────────────────────

  it("writes .gitignore", () => {
    runInit("test-docs");
    const gi = readFileSync(
      join(tmpDir, "test-docs", ".gitignore"),
      "utf-8",
    );
    expect(gi).toContain("node_modules/");
    expect(gi).toContain("out/");
  });

  // ── Default name ──────────────────────────────────────────

  it("uses 'my-docs' as default name when no argument given", () => {
    runInit();
    expect(existsSync(join(tmpDir, "my-docs"))).toBe(true);
    const pkg = JSON.parse(
      readFileSync(join(tmpDir, "my-docs", "package.json"), "utf-8"),
    );
    expect(pkg.name).toBe("my-docs");
  });

  // ── Error: directory already exists ───────────────────────

  it("fails when target directory already exists", () => {
    mkdirSync(join(tmpDir, "existing-dir"));
    expect(() => runInit("existing-dir")).toThrow();
  });

  // ── Success output ────────────────────────────────────────

  it("outputs success message with project name", () => {
    const output = runInit("test-docs");
    expect(output).toContain("test-docs");
  });
});

// ── algolia:init command (TOM-16) ─────────────────────────

describe("CLI algolia:init command", () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = mkdtempSync(join(tmpdir(), "tome-algolia-test-"));
  });

  afterEach(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  function runAlgoliaInit(extraArgs = ""): string {
    return execSync(`npx tsx ${CLI_PATH} algolia:init ${extraArgs}`, {
      cwd: tmpDir,
      encoding: "utf-8",
      env: { ...process.env, NODE_NO_WARNINGS: "1" },
    });
  }

  it("generates .docsearch.json file", () => {
    runAlgoliaInit();
    expect(existsSync(join(tmpDir, ".docsearch.json"))).toBe(true);
  });

  it("generates valid JSON with required fields", () => {
    runAlgoliaInit();
    const content = readFileSync(join(tmpDir, ".docsearch.json"), "utf-8");
    const config = JSON.parse(content);
    expect(config).toHaveProperty("index_name");
    expect(config).toHaveProperty("start_urls");
    expect(config).toHaveProperty("selectors");
    expect(config.selectors).toHaveProperty("lvl0");
    expect(config.selectors).toHaveProperty("text");
  });

  it("uses default URL when no tome.config.js exists", () => {
    runAlgoliaInit();
    const config = JSON.parse(readFileSync(join(tmpDir, ".docsearch.json"), "utf-8"));
    expect(config.start_urls[0]).toBe("https://YOUR_DOCS_URL");
  });

  it("respects --url flag", () => {
    runAlgoliaInit("--url https://docs.example.com");
    const config = JSON.parse(readFileSync(join(tmpDir, ".docsearch.json"), "utf-8"));
    expect(config.start_urls[0]).toBe("https://docs.example.com");
    expect(config.sitemap_urls[0]).toBe("https://docs.example.com/sitemap.xml");
  });

  it("reads site name from tome.config.js when available", () => {
    const { writeFileSync: wfs } = require("fs");
    wfs(
      join(tmpDir, "tome.config.js"),
      `export default { name: "Acme Docs" };\n`,
    );
    runAlgoliaInit();
    const config = JSON.parse(readFileSync(join(tmpDir, ".docsearch.json"), "utf-8"));
    expect(config.index_name).toBe("acme-docs");
  });

  it("includes tome-content selectors for text", () => {
    runAlgoliaInit();
    const config = JSON.parse(readFileSync(join(tmpDir, ".docsearch.json"), "utf-8"));
    expect(config.selectors.text).toContain("tome-content");
  });

  it("outputs success message", () => {
    const output = runAlgoliaInit();
    expect(output).toContain(".docsearch.json");
  });
});

// ── deploy command (TOM-22) ───────────────────────────────

describe("CLI deploy command", () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = mkdtempSync(join(tmpdir(), "tome-deploy-cli-test-"));
  });

  afterEach(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  it("fails when not logged in (no auth token)", () => {
    // Use a fake HOME so ~/.tome/config does not exist
    const fakeHome = mkdtempSync(join(tmpdir(), "tome-fake-home-"));

    try {
      execSync(`npx tsx ${CLI_PATH} deploy`, {
        cwd: tmpDir,
        encoding: "utf-8",
        env: {
          ...process.env,
          NODE_NO_WARNINGS: "1",
          HOME: fakeHome,
        },
      });
      // Should not reach here
      expect.unreachable("deploy should have failed");
    } catch (err: any) {
      expect(err.status).not.toBe(0);
      expect(err.stderr || err.stdout).toMatch(/Not logged in|tome login/);
    } finally {
      rmSync(fakeHome, { recursive: true, force: true });
    }
  });
});
