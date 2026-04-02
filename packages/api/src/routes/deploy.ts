import { Hono } from "hono";
import type { Env, User } from "../types.js";
import { PLAN_LIMITS, PLAN_NAMES } from "../plan-limits.js";

const deploy = new Hono<{ Bindings: Env; Variables: { user: User } }>();

// ── POST /start — create deployment, return which files to upload ──
deploy.post("/start", async (c) => {
  const user = c.get("user");
  const body = await c.req.json<{
    slug: string;
    files: Record<string, string>; // { relativePath: sha256Hash }
  }>();

  if (!body.slug || !body.files) {
    return c.json({ error: "Missing slug or files manifest" }, 400);
  }

  // ── Plan enforcement: deployment count + storage ──────
  const planLimits = PLAN_LIMITS[user.plan] ?? PLAN_LIMITS.community;
  const planName = PLAN_NAMES[user.plan] ?? user.plan;

  // Check monthly deployment limit
  if (planLimits.deployments > 0) {
    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);

    const deployCount = await c.env.TOME_DB.prepare(
      `SELECT COUNT(*) as count FROM deployments
       WHERE user_id = ? AND created_at >= ?`
    )
      .bind(user.id, monthStart.toISOString())
      .first<{ count: number }>();

    if ((deployCount?.count ?? 0) >= planLimits.deployments) {
      return c.json(
        {
          error: `Monthly deployment limit reached (${planLimits.deployments} for ${planName} plan)`,
          limit: planLimits.deployments,
          used: deployCount?.count ?? 0,
          requiredPlan: "cloud",
          currentPlan: user.plan,
        },
        403,
      );
    }
  }

  // Check storage limit
  if (planLimits.storage > 0) {
    const storageUsed = await c.env.TOME_DB.prepare(
      `SELECT COALESCE(SUM(d.total_size), 0) as total FROM deployments d
       JOIN projects p ON d.project_id = p.id
       WHERE p.user_id = ? AND d.status = 'live'`
    )
      .bind(user.id)
      .first<{ total: number }>();

    const limitBytes = planLimits.storage * 1024 * 1024;
    const usedBytes = storageUsed?.total ?? 0;

    if (usedBytes >= limitBytes) {
      return c.json(
        {
          error: `Storage limit reached (${planLimits.storage}MB for ${planName} plan)`,
          limitMB: planLimits.storage,
          usedMB: Math.round(usedBytes / (1024 * 1024)),
          requiredPlan: user.plan === "community" ? "cloud" : "team",
          currentPlan: user.plan,
        },
        403,
      );
    }
  }

  // Find or create project
  let project = await c.env.TOME_DB.prepare(
    "SELECT * FROM projects WHERE slug = ? AND user_id = ?"
  )
    .bind(body.slug, user.id)
    .first();

  if (!project) {
    // Check if slug is taken by another user
    const existing = await c.env.TOME_DB.prepare(
      "SELECT id FROM projects WHERE slug = ?"
    )
      .bind(body.slug)
      .first();

    if (existing) {
      return c.json({ error: `Slug "${body.slug}" is already taken. Please choose a different project name.` }, 409);
    }

    const projectId = crypto.randomUUID();
    await c.env.TOME_DB.prepare(
      "INSERT INTO projects (id, user_id, slug, name) VALUES (?, ?, ?, ?)"
    )
      .bind(projectId, user.id, body.slug, body.slug)
      .run();
    project = { id: projectId, slug: body.slug, active_deployment_id: null };
  }

  // Determine which files need uploading (diff against current deployment)
  const needed: string[] = [];
  const activeDeploymentId = project.active_deployment_id as string | null;

  if (activeDeploymentId) {
    // Check existing files in R2
    for (const [filePath, hash] of Object.entries(body.files)) {
      const key = `sites/${body.slug}/${filePath}`;
      const existing = await c.env.TOME_BUCKET.head(key);

      if (!existing || existing.customMetadata?.hash !== hash) {
        needed.push(filePath);
      }
    }
  } else {
    // First deploy — need all files
    needed.push(...Object.keys(body.files));
  }

  // Create deployment record
  const deploymentId = crypto.randomUUID();
  await c.env.TOME_DB.prepare(
    "INSERT INTO deployments (id, project_id, user_id, status, file_count) VALUES (?, ?, ?, 'uploading', ?)"
  )
    .bind(deploymentId, project.id, user.id, Object.keys(body.files).length)
    .run();

  return c.json({
    deploymentId,
    needed, // files the client should upload
    total: Object.keys(body.files).length,
    skipped: Object.keys(body.files).length - needed.length,
  });
});

