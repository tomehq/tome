import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdtempSync, writeFileSync, rmSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";
import { parseAsyncApiSpec, generateAsyncCodeSamples, resolveRef } from "./asyncapi.js";
import type { AsyncApiChannel, AsyncApiServer } from "./asyncapi.js";

// ── HELPERS ──────────────────────────────────────────────

function makeSpec(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    asyncapi: "2.6.0",
    info: { title: "Test Events API", version: "1.0.0", description: "A test event-driven API" },
    servers: {
      production: {
        url: "broker.example.com",
        protocol: "mqtt",
        description: "Production MQTT broker",
      },
    },
    tags: [
      { name: "users", description: "User events" },
      { name: "notifications", description: "Notification events" },
    ],
    channels: {
      "user/signedup": {
        description: "User signed up event",
        subscribe: {
          operationId: "onUserSignedUp",
          summary: "Receive user signup events",
          description: "Fired when a new user signs up",
          tags: [{ name: "users" }],
          message: {
            name: "UserSignedUp",
            title: "User Signed Up",
            summary: "A new user signed up",
            contentType: "application/json",
            payload: {
              type: "object",
              properties: {
                userId: { type: "string" },
                email: { type: "string" },
              },
            },
            examples: [
              { name: "example1", payload: { userId: "abc-123", email: "user@test.com" } },
            ],
          },
        },
        publish: {
          operationId: "publishUserSignedUp",
          summary: "Publish user signup event",
          tags: [{ name: "users" }],
          message: {
            name: "UserSignedUp",
            contentType: "application/json",
            payload: {
              type: "object",
              properties: {
                userId: { type: "string" },
                email: { type: "string" },
              },
            },
            examples: [
              { name: "example1", payload: { userId: "abc-123", email: "user@test.com" } },
            ],
          },
        },
      },
      "notifications/{userId}": {
        description: "User notifications channel",
        parameters: {
          userId: {
            description: "The user ID",
            schema: { type: "string" },
            location: "$message.payload#/userId",
          },
        },
        subscribe: {
          operationId: "onNotification",
          summary: "Receive notifications",
          tags: [{ name: "notifications" }],
          message: {
            name: "Notification",
            contentType: "application/json",
            payload: {
              type: "object",
              properties: {
                message: { type: "string" },
                level: { type: "string", enum: ["info", "warn", "error"] },
              },
            },
          },
        },
      },
    },
    ...overrides,
  };
}

function writeSpec(dir: string, spec: Record<string, unknown>, filename = "spec.json"): string {
  const filePath = join(dir, filename);
  writeFileSync(filePath, JSON.stringify(spec, null, 2));
  return filePath;
}

// ── TESTS ───────────────────────────────────────────────

let tmpDir: string;

beforeEach(() => {
  tmpDir = mkdtempSync(join(tmpdir(), "tome-asyncapi-test-"));
});

afterEach(() => {
  rmSync(tmpDir, { recursive: true, force: true });
});

// ── Basic parsing ───────────────────────────────────────

