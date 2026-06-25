# Security Policy

## Reporting a vulnerability

Please report security issues **privately** — do not open a public issue for a
vulnerability.

- Preferred: GitHub **private vulnerability reporting** (the _Report a
  vulnerability_ button under this repository's _Security_ tab).
- Or email: **j.juliocesar7@gmail.com**

Please include enough detail to reproduce (affected URL/route, steps, and impact).
You can expect an acknowledgement within a few days.

## Scope

This is a static personal blog deployed to Cloudflare Workers Static Assets.
Relevant concerns include the build/deploy supply chain (GitHub Actions, npm
dependencies), the Cloudflare deployment, and any content-injection issues.

## Hardening in place

- GitHub Actions are pinned to full-length commit SHAs and run with
  least-privilege (`contents: read`) permissions.
- Production deploys go through a protected `production` GitHub Environment.
- Dependencies and Actions are watched by Dependabot.
- dprint formatter plugins are pinned by version **and** SHA-256 checksum.
- No third-party runtime scripts or font CDNs are loaded by the site.
