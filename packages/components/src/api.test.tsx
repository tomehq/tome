import { describe, it, expect, beforeAll } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import {
  MethodBadge,
  EndpointCard,
  ParameterTable,
  RequestBodyBlock,
  ResponseBlock,
  CodeExamples,
  ApiReference,
} from "./api.js";
import type { ApiEndpoint, ApiManifest, ApiRequestBody } from "./api.js";

// ── Shared fixture ───────────────────────────────────────

const sampleEndpoint: ApiEndpoint = {
  method: "get",
  path: "/users/{id}",
  operationId: "getUser",
  summary: "Get a user",
  description: "Retrieve a user by ID",
  tags: ["Users"],
  parameters: [
    { name: "id", in: "path", description: "User ID", required: true, type: "string" },
    { name: "fields", in: "query", description: "Fields to include", required: false, type: "string" },
  ],
  requestBody: undefined,
  responses: [
    { statusCode: "200", description: "Successful response", schema: { id: "123", name: "Alice" } },
    { statusCode: "404", description: "User not found" },
  ],
  deprecated: false,
};

// ── MethodBadge ──────────────────────────────────────────

describe("MethodBadge", () => {
  it("renders the method text uppercased", () => {
    render(<MethodBadge method="get" />);
    const badge = screen.getByTestId("method-badge");
    expect(badge.textContent).toBe("GET");
  });

  it("applies the correct background color for known methods", () => {
    const methods: Array<{ method: string; color: string }> = [
      { method: "get", color: "rgb(34, 197, 94)" },
      { method: "post", color: "rgb(59, 130, 246)" },
      { method: "put", color: "rgb(245, 158, 11)" },
      { method: "delete", color: "rgb(239, 68, 68)" },
      { method: "patch", color: "rgb(167, 139, 250)" },
    ];

    for (const { method, color } of methods) {
      const { unmount } = render(<MethodBadge method={method} />);
      const badge = screen.getByTestId("method-badge");
      // jsdom normalizes hex colors to rgb
      expect(badge.style.background).toBe(color);
      unmount();
    }
  });

  it("falls back to gray for unknown methods", () => {
    render(<MethodBadge method="trace" />);
    const badge = screen.getByTestId("method-badge");
    // #6b7280 normalized by jsdom
    expect(badge.style.background).toBe("rgb(107, 114, 128)");
  });
});

// ── ParameterTable ───────────────────────────────────────

describe("ParameterTable", () => {
  it("returns null for empty parameters array", () => {
    const { container } = render(<ParameterTable parameters={[]} />);
    expect(container.innerHTML).toBe("");
  });

  it("renders a row for each parameter with name and type", () => {
    render(<ParameterTable parameters={sampleEndpoint.parameters} />);
    expect(screen.getByText("id")).toBeInTheDocument();
    expect(screen.getByText("fields")).toBeInTheDocument();
    // Both are type "string"
    expect(screen.getAllByText("string")).toHaveLength(2);
  });

  it("shows required badge for required params and optional for others", () => {
    render(<ParameterTable parameters={sampleEndpoint.parameters} />);
    const requiredBadges = screen.getAllByTestId("required-badge");
    expect(requiredBadges).toHaveLength(1);
    expect(requiredBadges[0].textContent).toBe("required");
    expect(screen.getByText("optional")).toBeInTheDocument();
  });

  it("renders parameter descriptions", () => {
    render(<ParameterTable parameters={sampleEndpoint.parameters} />);
    expect(screen.getByText("User ID")).toBeInTheDocument();
    expect(screen.getByText("Fields to include")).toBeInTheDocument();
  });
});

// ── RequestBodyBlock ─────────────────────────────────────

describe("RequestBodyBlock", () => {
  const body: ApiRequestBody = {
    contentType: "application/json",
    required: true,
    description: "User data payload",
    schema: { name: "string", email: "string" },
  };

  it("shows the content type", () => {
    render(<RequestBodyBlock requestBody={body} />);
    expect(screen.getByText("application/json")).toBeInTheDocument();
  });

  it("shows the required badge when required is true", () => {
    render(<RequestBodyBlock requestBody={body} />);
    expect(screen.getByText("required")).toBeInTheDocument();
  });

  it("does not show required badge when required is false", () => {
    render(<RequestBodyBlock requestBody={{ ...body, required: false }} />);
    expect(screen.queryByText("required")).not.toBeInTheDocument();
  });

  it("renders description text and schema JSON", () => {
    const { container } = render(<RequestBodyBlock requestBody={body} />);
    expect(screen.getByText("User data payload")).toBeInTheDocument();
    const pre = container.querySelector("pre");
    expect(pre).toBeTruthy();
    expect(pre!.textContent).toBe(JSON.stringify(body.schema, null, 2));
  });
});