describe("basic parsing", () => {
  it("parses a valid AsyncAPI 2.x spec from a JSON file", async () => {
    const specPath = writeSpec(tmpDir, makeSpec());
    const manifest = await parseAsyncApiSpec(specPath);
    expect(manifest).toBeDefined();
    expect(manifest.title).toBe("Test Events API");
  });

  it("parses a valid AsyncAPI 2.x spec from a YAML file", async () => {
    const yamlContent = `asyncapi: "2.6.0"
info:
  title: YAML Events API
  version: "2.0.0"
  description: A YAML test API
servers:
  dev:
    url: localhost:1883
    protocol: mqtt
    description: Dev broker
channels:
  items/created:
    subscribe:
      operationId: onItemCreated
      summary: Item created
      message:
        payload:
          type: object
`;
    const specPath = join(tmpDir, "spec.yaml");
    writeFileSync(specPath, yamlContent);
    const manifest = await parseAsyncApiSpec(specPath);
    expect(manifest.title).toBe("YAML Events API");
    expect(manifest.version).toBe("2.0.0");
  });

  it("extracts API title, version, and description", async () => {
    const specPath = writeSpec(tmpDir, makeSpec());
    const manifest = await parseAsyncApiSpec(specPath);
    expect(manifest.title).toBe("Test Events API");
    expect(manifest.version).toBe("1.0.0");
    expect(manifest.description).toBe("A test event-driven API");
  });

  it("extracts servers with protocols", async () => {
    const specPath = writeSpec(tmpDir, makeSpec());
    const manifest = await parseAsyncApiSpec(specPath);
    expect(manifest.servers).toHaveLength(1);
    expect(manifest.servers[0].name).toBe("production");
    expect(manifest.servers[0].url).toBe("broker.example.com");
    expect(manifest.servers[0].protocol).toBe("mqtt");
    expect(manifest.servers[0].description).toBe("Production MQTT broker");
  });

  it("extracts tags at the manifest level", async () => {
    const specPath = writeSpec(tmpDir, makeSpec());
    const manifest = await parseAsyncApiSpec(specPath);
    expect(manifest.tags).toHaveLength(2);
    expect(manifest.tags[0].name).toBe("users");
    expect(manifest.tags[0].description).toBe("User events");
    expect(manifest.tags[1].name).toBe("notifications");
  });
});

// ── Channel extraction ─────────────────────────────────

describe("channel extraction", () => {
  it("extracts channels with subscribe operations", async () => {
    const specPath = writeSpec(tmpDir, makeSpec());
    const manifest = await parseAsyncApiSpec(specPath);
    const userChannel = manifest.channels.find((c) => c.name === "user/signedup");
    expect(userChannel).toBeDefined();
    expect(userChannel!.subscribe).toBeDefined();
    expect(userChannel!.subscribe!.operationId).toBe("onUserSignedUp");
    expect(userChannel!.subscribe!.summary).toBe("Receive user signup events");
    expect(userChannel!.subscribe!.description).toBe("Fired when a new user signs up");
  });

  it("extracts channels with publish operations", async () => {
    const specPath = writeSpec(tmpDir, makeSpec());
    const manifest = await parseAsyncApiSpec(specPath);
    const userChannel = manifest.channels.find((c) => c.name === "user/signedup");
    expect(userChannel).toBeDefined();
    expect(userChannel!.publish).toBeDefined();
    expect(userChannel!.publish!.operationId).toBe("publishUserSignedUp");
  });

  it("extracts channel descriptions", async () => {
    const specPath = writeSpec(tmpDir, makeSpec());
    const manifest = await parseAsyncApiSpec(specPath);
    const userChannel = manifest.channels.find((c) => c.name === "user/signedup");
    expect(userChannel!.description).toBe("User signed up event");
  });

  it("extracts channel tags from operations", async () => {
    const specPath = writeSpec(tmpDir, makeSpec());
    const manifest = await parseAsyncApiSpec(specPath);
    const userChannel = manifest.channels.find((c) => c.name === "user/signedup");
    expect(userChannel!.tags).toContain("users");
  });

  it("extracts multiple channels", async () => {
    const specPath = writeSpec(tmpDir, makeSpec());
    const manifest = await parseAsyncApiSpec(specPath);
    expect(manifest.channels).toHaveLength(2);
    const names = manifest.channels.map((c) => c.name).sort();
    expect(names).toEqual(["notifications/{userId}", "user/signedup"]);
  });
});

// ── Message extraction ─────────────────────────────────

