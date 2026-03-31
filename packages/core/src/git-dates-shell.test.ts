import { describe, it, expect, vi, afterEach } from "vitest";

// Hoisted mock — in place before git-dates.ts static import resolves.
vi.mock("child_process", () => ({
  execFileSync: vi.fn().mockReturnValue("2024-01-15T10:30:00Z\n"),
}));

import { getGitLastUpdated } from "./git-dates.js";
import { execFileSync } from "child_process";

const mockedExecFileSync = vi.mocked(execFileSync);

describe("getGitLastUpdated - shell option (Windows compatibility)", () => {
  afterEach(() => {
    mockedExecFileSync.mockClear();
    mockedExecFileSync.mockReturnValue("2024-01-15T10:30:00Z\n");
  });

  it("passes shell: false on Linux/macOS", () => {
    const original = process.platform;
    Object.defineProperty(process, "platform", { value: "linux", configurable: true });

    getGitLastUpdated("/absolute/path/file.ts");

    expect(mockedExecFileSync).toHaveBeenCalledWith(
      "git",
      expect.any(Array),
      expect.objectContaining({ shell: false })
    );

    Object.defineProperty(process, "platform", { value: original, configurable: true });
  });

  it("passes shell: true on Windows (fixes ENOENT for git.cmd)", () => {
    const original = process.platform;
    Object.defineProperty(process, "platform", { value: "win32", configurable: true });

    getGitLastUpdated("/absolute/path/file.ts");

    expect(mockedExecFileSync).toHaveBeenCalledWith(
      "git",
      expect.any(Array),
      expect.objectContaining({ shell: true })
    );

    Object.defineProperty(process, "platform", { value: original, configurable: true });
  });

  it("passes shell: false on macOS (darwin)", () => {
    const original = process.platform;
    Object.defineProperty(process, "platform", { value: "darwin", configurable: true });

    getGitLastUpdated("/absolute/path/file.ts");

    expect(mockedExecFileSync).toHaveBeenCalledWith(
      "git",
      expect.any(Array),
      expect.objectContaining({ shell: false })
    );

    Object.defineProperty(process, "platform", { value: original, configurable: true });
  });

  it("returns the trimmed ISO date string on success", () => {
    const result = getGitLastUpdated("/absolute/path/file.ts");
    expect(result).toBe("2024-01-15T10:30:00Z");
  });

  it("returns null when execFileSync returns empty string", () => {
    mockedExecFileSync.mockReturnValueOnce("" as unknown as Buffer);

    const result = getGitLastUpdated("/absolute/path/file.ts");
    expect(result).toBeNull();
  });

  it("returns null without calling execFileSync for relative paths", () => {
    const result = getGitLastUpdated("relative/path/file.ts");

    expect(mockedExecFileSync).not.toHaveBeenCalled();
    expect(result).toBeNull();
  });

  it("returns null without calling execFileSync for empty string", () => {
    const result = getGitLastUpdated("");

    expect(mockedExecFileSync).not.toHaveBeenCalled();
    expect(result).toBeNull();
  });

  it("returns null when execFileSync throws", () => {
    mockedExecFileSync.mockImplementationOnce(() => {
      throw new Error("not a git repository");
    });

    const result = getGitLastUpdated("/absolute/path/file.ts");
    expect(result).toBeNull();
  });
});
