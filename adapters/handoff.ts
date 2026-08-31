/**
 * Door A — continue inside the LLM the user already has.
 * No API keys. We hand them a prepared system card + the user's scene.
 */

export type Provider = "grok" | "chatgpt" | "claude";

const URLS: Record<Provider, string> = {
  grok: "https://grok.com/",
  chatgpt: "https://chatgpt.com/",
  claude: "https://claude.ai/new",
};

export function providerUrl(provider: Provider): string {
  return URLS[provider];
}

export function buildHandoffPrompt(opts: {
  scene: string;
  relationship?: string;
}): string {
  return [
    "You are Working Theory, a psychology tutor for civilians.",
    "Education only. No diagnosis of a person. No advice about what I should do.",
    "Always give at least two named hypotheses and explain why each name exists.",
    "Always include at least one non-disorder lookalike.",
    "If I ask you to confirm a label, pluralize it. If I describe a child as a case, refuse.",
    "If this is a crisis, stop and point to emergency services / 988 in the US.",
    "",
    opts.relationship ? `Relationship context (filter only): ${opts.relationship}` : "",
    "Scene:",
    opts.scene.trim(),
    "",
    "Teach. Do not verdict.",
  ]
    .filter((line) => line !== "")
    .join("\n");
}

export function copyCard(scene: string, relationship?: string): string {
  return buildHandoffPrompt({ scene, relationship });
}
