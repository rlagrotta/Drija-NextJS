import { NextResponse } from "next/server";
import { getCms } from "@/lib/cms";

export async function GET() {
  const retailers = await getCms().getRetailers();
  return NextResponse.json({ data: retailers });
}
