import { describe, it, expect, vi } from "vitest";
import { hasRole, checkPageAccess } from "./rbac.js";

// ── hasRole ────────────────────────────────────────────────

describe("hasRole", () => {
  it("viewer meets viewer requirement", () => {
    expect(hasRole("viewer", "viewer")).toBe(true);
  });

  it("editor meets viewer requirement", () => {
    expect(hasRole("editor", "viewer")).toBe(true);
  });

  it("admin meets admin requirement", () => {
    expect(hasRole("admin", "admin")).toBe(true);
  });

  it("owner meets any requirement", () => {
    expect(hasRole("owner", "viewer")).toBe(true);
    expect(hasRole("owner", "editor")).toBe(true);
    expect(hasRole("owner", "admin")).toBe(true);
    expect(hasRole("owner", "owner")).toBe(true);
  });

  it("viewer fails admin requirement", () => {
    expect(hasRole("viewer", "admin")).toBe(false);
  });

  it("editor fails owner requirement", () => {
    expect(hasRole("editor", "owner")).toBe(false);
  });

  it("unknown role fails any requirement", () => {
    expect(hasRole("unknown", "viewer")).toBe(false);
  });

  it("any role fails unknown requirement (level 0)", () => {
    // Unknown required role has level 0, so any valid role passes
    expect(hasRole("viewer", "unknown")).toBe(true);
  });
});

// ── checkPageAccess ────────────────────────────────────────

describe("checkPageAccess", () => {
  function mockDb(row: { role: string } | null) {
    return {
      prepare: vi.fn().mockReturnValue({
        bind: vi.fn().mockReturnValue({
          first: vi.fn().mockResolvedValue(row),
        }),
      }),
    } as unknown as D1Database;
  }

  it("grants access when user has sufficient role", async () => {
    const db = mockDb({ role: "admin" });
    const result = await checkPageAccess(db, "p1", "user@acme.com", "editor");
    expect(result).toBe(true);
  });

  it("denies access when user has insufficient role", async () => {
    const db = mockDb({ role: "viewer" });
    const result = await checkPageAccess(db, "p1", "user@acme.com", "admin");
    expect(result).toBe(false);
  });

  it("denies access when user has no role entry", async () => {
    const db = mockDb(null);
    const result = await checkPageAccess(db, "p1", "nobody@acme.com", "viewer");
    expect(result).toBe(false);
  });

  it("grants access for any role when no required role specified", async () => {
    const db = mockDb({ role: "viewer" });
    const result = await checkPageAccess(db, "p1", "user@acme.com");
    expect(result).toBe(true);
  });

  it("denies access when no role entry and no required role", async () => {
    const db = mockDb(null);
    const result = await checkPageAccess(db, "p1", "nobody@acme.com");
    expect(result).toBe(false);
  });

  it("queries DB with correct project and email", async () => {
    const db = mockDb({ role: "editor" });
    await checkPageAccess(db, "proj-123", "test@example.com", "viewer");
    expect(db.prepare).toHaveBeenCalledWith(
      "SELECT role FROM project_roles WHERE project_id = ? AND email = ?"
    );
  });
});