describe("message extraction", () => {
  it("extracts message name and title", async () => {
    const specPath = writeSpec(tmpDir, makeSpec());
    const manifest = await parseAsyncApiSpec(specPath);
    const userChannel = manifest.channels.find((c) => c.name === "user/signedup");
    const msg = userChannel!.subscribe!.message!;
    expect(msg.name).toBe("UserSignedUp");
    expect(msg.title).toBe("User Signed Up");
  });

  it("extracts message payload schema", async () => {
    const specPath = writeSpec(tmpDir, makeSpec());
    const manifest = await parseAsyncApiSpec(specPath);
    const userChannel = manifest.channels.find((c) => c.name === "user/signedup");
    const msg = userChannel!.subscribe!.message!;
    expect(msg.payload).toBeDefined();
    const payload = msg.payload as Record<string, unknown>;
    expect(payload.type).toBe("object");
    expect(payload.properties).toBeDefined();
  });

  it("extracts message content type", async () => {
    const specPath = writeSpec(tmpDir, makeSpec());
    const manifest = await parseAsyncApiSpec(specPath);
    const userChannel = manifest.channels.find((c) => c.name === "user/signedup");
    const msg = userChannel!.subscribe!.message!;
    expect(msg.contentType).toBe("application/json");
  });

  it("extracts message examples", async () => {
    const specPath = writeSpec(tmpDir, makeSpec());
    const manifest = await parseAsyncApiSpec(specPath);
    const userChannel = manifest.channels.find((c) => c.name === "user/signedup");
    const msg = userChannel!.subscribe!.message!;
    expect(msg.examples).toBeDefined();
    expect(msg.examples).toHaveLength(1);
    expect(msg.examples![0].name).toBe("example1");
    expect(msg.examples![0].payload).toEqual({ userId: "abc-123", email: "user@test.com" });
  });
});

// ── Parameter extraction ───────────────────────────────

describe("parameter extraction", () => {
  it("extracts channel parameters with description", async () => {
    const specPath = writeSpec(tmpDir, makeSpec());
    const manifest = await parseAsyncApiSpec(specPath);
    const notifChannel = manifest.channels.find((c) => c.name === "notifications/{userId}");
    expect(notifChannel).toBeDefined();
    expect(notifChannel!.parameters).toHaveLength(1);
    const param = notifChannel!.parameters[0];
    expect(param.name).toBe("userId");
    expect(param.description).toBe("The user ID");
  });

  it("extracts parameter schema", async () => {
    const specPath = writeSpec(tmpDir, makeSpec());
    const manifest = await parseAsyncApiSpec(specPath);
    const notifChannel = manifest.channels.find((c) => c.name === "notifications/{userId}");
    const param = notifChannel!.parameters[0];
    expect(param.schema).toBeDefined();
    const schema = param.schema as Record<string, unknown>;
    expect(schema.type).toBe("string");
  });

  it("extracts parameter location", async () => {
    const specPath = writeSpec(tmpDir, makeSpec());
    const manifest = await parseAsyncApiSpec(specPath);
    const notifChannel = manifest.channels.find((c) => c.name === "notifications/{userId}");
    const param = notifChannel!.parameters[0];
    expect(param.location).toBe("$message.payload#/userId");
  });
});

// ── $ref resolution ────────────────────────────────────

