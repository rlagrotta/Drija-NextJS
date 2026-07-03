import type { Metadata } from "next";
import { SupportSectionPlaceholder } from "@/components/support/SupportSectionPlaceholder";
import { getPageI18n } from "@/lib/i18n/server";
import { buildSupportHelpItems } from "@/lib/support/help-links";

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
  const { dict, href } = await getPageI18n(params);
  const helpItems = buildSupportHelpItems(dict, href);

  return (
    <SupportSectionPlaceholder
      title={dict.supportWarranties.pageTitle}
      description={dict.supportWarranties.pageDescription}
      comingSoon={dict.supportWarranties.comingSoon}
      helpTitle={dict.support.needHelp}
      helpItems={helpItems}
    />
  );
}
