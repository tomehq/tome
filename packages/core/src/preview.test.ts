import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  slugifyBranch,
  getPreviewUrl,
  getExpiryDate,
  detectBranch,
  detectCommitSha,
  detectPrNumber,
  generatePreviewBanner,
} from "./preview.js";

// ── slugifyBranch ──────────────────────────────────────

describe("slugifyBranch", () => {
  it("converts simple branch names", () => {
    expect(slugifyBranch("main")).toBe("main");
    expect(slugifyBranch("develop")).toBe("develop");
  });

  it("converts slashes to dashes", () => {
    expect(slugifyBranch("feature/add-auth")).toBe("feature-add-auth");
  });

  it("converts underscores to dashes", () => {
    expect(slugifyBranch("feature_new_thing")).toBe("feature-new-thing");
  });

  it("lowercases branch names", () => {
    expect(slugifyBranch("Feature/MyBranch")).toBe("feature-mybranch");
  });

  it("removes non-alphanumeric characters", () => {
    expect(slugifyBranch("feat@#$%special")).toBe("feat-special");
  });

  it("trims leading and trailing dashes", () => {
    expect(slugifyBranch("-feature-")).toBe("feature");
    expect(slugifyBranch("/feature/")).toBe("feature");
  });

  it("collapses consecutive dashes", () => {
    expect(slugifyBranch("dependabot/npm_and_yarn/lodash")).toBe("dependabot-npm-and-yarn-lodash");
  });

  it("truncates to 50 characters", () => {
    const longBranch = "a".repeat(100);
    expect(slugifyBranch(longBranch).length).toBeLessThanOrEqual(50);
  });

  it("handles empty string", () => {
    expect(slugifyBranch("")).toBe("");
  });
});

// ── getPreviewUrl ──────────────────────────────────────

describe("getPreviewUrl", () => {
  it("generates standard preview URL", () => {
    const url = getPreviewUrl("feature-auth", "my-docs");
    expect(url).toBe("https://feature-auth.preview.my-docs.tome.dev");
  });

  it("uses custom base domain", () => {
    const url = getPreviewUrl("feature-auth", "my-docs", "example.com");
    expect(url).toBe("https://feature-auth.preview.my-docs.example.com");
  });

  it("handles default base domain", () => {
    const url = getPreviewUrl("main", "project");
    expect(url).toContain("tome.dev");
  });
});

// ── getExpiryDate ──────────────────────────────────────

