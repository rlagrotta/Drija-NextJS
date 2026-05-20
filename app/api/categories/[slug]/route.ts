import { NextRequest, NextResponse } from "next/server";
import { getCms } from "@/lib/cms";
import { parseLocaleParam } from "@/lib/i18n/parse-locale";

type RouteContext = { params: Promise<{ slug: string }> };

export async function GET(request: NextRequest, context: RouteContext) {
  const { slug } = await context.params;
  const locale = parseLocaleParam(request.nextUrl.searchParams.get("locale"));
  const category = await getCms().getCategoryBySlug(slug, locale);

  if (!category) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }

  const products = await getCms().getProducts({ categorySlug: slug, locale });

  return NextResponse.json({ data: { category, products } });
}
