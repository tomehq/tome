import SwaggerParser from "@apidevtools/swagger-parser";
import type { OpenAPIV3 } from "openapi-types";

// ── TYPES ───────────────────────────────────────────────

export interface ApiParameter {
  name: string;
  in: "query" | "path" | "header" | "cookie";
  description?: string;
  required: boolean;
  type: string;
  schema?: unknown;
  example?: unknown;
}

export interface ApiRequestBody {
  description?: string;
  required: boolean;
  contentType: string;
  schema?: unknown;
  example?: unknown;
}

export interface ApiResponse {
  statusCode: string;
  description: string;
  contentType?: string;
  schema?: unknown;
}

export interface CodeSample {
  language: string;
  label: string;
  code: string;
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

// ── CODE SAMPLE GENERATION ─────────────────────────────

function buildFullUrl(
  baseUrl: string,
  path: string,
  parameters?: Array<{ name: string; in: string; example?: unknown }>,
): string {
  let resolvedPath = path;

  // Substitute path parameters with example values
  const pathParams = (parameters || []).filter((p) => p.in === "path");
  for (const p of pathParams) {
    const value = p.example != null ? String(p.example) : `{${p.name}}`;
    resolvedPath = resolvedPath.replace(`{${p.name}}`, value);
  }

  let url = baseUrl.replace(/\/$/, "") + resolvedPath;

  // Append query parameters
  const queryParams = (parameters || []).filter((p) => p.in === "query");
  if (queryParams.length > 0) {
    const qs = queryParams
      .map((p) => {
        const val = p.example != null ? String(p.example) : "VALUE";
        return `${encodeURIComponent(p.name)}=${encodeURIComponent(val)}`;
      })
      .join("&");
    url += "?" + qs;
  }

  return url;
}

const BODY_METHODS = new Set(["post", "put", "patch"]);

export function generateCodeSamples(endpoint: {
  method: string;
  path: string;
  baseUrl?: string;
  parameters?: Array<{ name: string; in: string; required?: boolean; example?: unknown }>;
  requestBody?: { contentType?: string; example?: unknown };
  auth?: { type: string; header?: string };
}): CodeSample[] {
  const base = endpoint.baseUrl || "https://api.example.com";
  const method = endpoint.method.toUpperCase();
  const methodLower = endpoint.method.toLowerCase();
  const url = buildFullUrl(base, endpoint.path, endpoint.parameters);
  const hasBody = BODY_METHODS.has(methodLower) && endpoint.requestBody;
  const bodyExample = hasBody && endpoint.requestBody?.example;
  const contentType = endpoint.requestBody?.contentType || "application/json";

  // Build auth header info
  const authHeaderName = endpoint.auth
    ? endpoint.auth.header || (endpoint.auth.type === "bearer" ? "Authorization" : "X-API-Key")
    : null;
  const authHeaderValue = endpoint.auth
    ? endpoint.auth.type === "bearer"
      ? "Bearer YOUR_TOKEN"
      : "YOUR_API_KEY"
    : null;

  // ── curl ──
  const curlParts: string[] = [`curl -X ${method} "${url}"`];
  if (authHeaderName && authHeaderValue) {
    curlParts.push(`  -H "${authHeaderName}: ${authHeaderValue}"`);
  }
  if (hasBody) {
    curlParts.push(`  -H "Content-Type: ${contentType}"`);
    if (bodyExample) {
      curlParts.push(`  -d '${JSON.stringify(bodyExample)}'`);
    }
  }
  const curlCode = curlParts.join(" \\\n");

  // ── JavaScript (fetch) ──
  const jsLines: string[] = [];
  const jsOpts: string[] = [];
  jsOpts.push(`  method: "${method}",`);
  const jsHeaders: string[] = [];
  if (authHeaderName && authHeaderValue) {
    jsHeaders.push(`    "${authHeaderName}": "${authHeaderValue}",`);
  }
  if (hasBody) {
    jsHeaders.push(`    "Content-Type": "${contentType}",`);
  }
  if (jsHeaders.length > 0) {
    jsOpts.push(`  headers: {\n${jsHeaders.join("\n")}\n  },`);
  }
  if (hasBody && bodyExample) {
    jsOpts.push(`  body: JSON.stringify(${JSON.stringify(bodyExample, null, 2).replace(/\n/g, "\n  ")}),`);
  }
  jsLines.push(`const response = await fetch("${url}", {`);
  jsLines.push(jsOpts.join("\n"));
  jsLines.push(`});`);
  jsLines.push(`const data = await response.json();`);
  const jsCode = jsLines.join("\n");

  // ── Python (requests) ──
  const pyLines: string[] = ["import requests", ""];
  const pyHeaders: Record<string, string> = {};
  if (authHeaderName && authHeaderValue) {
    pyHeaders[authHeaderName] = authHeaderValue;
  }
  if (hasBody) {
    pyHeaders["Content-Type"] = contentType;
  }
  const pyArgs: string[] = [];
  pyArgs.push(`    "${url}",`);
  if (Object.keys(pyHeaders).length > 0) {
    const headersStr = Object.entries(pyHeaders)
      .map(([k, v]) => `        "${k}": "${v}",`)
      .join("\n");
    pyArgs.push(`    headers={\n${headersStr}\n    },`);
  }
  if (hasBody && bodyExample) {
    pyArgs.push(`    json=${JSON.stringify(bodyExample)},`);
  }
  pyLines.push(`response = requests.${methodLower}(`);
  pyLines.push(pyArgs.join("\n"));
  pyLines.push(`)`);
  pyLines.push(`data = response.json()`);
  const pyCode = pyLines.join("\n");

  // ── Go (net/http) ──
  const goLines: string[] = [];
  if (hasBody && bodyExample) {
    goLines.push(`payload, _ := json.Marshal(${JSON.stringify(bodyExample)})`);
    goLines.push(`req, err := http.NewRequest("${method}", "${url}", bytes.NewBuffer(payload))`);
  } else {
    goLines.push(`req, err := http.NewRequest("${method}", "${url}", nil)`);
  }
  goLines.push(`if err != nil {`);
  goLines.push(`    log.Fatal(err)`);
  goLines.push(`}`);
  if (authHeaderName && authHeaderValue) {
    goLines.push(`req.Header.Set("${authHeaderName}", "${authHeaderValue}")`);
  }
  if (hasBody) {
    goLines.push(`req.Header.Set("Content-Type", "${contentType}")`);
  }
  goLines.push(``);
  goLines.push(`client := &http.Client{}`);
  goLines.push(`resp, err := client.Do(req)`);
  goLines.push(`if err != nil {`);
  goLines.push(`    log.Fatal(err)`);
  goLines.push(`}`);
  goLines.push(`defer resp.Body.Close()`);
  const goCode = goLines.join("\n");

  return [
    { language: "curl", label: "cURL", code: curlCode },
    { language: "javascript", label: "JavaScript", code: jsCode },
    { language: "python", label: "Python", code: pyCode },
    { language: "go", label: "Go", code: goCode },
  ];
}

// ── PARSER ──────────────────────────────────────────────

function resolveSchemaType(
  schema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject | undefined,
): string {
  if (!schema) return "unknown";
  if ("$ref" in schema) return schema.$ref.split("/").pop() || "unknown";
  if (schema.type === "array" && schema.items) {
    const itemType = resolveSchemaType(
      schema.items as OpenAPIV3.SchemaObject,
    );
    return `${itemType}[]`;
  }
  return (schema.type as string) || "unknown";
}

function extractParameters(
  params:
    | (OpenAPIV3.ParameterObject | OpenAPIV3.ReferenceObject)[]
    | undefined,
): ApiParameter[] {
  if (!params) return [];
  return params
    .filter((p): p is OpenAPIV3.ParameterObject => !("$ref" in p))
    .map((p) => ({
      name: p.name,
      in: p.in as ApiParameter["in"],
      description: p.description,
      required: p.required ?? false,
      type: resolveSchemaType(p.schema as OpenAPIV3.SchemaObject),
      schema: p.schema,
      example: p.example ?? (p.schema as OpenAPIV3.SchemaObject | undefined)?.example,
    }));
}

function extractRequestBody(
  body: OpenAPIV3.RequestBodyObject | OpenAPIV3.ReferenceObject | undefined,
): ApiRequestBody | undefined {
  if (!body || "$ref" in body) return undefined;
  const contentTypes = Object.keys(body.content || {});
  const contentType = contentTypes[0] || "application/json";
  const mediaType = body.content?.[contentType];
  return {
    description: body.description,
    required: body.required ?? false,
    contentType,
    schema: mediaType?.schema,
    example: mediaType?.example ?? (mediaType?.schema as OpenAPIV3.SchemaObject | undefined)?.example,
  };
}

function extractResponses(
  responses: OpenAPIV3.ResponsesObject | undefined,
): ApiResponse[] {
  if (!responses) return [];
  return Object.entries(responses)
    .filter(([, v]) => v && !("$ref" in v))
    .map(([code, response]) => {
      const res = response as OpenAPIV3.ResponseObject;
      const contentTypes = Object.keys(res.content || {});
      const contentType = contentTypes[0];
      const mediaType = contentType
        ? res.content?.[contentType]
        : undefined;
      return {
        statusCode: code,
        description: res.description || "",
        contentType,
        schema: mediaType?.schema,
      };
    });
}

const HTTP_METHODS = [
  "get",
  "post",
  "put",
  "delete",
  "patch",
  "head",
  "options",
] as const;

export async function parseOpenApiSpec(
  specPath: string,
): Promise<ApiManifest> {
  const api = (await SwaggerParser.validate(specPath)) as OpenAPIV3.Document;

  const baseUrl = api.servers?.[0]?.url || "https://api.example.com";
  const endpoints: ApiEndpoint[] = [];

  for (const [path, pathItem] of Object.entries(api.paths || {})) {
    if (!pathItem) continue;
    const item = pathItem as OpenAPIV3.PathItemObject;

    for (const method of HTTP_METHODS) {
      const operation = item[method];
      if (!operation) continue;

      const parameters = [
        ...extractParameters(
          item.parameters as
            | (OpenAPIV3.ParameterObject | OpenAPIV3.ReferenceObject)[]
            | undefined,
        ),
        ...extractParameters(
          operation.parameters as
            | (OpenAPIV3.ParameterObject | OpenAPIV3.ReferenceObject)[]
            | undefined,
        ),
      ];

      const requestBody = extractRequestBody(
        operation.requestBody as
          | OpenAPIV3.RequestBodyObject
          | undefined,
      );

      const codeSamples = generateCodeSamples({
        method,
        path,
        baseUrl,
        parameters,
        requestBody: requestBody
          ? { contentType: requestBody.contentType, example: requestBody.example }
          : undefined,
      });

      endpoints.push({
        method,
        path,
        operationId: operation.operationId,
        summary: operation.summary,
        description: operation.description,
        tags: operation.tags || [],
        parameters,
        requestBody,
        responses: extractResponses(operation.responses),
        deprecated: operation.deprecated ?? false,
        security: operation.security,
        codeSamples,
      });
    }
  }

  return {
    title: api.info.title,
    version: api.info.version,
    description: api.info.description,
    servers: (api.servers || []).map((s) => ({
      url: s.url,
      description: s.description,
    })),
    endpoints,
    tags: (api.tags || []).map((t) => ({
      name: t.name,
      description: t.description,
    })),
  };
}
