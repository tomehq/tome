import React from "react";
import { describe, it, expect, vi, beforeAll, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { AiChat } from "./AiChat.js";

// ── jsdom matchMedia mock ─────────────────────────────────
beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  });
});

// ── Shared helpers ───────────────────────────────────────
const defaultProps = {
  provider: "openai" as const,
  model: "gpt-4o-mini",
};

function renderChat(overrides: Partial<React.ComponentProps<typeof AiChat>> = {}) {
  return render(<AiChat {...defaultProps} {...overrides} />);
}

// ── Rendering ────────────────────────────────────────────

describe("AiChat rendering", () => {
  it("renders floating button when closed", () => {
    renderChat();
    expect(screen.getByTestId("ai-chat-button")).toBeInTheDocument();
    expect(screen.queryByTestId("ai-chat-panel")).not.toBeInTheDocument();
  });

  it("opens chat panel on button click", () => {
    renderChat();
    fireEvent.click(screen.getByTestId("ai-chat-button"));
    expect(screen.getByTestId("ai-chat-panel")).toBeInTheDocument();
    expect(screen.queryByTestId("ai-chat-button")).not.toBeInTheDocument();
  });

  it("shows input field when open", () => {
    renderChat();
    fireEvent.click(screen.getByTestId("ai-chat-button"));
    expect(screen.getByTestId("ai-chat-input")).toBeInTheDocument();
  });

  it("closes panel on close button click", () => {
    renderChat();
    fireEvent.click(screen.getByTestId("ai-chat-button"));
    expect(screen.getByTestId("ai-chat-panel")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("ai-chat-close"));
    expect(screen.queryByTestId("ai-chat-panel")).not.toBeInTheDocument();
    expect(screen.getByTestId("ai-chat-button")).toBeInTheDocument();
  });

  it("shows 'Ask AI' branding in the header", () => {
    renderChat();
    fireEvent.click(screen.getByTestId("ai-chat-button"));
    expect(screen.getByText("Ask AI")).toBeInTheDocument();
  });
});

// ── API Key ──────────────────────────────────────────────

describe("AiChat API key handling", () => {
  it("shows 'AI not configured' message when no key provided", () => {
    renderChat({ apiKey: undefined });
    fireEvent.click(screen.getByTestId("ai-chat-button"));
    expect(screen.getByTestId("ai-chat-no-key")).toBeInTheDocument();
    expect(screen.getByText("AI not configured")).toBeInTheDocument();
  });

  it("does not show 'Set API key' message when key is provided", () => {
    renderChat({ apiKey: "test-key-123" });
    fireEvent.click(screen.getByTestId("ai-chat-button"));
    expect(screen.queryByTestId("ai-chat-no-key")).not.toBeInTheDocument();
  });

  it("reads API key from window.__TOME_AI_KEY__ when prop is not set", () => {
    (window as any).__TOME_AI_KEY__ = "window-key-456";
    renderChat({ apiKey: undefined });
    fireEvent.click(screen.getByTestId("ai-chat-button"));
    expect(screen.queryByTestId("ai-chat-no-key")).not.toBeInTheDocument();
    delete (window as any).__TOME_AI_KEY__;
  });

  it("disables input when no API key is available", () => {
    renderChat({ apiKey: undefined });
    fireEvent.click(screen.getByTestId("ai-chat-button"));
    const input = screen.getByTestId("ai-chat-input") as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });
});

// ── User input ───────────────────────────────────────────

