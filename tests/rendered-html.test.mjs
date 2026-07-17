import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import test from "node:test";

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
    const exportedFile = new URL(file, exported);
    const sourceFile = new URL(`../public/${file}`, import.meta.url);

    await access(exportedFile);
    assert.ok((await stat(exportedFile)).size > 0, `${file} is empty`);
    assert.equal((await stat(exportedFile)).size, (await stat(sourceFile)).size);
  }
});