// ── POST /upload — receive a single file, write to R2 ──────────────
deploy.post("/upload", async (c) => {
  const deploymentId = c.req.header("X-Deployment-Id");
  const filePath = c.req.header("X-File-Path");
  const fileHash = c.req.header("X-File-Hash");

  if (!deploymentId || !filePath || !fileHash) {
    return c.json({ error: "Missing deployment headers" }, 400);
  }

  // Look up deployment to get the project slug
  const deployment = await c.env.TOME_DB.prepare(
    "SELECT d.*, p.slug FROM deployments d JOIN projects p ON d.project_id = p.id WHERE d.id = ?"
  )
    .bind(deploymentId)
    .first<{ id: string; slug: string; status: string }>();

  if (!deployment || deployment.status !== "uploading") {
    return c.json({ error: "Invalid or finalized deployment" }, 400);
  }

  const body = await c.req.arrayBuffer();
  const key = `sites/${deployment.slug}/${filePath}`;

  await c.env.TOME_BUCKET.put(key, body, {
    customMetadata: { hash: fileHash, deploymentId },
    httpMetadata: {
      contentType: guessContentType(filePath),
    },
  });

  // Track total size
  await c.env.TOME_DB.prepare(
    "UPDATE deployments SET total_size = total_size + ? WHERE id = ?"
  )
    .bind(body.byteLength, deploymentId)
    .run();

  return c.json({ ok: true, path: filePath, size: body.byteLength });
});

// ── POST /finalize — mark deployment live ──────────────────────────
deploy.post("/finalize", async (c) => {
  const body = await c.req.json<{ deploymentId: string }>();

  if (!body.deploymentId) {
    return c.json({ error: "Missing deploymentId" }, 400);
  }

  const deployment = await c.env.TOME_DB.prepare(
    "SELECT d.*, p.slug FROM deployments d JOIN projects p ON d.project_id = p.id WHERE d.id = ?"
  )
    .bind(body.deploymentId)
    .first<{ id: string; project_id: string; slug: string; status: string }>();

  if (!deployment) {
    return c.json({ error: "Deployment not found" }, 404);
  }

  if (deployment.status !== "uploading") {
    return c.json({ error: "Deployment already finalized" }, 400);
  }

  // Mark deployment live
  await c.env.TOME_DB.batch([
    c.env.TOME_DB.prepare(
      "UPDATE deployments SET status = 'live', finalized_at = datetime('now') WHERE id = ?"
    ).bind(body.deploymentId),
    c.env.TOME_DB.prepare(
      "UPDATE projects SET active_deployment_id = ?, updated_at = datetime('now') WHERE id = ?"
    ).bind(body.deploymentId, deployment.project_id),
  ]);

  const url = `https://${deployment.slug}.tome.center`;

  return c.json({
    url,
    deploymentId: body.deploymentId,
    status: "live",
  });
});

// ── GET /status/:id — check deployment status ─────────────────────
deploy.get("/status/:id", async (c) => {
  const id = c.req.param("id");

  const deployment = await c.env.TOME_DB.prepare(
    "SELECT d.*, p.slug FROM deployments d JOIN projects p ON d.project_id = p.id WHERE d.id = ?"
  )
    .bind(id)
    .first();

  if (!deployment) {
    return c.json({ error: "Deployment not found" }, 404);
  }

  return c.json({
    deploymentId: deployment.id,
    status: deployment.status,
    fileCount: deployment.file_count,
    totalSize: deployment.total_size,
    url: deployment.status === "live" ? `https://${deployment.slug}.tome.center` : null,
    createdAt: deployment.created_at,
    finalizedAt: deployment.finalized_at,
  });
});

