import type { Metadata } from "next";
import { CatalogPageContent } from "@/components/catalogs/CatalogPageContent";
import { getPageI18n } from "@/lib/i18n/server";
import {
  getSupportCatalogDownloads,
  getSupportCatalogForLocale,
} from "@/lib/support/catalogs/page";
import { buildSupportHelpItems } from "@/lib/support/help-links";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { dict } = await getPageI18n(params);
  return {
    title: dict.supportCatalogs.pageTitle,
    description: dict.supportCatalogs.pageDescription,
  };
}

export default async function SoporteCatalogosPage({ params }: PageProps) {
  const { locale, dict, href } = await getPageI18n(params);
  const helpItems = buildSupportHelpItems(dict, href);
  const activeCatalog = getSupportCatalogForLocale(locale);
  const downloads = getSupportCatalogDownloads();
  const copy = dict.supportCatalogs;

  return (
    <CatalogPageContent
      activeCatalog={activeCatalog}
      downloads={downloads}
      heading={copy.heading}
      openLabel={copy.openCatalog}
      loadingLabel={copy.flipbookLoading}
      downloadEsLabel={copy.downloadEs}
      downloadEnLabel={copy.downloadEn}
      attribution={copy.dearFlipAttribution}
      helpTitle={dict.support.needHelp}
      helpItems={helpItems}
    />
  );
}