// ── ResponseBlock ────────────────────────────────────────

describe("ResponseBlock", () => {
  it("returns null for empty responses array", () => {
    const { container } = render(<ResponseBlock responses={[]} />);
    expect(container.innerHTML).toBe("");
  });

  it("renders a status badge for each response", () => {
    render(<ResponseBlock responses={sampleEndpoint.responses} />);
    const badges = screen.getAllByTestId("status-badge");
    expect(badges).toHaveLength(2);
    expect(badges[0].textContent).toBe("200");
    expect(badges[1].textContent).toBe("404");
  });

  it("renders descriptions alongside status codes", () => {
    render(<ResponseBlock responses={sampleEndpoint.responses} />);
    expect(screen.getByText("Successful response")).toBeInTheDocument();
    expect(screen.getByText("User not found")).toBeInTheDocument();
  });

  it("renders schema JSON when present and omits it when absent", () => {
    const { container } = render(<ResponseBlock responses={sampleEndpoint.responses} />);
    const pres = container.querySelectorAll("pre");
    // Only the 200 response has a schema
    expect(pres).toHaveLength(1);
    expect(pres[0].textContent).toBe(JSON.stringify({ id: "123", name: "Alice" }, null, 2));
  });

  it("applies correct color per status code range", () => {
    render(
      <ResponseBlock
        responses={[
          { statusCode: "200", description: "OK" },
          { statusCode: "422", description: "Unprocessable" },
          { statusCode: "503", description: "Unavailable" },
        ]}
      />,
    );
    const badges = screen.getAllByTestId("status-badge");

    // 2xx -> green (#22c55e -> rgb(34, 197, 94))
    expect(badges[0].style.background).toBe("rgb(34, 197, 94)");
    // 4xx -> amber (#f59e0b -> rgb(245, 158, 11))
    expect(badges[1].style.background).toBe("rgb(245, 158, 11)");
    // 5xx -> red (#ef4444 -> rgb(239, 68, 68))
    expect(badges[2].style.background).toBe("rgb(239, 68, 68)");
  });
});

// ── CodeExamples ─────────────────────────────────────────

describe("CodeExamples", () => {
  it("renders cURL, JavaScript, and Python tabs", () => {
    render(<CodeExamples endpoint={sampleEndpoint} />);
    expect(screen.getByText("cURL")).toBeInTheDocument();
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    expect(screen.getByText("Python")).toBeInTheDocument();
  });

  it("shows cURL code by default with correct method and URL", () => {
    const { container } = render(
      <CodeExamples endpoint={sampleEndpoint} baseUrl="https://api.test.com" />,
    );
    const pre = container.querySelector("pre");
    expect(pre!.textContent).toContain("curl -X GET");
    expect(pre!.textContent).toContain("https://api.test.com/users/{id}");
  });

  it("switches to JavaScript tab and shows fetch code", () => {
    const { container } = render(<CodeExamples endpoint={sampleEndpoint} />);
    fireEvent.click(screen.getByText("JavaScript"));
    const pre = container.querySelector("pre");
    expect(pre!.textContent).toContain("fetch(");
    expect(pre!.textContent).toContain('method: "GET"');
  });

  it("switches to Python tab and shows requests code", () => {
    const { container } = render(<CodeExamples endpoint={sampleEndpoint} />);
    fireEvent.click(screen.getByText("Python"));
    const pre = container.querySelector("pre");
    expect(pre!.textContent).toContain("import requests");
    expect(pre!.textContent).toContain("requests.get(");
  });

  it("renders Go, Java, and C# tabs in addition to existing tabs", () => {
    render(<CodeExamples endpoint={sampleEndpoint} />);
    expect(screen.getByText("Go")).toBeInTheDocument();
    expect(screen.getByText("Java")).toBeInTheDocument();
    expect(screen.getByText("C#")).toBeInTheDocument();
  });

  it("switches to Go tab and shows Go net/http code", () => {
    const { container } = render(<CodeExamples endpoint={sampleEndpoint} />);
    fireEvent.click(screen.getByText("Go"));
    const pre = container.querySelector("pre");
    expect(pre!.textContent).toContain("http.NewRequest");
    expect(pre!.textContent).toContain("GET");
  });

  it("switches to Java tab and shows Java HttpClient code", () => {
    const { container } = render(<CodeExamples endpoint={sampleEndpoint} />);
    fireEvent.click(screen.getByText("Java"));
    const pre = container.querySelector("pre");
    expect(pre!.textContent).toContain("HttpClient");
    expect(pre!.textContent).toContain("HttpRequest");
  });

  it("switches to C# tab and shows C# HttpClient code", () => {
    const { container } = render(<CodeExamples endpoint={sampleEndpoint} />);
    fireEvent.click(screen.getByText("C#"));
    const pre = container.querySelector("pre");
    expect(pre!.textContent).toContain("HttpClient");
    expect(pre!.textContent).toContain("HttpRequestMessage");
  });
});

