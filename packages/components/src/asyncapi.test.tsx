import { describe, it, expect, beforeAll } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import {
  ProtocolBadge,
  DirectionBadge,
  AsyncParameterTable,
  MessageBlock,
  ChannelCard,
  AsyncApiReference,
} from "./asyncapi.js";
import type {
  AsyncApiChannel,
  AsyncApiManifest,
  AsyncApiMessage,
  AsyncApiParameter,
} from "./asyncapi.js";

// ── Shared fixtures ─────────────────────────────────────

const sampleParameters: AsyncApiParameter[] = [
  { name: "userId", description: "The user identifier", schema: { type: "string" } },
  { name: "eventType", description: "Type of event", schema: { type: "string" } },
];

const sampleMessage: AsyncApiMessage = {
  name: "UserSignedUp",
  title: "User Signed Up",
  summary: "A new user has registered",
  description: "Fired whenever a user completes the signup flow",
  contentType: "application/json",
  payload: { userId: "string", email: "string", createdAt: "string" },
  examples: [
    { name: "Basic example", payload: { userId: "123", email: "alice@example.com", createdAt: "2024-01-01" } },
  ],
};

const sampleChannel: AsyncApiChannel = {
  name: "user/signedup",
  description: "Channel for user signup events",
  parameters: sampleParameters,
  publish: {
    operationId: "publishUserSignedup",
    summary: "Publish a signup event",
    description: "Send a user signup event to the channel",
    message: sampleMessage,
  },
  subscribe: {
    operationId: "subscribeUserSignedup",
    summary: "Receive signup events",
    description: "Listen for user signup events",
    message: {
      name: "UserSignedUpNotification",
      title: "Signup Notification",
      contentType: "application/json",
      payload: { userId: "string", timestamp: "string" },
    },
  },
  tags: ["Users"],
};

// ── ProtocolBadge ───────────────────────────────────────

describe("ProtocolBadge", () => {
  it("renders the protocol name uppercased", () => {
    render(<ProtocolBadge protocol="mqtt" />);
    const badge = screen.getByTestId("protocol-badge");
    expect(badge.textContent).toBe("MQTT");
  });

  it("applies the correct background color for each protocol", () => {
    const protocols: Array<{ protocol: string; color: string }> = [
      { protocol: "ws", color: "rgb(59, 130, 246)" },
      { protocol: "wss", color: "rgb(59, 130, 246)" },
      { protocol: "mqtt", color: "rgb(34, 197, 94)" },
      { protocol: "mqtts", color: "rgb(34, 197, 94)" },
      { protocol: "kafka", color: "rgb(168, 85, 247)" },
      { protocol: "amqp", color: "rgb(245, 158, 11)" },
      { protocol: "amqps", color: "rgb(245, 158, 11)" },
    ];

    for (const { protocol, color } of protocols) {
      const { unmount } = render(<ProtocolBadge protocol={protocol} />);
      const badge = screen.getByTestId("protocol-badge");
      expect(badge.style.background).toBe(color);
      unmount();
    }
  });

  it("falls back to gray for unknown protocols", () => {
    render(<ProtocolBadge protocol="stomp" />);
    const badge = screen.getByTestId("protocol-badge");
    // #6b7280 normalized by jsdom
    expect(badge.style.background).toBe("rgb(107, 114, 128)");
  });
});

// ── DirectionBadge ──────────────────────────────────────

describe("DirectionBadge", () => {
  it("renders PUB for publish direction", () => {
    render(<DirectionBadge direction="publish" />);
    const badge = screen.getByTestId("direction-badge");
    expect(badge.textContent).toBe("PUB");
  });

  it("renders SUB for subscribe direction", () => {
    render(<DirectionBadge direction="subscribe" />);
    const badge = screen.getByTestId("direction-badge");
    expect(badge.textContent).toBe("SUB");
  });

  it("applies blue for publish and green for subscribe", () => {
    const { unmount } = render(<DirectionBadge direction="publish" />);
    expect(screen.getByTestId("direction-badge").style.background).toBe("rgb(59, 130, 246)");
    unmount();

    render(<DirectionBadge direction="subscribe" />);
    expect(screen.getByTestId("direction-badge").style.background).toBe("rgb(34, 197, 94)");
  });
});

// ── AsyncParameterTable ─────────────────────────────────