describe("$ref resolution", () => {
  it("resolves internal $ref pointers", () => {
    const root = {
      components: {
        messages: {
          UserEvent: { name: "UserEvent", payload: { type: "object" } },
        },
      },
    };
    const ref = { $ref: "#/components/messages/UserEvent" };
    const result = resolveRef(ref, root) as Record<string, unknown>;
    expect(result.name).toBe("UserEvent");
    expect((result.payload as Record<string, unknown>).type).toBe("object");
  });

  it("resolves nested $ref pointers", () => {
    const root = {
      components: {
        schemas: {
          Email: { type: "string", format: "email" },
        },
        messages: {
          UserEvent: {
            payload: { $ref: "#/components/schemas/Email" },
          },
        },
      },
    };
    const ref = { $ref: "#/components/messages/UserEvent" };
    const result = resolveRef(ref, root) as Record<string, unknown>;
    const payload = result.payload as Record<string, unknown>;
    expect(payload.type).toBe("string");
    expect(payload.format).toBe("email");
  });

  it("resolves $ref in parsed AsyncAPI spec", async () => {
    const spec = makeSpec({
      channels: {
        "events/user": {
          subscribe: {
            operationId: "onUser",
            summary: "User event",
            message: { $ref: "#/components/messages/UserMessage" },
          },
        },
      },
      components: {
        messages: {
          UserMessage: {
            name: "UserMessage",
            contentType: "application/json",
            payload: {
              type: "object",
              properties: { id: { type: "string" } },
            },
          },
        },
      },
    });
    const specPath = writeSpec(tmpDir, spec);
    const manifest = await parseAsyncApiSpec(specPath);
    const channel = manifest.channels.find((c) => c.name === "events/user");
    expect(channel!.subscribe!.message).toBeDefined();
    expect(channel!.subscribe!.message!.name).toBe("UserMessage");
    expect(channel!.subscribe!.message!.contentType).toBe("application/json");
  });

  it("returns primitives unchanged", () => {
    expect(resolveRef("hello", {})).toBe("hello");
    expect(resolveRef(42, {})).toBe(42);
    expect(resolveRef(null, {})).toBe(null);
    expect(resolveRef(undefined, {})).toBe(undefined);
  });

  it("resolves arrays of $refs", () => {
    const root = {
      components: { schemas: { Name: { type: "string" } } },
    };
    const arr = [{ $ref: "#/components/schemas/Name" }, { type: "number" }];
    const result = resolveRef(arr, root) as Array<Record<string, unknown>>;
    expect(result[0].type).toBe("string");
    expect(result[1].type).toBe("number");
  });
});

// ── Code sample generation ─────────────────────────────