// ── EndpointCard ─────────────────────────────────────────

describe("EndpointCard", () => {
  it("shows the method badge and path in the header", () => {
    render(<EndpointCard endpoint={sampleEndpoint} />);
    expect(screen.getByTestId("method-badge").textContent).toBe("GET");
    expect(screen.getByText("/users/{id}")).toBeInTheDocument();
  });

  it("shows the summary text", () => {
    render(<EndpointCard endpoint={sampleEndpoint} />);
    expect(screen.getByText("Get a user")).toBeInTheDocument();
  });

  it("does not show details when collapsed (default)", () => {
    render(<EndpointCard endpoint={sampleEndpoint} />);
    expect(screen.queryByText("Parameters")).not.toBeInTheDocument();
    expect(screen.queryByText("Responses")).not.toBeInTheDocument();
  });

  it("expands to show details when header is clicked", () => {
    render(<EndpointCard endpoint={sampleEndpoint} />);
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByText("Parameters")).toBeInTheDocument();
    expect(screen.getByText("Responses")).toBeInTheDocument();
    expect(screen.getByText("Code Examples")).toBeInTheDocument();
    expect(screen.getByText("Retrieve a user by ID")).toBeInTheDocument();
  });

  it("shows deprecated badge when endpoint is deprecated", () => {
    render(<EndpointCard endpoint={{ ...sampleEndpoint, deprecated: true }} />);
    expect(screen.getByTestId("deprecated-badge")).toBeInTheDocument();
    expect(screen.getByTestId("deprecated-badge").textContent).toBe("Deprecated");
  });

  it("does not show deprecated badge when not deprecated", () => {
    render(<EndpointCard endpoint={sampleEndpoint} />);
    expect(screen.queryByTestId("deprecated-badge")).not.toBeInTheDocument();
  });

  it("renders tags as labels in the header", () => {
    render(<EndpointCard endpoint={sampleEndpoint} />);
    expect(screen.getByText("Users")).toBeInTheDocument();
  });

  it("renders expanded initially when defaultExpanded is true", () => {
    render(<EndpointCard endpoint={sampleEndpoint} defaultExpanded />);
    expect(screen.getByText("Parameters")).toBeInTheDocument();
    expect(screen.getByText("Responses")).toBeInTheDocument();
  });
});

// ── ApiReference ─────────────────────────────────────────

