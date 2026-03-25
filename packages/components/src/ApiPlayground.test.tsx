import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ApiPlayground } from "./ApiPlayground.js";
import type { ApiEndpoint } from "./api.js";

// ── Fixtures ────────────────────────────────────────────

const getEndpoint: ApiEndpoint = {
  method: "get",
  path: "/users/{id}",
  operationId: "getUser",
  summary: "Get a user",
  description: "Retrieve a user by ID",
  tags: ["Users"],
  parameters: [
    { name: "id", in: "path", description: "User ID", required: true, type: "string" },
    { name: "fields", in: "query", description: "Fields to include", required: false, type: "string" },
    { name: "X-Request-Id", in: "header", description: "Request ID", required: false, type: "string" },
  ],
  requestBody: undefined,
  responses: [
    { statusCode: "200", description: "Successful response", schema: { id: "123", name: "Alice" } },
    { statusCode: "404", description: "User not found" },
  ],
  deprecated: false,
};

const postEndpoint: ApiEndpoint = {
  method: "post",
  path: "/users",
  operationId: "createUser",
  summary: "Create a user",
  tags: ["Users"],
  parameters: [],
  requestBody: {
    contentType: "application/json",
    required: true,
    description: "User data",
    schema: { name: "Alice", email: "alice@example.com" },
  },
  responses: [{ statusCode: "201", description: "Created" }],
  deprecated: false,
};

// ── Helpers ─────────────────────────────────────────────

function mockFetchSuccess(body: unknown, status = 200, statusText = "OK") {
  return vi.fn().mockResolvedValue({
    status,
    statusText,
    headers: new Headers({ "content-type": "application/json", "x-request-id": "abc" }),
    json: () => Promise.resolve(body),
    text: () => Promise.resolve(JSON.stringify(body)),
  });
}

function mockFetchFailure(message: string) {
  return vi.fn().mockRejectedValue(new Error(message));
}

beforeEach(() => {
  vi.restoreAllMocks();
});

// ── Tests ───────────────────────────────────────────────

describe("ApiPlayground", () => {
  it("renders 'Try it out' button", () => {
    render(<ApiPlayground endpoint={getEndpoint} baseUrl="https://api.test.com" />);
    expect(screen.getByTestId("playground-toggle")).toBeInTheDocument();
    expect(screen.getByText("Try it out")).toBeInTheDocument();
  });

  it("shows parameter input fields when expanded", () => {
    render(<ApiPlayground endpoint={getEndpoint} baseUrl="https://api.test.com" />);
    fireEvent.click(screen.getByTestId("playground-toggle"));

    expect(screen.getByTestId("param-input-id")).toBeInTheDocument();
    expect(screen.getByTestId("param-input-fields")).toBeInTheDocument();
    expect(screen.getByTestId("param-input-X-Request-Id")).toBeInTheDocument();
  });

  it("shows auth input when auth config is provided", () => {
    render(
      <ApiPlayground
        endpoint={getEndpoint}
        baseUrl="https://api.test.com"
        auth={{ type: "bearer" }}
      />,
    );
    fireEvent.click(screen.getByTestId("playground-toggle"));
    expect(screen.getByTestId("auth-input")).toBeInTheDocument();
    expect(screen.getByText("Bearer Token")).toBeInTheDocument();
  });

  it("does not show auth input when no auth config", () => {
    render(<ApiPlayground endpoint={getEndpoint} baseUrl="https://api.test.com" />);
    fireEvent.click(screen.getByTestId("playground-toggle"));
    expect(screen.queryByTestId("auth-input")).not.toBeInTheDocument();
  });

  it("shows request body textarea for POST endpoints", () => {
    render(<ApiPlayground endpoint={postEndpoint} baseUrl="https://api.test.com" />);
    fireEvent.click(screen.getByTestId("playground-toggle"));
    expect(screen.getByTestId("request-body")).toBeInTheDocument();
  });

  it("does not show request body textarea for GET endpoints", () => {
    render(<ApiPlayground endpoint={getEndpoint} baseUrl="https://api.test.com" />);
    fireEvent.click(screen.getByTestId("playground-toggle"));
    expect(screen.queryByTestId("request-body")).not.toBeInTheDocument();
  });

  it("shows 'Send Request' button when expanded", () => {
    render(<ApiPlayground endpoint={getEndpoint} baseUrl="https://api.test.com" />);
    fireEvent.click(screen.getByTestId("playground-toggle"));
    expect(screen.getByTestId("send-request")).toBeInTheDocument();
    expect(screen.getByText("Send Request")).toBeInTheDocument();
  });

  it("displays response status after a request", async () => {
    const fetchMock = mockFetchSuccess({ id: "1", name: "Alice" });
    vi.stubGlobal("fetch", fetchMock);

    render(<ApiPlayground endpoint={getEndpoint} baseUrl="https://api.test.com" />);
    fireEvent.click(screen.getByTestId("playground-toggle"));
    fireEvent.click(screen.getByTestId("send-request"));

    await waitFor(() => {
      expect(screen.getByTestId("response-status")).toBeInTheDocument();
    });

    expect(screen.getByTestId("response-status").textContent).toContain("200");
    expect(screen.getByTestId("response-status").textContent).toContain("OK");
  });

  it("displays response body as formatted JSON", async () => {
    const data = { id: "1", name: "Alice" };
    const fetchMock = mockFetchSuccess(data);
    vi.stubGlobal("fetch", fetchMock);

    render(<ApiPlayground endpoint={getEndpoint} baseUrl="https://api.test.com" />);
    fireEvent.click(screen.getByTestId("playground-toggle"));
    fireEvent.click(screen.getByTestId("send-request"));

    await waitFor(() => {
      expect(screen.getByTestId("response-body")).toBeInTheDocument();
    });

    expect(screen.getByTestId("response-body").textContent).toBe(JSON.stringify(data, null, 2));
  });

  it("shows error message on network failure", async () => {
    const fetchMock = mockFetchFailure("Failed to fetch");
    vi.stubGlobal("fetch", fetchMock);

    render(<ApiPlayground endpoint={getEndpoint} baseUrl="https://api.test.com" />);
    fireEvent.click(screen.getByTestId("playground-toggle"));
    fireEvent.click(screen.getByTestId("send-request"));

    await waitFor(() => {
      expect(screen.getByTestId("playground-error")).toBeInTheDocument();
    });

    expect(screen.getByTestId("playground-error").textContent).toBe("Failed to fetch");
  });

  it("substitutes path parameters in URL", async () => {
    const fetchMock = mockFetchSuccess({ id: "42" });
    vi.stubGlobal("fetch", fetchMock);

    render(<ApiPlayground endpoint={getEndpoint} baseUrl="https://api.test.com" />);
    fireEvent.click(screen.getByTestId("playground-toggle"));

    const idInput = screen.getByTestId("param-input-id");
    fireEvent.change(idInput, { target: { value: "42" } });
    fireEvent.click(screen.getByTestId("send-request"));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    const calledUrl = fetchMock.mock.calls[0][0];
    expect(calledUrl).toContain("/users/42");
    expect(calledUrl).not.toContain("{id}");
  });
});
