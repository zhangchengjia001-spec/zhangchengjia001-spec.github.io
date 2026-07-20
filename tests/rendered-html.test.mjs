import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import test from "node:test";

const exported = new URL("../out/", import.meta.url);
const sourceCss = new URL("../app/globals.css", import.meta.url);

test("uses the approved NIO-inspired navigation and pill button treatment", async () => {
  const css = await readFile(sourceCss, "utf8");

  assert.match(
    css,
    /background:linear-gradient\(115deg,rgba\(243,242,248,.93\),rgba\(255,255,255,.95\) 58%,rgba\(238,236,246,.92\)\)/,
  );
  assert.match(css, /backdrop-filter:blur\(20px\) saturate\(120%\)/);
  assert.match(css, /-webkit-backdrop-filter:blur\(20px\) saturate\(120%\)/);
  assert.match(
    css,
    /box-shadow:0 6px 24px rgba\(57,52,91,.08\),inset 0 -1px rgba\(255,255,255,.68\)/,
  );
  assert.match(
    css,
    /\.nav-shell \{[^}]*background:rgba\(255,255,255,0\)/,
  );
  assert.match(css, /\.nav-cta \{[^}]*border-radius:999px/);
  assert.match(css, /\.button \{[^}]*border-radius:999px/);
});

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
    const exportedFile = new URL(file, exported);
    const sourceFile = new URL(`../public/${file}`, import.meta.url);

    await access(exportedFile);
    assert.ok((await stat(exportedFile)).size > 0, `${file} is empty`);
    assert.equal((await stat(exportedFile)).size, (await stat(sourceFile)).size);
  }
});
