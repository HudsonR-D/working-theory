import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));

test("demo page has the contract surfaces", () => {
  const html = readFileSync(join(here, "index.html"), "utf8");
  assert.match(html, /id="scenes"/);
  assert.match(html, /id="out"/);
  assert.match(html, /id="own"/);
});

test("connect page does not ask for API keys", () => {
  const html = readFileSync(join(here, "connect.html"), "utf8");
  assert.match(html, /No API keys/);
  assert.match(html, /grok.com/);
  assert.doesNotMatch(html, /console.x.ai/);
});