describe("AsyncParameterTable", () => {
  it("returns null for empty parameters array", () => {
    const { container } = render(<AsyncParameterTable parameters={[]} />);
    expect(container.innerHTML).toBe("");
  });

  it("renders a row for each parameter with name and type", () => {
    render(<AsyncParameterTable parameters={sampleParameters} />);
    expect(screen.getByText("userId")).toBeInTheDocument();
    expect(screen.getByText("eventType")).toBeInTheDocument();
    expect(screen.getAllByText("string")).toHaveLength(2);
  });

  it("renders parameter descriptions", () => {
    render(<AsyncParameterTable parameters={sampleParameters} />);
    expect(screen.getByText("The user identifier")).toBeInTheDocument();
    expect(screen.getByText("Type of event")).toBeInTheDocument();
  });

  it("defaults type to string when schema.type is missing", () => {
    render(<AsyncParameterTable parameters={[{ name: "foo" }]} />);
    expect(screen.getByText("string")).toBeInTheDocument();
  });
});

// ── MessageBlock ────────────────────────────────────────

describe("MessageBlock", () => {
  it("renders message name and title", () => {
    render(<MessageBlock message={sampleMessage} />);
    expect(screen.getByText("UserSignedUp")).toBeInTheDocument();
    expect(screen.getByText("User Signed Up")).toBeInTheDocument();
  });

  it("renders summary and description", () => {
    render(<MessageBlock message={sampleMessage} />);
    expect(screen.getByText("A new user has registered")).toBeInTheDocument();
    expect(screen.getByText("Fired whenever a user completes the signup flow")).toBeInTheDocument();
  });

  it("renders content type badge", () => {
    render(<MessageBlock message={sampleMessage} />);
    expect(screen.getByText("application/json")).toBeInTheDocument();
  });

  it("renders payload schema as JSON", () => {
    const { container } = render(<MessageBlock message={sampleMessage} />);
    const pres = container.querySelectorAll("pre");
    // At least one pre should contain the payload JSON
    const payloadJson = JSON.stringify(sampleMessage.payload, null, 2);
    const hasPayload = Array.from(pres).some((pre) => pre.textContent === payloadJson);
    expect(hasPayload).toBe(true);
  });

  it("renders examples when present", () => {
    render(<MessageBlock message={sampleMessage} />);
    expect(screen.getByText("Examples")).toBeInTheDocument();
    expect(screen.getByText("Basic example")).toBeInTheDocument();
  });

  it("does not render examples section when absent", () => {
    render(<MessageBlock message={{ name: "Simple", payload: { foo: "bar" } }} />);
    expect(screen.queryByText("Examples")).not.toBeInTheDocument();
  });
});

// ── ChannelCard ─────────────────────────────────────────

describe("ChannelCard", () => {
  const servers = [
    { name: "production", url: "mqtt://broker.example.com", protocol: "mqtt", description: "Production broker" },
  ];

  it("shows the channel name and protocol badge in the header", () => {
    render(<ChannelCard channel={sampleChannel} servers={servers} />);
    expect(screen.getByText("user/signedup")).toBeInTheDocument();
    expect(screen.getByTestId("protocol-badge").textContent).toBe("MQTT");
  });

  it("shows direction badges for publish and subscribe", () => {
    render(<ChannelCard channel={sampleChannel} servers={servers} />);
    const badges = screen.getAllByTestId("direction-badge");
    expect(badges).toHaveLength(2);
    expect(badges[0].textContent).toBe("PUB");
    expect(badges[1].textContent).toBe("SUB");
  });

  it("does not show details when collapsed (default)", () => {
    render(<ChannelCard channel={sampleChannel} servers={servers} />);
    expect(screen.queryByText("Parameters")).not.toBeInTheDocument();
    expect(screen.queryByText("Publish")).not.toBeInTheDocument();
    expect(screen.queryByText("Subscribe")).not.toBeInTheDocument();
  });

  it("expands to show details when header is clicked", () => {
    render(<ChannelCard channel={sampleChannel} servers={servers} />);
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByText("Parameters")).toBeInTheDocument();
    expect(screen.getByText("Publish")).toBeInTheDocument();
    expect(screen.getByText("Subscribe")).toBeInTheDocument();
    expect(screen.getByText("Code Examples")).toBeInTheDocument();
    expect(screen.getByText("Channel for user signup events")).toBeInTheDocument();
  });

  it("renders expanded initially when defaultExpanded is true", () => {
    render(<ChannelCard channel={sampleChannel} servers={servers} defaultExpanded />);
    expect(screen.getByText("Parameters")).toBeInTheDocument();
    expect(screen.getByText("Publish")).toBeInTheDocument();
    expect(screen.getByText("Subscribe")).toBeInTheDocument();
  });

  it("shows publish and subscribe operation descriptions when expanded", () => {
    render(<ChannelCard channel={sampleChannel} servers={servers} defaultExpanded />);
    expect(screen.getByText("Send a user signup event to the channel")).toBeInTheDocument();
    expect(screen.getByText("Listen for user signup events")).toBeInTheDocument();
  });

  it("has id attribute for anchor navigation", () => {
    const { container } = render(<ChannelCard channel={sampleChannel} servers={servers} />);
    const card = container.firstChild as HTMLElement;
    expect(card.id).toBe("user-signedup");
  });

  it("renders tags as labels in the header", () => {
    render(<ChannelCard channel={sampleChannel} servers={servers} />);
    expect(screen.getByText("Users")).toBeInTheDocument();
  });
});

