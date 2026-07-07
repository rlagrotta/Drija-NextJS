import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
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

export default function ContactoPage() {
  return <ContactForm />;
}
