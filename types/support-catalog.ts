import type { ContentTranslations } from "@/types/content-i18n";

export type SupportCatalogCover = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type SupportCatalogAsset = {
  pdf: string;
  downloadFilename: string;
  cover: SupportCatalogCover;
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