// ── AsyncApiReference ───────────────────────────────────

describe("AsyncApiReference", () => {
  const manifest: AsyncApiManifest = {
    title: "IoT Event API",
    version: "1.0.0",
    description: "Event-driven API for IoT devices",
    servers: [
      { name: "production", url: "mqtt://broker.iot.example.com", protocol: "mqtt", description: "Production MQTT broker" },
      { name: "staging", url: "ws://staging.iot.example.com", protocol: "ws", description: "Staging WebSocket" },
    ],
    channels: [
      sampleChannel,
      {
        name: "device/telemetry",
        description: "Telemetry data from devices",
        subscribe: {
          operationId: "subscribeTelemetry",
          summary: "Receive telemetry",
          message: {
            name: "TelemetryData",
            payload: { deviceId: "string", temperature: "number" },
          },
        },
        tags: ["Devices"],
      },
    ],
    tags: [
      { name: "Users", description: "User-related events" },
      { name: "Devices", description: "Device telemetry and control" },
    ],
  };

  beforeAll(() => {
    Element.prototype.scrollIntoView = () => {};
  });

  it("renders the API title, version, and description", () => {
    render(<AsyncApiReference manifest={manifest} />);
    expect(screen.getByText("IoT Event API")).toBeInTheDocument();
    expect(screen.getByText("v1.0.0")).toBeInTheDocument();
    expect(screen.getByText("Event-driven API for IoT devices")).toBeInTheDocument();
  });

  it("renders the servers section with protocol badges", () => {
    render(<AsyncApiReference manifest={manifest} />);
    const serversSection = screen.getByTestId("servers-section");
    expect(serversSection).toBeInTheDocument();
    expect(within(serversSection).getByText("Servers")).toBeInTheDocument();
    expect(within(serversSection).getByText("production")).toBeInTheDocument();
    expect(within(serversSection).getByText("staging")).toBeInTheDocument();
    const badges = within(serversSection).getAllByTestId("protocol-badge");
    expect(badges).toHaveLength(2);
    expect(badges[0].textContent).toBe("MQTT");
    expect(badges[1].textContent).toBe("WS");
  });

  it("groups channels by tag into separate sections", () => {
    render(<AsyncApiReference manifest={manifest} />);
    const sections = screen.getAllByTestId("tag-section");
    expect(sections).toHaveLength(2);

    expect(sections[0].querySelector("h2")!.textContent).toBe("Users");
    expect(sections[1].querySelector("h2")!.textContent).toBe("Devices");
  });

  it("renders the TOC sidebar with tag links and channel entries", () => {
    render(<AsyncApiReference manifest={manifest} />);
    const toc = screen.getByTestId("asyncapi-toc");
    expect(within(toc).getByText("Channels")).toBeInTheDocument();
    expect(within(toc).getByText("Users")).toBeInTheDocument();
    expect(within(toc).getByText("Devices")).toBeInTheDocument();
    expect(within(toc).getByText("user/signedup")).toBeInTheDocument();
    expect(within(toc).getByText("device/telemetry")).toBeInTheDocument();
  });

  it("renders tag descriptions", () => {
    render(<AsyncApiReference manifest={manifest} />);
    expect(screen.getByText("User-related events")).toBeInTheDocument();
    expect(screen.getByText("Device telemetry and control")).toBeInTheDocument();
  });

  it("TOC links use onClick handler (not bare href navigation)", () => {
    render(<AsyncApiReference manifest={manifest} />);
    const toc = screen.getByTestId("asyncapi-toc");
    const links = toc.querySelectorAll("a");
    for (const link of links) {
      expect(link.getAttribute("href")).toMatch(/^#/);
      const prevented = fireEvent.click(link);
      expect(prevented).toBe(false);
    }
  });

  it("places untagged channels in Other group", () => {
    const manifestWithUntagged: AsyncApiManifest = {
      ...manifest,
      channels: [
        ...manifest.channels,
        {
          name: "misc/events",
          tags: [],
          subscribe: { message: { name: "MiscEvent" } },
        },
      ],
    };
    render(<AsyncApiReference manifest={manifestWithUntagged} />);
    const sections = screen.getAllByTestId("tag-section");
    expect(sections).toHaveLength(3);
    expect(sections[2].querySelector("h2")!.textContent).toBe("Other");
  });
});