describe("getExpiryDate", () => {
  it("returns ISO date string", () => {
    const expiry = getExpiryDate(7);
    expect(expiry).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  it("defaults to 7 days", () => {
    const expiry = getExpiryDate();
    const expiryDate = new Date(expiry);
    const now = new Date();
    const diffDays = (expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    expect(diffDays).toBeGreaterThan(6.9);
    expect(diffDays).toBeLessThan(7.1);
  });

  it("supports custom day counts", () => {
    const expiry = getExpiryDate(14);
    const expiryDate = new Date(expiry);
    const now = new Date();
    const diffDays = (expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    expect(diffDays).toBeGreaterThan(13.9);
    expect(diffDays).toBeLessThan(14.1);
  });
});

// ── detectBranch ───────────────────────────────────────

describe("detectBranch", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    // Clear all CI env vars
    delete process.env.GITHUB_HEAD_REF;
    delete process.env.GITHUB_REF_NAME;
    delete process.env.CI_MERGE_REQUEST_SOURCE_BRANCH_NAME;
    delete process.env.CI_COMMIT_BRANCH;
    delete process.env.BITBUCKET_BRANCH;
    delete process.env.BRANCH_NAME;
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("detects from GITHUB_HEAD_REF", () => {
    process.env.GITHUB_HEAD_REF = "feature/pr-branch";
    expect(detectBranch()).toBe("feature/pr-branch");
  });

  it("detects from GITHUB_REF_NAME", () => {
    process.env.GITHUB_REF_NAME = "main";
    expect(detectBranch()).toBe("main");
  });

  it("prefers GITHUB_HEAD_REF over GITHUB_REF_NAME", () => {
    process.env.GITHUB_HEAD_REF = "pr-branch";
    process.env.GITHUB_REF_NAME = "main";
    expect(detectBranch()).toBe("pr-branch");
  });

  it("detects from CI_MERGE_REQUEST_SOURCE_BRANCH_NAME", () => {
    process.env.CI_MERGE_REQUEST_SOURCE_BRANCH_NAME = "gitlab-branch";
    expect(detectBranch()).toBe("gitlab-branch");
  });

  it("detects from CI_COMMIT_BRANCH", () => {
    process.env.CI_COMMIT_BRANCH = "gitlab-main";
    expect(detectBranch()).toBe("gitlab-main");
  });

  it("detects from BITBUCKET_BRANCH", () => {
    process.env.BITBUCKET_BRANCH = "bb-branch";
    expect(detectBranch()).toBe("bb-branch");
  });

  it("detects from generic BRANCH_NAME", () => {
    process.env.BRANCH_NAME = "generic-ci";
    expect(detectBranch()).toBe("generic-ci");
  });

  it("falls back to git command when no env vars", () => {
    // Without CI env vars, it should try git rev-parse
    const branch = detectBranch();
    // Either returns the actual git branch or null
    expect(typeof branch === "string" || branch === null).toBe(true);
  });
});

// ── detectCommitSha ────────────────────────────────────

describe("detectCommitSha", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    delete process.env.GITHUB_SHA;
    delete process.env.CI_COMMIT_SHA;
    delete process.env.BITBUCKET_COMMIT;
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("detects from GITHUB_SHA", () => {
    process.env.GITHUB_SHA = "abc123def456";
    expect(detectCommitSha()).toBe("abc123def456");
  });

  it("detects from CI_COMMIT_SHA", () => {
    process.env.CI_COMMIT_SHA = "gitlab-sha-123";
    expect(detectCommitSha()).toBe("gitlab-sha-123");
  });

  it("detects from BITBUCKET_COMMIT", () => {
    process.env.BITBUCKET_COMMIT = "bb-commit-456";
    expect(detectCommitSha()).toBe("bb-commit-456");
  });

  it("falls back to git command when no env vars", () => {
    const sha = detectCommitSha();
    expect(typeof sha === "string" || sha === null).toBe(true);
  });
});

// ── detectPrNumber ─────────────────────────────────────

describe("detectPrNumber", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    delete process.env.GITHUB_EVENT_NAME;
    delete process.env.GITHUB_REF;
    delete process.env.CI_MERGE_REQUEST_IID;
    delete process.env.BITBUCKET_PR_ID;
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("detects from GitHub Actions PR event", () => {
    process.env.GITHUB_EVENT_NAME = "pull_request";
    process.env.GITHUB_REF = "refs/pull/42/merge";
    expect(detectPrNumber()).toBe(42);
  });

  it("detects from GitLab CI", () => {
    process.env.CI_MERGE_REQUEST_IID = "123";
    expect(detectPrNumber()).toBe(123);
  });

  it("detects from Bitbucket", () => {
    process.env.BITBUCKET_PR_ID = "789";
    expect(detectPrNumber()).toBe(789);
  });

  it("returns null when no CI env vars", () => {
    expect(detectPrNumber()).toBeNull();
  });

  it("returns null for non-PR GitHub events", () => {
    process.env.GITHUB_EVENT_NAME = "push";
    process.env.GITHUB_REF = "refs/heads/main";
    expect(detectPrNumber()).toBeNull();
  });
});

// ── generatePreviewBanner ──────────────────────────────

describe("generatePreviewBanner", () => {
  it("includes branch name", () => {
    const banner = generatePreviewBanner("feature/auth", "https://preview.example.com", "2025-12-31T00:00:00Z");
    expect(banner).toContain("feature/auth");
  });

  it("includes Preview Deployment text", () => {
    const banner = generatePreviewBanner("main", "https://preview.example.com", "2025-12-31T00:00:00Z");
    expect(banner).toContain("Preview Deployment");
  });

  it("includes expiry date", () => {
    const banner = generatePreviewBanner("main", "https://preview.example.com", "2025-06-15T12:00:00Z");
    expect(banner).toContain("Jun");
    expect(banner).toContain("15");
    expect(banner).toContain("2025");
  });

  it("includes dismiss button", () => {
    const banner = generatePreviewBanner("main", "https://preview.example.com", "2025-12-31T00:00:00Z");
    expect(banner).toContain("button");
    expect(banner).toContain("Dismiss");
  });

  it("escapes HTML in branch names", () => {
    const banner = generatePreviewBanner('<script>alert("xss")</script>', "https://preview.example.com", "2025-12-31T00:00:00Z");
    expect(banner).not.toContain("<script>");
    expect(banner).toContain("&lt;script&gt;");
  });

  it("has fixed positioning", () => {
    const banner = generatePreviewBanner("main", "https://preview.example.com", "2025-12-31T00:00:00Z");
    expect(banner).toContain("position:fixed");
    expect(banner).toContain("z-index:99999");
  });
});
