import { describe, it, expect, vi, afterEach } from "vitest";

// Must be called before importing the module under test so Vitest hoists it
// before static imports — guaranteeing the module sees the mock.
vi.mock("child_process", () => ({
  execFileSync: vi.fn().mockReturnValue("Indexed 5 pages\n"),
}));

import { runPagefind } from "./pagefind.js";
import { execFileSync } from "child_process";

const mockedExecFileSync = vi.mocked(execFileSync);

describe("runPagefind", () => {
  afterEach(() => {
    mockedExecFileSync.mockClear();
  });

  it("calls npx pagefind with the correct site and output-subdir arguments", () => {
    runPagefind("/tmp/out", "/tmp/root");

    expect(mockedExecFileSync).toHaveBeenCalledWith(
      "npx",
      ["pagefind", "--site", "/tmp/out", "--output-subdir", "_pagefind"],
      expect.objectContaining({ cwd: "/tmp/root", encoding: "utf-8", stdio: "pipe" })
    );
  });

  it("passes shell: false on non-Windows platforms", () => {
    const original = process.platform;
    Object.defineProperty(process, "platform", { value: "linux", configurable: true });

    runPagefind("/tmp/out", "/tmp/root");

    expect(mockedExecFileSync).toHaveBeenCalledWith(
      "npx",
      expect.any(Array),
      expect.objectContaining({ shell: false })
    );

    Object.defineProperty(process, "platform", { value: original, configurable: true });
  });

  it("passes shell: true on Windows (fixes ENOENT for npx.cmd)", () => {
    const original = process.platform;
    Object.defineProperty(process, "platform", { value: "win32", configurable: true });

    runPagefind("/tmp/out", "/tmp/root");

    expect(mockedExecFileSync).toHaveBeenCalledWith(
      "npx",
      expect.any(Array),
      expect.objectContaining({ shell: true })
    );

    Object.defineProperty(process, "platform", { value: original, configurable: true });
  });

  it("returns the stdout string from pagefind", () => {
    const result = runPagefind("/tmp/out", "/tmp/root");
    expect(result).toBe("Indexed 5 pages\n");
  });

  it("propagates errors thrown by execFileSync", () => {
    mockedExecFileSync.mockImplementationOnce(() => {
      throw new Error("ENOENT: npx not found");
    });

    expect(() => runPagefind("/tmp/out", "/tmp/root")).toThrow("ENOENT: npx not found");
  });
});
