# NIO-Inspired Frosted Navigation and Pill Buttons Implementation Plan

> **For Codex:** Execute this plan with `superpowers:executing-plans` and follow test-first development for the CSS behavior.

**Goal:** Make the fixed navigation substantially brighter and less transparent after scrolling with a restrained `#68648F` tint, and convert all button-style actions into full pill shapes.

**Architecture:** Keep the existing scroll-state controller and `.nav-scrolled` class unchanged. Adjust only the scrolled navigation pseudo-element, shadow treatment, and existing button classes in the global stylesheet, with source-level regression tests that lock the approved navigation values and pill radii.

**Tech Stack:** Next.js, React, CSS, Node.js test runner, GitHub Pages static export.

---

### Task 1: Lock the approved navigation and button treatments with a failing test

**Files:**
- Modify: `tests/rendered-html.test.mjs`
- Read: `app/globals.css`

**Step 1: Add the regression test**

Add a source CSS test that requires:

- a high-opacity pearl-white/pale-purple gradient;
- `20px` backdrop blur;
- `120%` saturation;
- a soft purple-gray shadow and subtle bottom highlight;
- the existing fully transparent unscrolled state.
- full pill radii on `.button` and `.nav-cta`.

**Step 2: Run the focused test and verify RED**

Run:

```bash
node --test tests/rendered-html.test.mjs
```

Expected: the new treatment test fails because the stylesheet does not yet use the NIO-inspired gradient and pill radii.

### Task 2: Implement the NIO-inspired surface and pill buttons

**Files:**
- Modify: `app/globals.css`
- Test: `tests/rendered-html.test.mjs`

**Step 1: Apply the minimum CSS change**

Update `.nav-shell::before` to use:

```css
background: linear-gradient(
  115deg,
  rgba(243, 242, 248, 0.93),
  rgba(255, 255, 255, 0.95) 58%,
  rgba(238, 236, 246, 0.92)
);
backdrop-filter: blur(20px) saturate(120%);
-webkit-backdrop-filter: blur(20px) saturate(120%);
```

Update `.nav-shell.nav-scrolled` to use:

```css
box-shadow:
  0 6px 24px rgba(57, 52, 91, 0.08),
  inset 0 -1px rgba(255, 255, 255, 0.68);
```

Add `border-radius:999px` to the existing `.button` and `.nav-cta` classes. Leave the transparent top state, black logo inversion, sizing, spacing, colors, and transition behavior unchanged.

**Step 2: Run the focused test and verify GREEN**

Run:

```bash
node --test tests/rendered-html.test.mjs
```

Expected: all focused tests pass.

**Step 3: Run the full production validation**

Run:

```bash
pnpm test
```

Expected: lint, production static export, and all tests pass with no errors.

### Task 3: Publish and verify the public preview

**Files:**
- Verify: generated `out/` export
- Publish: `pages-public-preview` to the public GitHub Pages repository

**Step 1: Commit the implementation intentionally**

Commit the test and stylesheet changes with:

```bash
git add app/globals.css tests/rendered-html.test.mjs docs/superpowers/plans/2026-07-20-bright-frosted-navigation.md
git commit -m "feat: refine navigation and pill buttons"
```

**Step 2: Publish through the GitHub API and wait for Pages**

Update the public repository's `main` branch using the authenticated GitHub API publishing flow, then wait for the Pages workflow to complete successfully.

**Step 3: Verify the deployed artifact**

Confirm:

- the public homepage returns HTTP 200;
- the deployed CSS contains the new `20px` blur, `120%` saturation, bright gradient, shadow values, and pill radii;
- the in-app browser loads the public preview and shows the brighter scrolled navigation state.
