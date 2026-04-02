---
title: AsyncAPI Reference
description: Generate interactive documentation for event-driven APIs using AsyncAPI 2.x specs.
---

Tome can generate documentation from AsyncAPI specifications, covering WebSocket, MQTT, Kafka, AMQP, and other event-driven protocols. This works alongside or independently of OpenAPI.

## Configuration

Point your config to an AsyncAPI spec file:

```js
// tome.config.js
export default {
  name: "My Docs",
  api: {
    asyncSpec: "./asyncapi.yaml",
  },
};
```

Both JSON and YAML formats are supported. The spec must be AsyncAPI version 2.x.

## Coexisting with OpenAPI

You can document both REST and event-driven APIs on the same site:

```js
api: {
  spec: "./openapi.yaml",
  asyncSpec: "./asyncapi.yaml",
},
```

Both specs are parsed and rendered on the API reference page.

## What gets documented

Tome extracts and renders the following from your AsyncAPI spec:

### Servers

Each server entry is displayed with its URL, protocol, and description.

### Channels

Channels are the core of an AsyncAPI spec. Each channel is documented with:

- **Channel path** (e.g., `user/signedup`)
- **Description**
- **Parameters** with types and descriptions
- **Publish operation** (messages the client can send)
- **Subscribe operation** (messages the client can receive)
- **Protocol bindings** (if specified)

### Messages

Each operation's message is documented with:

- Name and description
- Content type
- Payload schema (rendered as a structured table)
- Example payloads (if provided in the spec)

### Protocol badges

Channels display protocol badges based on the server protocol:

| Protocol | Badge |
|----------|-------|
| `ws` / `wss` | WebSocket |
| `mqtt` / `mqtts` | MQTT |
| `kafka` | Kafka |
| `amqp` / `amqps` | AMQP |

### Code samples

Tome auto-generates code samples for each channel based on the server protocol. For example, a WebSocket channel produces a JavaScript snippet showing how to connect, send, and receive messages:

```js
const ws = new WebSocket("wss://api.example.com/user/signedup");

ws.onopen = () => {
  console.log("Connected to user/signedup");
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log("Received:", data);
};
```

Code samples are generated for WebSocket, MQTT, Kafka, and AMQP protocols.

## Supported features

- AsyncAPI 2.x (JSON and YAML)
- `$ref` resolution (internal references only)
- Server definitions with protocol detection
- Channel parameters
- Publish and subscribe operations
- Message schemas and examples
- Tag-based grouping