describe("ApiReference", () => {
  const manifest: ApiManifest = {
    title: "Pet Store API",
    version: "2.0.0",
    description: "A sample pet store API",
    servers: [{ url: "https://petstore.example.com", description: "Production" }],
    endpoints: [
      sampleEndpoint,
      {
        method: "post",
        path: "/pets",
        operationId: "createPet",
        summary: "Create a pet",
        tags: ["Pets"],
        parameters: [],
        requestBody: {
          contentType: "application/json",
          required: true,
          schema: { name: "Fido" },
        },
        responses: [{ statusCode: "201", description: "Created" }],
        deprecated: false,
      },
    ],
    tags: [
      { name: "Users", description: "User management endpoints" },
      { name: "Pets", description: "Pet management endpoints" },
    ],
  };

  it("renders the API title, version, and description", () => {
    render(<ApiReference manifest={manifest} />);
    expect(screen.getByText("Pet Store API")).toBeInTheDocument();
    expect(screen.getByText("v2.0.0")).toBeInTheDocument();
    expect(screen.getByText("A sample pet store API")).toBeInTheDocument();
  });

  it("renders the server URL", () => {
    render(<ApiReference manifest={manifest} />);
    expect(screen.getByText("https://petstore.example.com")).toBeInTheDocument();
  });

  it("groups endpoints by tag into separate sections", () => {
    render(<ApiReference manifest={manifest} />);
    const sections = screen.getAllByTestId("tag-section");
    expect(sections).toHaveLength(2);

    // Ordered by manifest.tags: Users first, then Pets
    // Use the h2 heading to avoid ambiguity with tag labels inside EndpointCards
    expect(sections[0].querySelector("h2")!.textContent).toBe("Users");
    expect(sections[1].querySelector("h2")!.textContent).toBe("Pets");
  });

  it("renders the TOC sidebar with tag links and endpoint entries", () => {
    render(<ApiReference manifest={manifest} />);
    const toc = screen.getByTestId("api-toc");
    expect(within(toc).getByText("Endpoints")).toBeInTheDocument();
    expect(within(toc).getByText("Users")).toBeInTheDocument();
    expect(within(toc).getByText("Pets")).toBeInTheDocument();
    expect(within(toc).getByText("/users/{id}")).toBeInTheDocument();
    expect(within(toc).getByText("/pets")).toBeInTheDocument();
  });

  it("renders tag descriptions", () => {
    render(<ApiReference manifest={manifest} />);
    expect(screen.getByText("User management endpoints")).toBeInTheDocument();
    expect(screen.getByText("Pet management endpoints")).toBeInTheDocument();
  });

  it("passes showPlayground and playgroundAuth to EndpointCards", () => {
    render(
      <ApiReference
        manifest={manifest}
        showPlayground={true}
        playgroundAuth={{ type: "bearer" }}
      />,
    );
    // Expand the first endpoint card — the first button in each tag section is the endpoint header
    const sections = screen.getAllByTestId("tag-section");
    const firstButton = within(sections[0]).getAllByRole("button")[0];
    fireEvent.click(firstButton);
    // ApiPlayground renders with data-testid="api-playground" and a "Try it out" toggle
    expect(screen.getByTestId("api-playground")).toBeInTheDocument();
    expect(screen.getByText("Try it out")).toBeInTheDocument();
  });
});

// ── EndpointCard playground props ───────────────────────

describe("EndpointCard playground props", () => {
  it("shows playground when showPlayground is true and expanded", () => {
    render(
      <EndpointCard
        endpoint={sampleEndpoint}
        showPlayground={true}
        defaultExpanded
      />,
    );
    expect(screen.getByTestId("api-playground")).toBeInTheDocument();
    expect(screen.getByText("Try it out")).toBeInTheDocument();
  });

  it("hides playground when showPlayground is false", () => {
    render(
      <EndpointCard
        endpoint={sampleEndpoint}
        showPlayground={false}
        defaultExpanded
      />,
    );
    expect(screen.queryByTestId("api-playground")).not.toBeInTheDocument();
  });

  it("hides playground when showPlayground is undefined", () => {
    render(
      <EndpointCard endpoint={sampleEndpoint} defaultExpanded />,
    );
    expect(screen.queryByTestId("api-playground")).not.toBeInTheDocument();
  });

  it("has id attribute for anchor navigation", () => {
    const { container } = render(<EndpointCard endpoint={sampleEndpoint} />);
    const card = container.firstChild as HTMLElement;
    expect(card.id).toBe("getuser");
  });
});

// ── TOC anchor navigation ───────────────────────────────

describe("ApiReference TOC anchor navigation", () => {
  const manifest: ApiManifest = {
    title: "Nav API",
    version: "1.0.0",
    servers: [{ url: "https://api.example.com" }],
    endpoints: [sampleEndpoint],
    tags: [{ name: "Users", description: "User endpoints" }],
  };

  beforeAll(() => {
    // jsdom does not implement scrollIntoView; stub it to avoid unhandled errors
    Element.prototype.scrollIntoView = () => {};
  });

  it("TOC links use onClick handler (not bare href navigation)", () => {
    render(<ApiReference manifest={manifest} />);
    const toc = screen.getByTestId("api-toc");
    const links = toc.querySelectorAll("a");
    // All links should have an onClick and an href starting with #
    for (const link of links) {
      expect(link.getAttribute("href")).toMatch(/^#/);
      // Clicking should not cause default navigation (onClick calls preventDefault)
      const prevented = fireEvent.click(link);
      // fireEvent.click returns false when preventDefault was called
      expect(prevented).toBe(false);
    }
  });
});
