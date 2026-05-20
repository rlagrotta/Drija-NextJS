import { NextRequest, NextResponse } from "next/server";
import { getCms } from "@/lib/cms";
import { parseLocaleParam } from "@/lib/i18n/parse-locale";

type RouteContext = { params: Promise<{ slug: string }> };

export async function GET(request: NextRequest, context: RouteContext) {
  const { slug } = await context.params;
  const locale = parseLocaleParam(request.nextUrl.searchParams.get("locale"));
  const product = await getCms().getProductBySlug(slug, locale);

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({ data: product });
}
