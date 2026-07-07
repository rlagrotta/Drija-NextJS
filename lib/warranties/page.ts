import warrantiesData from "@/data/warranties.json";
import type { Locale } from "@/lib/i18n/config";
import type {
  WarrantyContactConfig,
  WarrantyLegalListSection,
  WarrantyPageConfig,
  WarrantyPeriodCategory,
  WarrantyPeriodGroup,
} from "@/types/warranty-page";

const config = warrantiesData as WarrantyPageConfig;

export type LocalizedWarrantyPageContent = {
  contact: WarrantyContactConfig;
  termsIntro: string;
  conditions: WarrantyLegalListSection;
  voidSituations: WarrantyLegalListSection;
  contactSection: {
    title: string;
    paragraph: string;
  };
  periodCategories: WarrantyPeriodCategory[];
};

export function getWarrantyPageContent(locale: Locale): LocalizedWarrantyPageContent {
  return {
    contact: config.contact,
    termsIntro: localizeTermsIntro(locale),
    conditions: localizeListSection(config.conditions, locale),
    voidSituations: localizeListSection(config.voidSituations, locale),
    contactSection: localizeContactSection(locale),
    periodCategories: config.periodCategories
      .map((category) => localizePeriodCategory(category, locale))
      .sort((a, b) => a.order - b.order),
  };
}

function localizeTermsIntro(locale: Locale): string {
  if (locale === "es" || !config.translations?.en?.termsIntro) {
    return config.termsIntro;
  }

  return config.translations.en.termsIntro;
}

function localizeListSection(
  section: WarrantyLegalListSection,
  locale: Locale,
): WarrantyLegalListSection {
  if (locale === "es" || !section.translations?.en) {
    return section;
  }

  const en = section.translations.en;
  return {
    title: en.title ?? section.title,
    items: en.items ?? section.items,
  };
}

function localizeContactSection(locale: Locale) {
  if (locale === "es" || !config.contactSection.translations?.en) {
    return {
      title: config.contactSection.title,
      paragraph: config.contactSection.paragraph,
    };
  }

  const en = config.contactSection.translations.en;
  return {
    title: en.title ?? config.contactSection.title,
    paragraph: en.paragraph ?? config.contactSection.paragraph,
  };
}

function localizePeriodCategory(
  category: WarrantyPeriodCategory,
  locale: Locale,
): WarrantyPeriodCategory {
  const groups = category.groups.map((group) => localizePeriodGroup(group, locale));

  if (locale === "es" || !category.translations?.en) {
    return { ...category, groups };
  }

  return {
    ...category,
    name: category.translations.en.name ?? category.name,
    groups,
  };
}

function localizePeriodGroup(
  group: WarrantyPeriodGroup,
  locale: Locale,
): WarrantyPeriodGroup {
  if (locale === "es" || !group.translations?.en) {
    return group;
  }

  return {
    ...group,
    name: group.translations.en.name ?? group.name,
  };
}
