import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  generateDnsRecords,
  validateDomain,
  checkDomainDns,
  addDomain,
  removeDomain,
  listDomains,
} from "./domains.js";

// ── generateDnsRecords ──────────────────────────────────

describe("generateDnsRecords", () => {
  it("returns CNAME and TXT records", () => {
    const records = generateDnsRecords("docs.example.com", "my-project");

    expect(records).toHaveLength(2);

    const types = records.map((r) => r.type);
    expect(types).toContain("CNAME");
    expect(types).toContain("TXT");
  });

  it("uses correct values for domain and slug", () => {
    const records = generateDnsRecords("docs.acme.io", "acme-docs");

    const cname = records.find((r) => r.type === "CNAME")!;
    expect(cname.name).toBe("docs");
    expect(cname.value).toBe("acme-docs.tome.dev");
    expect(cname.verified).toBe(false);

    const txt = records.find((r) => r.type === "TXT")!;
    expect(txt.name).toBe("_tome-verify.docs");
    expect(txt.value).toBe("tome-verify=acme-docs");
    expect(txt.verified).toBe(false);
  });
});

// ── validateDomain ──────────────────────────────────────

describe("validateDomain", () => {
  it("accepts valid domains", () => {
    expect(validateDomain("example.com")).toEqual({ valid: true });
    expect(validateDomain("docs.example.com")).toEqual({ valid: true });
    expect(validateDomain("my-docs.example.co.uk")).toEqual({ valid: true });
  });

  it("rejects empty domain", () => {
    const result = validateDomain("");
    expect(result.valid).toBe(false);
    expect(result.error).toBeDefined();
  });

  it("rejects domain with spaces", () => {
    const result = validateDomain("my domain.com");
    expect(result.valid).toBe(false);
    expect(result.error).toContain("spaces");
  });

  it("rejects domain without TLD", () => {
    const result = validateDomain("localhost");
    expect(result.valid).toBe(false);
    expect(result.error).toBeDefined();
  });

  it("rejects domain with protocol prefix", () => {
    const httpResult = validateDomain("http://example.com");
    expect(httpResult.valid).toBe(false);
    expect(httpResult.error).toContain("protocol");

    const httpsResult = validateDomain("https://example.com");
    expect(httpsResult.valid).toBe(false);
    expect(httpsResult.error).toContain("protocol");
  });
});

// ── checkDomainDns ──────────────────────────────────────

describe("checkDomainDns", () => {
  it("returns pending status without token (fallback)", async () => {
    const status = await checkDomainDns("docs.example.com", "my-project");

    expect(status.domain).toBe("docs.example.com");
    expect(status.verified).toBe(false);
    expect(status.sslStatus).toBe("pending");
    expect(status.dnsRecords).toHaveLength(2);
  });

  it("calls API when token is provided", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          domain: "docs.example.com",
          verified: true,
          sslStatus: "active",
          dnsRecords: [
            { type: "CNAME", name: "docs", value: "my-project.tome.dev", verified: true },
          ],
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      ),
    );

    const status = await checkDomainDns("docs.example.com", "my-project", "https://api.tome.dev", "test-token");

    expect(status.verified).toBe(true);
    expect(status.sslStatus).toBe("active");
    expect(fetchSpy).toHaveBeenCalledWith(
      "https://api.tome.dev/api/domains/docs.example.com/verify",
      expect.objectContaining({ headers: { Authorization: "Bearer test-token" } }),
    );

    fetchSpy.mockRestore();
  });
});

// ── addDomain ───────────────────────────────────────────

describe("addDomain", () => {
  let fetchSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    fetchSpy = vi.spyOn(globalThis, "fetch");
  });

  afterEach(() => {
    fetchSpy.mockRestore();
  });

  it("returns domain status with pending SSL", async () => {
    fetchSpy.mockResolvedValue(
      new Response(
        JSON.stringify({
          domain: "docs.example.com",
          verified: false,
          sslStatus: "pending",
          dnsRecords: [
            { type: "CNAME", name: "docs", value: "my-project.tome.dev", verified: false },
            { type: "TXT", name: "_tome-verify.docs", value: "tome-verify=my-project", verified: false },
          ],
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      ),
    );

    const status = await addDomain(
      { domain: "docs.example.com", projectSlug: "my-project" },
      "test-token",
    );

    expect(status.domain).toBe("docs.example.com");
    expect(status.verified).toBe(false);
    expect(status.sslStatus).toBe("pending");
    expect(status.dnsRecords).toHaveLength(2);
  });

  it("throws on API error", async () => {
    fetchSpy.mockResolvedValue(
      new Response(JSON.stringify({ error: "Domain already registered" }), { status: 409 }),
    );

    await expect(
      addDomain({ domain: "taken.com", projectSlug: "p" }, "tok"),
    ).rejects.toThrow("Failed to add domain: Domain already registered");
  });
});

// ── removeDomain ────────────────────────────────────────

describe("removeDomain", () => {
  let fetchSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    fetchSpy = vi.spyOn(globalThis, "fetch");
  });

  afterEach(() => {
    fetchSpy.mockRestore();
  });

  it("returns removed confirmation", async () => {
    fetchSpy.mockResolvedValue(
      new Response(JSON.stringify({ removed: true }), { status: 200 }),
    );

    const result = await removeDomain("docs.example.com", "test-token");
    expect(result.removed).toBe(true);
  });
});

// ── listDomains ─────────────────────────────────────────

describe("listDomains", () => {
  let fetchSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    fetchSpy = vi.spyOn(globalThis, "fetch");
  });

  afterEach(() => {
    fetchSpy.mockRestore();
  });

  it("returns array of domain statuses", async () => {
    fetchSpy.mockResolvedValue(
      new Response(
        JSON.stringify([
          {
            domain: "docs.example.com",
            verified: true,
            sslStatus: "active",
            dnsRecords: [
              { type: "CNAME", name: "docs", value: "my-project.tome.dev", verified: true },
            ],
          },
        ]),
        { status: 200, headers: { "Content-Type": "application/json" } },
      ),
    );

    const domains = await listDomains("my-project", "test-token");

    expect(Array.isArray(domains)).toBe(true);
    expect(domains.length).toBeGreaterThan(0);

    const first = domains[0];
    expect(first).toHaveProperty("domain");
    expect(first).toHaveProperty("verified");
    expect(first).toHaveProperty("sslStatus");
    expect(first).toHaveProperty("dnsRecords");
  });

  it("returns empty array on API error", async () => {
    fetchSpy.mockResolvedValue(new Response("Server error", { status: 500 }));

    const domains = await listDomains("my-project", "test-token");
    expect(domains).toEqual([]);
  });
});
