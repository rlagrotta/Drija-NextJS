import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale } from "@/lib/i18n/config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Canonical Spanish URLs: redirect /es/* → /*
  if (pathname === "/es" || pathname.startsWith("/es/")) {
    const canonical = pathname.replace(/^\/es/, "") || "/";
    return NextResponse.redirect(new URL(canonical, request.url));
  }

  // English: /en/* passes through to app/[locale]/*
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return NextResponse.next();
  }

  // Spanish (default): rewrite /* → /es/* internally
  const rewritePath =
    pathname === "/" ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`;
  return NextResponse.rewrite(new URL(rewritePath, request.url));
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
