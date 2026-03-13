import { describe, it, expect } from "vitest";
import { PLAN_LIMITS, PLAN_NAMES } from "./plan-limits.js";

describe("PLAN_LIMITS", () => {
  it("defines all three plan tiers", () => {
    expect(Object.keys(PLAN_LIMITS)).toEqual(["community", "cloud", "team"]);
  });

  it("community plan has restrictive limits", () => {
    const community = PLAN_LIMITS.community;
    expect(community.deployments).toBe(10);
    expect(community.customDomains).toBe(0);
    expect(community.teamMembers).toBe(1);
    expect(community.storage).toBe(100);
  });

  it("cloud plan has moderate limits", () => {
    const cloud = PLAN_LIMITS.cloud;
    expect(cloud.deployments).toBe(-1); // unlimited
    expect(cloud.customDomains).toBe(1);
    expect(cloud.teamMembers).toBe(3);
    expect(cloud.storage).toBe(1000);
  });

  it("team plan has unlimited deployments and domains", () => {
    const team = PLAN_LIMITS.team;
    expect(team.deployments).toBe(-1);
    expect(team.customDomains).toBe(-1);
    expect(team.teamMembers).toBe(-1);
    expect(team.storage).toBe(10000);
  });

  it("each plan has all required limit fields", () => {
    for (const [plan, limits] of Object.entries(PLAN_LIMITS)) {
      expect(limits).toHaveProperty("deployments");
      expect(limits).toHaveProperty("customDomains");
      expect(limits).toHaveProperty("teamMembers");
      expect(limits).toHaveProperty("storage");
      expect(typeof limits.deployments).toBe("number");
      expect(typeof limits.customDomains).toBe("number");
      expect(typeof limits.teamMembers).toBe("number");
      expect(typeof limits.storage).toBe("number");
    }
  });

  it("plan tiers are progressively less restrictive", () => {
    const { community, cloud, team } = PLAN_LIMITS;
    // Storage increases: community < cloud < team
    expect(community.storage).toBeLessThan(cloud.storage);
    expect(cloud.storage).toBeLessThan(team.storage);
    // Team members: community < cloud
    expect(community.teamMembers).toBeLessThan(cloud.teamMembers);
  });
});

describe("PLAN_NAMES", () => {
  it("defines display names for all plans", () => {
    expect(PLAN_NAMES.community).toBe("Community");
    expect(PLAN_NAMES.cloud).toBe("Cloud");
    expect(PLAN_NAMES.team).toBe("Team");
  });

  it("has matching keys with PLAN_LIMITS", () => {
    expect(Object.keys(PLAN_NAMES).sort()).toEqual(Object.keys(PLAN_LIMITS).sort());
  });
});
