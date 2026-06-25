# polycarpo.dev

Personal tech blog of **Julio Polycarpo** — bilingual (pt-BR / en), static, and
fast. This repository currently holds the **foundation**: the toolchain, a single
hello-world page, and a secure, transparent deploy pipeline to Cloudflare. The
blog itself (pages, content, design system) is tracked in
[issues](https://github.com/juliopolycarpo/polycarpo.dev/issues).

## Stack

- [**Astro 7**](https://astro.build) — static output (`output: 'static'`)
- [**Bun**](https://bun.sh) — runtime + package manager
- [**Biome**](https://biomejs.dev) — lint & format for JS/TS/JSON/CSS
- [**dprint**](https://dprint.dev) — format for Markdown & TOML
- [**Cloudflare Workers Static Assets**](https://developers.cloudflare.com/workers/static-assets/) — hosting

Formatting is split with no overlap: **Biome** owns code (JS/TS/JSON/CSS),
**dprint** owns the file types Biome doesn't (Markdown, TOML).

## Develop

```bash
bun install
bun run dev           # http://localhost:4321
bun run build         # → dist/ (static)
bun run preview       # serve dist/ locally
```

Quality gates (also run in CI):

```bash
bun run lint          # biome check
bun run format        # dprint fmt   (format:check to verify only)
bun run check         # astro check  (types)
```

## Deploy — Cloudflare Workers Static Assets

Deploys are **automatic**: every push to `main` runs CI (lint, typecheck, build)
and, on success, publishes `./dist` via `wrangler deploy` (see
[`.github/workflows/ci.yml`](.github/workflows/ci.yml) and
[`wrangler.toml`](wrangler.toml)).

The pipeline needs exactly **two repository secrets** — nothing else:

| Secret                  | Value                                                             |
| ----------------------- | ----------------------------------------------------------------- |
| `CLOUDFLARE_API_TOKEN`  | API token scoped to **Workers Scripts: Edit** + **Account: Read** |
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare account ID                                        |

Add them under **Settings → Secrets and variables → Actions** (or scope them to
the `production` Environment). Until they're set, the `deploy` job fails by
design while CI stays green.

Why it's safe and transparent:

- Actions pinned to full-length commit SHAs; workflow runs with `contents: read`.
- Deploys gated behind a passing build and a protected `production` Environment.
- The exact publish command (`wrangler deploy`) is visible in the workflow — no
  opaque third-party deploy action.
- Secrets never touch the source tree; the token is least-privilege.

Attach the `polycarpo.dev` custom domain in the Cloudflare dashboard
(**Workers → polycarpo → Settings → Domains**), or uncomment the `routes` block
in `wrangler.toml` once the zone is on the account.

## Licensing

This project is intentionally tri-licensed by content type:

| What                                                        | License        | Text                                               |
| ----------------------------------------------------------- | -------------- | -------------------------------------------------- |
| Site **source code** (components, config, scripts, tooling) | **Apache-2.0** | [`LICENSE`](LICENSE)                               |
| Site **text & blog posts** (prose, page copy, essays)       | **CC BY 4.0**  | [`LICENSES/CC-BY-4.0.txt`](LICENSES/CC-BY-4.0.txt) |
| **Code snippets** embedded within posts/content             | **MIT**        | [`LICENSES/MIT.txt`](LICENSES/MIT.txt)             |

SPDX: `Apache-2.0` (code), `CC-BY-4.0` (content), `MIT` (snippets). Attribution
for reused prose: _“Julio Polycarpo — polycarpo.dev”_.

## Design reference

The visual direction was prototyped in Claude Design (home + post, light/dark,
PT/EN). It is the reference for the upcoming design-system work, not yet
implemented here.
