import { useState } from "react";

// ── TYPES (mirrored for components package independence) ──

export interface AsyncApiParameter {
  name: string;
  description?: string;
  schema?: { type?: string; [key: string]: unknown };
}

export interface AsyncApiMessage {
  name?: string;
  title?: string;
  summary?: string;
  description?: string;
  contentType?: string;
  payload?: Record<string, unknown>;
  examples?: Array<{ name?: string; payload?: unknown }>;
}

export interface AsyncApiOperation {
  operationId?: string;
  summary?: string;
  description?: string;
  message?: AsyncApiMessage;
  tags?: Array<{ name: string }>;
}

export interface AsyncApiChannel {
  name: string;
  description?: string;
  parameters?: AsyncApiParameter[];
  publish?: AsyncApiOperation;
  subscribe?: AsyncApiOperation;
  tags: string[];
}

export interface AsyncApiServer {
  name: string;
  url: string;
  protocol: string;
  description?: string;
}

export interface AsyncApiManifest {
  title: string;
  version: string;
  description?: string;
  servers: AsyncApiServer[];
  channels: AsyncApiChannel[];
  tags: Array<{ name: string; description?: string }>;
}

// ── PROTOCOL BADGE ─────────────────────────────────────

const protocolColors: Record<string, string> = {
  ws: "#3b82f6",
  wss: "#3b82f6",
  mqtt: "#22c55e",
  mqtts: "#22c55e",
  kafka: "#a855f7",
  amqp: "#f59e0b",
  amqps: "#f59e0b",
};

export interface ProtocolBadgeProps {
  protocol: string;
}

export function ProtocolBadge({ protocol }: ProtocolBadgeProps) {
  const color = protocolColors[protocol.toLowerCase()] || "#6b7280";
  return (
    <span
      data-testid="protocol-badge"
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
      {protocol.toUpperCase()}
    </span>
  );
}

// ── DIRECTION BADGE ────────────────────────────────────

const directionConfig: Record<string, { label: string; color: string }> = {
  publish: { label: "PUB", color: "#3b82f6" },
  subscribe: { label: "SUB", color: "#22c55e" },
};

export interface DirectionBadgeProps {
  direction: "publish" | "subscribe";
}

export function DirectionBadge({ direction }: DirectionBadgeProps) {
  const config = directionConfig[direction];
  return (
    <span
      data-testid="direction-badge"
      style={{
        display: "inline-block",
        padding: "2px 8px",
        borderRadius: 4,
        fontSize: 11,
        fontWeight: 700,
        fontFamily: "var(--font-code, monospace)",
        textTransform: "uppercase",
        color: "#fff",
        background: config.color,
        letterSpacing: "0.05em",
      }}
    >
      {config.label}
    </span>
  );
}

// ── ASYNC PARAMETER TABLE ──────────────────────────────

export interface AsyncParameterTableProps {
  parameters: AsyncApiParameter[];
}