// ── GET /projects — list user's projects ─────────────────────────
deploy.get("/projects", async (c) => {
  const user = c.get("user");

  const { results } = await c.env.TOME_DB.prepare(
    `SELECT p.id, p.slug, p.name, p.password_required, p.created_at, p.updated_at,
            d.status as deploy_status, d.created_at as last_deploy_at,
            d.file_count, d.total_size
     FROM projects p
     LEFT JOIN deployments d ON p.active_deployment_id = d.id
     WHERE p.user_id = ?
     ORDER BY p.updated_at DESC`
  )
    .bind(user.id)
    .all();

  return c.json(
    (results ?? []).map((r) => ({
      id: r.id,
      slug: r.slug,
      name: r.name,
      passwordRequired: r.password_required === 1,
      deployStatus: r.deploy_status ?? null,
      lastDeployAt: r.last_deploy_at ?? null,
      fileCount: r.file_count ?? 0,
      totalSize: r.total_size ?? 0,
      url: r.deploy_status === "live" ? `https://${r.slug}.tome.center` : null,
      createdAt: r.created_at,
    }))
  );
});

// ── GET /projects/:slug/deployments — deployment history ─────────
deploy.get("/projects/:slug/deployments", async (c) => {
  const user = c.get("user");
  const slug = c.req.param("slug");

  const { results } = await c.env.TOME_DB.prepare(
    `SELECT d.id, d.status, d.file_count, d.total_size, d.created_at, d.finalized_at
     FROM deployments d
     JOIN projects p ON d.project_id = p.id
     WHERE p.slug = ? AND p.user_id = ?
     ORDER BY d.created_at DESC
     LIMIT 20`
  )
    .bind(slug, user.id)
    .all();

  return c.json(
    (results ?? []).map((d) => ({
      id: d.id,
      status: d.status,
      fileCount: d.file_count,
      totalSize: d.total_size,
      createdAt: d.created_at,
      finalizedAt: d.finalized_at,
      url: d.status === "live" ? `https://${slug}.tome.center` : null,
    }))
  );
});

// ── DELETE /projects/:slug/deployments/:id — delete a single deployment ──
deploy.delete("/projects/:slug/deployments/:id", async (c) => {
  const user = c.get("user");
  const slug = c.req.param("slug");
  const id = c.req.param("id");

  // Verify project ownership
  const project = await c.env.TOME_DB.prepare(
    "SELECT id, active_deployment_id FROM projects WHERE slug = ? AND user_id = ?"
  )
    .bind(slug, user.id)
    .first<{ id: string; active_deployment_id: string | null }>();

  if (!project) {
    return c.json({ error: "Project not found" }, 404);
  }

  // Verify deployment belongs to project
  const deployment = await c.env.TOME_DB.prepare(
    "SELECT id FROM deployments WHERE id = ? AND project_id = ?"
  )
    .bind(id, project.id)
    .first<{ id: string }>();

  if (!deployment) {
    return c.json({ error: "Deployment not found" }, 404);
  }

  // If this is the active deployment, clear the reference
  const statements = [
    c.env.TOME_DB.prepare("DELETE FROM deployments WHERE id = ?").bind(id),
  ];

  if (project.active_deployment_id === id) {
    statements.push(
      c.env.TOME_DB.prepare(
        "UPDATE projects SET active_deployment_id = NULL, updated_at = datetime('now') WHERE id = ?"
      ).bind(project.id),
    );
  }

  await c.env.TOME_DB.batch(statements);

  return c.json({ removed: true });
});

