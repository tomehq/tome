import { Hono } from "hono";
import Stripe from "stripe";
import type { Env } from "../types.js";

const webhooks = new Hono<{ Bindings: Env }>();

// ── POST /stripe — receive Stripe webhook events ───────
webhooks.post("/stripe", async (c) => {
  const stripe = new Stripe(c.env.STRIPE_SECRET_KEY);
  const signature = c.req.header("Stripe-Signature");

  if (!signature) {
    return c.json({ error: "Missing Stripe-Signature header" }, 400);
  }

  const body = await c.req.text();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      c.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return c.json({ error: "Invalid webhook signature" }, 400);
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.customer && session.subscription) {
        // Look up subscription to find the plan
        const sub = await stripe.subscriptions.retrieve(
          session.subscription as string
        );
        const priceId = sub.items.data[0]?.price?.id;
        const plan = Object.entries({
          community: "price_1T9F2SPMQbf7oJzSNiMbUulc",
          cloud: "price_1T9F1GPMQbf7oJzS1xKgN8U1",
          team: "price_1T9F1yPMQbf7oJzSHh8f9djU",
        }).find(([, v]) => v === priceId)?.[0] ?? "community";

        await c.env.TOME_DB.prepare(
          "UPDATE users SET plan = ?, stripe_customer_id = ?, updated_at = datetime('now') WHERE stripe_customer_id = ? OR email = ?"
        )
          .bind(plan, session.customer as string, session.customer as string, session.customer_email ?? "")
          .run();
      }
      break;
    }

    case "customer.subscription.updated": {
      const sub = event.data.object as Stripe.Subscription;
      const priceId = sub.items.data[0]?.price?.id;
      const plan = Object.entries({
        community: "price_1T9F2SPMQbf7oJzSNiMbUulc",
        cloud: "price_1T9F1GPMQbf7oJzS1xKgN8U1",
        team: "price_1T9F1yPMQbf7oJzSHh8f9djU",
      }).find(([, v]) => v === priceId)?.[0] ?? "community";

      await c.env.TOME_DB.prepare(
        "UPDATE users SET plan = ?, updated_at = datetime('now') WHERE stripe_customer_id = ?"
      )
        .bind(plan, sub.customer as string)
        .run();
      break;
    }

    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      await c.env.TOME_DB.prepare(
        "UPDATE users SET plan = 'community', updated_at = datetime('now') WHERE stripe_customer_id = ?"
      )
        .bind(sub.customer as string)
        .run();
      break;
    }
  }

  return c.json({ type: event.type, handled: true });
});

export { webhooks };
