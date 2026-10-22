# Tasks (v2.1). Tick boxes as you finish.

## Khoa
- [ ] TideCloak up (Docker), `npm run init`, agent account
- [ ] Live test: agent decrypts name; address returns an error (screenshot it)
- [ ] Implement `lib/decrypt/tide.ts`; use `NEXT_PUBLIC_DECRYPT_MODE=tide` on this laptop
- [ ] Make Duy and Minh admins 2 and 3 only after the address role is final; grant the agent `cccd_address` and show it pending
- Fallback: if encrypting the address fails without its decrypt role, give the agent that role briefly, load the data, then remove it while there is still 1 admin.

## Khánh
- [ ] `/setup`: owner enters CCCD once; `encryptField` per tag; POST ciphertext to `/api/store`
- [ ] `/api/map-labels`: form labels only, sent to the LLM, returns `LabelMapping[]`
- [ ] `/agent`: load a hotel form, map labels, `decryptField` per tag, fill the form, denial banner + raw error
- [ ] "Simulate compromised agent" toggle forces a `cccd_address` request

## Duy
- [ ] Enrol your own Tide account now (future admin 2)
- [ ] `/hotel-form`: renders fixture labels; injection visible and highlighted for the video
- [ ] `/api/store` (GET/POST ciphertext, JSON file in `.data/`) and the `/ciphertext` view
- [ ] README overview (5 prompts, 300 words or fewer), setup section, honest limits
- [ ] Submission: repo public, secret scan, video plays from GitHub, form sent by 17:30

## Minh
- [ ] Enrol your own Tide account now (future admin 3)
- [ ] Fixtures: fake CCCD plus 2 or more hotel label variants
- [ ] `docs/DEMO_SCRIPT.md`; record beats 1 to 2 before the freeze
- [ ] Test checklist after the freeze; record and compress to .mp4 under 100 MB
