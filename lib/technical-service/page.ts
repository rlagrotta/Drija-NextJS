import technicalServiceData from "@/data/technical-service.json";
import type { TechnicalServiceContact, TechnicalServicePageConfig } from "@/types/technical-service";

const config = technicalServiceData as TechnicalServicePageConfig;

export function getTechnicalServiceContact(): TechnicalServiceContact {
  return config.contact;
}
