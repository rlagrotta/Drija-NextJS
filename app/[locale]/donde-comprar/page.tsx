import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { getCms } from "@/lib/cms";
import { getPageI18n } from "@/lib/i18n/server";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { dict } = await getPageI18n(params);
  return {
    title: dict.retailers.pageTitle,
    description: dict.retailers.pageDescription,
  };
}

export default async function DondeComprarPage({ params }: PageProps) {
  const { dict } = await getPageI18n(params);
  const retailersByCountry = await getCms().getRetailers();

  return (
    <>
      <PageHeader
        title={dict.retailers.pageTitle}
        description={dict.retailers.pageDescription}
      />

      <section className="mx-auto max-w-7xl space-y-12 px-4 py-12 sm:px-6 lg:px-8">
        {retailersByCountry.map((group) => (
          <div
            key={group.countryCode}
            className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
          >
            <h2 className="text-2xl font-bold text-neutral-900">
              / {group.country}
            </h2>

            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.retailers.map((retailer) => (
                <li key={retailer.id}>
                  <a
                    href={retailer.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-lg border border-neutral-300 px-4 py-3 text-sm font-bold uppercase tracking-wide transition hover:border-drija-green hover:text-drija-green"
                  >
                    {retailer.name} — {dict.retailers.visitWebsite}
                  </a>
                </li>
              ))}
            </ul>

            {group.technicalServiceUrl && (
              <p className="mt-6">
                <a
                  href={group.technicalServiceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-drija-green hover:underline"
                >
                  {dict.retailers.technicalService} {group.country} →
                </a>
              </p>
            )}
          </div>
        ))}
      </section>
    </>
  );
}
