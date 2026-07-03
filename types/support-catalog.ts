import type { ContentTranslations } from "@/types/content-i18n";

export type SupportCatalogAsset = {
  pdf: string;
  downloadFilename: string;
  cover: {
    src: string;
    alt: string;
  };
};

export type SupportCatalogAssetTranslations = {
  cover?: {
    alt?: string;
  };
};

export type SupportCatalogsConfig = {
  es: SupportCatalogAsset;
  en: SupportCatalogAsset & {
    translations?: ContentTranslations<SupportCatalogAssetTranslations>;
  };
};
