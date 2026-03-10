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
}

export interface ApiRequestBody {
  description?: string;
  required: boolean;
  contentType: string;
  schema?: unknown;
}

export interface ApiResponse {
  statusCode: string;
  description: string;
  contentType?: string;
  schema?: unknown;
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
}

export interface ApiManifest {
  title: string;
  version: string;
  description?: string;
  servers: Array<{ url: string; description?: string }>;
  endpoints: ApiEndpoint[];
  tags: Array<{ name: string; description?: string }>;
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

  const endpoints: ApiEndpoint[] = [];

  for (const [path, pathItem] of Object.entries(api.paths || {})) {
    if (!pathItem) continue;
    const item = pathItem as OpenAPIV3.PathItemObject;

    for (const method of HTTP_METHODS) {
      const operation = item[method];
      if (!operation) continue;

      endpoints.push({
        method,
        path,
        operationId: operation.operationId,
        summary: operation.summary,
        description: operation.description,
        tags: operation.tags || [],
        parameters: [
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
        ],
        requestBody: extractRequestBody(
          operation.requestBody as
            | OpenAPIV3.RequestBodyObject
            | undefined,
        ),
        responses: extractResponses(operation.responses),
        deprecated: operation.deprecated ?? false,
        security: operation.security,
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
