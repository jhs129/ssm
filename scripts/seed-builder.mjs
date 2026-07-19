/**
 * Builder.io provisioning / seed script.
 *
 * Run once to bootstrap the ssm Builder space:
 *
 *   pnpm --filter web init:builder
 *
 * Idempotent — re-running it skips anything that already exists.
 *
 * What it does:
 *   1. Creates the shared `metadata` data model (SEO description + keywords).
 *   2. Creates the `article` section model used by /blogs/[handle], with the
 *      shared `metadata` model-field appended so it exposes the same
 *      `data.metadata` shape as `page`. Using `kind: "component"` because
 *      articles are fetched by `data.handle` rather than URL path.
 *   3. Adds the `metadata` model-field to the built-in `page` model and sets
 *      Dynamic Preview URL logic on both `page` and `article` so the Builder
 *      editor previews against the running app's routes.
 *   4. Seeds a sample `article` entry (`hello-world`) so /blogs/hello-world
 *      is immediately testable.
 *
 * Skips `site-context`, `navigation`, and `url-redirect` — ssm has no
 * consumer for those models; its nav/footer stay coded.
 *
 * Credentials are read from apps/web/.env.local:
 *   - BUILDER_PRIVATE_KEY          (bpk-...)  — required, for writes
 *   - NEXT_PUBLIC_BUILDER_API_KEY             — required, to check existing content
 */

import { GraphQLClient, gql } from "graphql-request";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const WEB_APP_DIR = join(__dirname, "..", "apps", "web");

