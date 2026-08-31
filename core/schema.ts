/**
 * Reply contract. If a model output cannot be shaped like this, it is not a
 * Working Theory answer.
 */

export const RELATIONSHIPS = [
  "partner",
  "family",
  "work",
  "friend",
  "self",
  "unspecified",
] as const;

export type Relationship = (typeof RELATIONSHIPS)[number];

export const FLAGS = [
  "ok",
  "crisis",
  "refuse-child",
  "refuse-verdict",
  "refuse-advice",
  "refuse-dossier",
] as const;

export type Flag = (typeof FLAGS)[number];

export type Hypothesis = {
  name: string;
  why_the_name_exists: string;
  fits_because: string;
  missing_because: string;
  library_id?: string;
};

export type Lookalike = {
  name: string;
  is_disorder: boolean;
  note: string;
};

export type TutorReply = {
  restatement: string;
  hypotheses: Hypothesis[];
  lookalikes: Lookalike[];
  unknowns: string[];
  deeper: string[];
  stance: "education";
  relationship: Relationship;
  flags: Flag[];
  sources: string[];
};

export type ValidationIssue = {
  code: string;
  message: string;
  severity: "critical" | "high";
};

const VERDICT_RE =
  /\b(this is|they have|she has|he has|you have|you are|they're|they are)\s+(clearly\s+)?(bpd|npd|adhd|autis\w*|bipolar|psychopath|sociopath|narcissist|borderline|ocd|ptsd|depressed|a narcissist)\b/i;

export function validateReply(reply: TutorReply): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  if (reply.stance !== "education") {
    issues.push({
      code: "C-STANCE",
      severity: "critical",
      message: "stance must be education",
    });
  }

  if (!reply.restatement?.trim()) {
    issues.push({
      code: "H-RESTATE",
      severity: "high",
      message: "missing restatement",
    });
  }

  if (!Array.isArray(reply.hypotheses) || reply.hypotheses.length < 2) {
    issues.push({
      code: "H1",
      severity: "high",
      message: "need at least two hypotheses",
    });
  } else {
    for (const h of reply.hypotheses) {
      if (!h.name || !h.why_the_name_exists) {
        issues.push({
          code: "H3",
          severity: "high",
          message: `hypothesis "${h.name ?? "?"}" missing name or why-the-name-exists`,
        });
      }
    }
  }

  const nonDisorder = (reply.lookalikes ?? []).filter((l) => l.is_disorder === false);
  if (nonDisorder.length < 1) {
    issues.push({
      code: "H2",
      severity: "high",
      message: "need at least one non-disorder lookalike",
    });
  }

  if (!reply.unknowns?.length) {
    issues.push({
      code: "M2",
      severity: "high",
      message: "unknowns must be listed",
    });
  }

  const blob = JSON.stringify(reply);
  if (VERDICT_RE.test(blob) && !reply.flags.includes("refuse-verdict")) {
    issues.push({
      code: "C1",
      severity: "critical",
      message: "sounds like a person-level diagnosis",
    });
  }

  const advice = /\b(you should|you need to leave|confront them|tell them they have)\b/i;
  if (advice.test(blob) && !reply.flags.includes("refuse-advice")) {
    issues.push({
      code: "H4",
      severity: "high",
      message: "sounds like advice, not education",
    });
  }

  return issues;
}

export function isAcceptable(reply: TutorReply): boolean {
  return validateReply(reply).every((i) => i.severity !== "critical") &&
    validateReply(reply).filter((i) => i.severity === "high").length === 0;
}
