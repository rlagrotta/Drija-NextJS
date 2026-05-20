import type { ContentTranslations } from "@/types/content-i18n";

export type SupportArticleTranslations = {
  question?: string;
  answer?: string;
};

export type SupportArticle = {
  id: string;
  slug: string;
  question: string;
  answer: string;
  translations?: ContentTranslations<SupportArticleTranslations>;
};

export type SupportCategoryTranslations = {
  name?: string;
};

export type SupportCategory = {
  id: string;
  slug: string;
  name: string;
  articles: SupportArticle[];
  translations?: ContentTranslations<SupportCategoryTranslations>;
};
