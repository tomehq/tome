// ── TYPES ───────────────────────────────────────────────

export interface DomainConfig {
  domain: string;
  projectSlug: string;
}

export interface DomainStatus {
  domain: string;
  verified: boolean;
  sslStatus: "pending" | "active" | "failed";
  dnsRecords: DnsRecord[];
}

export interface DnsRecord {
  type: "CNAME" | "TXT";
  name: string;
  value: string;
  verified: boolean;
}

// ── DNS RECORDS ─────────────────────────────────────────

/**
 * Generate the required DNS records for a custom domain.
 * Returns CNAME and TXT verification records.
 */
export function generateDnsRecords(domain: string, projectSlug: string): DnsRecord[] {
  return [
    {
      type: "CNAME",
      name: "docs",
      value: `${projectSlug}.tome.dev`,
      verified: false,
    },
    {
      type: "TXT",
      name: "_tome-verify.docs",
      value: `tome-verify=${projectSlug}`,
      verified: false,
    },
  ];
}

// ── VALIDATION ──────────────────────────────────────────

/**
 * Validate a domain string format.
 * Checks for basic format: no spaces, has TLD, no protocol prefix.
 */
export function validateDomain(domain: string): { valid: boolean; error?: string } {
  if (!domain || domain.trim().length === 0) {
    return { valid: false, error: "Domain cannot be empty" };
  }

  if (/\s/.test(domain)) {
    return { valid: false, error: "Domain cannot contain spaces" };
  }

  if (/^https?:\/\//i.test(domain)) {
    return { valid: false, error: "Domain should not include protocol (http:// or https://)" };
  }

  // Must have at least one dot separating labels, with a TLD of 2+ chars
  const domainPattern = /^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
  if (!domainPattern.test(domain)) {
    return { valid: false, error: "Invalid domain format (must have a valid TLD)" };
  }

  return { valid: true };
}

// ── API CONFIG ──────────────────────────────────────────

const API_URL = process.env.TOME_API_URL ?? "https://tome-api.tome-api.workers.dev";

// ── DNS CHECK ───────────────────────────────────────────

/**
 * Check domain DNS verification status via Tome API.
 */
export async function checkDomainDns(domain: string, projectSlug: string, apiUrl?: string, token?: string): Promise<DomainStatus> {
  if (!token) {
    // Fallback to local generation when no API available
    return {
      domain,
      verified: false,
      sslStatus: "pending",
      dnsRecords: generateDnsRecords(domain, projectSlug),
    };
  }

  const res = await fetch(`${apiUrl ?? API_URL}/api/domains/${encodeURIComponent(domain)}/verify`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    return { domain, verified: false, sslStatus: "pending", dnsRecords: generateDnsRecords(domain, projectSlug) };
  }

  return (await res.json()) as DomainStatus;
}

// ── ADD DOMAIN ──────────────────────────────────────────

/**
 * Add a custom domain to a project via Tome API.
 */
export async function addDomain(config: DomainConfig, token: string, apiUrl?: string): Promise<DomainStatus> {
  const res = await fetch(`${apiUrl ?? API_URL}/api/domains`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ domain: config.domain, projectSlug: config.projectSlug }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(`Failed to add domain: ${(err as { error: string }).error}`);
  }

  return (await res.json()) as DomainStatus;
}

// ── REMOVE DOMAIN ───────────────────────────────────────

/**
 * Remove a custom domain from a project via Tome API.
 */
export async function removeDomain(domain: string, token: string, apiUrl?: string): Promise<{ removed: boolean }> {
  const res = await fetch(`${apiUrl ?? API_URL}/api/domains/${encodeURIComponent(domain)}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(`Failed to remove domain: ${(err as { error: string }).error}`);
  }

  return (await res.json()) as { removed: boolean };
}

// ── LIST DOMAINS ────────────────────────────────────────

/**
 * List domains for user's projects via Tome API.
 */
export async function listDomains(projectSlug: string, token: string, apiUrl?: string): Promise<DomainStatus[]> {
  const res = await fetch(`${apiUrl ?? API_URL}/api/domains`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    return [];
  }

  return (await res.json()) as DomainStatus[];
}
