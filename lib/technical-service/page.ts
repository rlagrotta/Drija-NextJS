import technicalServiceData from "@/data/technical-service.json";
import type { Locale } from "@/lib/i18n/config";
import type {
  TechnicalServicePageConfig,
  TechnicalServiceRegion,
} from "@/types/technical-service";

const config = technicalServiceData as TechnicalServicePageConfig;

export function getTechnicalServiceRegions(locale: Locale): TechnicalServiceRegion[] {
  return config.regions
    .map((region) => localizeRegion(region, locale))
    .sort((a, b) => a.order - b.order);
}

function localizeRegion(
  region: TechnicalServiceRegion,
  locale: Locale,
): TechnicalServiceRegion {
  if (locale === "es" || !region.translations?.en) {
    return region;
  }

  const { translations, ...base } = region;
  const en = translations.en;

  return {
    ...base,
    name: en.name ?? region.name,
    buttonLabel: en.buttonLabel ?? region.buttonLabel,
    flag: {
      src: region.flag.src,
      alt: en.flag?.alt ?? region.flag.alt,
    },
  };
}