describe("generateAsyncCodeSamples", () => {
  const baseChannel: AsyncApiChannel = {
    name: "user/signedup",
    parameters: [],
    tags: ["users"],
    publish: {
      operationId: "pub",
      tags: [],
      message: {
        name: "UserSignedUp",
        contentType: "application/json",
        payload: { type: "object" },
        examples: [{ name: "ex1", payload: { userId: "123" } }],
      },
    },
    subscribe: {
      operationId: "sub",
      tags: [],
      message: {
        name: "UserSignedUp",
        contentType: "application/json",
        payload: { type: "object" },
      },
    },
  };

  it("generates WebSocket code samples", () => {
    const server: AsyncApiServer = {
      name: "ws-server",
      url: "ws.example.com",
      protocol: "ws",
    };
    const samples = generateAsyncCodeSamples(baseChannel, server);
    expect(samples).toHaveLength(1);
    expect(samples[0].label).toBe("WebSocket");
    expect(samples[0].language).toBe("javascript");
    expect(samples[0].code).toContain("new WebSocket(");
    expect(samples[0].code).toContain("ws://ws.example.com/user/signedup");
    expect(samples[0].code).toContain("ws.onmessage");
    expect(samples[0].code).toContain("ws.send(");
  });

  it("generates MQTT code samples", () => {
    const server: AsyncApiServer = {
      name: "mqtt-server",
      url: "broker.example.com",
      protocol: "mqtt",
    };
    const samples = generateAsyncCodeSamples(baseChannel, server);
    expect(samples).toHaveLength(1);
    expect(samples[0].label).toBe("MQTT");
    expect(samples[0].code).toContain('import mqtt from "mqtt"');
    expect(samples[0].code).toContain("mqtt.connect(");
    expect(samples[0].code).toContain("mqtt://broker.example.com");
    expect(samples[0].code).toContain(`subscribe("user/signedup")`);
  });

  it("generates Kafka code samples", () => {
    const server: AsyncApiServer = {
      name: "kafka-server",
      url: "kafka.example.com:9092",
      protocol: "kafka",
    };
    const samples = generateAsyncCodeSamples(baseChannel, server);
    expect(samples).toHaveLength(1);
    expect(samples[0].label).toBe("Kafka");
    expect(samples[0].code).toContain('import { Kafka } from "kafkajs"');
    expect(samples[0].code).toContain("kafka.example.com:9092");
    expect(samples[0].code).toContain(`subscribe({ topic: "user/signedup" })`);
    expect(samples[0].code).toContain("consumer.run(");
  });

  it("generates AMQP code samples", () => {
    const server: AsyncApiServer = {
      name: "amqp-server",
      url: "rabbitmq.example.com",
      protocol: "amqp",
    };
    const samples = generateAsyncCodeSamples(baseChannel, server);
    expect(samples).toHaveLength(1);
    expect(samples[0].label).toBe("AMQP");
    expect(samples[0].code).toContain('import amqp from "amqplib"');
    expect(samples[0].code).toContain("amqp.connect(");
    expect(samples[0].code).toContain("amqp://rabbitmq.example.com");
    expect(samples[0].code).toContain(`assertQueue("user/signedup")`);
  });

  it("generates fallback code sample for unknown protocols", () => {
    const server: AsyncApiServer = {
      name: "custom-server",
      url: "custom.example.com",
      protocol: "stomp",
    };
    const samples = generateAsyncCodeSamples(baseChannel, server);
    expect(samples).toHaveLength(1);
    expect(samples[0].label).toBe("STOMP");
    expect(samples[0].code).toContain("stomp://custom.example.com/user/signedup");
  });

  it("uses default ws protocol when no server provided", () => {
    const samples = generateAsyncCodeSamples(baseChannel);
    expect(samples).toHaveLength(1);
    expect(samples[0].label).toBe("WebSocket");
    expect(samples[0].code).toContain("new WebSocket(");
  });

  it("handles wss protocol correctly", () => {
    const server: AsyncApiServer = {
      name: "wss-server",
      url: "secure.example.com",
      protocol: "wss",
    };
    const samples = generateAsyncCodeSamples(baseChannel, server);
    expect(samples[0].code).toContain("wss://secure.example.com/user/signedup");
  });

  it("handles mqtts protocol correctly", () => {
    const server: AsyncApiServer = {
      name: "mqtts-server",
      url: "secure-broker.example.com",
      protocol: "mqtts",
    };
    const samples = generateAsyncCodeSamples(baseChannel, server);
    expect(samples[0].label).toBe("MQTT");
    expect(samples[0].code).toContain("mqtts://secure-broker.example.com");
  });
});

// ── Error handling ──────────────────────────────────────

describe("error handling", () => {
  it("throws on missing file", async () => {
    const specPath = join(tmpDir, "nonexistent.json");
    await expect(parseAsyncApiSpec(specPath)).rejects.toThrow("not found");
  });

  it("throws on invalid JSON", async () => {
    const specPath = join(tmpDir, "bad.json");
    writeFileSync(specPath, "{ this is not valid json }}}");
    await expect(parseAsyncApiSpec(specPath)).rejects.toThrow("invalid JSON/YAML");
  });

  it("throws when asyncapi field is missing", async () => {
    const specPath = writeSpec(tmpDir, { info: { title: "No version field" } });
    await expect(parseAsyncApiSpec(specPath)).rejects.toThrow("missing 'asyncapi' version field");
  });

  it("throws on unsupported asyncapi version (3.x)", async () => {
    const specPath = writeSpec(tmpDir, {
      asyncapi: "3.0.0",
      info: { title: "V3 API", version: "1.0.0" },
    });
    await expect(parseAsyncApiSpec(specPath)).rejects.toThrow("Unsupported AsyncAPI version");
    await expect(parseAsyncApiSpec(specPath)).rejects.toThrow("Only 2.x is supported");
  });

  it("throws on unsupported asyncapi version (1.x)", async () => {
    const specPath = writeSpec(tmpDir, {
      asyncapi: "1.2.0",
      info: { title: "V1 API", version: "1.0.0" },
    });
    await expect(parseAsyncApiSpec(specPath)).rejects.toThrow("Unsupported AsyncAPI version");
  });
});

