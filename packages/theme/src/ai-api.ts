/**
 * Shared AI API utilities for Tome's AI features (chat + search).
 * Supports OpenAI and Anthropic providers with BYOK (Bring Your Own Key).
 */

export type AiProvider = "openai" | "anthropic" | "custom";

export interface AiMessage {
  role: "user" | "assistant";
  content: string;
}

/**
 * Build a system prompt with optional documentation context.
 */
export function buildSystemPrompt(context?: string, instruction?: string): string {
  const base = instruction || "You are a helpful documentation assistant. Answer questions accurately based on the documentation provided below. If the answer isn't in the documentation, say so clearly. Keep answers concise and reference specific sections when possible.";
  if (!context) return base;
  // Truncate context to stay within token limits (~100K chars ≈ 25K tokens)
  const trimmed = context.length > 100000 ? context.slice(0, 100000) + "\n\n[Documentation truncated...]" : context;
  return `${base}\n\nDocumentation:\n${trimmed}`;
}

/**
 * Call OpenAI's chat completions API.
 */
export async function callOpenAI(
  messages: AiMessage[],
  apiKey: string,
  model: string,
  systemPrompt: string,
): Promise<string> {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
      ],
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenAI API error (${res.status}): ${err}`);
  }
  const data = await res.json();
  return data.choices?.[0]?.message?.content || "No response.";
}

/**
 * Call Anthropic's messages API.
 */
export async function callAnthropic(
  messages: AiMessage[],
  apiKey: string,
  model: string,
  systemPrompt: string,
): Promise<string> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model,
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Anthropic API error (${res.status}): ${err}`);
  }
  const data = await res.json();
  return data.content?.[0]?.text || "No response.";
}

/**
 * Get the default model for a provider.
 */
export function getDefaultModel(provider: AiProvider): string {
  if (provider === "openai") return "gpt-4o-mini";
  return "claude-sonnet-4-20250514";
}

/**
 * Call the appropriate AI provider with a query and context.
 * Returns the AI's response text.
 */
export async function callAiProvider(
  provider: AiProvider,
  messages: AiMessage[],
  apiKey: string,
  model: string,
  systemPrompt: string,
): Promise<string> {
  if (provider === "openai") {
    return callOpenAI(messages, apiKey, model, systemPrompt);
  }
  return callAnthropic(messages, apiKey, model, systemPrompt);
}
