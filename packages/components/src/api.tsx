import { useState } from "react";
import { ApiPlayground } from "./ApiPlayground.js";
import type { ApiPlaygroundProps } from "./ApiPlayground.js";
import { CodeSamples } from "./CodeSamples.js";
import type { CodeSample } from "./CodeSamples.js";

// ── TYPES (mirrored from @tomehq/core openapi) ────────────
// These are kept lightweight so the components package doesn't
// depend on @tomehq/core at runtime — the data is passed as props.

export interface ApiParameter {
  name: string;
  in: "query" | "path" | "header" | "cookie";
  description?: string;
  required: boolean;
  type: string;
  schema?: Record<string, unknown>;
  example?: unknown;
}

export interface ApiRequestBody {
  description?: string;
  required: boolean;
  contentType: string;
  schema?: Record<string, unknown>;
  example?: unknown;
}

export interface ApiResponse {
  statusCode: string;
  description: string;
  contentType?: string;
  schema?: Record<string, unknown>;
}

export interface ApiEndpoint {
  method: "get" | "post" | "put" | "delete" | "patch" | "head" | "options";
  path: string;
  operationId?: string;
  summary?: string;
  description?: string;
  tags: string[];
  parameters: ApiParameter[];
  requestBody?: ApiRequestBody;
  responses: ApiResponse[];
  deprecated: boolean;
  security?: unknown[];
  codeSamples?: CodeSample[];
}

export interface ApiManifest {
  title: string;
  version: string;
  description?: string;
  servers: Array<{ url: string; description?: string }>;
  endpoints: ApiEndpoint[];
  tags: Array<{ name: string; description?: string }>;
}

// ── METHOD BADGE ────────────────────────────────────────

const methodColors: Record<string, string> = {
  get: "#22c55e",
  post: "#3b82f6",
  put: "#f59e0b",
  delete: "#ef4444",
  patch: "#a78bfa",
  head: "#6b7280",
  options: "#6b7280",
};

export interface MethodBadgeProps {
  method: string;
}

export function MethodBadge({ method }: MethodBadgeProps) {
  const color = methodColors[method.toLowerCase()] || "#6b7280";
  return (
    <span
      data-testid="method-badge"
      style={{
        display: "inline-block",
        padding: "2px 8px",
        borderRadius: 4,
        fontSize: 11,
        fontWeight: 700,
        fontFamily: "var(--font-code, monospace)",
        textTransform: "uppercase",
        color: "#fff",
        background: color,
        letterSpacing: "0.05em",
      }}
    >
      {method.toUpperCase()}
    </span>
  );
}

// ── PARAMETER TABLE ─────────────────────────────────────

export interface ParameterTableProps {
  parameters: ApiParameter[];
}

