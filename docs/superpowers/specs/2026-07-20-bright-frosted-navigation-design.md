# Bright Frosted Navigation Design

## Goal

Improve the fixed navigation after scrolling so the black EZI logo, navigation labels, and download button remain clearly legible while the bar still feels softly frosted and carries the `#68648F` brand hue.

## Selected Direction

Use a high-luminance pearl-white and pale-purple frosted surface. The surface should be visually more solid than the current version, with only a faint impression of the page behind it.

## Visual Treatment

- Keep the navigation fully transparent at the top of the hero.
- Apply the frosted surface only when `.nav-scrolled` is active.
- Replace the current transparent gradient with a brighter gradient built from 90% opaque pearl white and pale purple.
- Keep `#68648F` present as a restrained 10%–12% tint rather than a dominant dark wash.
- Increase background blur from `20px` to `24px` and reduce saturation from `165%` to `135%` so content behind the bar becomes less distracting.
- Use a soft purple-gray drop shadow and a subtle bottom highlight to separate the bar from the page without creating a hard divider.
- Preserve the existing dark logo treatment, dark navigation text, button border, bar height, horizontal spacing, and entrance transition.

## Interaction and Responsive Behavior

The existing scroll threshold and transition timing stay unchanged. Desktop and mobile use the same scrolled background treatment; mobile retains its current navigation height and compact button spacing.

## Fallback Behavior

Browsers without `backdrop-filter` support will still show the high-opacity gradient, so logo and text contrast remain sufficient without blur.

## Validation

- Confirm the unscrolled hero navigation remains transparent with the white logo.
- Confirm the scrolled navigation becomes bright and frosted with a clearly visible black logo.
- Confirm the bar does not visibly reveal high-contrast page content behind it.
- Confirm desktop and mobile layouts do not shift.
- Run the static export tests and verify the published GitHub Pages URL returns HTTP 200 with the updated stylesheet.

## Out of Scope

No changes to navigation content, logo asset, scroll threshold, layout, hero media, model cards, motion system, or other page sections.
