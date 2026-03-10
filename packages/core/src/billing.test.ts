import { describe, it, expect } from "vitest";
import {
  PLANS,
  getPlan,
  getTrialDays,
  calculateAnnualDiscount,
  formatPrice,
  createCheckoutSession,
  createPortalSession,
  handleWebhookEvent,
} from "./billing.js";

describe("PLANS", () => {
  it("has all three plans defined", () => {
    expect(Object.keys(PLANS)).toEqual(["community", "cloud", "team"]);
  });

  it("community plan has $0 price", () => {
    expect(PLANS.community.price).toBe(0);
    expect(PLANS.community.annualPrice).toBe(0);
  });

  it("cloud plan has $19.99/month (1999 cents)", () => {
    expect(PLANS.cloud.price).toBe(1999);
  });

  it("team plan has $49.99/month (4999 cents)", () => {
    expect(PLANS.team.price).toBe(4999);
  });

  it("all plans have features array", () => {
    for (const plan of Object.values(PLANS)) {
      expect(Array.isArray(plan.features)).toBe(true);
      expect(plan.features.length).toBeGreaterThan(0);
    }
  });

  it("community plan limits are correct", () => {
    expect(PLANS.community.limits).toEqual({
      deployments: 10,
      customDomains: 0,
      teamMembers: 1,
      storage: 100,
    });
  });

  it("cloud plan limits are correct", () => {
    expect(PLANS.cloud.limits).toEqual({
      deployments: -1,
      customDomains: 1,
      teamMembers: 3,
      storage: 1000,
    });
  });

  it("team plan limits are correct", () => {
    expect(PLANS.team.limits).toEqual({
      deployments: -1,
      customDomains: -1,
      teamMembers: -1,
      storage: 10000,
    });
  });
});

describe("getPlan", () => {
  it("returns the correct plan by ID", () => {
    const cloud = getPlan("cloud");
    expect(cloud).not.toBeNull();
    expect(cloud!.id).toBe("cloud");
    expect(cloud!.name).toBe("Cloud");
    expect(cloud!.price).toBe(1999);
  });

  it("returns null for unknown plan", () => {
    expect(getPlan("enterprise")).toBeNull();
    expect(getPlan("")).toBeNull();
    expect(getPlan("nonexistent")).toBeNull();
  });
});

describe("getTrialDays", () => {
  it("returns 14", () => {
    expect(getTrialDays()).toBe(14);
  });
});

describe("calculateAnnualDiscount", () => {
  it("returns correct savings for cloud plan (2 months free)", () => {
    const discount = calculateAnnualDiscount(PLANS.cloud);
    // 12 * 1999 = 23988, annual = 19990, savings = 3998
    expect(discount).toBe(3998);
  });

  it("returns correct savings for team plan (2 months free)", () => {
    const discount = calculateAnnualDiscount(PLANS.team);
    // 12 * 4999 = 59988, annual = 49990, savings = 9998
    expect(discount).toBe(9998);
  });

  it("returns 0 for community plan", () => {
    const discount = calculateAnnualDiscount(PLANS.community);
    expect(discount).toBe(0);
  });
});

describe("formatPrice", () => {
  it("formats cents to dollar strings", () => {
    expect(formatPrice(1999)).toBe("$19.99");
    expect(formatPrice(4999)).toBe("$49.99");
    expect(formatPrice(0)).toBe("$0.00");
    expect(formatPrice(19000)).toBe("$190.00");
    expect(formatPrice(99)).toBe("$0.99");
    expect(formatPrice(1050)).toBe("$10.50");
  });
});

describe("createCheckoutSession", () => {
  it("returns URL and sessionId", async () => {
    const result = await createCheckoutSession({
      planId: "cloud",
      email: "user@example.com",
      successUrl: "https://example.com/success",
      cancelUrl: "https://example.com/cancel",
    });

    expect(result.url).toBe("https://checkout.stripe.com/mock-session");
    expect(result.sessionId).toMatch(/^cs_mock_cloud_/);
  });

  it("validates plan exists", async () => {
    await expect(
      createCheckoutSession({
        planId: "nonexistent",
        email: "user@example.com",
        successUrl: "https://example.com/success",
        cancelUrl: "https://example.com/cancel",
      }),
    ).rejects.toThrow("Unknown plan: nonexistent");
  });

  it("accepts annual option", async () => {
    const result = await createCheckoutSession({
      planId: "team",
      email: "user@example.com",
      annual: true,
      successUrl: "https://example.com/success",
      cancelUrl: "https://example.com/cancel",
    });

    expect(result.url).toBe("https://checkout.stripe.com/mock-session");
    expect(result.sessionId).toMatch(/^cs_mock_team_/);
  });
});

describe("createPortalSession", () => {
  it("returns URL", async () => {
    const result = await createPortalSession({
      customerId: "cus_123",
      returnUrl: "https://example.com/settings",
    });

    expect(result.url).toBe(
      "https://billing.stripe.com/mock-portal/cus_123",
    );
  });
});

describe("handleWebhookEvent", () => {
  it("returns type and handled status", async () => {
    const payload = JSON.stringify({
      type: "checkout.session.completed",
      data: { object: { id: "cs_123" } },
    });

    const result = await handleWebhookEvent(payload, "whsec_test_sig");

    expect(result.type).toBe("checkout.session.completed");
    expect(result.handled).toBe(true);
  });

  it("handles subscription events", async () => {
    const payload = JSON.stringify({
      type: "customer.subscription.updated",
      data: { object: { id: "sub_123" } },
    });

    const result = await handleWebhookEvent(payload, "whsec_test_sig");

    expect(result.type).toBe("customer.subscription.updated");
    expect(result.handled).toBe(true);
  });
});
