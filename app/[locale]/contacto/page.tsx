import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { getPageI18n } from "@/lib/i18n/server";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { dict } = await getPageI18n(params);
  return {
    title: dict.contact.pageTitle,
    description: dict.contact.pageDescription,
  };
}

export default async function ContactoPage({ params }: PageProps) {
  const { dict, href } = await getPageI18n(params);

  return (
    <>
      <PageHeader title={dict.contact.pageTitle} />

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="lg:col-span-2">
          <ContactForm />
        </div>

        <aside className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
          <h2 className="text-lg font-bold text-neutral-900">
            {dict.contact.needHelp}
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <Link
                href={href("/soporte")}
                className="font-semibold text-drija-green hover:underline"
              >
                {dict.contact.faq}
              </Link>
            </li>
            <li>
              <Link
                href={href("/donde-comprar")}
                className="font-semibold text-drija-green hover:underline"
              >
                {dict.contact.technicalService}
              </Link>
            </li>
            <li>
              <Link
                href={href("/productos")}
                className="font-semibold text-drija-green hover:underline"
              >
                {dict.contact.catalogs}
              </Link>
            </li>
          </ul>
        </aside>
      </section>
    </>
  );
}
