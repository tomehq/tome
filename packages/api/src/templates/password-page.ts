/**
 * HTML template for the password protection page.
 * Self-contained - no external dependencies.
 */

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function passwordPageHtml(slug: string, error?: string): string {
  const safeSlug = escapeHtml(slug);
  const safeError = error ? escapeHtml(error) : undefined;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Password Required</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      display: flex; align-items: center; justify-content: center;
      min-height: 100vh; background: #0f0f0f; color: #e0e0e0;
    }
    .card {
      background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 8px;
      padding: 40px; max-width: 400px; width: 100%;
    }
    h1 { font-size: 20px; margin-bottom: 8px; color: #fff; }
    p { font-size: 14px; color: #888; margin-bottom: 24px; }
    .error { color: #ef4444; font-size: 13px; margin-bottom: 16px; }
    input {
      width: 100%; padding: 10px 14px; font-size: 14px;
      background: #0f0f0f; border: 1px solid #333; border-radius: 4px;
      color: #e0e0e0; outline: none; margin-bottom: 16px;
    }
    input:focus { border-color: #e8a845; }
    button {
      width: 100%; padding: 10px; font-size: 14px; font-weight: 600;
      background: #e8a845; border: none; border-radius: 4px;
      color: #000; cursor: pointer;
    }
    button:hover { background: #d4952f; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Password Required</h1>
    <p>This documentation is password-protected. Enter the password to continue.</p>
    ${safeError ? `<div class="error">${safeError}</div>` : ""}
    <form method="POST" action="/api/sites/${safeSlug}/authenticate">
      <input type="password" name="password" placeholder="Enter password" autofocus required />
      <input type="hidden" name="redirect" value="/" />
      <button type="submit">Continue</button>
    </form>
  </div>
</body>
</html>`;
}
