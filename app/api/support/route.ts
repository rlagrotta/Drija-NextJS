import { NextRequest, NextResponse } from "next/server";
import { getCms } from "@/lib/cms";
import { parseLocaleParam } from "@/lib/i18n/parse-locale";

export async function GET(request: NextRequest) {
  const locale = parseLocaleParam(request.nextUrl.searchParams.get("locale"));
  const support = await getCms().getSupportCategories(locale);
  return NextResponse.json({ data: support });
}
