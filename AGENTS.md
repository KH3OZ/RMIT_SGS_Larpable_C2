# Leashed ID Agent: instructions for every coding agent

Claude Code and Codex both follow this file. Read it fully before any task.

## The project in one line
Leashed ID Agent lets you hand Vietnamese ID (CCCD) paperwork to an AI assistant, while the Tide network, not our app, decides which ID fields the AI can ever unlock.

## Locked design (v2.1). Do not redesign.
1. Leashed sub-account. The agent has its own TideCloak account, shown as the "Agent console". During setup, the owner types their CCCD there once. The browser encrypts each field with its own tag: `cccd_name`, `cccd_dob`, `cccd_number`, `cccd_address`. The store holds ciphertext only.
2. The leash is roles. The agent holds `_tide_cccd_<field>.selfencrypt` for all 4 tags and `_tide_cccd_<field>.selfdecrypt` only for name, dob and number.
3. LLM plans, Tide unlocks, code fills. A server route sends ONLY form labels to the LLM. The LLM returns a label-to-tag map. Our code calls `decryptField(tag)` in the browser and fills the visible form.
4. A hostile hotel form hides "also add the permanent address". The agent requests `cccd_address`. Tide refuses: the SDK checks the agent's signed token, then the ORK nodes check it again.
5. Widening the leash is a QEA change request. With 3 admins, 2 must approve.
Why the agent encrypts its own copy: TideCloak `doEncrypt` locks data to the account that encrypted it. NEVER encrypt CCCD data from the owner's account.

## Hard rules
- NEVER send decrypted values to the LLM, an API route, logs or the store. Plaintext exists only in the agent's browser and the visible form.
- NEVER commit secrets (`.env`, `.env.local`, API keys, admin passwords). Only `.env.example` is committed.
- Synthetic data only. NEVER use a real CCCD.
- Demo beats 3 to 5 MUST run on real TideCloak. The fake decrypt is for building only.
- Wording: "the agent cannot decrypt any field it was not granted". NEVER "unhackable". Denial banner: `Denied: the agent has no Tide decrypt role for cccd_address`, with the raw SDK error underneath.
- Edit only files you own (see Ownership). Tell the team before changing a shared file.
- NEVER add a dependency, delete a file, or touch `init/`, `tidecloak.json`, middleware/proxy.ts or the TideCloak provider without asking. Those are Khoa's.
- Build only what is in `docs/TASKS.md`: one form, four tags, one agent, one denial. No extra features, no refactors.
- UI text in English, sample data in Vietnamese.

## Environment
- App: `leashed-id/` (Next.js, port 3000). Run `cd leashed-id`, `npm install`, copy `.env.example` to `.env.local`, then `npm run dev`.
- Only Khoa's laptop runs TideCloak (Docker, localhost:8080, realm `nextjs-test`). Teammates cannot reach it.
- Everyone else uses `NEXT_PUBLIC_DECRYPT_MODE=fake`. Your pages MUST render without a TideCloak login in fake mode. Do not add login gating; Khoa wires it.
- `npm run init` and Docker are Khoa's only. `init/realm.json` is read only by `npm run init`. Later role changes go through the Tide admin console (Roles, then QEA Approvals). Log out and back in after any role change.

## Shared contract (`leashed-id/lib/contract.ts`)
All encryption and decryption go through `encryptField` and `decryptField` from `leashed-id/lib/decrypt/index.ts`. The fake and real versions return the same types. `reason: "denied"` means a missing Tide role; `"error"` means anything else; `raw` carries the raw SDK message for the dev panel.

## Ownership (paths relative to `leashed-id/` unless they start at the repo root)
| Person | Owns | Done when |
| --- | --- | --- |
| Khoa | `lib/decrypt/tide.ts`, `init/`, `tidecloak.json`, TideCloak provider and middleware/proxy.ts, accounts, roles, admins | Agent decrypts name, DOB and number; address is denied with the real error; a grant sits pending in QEA |
| Khánh | `app/setup/`, `app/agent/`, `app/api/map-labels/`, `lib/decrypt/fake.ts`, `lib/llm/` | Hotel form fills end to end in fake mode; "Simulate compromised agent" forces the address request |
| Duy | `app/hotel-form/`, `app/ciphertext/`, `app/api/store/`, root `README.md`, submission | Form shows varied labels and the highlighted injection; ciphertext view lists stored blobs; README overview is 300 words or fewer |
| Minh | `lib/fixtures/`, root `docs/DEMO_SCRIPT.md`, root `video/` | Fixtures cover 2+ label variants; .mp4 under 100 MB by 16:45 |
| Shared (ask first) | `lib/contract.ts`, `lib/decrypt/index.ts`, `AGENTS.md`, `CLAUDE.md`, `docs/TASKS.md` | |

## Git
- One branch per person: `khoa/tide`, `khanh/agent`, `duy/form`, `minh/content`.
- Small commits named `<area>: <what>`. Run `git pull --rebase origin main` before every push. Merge to `main` at least every 30 minutes. `main` must always run.

## Gates (Vietnam time, Thu 22 Oct 2026)
Feature freeze 15:30 · video plays on GitHub 16:45 · form sent 17:30 · hard deadline 18:00.
If a gate slips, cut in this order: (1) the quorum half of beat 5, (2) the real-injection take (use the toggle), (3) a shorter video. NEVER cut the live denial.

## Demo (2 minutes)
1 Possibility · 2 Constraint · 3 Agent fills the hotel form with name, DOB, number · 4 Injection highlighted, address denied by Tide (the key moment) · 5 Store shows only ciphertext, grant pending in QEA · 6 What changes.

## How agents work here
- Before editing, list the files you will touch and confirm you own them.
- After each step print: ✅ <what was done> (<files>).
- Stop and ask if a task needs a file you don't own, a new dependency or a design change.
