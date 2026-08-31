# Working Theory

An open-source **psychology translator** for ordinary people.

You describe a behavior — yours, someone else’s, or “someone I know.”  
Working Theory teaches possible names, why those names exist, and what else the same behavior can mean.

It does **not** diagnose anyone.  
It does **not** tell you what to do.  
It is **not** therapy.

HudsonR&D. MIT licensed.

## How it is supposed to feel

Not: “This is narcissism.”  
Yes: “Narcissistic pattern is one name people use for X. Here is why that name exists. Here is what looks the same and is not a disorder. Here is what you still don’t know.”

Names are vocabulary. A person is not a chart note.

## Doors

- **Door A (ships first):** copy a lesson card and continue inside the LLM you already have. xAI / Grok is the primary path. No API keys.
- **Door B (destination):** on-site tutor after official provider sign-in (xAI first). Waits on native/app approval. Until then Door A plus the live demo is the product.

The landing demo works without an account. Scripted scenes are handwritten and contract-checked. Short “just tell me they have X” asks are refused before any model is called.

## Repo map

```
core/       reply contract, rails, topic library, scripted demos
adapters/   Door A handoff + Door B notes
web/        static Door A prototype
docs/       product vision
```

## Run tests

Needs Node 22+.

```bash
npm test
```

## Education, not care

Working Theory is general psychoeducation. It is not a medical device, not a clinician, and not a substitute for a licensed professional. If you or someone else is in danger, contact local emergency services or the 988 Suicide & Crisis Lifeline (US).
