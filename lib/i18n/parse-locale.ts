import { defaultLocale, isValidLocale, type Locale } from "@/lib/i18n/config";

export function parseLocaleParam(value: string | null): Locale {
  if (value && isValidLocale(value)) return value;
  return defaultLocale;
}
