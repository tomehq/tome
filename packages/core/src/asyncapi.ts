import { readFileSync } from "fs";
import { parse as parseYaml } from "yaml";

// ── TYPES ───────────────────────────────────────────────

export interface AsyncApiManifest {
  title: string;
  version: string;
  description?: string;
  servers: AsyncApiServer[];
  channels: AsyncApiChannel[];
  tags: Array<{ name: string; description?: string }>;
}

export interface AsyncApiServer {
  name: string;
  url: string;
  protocol: string; // ws, wss, mqtt, mqtts, kafka, amqp, amqps, etc.
  description?: string;
}

export interface AsyncApiChannel {
  name: string; // channel path, e.g. "user/signedup"
  description?: string;
  publish?: AsyncApiOperation;
  subscribe?: AsyncApiOperation;
  parameters: AsyncApiParameter[];
  tags: string[];
  bindings?: Record<string, unknown>;
}

export interface AsyncApiOperation {
  operationId?: string;
  summary?: string;
  description?: string;
  message?: AsyncApiMessage;
  tags: string[];
}

export interface AsyncApiMessage {
  name?: string;
  title?: string;
  summary?: string;
  description?: string;
  contentType?: string;
  payload?: unknown; // JSON Schema
  examples?: Array<{ name?: string; payload?: unknown }>;
}

export interface AsyncApiParameter {
  name: string;
  description?: string;
  schema?: unknown;
  location?: string;
}

export interface AsyncApiCodeSample {
  language: string;
  label: string;
  code: string;
}

// ── $REF RESOLUTION ─────────────────────────────────────

export function resolveRef(obj: unknown, root: unknown): unknown {
  if (obj === null || obj === undefined || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => resolveRef(item, root));
  }

  const record = obj as Record<string, unknown>;

  if (typeof record.$ref === "string") {
    const refPath = record.$ref;
    if (!refPath.startsWith("#/")) {
      return obj; // only handle internal refs
    }
    const segments = refPath.slice(2).split("/");
    let current: unknown = root;
    for (const segment of segments) {
      if (current === null || current === undefined || typeof current !== "object") {
        return obj;
      }
      current = (current as Record<string, unknown>)[segment];
    }
    return resolveRef(current, root);
  }

  const resolved: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(record)) {
    resolved[key] = resolveRef(value, root);
  }
  return resolved;
}

// ── EXTRACTION HELPERS ──────────────────────────────────

function extractOperation(
  raw: Record<string, unknown> | undefined,
  root: unknown,
): AsyncApiOperation | undefined {
  if (!raw) return undefined;
  const resolved = resolveRef(raw, root) as Record<string, unknown>;

  let message: AsyncApiMessage | undefined;
  if (resolved.message && typeof resolved.message === "object") {
    const msg = resolved.message as Record<string, unknown>;
    const resolvedMsg = resolveRef(msg, root) as Record<string, unknown>;

    let examples: Array<{ name?: string; payload?: unknown }> | undefined;
    if (Array.isArray(resolvedMsg.examples)) {
      examples = resolvedMsg.examples.map((ex: Record<string, unknown>) => ({
        name: ex.name as string | undefined,
        payload: ex.payload,
      }));
    }

    message = {
      name: resolvedMsg.name as string | undefined,
      title: resolvedMsg.title as string | undefined,
      summary: resolvedMsg.summary as string | undefined,
      description: resolvedMsg.description as string | undefined,
      contentType: resolvedMsg.contentType as string | undefined,
      payload: resolvedMsg.payload,
      examples,
    };
  }

  const tags: string[] = [];
  if (Array.isArray(resolved.tags)) {
    for (const t of resolved.tags) {
      if (typeof t === "string") {
        tags.push(t);
      } else if (t && typeof t === "object" && typeof (t as Record<string, unknown>).name === "string") {
        tags.push((t as Record<string, unknown>).name as string);
      }
    }
  }

  return {
    operationId: resolved.operationId as string | undefined,
    summary: resolved.summary as string | undefined,
    description: resolved.description as string | undefined,
    message,
    tags,
  };
}

