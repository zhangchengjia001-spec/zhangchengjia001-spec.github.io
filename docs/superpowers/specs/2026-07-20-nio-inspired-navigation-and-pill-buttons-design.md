# NIO-Inspired Navigation and Pill Button Design

## Goal

Refine the EZI homepage navigation to feel closer to the restrained scrolled header on NIO's homepage while preserving EZI's purple brand character, and convert every button-style action into a consistent pill shape.

## Navigation treatment

The unscrolled navigation remains fully transparent over the hero video with white logo and text. Once the page has scrolled, the existing state transition reveals a bright, high-opacity pearl-white surface with a subtle `#68648F` purple-gray tint. The scrolled surface uses the following exact treatment:

- gradient: `rgba(243,242,248,.93)` to `rgba(255,255,255,.95)` to `rgba(238,236,246,.92)`;
- blur: `20px`;
- saturation: `120%`;
- shadow: `0 6px 24px rgba(57,52,91,.08)`;
- bottom highlight: `inset 0 -1px rgba(255,255,255,.68)`;
- black logo, navigation text, and download action;
- current height, spacing, fixed positioning, and transition timing remain unchanged.

The high-opacity gradient is also the visual fallback in browsers that do not support `backdrop-filter`, ensuring the logo remains legible.

## Button treatment

All elements that already use button styling become full pills with `border-radius:999px`:

- hero actions;
- community call to action;
- contact actions;
- navigation `下载 App` action.

Existing heights, widths, colors, borders, icon, typography, and hover movement remain unchanged. Navigation menu links, inline text links, model-card links, and footer links remain plain text.

## Responsive behavior

Desktop and mobile use the same navigation surface and pill language. Existing mobile widths, stacking rules, and padding remain unchanged, so this is a visual-only refinement with no content or layout changes.

## Verification

Automated source-level tests lock the approved gradient, blur, saturation, shadow, transparent top state, and pill radii. The production export must build cleanly, and the deployed GitHub Pages CSS must contain the same values before completion is reported.