// ── Edge cases ──────────────────────────────────────────

describe("edge cases", () => {
  it("handles spec with no channels", async () => {
    const spec = makeSpec({ channels: {} });
    const specPath = writeSpec(tmpDir, spec);
    const manifest = await parseAsyncApiSpec(specPath);
    expect(manifest.channels).toEqual([]);
  });

  it("handles spec with no servers", async () => {
    const spec = makeSpec();
    delete (spec as Record<string, unknown>).servers;
    const specPath = writeSpec(tmpDir, spec);
    const manifest = await parseAsyncApiSpec(specPath);
    expect(manifest.servers).toEqual([]);
  });

  it("handles spec with no tags", async () => {
    const spec = makeSpec();
    delete (spec as Record<string, unknown>).tags;
    const specPath = writeSpec(tmpDir, spec);
    const manifest = await parseAsyncApiSpec(specPath);
    expect(manifest.tags).toEqual([]);
  });

  it("handles channel with only subscribe (no publish)", async () => {
    const spec = makeSpec({
      channels: {
        "events/only-sub": {
          subscribe: {
            operationId: "onlySub",
            summary: "Subscribe only",
            message: { payload: { type: "string" } },
          },
        },
      },
    });
    const specPath = writeSpec(tmpDir, spec);
    const manifest = await parseAsyncApiSpec(specPath);
    const channel = manifest.channels[0];
    expect(channel.subscribe).toBeDefined();
    expect(channel.publish).toBeUndefined();
  });

  it("handles channel with only publish (no subscribe)", async () => {
    const spec = makeSpec({
      channels: {
        "events/only-pub": {
          publish: {
            operationId: "onlyPub",
            summary: "Publish only",
            message: { payload: { type: "string" } },
          },
        },
      },
    });
    const specPath = writeSpec(tmpDir, spec);
    const manifest = await parseAsyncApiSpec(specPath);
    const channel = manifest.channels[0];
    expect(channel.publish).toBeDefined();
    expect(channel.subscribe).toBeUndefined();
  });

  it("handles multiple servers with different protocols", async () => {
    const spec = makeSpec({
      servers: {
        ws: { url: "ws.example.com", protocol: "ws", description: "WebSocket" },
        mqtt: { url: "mqtt.example.com", protocol: "mqtt", description: "MQTT" },
        kafka: { url: "kafka.example.com:9092", protocol: "kafka", description: "Kafka" },
      },
    });
    const specPath = writeSpec(tmpDir, spec);
    const manifest = await parseAsyncApiSpec(specPath);
    expect(manifest.servers).toHaveLength(3);
    const protocols = manifest.servers.map((s) => s.protocol).sort();
    expect(protocols).toEqual(["kafka", "mqtt", "ws"]);
  });

  it("handles channel with bindings", async () => {
    const spec = makeSpec({
      channels: {
        "events/bound": {
          bindings: {
            kafka: { topic: "custom-topic", partitions: 3 },
          },
          subscribe: {
            operationId: "onBound",
            summary: "Bound event",
            message: { payload: { type: "object" } },
          },
        },
      },
    });
    const specPath = writeSpec(tmpDir, spec);
    const manifest = await parseAsyncApiSpec(specPath);
    const channel = manifest.channels[0];
    expect(channel.bindings).toBeDefined();
    expect((channel.bindings as Record<string, Record<string, unknown>>).kafka.topic).toBe("custom-topic");
  });

  it("handles channel with no parameters", async () => {
    const specPath = writeSpec(tmpDir, makeSpec());
    const manifest = await parseAsyncApiSpec(specPath);
    const userChannel = manifest.channels.find((c) => c.name === "user/signedup");
    expect(userChannel!.parameters).toEqual([]);
  });
});