function extractParameters(
  params: Record<string, unknown> | undefined,
  root: unknown,
): AsyncApiParameter[] {
  if (!params || typeof params !== "object") return [];
  return Object.entries(params).map(([name, value]) => {
    const resolved = resolveRef(value, root) as Record<string, unknown>;
    return {
      name,
      description: resolved.description as string | undefined,
      schema: resolved.schema,
      location: resolved.location as string | undefined,
    };
  });
}

// ── CODE SAMPLE GENERATION ─────────────────────────────

export function generateAsyncCodeSamples(
  channel: AsyncApiChannel,
  server?: AsyncApiServer,
): AsyncApiCodeSample[] {
  const protocol = server?.protocol || "ws";
  const url = server?.url || "localhost";
  const channelName = channel.name;

  switch (protocol) {
    case "ws":
    case "wss": {
      const wsUrl = url.startsWith("ws://") || url.startsWith("wss://")
        ? url
        : `${protocol}://${url}`;

      const lines: string[] = [];
      lines.push(`const ws = new WebSocket("${wsUrl}/${channelName}");`);
      lines.push(``);
      lines.push(`ws.onopen = () => {`);
      lines.push(`  console.log("Connected to ${channelName}");`);

      if (channel.publish?.message?.payload) {
        lines.push(`  ws.send(JSON.stringify(${JSON.stringify(channel.publish.message.examples?.[0]?.payload || {}, null, 2).replace(/\n/g, "\n  ")}));`);
      }

      lines.push(`};`);
      lines.push(``);
      lines.push(`ws.onmessage = (event) => {`);
      lines.push(`  const data = JSON.parse(event.data);`);
      lines.push(`  console.log("Received:", data);`);
      lines.push(`};`);

      return [{ language: "javascript", label: "WebSocket", code: lines.join("\n") }];
    }

    case "mqtt":
    case "mqtts": {
      const mqttUrl = url.startsWith("mqtt://") || url.startsWith("mqtts://")
        ? url
        : `${protocol}://${url}`;

      const lines: string[] = [];
      lines.push(`import mqtt from "mqtt";`);
      lines.push(``);
      lines.push(`const client = mqtt.connect("${mqttUrl}");`);
      lines.push(``);
      lines.push(`client.on("connect", () => {`);
      lines.push(`  client.subscribe("${channelName}");`);
      lines.push(`  console.log("Subscribed to ${channelName}");`);
      lines.push(`});`);
      lines.push(``);
      lines.push(`client.on("message", (topic, message) => {`);
      lines.push(`  const data = JSON.parse(message.toString());`);
      lines.push(`  console.log("Received:", data);`);
      lines.push(`});`);

      return [{ language: "javascript", label: "MQTT", code: lines.join("\n") }];
    }

    case "kafka": {
      const lines: string[] = [];
      lines.push(`import { Kafka } from "kafkajs";`);
      lines.push(``);
      lines.push(`const kafka = new Kafka({`);
      lines.push(`  brokers: ["${url}"],`);
      lines.push(`});`);
      lines.push(``);
      lines.push(`const consumer = kafka.consumer({ groupId: "my-group" });`);
      lines.push(``);
      lines.push(`await consumer.connect();`);
      lines.push(`await consumer.subscribe({ topic: "${channelName}" });`);
      lines.push(``);
      lines.push(`await consumer.run({`);
      lines.push(`  eachMessage: async ({ message }) => {`);
      lines.push(`    const data = JSON.parse(message.value.toString());`);
      lines.push(`    console.log("Received:", data);`);
      lines.push(`  },`);
      lines.push(`});`);

      return [{ language: "javascript", label: "Kafka", code: lines.join("\n") }];
    }

    case "amqp":
    case "amqps": {
      const amqpUrl = url.startsWith("amqp://") || url.startsWith("amqps://")
        ? url
        : `${protocol}://${url}`;

      const lines: string[] = [];
      lines.push(`import amqp from "amqplib";`);
      lines.push(``);
      lines.push(`const connection = await amqp.connect("${amqpUrl}");`);
      lines.push(`const channel = await connection.createChannel();`);
      lines.push(``);
      lines.push(`await channel.assertQueue("${channelName}");`);
      lines.push(`channel.consume("${channelName}", (msg) => {`);
      lines.push(`  const data = JSON.parse(msg.content.toString());`);
      lines.push(`  console.log("Received:", data);`);
      lines.push(`  channel.ack(msg);`);
      lines.push(`});`);

      return [{ language: "javascript", label: "AMQP", code: lines.join("\n") }];
    }

    default: {
      const code = `// Connect to ${protocol}://${url}/${channelName}`;
      return [{ language: "javascript", label: protocol.toUpperCase(), code }];
    }
  }
}

