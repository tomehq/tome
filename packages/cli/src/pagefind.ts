import { execFileSync } from "child_process";

/**
 * Run the pagefind CLI to build a search index for the given output directory.
 * Returns the stdout string from pagefind.
 *
 * Uses `shell: true` on Windows because npx is a .cmd script that requires a
 * shell to resolve — without it, execFileSync throws ENOENT on Windows.
 */
export function runPagefind(outDirAbs: string, root: string): string {
  return execFileSync(
    "npx",
    ["pagefind", "--site", outDirAbs, "--output-subdir", "_pagefind"],
    {
      stdio: "pipe",
      cwd: root,
      encoding: "utf-8",
      shell: process.platform === "win32",
    }
  );
}
