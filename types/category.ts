import type { ContentTranslations } from "@/types/content-i18n";

export type CategoryTranslations = {
  name?: string;
  description?: string;
  image?: { src: string; alt: string };
};

export type Category = {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: { src: string; alt: string };
  productCount?: number;
  featured?: boolean;
  order?: number;
  translations?: ContentTranslations<CategoryTranslations>;
};
