import assert from "node:assert/strict";
import test from "node:test";
import { DEMO_SCENES } from "./demo-replies.ts";
import { isAcceptable, validateReply, type TutorReply } from "./schema.ts";

function base(): TutorReply {
  return {
    restatement: "Two last-minute cancels, then a short tone.",
    hypotheses: [
      {
        name: "avoidant strategy",
        why_the_name_exists: "Names a learned distance move, not a stamp.",
        fits_because: "Irritation at being asked is a common close-the-door move.",
        missing_because: "We do not know if this is every bond.",
      },
      {
        name: "time blindness",
        why_the_name_exists: "ADHD language includes clocks that do not feel real.",
        fits_because: "Last-minute collapse can be planning, not feeling.",
        missing_because: "No history across work and home.",
      },
    ],
    lookalikes: [
      {
        name: "They ranked something else first",
        is_disorder: false,
        note: "Values explain missed dinners without a condition.",
      },
    ],
    unknowns: ["Whether they repair after"],
    deeper: [],
    stance: "education",
    relationship: "friend",
    flags: ["ok"],
    sources: [],
  };
}

test("a complete lesson is acceptable", () => {
  assert.equal(isAcceptable(base()), true);
});

test("one hypothesis fails H1", () => {
  const reply = base();
  reply.hypotheses = [reply.hypotheses[0]];
  assert.ok(validateReply(reply).some((i) => i.code === "H1"));
  assert.equal(isAcceptable(reply), false);
});

test("person-level verdict is critical", () => {
  const reply = base();
  reply.restatement = "They are a narcissist and this is clearly NPD.";
  assert.ok(validateReply(reply).some((i) => i.code === "C1"));
});

test("every scripted demo passes the contract", () => {
  for (const scene of DEMO_SCENES) {
    const issues = validateReply(scene.reply);
    assert.equal(issues.length, 0, `${scene.id}: ${JSON.stringify(issues)}`);
    assert.equal(isAcceptable(scene.reply), true);
  }
});
