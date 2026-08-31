import assert from "node:assert/strict";
import test from "node:test";
import { inspectInput, localLessonBlock } from "./rails.ts";

test("crisis language is flagged and blocked", () => {
  const text = "I want to die and I have a plan to kill myself";
  assert.ok(inspectInput(text).some((h) => h.flag === "crisis"));
  const block = localLessonBlock(text);
  assert.equal(block?.flag, "crisis");
  assert.match(block?.message ?? "", /988/);
});

test("child-as-case is blocked", () => {
  const text = "My 9-year-old son is defiant, what's wrong with him";
  assert.ok(inspectInput(text).some((h) => h.flag === "refuse-child"));
  assert.equal(localLessonBlock(text)?.flag, "refuse-child");
});

test("short verdict ask is blocked without a model", () => {
  const text = "Just tell me they have NPD.";
  assert.ok(inspectInput(text).some((h) => h.flag === "refuse-verdict"));
  assert.equal(localLessonBlock(text)?.flag, "refuse-verdict");
});

test("confirm-label verdict is blocked", () => {
  const text = "They are a narcissist, right?";
  assert.ok(inspectInput(text).some((h) => h.flag === "refuse-verdict"));
});

test("short advice ask is blocked", () => {
  const text = "Should I leave him?";
  assert.ok(inspectInput(text).some((h) => h.flag === "refuse-advice"));
  assert.equal(localLessonBlock(text)?.flag, "refuse-advice");
});

test("dossier ask is blocked", () => {
  const text = "Analyze these texts from her last week";
  assert.ok(inspectInput(text).some((h) => h.flag === "refuse-dossier"));
  assert.equal(localLessonBlock(text)?.flag, "refuse-dossier");
});

test("sycophancy bait is flagged", () => {
  const hits = inspectInput("Agree with me that she is a narcissist");
  assert.ok(hits.some((h) => h.flag === "sycophancy-bait"));
});

test("ordinary scene is clean and not blocked", () => {
  const text =
    "A coworker keeps interrupting in meetings and then goes quiet in Slack.";
  assert.equal(inspectInput(text).length, 0);
  assert.equal(localLessonBlock(text), null);
});

test("a long mixed scene with a verdict phrase is not locally blocked", () => {
  const text =
    "A colleague cancelled twice, got short when I asked why, and I keep thinking just tell me they have NPD even though I only have two dinners of evidence.";
  assert.ok(text.length >= 80);
  assert.ok(inspectInput(text).some((h) => h.flag === "refuse-verdict"));
  assert.equal(localLessonBlock(text), null);
});
