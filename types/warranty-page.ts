import type { ContentTranslations } from "@/types/content-i18n";

export type WarrantyPeriodGroup = {
  id: string;
  name: string;
  laborYears: number;
  partsYears: number;
  translations?: ContentTranslations<{ name?: string }>;
};

export type WarrantyPeriodCategory = {
  id: string;
  slug: string;
  name: string;
  order: number;
  groups: WarrantyPeriodGroup[];
  translations?: ContentTranslations<{ name?: string }>;
};

export type WarrantyLegalListSection = {
  title: string;
  items: string[];
  translations?: ContentTranslations<{ title?: string; items?: string[] }>;
};

export type WarrantyContactConfig = {
  email: string;
  whatsappUrl: string;
};

export type WarrantyPageConfig = {
  contact: WarrantyContactConfig;
  termsIntro: string;
  conditions: WarrantyLegalListSection;
  voidSituations: WarrantyLegalListSection;
  contactSection: {
    title: string;
    paragraph: string;
    translations?: ContentTranslations<{ title?: string; paragraph?: string }>;
  };
  periodCategories: WarrantyPeriodCategory[];
  translations?: ContentTranslations<{
    termsIntro?: string;
  }>;
};
