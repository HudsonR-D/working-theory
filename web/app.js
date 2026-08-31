const SCENES = [
  {
    id: "cancels",
    label: "Last-minute cancels",
    blurb: "A friend, twice.",
    relationship: "friend",
    input: "A friend cancelled dinner last minute twice and got irritated when I asked why.",
    reply: {
      restatement: "Twice, plans ended at the last minute. When you asked why, the tone got short.",
      hypotheses: [
        { name: "avoidant attachment strategy", why: "Attachment language names a learned way of managing closeness, not a disorder stamp.", fits: "Distance plus irritation at being asked is a common do-not-corner-me move.", missing: "We do not know if this happens in every bond or only this one." },
        { name: "ADHD / time blindness", why: "ADHD names a long-standing attention and executive pattern. Time blindness is the civilian piece.", fits: "Last-minute collapse can be a planning problem, not a feeling about you.", missing: "No history across work and home." }
      ],
      lookalikes: [
        { name: "They do not prioritize this plan", note: "Values and incentives explain missed dinners without any condition." },
        { name: "Sleep debt or overload this week", note: "A raw month makes anyone flaky and sharp." }
      ],
      unknowns: ["Whether they cancel other people the same way", "Whether they repair after"]
    }
  },
  {
    id: "someone-who",
    label: "Someone I know",
    blurb: "Flat since a funeral.",
    relationship: "unspecified",
    input: "I know someone who has sounded flat and skipped plans since a funeral last month.",
    reply: {
      restatement: "Since a funeral last month, this person sounds flat and has stepped back from plans.",
      hypotheses: [
        { name: "grief", why: "Grief names the ordinary work of a loss. It is not a disorder.", fits: "A death last month is a real cause.", missing: "Grief has no stopwatch." },
        { name: "depressive episode", why: "Clinicians use depression for a weeks-long cluster that gets in the way of living.", fits: "Withdrawal and flat tone can be part of that cluster.", missing: "We do not know sleep, appetite, or interest." }
      ],
      lookalikes: [{ name: "Exhaustion from the logistics of a death", note: "Funerals come with paperwork, family, and sleep loss." }],
      unknowns: ["How they were before the funeral", "Whether they can still do ordinary days"]
    }
  },
  {
    id: "self-blank",
    label: "When I go blank",
    blurb: "A mirror, not a case file.",
    relationship: "self",
    input: "I go blank and leave rooms when a conversation gets sharp. I want to understand that.",
    reply: {
      restatement: "When a conversation turns sharp, you lose words and leave the room.",
      hypotheses: [
        { name: "threat response / shutdown", why: "A nervous system can treat a sharp voice like danger. That is not an automatic PTSD label.", fits: "Blank plus exit is a classic protect-and-leave pattern.", missing: "We do not know whether this is old, new, or only with certain people." },
        { name: "social anxiety", why: "Social anxiety names a persistent fear of being judged — not ordinary nerves.", fits: "Leaving when it gets sharp can be fear of the next sentence.", missing: "One scene is not a pattern across months." }
      ],
      lookalikes: [
        { name: "A boundary you have not said out loud", note: "Leaving can be skill, not a condition." },
        { name: "You do not want that conversation", note: "That is values, not pathology." }
      ],
      unknowns: ["Whether this happens with everyone or one person", "Whether words come back after a pause"]
    }
  }
];

const RAILS = [
  { flag: "crisis", re: /\b(kill(?:ing)? myself|suicide|want to die|end my life|better off dead)\b/i, text: "This is above an education tool. If you or someone else is in immediate danger, call local emergency services. In the US, call or text 988." },
  { flag: "refuse-child", re: /\b((my|our)\s+(son|daughter|kid|child)|(\d{1,2}|nine|ten|eleven|twelve)-?(year[- ]old|yo))\b/i, text: "Working Theory will not build a working theory of a child." },
  { flag: "refuse-verdict", re: /\b(diagnose|just tell me they have|what disorder is this|they are (?:a )?(narcissist|psychopath|bipolar))\b/i, text: "A name is vocabulary, not a verdict." },
  { flag: "refuse-advice", re: /\b(what should i (?:do|say)|should i (?:leave|dump|confront)|tell me what to do|is it them or me)\b/i, text: "This tool does not decide for you. It teaches. Dive, pivot, or stop." }
];