export function AsyncParameterTable({ parameters }: AsyncParameterTableProps) {
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
                  color: "var(--ac)",
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
                {param.schema?.type || "string"}
              </td>
              <td style={{ padding: "8px 12px", color: "var(--tx2)" }}>
                {param.description || "\u2014"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── MESSAGE BLOCK ──────────────────────────────────────

export interface MessageBlockProps {
  message: AsyncApiMessage;
}

export function MessageBlock({ message }: MessageBlockProps) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        {message.name && (
          <span
            style={{
              fontFamily: "var(--font-code, monospace)",
              fontSize: 13,
              fontWeight: 600,
              color: "var(--tx)",
            }}
          >
            {message.name}
          </span>
        )}
        {message.contentType && (
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
            {message.contentType}
          </span>
        )}
      </div>
      {message.title && (
        <h5 style={{ fontSize: 14, fontWeight: 600, marginTop: 0, marginBottom: 4, color: "var(--tx)" }}>
          {message.title}
        </h5>
      )}
      {message.summary && (
        <p style={{ fontSize: 13, color: "var(--tx2)", marginTop: 0, marginBottom: 4 }}>
          {message.summary}
        </p>
      )}
      {message.description && (
        <p style={{ fontSize: 13, color: "var(--tx2)", marginTop: 0, marginBottom: 8 }}>
          {message.description}
        </p>
      )}
      {message.payload && (
        <div style={{ marginBottom: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "var(--txM)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Payload Schema
          </div>
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
            {JSON.stringify(message.payload, null, 2)}
          </pre>
        </div>
      )}
      {message.examples && message.examples.length > 0 && (
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: "var(--txM)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Examples
          </div>
          {message.examples.map((ex, i) => (
            <div key={i} style={{ marginBottom: 8 }}>
              {ex.name && (
                <div style={{ fontSize: 12, color: "var(--tx2)", marginBottom: 2 }}>{ex.name}</div>
              )}
              <pre
                style={{
                  background: "var(--cdBg)",
                  color: "var(--cdTx)",
                  padding: 12,
                  borderRadius: 6,
                  fontSize: 12,
                  fontFamily: "var(--font-code, monospace)",
                  overflow: "auto",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {JSON.stringify(ex.payload, null, 2)}
              </pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── CHANNEL CARD ───────────────────────────────────────

export interface ChannelCardProps {
  channel: AsyncApiChannel;
  servers?: AsyncApiServer[];
  defaultExpanded?: boolean;
}

export function ChannelCard({ channel, servers, defaultExpanded = false }: ChannelCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const channelId = channel.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  // Determine protocols from servers
  const protocols = servers
    ? [...new Set(servers.map((s) => s.protocol))]
    : [];

  const hasDetails =
    !!channel.description ||
    (channel.parameters && channel.parameters.length > 0) ||
    !!channel.publish ||
    !!channel.subscribe;

  return (
    <div
      id={channelId}
      style={{
        border: "1px solid var(--bd)",
        borderRadius: 8,
        marginBottom: 12,
        overflow: "hidden",
        scrollMarginTop: 24,
      }}
    >
      {/* Header */}
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
        {protocols.map((p) => (
          <ProtocolBadge key={p} protocol={p} />
        ))}

        {channel.publish && <DirectionBadge direction="publish" />}
        {channel.subscribe && <DirectionBadge direction="subscribe" />}

        <span
          style={{
            fontFamily: "var(--font-code, monospace)",
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          {channel.name}
        </span>

        {channel.tags.map((tag) => (
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

        {(channel.publish?.summary || channel.subscribe?.summary) && (
          <span style={{ fontSize: 13, color: "var(--tx2)", marginRight: 8 }}>
            {channel.publish?.summary || channel.subscribe?.summary}
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
          {channel.description && (
            <p style={{ fontSize: 14, color: "var(--tx2)", lineHeight: 1.65, marginTop: 0, marginBottom: 16 }}>
              {channel.description}
            </p>
          )}

          {channel.parameters && channel.parameters.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <h4 style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: "var(--tx)" }}>
                Parameters
              </h4>
              <AsyncParameterTable parameters={channel.parameters} />
            </div>
          )}

          {channel.publish && (
            <div style={{ marginBottom: 16 }}>
              <h4 style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: "var(--tx)" }}>
                Publish
              </h4>
              {channel.publish.description && (
                <p style={{ fontSize: 13, color: "var(--tx2)", marginTop: 0, marginBottom: 8 }}>
                  {channel.publish.description}
                </p>
              )}
              {channel.publish.message && <MessageBlock message={channel.publish.message} />}
            </div>
          )}

          {channel.subscribe && (
            <div style={{ marginBottom: 16 }}>
              <h4 style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: "var(--tx)" }}>
                Subscribe
              </h4>
              {channel.subscribe.description && (
                <p style={{ fontSize: 13, color: "var(--tx2)", marginTop: 0, marginBottom: 8 }}>
                  {channel.subscribe.description}
                </p>
              )}
              {channel.subscribe.message && <MessageBlock message={channel.subscribe.message} />}
            </div>
          )}

          {/* Code samples section */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: "var(--tx)" }}>
              Code Examples
            </h4>
            <AsyncCodeExamples channel={channel} servers={servers} />
          </div>
        </div>
      )}
    </div>
  );
}

// ── ASYNC CODE EXAMPLES ────────────────────────────────

function generateWsCode(channel: AsyncApiChannel): string {
  const lines: string[] = [];
  lines.push(`const ws = new WebSocket("wss://example.com${channel.name}");`);
  lines.push("");
  if (channel.subscribe) {
    lines.push("ws.addEventListener(\"message\", (event) => {");
    lines.push("  console.log(JSON.parse(event.data));");
    lines.push("});");
    lines.push("");
  }
  if (channel.publish) {
    lines.push("ws.addEventListener(\"open\", () => {");
    if (channel.publish.message?.payload) {
      lines.push(`  ws.send(JSON.stringify(${JSON.stringify(channel.publish.message.payload, null, 2).replace(/\n/g, "\n  ")}));`);
    } else {
      lines.push("  ws.send(JSON.stringify({ /* payload */ }));");
    }
    lines.push("});");
  }
  return lines.join("\n");
}

function generateMqttCode(channel: AsyncApiChannel): string {
  const lines: string[] = [];
  lines.push("import mqtt from \"mqtt\";");
  lines.push("");
  lines.push("const client = mqtt.connect(\"mqtt://broker.example.com\");");
  lines.push("");
  if (channel.subscribe) {
    lines.push(`client.subscribe("${channel.name}");`);
    lines.push("client.on(\"message\", (topic, message) => {");
    lines.push("  console.log(JSON.parse(message.toString()));");
    lines.push("});");
    lines.push("");
  }
  if (channel.publish) {
    if (channel.publish.message?.payload) {
      lines.push(`client.publish("${channel.name}", JSON.stringify(${JSON.stringify(channel.publish.message.payload)}));`);
    } else {
      lines.push(`client.publish("${channel.name}", JSON.stringify({ /* payload */ }));`);
    }
  }
  return lines.join("\n");
}

interface AsyncCodeExamplesProps {
  channel: AsyncApiChannel;
  servers?: AsyncApiServer[];
}

function AsyncCodeExamples({ channel, servers }: AsyncCodeExamplesProps) {
  const [active, setActive] = useState(0);

  const tabs: string[] = ["WebSocket", "MQTT"];
  const examples: string[] = [
    generateWsCode(channel),
    generateMqttCode(channel),
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

// ── ASYNC API REFERENCE (full page) ────────────────────

export interface AsyncApiReferenceProps {
  manifest: AsyncApiManifest;
}

export function AsyncApiReference({ manifest }: AsyncApiReferenceProps) {
  // Group channels by their first tag (or "Other" if untagged)
  const grouped = new Map<string, AsyncApiChannel[]>();
  for (const ch of manifest.channels) {
    const tag = ch.tags.length > 0 ? ch.tags[0] : "Other";
    if (!grouped.has(tag)) grouped.set(tag, []);
    grouped.get(tag)!.push(ch);
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
        data-testid="asyncapi-toc"
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
          Channels
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
              {(grouped.get(tag) || []).map((ch) => {
                const chId = ch.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                return (
                  <a
                    key={ch.name}
                    href={`#${chId}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(chId)?.scrollIntoView({ behavior: "smooth", block: "start" });
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
                    <span style={{ fontFamily: "var(--font-code, monospace)" }}>
                      {ch.name}
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
          </div>
          {manifest.description && (
            <p style={{ fontSize: 14, color: "var(--tx2)", lineHeight: 1.65, marginTop: 0 }}>
              {manifest.description}
            </p>
          )}
        </div>

        {/* Servers section */}
        {manifest.servers.length > 0 && (
          <div data-testid="servers-section" style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Servers</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {manifest.servers.map((server) => (
                <div
                  key={server.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 14px",
                    border: "1px solid var(--bd)",
                    borderRadius: 6,
                    background: "var(--sf)",
                  }}
                >
                  <ProtocolBadge protocol={server.protocol} />
                  <span
                    style={{
                      fontFamily: "var(--font-code, monospace)",
                      fontSize: 13,
                      fontWeight: 500,
                      color: "var(--tx)",
                    }}
                  >
                    {server.name}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-code, monospace)",
                      fontSize: 12,
                      color: "var(--tx2)",
                    }}
                  >
                    {server.url}
                  </span>
                  {server.description && (
                    <span style={{ fontSize: 12, color: "var(--txM)" }}>
                      {server.description}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Channel groups */}
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
            {(grouped.get(tag) || []).map((ch) => (
              <ChannelCard
                key={ch.name}
                channel={ch}
                servers={manifest.servers}
              />
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
