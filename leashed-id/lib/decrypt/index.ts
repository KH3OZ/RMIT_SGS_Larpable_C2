// SHARED. Picks the fake or real implementation from NEXT_PUBLIC_DECRYPT_MODE.
import type { DecryptFn, EncryptFn } from "../contract";
import * as fake from "./fake";
import * as tide from "./tide";

const impl = process.env.NEXT_PUBLIC_DECRYPT_MODE === "tide" ? tide : fake;
export const decryptField: DecryptFn = impl.decryptField;
export const encryptField: EncryptFn = impl.encryptField;
