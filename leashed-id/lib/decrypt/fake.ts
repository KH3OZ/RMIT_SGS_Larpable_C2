// FAKE, for building only. NEVER use it in demo beats 3 to 5. Owner: Khánh.
import type { DecryptFn, EncryptFn } from "../contract";
import { FAKE_CCCD } from "../fixtures/fake-cccd";

const GRANTED = new Set(["cccd_name", "cccd_dob", "cccd_number"]);
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const encryptField: EncryptFn = async (tag, value) => {
  await wait(150);
  let bin = "";
  new TextEncoder().encode(value).forEach((b) => (bin += String.fromCharCode(b)));
  return `fake:${tag}:${btoa(bin)}`;
};

export const decryptField: DecryptFn = async (tag) => {
  await wait(300);
  if (!GRANTED.has(tag)) {
    return { ok: false, tag, reason: "denied", raw: `FAKE: no _tide_${tag}.selfdecrypt role` };
  }
  const value = FAKE_CCCD[tag as keyof typeof FAKE_CCCD];
  return value ? { ok: true, tag, value } : { ok: false, tag, reason: "error", raw: "FAKE: unknown tag" };
};
