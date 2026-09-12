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
 *   5. Creates the `show` section model used by /shows/[slug], with the
 *      shared `metadata` model-field appended, and seeds the three real
 *      show entries (Schneider Sports Media, Inside the Nest RHS, Atlanta
 *      Sportscast).
 *
 * Skips `site-context`, `navigation`, and `url-redirect` — ssm has no
 * consumer for those models; its nav/footer stay coded.
 *
 * Credentials are read from apps/web/.env.local:
 *   - BUILDER_PRIVATE_KEY              (bpk-...)  — required, for writes
 *   - NEXT_PUBLIC_BUILDER_API_KEY                 — required, to check existing content
 *   - VERCEL_AUTOMATION_BYPASS_SECRET  (bps-...)  — optional, see below
 *
 * VERCEL_AUTOMATION_BYPASS_SECRET, if set, gets baked into the generated
 * preview URL logic (not this file) so Builder's editor iframe can load
 * preview deployments sitting behind Vercel Deployment Protection. Without
 * it, protected preview URLs load a Vercel SSO page in the iframe, which
 * also sends X-Frame-Options: DENY and fails to render at all. See
 * https://vercel.com/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation
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
const SHOW_MODEL_NAME = "show";
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

// Appended to the generated preview URL below (not to this file's own source)
// so a Vercel Deployment Protection SSO wall doesn't block Builder's editor
// iframe. `samesitenone`, not `true`, is required specifically for iframe
// embedding — see the module doc comment above for the reference link.
const BYPASS_SECRET = process.env.VERCEL_AUTOMATION_BYPASS_SECRET || "";
const bypassParams = BYPASS_SECRET
  ? "x-vercel-protection-bypass=" + BYPASS_SECRET + "&x-vercel-set-bypass-cookie=samesitenone"
  : "";

// The page model is the catch-all route — preview the urlPath directly.
const PAGE_PREVIEW_URL_LOGIC = bypassParams
  ? "return `${space.siteUrl}${targeting.urlPath}?" + bypassParams + "`;"
  : "return `${space.siteUrl}${targeting.urlPath}`;";

// Articles render at /blogs/<handle>; fall back to localhost when no site URL
// is configured on the space.
const ARTICLE_PREVIEW_URL_LOGIC = [
  "const baseUrl = space.siteUrl || 'http://localhost:3000';",
  bypassParams
    ? "return `${baseUrl}/blogs/${content.data.handle || '_'}?preview=true&" + bypassParams + "`;"
    : "return `${baseUrl}/blogs/${content.data.handle || '_'}?preview=true`;",
].join("\n");

