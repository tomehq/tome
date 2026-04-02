/**
 * API spec diff engine (TOM-69).
 * Compares two OpenAPI manifests and generates a structured changelog.
 * Detects breaking changes, additions, deprecations, and documentation updates.
 */

import type { ApiManifest, ApiEndpoint, ApiParameter } from "./openapi.js";

// ── TYPES ───────────────────────────────────────────────

export type ChangeType = "added" | "removed" | "changed" | "deprecated";
export type Severity = "breaking" | "non-breaking" | "deprecation" | "docs-only";

export interface ApiChange {
  /** Type of change */
  type: ChangeType;
  /** Severity classification */
  severity: Severity;
  /** Human-readable description */
  description: string;
  /** HTTP method (if endpoint-level) */
  method?: string;
  /** API path (if endpoint-level) */
  path?: string;
  /** Specific field that changed */
  field?: string;
}

export interface ApiDiffResult {
  /** Changes detected */
  changes: ApiChange[];
  /** Summary counts */
  summary: {
    total: number;
    breaking: number;
    nonBreaking: number;
    deprecations: number;
    docsOnly: number;
  };
  /** Whether any breaking changes were found */
  hasBreaking: boolean;
  /** Old spec version */
  oldVersion: string;
  /** New spec version */
  newVersion: string;
}

export interface ChangelogEntry {
  /** Version string */
  version: string;
  /** ISO date string */
  date: string;
  /** Sections of the changelog */
  sections: {
    added: string[];
    changed: string[];
    deprecated: string[];
    removed: string[];
    breaking: string[];
  };
}

// ── DIFF ENGINE ─────────────────────────────────────────

/**
 * Compare two API manifests and return all detected changes.
 */
export function diffOpenApiSpecs(
  oldSpec: ApiManifest,
  newSpec: ApiManifest,
): ApiDiffResult {
  const changes: ApiChange[] = [];

  const oldEndpoints = indexEndpoints(oldSpec.endpoints);
  const newEndpoints = indexEndpoints(newSpec.endpoints);

  // Detect removed endpoints (breaking)
  for (const [key, oldEp] of oldEndpoints) {
    if (!newEndpoints.has(key)) {
      changes.push({
        type: "removed",
        severity: "breaking",
        description: `Removed ${oldEp.method.toUpperCase()} ${oldEp.path}`,
        method: oldEp.method,
        path: oldEp.path,
      });
    }
  }

  // Detect added endpoints
  for (const [key, newEp] of newEndpoints) {
    if (!oldEndpoints.has(key)) {
      changes.push({
        type: "added",
        severity: "non-breaking",
        description: `Added ${newEp.method.toUpperCase()} ${newEp.path}`,
        method: newEp.method,
        path: newEp.path,
      });
    }
  }

  // Detect changes in existing endpoints
  for (const [key, oldEp] of oldEndpoints) {
    const newEp = newEndpoints.get(key);
    if (!newEp) continue;

    // Deprecation
    if (!oldEp.deprecated && newEp.deprecated) {
      changes.push({
        type: "deprecated",
        severity: "deprecation",
        description: `Deprecated ${newEp.method.toUpperCase()} ${newEp.path}`,
        method: newEp.method,
        path: newEp.path,
      });
    }

    // Un-deprecation
    if (oldEp.deprecated && !newEp.deprecated) {
      changes.push({
        type: "changed",
        severity: "non-breaking",
        description: `Un-deprecated ${newEp.method.toUpperCase()} ${newEp.path}`,
        method: newEp.method,
        path: newEp.path,
      });
    }

    // Parameter changes
    diffParameters(oldEp, newEp, changes);

    // Request body changes
    diffRequestBody(oldEp, newEp, changes);

    // Response changes
    diffResponses(oldEp, newEp, changes);

    // Summary/description changes (docs-only)
    if (oldEp.summary !== newEp.summary || oldEp.description !== newEp.description) {
      changes.push({
        type: "changed",
        severity: "docs-only",
        description: `Updated documentation for ${newEp.method.toUpperCase()} ${newEp.path}`,
        method: newEp.method,
        path: newEp.path,
        field: "description",
      });
    }
  }

  const summary = {
    total: changes.length,
    breaking: changes.filter((c) => c.severity === "breaking").length,
    nonBreaking: changes.filter((c) => c.severity === "non-breaking").length,
    deprecations: changes.filter((c) => c.severity === "deprecation").length,
    docsOnly: changes.filter((c) => c.severity === "docs-only").length,
  };

  return {
    changes,
    summary,
    hasBreaking: summary.breaking > 0,
    oldVersion: oldSpec.version,
    newVersion: newSpec.version,
  };
}

