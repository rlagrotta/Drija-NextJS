import type { Metadata } from "next";
import { WarrantiesPageContent } from "@/components/warranties/WarrantiesPageContent";
import { getPageI18n } from "@/lib/i18n/server";
import { buildSupportHelpItems } from "@/lib/support/help-links";
import { getWarrantyPageContent } from "@/lib/warranties/page";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { dict } = await getPageI18n(params);
  return {
    title: dict.supportWarranties.pageTitle,
    description: dict.supportWarranties.pageDescription,
  };
}

export default async function SoporteGarantiasPage({ params }: PageProps) {
  const { locale, dict, href } = await getPageI18n(params);
  const content = getWarrantyPageContent(locale);
  const helpItems = buildSupportHelpItems(dict, href);
  const copy = dict.supportWarranties;

  return (
    <WarrantiesPageContent
      {...content}
      pageTitle={copy.pageTitle}
      termsTitle={copy.termsTitle}
      periodsTitle={copy.periodsTitle}
      laborLabel={copy.laborLabel}
      partsLabel={copy.partsLabel}
      yearLabel={copy.yearLabel}
      yearsLabel={copy.yearsLabel}
      supportTitle={copy.supportTitle}
      whatsappLabel={copy.whatsappLabel}
      emailLabel={copy.emailLabel}
      helpTitle={dict.support.needHelp}
      helpItems={helpItems}
    />
  );
}
