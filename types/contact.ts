export const CONTACT_COUNTRIES = [
  "Caribbean",
  "Costa Rica",
  "El Salvador",
  "Guatemala",
  "Honduras",
  "Nicaragua",
  "Panamá",
  "República Dominicana",
  "Venezuela",
  "México",
] as const;

export type ContactCountry = (typeof CONTACT_COUNTRIES)[number];

export type ContactFormPayload = {
  name: string;
  email: string;
  country: ContactCountry;
  phone: string;
  message: string;
  acceptTerms: boolean;
};
