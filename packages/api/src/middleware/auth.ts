import { createMiddleware } from "hono/factory";
import type { Env, User } from "../types.js";

type AuthEnv = {
  Bindings: Env;
  Variables: { user: User };
};

export const auth = createMiddleware<AuthEnv>(async (c, next) => {
  const header = c.req.header("Authorization");
  if (!header?.startsWith("Bearer ")) {
    return c.json({ error: "Missing or invalid Authorization header" }, 401);
  }

  const token = header.slice(7);
  const result = await c.env.TOME_DB.prepare(
    "SELECT * FROM users WHERE api_token = ?"
  )
    .bind(token)
    .first<User>();

  if (!result) {
    return c.json({ error: "Invalid API token" }, 401);
  }

  c.set("user", result);
  await next();
});
