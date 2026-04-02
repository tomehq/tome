// ── Plan limits for server-side enforcement ─────────────
// Mirrors PLANS.limits from @tomehq/core/billing for use in Workers runtime

export const PLAN_LIMITS: Record<
  string,
  {
    deployments: number; // per month (-1 = unlimited)
    customDomains: number; // -1 = unlimited
    teamMembers: number; // -1 = unlimited
    storage: number; // MB
    sso: boolean;
  }
> = {
  community: { deployments: 10, customDomains: 0, teamMembers: 1, storage: 100, sso: false },
  cloud: { deployments: -1, customDomains: 1, teamMembers: 3, storage: 1000, sso: false },
  team: { deployments: -1, customDomains: -1, teamMembers: -1, storage: 10000, sso: true },
};

export const PLAN_NAMES: Record<string, string> = {
  community: "Community",
  cloud: "Cloud",
  team: "Team",
};
