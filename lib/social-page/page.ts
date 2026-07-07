import socialPageData from "@/data/redes-sociales.json";
import type { Locale } from "@/lib/i18n/config";
import { siteConfig } from "@/lib/site";
import type {
  SocialPageConfig,
  SocialPageLabels,
  SocialPageLink,
  SocialPlatformId,
} from "@/types/social-page";

type SocialPageData = {
  hero: Record<Locale, { src: string; alt: string }>;
  handle: string;
  socialLinks: SocialPageLink[];
};

const data = socialPageData as SocialPageData;

export function getSocialPageConfig(locale: Locale): SocialPageConfig {
  return {
    hero: data.hero[locale],
    handle: data.handle,
    socialLinks: data.socialLinks,
  };
}

export function getSocialLinkUrl(link: SocialPageLink): string {
  return siteConfig.social[link.urlKey];
}

export function getSocialLinkLabel(
  link: SocialPageLink,
  labels: SocialPageLabels,
): string {
  const labelMap: Record<SocialPlatformId, string> = {
    facebook: labels.visitFacebook,
    instagram: labels.visitInstagram,
    tiktok: labels.visitTiktok,
    youtube: labels.visitYoutube,
    linkedin: labels.visitLinkedin,
  };

  return labelMap[link.id];
}
