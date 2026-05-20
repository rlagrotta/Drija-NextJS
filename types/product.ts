export type ProductImage = {
  src: string;
  alt: string;
};

import type { ContentTranslations } from "@/types/content-i18n";

export type ProductSpec = {
  label: string;
  value: string;
};

export type ProductTranslations = {
  name?: string;
  shortDescription?: string;
  description?: string;
  images?: ProductImage[];
  specs?: ProductSpec[];
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  categorySlug: string;
  sku: string;
  isNew?: boolean;
  featured?: boolean;
  images: ProductImage[];
  specs?: ProductSpec[];
  /** ISO country codes where product is available; empty = all markets */
  countries?: string[];
  translations?: ContentTranslations<ProductTranslations>;
};