export function ParameterTable({ parameters }: ParameterTableProps) {
  if (parameters.length === 0) return null;
  return (
    <div style={{ overflowX: "auto", marginBottom: 16 }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: 13,
          lineHeight: 1.5,
        }}
      >
        <thead>
          <tr
            style={{
              borderBottom: "2px solid var(--bd)",
              textAlign: "left",
            }}
          >
            <th style={{ padding: "8px 12px", fontWeight: 600, color: "var(--tx)" }}>Name</th>
            <th style={{ padding: "8px 12px", fontWeight: 600, color: "var(--tx)" }}>Type</th>
            <th style={{ padding: "8px 12px", fontWeight: 600, color: "var(--tx)" }}>In</th>
            <th style={{ padding: "8px 12px", fontWeight: 600, color: "var(--tx)" }}>Required</th>
            <th style={{ padding: "8px 12px", fontWeight: 600, color: "var(--tx)" }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {parameters.map((param, i) => (
            <tr
              key={`${param.name}-${i}`}
              style={{ borderBottom: "1px solid var(--bd)" }}
            >
              <td
                style={{
                  padding: "8px 12px",
                  fontFamily: "var(--font-code, monospace)",
                  fontWeight: 500,
                  color: param.in === "path" ? "var(--ac)" : "var(--tx)",
                }}
              >
                {param.name}
              </td>
              <td
                style={{
                  padding: "8px 12px",
                  fontFamily: "var(--font-code, monospace)",
                  color: "var(--tx2)",
                }}
              >
                {param.type}
              </td>
              <td style={{ padding: "8px 12px", color: "var(--txM)" }}>
                <span
                  style={{
                    padding: "1px 6px",
                    borderRadius: 3,
                    fontSize: 11,
                    background: param.in === "path" ? "var(--ac)" + "22" : "var(--sf)",
                    color: param.in === "path" ? "var(--ac)" : "var(--txM)",
                  }}
                >
                  {param.in}
                </span>
              </td>
              <td style={{ padding: "8px 12px" }}>
                {param.required ? (
                  <span
                    data-testid="required-badge"
                    style={{
                      padding: "1px 6px",
                      borderRadius: 3,
                      fontSize: 11,
                      fontWeight: 600,
                      background: "#ef444422",
                      color: "#ef4444",
                    }}
                  >
                    required
                  </span>
                ) : (
                  <span style={{ color: "var(--txM)", fontSize: 12 }}>optional</span>
                )}
              </td>
              <td style={{ padding: "8px 12px", color: "var(--tx2)" }}>
                {param.description || "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── REQUEST BODY BLOCK ──────────────────────────────────

export interface RequestBodyBlockProps {
  requestBody: ApiRequestBody;
}

export function RequestBodyBlock({ requestBody }: RequestBodyBlockProps) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <span
          style={{
            padding: "2px 8px",
            borderRadius: 4,
            fontSize: 11,
            fontFamily: "var(--font-code, monospace)",
            background: "var(--sf)",
            color: "var(--tx2)",
          }}
        >
          {requestBody.contentType}
        </span>
        {requestBody.required && (
          <span
            style={{
              padding: "1px 6px",
              borderRadius: 3,
              fontSize: 11,
              fontWeight: 600,
              background: "#ef444422",
              color: "#ef4444",
            }}
          >
            required
          </span>
        )}
      </div>
      {requestBody.description && (
        <p style={{ fontSize: 13, color: "var(--tx2)", marginBottom: 8, marginTop: 0 }}>
          {requestBody.description}
        </p>
      )}
      {requestBody.schema && (
        <pre
          style={{
            background: "var(--cdBg)",
            color: "var(--cdTx)",
            padding: 16,
            borderRadius: 6,
            fontSize: 12,
            fontFamily: "var(--font-code, monospace)",
            overflow: "auto",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {JSON.stringify(requestBody.schema, null, 2)}
        </pre>
      )}
    </div>
  );
}

// ── RESPONSE BLOCK ──────────────────────────────────────

function statusColor(code: string): string {
  if (code.startsWith("2")) return "#22c55e";
  if (code.startsWith("4")) return "#f59e0b";
  if (code.startsWith("5")) return "#ef4444";
  return "#6b7280";
}

export interface ResponseBlockProps {
  responses: ApiResponse[];
}

export function ResponseBlock({ responses }: ResponseBlockProps) {
  if (responses.length === 0) return null;
  return (
    <div style={{ marginBottom: 16 }}>
      {responses.map((res, i) => {
        const color = statusColor(res.statusCode);
        return (
          <div
            key={`${res.statusCode}-${i}`}
            style={{
              border: "1px solid var(--bd)",
              borderRadius: 6,
              marginBottom: 8,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 14px",
                background: "var(--sf)",
              }}
            >
              <span
                data-testid="status-badge"
                style={{
                  padding: "2px 8px",
                  borderRadius: 4,
                  fontSize: 12,
                  fontWeight: 700,
                  fontFamily: "var(--font-code, monospace)",
                  color: "#fff",
                  background: color,
                }}
              >
                {res.statusCode}
              </span>
              <span style={{ fontSize: 13, color: "var(--tx2)" }}>
                {res.description}
              </span>
            </div>
            {res.schema && (
              <pre
                style={{
                  background: "var(--cdBg)",
                  color: "var(--cdTx)",
                  padding: 14,
                  fontSize: 12,
                  fontFamily: "var(--font-code, monospace)",
                  overflow: "auto",
                  lineHeight: 1.6,
                  margin: 0,
                  borderTop: "1px solid var(--bd)",
                }}
              >
                {JSON.stringify(res.schema, null, 2)}
              </pre>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── CODE EXAMPLES ───────────────────────────────────────

export interface CodeExamplesProps {
  endpoint: ApiEndpoint;
  baseUrl?: string;
}

function generateCurl(endpoint: ApiEndpoint, baseUrl: string): string {
  const url = baseUrl + endpoint.path;
  const parts: string[] = [`curl -X ${endpoint.method.toUpperCase()} "${url}"`];

  const headerParams = endpoint.parameters.filter((p) => p.in === "header");
  for (const h of headerParams) {
    parts.push(`  -H "${h.name}: <value>"`);
  }

  if (endpoint.requestBody) {
    parts.push(`  -H "Content-Type: ${endpoint.requestBody.contentType}"`);
    if (endpoint.requestBody.schema) {
      parts.push(`  -d '${JSON.stringify(endpoint.requestBody.schema, null, 2)}'`);
    }
  }

  return parts.join(" \\\n");
}

function generateFetch(endpoint: ApiEndpoint, baseUrl: string): string {
  const url = baseUrl + endpoint.path;
  const options: string[] = [];
  options.push(`  method: "${endpoint.method.toUpperCase()}",`);

  const headers: Record<string, string> = {};
  const headerParams = endpoint.parameters.filter((p) => p.in === "header");
  for (const h of headerParams) {
    headers[h.name] = "<value>";
  }
  if (endpoint.requestBody) {
    headers["Content-Type"] = endpoint.requestBody.contentType;
  }
  if (Object.keys(headers).length > 0) {
    options.push(`  headers: ${JSON.stringify(headers, null, 4).replace(/\n/g, "\n  ")},`);
  }
  if (endpoint.requestBody?.schema) {
    options.push(`  body: JSON.stringify(${JSON.stringify(endpoint.requestBody.schema, null, 4).replace(/\n/g, "\n  ")}),`);
  }

  return `fetch("${url}", {\n${options.join("\n")}\n});`;
}

function generatePython(endpoint: ApiEndpoint, baseUrl: string): string {
  const url = baseUrl + endpoint.path;
  const lines: string[] = ["import requests", ""];

  const headers: Record<string, string> = {};
  const headerParams = endpoint.parameters.filter((p) => p.in === "header");
  for (const h of headerParams) {
    headers[h.name] = "<value>";
  }
  if (endpoint.requestBody) {
    headers["Content-Type"] = endpoint.requestBody.contentType;
  }

  if (Object.keys(headers).length > 0) {
    lines.push(`headers = ${JSON.stringify(headers, null, 4)}`);
    lines.push("");
  }

  if (endpoint.requestBody?.schema) {
    lines.push(`data = ${JSON.stringify(endpoint.requestBody.schema, null, 4)}`);
    lines.push("");
  }

  const args: string[] = [`"${url}"`];
  if (Object.keys(headers).length > 0) args.push("headers=headers");
  if (endpoint.requestBody?.schema) args.push("json=data");

  lines.push(`response = requests.${endpoint.method}(${args.join(", ")})`);
  lines.push("print(response.json())");

  return lines.join("\n");
}

function generateGo(endpoint: ApiEndpoint, baseUrl: string): string {
  const url = baseUrl + endpoint.path;
  const lines: string[] = ["package main", "", 'import (', '  "fmt"', '  "net/http"'];
  if (endpoint.requestBody?.schema) {
    lines.push('  "bytes"', '  "encoding/json"');
  }
  lines.push('  "io"', ")", "");
  lines.push("func main() {");

  if (endpoint.requestBody?.schema) {
    lines.push(`  body, _ := json.Marshal(${JSON.stringify(endpoint.requestBody.schema)})`);
    lines.push(`  req, _ := http.NewRequest("${endpoint.method.toUpperCase()}", "${url}", bytes.NewBuffer(body))`);
  } else {
    lines.push(`  req, _ := http.NewRequest("${endpoint.method.toUpperCase()}", "${url}", nil)`);
  }

  const headerParams = endpoint.parameters.filter((p) => p.in === "header");
  for (const h of headerParams) {
    lines.push(`  req.Header.Set("${h.name}", "<value>")`);
  }
  if (endpoint.requestBody) {
    lines.push(`  req.Header.Set("Content-Type", "${endpoint.requestBody.contentType}")`);
  }

  lines.push("  resp, _ := http.DefaultClient.Do(req)");
  lines.push("  defer resp.Body.Close()");
  lines.push("  data, _ := io.ReadAll(resp.Body)");
  lines.push("  fmt.Println(string(data))");
  lines.push("}");
  return lines.join("\n");
}

function generateJava(endpoint: ApiEndpoint, baseUrl: string): string {
  const url = baseUrl + endpoint.path;
  const lines: string[] = [
    "import java.net.http.*;",
    "import java.net.URI;",
    "",
    "var client = HttpClient.newHttpClient();",
  ];

  if (endpoint.requestBody?.schema) {
    lines.push(`var body = ${JSON.stringify(JSON.stringify(endpoint.requestBody.schema))};`);
    lines.push(`var request = HttpRequest.newBuilder()`);
    lines.push(`  .uri(URI.create("${url}"))`);
    lines.push(`  .method("${endpoint.method.toUpperCase()}", HttpRequest.BodyPublishers.ofString(body))`);
  } else {
    lines.push(`var request = HttpRequest.newBuilder()`);
    lines.push(`  .uri(URI.create("${url}"))`);
    lines.push(`  .method("${endpoint.method.toUpperCase()}", HttpRequest.BodyPublishers.noBody())`);
  }

  const headerParams = endpoint.parameters.filter((p) => p.in === "header");
  for (const h of headerParams) {
    lines.push(`  .header("${h.name}", "<value>")`);
  }
  if (endpoint.requestBody) {
    lines.push(`  .header("Content-Type", "${endpoint.requestBody.contentType}")`);
  }
  lines.push("  .build();");
  lines.push("");
  lines.push("var response = client.send(request, HttpResponse.BodyHandlers.ofString());");
  lines.push("System.out.println(response.body());");
  return lines.join("\n");
}

function generateCSharp(endpoint: ApiEndpoint, baseUrl: string): string {
  const url = baseUrl + endpoint.path;
  const lines: string[] = [
    "using var client = new HttpClient();",
    "",
    `var request = new HttpRequestMessage(HttpMethod.${endpoint.method.charAt(0).toUpperCase() + endpoint.method.slice(1)}, "${url}");`,
  ];

  const headerParams = endpoint.parameters.filter((p) => p.in === "header");
  for (const h of headerParams) {
    lines.push(`request.Headers.Add("${h.name}", "<value>");`);
  }

  if (endpoint.requestBody?.schema) {
    lines.push(`request.Content = new StringContent(`);
    lines.push(`  ${JSON.stringify(JSON.stringify(endpoint.requestBody.schema))},`);
    lines.push(`  System.Text.Encoding.UTF8,`);
    lines.push(`  "${endpoint.requestBody.contentType}");`);
  }

  lines.push("");
  lines.push("var response = await client.SendAsync(request);");
  lines.push("var body = await response.Content.ReadAsStringAsync();");
  lines.push("Console.WriteLine(body);");
  return lines.join("\n");
}

export function CodeExamples({ endpoint, baseUrl = "https://api.example.com" }: CodeExamplesProps) {
  const [active, setActive] = useState(0);

  const tabs = ["cURL", "JavaScript", "Python", "Go", "Java", "C#"];
  const examples = [
    generateCurl(endpoint, baseUrl),
    generateFetch(endpoint, baseUrl),
    generatePython(endpoint, baseUrl),
    generateGo(endpoint, baseUrl),
    generateJava(endpoint, baseUrl),
    generateCSharp(endpoint, baseUrl),
  ];

  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", gap: 0, borderBottom: "1px solid var(--bd)", overflowX: "auto", WebkitOverflowScrolling: "touch" as any }}>
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActive(i)}
            style={{
              padding: "6px 14px",
              background: "none",
              border: "none",
              borderBottom: active === i ? "2px solid var(--ac)" : "2px solid transparent",
              color: active === i ? "var(--ac)" : "var(--txM)",
              fontWeight: active === i ? 600 : 400,
              fontSize: 12,
              cursor: "pointer",
              fontFamily: "inherit",
              whiteSpace: "nowrap",
            }}
          >
            {tab}
          </button>
        ))}
      </div>
      <pre
        style={{
          background: "var(--cdBg)",
          color: "var(--cdTx)",
          padding: 16,
          borderRadius: "0 0 6px 6px",
          fontSize: 12,
          fontFamily: "var(--font-code, monospace)",
          overflow: "auto",
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        {examples[active]}
      </pre>
    </div>
  );
}

// ── ENDPOINT CARD ───────────────────────────────────────

export interface EndpointCardProps {
  endpoint: ApiEndpoint;
  baseUrl?: string;
  defaultExpanded?: boolean;
  showPlayground?: boolean;
  playgroundAuth?: ApiPlaygroundProps["auth"];
}

export function EndpointCard({ endpoint, baseUrl, defaultExpanded = false, showPlayground, playgroundAuth }: EndpointCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const endpointId = (endpoint.operationId || `${endpoint.method}-${endpoint.path}`).toLowerCase().replace(/[^a-z0-9]+/g, "-");

  const hasDetails =
    endpoint.parameters.length > 0 ||
    endpoint.requestBody != null ||
    endpoint.responses.length > 0;

  return (
    <div
      id={endpointId}
      style={{
        border: "1px solid var(--bd)",
        borderRadius: 8,
        marginBottom: 12,
        overflow: "hidden",
        scrollMarginTop: 24,
      }}
    >
      {/* Header — always visible */}
      <button
        onClick={() => hasDetails && setExpanded(!expanded)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          width: "100%",
          padding: "14px 18px",
          background: "var(--sf)",
          border: "none",
          cursor: hasDetails ? "pointer" : "default",
          textAlign: "left",
          fontFamily: "inherit",
          color: "var(--tx)",
        }}
      >
        <MethodBadge method={endpoint.method} />
        <span
          style={{
            fontFamily: "var(--font-code, monospace)",
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          {endpoint.path}
        </span>

        {endpoint.deprecated && (
          <span
            data-testid="deprecated-badge"
            style={{
              padding: "1px 6px",
              borderRadius: 3,
              fontSize: 10,
              fontWeight: 700,
              background: "#f59e0b33",
              color: "#f59e0b",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Deprecated
          </span>
        )}

        {endpoint.tags.map((tag) => (
          <span
            key={tag}
            style={{
              padding: "1px 6px",
              borderRadius: 3,
              fontSize: 10,
              background: "var(--bd)",
              color: "var(--txM)",
            }}
          >
            {tag}
          </span>
        ))}

        {/* Spacer */}
        <span style={{ flex: 1 }} />

        {endpoint.summary && (
          <span style={{ fontSize: 13, color: "var(--tx2)", marginRight: 8 }}>
            {endpoint.summary}
          </span>
        )}

        {hasDetails && (
          <span
            style={{
              transform: expanded ? "rotate(180deg)" : "rotate(0)",
              transition: "transform 0.2s",
              fontSize: 12,
              color: "var(--txM)",
            }}
          >
            ▾
          </span>
        )}
      </button>

      {/* Expandable details */}
      {expanded && (
        <div
          style={{
            padding: "16px 18px",
            borderTop: "1px solid var(--bd)",
          }}
        >
          {endpoint.description && (
            <p style={{ fontSize: 14, color: "var(--tx2)", lineHeight: 1.65, marginTop: 0, marginBottom: 16 }}>
              {endpoint.description}
            </p>
          )}

          {endpoint.parameters.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <h4 style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: "var(--tx)" }}>
                Parameters
              </h4>
              <ParameterTable parameters={endpoint.parameters} />
            </div>
          )}

          {endpoint.requestBody && (
            <div style={{ marginBottom: 16 }}>
              <h4 style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: "var(--tx)" }}>
                Request Body
              </h4>
              <RequestBodyBlock requestBody={endpoint.requestBody} />
            </div>
          )}

          {endpoint.responses.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <h4 style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: "var(--tx)" }}>
                Responses
              </h4>
              <ResponseBlock responses={endpoint.responses} />
            </div>
          )}

          <div>
            <h4 style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: "var(--tx)" }}>
              Code Examples
            </h4>
            {endpoint.codeSamples && endpoint.codeSamples.length > 0 ? (
              <CodeSamples samples={endpoint.codeSamples} />
            ) : (
              <CodeExamples endpoint={endpoint} baseUrl={baseUrl} />
            )}
          </div>

          {showPlayground && (
            <div style={{ marginTop: 16 }}>
              <ApiPlayground
                endpoint={endpoint}
                baseUrl={baseUrl || "https://api.example.com"}
                auth={playgroundAuth}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── API REFERENCE (full page) ───────────────────────────

export interface ApiReferenceProps {
  manifest: ApiManifest;
  baseUrl?: string;
  showPlayground?: boolean;
  playgroundAuth?: ApiPlaygroundProps["auth"];
}

export function ApiReference({ manifest, baseUrl, showPlayground, playgroundAuth }: ApiReferenceProps) {
  const effectiveBaseUrl =
    baseUrl || (manifest.servers.length > 0 ? manifest.servers[0].url : "https://api.example.com");

  // Group endpoints by their first tag (or "Other" if untagged)
  const grouped = new Map<string, ApiEndpoint[]>();
  for (const ep of manifest.endpoints) {
    const tag = ep.tags.length > 0 ? ep.tags[0] : "Other";
    if (!grouped.has(tag)) grouped.set(tag, []);
    grouped.get(tag)!.push(ep);
  }

  // Order tags by manifest tag order, then any remaining
  const orderedTags: string[] = [];
  for (const t of manifest.tags) {
    if (grouped.has(t.name)) orderedTags.push(t.name);
  }
  for (const key of grouped.keys()) {
    if (!orderedTags.includes(key)) orderedTags.push(key);
  }

  const tagDescriptions = new Map<string, string | undefined>();
  for (const t of manifest.tags) {
    tagDescriptions.set(t.name, t.description);
  }

  return (
    <div style={{ display: "flex", gap: 32 }}>
      {/* Sidebar / TOC */}
      <nav
        data-testid="api-toc"
        style={{
          width: 200,
          flexShrink: 0,
          position: "sticky",
          top: 24,
          alignSelf: "flex-start",
          maxHeight: "calc(100vh - 48px)",
          overflowY: "auto",
        }}
      >
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "var(--txM)", marginBottom: 12, letterSpacing: "0.05em" }}>
          Endpoints
        </div>
        {orderedTags.map((tag) => {
          const tagId = tag.toLowerCase().replace(/\s+/g, "-");
          return (
            <div key={tag} style={{ marginBottom: 14 }}>
              <a
                href={`#${tagId}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(tagId)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                style={{
                  display: "block",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--tx)",
                  textDecoration: "none",
                  marginBottom: 4,
                }}
              >
                {tag}
              </a>
              {(grouped.get(tag) || []).map((ep) => {
                const epId = (ep.operationId || `${ep.method}-${ep.path}`).toLowerCase().replace(/[^a-z0-9]+/g, "-");
                return (
                  <a
                    key={`${ep.method}-${ep.path}`}
                    href={`#${epId}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(epId)?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: 12,
                      color: "var(--tx2)",
                      textDecoration: "none",
                      padding: "3px 0",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        fontFamily: "var(--font-code, monospace)",
                        color: methodColors[ep.method] || "#6b7280",
                        width: 36,
                        textTransform: "uppercase",
                      }}
                    >
                      {ep.method}
                    </span>
                    <span style={{ fontFamily: "var(--font-code, monospace)" }}>
                      {ep.path}
                    </span>
                  </a>
                );
              })}
            </div>
          );
        })}
      </nav>

      {/* Main content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>
            {manifest.title}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span
              style={{
                padding: "2px 8px",
                borderRadius: 4,
                fontSize: 11,
                fontWeight: 600,
                background: "var(--sf)",
                color: "var(--txM)",
              }}
            >
              v{manifest.version}
            </span>
            {manifest.servers.length > 0 && (
              <span
                style={{
                  fontSize: 12,
                  fontFamily: "var(--font-code, monospace)",
                  color: "var(--tx2)",
                }}
              >
                {manifest.servers[0].url}
              </span>
            )}
          </div>
          {manifest.description && (
            <p style={{ fontSize: 14, color: "var(--tx2)", lineHeight: 1.65, marginTop: 0 }}>
              {manifest.description}
            </p>
          )}
        </div>

        {/* Endpoint groups */}
        {orderedTags.map((tag) => (
          <section
            key={tag}
            id={tag.toLowerCase().replace(/\s+/g, "-")}
            data-testid="tag-section"
            style={{ marginBottom: 40 }}
          >
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{tag}</h2>
            {tagDescriptions.get(tag) && (
              <p style={{ fontSize: 14, color: "var(--tx2)", lineHeight: 1.65, marginTop: 0, marginBottom: 16 }}>
                {tagDescriptions.get(tag)}
              </p>
            )}
            {(grouped.get(tag) || []).map((ep) => (
              <EndpointCard
                key={`${ep.method}-${ep.path}`}
                endpoint={ep}
                baseUrl={effectiveBaseUrl}
                showPlayground={showPlayground}
                playgroundAuth={playgroundAuth}
              />
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
