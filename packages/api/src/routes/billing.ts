import { Hono } from "hono";
import Stripe from "stripe";
import type { Env, User } from "../types.js";

const billing = new Hono<{ Bindings: Env; Variables: { user: User } }>();

const STRIPE_PRICE_IDS: Record<string, string> = {
  community: "price_1T9F2SPMQbf7oJzSNiMbUulc",
  cloud: "price_1T9F1GPMQbf7oJzS1xKgN8U1",
  team: "price_1T9F1yPMQbf7oJzSHh8f9djU",
};

// ── POST /checkout — create Stripe Checkout session ────
billing.post("/checkout", async (c) => {
  const user = c.get("user");
  const { planId, successUrl, cancelUrl, annual } = await c.req.json<{
    planId: string;
    successUrl: string;
    cancelUrl: string;
    annual?: boolean;
  }>();

  const priceId = STRIPE_PRICE_IDS[planId];
  if (!priceId) {
    return c.json({ error: `Unknown plan: ${planId}` }, 400);
  }

  const stripe = new Stripe(c.env.STRIPE_SECRET_KEY);

  // Find or create Stripe customer
  let customerId = user.stripe_customer_id;
  if (!customerId) {
    const customer = await stripe.customers.create({ email: user.email });
    customerId = customer.id;
    await c.env.TOME_DB.prepare(
      "UPDATE users SET stripe_customer_id = ?, updated_at = datetime('now') WHERE id = ?"
    )
      .bind(customerId, user.id)
      .run();
  }

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    subscription_data: {
      trial_period_days: 14,
    },
    success_url: successUrl,
    cancel_url: cancelUrl,
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

export { billing };
