import registroData from "@/data/registro.json";
import type { Locale } from "@/lib/i18n/config";
import type { RegistroLegalSection, RegistroPageConfig } from "@/types/registro";

const config = registroData as RegistroPageConfig;

export type LocalizedRegistroPageContent = {
  destinationEmail: string;
  intro: string[];
  conditions: RegistroLegalSection;
  warranty: RegistroLegalSection;
  venezuela: RegistroLegalSection;
};

export function getRegistroPageContent(locale: Locale): LocalizedRegistroPageContent {
  if (locale === "es" || !config.translations?.en) {
    return {
      destinationEmail: config.destinationEmail,
      intro: config.intro,
      conditions: config.conditions,
      warranty: config.warranty,
      venezuela: config.venezuela,
    };
  }

  const en = config.translations.en;

  return {
    destinationEmail: config.destinationEmail,
    intro: en.intro ?? config.intro,
    conditions: en.conditions ?? config.conditions,
    warranty: en.warranty ?? config.warranty,
    venezuela: en.venezuela ?? config.venezuela,
  };
}

export function getRegistroDestinationEmail(): string {
  return process.env.REGISTRO_TO_EMAIL ?? config.destinationEmail;
}

export function getRecaptchaSiteKey(): string {
  return process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";
}

export function getRecaptchaSecretKey(): string {
  return process.env.RECAPTCHA_SECRET_KEY ?? "";
}