/**
 * Generate a Keep-a-Changelog formatted entry from a diff result.
 */
export function generateChangelogEntry(
  diff: ApiDiffResult,
  version?: string,
): ChangelogEntry {
  const date = new Date().toISOString().slice(0, 10);
  const sections = {
    added: [] as string[],
    changed: [] as string[],
    deprecated: [] as string[],
    removed: [] as string[],
    breaking: [] as string[],
  };

  for (const change of diff.changes) {
    if (change.severity === "docs-only") continue; // Skip docs-only in changelog

    switch (change.type) {
      case "added":
        sections.added.push(change.description);
        break;
      case "removed":
        sections.removed.push(change.description);
        sections.breaking.push(change.description);
        break;
      case "deprecated":
        sections.deprecated.push(change.description);
        break;
      case "changed":
        if (change.severity === "breaking") {
          sections.breaking.push(change.description);
        }
        sections.changed.push(change.description);
        break;
    }
  }

  return {
    version: version || diff.newVersion,
    date,
    sections,
  };
}

/**
 * Format a changelog entry as markdown.
 */
export function formatChangelogMarkdown(entry: ChangelogEntry): string {
  const lines: string[] = [];
  lines.push(`## [${entry.version}] - ${entry.date}`);
  lines.push("");

  if (entry.sections.breaking.length > 0) {
    lines.push("### Breaking Changes");
    for (const item of entry.sections.breaking) {
      lines.push(`- ${item}`);
    }
    lines.push("");
  }

  if (entry.sections.added.length > 0) {
    lines.push("### Added");
    for (const item of entry.sections.added) {
      lines.push(`- ${item}`);
    }
    lines.push("");
  }

  if (entry.sections.changed.length > 0) {
    lines.push("### Changed");
    for (const item of entry.sections.changed) {
      lines.push(`- ${item}`);
    }
    lines.push("");
  }

  if (entry.sections.deprecated.length > 0) {
    lines.push("### Deprecated");
    for (const item of entry.sections.deprecated) {
      lines.push(`- ${item}`);
    }
    lines.push("");
  }

  if (entry.sections.removed.length > 0) {
    lines.push("### Removed");
    for (const item of entry.sections.removed) {
      lines.push(`- ${item}`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

// ── HELPERS ─────────────────────────────────────────────

function indexEndpoints(endpoints: ApiEndpoint[]): Map<string, ApiEndpoint> {
  const map = new Map<string, ApiEndpoint>();
  for (const ep of endpoints) {
    map.set(`${ep.method}:${ep.path}`, ep);
  }
  return map;
}

function diffParameters(oldEp: ApiEndpoint, newEp: ApiEndpoint, changes: ApiChange[]) {
  const oldParams = new Map(oldEp.parameters.map((p) => [`${p.in}:${p.name}`, p]));
  const newParams = new Map(newEp.parameters.map((p) => [`${p.in}:${p.name}`, p]));

  // Removed parameters
  for (const [key, oldParam] of oldParams) {
    if (!newParams.has(key)) {
      changes.push({
        type: "removed",
        severity: oldParam.required ? "breaking" : "non-breaking",
        description: `Removed ${oldParam.required ? "required " : ""}parameter \`${oldParam.name}\` (${oldParam.in}) from ${newEp.method.toUpperCase()} ${newEp.path}`,
        method: newEp.method,
        path: newEp.path,
        field: `parameter.${oldParam.name}`,
      });
    }
  }

  // Added parameters
  for (const [key, newParam] of newParams) {
    if (!oldParams.has(key)) {
      changes.push({
        type: "added",
        severity: newParam.required ? "breaking" : "non-breaking",
        description: `Added ${newParam.required ? "required " : ""}parameter \`${newParam.name}\` (${newParam.in}) to ${newEp.method.toUpperCase()} ${newEp.path}`,
        method: newEp.method,
        path: newEp.path,
        field: `parameter.${newParam.name}`,
      });
    }
  }

  // Changed parameters (required flag change)
  for (const [key, oldParam] of oldParams) {
    const newParam = newParams.get(key);
    if (!newParam) continue;

    if (!oldParam.required && newParam.required) {
      changes.push({
        type: "changed",
        severity: "breaking",
        description: `Parameter \`${newParam.name}\` (${newParam.in}) is now required on ${newEp.method.toUpperCase()} ${newEp.path}`,
        method: newEp.method,
        path: newEp.path,
        field: `parameter.${newParam.name}.required`,
      });
    }

    if (oldParam.required && !newParam.required) {
      changes.push({
        type: "changed",
        severity: "non-breaking",
        description: `Parameter \`${newParam.name}\` (${newParam.in}) is now optional on ${newEp.method.toUpperCase()} ${newEp.path}`,
        method: newEp.method,
        path: newEp.path,
        field: `parameter.${newParam.name}.required`,
      });
    }

    if (oldParam.type !== newParam.type) {
      changes.push({
        type: "changed",
        severity: "breaking",
        description: `Parameter \`${newParam.name}\` type changed from \`${oldParam.type}\` to \`${newParam.type}\` on ${newEp.method.toUpperCase()} ${newEp.path}`,
        method: newEp.method,
        path: newEp.path,
        field: `parameter.${newParam.name}.type`,
      });
    }
  }
}

function diffRequestBody(oldEp: ApiEndpoint, newEp: ApiEndpoint, changes: ApiChange[]) {
  if (!oldEp.requestBody && newEp.requestBody) {
    changes.push({
      type: "added",
      severity: newEp.requestBody.required ? "breaking" : "non-breaking",
      description: `Added ${newEp.requestBody.required ? "required " : ""}request body to ${newEp.method.toUpperCase()} ${newEp.path}`,
      method: newEp.method,
      path: newEp.path,
      field: "requestBody",
    });
  }

  if (oldEp.requestBody && !newEp.requestBody) {
    changes.push({
      type: "removed",
      severity: "breaking",
      description: `Removed request body from ${newEp.method.toUpperCase()} ${newEp.path}`,
      method: newEp.method,
      path: newEp.path,
      field: "requestBody",
    });
  }

  if (oldEp.requestBody && newEp.requestBody) {
    if (oldEp.requestBody.contentType !== newEp.requestBody.contentType) {
      changes.push({
        type: "changed",
        severity: "breaking",
        description: `Request body content type changed from \`${oldEp.requestBody.contentType}\` to \`${newEp.requestBody.contentType}\` on ${newEp.method.toUpperCase()} ${newEp.path}`,
        method: newEp.method,
        path: newEp.path,
        field: "requestBody.contentType",
      });
    }

    if (!oldEp.requestBody.required && newEp.requestBody.required) {
      changes.push({
        type: "changed",
        severity: "breaking",
        description: `Request body is now required on ${newEp.method.toUpperCase()} ${newEp.path}`,
        method: newEp.method,
        path: newEp.path,
        field: "requestBody.required",
      });
    }
  }
}

function diffResponses(oldEp: ApiEndpoint, newEp: ApiEndpoint, changes: ApiChange[]) {
  const oldResponses = new Map(oldEp.responses.map((r) => [r.statusCode, r]));
  const newResponses = new Map(newEp.responses.map((r) => [r.statusCode, r]));

  // Removed responses (breaking if success codes removed)
  for (const [code] of oldResponses) {
    if (!newResponses.has(code)) {
      const isSuccess = code.startsWith("2");
      changes.push({
        type: "removed",
        severity: isSuccess ? "breaking" : "non-breaking",
        description: `Removed ${code} response from ${newEp.method.toUpperCase()} ${newEp.path}`,
        method: newEp.method,
        path: newEp.path,
        field: `response.${code}`,
      });
    }
  }

  // Added responses
  for (const [code] of newResponses) {
    if (!oldResponses.has(code)) {
      changes.push({
        type: "added",
        severity: "non-breaking",
        description: `Added ${code} response to ${newEp.method.toUpperCase()} ${newEp.path}`,
        method: newEp.method,
        path: newEp.path,
        field: `response.${code}`,
      });
    }
  }
}
