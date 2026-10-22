// Owner: Khánh. Receives form labels ONLY and returns LabelMapping[]. NEVER accept or log CCCD values.
import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ error: "Not implemented (Khánh)" }, { status: 501 });
}
