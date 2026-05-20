export type BlogCategory =
  | "tendencias-y-estilo-de-vida"
  | "recetas-y-experiencias"
  | "tecnologia-y-funcionalidades";

import type { ContentTranslations } from "@/types/content-i18n";

export type BlogPostTranslations = {
  title?: string;
  excerpt?: string;
  content?: string;
  categoryLabel?: string;
  image?: { src: string; alt: string };
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  categoryLabel: string;
  publishedAt: string;
  author: string;
  image: { src: string; alt: string };
  featured?: boolean;
  translations?: ContentTranslations<BlogPostTranslations>;
};