// Shows render at /shows/<slug>; fall back to localhost when no site URL is
// configured on the space.
const SHOW_PREVIEW_URL_LOGIC = [
  "const baseUrl = space.siteUrl || 'http://localhost:3000';",
  bypassParams
    ? "return `${baseUrl}/shows/${content.data.slug || '_'}?preview=true&" + bypassParams + "`;"
    : "return `${baseUrl}/shows/${content.data.slug || '_'}?preview=true`;",
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

// --- show model definition ---
// kind: "component" — fetched by data.slug rather than URL path, same
// reasoning as the article model above.
const SHOW_MODEL_BODY = {
  name: SHOW_MODEL_NAME,
  kind: "component",
  showTargeting: false,
  editingUrlLogic: SHOW_PREVIEW_URL_LOGIC,
  fields: [
    field("slug", "text", {
      helperText: "URL slug for the show (used at /shows/<slug>).",
      required: true,
    }),
    field("name", "text", { helperText: "Show name.", required: true }),
    field("tagline", "text", { helperText: "Short one-line description." }),
    field("description", "longText", {
      helperText: "Longer description shown on the show page.",
    }),
    field("logo", "file", {
      helperText: "Show logo / artwork.",
      allowedFileTypes: ["jpeg", "jpg", "png", "svg", "webp"],
    }),
    field("platform", "text", {
      helperText: "Which platform(s) this show is on.",
      enum: ["youtube", "spotify", "both"],
      defaultValue: "youtube",
    }),
    field("youtubeUrl", "text", { helperText: "YouTube channel URL, if any." }),
    field("spotifyUrl", "text", { helperText: "Spotify show URL, if any." }),
    field("featuredEmbedUrl", "text", {
      helperText: "Embed src used for the live-feed player on the show page.",
    }),
    field("episodes", "list", {
      helperText: "Recent episodes shown in the gallery on the show page.",
      subFields: [
        field("title", "text", { helperText: "Episode title.", required: true }),
        field("url", "text", {
          helperText: "Link to watch/listen (YouTube or Spotify episode URL).",
          required: true,
        }),
        field("thumbnail", "file", {
          helperText: "Episode thumbnail image.",
          allowedFileTypes: ["jpeg", "jpg", "png", "svg", "webp"],
        }),
        field("publishDate", "date", { helperText: "Episode publish date." }),
      ],
    }),
    // The `metadata` model-field is appended at runtime — see main().
  ],
};

const SHOW_ENTRIES = [
  {
    slug: "schneider-sports-media",
    data: {
      slug: "schneider-sports-media",
      name: "Schneider Sports Media",
      tagline: "Georgia high school sports, covered the way it deserves to be.",
      description:
        "John Schneider's Georgia High School Sports Show brings the stories, spirit, and spotlight of high school athletics across the Peach State — interviews, highlights, hot takes, and hometown pride in every episode.",
      logo: "/images/ssm-logo.png",
      platform: "youtube",
      youtubeUrl: "https://youtube.com/@SchneiderSportsMedia",
      spotifyUrl: "",
      // Left blank: YouTube's listType=user_uploads embed needs a numeric
      // channel ID, not a @handle, and renders "This video is unavailable"
      // without one. The show page CTA link covers this until we have one.
      featuredEmbedUrl: "",
      episodes: [
        {
          title: "Hawks, NL East Race, & NBA Offseason moves w/ the voice of the Hawks Steve Holman & Jonah Casel!",
          url: "https://youtu.be/21-TFAE9FR4",
          thumbnail: "https://i3.ytimg.com/vi/21-TFAE9FR4/hqdefault.jpg",
          publishDate: "2026-07-24",
        },
        {
          title: "John Schneider's Georgia High School Sports Show LIVE at the Roswell Market Expo with Rob Madden",
          url: "https://youtu.be/p82u25ET1qM",
          thumbnail: "https://i1.ytimg.com/vi/p82u25ET1qM/hqdefault.jpg",
          publishDate: "2026-03-26",
        },
        {
          title: "A Football Season Look Ahead, Gainesville Turnover, & MASS Coaching Carousel Cycle w/ Rob Madden",
          url: "https://youtu.be/DxbEq2_oivA",
          thumbnail: "https://i1.ytimg.com/vi/DxbEq2_oivA/hqdefault.jpg",
          publishDate: "2026-02-23",
        },
      ],
      metadata: {
        description:
          "Schneider Sports Media — authentic coverage of Georgia high school sports on YouTube.",
        keywords: ["Schneider Sports Media", "Georgia high school sports", "podcast"],
      },
    },
  },
  {
    slug: "inside-the-nest",
    data: {
      slug: "inside-the-nest",
      name: "Inside the Nest RHS",
      tagline: "Roswell High School sports, up close.",
      description:
        "Inside the Nest RHS covers Roswell High School athletics — game coverage, player interviews, and behind-the-scenes access to the Hornets' program.",
      logo: "/images/inside-the-nest-logo.jpg",
      platform: "youtube",
      youtubeUrl: "https://www.youtube.com/@InsideTheNestRHS27",
      spotifyUrl: "",
      featuredEmbedUrl: "",
      episodes: [
        {
          title: "Hornets' Offense Responds in Route Over Etowah | Etowah Game Reaction Show",
          url: "https://youtu.be/Cuzu0R0G5nc",
          thumbnail: "https://i4.ytimg.com/vi/Cuzu0R0G5nc/hqdefault.jpg",
          publishDate: "2026-09-10",
        },
        {
          title: "The Roswell Football Report w/ Sawyer Polikov | Week 3 at Etowah",
          url: "https://youtu.be/6O6fJF3KVyc",
          thumbnail: "https://i3.ytimg.com/vi/6O6fJF3KVyc/hqdefault.jpg",
          publishDate: "2026-09-05",
        },
        {
          title: "Roswell Offense Silenced in 42-15 Loss to Newton | Newton Game Reaction Show",
          url: "https://youtu.be/Nm_dkHM38iU",
          thumbnail: "https://i3.ytimg.com/vi/Nm_dkHM38iU/hqdefault.jpg",
          publishDate: "2026-09-01",
        },
        {
          title: "SCHLETTY TD EARLY To put up Roswell 7-0 on Newton! #insidethenest #highschoolfootball #rhs",
          url: "https://youtu.be/WcNfX6f2HRE",
          thumbnail: "https://i4.ytimg.com/vi/WcNfX6f2HRE/hqdefault.jpg",
          publishDate: "2026-08-28",
        },
      ],
      metadata: {
        description: "Inside the Nest RHS — Roswell High School sports coverage on YouTube.",
        keywords: ["Inside the Nest", "Roswell High School", "RHS sports"],
      },
    },
  },
  {
    slug: "atlanta-sportscast",
    data: {
      slug: "atlanta-sportscast",
      name: "Atlanta Sportscast",
      tagline: "Atlanta sports talk, every week.",
      description:
        "Atlanta Sportscast covers the city's pro and college sports scene with conversation, analysis, and takes on the teams Atlanta cares about most.",
      logo: "/images/atlanta-sportscast-logo.jpg",
      platform: "spotify",
      youtubeUrl: "",
      spotifyUrl: "https://open.spotify.com/show/2jHXt2YAFL2t6TnK1MI6Tw",
      featuredEmbedUrl: "https://open.spotify.com/embed/show/2jHXt2YAFL2t6TnK1MI6Tw",
      episodes: [
        {
          title: "Our 2nd Annual College Football Season Preview + To Expand or Not To Expand the CFP... w/ Zach Seyko",
          url: "https://open.spotify.com/episode/69Yj5mcQEZAnItVGFxyw1e",
          thumbnail: "https://image-cdn-ak.spotifycdn.com/image/ab6765630000ba8a47d74c3d74df7d2d13b10498",
          publishDate: "2026-08-25",
        },
      ],
      metadata: {
        description: "Atlanta Sportscast — Atlanta sports talk on Spotify.",
        keywords: ["Atlanta Sportscast", "Atlanta sports", "podcast"],
      },
    },
  },
];

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

  // Same pattern for the show model.
  SHOW_MODEL_BODY.fields.push(metaField);
  const createdShow = await ensureModel(SHOW_MODEL_BODY, existingNames);
  if (!createdShow) {
    await ensureModelHasFields(SHOW_MODEL_NAME, [metaField], models);
  }

  // Dynamic preview URLs: the built-in `page` model always needs it set here;
  // the `article`/`show` models get it from their *_BODY when freshly
  // created, otherwise update the existing model.
  await ensurePreviewUrl(PAGE_MODEL_NAME, PAGE_PREVIEW_URL_LOGIC, models);
  if (!createdArticle) {
    await ensurePreviewUrl(ARTICLE_MODEL_NAME, ARTICLE_PREVIEW_URL_LOGIC, models);
  }
  if (!createdShow) {
    await ensurePreviewUrl(SHOW_MODEL_NAME, SHOW_PREVIEW_URL_LOGIC, models);
  }

  // The CDN takes a moment to register a brand-new model before it will
  // accept writes against it.
  if (createdArticle || createdShow) {
    await new Promise((r) => setTimeout(r, 2000));
  }

  await ensureContent(ARTICLE_MODEL_NAME, SAMPLE_ARTICLE_HANDLE, SAMPLE_ARTICLE_DATA);

  for (const show of SHOW_ENTRIES) {
    await ensureContent(SHOW_MODEL_NAME, show.slug, show.data);
  }

  console.log("\nDone.\n");
}

main().catch((err) => {
  console.error("\n✗ Seed failed:", err.message || err);
  process.exit(1);
});
