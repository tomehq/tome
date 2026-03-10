import React, { useState } from "react";
import type { ApiEndpoint, ApiParameter } from "./api.js";

// ── TYPES ───────────────────────────────────────────────

export interface ApiPlaygroundProps {
  endpoint: ApiEndpoint;
  baseUrl: string;
  auth?: {
    type: "bearer" | "apiKey";
    header?: string;
  };
}

interface PlaygroundResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: string;
  time: number;
}

// ── HELPERS ─────────────────────────────────────────────

function statusColor(code: number): string {
  if (code >= 200 && code < 300) return "#22c55e";
  if (code >= 400 && code < 500) return "#f59e0b";
  if (code >= 500) return "#ef4444";
  return "#6b7280";
}

function buildUrl(
  baseUrl: string,
  path: string,
  pathParams: Record<string, string>,
  queryParams: Record<string, string>,
): string {
  let resolved = path;
  for (const [key, value] of Object.entries(pathParams)) {
    resolved = resolved.replace(`{${key}}`, encodeURIComponent(value));
  }
  const url = new URL(resolved, baseUrl);
  for (const [key, value] of Object.entries(queryParams)) {
    if (value) url.searchParams.set(key, value);
  }
  return url.toString();
}

function defaultAuthHeader(type: "bearer" | "apiKey"): string {
  return type === "bearer" ? "Authorization" : "X-API-Key";
}

// ── INPUT FIELD ─────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "6px 10px",
  border: "1px solid var(--bd)",
  borderRadius: 4,
  background: "var(--bg)",
  color: "var(--tx)",
  fontSize: 13,
  fontFamily: "var(--font-code, monospace)",
  boxSizing: "border-box",
};

function ParamInput({
  param,
  value,
  onChange,
}: {
  param: ApiParameter;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div style={{ marginBottom: 10 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 3, color: "var(--tx)" }}>
        {param.name}
        {param.required && <span style={{ color: "#ef4444", marginLeft: 2 }}>*</span>}
        <span style={{ fontWeight: 400, color: "var(--txM)", marginLeft: 6, fontSize: 11 }}>
          {param.in} &middot; {param.type}
        </span>
      </label>
      <input
        data-testid={`param-input-${param.name}`}
        style={inputStyle}
        placeholder={param.description || param.name}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      />
    </div>
  );
}

// ── MAIN COMPONENT ──────────────────────────────────────

