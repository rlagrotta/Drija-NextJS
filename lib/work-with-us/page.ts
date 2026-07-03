import workWithUsData from "@/data/work-with-us.json";
import type { Locale } from "@/lib/i18n/config";
import type { WorkWithUsPageConfig } from "@/types/work-with-us";

const config = workWithUsData as WorkWithUsPageConfig;

export function getWorkWithUsConfig(locale: Locale) {
  return {
    mascot: config.mascot,
    contact: {
      email: config.contact.email,
      whatsappUrl: config.contact.whatsappUrl[locale],
    },
  };
}
