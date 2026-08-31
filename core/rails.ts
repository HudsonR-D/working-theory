/**
 * Behavioral rails. These run on the user's text before a model is invited
 * to teach, and again on the model's draft.
 */

export type RailHit = {
  flag:
    | "crisis"
    | "refuse-child"
    | "refuse-verdict"
    | "refuse-advice"
    | "refuse-dossier"
    | "sycophancy-bait";
  reason: string;
};

const CRISIS = [
  /\b(kill(?:ing)? myself|suicide|want to die|end my life|better off dead)\b/i,
  /\b(going to (?:hurt|kill|shoot) (?:him|her|them|someone))\b/i,
  /\b(have a plan to (?:die|kill))\b/i,
];

const CHILD = [
  /\b(my|our|the)\s+(\d{1,2}|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen)[ -]?(year[- ]old|yo)\b/i,
  /\b(my|our)\s+(son|daughter|kid|child|toddler|preschooler|kindergartner)\b/i,
  /\b(third grader|in (elementary|middle) school)\b/i,
];

const VERDICT_ASK = [
  /\b(diagnose|diagnosis|tell me they have|what disorder is this)\b/i,
  /\b(?:is|are) (?:he|she|they|this) (?:a |an )?(narcissist|psychopath|sociopath|borderline|bipolar)\b/i,
  /\b(?:he|she|they) are (?:a |an )?(narcissist|psychopath|sociopath|borderline|bipolar)\b/i,
  /\bjust tell me (?:it's|its|they have|this is)\b/i,
];

const ADVICE_ASK = [
  /\bwhat should i (?:do|say)\b/i,
  /\bshould i (?:leave|dump|confront|divorce|quit|call them out)\b/i,
  /\b(how do i destroy|make them pay|get revenge)\b/i,
  /\b(is it them or me|pick a side|tell me what to do)\b/i,
];

const DOSSIER = [
  /\b(analyze (?:this|these|her|his|their)?\s*(?:texts?|emails?|screenshots?|photos?))\b/i,
  /\b(track|dossier|case file) (?:him|her|them|this person)\b/i,
];

const SYCOPHANCY = [
  /\bagree with me\b/i,
  /\bjust confirm (?:that )?(?:she|he|they|this)\b/i,
  /\bi already know (?:it's|its|this is)\b/i,
];

export function inspectInput(text: string): RailHit[] {
  const hits: RailHit[] = [];
  const check = (res: RegExp[], flag: RailHit["flag"], reason: string) => {
    if (res.some((r) => r.test(text))) hits.push({ flag, reason });
  };

  check(CRISIS, "crisis", "possible crisis language");
  check(CHILD, "refuse-child", "looks like a child-as-case");
  check(VERDICT_ASK, "refuse-verdict", "asked for a person-level verdict");
  check(ADVICE_ASK, "refuse-advice", "asked for a decision or script to harm");
  check(DOSSIER, "refuse-dossier", "asked to analyze a private dump or track someone");
  check(SYCOPHANCY, "sycophancy-bait", "asked the tutor to rubber-stamp a label");

  return hits;
}

export function crisisMessage(): string {
  return [
    "This is above an education tool.",
    "If you or someone else is in immediate danger, call local emergency services.",
    "In the US you can reach the 988 Suicide & Crisis Lifeline by calling or texting 988.",
    "Working Theory will not tutor a crisis or assign a label in this moment.",
  ].join(" ");
}

export function childMessage(): string {
  return [
    "Working Theory will not build a working theory of a child.",
    "A minor is not a case study.",
    "If you want a general lesson (what ‘anxiety’ means, what ADHD names, what trauma responses can look like), ask for the topic with no child attached.",
  ].join(" ");
}

export function verdictRedirect(): string {
  return [
    "A name is vocabulary, not a verdict.",
    "I can teach what a pattern-name means, why clinicians use it, and what else looks the same.",
    "I will not declare that a person has a disorder.",
  ].join(" ");
}

const DOSSIER_MESSAGE =
  "Working Theory will not analyze photos, text dumps, or a dossier. Describe one observable behavior in your own words.";

const ADVICE_MESSAGE =
  "This tool does not decide for you. It teaches. Dive, pivot, or stop.";

/** Rails that must stop the tutor before a model is called. */
export function localLessonBlock(
  text: string,
): { flag: RailHit["flag"]; message: string } | null {
  const hits = inspectInput(text);
  if (hits.some((h) => h.flag === "crisis")) {
    return { flag: "crisis", message: crisisMessage() };
  }
  if (hits.some((h) => h.flag === "refuse-child")) {
    return { flag: "refuse-child", message: childMessage() };
  }
  if (hits.some((h) => h.flag === "refuse-dossier")) {
    return { flag: "refuse-dossier", message: DOSSIER_MESSAGE };
  }
  const short = text.trim().length < 80;
  if (short && hits.some((h) => h.flag === "refuse-verdict")) {
    return { flag: "refuse-verdict", message: verdictRedirect() };
  }
  if (short && hits.some((h) => h.flag === "refuse-advice")) {
    return { flag: "refuse-advice", message: ADVICE_MESSAGE };
  }
  return null;
}
