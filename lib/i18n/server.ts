import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localizePath } from "@/lib/i18n/paths";

export async function resolveLocale(
  params: Promise<{ locale: string }>,
): Promise<Locale> {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  return locale;
}

export async function getPageI18n(params: Promise<{ locale: string }>) {
  const locale = await resolveLocale(params);
  const dict = await getDictionary(locale);
  const href = (path: string) => localizePath(path, locale);
  return { locale, dict, href };
}
