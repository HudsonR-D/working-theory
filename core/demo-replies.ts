import type { TutorReply } from "./schema.ts";

export type DemoScene = {
  id: string;
  label: string;
  blurb: string;
  input: string;
  relationship: TutorReply["relationship"];
  reply: TutorReply;
};

export const DEMO_SCENES: DemoScene[] = [
  {
    id: "cancels",
    label: "Last-minute cancels",
    blurb: "A friend, twice.",
    input:
      "A friend cancelled dinner last minute twice and got irritated when I asked why.",
    relationship: "friend",
    reply: {
      restatement:
        "Twice, plans ended at the last minute. When you asked why, the tone got short.",
      hypotheses: [
        {
          name: "avoidant attachment strategy",
          why_the_name_exists:
            "Attachment language names a learned way of managing closeness — step back when a bond feels costly — not a disorder stamp.",
          fits_because:
            "Distance plus irritation at being asked is a common ‘don’t corner me’ move.",
          missing_because:
            "We do not know if this happens in every bond or only this one.",
          library_id: "attachment-vs-boundary",
        },
        {
          name: "ADHD / time blindness",
          why_the_name_exists:
            "ADHD names a long-standing attention and executive pattern. Time blindness is the civilian piece: the clock does not feel real until it is too late.",
          fits_because: "Last-minute collapse can be a planning problem, not a feeling about you.",
          missing_because:
            "No history across work and home, and no childhood picture.",
          library_id: "adhd-vs-disrespect",
        },
      ],
      lookalikes: [
        {
          name: "They do not prioritize this plan",
          is_disorder: false,
          note: "Values and incentives explain missed dinners without any condition. People show up for what they ranked first.",
        },
        {
          name: "Sleep debt or overload this week",
          is_disorder: false,
          note: "A raw month makes anyone flaky and sharp. See confounders before any bigger name.",
        },
      ],
      unknowns: [
        "Whether they cancel other people the same way",
        "Whether they name the cancel or vanish",
        "Whether they repair after",
      ],
      deeper: ["attachment-vs-boundary", "adhd-vs-disrespect", "not-psychology"],
      stance: "education",
      relationship: "friend",
      flags: ["ok"],
      sources: ["attachment-vs-boundary", "adhd-vs-disrespect", "not-psychology"],
    },
  },
  {
    id: "someone-who",
    label: "Someone I know",
    blurb: "Flat since a funeral.",
    input:
      "I know someone who has sounded flat and skipped plans since a funeral last month.",
    relationship: "unspecified",
    reply: {
      restatement:
        "Since a funeral last month, this person sounds flat and has stepped back from plans.",
      hypotheses: [
        {
          name: "grief",
          why_the_name_exists:
            "Grief names the ordinary work of a loss. It is not a disorder. The word exists so we do not treat mourning as a character problem.",
          fits_because: "A death last month is a real cause. Flatness and skipped plans fit.",
          missing_because: "Grief has no stopwatch. Duration alone does not settle this.",
          library_id: "confounders",
        },
        {
          name: "depressive episode",
          why_the_name_exists:
            "Clinicians use depression for a cluster — mood plus energy, sleep, interest, worth — that lasts most days for weeks and gets in the way of living. NIMH separates that from ordinary sadness.",
          fits_because: "Withdrawal and flat tone can be part of that cluster.",
          missing_because:
            "We do not know sleep, appetite, interest, or whether this is most of the day.",
          library_id: "sadness-vs-depression",
        },
      ],
      lookalikes: [
        {
          name: "Exhaustion from the logistics of a death",
          is_disorder: false,
          note: "Funerals come with paperwork, family, and sleep loss. That can look like a mood disorder and not be one.",
        },
      ],
      unknowns: [
        "How they were before the funeral",
        "Whether interest in once-loved things dropped",
        "Whether they can still do ordinary days",
      ],
      deeper: ["sadness-vs-depression", "confounders"],
      stance: "education",
      relationship: "unspecified",
      flags: ["ok"],
      sources: ["sadness-vs-depression", "confounders"],
    },
  },
  {
    id: "self-blank",
    label: "When I go blank",
    blurb: "A mirror, not a case file.",
    input:
      "I go blank and leave rooms when a conversation gets sharp. I want to understand that.",
    relationship: "self",
    reply: {
      restatement:
        "When a conversation turns sharp, you lose words and leave the room. You want names for that, not a verdict on yourself.",
      hypotheses: [
        {
          name: "threat response / shutdown",
          why_the_name_exists:
            "Trauma-related language exists because a nervous system can treat a sharp voice like danger and drop into freeze or flight. That is not the same as ‘you chose to be rude.’ It is also not an automatic PTSD label.",
          fits_because: "Blank + exit is a classic protect-and-leave pattern.",
          missing_because:
            "We do not know whether this is old, new, or only with certain people.",
          library_id: "trauma-response-vs-choice",
        },
        {
          name: "social anxiety",
          why_the_name_exists:
            "Social anxiety names a persistent fear of being judged or embarrassed that is strong enough to shape days — not ordinary nerves before a hard talk.",
          fits_because: "Leaving when it gets sharp can be fear of the next sentence.",
          missing_because: "One scene is not a pattern across months.",
          library_id: "anxiety-vs-everyday-worry",
        },
      ],
      lookalikes: [
        {
          name: "A boundary you have not said out loud",
          is_disorder: false,
          note: "Leaving can be the body enforcing a limit you have not given words yet. That can be skill, not a condition.",
        },
        {
          name: "You do not want that conversation",
          is_disorder: false,
          note: "Sometimes the sharp talk is a deal you refuse. That is values, not pathology.",
        },
      ],
      unknowns: [
        "Whether this happens with everyone or one person",
        "What the body does (heart, heat, freeze)",
        "Whether words come back after a pause",
      ],
      deeper: [
        "trauma-response-vs-choice",
        "anxiety-vs-everyday-worry",
        "attachment-vs-boundary",
      ],
      stance: "education",
      relationship: "self",
      flags: ["ok"],
      sources: ["trauma-response-vs-choice", "anxiety-vs-everyday-worry"],
    },
  },
];
