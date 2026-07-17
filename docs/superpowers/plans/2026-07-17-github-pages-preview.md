# GitHub Pages Public Preview Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish the existing EZI homepage at a GitHub Pages URL that is publicly reachable and verified before handoff.

**Architecture:** Keep the existing Vinext/Sites build intact while adding a separate Next.js static-export build for GitHub Pages. Publish the generated `out/` directory through GitHub's official Pages artifact workflow from the public user-site repository `zhangchengjia001-spec.github.io`.

**Tech Stack:** Next.js 16 static export, React 19, GitHub Actions, GitHub Pages, Node.js 22, pnpm 11.

## Global Constraints

- Preserve the current homepage design, content, supplied transparent vehicle PNG, logo, and hero video.
- The final public URL must return HTTP 200 without the Cloudflare block page.
- Verify the page HTML and every critical media asset before handing the URL to the user.
- Use the official GitHub Pages actions documented by GitHub: `configure-pages@v5`, `upload-pages-artifact@v4`, and `deploy-pages@v4`.

---

### Task 1: Add a tested static-export build

**Files:**
- Modify: `tests/rendered-html.test.mjs`
- Modify: `next.config.ts`
- Modify: `package.json`
- Modify: `tsconfig.json`

**Interfaces:**
- Consumes: Existing `app/` route and files in `public/`.
- Produces: A complete static site under `out/` with `/index.html` and root-relative media files.

- [ ] **Step 1: Replace obsolete skeleton tests with failing public-export tests**

```js
import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const exported = new URL("../out/", import.meta.url);

test("exports the EZI homepage as static HTML", async () => {
  const html = await readFile(new URL("index.html", exported), "utf8");
  assert.match(html, /<title>AURA 智能纯电汽车<\/title>/);
  assert.match(html, /新境，由你抵达/);
  assert.match(html, /src="\/em05-hero\.mp4"/);
  assert.match(html, /src="\/em06-model-transparent\.png"/);
});

test("copies critical public media into the static export", async () => {
  for (const file of [
    "ezi-logo-white.png",
    "em05-hero.mp4",
    "em06-model-transparent.png",
    "em06-side.jpg",
    "em06-rear.jpg",
    "aura-car.png",
  ]) {
    await access(new URL(file, exported));
    assert.ok((await stat(new URL(file, exported))).size > 0, `${file} is empty`);
    assert.equal(
      (await stat(new URL(file, exported))).size,
      (await stat(new URL(`../public/${file}`, import.meta.url))).size,
    );
  }
  await access(root);
});
```

- [ ] **Step 2: Run the export tests to verify they fail for the missing `out/index.html`**

Run: `node --test tests/rendered-html.test.mjs`

Expected: FAIL with `ENOENT` for `out/index.html` or a missing static-export asset.

- [ ] **Step 3: Enable static export and add dedicated build/test scripts**

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
};

export default nextConfig;
```

```json
"build:pages": "next build",
"test": "pnpm run build:pages && node --test tests/rendered-html.test.mjs"
```

Exclude the Cloudflare-only `build/`, `db/`, `examples/`, and `worker/` directories from the Next.js static-export type check; they are not imported by the homepage.

- [ ] **Step 4: Build and run the export tests**

Run: `pnpm test`

Expected: Next.js creates `out/`; both Node tests pass with zero failures.

- [ ] **Step 5: Commit the static-export deliverable**

```bash
git add next.config.ts package.json tsconfig.json tests/rendered-html.test.mjs
git commit -m "feat: add tested GitHub Pages export"
```

---

### Task 2: Publish through GitHub Pages and verify the public URL

**Files:**
- Create: `.github/workflows/deploy-pages.yml`

**Interfaces:**
- Consumes: `pnpm run build:pages` and its `out/` directory from Task 1.
- Produces: `https://zhangchengjia001-spec.github.io/` deployed through the `github-pages` environment.

- [ ] **Step 1: Add the official GitHub Pages workflow**

```yaml
name: Deploy GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 11.9.0
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm run build:pages
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v4
        with:
          path: out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Commit the workflow**

```bash
git add .github/workflows/deploy-pages.yml
git commit -m "ci: deploy public preview to GitHub Pages"
```

- [ ] **Step 3: Create the public user-site repository and push this branch as `main`**

```bash
gh repo create zhangchengjia001-spec.github.io --public --source=. --remote=github
git push -u github HEAD:main
```

- [ ] **Step 4: Enable Pages workflow publishing and wait for the deployment**

```bash
gh api repos/zhangchengjia001-spec/zhangchengjia001-spec.github.io/pages -X POST -f build_type=workflow
gh run watch --exit-status
```

Expected: The workflow finishes with a successful `deploy` job and reports the GitHub Pages URL.

- [ ] **Step 5: Verify the deployed page and critical media over HTTPS**

Run HTTP checks for `/`, `/ezi-logo-white.png`, `/em05-hero.mp4`, `/em06-model-transparent.png`, `/em06-side.jpg`, `/em06-rear.jpg`, and `/aura-car.png`.

Expected: The homepage and all assets return HTTP 200; the HTML contains `AURA 智能纯电汽车`, `新境，由你抵达`, and no Cloudflare block page.