// ── DELETE /projects/:slug — delete project and all associated data ──
deploy.delete("/projects/:slug", async (c) => {
  const user = c.get("user");
  const slug = c.req.param("slug");

  // Verify project ownership
  const project = await c.env.TOME_DB.prepare(
    "SELECT id FROM projects WHERE slug = ? AND user_id = ?"
  )
    .bind(slug, user.id)
    .first<{ id: string }>();

  if (!project) {
    return c.json({ error: "Project not found" }, 404);
  }

  // 1. Delete all R2 files under sites/{slug}/
  const prefix = `sites/${slug}/`;
  let cursor: string | undefined;
  do {
    const listed = await c.env.TOME_BUCKET.list({
      prefix,
      cursor,
      limit: 1000,
    });

    if (listed.objects.length > 0) {
      await Promise.all(
        listed.objects.map((obj) => c.env.TOME_BUCKET.delete(obj.key)),
      );
    }

    cursor = listed.truncated ? listed.cursor : undefined;
  } while (cursor);

  // 2. Clean up Cloudflare custom hostnames (best-effort)
  const { results: domainRows } = await c.env.TOME_DB.prepare(
    "SELECT cloudflare_hostname_id FROM domains WHERE project_id = ?"
  )
    .bind(project.id)
    .all<{ cloudflare_hostname_id: string | null }>();

  for (const row of domainRows ?? []) {
    if (row.cloudflare_hostname_id) {
      try {
        await fetch(
          `https://api.cloudflare.com/client/v4/zones/${c.env.CLOUDFLARE_ZONE_ID}/custom_hostnames/${row.cloudflare_hostname_id}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${c.env.CLOUDFLARE_API_TOKEN}` },
          },
        );
      } catch {
        // Best-effort cleanup
      }
    }
  }

  // 3. Delete DB records (order matters — no CASCADE)
  await c.env.TOME_DB.batch([
    c.env.TOME_DB.prepare("DELETE FROM domains WHERE project_id = ?").bind(project.id),
    c.env.TOME_DB.prepare("DELETE FROM deployments WHERE project_id = ?").bind(project.id),
    c.env.TOME_DB.prepare("DELETE FROM projects WHERE id = ?").bind(project.id),
  ]);

  return c.json({ removed: true });
});

// ── Helpers ────────────────────────────────────────────────────────
function guessContentType(path: string): string {
  const ext = path.split(".").pop()?.toLowerCase();
  const types: Record<string, string> = {
    html: "text/html",
    css: "text/css",
    js: "application/javascript",
    mjs: "application/javascript",
    json: "application/json",
    svg: "image/svg+xml",
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    gif: "image/gif",
    webp: "image/webp",
    ico: "image/x-icon",
    woff: "font/woff",
    woff2: "font/woff2",
    ttf: "font/ttf",
    eot: "application/vnd.ms-fontobject",
    xml: "application/xml",
    txt: "text/plain",
    map: "application/json",
  };
  return types[ext ?? ""] ?? "application/octet-stream";
}

// ── POST /protect — set password protection on a project ──
deploy.post("/protect", async (c) => {
  const user = c.get("user");
  const body = await c.req.json<{ slug: string; passwordHash: string }>();

  if (!body.slug || !body.passwordHash) {
    return c.json({ error: "Missing slug or passwordHash" }, 400);
  }

  // Verify the project belongs to this user
  const project = await c.env.TOME_DB.prepare(
    "SELECT id FROM projects WHERE slug = ? AND user_id = ?"
  ).bind(body.slug, user.id).first<{ id: string }>();

  if (!project) {
    return c.json({ error: "Project not found or not owned by you" }, 404);
  }

  await c.env.TOME_DB.prepare(
    "UPDATE projects SET password_required = 1, password_hash = ? WHERE id = ?"
  ).bind(body.passwordHash, project.id).run();

  return c.json({ ok: true, message: "Password protection enabled" });
});

// ── DELETE /protect — remove password protection from a project ──
deploy.delete("/protect", async (c) => {
  const user = c.get("user");
  const body = await c.req.json<{ slug: string }>();

  if (!body.slug) {
    return c.json({ error: "Missing slug" }, 400);
  }

  const project = await c.env.TOME_DB.prepare(
    "SELECT id FROM projects WHERE slug = ? AND user_id = ?"
  ).bind(body.slug, user.id).first<{ id: string }>();

  if (!project) {
    return c.json({ error: "Project not found or not owned by you" }, 404);
  }

  await c.env.TOME_DB.prepare(
    "UPDATE projects SET password_required = 0, password_hash = NULL WHERE id = ?"
  ).bind(project.id).run();

  return c.json({ ok: true, message: "Password protection removed" });
});

export { deploy };
