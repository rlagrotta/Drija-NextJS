import type { Metadata } from "next";
import { RegistroPageContent } from "@/components/registro/RegistroPageContent";
import { getPageI18n } from "@/lib/i18n/server";
import {
  getRecaptchaSiteKey,
  getRegistroPageContent,
} from "@/lib/registro/page";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { dict } = await getPageI18n(params);
  return {
    title: dict.registroPage.pageTitle,
    description: dict.registroPage.pageDescription,
  };
}

export default async function RegistroPage({ params }: PageProps) {
  const { locale, dict } = await getPageI18n(params);
  const content = getRegistroPageContent(locale);

  return (
    <RegistroPageContent
      {...content}
      heroTitle={dict.registroPage.heroTitle}
      recaptchaSiteKey={getRecaptchaSiteKey()}
    />
  );
}
