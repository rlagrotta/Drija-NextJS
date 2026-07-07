import type { siteConfig } from "@/lib/site";

export type SocialPlatformId = keyof typeof siteConfig.social;

export type SocialPageHeroImage = {
  src: string;
  alt: string;
};

export type SocialPageLink = {
  id: SocialPlatformId;
  icon: string;
  urlKey: SocialPlatformId;
};

export type SocialPageConfig = {
  hero: SocialPageHeroImage;
  handle: string;
  socialLinks: SocialPageLink[];
};

export type SocialPageLabels = {
  visitFacebook: string;
  visitInstagram: string;
  visitTiktok: string;
  visitYoutube: string;
  visitLinkedin: string;
};
