import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

// ── TYPES ───────────────────────────────────────────────
export interface McpPage {
  url: string;
  title: string;
  description: string;
  headings: string[];
  tags: string[];
  content?: string;
}

export interface McpManifest {
  name: string;
  version: string;
  pages: McpPage[];
}

// ── HELPERS (exported for testing) ──────────────────────

/**
 * Load and parse the MCP manifest from disk.
 * Returns null if the file does not exist.
 */
export function loadManifest(manifestPath: string): McpManifest | null {
  if (!existsSync(manifestPath)) {
    return null;
  }
  return JSON.parse(readFileSync(manifestPath, "utf-8")) as McpManifest;
}

/**
 * Search pages by keyword. Matches against title, description,
 * headings, tags, and optionally content.
 */
export function searchPages(
  pages: McpPage[],
  query: string
): Array<{ url: string; title: string; description: string; headings: string[] }> {
  const q = query.toLowerCase();
  return pages
    .filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.headings.some((h) => h.toLowerCase().includes(q)) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        (p.content || "").toLowerCase().includes(q)
    )
    .map((p) => ({
      url: p.url,
      title: p.title,
      description: p.description,
      headings: p.headings,
    }));
}

/**
 * Get a single page by its URL path.
 * Returns null if no page matches.
 */
export function getPage(pages: McpPage[], url: string): McpPage | null {
  return pages.find((p) => p.url === url) || null;
}

/**
 * List all pages (summary view without content).
 */
export function listPages(
  pages: McpPage[]
): Array<{ url: string; title: string; description: string; tags: string[] }> {
  return pages.map((p) => ({
    url: p.url,
    title: p.title,
    description: p.description,
    tags: p.tags,
  }));
}

// ── SERVER ──────────────────────────────────────────────

/**
 * Create an MCP server instance with all tools and resources registered.
 * Exported separately for testing with InMemoryTransport.
 */
export function createMcpServer(manifest: McpManifest): Server {
  const server = new Server(
    { name: manifest.name, version: manifest.version },
    { capabilities: { tools: {}, resources: {} } }
  );

  // ── TOOLS ───────────────────────────────────────────────

  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: [
      {
        name: "search_docs",
        description: `Search ${manifest.name} documentation pages by keyword`,
        inputSchema: {
          type: "object" as const,
          properties: {
            query: { type: "string", description: "Search query" },
          },
          required: ["query"],
        },
      },
      {
        name: "get_page",
        description: `Get the full content of a ${manifest.name} documentation page`,
        inputSchema: {
          type: "object" as const,
          properties: {
            url: {
              type: "string",
              description: "Page URL path (e.g. /quickstart)",
            },
          },
          required: ["url"],
        },
      },
      {
        name: "list_pages",
        description: `List all available ${manifest.name} documentation pages`,
        inputSchema: {
          type: "object" as const,
          properties: {},
        },
      },
    ],
  }));

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    if (name === "list_pages") {
      const pages = listPages(manifest.pages);
      return {
        content: [{ type: "text", text: JSON.stringify(pages, null, 2) }],
      };
    }

    if (name === "search_docs") {
      const query = (args?.query as string) || "";
      const results = searchPages(manifest.pages, query);
      return {
        content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
      };
    }

    if (name === "get_page") {
      const url = args?.url as string;
      const page = getPage(manifest.pages, url);
      if (!page) {
        return {
          content: [{ type: "text", text: `Page not found: ${url}` }],
          isError: true,
        };
      }
      return {
        content: [{ type: "text", text: JSON.stringify(page, null, 2) }],
      };
    }

    return {
      content: [{ type: "text", text: `Unknown tool: ${name}` }],
      isError: true,
    };
  });

  // ── RESOURCES ─────────────────────────────────────────

  server.setRequestHandler(ListResourcesRequestSchema, async () => ({
    resources: manifest.pages.map((p) => ({
      uri: `docs://${p.url}`,
      name: p.title,
      description: p.description,
      mimeType: "text/plain",
    })),
  }));

  server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    const uri = request.params.uri;
    const url = uri.replace("docs://", "");
    const page = getPage(manifest.pages, url);
    if (!page) {
      throw new Error(`Page not found: ${url}`);
    }
    return {
      contents: [
        {
          uri,
          mimeType: "text/plain",
          text: page.content || `# ${page.title}\n\n${page.description}`,
        },
      ],
    };
  });

  return server;
}

/**
 * Start an MCP server over stdio. Loads the manifest from disk,
 * creates the server, connects via stdio, and registers shutdown handlers.
 */
export async function startMcpServer(
  options: { root?: string; outDir?: string } = {}
) {
  const root = options.root || process.cwd();
  const outDir = options.outDir || "out";
  const manifestPath = resolve(root, outDir, "mcp.json");

  const manifest = loadManifest(manifestPath);

  if (!manifest) {
    console.error(
      `MCP manifest not found at ${manifestPath}. Run 'tome build' first.`
    );
    process.exit(1);
  }

  const server = createMcpServer(manifest);
  const transport = new StdioServerTransport();
  await server.connect(transport);

  // ── GRACEFUL SHUTDOWN ──────────────────────────────────

  const shutdown = async () => {
    try {
      await server.close();
    } catch {
      // Ignore errors during shutdown
    }
    process.exit(0);
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);

  return { server, transport };
}
