import type { Metadata } from "next";
import { TechnicalServicePageContent } from "@/components/technical-service/TechnicalServicePageContent";
import { getPageI18n } from "@/lib/i18n/server";
import { getTechnicalServiceRegions } from "@/lib/technical-service/page";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { dict } = await getPageI18n(params);
  return {
    title: dict.technicalServicePage.pageTitle,
    description: dict.technicalServicePage.pageDescription,
  };
}

export default async function SoporteServicioTecnicoPage({ params }: PageProps) {
  const { locale, dict } = await getPageI18n(params);
  const regions = getTechnicalServiceRegions(locale);
  const copy = dict.technicalServicePage;

  return (
    <TechnicalServicePageContent
      regions={regions}
      introLine1={copy.introLine1}
      introLine2={copy.introLine2}
      introLine3={copy.introLine3}
      whatsappTitle={copy.whatsappTitle}
      contactAriaLabel={copy.contactAriaLabel}
    />
  );
}
