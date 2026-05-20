import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { getPageI18n } from "@/lib/i18n/server";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { dict } = await getPageI18n(params);
  return {
    title: dict.legal.pageTitle,
    description: dict.legal.pageDescription,
  };
}

export default async function AvisosLegalesPage({ params }: PageProps) {
  const { dict } = await getPageI18n(params);

  return (
    <>
      <PageHeader title={dict.legal.pageTitle} />
      <section className="prose-drija mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <p>{dict.legal.intro}</p>
        <p>{dict.legal.privacy}</p>
      </section>
    </>
  );
}