describe("AiChat user messages", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        choices: [{ message: { content: "AI response here" } }],
      }),
    }) as any;
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("renders user message when user submits text", async () => {
    renderChat({ apiKey: "test-key" });
    fireEvent.click(screen.getByTestId("ai-chat-button"));

    const input = screen.getByTestId("ai-chat-input");
    fireEvent.change(input, { target: { value: "Hello AI" } });
    fireEvent.click(screen.getByTestId("ai-chat-send"));

    expect(screen.getByText("Hello AI")).toBeInTheDocument();
    expect(screen.getByTestId("ai-chat-message-user")).toBeInTheDocument();
  });

  it("shows loading indicator while waiting for response", async () => {
    // Use a promise that we can control to keep loading state active
    let resolveResponse!: (value: any) => void;
    global.fetch = vi.fn().mockReturnValue(
      new Promise((resolve) => { resolveResponse = resolve; }),
    ) as any;

    renderChat({ apiKey: "test-key" });
    fireEvent.click(screen.getByTestId("ai-chat-button"));

    const input = screen.getByTestId("ai-chat-input");
    fireEvent.change(input, { target: { value: "Hello AI" } });
    fireEvent.click(screen.getByTestId("ai-chat-send"));

    expect(screen.getByTestId("ai-chat-loading")).toBeInTheDocument();
    expect(screen.getByText("Thinking...")).toBeInTheDocument();

    // Clean up
    await act(async () => {
      resolveResponse({
        ok: true,
        json: () => Promise.resolve({ choices: [{ message: { content: "Done" } }] }),
      });
    });
  });

  it("renders assistant response after API call", async () => {
    renderChat({ apiKey: "test-key" });
    fireEvent.click(screen.getByTestId("ai-chat-button"));

    const input = screen.getByTestId("ai-chat-input");
    fireEvent.change(input, { target: { value: "Hello AI" } });

    await act(async () => {
      fireEvent.click(screen.getByTestId("ai-chat-send"));
    });

    // Wait for the response to render
    await act(async () => {
      await vi.advanceTimersByTimeAsync(10);
    });

    expect(screen.getByText("AI response here")).toBeInTheDocument();
    expect(screen.getByTestId("ai-chat-message-assistant")).toBeInTheDocument();
  });

  it("submits on Enter key press", async () => {
    renderChat({ apiKey: "test-key" });
    fireEvent.click(screen.getByTestId("ai-chat-button"));

    const input = screen.getByTestId("ai-chat-input");
    fireEvent.change(input, { target: { value: "Question" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(screen.getByText("Question")).toBeInTheDocument();
  });

  it("clears input after submission", async () => {
    renderChat({ apiKey: "test-key" });
    fireEvent.click(screen.getByTestId("ai-chat-button"));

    const input = screen.getByTestId("ai-chat-input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Hello" } });
    fireEvent.click(screen.getByTestId("ai-chat-send"));

    expect(input.value).toBe("");
  });

  it("does not submit empty messages", () => {
    renderChat({ apiKey: "test-key" });
    fireEvent.click(screen.getByTestId("ai-chat-button"));

    fireEvent.click(screen.getByTestId("ai-chat-send"));
    expect(screen.queryByTestId("ai-chat-message-user")).not.toBeInTheDocument();
  });

  it("shows error when API call fails", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
      text: () => Promise.resolve("Unauthorized"),
    }) as any;

    renderChat({ apiKey: "bad-key" });
    fireEvent.click(screen.getByTestId("ai-chat-button"));

    const input = screen.getByTestId("ai-chat-input");
    fireEvent.change(input, { target: { value: "Test" } });

    await act(async () => {
      fireEvent.click(screen.getByTestId("ai-chat-send"));
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(10);
    });

    expect(screen.getByTestId("ai-chat-error")).toBeInTheDocument();
  });
});

// ── Provider handling ────────────────────────────────────

describe("AiChat provider handling", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("calls OpenAI API for openai provider", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        choices: [{ message: { content: "OpenAI response" } }],
      }),
    }) as any;

    renderChat({ provider: "openai", apiKey: "test-key" });
    fireEvent.click(screen.getByTestId("ai-chat-button"));

    const input = screen.getByTestId("ai-chat-input");
    fireEvent.change(input, { target: { value: "Hello" } });

    await act(async () => {
      fireEvent.click(screen.getByTestId("ai-chat-send"));
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(10);
    });

    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.openai.com/v1/chat/completions",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "Authorization": "Bearer test-key",
        }),
      }),
    );
  });

  it("calls Anthropic API for anthropic provider", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        content: [{ text: "Anthropic response" }],
      }),
    }) as any;

    renderChat({ provider: "anthropic", apiKey: "test-key" });
    fireEvent.click(screen.getByTestId("ai-chat-button"));

    const input = screen.getByTestId("ai-chat-input");
    fireEvent.change(input, { target: { value: "Hello" } });

    await act(async () => {
      fireEvent.click(screen.getByTestId("ai-chat-send"));
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(10);
    });

    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.anthropic.com/v1/messages",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "x-api-key": "test-key",
          "anthropic-version": "2023-06-01",
        }),
      }),
    );
  });
});
