import { Hono } from "hono";
import Stripe from "stripe";
import type { Env, User } from "../types.js";
import { PLAN_LIMITS, PLAN_NAMES } from "../plan-limits.js";

const billing = new Hono<{ Bindings: Env; Variables: { user: User } }>();

// ── Plan pricing (cents) ─────────────────────────────────
const PLAN_PRICES: Record<string, number> = {
  cloud: 1999, // $19.99/mo
  team: 4999, // $49.99/mo
};

// ── Helpers ───────────────────────────────────────────────

/**
 * Ensure a Stripe product + recurring price exist for a given plan.
 * Uses metadata `tome_plan` to find existing products/prices.
 * Creates them if they don't exist.
 */
async function ensureStripePrice(
  stripe: Stripe,
  planId: string,
): Promise<string> {
  const price = PLAN_PRICES[planId];
  if (!price) throw new Error(`No pricing defined for plan: ${planId}`);

  // Search for an existing active price with our metadata
  const existingPrices = await stripe.prices.search({
    query: `metadata["tome_plan"]:"${planId}" active:"true"`,
  });

  if (existingPrices.data.length > 0) {
    return existingPrices.data[0].id;
  }

  // Search for an existing product
  const existingProducts = await stripe.products.search({
    query: `metadata["tome_plan"]:"${planId}"`,
  });

  let productId: string;
  if (existingProducts.data.length > 0) {
    productId = existingProducts.data[0].id;
  } else {
    // Create the product
    const product = await stripe.products.create({
      name: `Tome ${PLAN_NAMES[planId] ?? planId}`,
      description: `Tome documentation platform — ${PLAN_NAMES[planId] ?? planId} plan`,
      metadata: { tome_plan: planId },
    });
    productId = product.id;
  }

  // Create the recurring monthly price
  const newPrice = await stripe.prices.create({
    product: productId,
    unit_amount: price,
    currency: "usd",
    recurring: { interval: "month" },
    metadata: { tome_plan: planId },
  });

  return newPrice.id;
}

// ── POST /checkout — create Stripe Checkout session ──────
billing.post("/checkout", async (c) => {
  const user = c.get("user");
  const { planId, successUrl, cancelUrl } = await c.req.json<{
    planId: string;
    successUrl: string;
    cancelUrl: string;
    annual?: boolean;
  }>();

  if (!PLAN_PRICES[planId]) {
    return c.json({ error: `Unknown plan: ${planId}` }, 400);
  }

  if (user.plan === planId) {
    return c.json({ error: "You are already on this plan" }, 400);
  }

  const stripe = new Stripe(c.env.STRIPE_SECRET_KEY);

  // Ensure the Stripe product/price exists (auto-creates if missing)
  let priceId: string;
  try {
    priceId = await ensureStripePrice(stripe, planId);
  } catch (err) {
    console.error("Failed to ensure Stripe price:", err);
    return c.json({ error: "Failed to initialize plan pricing" }, 500);
  }

  // Find or create Stripe customer
  let customerId = user.stripe_customer_id;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: { tome_user_id: user.id },
    });
    customerId = customer.id;
    await c.env.TOME_DB.prepare(
      "UPDATE users SET stripe_customer_id = ?, updated_at = datetime('now') WHERE id = ?",
    )
      .bind(customerId, user.id)
      .run();
  }

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    subscription_data: {
      trial_period_days: 14,
      metadata: { tome_plan: planId, tome_user_id: user.id },
    },
    success_url: successUrl,
    cancel_url: cancelUrl,
    allow_promotion_codes: true,
  });

  return c.json({ url: session.url, sessionId: session.id });
});

// ── POST /portal — create Stripe Customer Portal session ─
billing.post("/portal", async (c) => {
  const user = c.get("user");
  const { returnUrl } = await c.req.json<{ returnUrl: string }>();

  if (!user.stripe_customer_id) {
    return c.json({ error: "No billing account found" }, 400);
  }

  const stripe = new Stripe(c.env.STRIPE_SECRET_KEY);
  const session = await stripe.billingPortal.sessions.create({
    customer: user.stripe_customer_id,
    return_url: returnUrl,
  });

  return c.json({ url: session.url });
});

// ── POST /setup — one-time Stripe initialization ────────
// Creates products, prices, webhook endpoint, and portal config.
// Should be called once after deploying with a valid Stripe key.
billing.post("/setup", async (c) => {
  const user = c.get("user");
  const stripe = new Stripe(c.env.STRIPE_SECRET_KEY);

  const results: Record<string, { productId: string; priceId: string }> = {};

  for (const [planId, price] of Object.entries(PLAN_PRICES)) {
    const priceId = await ensureStripePrice(stripe, planId);

    // Retrieve the price to get the product ID
    const priceObj = await stripe.prices.retrieve(priceId);
    results[planId] = {
      productId: priceObj.product as string,
      priceId,
    };
  }

  // Create webhook endpoint (if it doesn't already exist)
  const webhookUrl = `https://tome-api.tome-api.workers.dev/api/webhooks/stripe`;
  let webhookResult: { id: string; secret?: string } | null = null;

  try {
    const existingWebhooks = await stripe.webhookEndpoints.list({ limit: 100 });
    const existing = existingWebhooks.data.find((w) => w.url === webhookUrl);

    if (existing) {
      webhookResult = { id: existing.id };
    } else {
      const webhook = await stripe.webhookEndpoints.create({
        url: webhookUrl,
        enabled_events: [
          "checkout.session.completed",
          "customer.subscription.updated",
          "customer.subscription.deleted",
        ],
      });
      webhookResult = { id: webhook.id, secret: webhook.secret ?? undefined };
    }
  } catch (err) {
    console.error("Webhook setup error:", err);
  }

  // Configure customer portal
  let portalConfigured = false;
  try {
    const productPrices = Object.entries(results).map(([, r]) => ({
      product: r.productId,
      prices: [r.priceId],
    }));

    await stripe.billingPortal.configurations.create({
      business_profile: {
        headline: "Manage your Tome subscription",
      },
      features: {
        subscription_cancel: { enabled: true, mode: "at_period_end" },
        subscription_update: {
          enabled: true,
          default_allowed_updates: ["price"],
          proration_behavior: "create_prorations",
          products: productPrices,
        },
      },
    });
    portalConfigured = true;
  } catch (err) {
    console.error("Portal config error:", err);
  }

  return c.json({
    products: results,
    webhook: webhookResult,
    portalConfigured,
    message: webhookResult?.secret
      ? "Save the webhook secret as STRIPE_WEBHOOK_SECRET via: wrangler secret put STRIPE_WEBHOOK_SECRET"
      : "Webhook already exists. Products and portal configured.",
  });
});

export { billing };
