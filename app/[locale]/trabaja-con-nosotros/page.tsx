import type { Metadata } from "next";
import { WorkWithUsPageContent } from "@/components/work-with-us/WorkWithUsPageContent";
import { getPageI18n } from "@/lib/i18n/server";
import { getWorkWithUsConfig } from "@/lib/work-with-us/page";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { dict } = await getPageI18n(params);
  return {
    title: dict.workWithUsPage.pageTitle,
    description: dict.workWithUsPage.pageDescription,
  };
}

export default async function TrabajaConNosotrosPage({ params }: PageProps) {
  const { locale, dict } = await getPageI18n(params);
  const config = getWorkWithUsConfig(locale);
  const copy = dict.workWithUsPage;

  return (
    <WorkWithUsPageContent
      heroTitle={copy.heroTitle}
      subtitle={copy.subtitle}
      paragraph1={copy.paragraph1}
      paragraph2={copy.paragraph2}
      contactLabel={copy.contactLabel}
      whatsappLabel={copy.whatsappLabel}
      whatsappAriaLabel={copy.whatsappAriaLabel}
      mascot={config.mascot}
      email={config.contact.email}
      whatsappUrl={config.contact.whatsappUrl}
    />
  );
}
