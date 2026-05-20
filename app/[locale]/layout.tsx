import { notFound } from "next/navigation";
import { MainLayout } from "@/components/layout/MainLayout";
import { SetHtmlLang } from "@/components/layout/SetHtmlLang";
import { I18nProvider } from "@/lib/i18n/context";
import { isValidLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale: localeParam } = await params;

  if (!isValidLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const dictionary = await getDictionary(locale);

  return (
    <I18nProvider locale={locale} dictionary={dictionary}>
      <SetHtmlLang locale={locale} />
      <MainLayout>{children}</MainLayout>
    </I18nProvider>
  );
}