// --- Load apps/web/.env.local (standalone node scripts don't get Next's env loading) ---
function loadEnvLocal() {
  try {
    const raw = readFileSync(join(WEB_APP_DIR, ".env.local"), "utf8");
    for (const line of raw.split("\n")) {
      const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (match && !process.env[match[1]]) {
        process.env[match[1]] = match[2].replace(/^["']|["']$/g, "").trim();
      }
    }
  } catch {
    // No .env.local — fall back to whatever is already in the environment.
  }
}
loadEnvLocal();

const PRIVATE_KEY = process.env.BUILDER_PRIVATE_KEY;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_BUILDER_API_KEY;

const ARTICLE_MODEL_NAME = "article";
// Shared SEO metadata model, referenced as a `model`-type field by every model
// that maps 1:1 to a web page (article, page) so they share one metadata shape.
const METADATA_MODEL_NAME = "metadata";
// Builder's built-in catch-all page model (not created by this script).
const PAGE_MODEL_NAME = "page";
const ADMIN_API = "https://cdn.builder.io/api/v2/admin";
const writeApi = (model) => `https://builder.io/api/v1/write/${model}`;

if (!PRIVATE_KEY) {
  console.error("✗ BUILDER_PRIVATE_KEY is missing from apps/web/.env.local");
  process.exit(1);
}
if (!PUBLIC_KEY) {
  console.error("✗ NEXT_PUBLIC_BUILDER_API_KEY is missing from apps/web/.env.local");
  process.exit(1);
}

const client = new GraphQLClient(ADMIN_API, {
  headers: { Authorization: `Bearer ${PRIVATE_KEY}` },
});

// --- Field helper: Builder fills in the rest of the defaults server-side. ---
const field = (name, type, extra = {}) => ({
  "@type": "@builder.io/core:Field",
  name,
  type,
  required: false,
  helperText: "",
  subFields: [],
  ...extra,
});

// A `model`-type field embeds another model's schema inline. We use it to give
// every page-like model the same `metadata` shape. The target model is
// referenced by `modelId`, which is resolved at runtime (it differs per space).
const metadataField = (modelId) =>
  field("metadata", "model", {
    modelId,
    helperText: "Shared SEO metadata (description + keywords).",
  });

// --- Dynamic Preview URL logic (Builder's `editingUrlLogic` on the model). ---
// This is the "code" version of the preview URL (the `< >` toggle in the editor),
// stored as a JS function body. See https://www.builder.io/c/docs/dynamic-preview-urls.

// The page model is the catch-all route — preview the urlPath directly.
const PAGE_PREVIEW_URL_LOGIC = "return `${space.siteUrl}${targeting.urlPath}`;";

// Articles render at /blogs/<handle>; fall back to localhost when no site URL
// is configured on the space.
const ARTICLE_PREVIEW_URL_LOGIC = [
  "const baseUrl = space.siteUrl || 'http://localhost:3000';",
  "return `${baseUrl}/blogs/${content.data.handle || '_'}?preview=true`;",
].join("\n");

// --- metadata model definition ---
// kind: "data" — a small reusable SEO block embedded via `model`-type fields.
const METADATA_MODEL_BODY = {
  name: METADATA_MODEL_NAME,
  kind: "data",
  showTargeting: false,
  fields: [
    field("description", "text", {
      helperText: "SEO meta description for the page.",
    }),
    field("keywords", "Tags", {
      helperText: "SEO keywords for the page.",
    }),
  ],
};

// --- article model definition ---
// kind: "component" — Builder's internal name for what the sidebar labels
// "Section models". Articles carry visual-editor blocks but are fetched by
// data.handle rather than URL path, so they belong here rather than under
// "Page models" (kind: "page").
const ARTICLE_MODEL_BODY = {
  name: ARTICLE_MODEL_NAME,
  kind: "component",
  showTargeting: false,
  editingUrlLogic: ARTICLE_PREVIEW_URL_LOGIC,
  fields: [
    field("handle", "text", {
      helperText: "URL slug for the article (used at /blogs/<handle>).",
      required: true,
    }),
    field("title", "text", { helperText: "Article headline." }),
    field("subtitle", "text", { helperText: "Article subtitle / eyebrow." }),
    field("image", "file", {
      helperText: "Hero image for the article.",
      allowedFileTypes: ["jpeg", "jpg", "png", "svg", "webp"],
    }),
    field("excerpt", "longText", {
      helperText: "Short summary shown in listings and the hero.",
    }),
    field("publishDate", "date", {
      helperText: "Publication date (used for schema + display).",
    }),
    // The `metadata` model-field is appended at runtime (it needs the resolved
    // metadata model id) — see main().
  ],
};

const SAMPLE_ARTICLE_HANDLE = "hello-world";

const SAMPLE_ARTICLE_DATA = {
  handle: SAMPLE_ARTICLE_HANDLE,
  title: "Hello World",
  subtitle: "Your first article",
  image: "https://placehold.co/800x600/EEE/5ce1e6.png",
  excerpt:
    "A sample article seeded by the seed script. Edit or delete it in the Builder.io editor.",
  publishDate: "2024-01-01",
  metadata: {
    description: "A sample article seeded for ssm.",
    keywords: ["ssm", "blog"],
  },
};

const ADD_MODEL = gql`
  mutation addModel($body: JSONObject!) {
    addModel(body: $body) {
      id
      name
    }
  }
`;

const UPDATE_MODEL = gql`
  mutation updateModel($body: UpdateModelInput!) {
    updateModel(body: $body) {
      id
      name
    }
  }
`;

const LIST_MODELS = gql`
  query {
    models {
      id
      name
      kind
      fields
      examplePageUrl
      everything
    }
  }
`;

// Returns true if it created the model, false if it already existed.
async function ensureModel(modelBody, existingNames) {
  if (existingNames.has(modelBody.name)) {
    console.log(`• Model "${modelBody.name}" already exists — skipping creation.`);
    return false;
  }
  const { addModel } = await client.request(ADD_MODEL, { body: modelBody });
  console.log(`✓ Created model "${addModel.name}" (id: ${addModel.id}).`);
  return true;
}

// Like ensureModel but returns the model's id (whether it already existed or
// was just created). Used for the metadata model, whose id other models embed.
async function ensureModelReturningId(modelBody, models) {
  const existing = models.find((m) => m.name === modelBody.name);
  if (existing) {
    console.log(`• Model "${modelBody.name}" already exists — skipping creation.`);
    return existing.id;
  }
  const { addModel } = await client.request(ADD_MODEL, { body: modelBody });
  console.log(`✓ Created model "${addModel.name}" (id: ${addModel.id}).`);
  return addModel.id;
}

// Appends any of `requiredFields` missing from an existing model. Used to add
// the shared `metadata` field to the article/page models.
async function ensureModelHasFields(modelName, requiredFields, models) {
  const model = models.find((m) => m.name === modelName);
  if (!model) {
    console.log(`• Model "${modelName}" not found — skipping field check.`);
    return;
  }
  const existing = Array.isArray(model.fields) ? model.fields : [];
  const existingNames = new Set(existing.map((f) => f.name));
  const missing = requiredFields.filter((f) => !existingNames.has(f.name));
  if (missing.length === 0) {
    console.log(`• Model "${modelName}" already has required field(s) — skipping.`);
    return;
  }
  // UpdateModelInput is { id, data } — and name/kind are immutable, so the
  // `data` payload carries only the (full) replacement fields array.
  const newFields = [...existing, ...missing];
  await client.request(UPDATE_MODEL, {
    body: { id: model.id, data: { fields: newFields } },
  });
  model.fields = newFields;
  console.log(
    `✓ Added ${missing.map((f) => `"${f.name}"`).join(", ")} field(s) to "${modelName}".`
  );
}

// Sets the model's Dynamic Preview URL logic — the code-mode preview URL stored
// in `editingUrlLogic`. Idempotent: skips when the existing logic already
// contains our `return` statement.
async function ensurePreviewUrl(modelName, logic, models) {
  const model = models.find((m) => m.name === modelName);
  if (!model) {
    console.log(`• Model "${modelName}" not found — skipping preview URL.`);
    return;
  }

  const current = model.everything?.editingUrlLogic || "";
  const signature =
    logic.split("\n").find((line) => line.trim().startsWith("return")) || logic;

  if (current.includes(signature)) {
    console.log(`• Model "${modelName}" preview URL already set — skipping.`);
    return;
  }

  await client.request(UPDATE_MODEL, {
    body: { id: model.id, data: { editingUrlLogic: logic } },
  });
  console.log(`✓ Set preview URL logic on "${modelName}".`);
}

// Returns the first matching content entry, or null.
async function getEntry(model, name) {
  const url =
    `https://cdn.builder.io/api/v3/content/${model}` +
    `?apiKey=${PUBLIC_KEY}` +
    `&query.name=${encodeURIComponent(name)}` +
    `&limit=1&cachebust=true&noTargeting=true`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const json = await res.json();
  return Array.isArray(json.results) && json.results.length > 0
    ? json.results[0]
    : null;
}

// Creates the entry if it doesn't exist. Returns the entry id either way.
async function ensureContent(model, name, data) {
  const existing = await getEntry(model, name);
  if (existing) {
    console.log(
      `• Entry "${name}" already exists in "${model}" — skipping seed.`
    );
    return existing.id;
  }
  const res = await fetch(writeApi(model), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${PRIVATE_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, published: "published", data }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Write API failed (${res.status}): ${text}`);
  }
  const created = await res.json();
  console.log(`✓ Seeded "${model}" entry "${name}" (id: ${created.id}).`);
  return created.id;
}

async function main() {
  console.log(`\nProvisioning Builder space...\n`);

  const { models } = await client.request(LIST_MODELS);
  const existingNames = new Set(models.map((m) => m.name));

  // The metadata model must exist before article/page can embed it: a
  // `model`-type field points at it by id, which differs per Builder space.
  const metadataModelId = await ensureModelReturningId(METADATA_MODEL_BODY, models);
  const metaField = metadataField(metadataModelId);

  // Give a freshly-created article the metadata field at creation time.
  ARTICLE_MODEL_BODY.fields.push(metaField);
  const createdArticle = await ensureModel(ARTICLE_MODEL_BODY, existingNames);

  // An existing article model (one that predates this field) gets it here too.
  if (!createdArticle) {
    await ensureModelHasFields(ARTICLE_MODEL_NAME, [metaField], models);
  }
  await ensureModelHasFields(PAGE_MODEL_NAME, [metaField], models);

  // Dynamic preview URLs: the built-in `page` model always needs it set here;
  // the `article` model gets it from ARTICLE_MODEL_BODY when freshly created,
  // otherwise update the existing model.
  await ensurePreviewUrl(PAGE_MODEL_NAME, PAGE_PREVIEW_URL_LOGIC, models);
  if (!createdArticle) {
    await ensurePreviewUrl(ARTICLE_MODEL_NAME, ARTICLE_PREVIEW_URL_LOGIC, models);
  }

  // The CDN takes a moment to register a brand-new model before it will
  // accept writes against it.
  if (createdArticle) {
    await new Promise((r) => setTimeout(r, 2000));
  }

  await ensureContent(ARTICLE_MODEL_NAME, SAMPLE_ARTICLE_HANDLE, SAMPLE_ARTICLE_DATA);

  console.log("\nDone.\n");
}

main().catch((err) => {
  console.error("\n✗ Seed failed:", err.message || err);
  process.exit(1);
});
