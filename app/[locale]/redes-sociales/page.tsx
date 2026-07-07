import type { Metadata } from "next";
import { SocialLinksSection } from "@/components/social/SocialLinksSection";
import { SocialPageHero } from "@/components/social/SocialPageHero";
import { getPageI18n } from "@/lib/i18n/server";
import { getSocialPageConfig } from "@/lib/social-page/page";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { dict } = await getPageI18n(params);
  return {
    title: dict.socialPage.pageTitle,
    description: dict.socialPage.pageDescription,
  };
}

export default async function RedesSocialesPage({ params }: PageProps) {
  const { locale, dict } = await getPageI18n(params);
  const config = getSocialPageConfig(locale);
  const copy = dict.socialPage;

  return (
    <>
      <SocialPageHero
        line1={copy.heroLine1}
        line2={copy.heroLine2}
        image={config.hero}
      />

      <SocialLinksSection
        handle={config.handle}
        subtitle={copy.subtitle}
        links={config.socialLinks}
        labels={{
          visitFacebook: copy.visitFacebook,
          visitInstagram: copy.visitInstagram,
          visitTiktok: copy.visitTiktok,
          visitYoutube: copy.visitYoutube,
          visitLinkedin: copy.visitLinkedin,
        }}
      />
    </>
  );
}
