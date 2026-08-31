import assert from "node:assert/strict";
import test from "node:test";
import { buildHandoffPrompt } from "./handoff.ts";

test("handoff card is education not diagnosis", () => {
  const card = buildHandoffPrompt({
    scene: "They cancelled twice.",
    relationship: "friend",
  });
  assert.match(card, /Education only/);
  assert.match(card, /Teach\. Do not verdict/);
  assert.match(card, /They cancelled twice/);
  assert.match(card, /Relationship context \(filter only\): friend/);
});
