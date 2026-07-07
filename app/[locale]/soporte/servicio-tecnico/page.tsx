import type { Metadata } from "next";
import { TechnicalServicePageContent } from "@/components/technical-service/TechnicalServicePageContent";
import { getPageI18n } from "@/lib/i18n/server";
import { buildSupportHelpItems } from "@/lib/support/help-links";
import { getTechnicalServiceContact } from "@/lib/technical-service/page";

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
  const { dict, href } = await getPageI18n(params);
  const contact = getTechnicalServiceContact();
  const helpItems = buildSupportHelpItems(dict, href);
  const copy = dict.technicalServicePage;

  return (
    <TechnicalServicePageContent
      contact={contact}
      introLine1={copy.introLine1}
      introLine2={copy.introLine2}
      whatsappButton={copy.whatsappButton}
      whatsappAriaLabel={copy.whatsappAriaLabel}
      emailLabel={copy.emailLabel}
      helpTitle={dict.support.needHelp}
      helpItems={helpItems}
    />
  );
}
