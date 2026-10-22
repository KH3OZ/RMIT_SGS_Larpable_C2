// REAL TideCloak implementation. Owner: Khoa.
// Must call the TideCloak SDK's doEncrypt/doDecrypt inside the agent's logged-in session.
// Map a missing-role failure to reason "denied" and keep the raw SDK message in `raw`.
import type { DecryptFn, EncryptFn } from "../contract";

export const encryptField: EncryptFn = async () => {
  throw new Error("tide.ts not implemented yet (Khoa)");
};

export const decryptField: DecryptFn = async (tag) => ({
  ok: false,
  tag,
  reason: "error",
  raw: "tide.ts not implemented yet (Khoa)",
});
