import supportCatalogsData from "@/data/support-catalogs.json";
import type { Locale } from "@/lib/i18n/config";
import type { SupportCatalogAsset, SupportCatalogsConfig } from "@/types/support-catalog";

const config = supportCatalogsData as SupportCatalogsConfig;

export function getSupportCatalogForLocale(locale: Locale): SupportCatalogAsset {
  if (locale === "es") {
    return config.es;
  }

  const { translations, ...enCatalog } = config.en;
  return {
    ...enCatalog,
    cover: {
      src: enCatalog.cover.src,
      alt: translations?.en?.cover?.alt ?? enCatalog.cover.alt,
      width: enCatalog.cover.width,
      height: enCatalog.cover.height,
    },
  };
}

export function getSupportCatalogDownloads(): {
  es: SupportCatalogAsset;
  en: SupportCatalogAsset;
} {
  return {
    es: config.es,
    en: config.en,
  };
}