// ── PARSER ──────────────────────────────────────────────

export async function parseAsyncApiSpec(
  specPath: string,
): Promise<AsyncApiManifest> {
  // Read file
  let raw: string;
  try {
    raw = readFileSync(specPath, "utf-8");
  } catch {
    throw new Error(`AsyncAPI spec file not found: ${specPath}`);
  }

  // Parse JSON or YAML
  let doc: Record<string, unknown>;
  try {
    if (specPath.endsWith(".json")) {
      doc = JSON.parse(raw);
    } else {
      doc = parseYaml(raw) as Record<string, unknown>;
    }
  } catch {
    throw new Error(`Failed to parse AsyncAPI spec: invalid JSON/YAML in ${specPath}`);
  }

  // Validate asyncapi field
  if (!doc.asyncapi || typeof doc.asyncapi !== "string") {
    throw new Error("Invalid AsyncAPI spec: missing 'asyncapi' version field");
  }

  const asyncapiVersion = doc.asyncapi as string;
  if (!asyncapiVersion.startsWith("2.")) {
    throw new Error(
      `Unsupported AsyncAPI version: ${asyncapiVersion}. Only 2.x is supported.`,
    );
  }

  // Resolve all $refs in the document
  const resolved = resolveRef(doc, doc) as Record<string, unknown>;

  // Extract info
  const info = (resolved.info || {}) as Record<string, unknown>;
  const title = (info.title as string) || "Untitled";
  const version = (info.version as string) || "0.0.0";
  const description = info.description as string | undefined;

  // Extract servers
  const servers: AsyncApiServer[] = [];
  const rawServers = resolved.servers as Record<string, Record<string, unknown>> | undefined;
  if (rawServers && typeof rawServers === "object") {
    for (const [name, serverDef] of Object.entries(rawServers)) {
      servers.push({
        name,
        url: (serverDef.url as string) || "",
        protocol: (serverDef.protocol as string) || "unknown",
        description: serverDef.description as string | undefined,
      });
    }
  }

  // Extract channels
  const channels: AsyncApiChannel[] = [];
  const rawChannels = resolved.channels as Record<string, Record<string, unknown>> | undefined;
  if (rawChannels && typeof rawChannels === "object") {
    for (const [channelPath, channelDef] of Object.entries(rawChannels)) {
      const channelTags: string[] = [];

      const publish = extractOperation(
        channelDef.publish as Record<string, unknown> | undefined,
        resolved,
      );
      const subscribe = extractOperation(
        channelDef.subscribe as Record<string, unknown> | undefined,
        resolved,
      );

      // Collect tags from operations
      if (publish?.tags) channelTags.push(...publish.tags);
      if (subscribe?.tags) channelTags.push(...subscribe.tags);

      channels.push({
        name: channelPath,
        description: channelDef.description as string | undefined,
        publish,
        subscribe,
        parameters: extractParameters(
          channelDef.parameters as Record<string, unknown> | undefined,
          resolved,
        ),
        tags: [...new Set(channelTags)],
        bindings: channelDef.bindings as Record<string, unknown> | undefined,
      });
    }
  }

  // Extract top-level tags
  const tags: Array<{ name: string; description?: string }> = [];
  if (Array.isArray(resolved.tags)) {
    for (const t of resolved.tags) {
      if (t && typeof t === "object") {
        const tag = t as Record<string, unknown>;
        tags.push({
          name: (tag.name as string) || "",
          description: tag.description as string | undefined,
        });
      }
    }
  }

  return {
    title,
    version,
    description,
    servers,
    channels,
    tags,
  };
}
