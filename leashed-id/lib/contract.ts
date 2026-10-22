// SHARED CONTRACT. Do not change without telling the whole team.
export const CCCD_TAGS = ["cccd_name", "cccd_dob", "cccd_number", "cccd_address"] as const;
export type CccdTag = (typeof CCCD_TAGS)[number];

export type DecryptResult =
  | { ok: true; tag: string; value: string }
  | { ok: false; tag: string; reason: "denied" | "error"; raw?: string };

export type DecryptFn = (tag: string) => Promise<DecryptResult>;
export type EncryptFn = (tag: CccdTag, value: string) => Promise<string>;

export type StoredField = { tag: CccdTag; ciphertext: string; updatedAt: string };
export type LabelMapping = { label: string; tag: CccdTag | null };
