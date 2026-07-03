import type { ContentTranslations } from "@/types/content-i18n";

export type TechnicalServiceFlag = {
  src: string;
  alt: string;
};

export type TechnicalServiceRegionTranslations = {
  name?: string;
  buttonLabel?: string;
  flag?: Partial<TechnicalServiceFlag>;
};

export type TechnicalServiceRegion = {
  id: string;
  order: number;
  name: string;
  buttonLabel: string;
  phoneLabel: string;
  whatsappUrl: string;
  flag: TechnicalServiceFlag;
  translations?: ContentTranslations<TechnicalServiceRegionTranslations>;
};

export type TechnicalServicePageConfig = {
  regions: TechnicalServiceRegion[];
};