export function ApiPlayground({ endpoint, baseUrl, auth }: ApiPlaygroundProps) {
  const [open, setOpen] = useState(false);
  const [paramValues, setParamValues] = useState<Record<string, string>>({});
  const [bodyText, setBodyText] = useState(
    endpoint.requestBody?.schema ? JSON.stringify(endpoint.requestBody.schema, null, 2) : "",
  );
  const [authToken, setAuthToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<PlaygroundResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [headersOpen, setHeadersOpen] = useState(false);

  const setParam = (name: string, value: string) =>
    setParamValues((prev) => ({ ...prev, [name]: value }));

  const pathParams = endpoint.parameters.filter((p) => p.in === "path");
  const queryParams = endpoint.parameters.filter((p) => p.in === "query");
  const headerParams = endpoint.parameters.filter((p) => p.in === "header");
  const hasBody = endpoint.requestBody != null;

  const sendRequest = async () => {
    setLoading(true);
    setResponse(null);
    setError(null);

    const pathMap: Record<string, string> = {};
    for (const p of pathParams) pathMap[p.name] = paramValues[p.name] || "";

    const queryMap: Record<string, string> = {};
    for (const p of queryParams) {
      if (paramValues[p.name]) queryMap[p.name] = paramValues[p.name];
    }

    const headers: Record<string, string> = {};
    for (const p of headerParams) {
      if (paramValues[p.name]) headers[p.name] = paramValues[p.name];
    }
    if (hasBody) headers["Content-Type"] = "application/json";
    if (auth && authToken) {
      const headerName = auth.header || defaultAuthHeader(auth.type);
      headers[headerName] = auth.type === "bearer" ? `Bearer ${authToken}` : authToken;
    }

    try {
      const url = buildUrl(baseUrl, endpoint.path, pathMap, queryMap);
      const start = Date.now();
      const res = await fetch(url, {
        method: endpoint.method.toUpperCase(),
        headers,
        body: hasBody && bodyText ? bodyText : undefined,
      });
      const elapsed = Date.now() - start;

      const resHeaders: Record<string, string> = {};
      res.headers.forEach((v, k) => { resHeaders[k] = v; });

      let body: string;
      const ct = res.headers.get("content-type") || "";
      if (ct.includes("json")) {
        const json = await res.json();
        body = JSON.stringify(json, null, 2);
      } else {
        body = await res.text();
      }

      setResponse({ status: res.status, statusText: res.statusText, headers: resHeaders, body, time: elapsed });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      data-testid="api-playground"
      style={{
        border: "1px solid var(--bd)",
        borderRadius: 6,
        overflow: "hidden",
        marginTop: 8,
      }}
    >
      {/* Toggle button */}
      <button
        data-testid="playground-toggle"
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          width: "100%",
          padding: "10px 14px",
          background: "var(--sf)",
          border: "none",
          cursor: "pointer",
          fontFamily: "inherit",
          fontSize: 13,
          fontWeight: 600,
          color: "var(--ac)",
        }}
      >
        <span style={{ fontSize: 14 }}>{open ? "\u25BC" : "\u25B6"}</span>
        Try it out
      </button>

      {open && (
        <div style={{ padding: "14px 16px", borderTop: "1px solid var(--bd)" }}>
          {/* Auth input */}
          {auth && (
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 3, color: "var(--tx)" }}>
                {auth.type === "bearer" ? "Bearer Token" : "API Key"}
              </label>
              <input
                data-testid="auth-input"
                type="password"
                style={inputStyle}
                placeholder={auth.type === "bearer" ? "Enter bearer token" : "Enter API key"}
                value={authToken}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAuthToken(e.target.value)}
              />
            </div>
          )}

          {/* Parameter inputs */}
          {pathParams.length > 0 && (
            <div style={{ marginBottom: 4 }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "var(--txM)", marginBottom: 6, letterSpacing: "0.05em" }}>
                Path Parameters
              </div>
              {pathParams.map((p) => (
                <ParamInput key={p.name} param={p} value={paramValues[p.name] || ""} onChange={(v) => setParam(p.name, v)} />
              ))}
            </div>
          )}

          {queryParams.length > 0 && (
            <div style={{ marginBottom: 4 }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "var(--txM)", marginBottom: 6, letterSpacing: "0.05em" }}>
                Query Parameters
              </div>
              {queryParams.map((p) => (
                <ParamInput key={p.name} param={p} value={paramValues[p.name] || ""} onChange={(v) => setParam(p.name, v)} />
              ))}
            </div>
          )}

          {headerParams.length > 0 && (
            <div style={{ marginBottom: 4 }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "var(--txM)", marginBottom: 6, letterSpacing: "0.05em" }}>
                Header Parameters
              </div>
              {headerParams.map((p) => (
                <ParamInput key={p.name} param={p} value={paramValues[p.name] || ""} onChange={(v) => setParam(p.name, v)} />
              ))}
            </div>
          )}

          {/* Request body */}
          {hasBody && (
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 3, color: "var(--tx)" }}>
                Request Body
              </label>
              <textarea
                data-testid="request-body"
                style={{
                  ...inputStyle,
                  minHeight: 100,
                  resize: "vertical",
                  lineHeight: 1.5,
                }}
                value={bodyText}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBodyText(e.target.value)}
              />
            </div>
          )}

          {/* Send button */}
          <button
            data-testid="send-request"
            onClick={sendRequest}
            disabled={loading}
            style={{
              padding: "8px 20px",
              borderRadius: 4,
              border: "none",
              background: "var(--ac)",
              color: "#fff",
              fontWeight: 600,
              fontSize: 13,
              cursor: loading ? "wait" : "pointer",
              opacity: loading ? 0.7 : 1,
              fontFamily: "inherit",
            }}
          >
            {loading ? "Sending..." : "Send Request"}
          </button>

          {/* Error display */}
          {error && (
            <div
              data-testid="playground-error"
              style={{
                marginTop: 12,
                padding: "10px 14px",
                borderRadius: 4,
                background: "#ef444418",
                border: "1px solid #ef444444",
                color: "#ef4444",
                fontSize: 13,
              }}
            >
              {error}
            </div>
          )}

          {/* Response display */}
          {response && (
            <div data-testid="playground-response" style={{ marginTop: 12 }}>
              {/* Status line */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span
                  data-testid="response-status"
                  style={{
                    padding: "2px 10px",
                    borderRadius: 4,
                    fontSize: 13,
                    fontWeight: 700,
                    fontFamily: "var(--font-code, monospace)",
                    color: "#fff",
                    background: statusColor(response.status),
                  }}
                >
                  {response.status} {response.statusText}
                </span>
                <span style={{ fontSize: 12, color: "var(--txM)" }}>
                  {response.time}ms
                </span>
              </div>

              {/* Response headers (collapsible) */}
              <button
                data-testid="toggle-headers"
                onClick={() => setHeadersOpen(!headersOpen)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 12,
                  color: "var(--txM)",
                  padding: "4px 0",
                  fontFamily: "inherit",
                  marginBottom: 4,
                }}
              >
                <span style={{ transform: headersOpen ? "rotate(90deg)" : "rotate(0)", transition: "transform 0.15s" }}>
                  {"\u25B6"}
                </span>
                Response Headers
              </button>
              {headersOpen && (
                <pre
                  style={{
                    background: "var(--sf)",
                    padding: 10,
                    borderRadius: 4,
                    fontSize: 11,
                    fontFamily: "var(--font-code, monospace)",
                    overflow: "auto",
                    lineHeight: 1.5,
                    marginBottom: 8,
                    color: "var(--tx2)",
                    margin: "0 0 8px 0",
                  }}
                >
                  {Object.entries(response.headers)
                    .map(([k, v]) => `${k}: ${v}`)
                    .join("\n")}
                </pre>
              )}

              {/* Response body */}
              <pre
                data-testid="response-body"
                style={{
                  background: "var(--cdBg)",
                  color: "var(--cdTx)",
                  padding: 14,
                  borderRadius: 6,
                  fontSize: 12,
                  fontFamily: "var(--font-code, monospace)",
                  overflow: "auto",
                  lineHeight: 1.6,
                  margin: 0,
                  maxHeight: 400,
                }}
              >
                {response.body}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
