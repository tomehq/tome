import { createMiddleware } from "hono/factory";
import type { Env, User } from "../types.js";

const PLAN_LEVELS: Record<string, number> = {
  community: 0,
  cloud: 1,
  team: 2,
};

/**
 * Middleware that requires the user to be on a minimum plan level.
 * Must be applied AFTER the auth middleware (needs c.get("user")).
 *
 * Returns 403 with { error, requiredPlan, currentPlan } if the user's
 * plan is below the minimum.
 */
export function requirePlan(minPlan: "cloud" | "team") {
  type PlanEnv = { Bindings: Env; Variables: { user: User } };

  return createMiddleware<PlanEnv>(async (c, next) => {
    const user = c.get("user");
    const userLevel = PLAN_LEVELS[user.plan] ?? 0;
    const requiredLevel = PLAN_LEVELS[minPlan];

    if (userLevel < requiredLevel) {
      const label = minPlan.charAt(0).toUpperCase() + minPlan.slice(1);
      return c.json(
        {
          error: `This feature requires the ${label} plan or higher`,
          requiredPlan: minPlan,
          currentPlan: user.plan,
        },
        403,
      );
    }

    await next();
  });
}