function escapeHtml(s) {
  return String(s).replaceAll("&", "&").replaceAll("<", "<").replaceAll(">", ">").replaceAll('"', """);
}

function renderReply(scene) {
  const r = scene.reply;
  const hypos = r.hypotheses.map((h) => `<article class="hypo"><div class="tag">Working theory</div><h3>${escapeHtml(h.name)}</h3><p><strong>Why the name exists.</strong> ${escapeHtml(h.why)}</p><p><strong>Why it might fit this scene.</strong> ${escapeHtml(h.fits)}</p><p><strong>What is still missing.</strong> ${escapeHtml(h.missing)}</p></article>`).join("");
  const looks = r.lookalikes.map((l) => `<article class="hypo"><div class="tag warn">Not a disorder</div><h3>${escapeHtml(l.name)}</h3><p>${escapeHtml(l.note)}</p></article>`).join("");
  const unknown = `<article class="hypo"><div class="tag">Still unknown</div><p>${r.unknowns.map(escapeHtml).join(" · ")}</p></article>`;
  return `<p class="restatement">${escapeHtml(r.restatement)}</p>${hypos}${looks}${unknown}`;
}

function handoffPrompt(sceneText, relationship) {
  return [
    "You are Working Theory, a psychology tutor for civilians.",
    "Education only. No diagnosis of a person. No advice about what I should do.",
    "Always give at least two named hypotheses and explain why each name exists.",
    "Always include at least one non-disorder lookalike.",
    "If I ask you to confirm a label, pluralize it. If I describe a child as a case, refuse.",
    relationship ? `Relationship context (filter only): ${relationship}` : "",
    "Scene:",
    sceneText.trim(),
    "Teach. Do not verdict."
  ].filter(Boolean).join("\n");
}

function initDemo() {
  const list = document.querySelector("#scenes");
  const out = document.querySelector("#out");
  if (!list || !out) return;
  list.innerHTML = SCENES.map((s, i) => `<button class="scene" type="button" data-id="${s.id}" aria-pressed="${i === 0}">${escapeHtml(s.label)}<small>${escapeHtml(s.blurb)}</small></button>`).join("");
  const show = (id) => {
    const scene = SCENES.find((s) => s.id === id) || SCENES[0];
    list.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.id === scene.id)));
    out.innerHTML = renderReply(scene);
    out.dataset.scene = scene.id;
  };
  list.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-id]");
    if (btn) show(btn.dataset.id);
  });
  show("cancels");
  document.querySelector("#copy-handoff")?.addEventListener("click", async () => {
    const scene = SCENES.find((s) => s.id === out.dataset.scene) || SCENES[0];
    await navigator.clipboard.writeText(handoffPrompt(scene.input, scene.relationship));
    const btn = document.querySelector("#copy-handoff");
    btn.textContent = "Copied — open Grok and paste";
    setTimeout(() => { btn.textContent = "Copy lesson card for Grok"; }, 2000);
  });
  document.querySelector("#open-grok")?.addEventListener("click", () => window.open("https://grok.com/", "_blank", "noopener"));
}

function initOwn() {
  const form = document.querySelector("#own");
  const railBox = document.querySelector("#rail");
  if (!form) return;
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const scene = form.scene.value.trim();
    const relationship = form.relationship.value;
    railBox.hidden = true;
    if (!scene) return;
    const hit = RAILS.find((r) => r.re.test(scene));
    if (hit) { railBox.hidden = false; railBox.textContent = hit.text; return; }
    await navigator.clipboard.writeText(handoffPrompt(scene, relationship));
    window.open("https://grok.com/", "_blank", "noopener");
    railBox.hidden = false;
    railBox.textContent = "Copied a Working Theory lesson card. Paste it as the first message in Grok.";
  });
}

initDemo();
initOwn();
