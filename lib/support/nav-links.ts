import type { Dictionary } from "@/lib/i18n/types";
import { stripLocalePrefix } from "@/lib/i18n/paths";
import { SUPPORT_ROUTES } from "@/lib/support/routes";

export type SupportNavItem = {
  label: string;
  href: string;
};

export function buildSupportNavItems(
  dict: Dictionary,
  href: (path: string) => string,
): SupportNavItem[] {
  return [
    { label: dict.support.faq, href: href(SUPPORT_ROUTES.faq) },
    { label: dict.support.manuals, href: href("/manuales") },
    {
      label: dict.support.technicalService,
      href: href(SUPPORT_ROUTES.technicalService),
    },
    { label: dict.support.catalogs, href: href(SUPPORT_ROUTES.catalogs) },
    { label: dict.support.warranties, href: href(SUPPORT_ROUTES.warranties) },
  ];
}

export function isSupportNavPath(pathname: string): boolean {
  const path = stripLocalePrefix(pathname);

  return path === "/manuales" || path.startsWith("/soporte");
}
