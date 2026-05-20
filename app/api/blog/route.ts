import { NextRequest, NextResponse } from "next/server";
import { getCms } from "@/lib/cms";
import { parseLocaleParam } from "@/lib/i18n/parse-locale";

export async function GET(request: NextRequest) {
  const featured = request.nextUrl.searchParams.get("featured") === "true";
  const locale = parseLocaleParam(request.nextUrl.searchParams.get("locale"));
  const posts = await getCms().getBlogPosts({ featured, locale });
  return NextResponse.json({ data: posts });
}
