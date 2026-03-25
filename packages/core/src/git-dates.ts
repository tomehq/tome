import { execFileSync } from "child_process";
import { dirname, isAbsolute } from "path";

/**
 * Get the last git commit date for a file.
 * Returns an ISO 8601 date string, or null if git is not available or the file is untracked.
 */
export function getGitLastUpdated(absolutePath: string): string | null {
  if (!absolutePath || !isAbsolute(absolutePath) || absolutePath.startsWith("-")) {
    return null;
  }

  try {
    const cwd = dirname(absolutePath);
    const result = execFileSync(
      "git", ["log", "-1", "--format=%cI", "--", absolutePath],
      { cwd, encoding: "utf-8", stdio: ["pipe", "pipe", "pipe"] }
    ).trim();
    return result || null;
  } catch {
    return null;
  }
}

/**
 * Get last updated dates for multiple files in batch.
 * More efficient than calling getGitLastUpdated for each file individually.
 */
export function getGitDatesForFiles(
  absolutePaths: string[],
  cwd: string
): Map<string, string> {
  const dates = new Map<string, string>();

  for (const filePath of absolutePaths) {
    const date = getGitLastUpdated(filePath);
    if (date) {
      dates.set(filePath, date);
    }
  }

  return dates;
}

/**
 * Format an ISO date string as a human-readable relative time.
 * Examples: "just now", "2 hours ago", "3 days ago", "2 months ago", "Jan 15, 2024"
 */
export function formatRelativeDate(isoDate: string): string {
  const date = new Date(isoDate);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  if (isNaN(diffMs)) return "";

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) return "just now";
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;
  if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`;
  if (years === 1) return "1 year ago";
  if (years > 1) return `${years} years ago`;

  // Fallback: absolute date
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
