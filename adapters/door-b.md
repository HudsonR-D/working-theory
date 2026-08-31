# Door B spike — on-site tutor after official LLM sign-in

**Goal:** user taps “Continue with Grok / X”, completes official OAuth, chats on our page. No API-key paste.

**Status:** blocked on native/app approval. Door A ships without it.

## What we will try

- xAI first: `https://auth.x.ai` OAuth (authorization code + PKCE).
- Scopes we *want*: identity + whatever official scope bills inference to their SuperGrok / X Premium+ session.
- Store only encrypted refresh material, session-scoped. Do not store the family narrative.

## What we will not try

- ChatGPT cookie / unofficial Codex `client_id` reuse.
- Asking the aunt to open console.x.ai and mint a key.
- Shipping Door B against an allowlisted CLI client id we do not own.

## Go / no-go

Write the outcome in `docs/decisions.md` after the first live attempt:

- GO if HudsonR&D has a registered xAI app and a token can call `api.x.ai` under the user’s subscription.
- NO-GO if the client is rejected or the token is identity-only. Keep Door A.

Secondary providers (ChatGPT, Claude) stay Door A until they offer the same official consumer grant.
