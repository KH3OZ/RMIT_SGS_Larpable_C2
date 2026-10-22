// Owner: Duy. Stores and returns StoredField[] (ciphertext only) in leashed-id/.data/. NEVER store plaintext.
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ error: "Not implemented (Duy)" }, { status: 501 });
}

export async function POST() {
  return NextResponse.json({ error: "Not implemented (Duy)" }, { status: 501 });
}
